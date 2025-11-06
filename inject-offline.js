/**
 * inject-offline.js
 * - Register /sw.js
 * - Provide semi-glass toast UI for offline/online
 * - safeFetch enqueue/flushQueue with localStorage queue
 * - Listens for SW activation messages to auto-sync without forced reload
 *
 * Place <script src="/inject-offline.js"></script> before </body> or paste inline there.
 */
(function(){
  'use strict';

  // ---- Service Worker registration ----
  async function registerSW(){
    if (!('serviceWorker' in navigator)) return;
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      console.log('[UDHIS][SW] registered', reg.scope);
      reg.addEventListener('updatefound', () => console.log('[UDHIS][SW] update found'));
    } catch (e) {
      console.warn('[UDHIS][SW] register failed', e);
      // fallback: try prefetch caching if possible
      tryPrefetchFallback();
    }
  }

  // ---- Prefetch fallback: populate cache via window (if sw registration fails) ----
  async function tryPrefetchFallback(){
    if (!('caches' in window)) return;
    try {
      const CACHE_NAME = 'stl-udhis-cache-fallback';
      const cache = await caches.open(CACHE_NAME);
      const urls = ['/', '/index.html'];
      for (const u of urls){
        try {
          const full = new URL(u, location.href).href;
          const r = await fetch(full, { credentials: 'same-origin', cache: 'no-store' });
          if (r && r.ok) await cache.put(full, r.clone());
        } catch(e) { console.warn('prefetch fallback fail', u, e); }
      }
      console.log('[UDHIS] prefretch fallback done');
    } catch(e){}
  }

  // ---- Toast UI ----
  const TOAST_ID = 'udhis-offline-toast';
  function createToastEl(){
    if (document.getElementById(TOAST_ID)) return document.getElementById(TOAST_ID);
    const el = document.createElement('div');
    el.id = TOAST_ID;
    el.setAttribute('aria-live','polite');
    Object.assign(el.style, {
      position: 'fixed',
      zIndex: 2147483647,
      right: '20px',
      bottom: '20px',
      maxWidth: '92%',
      padding: '10px 14px',
      borderRadius: '12px',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
      transition: 'transform 320ms cubic-bezier(.2,.9,.3,1), opacity 320ms',
      opacity: '0',
      transform: 'translateY(12px)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      pointerEvents: 'auto',
      cursor: 'default',
      fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
      fontSize: '14px',
      lineHeight: '1.2',
    });
    const mql = window.matchMedia && window.matchMedia('(max-width:520px)');
    function applyPos() {
      if (mql && mql.matches) {
        el.style.left = '50%';
        el.style.right = 'unset';
        el.style.transform = 'translateX(-50%) translateY(12px)';
        el.style.bottom = '18px';
      } else {
        el.style.right = '20px';
        el.style.left = 'unset';
        el.style.transform = 'translateY(12px)';
        el.style.bottom = '20px';
      }
    }
    if (mql) mql.addListener(applyPos);
    applyPos();

    const icon = document.createElement('div');
    icon.style.flex = '0 0 auto';
    icon.style.width = '36px';
    icon.style.height = '36px';
    icon.style.borderRadius = '10px';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    icon.style.fontWeight = '700';
    icon.style.fontSize = '16px';
    icon.style.boxShadow = 'inset 0 -2px 8px rgba(0,0,0,0.12)';

    const text = document.createElement('div');
    text.style.flex = '1 1 auto';
    text.style.paddingRight = '6px';

    el.appendChild(icon);
    el.appendChild(text);
    document.body.appendChild(el);
    return el;
  }

  let toastTimer = null;
  function showToast(status){
    const el = createToastEl();
    const icon = el.children[0];
    const text = el.children[1];

    if (status === 'offline') {
      el.style.background = 'linear-gradient(90deg, rgba(255,238,200,0.85), rgba(255,215,130,0.75))';
      icon.textContent = '📴';
      icon.style.color = '#1a1a1a';
      text.innerHTML = '<strong style="color:#1a1a1a">Anda sedang offline, online dulu bossss....</strong>';
      text.style.color = '#1a1a1a';
    } else if (status === 'online') {
      el.style.background = 'linear-gradient(90deg, rgba(200,255,220,0.85), rgba(150,240,180,0.75))';
      icon.textContent = '✅';
      icon.style.color = '#064e3b';
      text.innerHTML = '<strong style="color:#064e3b">Koneksi kembali aktif, menyambung ke server...</strong>';
      text.style.color = '#064e3b';
    } else {
      el.style.background = 'rgba(0,0,0,0.6)';
      icon.textContent = '';
      text.textContent = status || '';
      text.style.color = '#fff';
    }

    el.style.transition = 'opacity 300ms, transform 300ms';
    el.style.opacity = '1';
    el.style.transform = el.style.transform.replace('12px','0px');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      try {
        el.style.opacity = '0';
        el.style.transform = el.style.transform.replace('0px','12px');
      } catch(e){}
    }, 4200);
  }

  // ---- Retry queue (localStorage) ----
  const Q_KEY = 'udhis_retry_queue_v1';
  function getQueue(){ try { return JSON.parse(localStorage.getItem(Q_KEY) || '[]'); } catch(e){ return []; } }
  function setQueue(q){ try { localStorage.setItem(Q_KEY, JSON.stringify(q)); } catch(e){} }
  function enqueueRequest(item){
    const q = getQueue();
    q.push(Object.assign({ts: Date.now()}, item));
    setQueue(q);
    console.log('[UDHIS][Queue] enqueued', item);
  }
  async function flushQueue(){
    const q = getQueue();
    if (!q.length) return;
    const pending = [];
    for (const it of q){
      try {
        const resp = await fetch(it.url, it.init);
        if (!resp.ok) throw new Error('non-ok ' + resp.status);
        console.log('[UDHIS][Queue] sent', it.url);
      } catch (e) {
        pending.push(it);
      }
    }
    setQueue(pending);
  }

  async function safeFetch(url, init){
    try {
      const resp = await fetch(url, init);
      if (!resp.ok) enqueueRequest({url, init});
      return resp;
    } catch (e) {
      enqueueRequest({url, init});
      throw e;
    }
  }

  // expose API
  window.__udhis_offline = window.__udhis_offline || {};
  Object.assign(window.__udhis_offline, { safeFetch, enqueueRequest, flushQueue });

  // ---- online/offline handlers ----
  function onOnline(){
    try {
      if (typeof checkNetworkStatus === 'function') {
        try { checkNetworkStatus(); } catch(e){}
      }
      showToast('online');
      window.dispatchEvent(new CustomEvent('udhis:online'));
      setTimeout(()=>{ flushQueue().catch(()=>{}); }, 500);
    } catch (e) {}
  }
  function onOffline(){
    try {
      if (typeof checkNetworkStatus === 'function') {
        try { checkNetworkStatus(); } catch(e){}
      }
      showToast('offline');
      window.dispatchEvent(new CustomEvent('udhis:offline'));
    } catch (e) {}
  }

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  // show initial state
  if (!navigator.onLine) {
    setTimeout(()=> showToast('offline'), 700);
  }

  // flush queue when loaded and online
  window.addEventListener('load', () => {
    if (navigator.onLine) setTimeout(()=> flushQueue().catch(()=>{}), 900);
  });

  // ---- Listen for SW activation message ----
  if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('message', (ev) => {
      const data = ev.data || {};
      if (data && data.type === 'SW_ACTIVATED') {
        console.log('[UDHIS] SW activated:', data.cacheName);
        // show toast and flush queue, but avoid forced reload
        showToast('online');
        window.dispatchEvent(new CustomEvent('udhis:online'));
        setTimeout(()=> flushQueue().catch(()=>{}), 500);
      }
    });
  }

  // start
  registerSW();
})();
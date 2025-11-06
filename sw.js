/**
 * sw.js - Auto-Offline Primer for stl_udhis
 * Place at repo root: /sw.js
 *
 * - Precaches '/' and '/index.html' (best-effort same-origin)
 * - Installs and caches navigation responses for robust offline
 * - Responds with cache-first for assets; navigation uses network-first -> cache fallback
 * - Posts a message 'SW_ACTIVATED' to clients on activate so client can re-sync without forced reload
 * - Handles SKIP_WAITING message to activate immediately if requested
 *
 * Note: Service Worker requires HTTPS (GitHub Pages provides this) or localhost.
 */

const CACHE_VERSION = 'stl-udhis-auto-v1';
const CACHE_NAME = `stl-udhis-cache-${CACHE_VERSION}`;
const CORE_ASSETS = ['/', '/index.html'];

// Helper: limit caching to same-origin requests to avoid CORS failures
function isSameOrigin(url) {
  try {
    const u = new URL(url, location.href);
    return u.origin === location.origin;
  } catch (e) {
    return false;
  }
}

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Best-effort cache core assets (same-origin only)
    for (const p of CORE_ASSETS) {
      try {
        const url = new URL(p, location.href).href;
        if (!isSameOrigin(url)) continue;
        const req = new Request(url, { credentials: 'same-origin', cache: 'no-store' });
        const res = await fetch(req);
        if (res && res.ok) await cache.put(req, res.clone());
      } catch (e) {
        console.warn('sw install cache fail', p, e);
      }
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // cleanup old caches
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k !== CACHE_NAME) return caches.delete(k);
      return Promise.resolve();
    }));
    await self.clients.claim();
    // notify clients
    try {
      const allClients = await self.clients.matchAll({ includeUncontrolled: true });
      for (const client of allClients) {
        client.postMessage({ type: 'SW_ACTIVATED', cacheName: CACHE_NAME });
      }
    } catch (e) {}
  })());
});

function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
    (request.method === 'GET' && request.headers.get('accept') && request.headers.get('accept').includes('text/html'));
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Navigation: network-first, fallback to cache, fallback to cached index, then minimal offline page
  if (isNavigationRequest(req)) {
    event.respondWith((async () => {
      try {
        const networkResp = await fetch(req);
        if (networkResp && networkResp.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, networkResp.clone()).catch(()=>{});
        }
        return networkResp;
      } catch (e) {
        // try cached matching request
        const cached = await caches.match(req);
        if (cached) return cached;
        // fallback to cached index.html
        const index = await caches.match('/index.html');
        if (index) return index;
        return new Response('<h1>Offline</h1><p>Konten tidak tersedia.</p>', { headers: { 'Content-Type': 'text/html' }});
      }
    })());
    return;
  }

  // For other assets: cache-first, then network, then fallback for images
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const networkResp = await fetch(req);
      if (networkResp && networkResp.ok && isSameOrigin(req.url)) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, networkResp.clone()).catch(()=>{});
      }
      return networkResp;
    } catch (e) {
      // image fallback
      if (req.destination === 'image') {
        const gif = 'R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
        return fetch('data:image/gif;base64,' + gif);
      }
      return new Response('', { status: 503, statusText: 'Service Unavailable' });
    }
  })());
});

self.addEventListener('message', event => {
  const data = event.data || {};
  if (data && data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

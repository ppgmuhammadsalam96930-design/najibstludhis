// Extracted from script id="udhis-secure-inject"
(function () {
  'use strict';
  const NS = '__udhis_secure';

  // ---- Helpers: base64 <-> ArrayBuffer ----
  function abToBase64(buf) {
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }
  function base64ToAb(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }

  // ---- IndexedDB helper (non-destructive, same store) ----
  const IDB = {
    dbName: 'stl_udhis_secure',
    storeName: 'secrets',
    db: null,
    async open() {
      if (this.db) return this.db;
      return new Promise((res, rej) => {
        const req = indexedDB.open(this.dbName, 1);
        req.onupgradeneeded = e => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: 'key' });
          }
        };
        req.onsuccess = () => { this.db = req.result; res(this.db); };
        req.onerror = () => rej(req.error);
      });
    },
    async put(key, value) {
      const db = await this.open();
      return new Promise((res, rej) => {
        const tx = db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const r = store.put({ key, value });
        r.onsuccess = () => res(true);
        r.onerror = () => rej(r.error);
      });
    },
    async get(key) {
      const db = await this.open();
      return new Promise((res, rej) => {
        const tx = db.transaction([this.storeName], 'readonly');
        const store = tx.objectStore(this.storeName);
        const r = store.get(key);
        r.onsuccess = () => res(r.result ? r.result.value : null);
        r.onerror = () => rej(r.error);
      });
    },
    async del(key) {
      const db = await this.open();
      return new Promise((res, rej) => {
        const tx = db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const r = store.delete(key);
        r.onsuccess = () => res(true);
        r.onerror = () => rej(r.error);
      });
    }
  };

  // ---- Crypto helpers (no exportKey raw; keys non-extractable) ----
  async function importAesKeyRaw(raw) {
    return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
  }

  async function aesGcmEncrypt(key, plaintext) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
    return { ciphertextBase64: abToBase64(ct), ivBase64: abToBase64(iv.buffer) };
  }

  async function aesGcmDecrypt(key, ciphertextBase64, ivBase64) {
    const ct = base64ToAb(ciphertextBase64);
    const iv = base64ToAb(ivBase64);
    const ptBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, ct);
    return new TextDecoder().decode(ptBuf);
  }

  // ---- PBKDF2 via WebWorker when available ----
  // Worker code as string. The worker derives raw bits (ArrayBuffer) and posts base64 result.
  const pbkdf2WorkerCode = `
  self.onmessage = async function(ev) {
    try {
      const { passphrase, saltBase64, iterations } = ev.data;
      const enc = new TextEncoder();
      const pwKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveBits']);
      const salt = saltBase64 ? (function(){ const bin = atob(saltBase64); const arr = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i); return arr.buffer; })() : crypto.getRandomValues(new Uint8Array(16)).buffer;
      const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, pwKey, 256);
      // return base64 bits and salt used
      const bytes = new Uint8Array(bits);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);
      let saltBinary = '';
      const sbytes = new Uint8Array(salt);
      for (let i=0;i<sbytes.byteLength;i++) saltBinary += String.fromCharCode(sbytes[i]);
      const saltBase64Out = btoa(saltBinary);
      // zero sensitive data (best-effort)
      for (let i=0;i<bytes.length;i++) bytes[i]=0;
      for (let i=0;i<sbytes.length;i++) sbytes[i]=0;
      self.postMessage({ ok: true, bitsBase64: base64, saltBase64: saltBase64Out });
    } catch (err) {
      self.postMessage({ ok: false, error: String(err) });
    }
  };`;

  let pbkdf2Worker = null;
  function ensureWorker() {
    if (pbkdf2Worker) return pbkdf2Worker;
    try {
      const blob = new Blob([pbkdf2WorkerCode], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      pbkdf2Worker = new Worker(url);
      return pbkdf2Worker;
    } catch (e) {
      pbkdf2Worker = null;
      return null;
    }
  }

  // deriveKeyFromPassphrase: uses worker to derive bits, then imports non-extractable AES-GCM key in main thread
  async function deriveKeyFromPassphrase(passphrase, saltBase64) {
    const iterations = 150000;
    const worker = ensureWorker();
    if (worker) {
      const res = await new Promise((resv, rejv) => {
        const timeout = setTimeout(()=> rejv(new Error('PBKDF2 worker timeout')), 30000);
        worker.onmessage = (ev) => { clearTimeout(timeout); resv(ev.data); };
        worker.postMessage({ passphrase, saltBase64, iterations });
      }).catch(async (e) => { throw e; });
      if (!res.ok) throw new Error(res.error || 'PBKDF2 worker error');
      const bits = base64ToAb(res.bitsBase64);
      // import as non-extractable AES-GCM key
      const key = await crypto.subtle.importKey('raw', bits, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
      // zero the bits array view (best-effort)
      try { const vb = new Uint8Array(bits); for (let i=0;i<vb.length;i++) vb[i]=0; } catch(e){}
      return { key, saltBase64: res.saltBase64 };
    } else {
      // fallback: deriveKey on main thread but do not export raw key
      const enc = new TextEncoder();
      const passKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey']);
      const salt = saltBase64 ? base64ToAb(saltBase64) : crypto.getRandomValues(new Uint8Array(16)).buffer;
      const derived = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
        passKey,
        { name: 'AES-GCM', length: 256 },
        false, // non-extractable
        ['encrypt', 'decrypt']
      );
      return { key: derived, saltBase64: abToBase64(salt) };
    }
  }

  // ---- In-memory ephemeral key store (non-persistent) ----
  const IN_MEMORY = { sessionKey: null, sessionMeta: null };

  // ---- API storage routines (ephemeral true memory-only by default) ----
  // Schema: key='apiKey_encrypted' => { ciphertextBase64, ivBase64, meta: { mode:'passphrase'|'ephemeral-memory', saltBase64?, created, boundTo? } }
  async function setEncryptedApiKey(apiKey, passphrase, options={persistEphemeral:false}) {
    if (!apiKey || typeof apiKey !== 'string') throw new Error('apiKey must be a non-empty string');
    if (passphrase && typeof passphrase !== 'string') throw new Error('passphrase must be string');
    if (passphrase) {
      const { key, saltBase64 } = await deriveKeyFromPassphrase(passphrase);
      const res = await aesGcmEncrypt(key, apiKey);
      await IDB.put('apiKey_encrypted', {
        ciphertextBase64: res.ciphertextBase64,
        ivBase64: res.ivBase64,
        meta: { mode: 'passphrase', saltBase64, created: new Date().toISOString(), boundTo: location.origin }
      });
      return true;
    } else {
      // ephemeral-memory: create non-extractable key and keep only in memory
      const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
      IN_MEMORY.sessionKey = key;
      const res = await aesGcmEncrypt(key, apiKey);
      // Only persist ciphertext if explicitly allowed (options.persistEphemeral === true) - default is false to avoid disk storage
      if (options.persistEphemeral) {
        await IDB.put('apiKey_encrypted', {
          ciphertextBase64: res.ciphertextBase64,
          ivBase64: res.ivBase64,
          meta: { mode: 'ephemeral-memory-persisted', created: new Date().toISOString(), boundTo: location.origin }
        });
      } else {
        // store ephemeral ciphertext in memory too (so everything ends on reload)
        IN_MEMORY.sessionMeta = { ciphertextBase64: res.ciphertextBase64, ivBase64: res.ivBase64, meta: { mode: 'ephemeral-memory', created: new Date().toISOString(), boundTo: location.origin } };
      }
      return true;
    }
  }

  async function getDecryptedApiKey(passphrase) {
    const stored = await IDB.get('apiKey_encrypted');
    // if nothing in IDB, check in-memory ephemeral meta
    if (!stored && IN_MEMORY.sessionMeta) {
      const meta = IN_MEMORY.sessionMeta.meta || {};
      if (meta.mode && meta.mode.startsWith('ephemeral')) {
        if (!IN_MEMORY.sessionKey) throw new Error('Ephemeral session key not available (page reloaded or session ended)');
        return await aesGcmDecrypt(IN_MEMORY.sessionKey, IN_MEMORY.sessionMeta.ciphertextBase64, IN_MEMORY.sessionMeta.ivBase64);
      }
      return null;
    }
    if (!stored) return null;
    const meta = stored.meta || {};
    if (meta.mode === 'passphrase') {
      if (!passphrase) throw new Error('Passphrase required to decrypt stored API key');
      const { key } = await deriveKeyFromPassphrase(passphrase, meta.saltBase64);
      try {
        const pt = await aesGcmDecrypt(key, stored.ciphertextBase64, stored.ivBase64);
        return pt;
      } catch (e) {
        throw new Error('Decryption failed (bad passphrase or corrupted data)');
      }
    } else if (meta.mode && meta.mode.startsWith('ephemeral')) {
      // ephemeral persisted case requires IN_MEMORY.sessionKey available, otherwise cannot decrypt (by design)
      if (!IN_MEMORY.sessionKey) throw new Error('Ephemeral session key not available (page reloaded or session ended)');
      try {
        const pt = await aesGcmDecrypt(IN_MEMORY.sessionKey, stored.ciphertextBase64, stored.ivBase64);
        return pt;
      } catch (e) {
        throw new Error('Decryption failed (corrupted data or session key invalid)');
      }
    } else {
      throw new Error('Unknown storage mode');
    }
  }

  async function clearEncryptedApiKey() {
    IN_MEMORY.sessionKey = null;
    IN_MEMORY.sessionMeta = null;
    await IDB.del('apiKey_encrypted');
    return true;
  }

  // ---- Platform detection (userAgentData-aware) ----
  function detectPlatform() {
    const nav = navigator;
    if (nav.userAgentData && typeof nav.userAgentData === 'object') {
      try {
        const uaData = nav.userAgentData;
        const platform = uaData.platform || (uaData.brands && uaData.brands[0] && uaData.brands[0].brand) || 'unknown';
        const mobile = !!uaData.mobile;
        return { platform: String(platform).toLowerCase(), mobile, uaData };
      } catch (e) { /* fallthrough */ }
    }
    const ua = nav.userAgent || '';
    const lower = ua.toLowerCase();
    if (/android/.test(lower)) return { platform: 'android', mobile: true, ua };
    if (/iphone|ipad|ipod/.test(lower)) return { platform: 'ios', mobile: true, ua };
    if (/win/.test(lower)) return { platform: 'windows', mobile: false, ua };
    if (/mac/.test(lower)) return { platform: 'macos', mobile: false, ua };
    if (/linux/.test(lower)) return { platform: 'linux', mobile: false, ua };
    return { platform: 'unknown', mobile: /mobile/.test(lower), ua };
  }

  // ---- Reduced-motion check ----
  function prefersReducedMotion() {
    try {
      if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq) return mq.matches;
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  // ---- Triple-click toggle logic (fixed checks) ----
  (function setupTripleClickToggle() {
    let clickCount = 0;
    let clickTimer = null;
    const thresholdMs = 1000;

    document.addEventListener('click', function (e) {
      const targ = e.target;
      if (!targ) return;
      try {
        if (targ.matches && (targ.matches('input, textarea, select') || targ.isContentEditable)) return;
      } catch (err) {
        // if matches isn't available, fallback to tagName check
        const tag = (targ.tagName || '').toUpperCase();
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      }

      clickCount++;
      if (clickCount === 3) {
        const evt = new CustomEvent('udhis:tripleclick', { detail: { x: e.clientX, y: e.clientY } });
        document.dispatchEvent(evt);
        clickCount = 0;
        clearTimeout(clickTimer);
        clickTimer = null;
        return;
      }
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, thresholdMs);
    }, { passive: true });
  })();

  // ---- EmailJS helpers & settings storage (no DOM changes) ----
  const VERIFIED_SENDERS = [
    'najibwahidussalam938@gmail.com',
    'ikhsanfakhrozi12@gmail.com',
    'ppg.muhammadsalam96930@program.belajar.id'
  ];

  function setEmailServiceConfig(serviceId, templateId) {
    try {
      localStorage.setItem('udhis_email_service_id', serviceId || '');
      localStorage.setItem('udhis_email_template_id', templateId || '');
      return true;
    } catch (e) { return false; }
  }

  function getEmailServiceConfig() {
    return {
      serviceId: localStorage.getItem('udhis_email_service_id') || '',
      templateId: localStorage.getItem('udhis_email_template_id') || ''
    };
  }

  async function validateEmailSettings() {
    if (typeof emailjs === 'undefined' || !emailjs.send) {
      throw new Error('EmailJS SDK not loaded.');
    }
    const cfg = getEmailServiceConfig();
    if (!cfg.serviceId || !cfg.templateId) throw new Error('Service ID or Template ID not configured');
    // Perform a lightweight test by sending to one of the verified senders (self-test).
    const testTo = VERIFIED_SENDERS[0];
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const params = { to_email: testTo, from_email: VERIFIED_SENDERS[0], verification_code: code, timestamp: new Date().toISOString() };
    return emailjs.send(cfg.serviceId, cfg.templateId, params);
  }

  async function sendVerificationEmail(toEmail, senderIndex, verificationCode, extraParams) {
    if (typeof emailjs === 'undefined' || !emailjs.send) {
      throw new Error('EmailJS SDK not loaded or configured. Ensure emailjs SDK is included and initialized.');
    }
    const cfg = getEmailServiceConfig();
    if (!cfg.serviceId || !cfg.templateId) throw new Error('Email service/template not configured. Call setEmailServiceConfig first.');
    if (!VERIFIED_SENDERS[senderIndex]) throw new Error('Invalid senderIndex');
    const params = Object.assign({
      to_email: toEmail,
      from_email: VERIFIED_SENDERS[senderIndex],
      verification_code: verificationCode,
      timestamp: new Date().toISOString()
    }, extraParams || {});
    return emailjs.send(cfg.serviceId, cfg.templateId, params);
  }

  // ---- Expose API ----
  window[NS] = window[NS] || {};
  Object.assign(window[NS], {
    setEncryptedApiKey,    // async(apiKey, passphrase?, options?) -> boolean
    getDecryptedApiKey,    // async(passphrase?) -> apiKey string/null
    clearEncryptedApiKey,  // async() -> boolean
    detectPlatform,        // sync() -> { platform, mobile, uaData/ua }
    prefersReducedMotion,  // sync() -> boolean
    IDB,                   // debug
    setEmailServiceConfig, // set EmailJS service/template ids (stores in localStorage)
    getEmailServiceConfig,
    validateEmailSettings, // attempts a test send
    sendVerificationEmail, // send verification using configured service/template
    VERIFIED_SENDERS,
    _helpers: { abToBase64, base64ToAb }
  });

  try { console.info('[UDHIS-Secure] P2+P3 patches applied: workerized PBKDF2, no raw export, ephemeral memory-only by default, email config helpers ready.'); } catch(e){}
})();

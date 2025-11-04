// Extracted from script id="udhis-extra-patches"
(function(){
  'use strict';

  // Toast helper (non-blocking)
  function showToast(msg, ttl=3500){
    try{
      var root = document.getElementById('udhisToast');
      if(!root){
        root = document.createElement('div');
        root.id = 'udhisToast';
        root.className = 'udhis-toast';
        root.style.position = 'fixed';
        root.style.right = '18px';
        root.style.bottom = '18px';
        root.style.zIndex = 12000;
        document.body.appendChild(root);
      }
      var it = document.createElement('div');
      it.className = 'item';
      it.style.background = 'rgba(0,0,0,0.8)';
      it.style.color = '#fff';
      it.style.padding = '10px 14px';
      it.style.borderRadius = '10px';
      it.style.minWidth = '160px';
      it.style.marginTop = '8px';
      it.textContent = msg;
      root.appendChild(it);
      setTimeout(function(){ try{ it.style.transform='translateX(30px)'; it.style.opacity='0'; setTimeout(()=>it.remove(),300);}catch(e){} }, ttl);
    }catch(e){ console.warn('toast failed', e); }
  }

  // ensureCrypto - disable secure UI if crypto not available
  var supportsCrypto = !!(window.crypto && crypto.subtle);
  if(!supportsCrypto){
    document.addEventListener('DOMContentLoaded', function(){
      try{
        var els = document.querySelectorAll('#saveApiConfig, #exportTheme, #clearApiConfig');
        els.forEach(function(b){ if(b) b.disabled = true; });
        var sidebar = document.getElementById('sidebar');
        if(sidebar){
          var note = document.createElement('div');
          note.style.color = 'orange';
          note.style.fontSize = '13px';
          note.style.marginBottom = '8px';
          note.textContent = 'Fitur penyimpanan aman (Web Crypto) tidak tersedia di perangkat ini.';
          sidebar.insertBefore(note, sidebar.firstChild);
        }
        showToast('Web Crypto tidak tersedia — fitur penyimpanan aman dinonaktifkan', 6000);
      }catch(e){}
    });
  }

  // Add passphrase modal UI (if not present)
  document.addEventListener('DOMContentLoaded', function(){
    if(document.getElementById('udhisPassBackdrop')) return;
    var wrap = document.createElement('div');
    wrap.id = 'udhisPassBackdrop';
    wrap.className = 'udhis-modal-backdrop hide';
    wrap.style.display = 'none';
    wrap.innerHTML = '<div class="udhis-modal" role="document" aria-labelledby="passModalTitle">'
      + '<h3 id="passModalTitle">Masukkan Passphrase</h3>'
      + '<p style="font-size:13px;color:rgba(0,0,0,0.6)">Passphrase tidak disimpan. Minimal 8 karakter.</p>'
      + '<input id="udhisPassInput" type="password" autocomplete="new-password" class="enhanced-input" style="margin:8px 0">'
      + '<div style="display:flex;gap:8px;justify-content:flex-end">'
      + '<button id="udhisPassCancel" class="enhanced-btn secondary">Batal</button>'
      + '<button id="udhisPassOk" class="enhanced-btn">OK</button>'
      + '</div></div>';
    document.body.appendChild(wrap);

    // modal functions
    var okBtn = document.getElementById('udhisPassOk'), cancelBtn = document.getElementById('udhisPassCancel'), input = document.getElementById('udhisPassInput');
    function openModal(){ wrap.style.display = 'flex'; wrap.classList.remove('hide'); input.value=''; input.focus(); }
    function closeModal(){ wrap.style.display = 'none'; wrap.classList.add('hide'); }
    function askPassphrase(){
      return new Promise(function(res){
        openModal();
        function onOk(){
          cleanup();
          res(input.value || null);
        }
        function onCancel(){
          cleanup();
          res(null);
        }
        function cleanup(){
          okBtn.removeEventListener('click', onOk);
          cancelBtn.removeEventListener('click', onCancel);
          closeModal();
        }
        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
      });
    }

    // intercept saveApiConfig if present to use secure API (no prompt)
    var saveBtn = document.getElementById('saveApiConfig');
    if(saveBtn){
      saveBtn.addEventListener('click', async function(){
        var apiInput = document.getElementById('apiKey');
        var api = apiInput && apiInput.value && apiInput.value.trim();
        if(!api){ showToast('API Key kosong', 3000); return; }
        var pass = null;
        if(supportsCrypto){
          pass = await askPassphrase();
          // if user cancelled, treat as ephemeral session (no pass)
          if(pass === null){
            // proceed with ephemeral storage (in-memory)
            try{
              if(window.__udhis_secure && window.__udhis_secure.setEncryptedApiKey){
                await window.__udhis_secure.setEncryptedApiKey(api, undefined, { persistEphemeral: false });
                showToast('API Key tersimpan dalam sesi (ephemeral)');
              } else {
                showToast('Fitur penyimpanan aman tidak tersedia', 4000);
              }
            }catch(err){ showToast('Gagal menyimpan: ' + (err && err.message ? err.message : err), 4000); }
            return;
          } else if(pass.length > 0 && pass.length < 8){
            showToast('Passphrase minimal 8 karakter', 4000);
            return;
          }
        }
        try{
          if(window.__udhis_secure && window.__udhis_secure.setEncryptedApiKey){
            await window.__udhis_secure.setEncryptedApiKey(api, (pass && pass.length>0)?pass:undefined, { persistEphemeral: false });
            showToast('API Key tersimpan aman');
          } else {
            showToast('Fitur penyimpanan aman tidak tersedia', 4000);
          }
        }catch(err){
          showToast('Gagal menyimpan: ' + (err && err.message ? err.message : err), 5000);
        }
      });
    }

    // Wire clear button to secure API clear if available
    var clearBtn = document.getElementById('clearApiConfig') || document.getElementById('clearApi');
    if(clearBtn){
      clearBtn.addEventListener('click', async function(){
        if(!confirm('Hapus API Key tersimpan?')) return;
        try{
          if(window.__udhis_secure && window.__udhis_secure.clearEncryptedApiKey){
            await window.__udhis_secure.clearEncryptedApiKey();
            showToast('API Key dihapus');
          } else {
            showToast('Fitur hapus aman tidak tersedia', 3000);
          }
        }catch(e){ showToast('Gagal menghapus', 3000); }
      });
    }
  });

  // Safe theme import parser (whitelist fields)
  function safeParseTheme(obj){
    if(!obj || typeof obj !== 'object') throw new Error('Tema tidak valid');
    var allowed = ['themeId','isDark','font','layers'];
    var out = {};
    allowed.forEach(function(k){ if(k in obj) out[k] = obj[k]; });
    // ensure themeId matches existing preset if provided
    if(out.themeId && !(out.themeId in (window.THEMES || {}))){
      throw new Error('Tema tidak cocok dengan preset');
    }
    return out;
  }

  // Attach safe import to any importTheme button if present
  document.addEventListener('DOMContentLoaded', function(){
    var importBtn = document.getElementById('importTheme');
    if(!importBtn) return;
    importBtn.addEventListener('click', function(){
      var input = document.createElement('input'); input.type='file'; input.accept='application/json';
      input.onchange = function(e){
        var f = e.target.files[0]; if(!f) return;
        var r = new FileReader();
        r.onload = function(){
          try{
            var d = JSON.parse(r.result);
            var safe = safeParseTheme(d);
            // apply theme if safe
            if(safe.themeId && window.applyTheme){
              window.applyTheme(safe.themeId);
              if(window.localStorage) localStorage.setItem('udhis_theme_v3', JSON.stringify(safe));
              showToast('Tema berhasil diimpor');
            } else {
              showToast('Tema tidak dapat diterapkan', 3000);
            }
          }catch(err){ showToast('File tema tidak valid', 4000); }
        };
        r.readAsText(f);
      };
      input.click();
    });
  });

  // Shutdown handler - best-effort cleanup
  function shutdown(){
    try{
      if(window.__udhis_secure && window.__udhis_secure.IDB && typeof window.__udhis_secure.IDB.close === 'function'){
        try{ window.__udhis_secure.IDB.close(); }catch(e){}
      }
      // if custom global worker was exposed, terminate it
      if(window.__udhis_p2p_worker && typeof window.__udhis_p2p_worker.terminate === 'function'){
        try{ window.__udhis_p2p_worker.terminate(); }catch(e){}
      }
    }catch(e){}
  }
  window.addEventListener('pagehide', shutdown, { once:true });
  window.addEventListener('beforeunload', shutdown, { once:true });

  // CSP diagnostic helper: detect blob worker support
  (function(){
    try{
      var blob = new Blob(['self.postMessage(1)'], { type: 'application/javascript' });
      var url = URL.createObjectURL(blob);
      var w = new Worker(url);
      w.terminate();
      URL.revokeObjectURL(url);
    }catch(e){
      // if blob worker blocked, inform developer in console and UI
      console.warn('Blob workers blocked (possible strict CSP). Consider hosting worker as external file.');
      document.addEventListener('DOMContentLoaded', function(){
        var sidebar = document.getElementById('sidebar');
        if(sidebar){
          var note = document.createElement('div');
          note.style.color = 'orange';
          note.style.fontSize = '12px';
          note.style.marginTop = '8px';
          note.textContent = 'Catatan: Blob workers diblokir (CSP). Pertimbangkan memindahkan worker ke file eksternal.';
          sidebar.appendChild(note);
        }
      });
    }
  })();

})();

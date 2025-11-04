// Extracted from script id="udhis-ultimate-enhancements"
(function(){
  'use strict';
  // --- Utilities ---
  function el(html){ const div=document.createElement('div'); div.innerHTML=html.trim(); return div.firstChild; }
  function showToast(msg, opts){ opts = opts || {}; const ttl = opts.ttl || 4000; const type = opts.type || 'info'; var root = document.getElementById('udhisToast'); if(!root){ root = document.createElement('div'); root.id='udhisToast'; root.className='udhis-toast'; root.style.position='fixed'; root.style.right='12px'; root.style.bottom='12px'; root.style.zIndex=14000; document.body.appendChild(root); } var item = document.createElement('div'); item.className='item udhis-toast-'+type; item.style.transition='transform .36s ease, opacity .36s ease'; item.style.transform='translateX(18px)'; item.style.opacity='0'; item.style.background = type==='error'?'#b00020':(type==='warn'?'#d97706':'rgba(0,0,0,0.8)'); item.style.color='#fff'; item.style.padding='10px 14px'; item.style.borderRadius='10px'; item.style.minWidth='160px'; item.style.marginTop='8px'; item.textContent=msg; root.appendChild(item); requestAnimationFrame(()=>{ item.style.transform='translateX(0)'; item.style.opacity='1'; }); setTimeout(()=>{ item.style.transform='translateX(18px)'; item.style.opacity='0'; setTimeout(()=>{ try{ item.remove(); }catch(e){} }, 300); }, ttl); return item; }

  // --- Modal polish (improve existing passphrase modal and create generic modal util) ---
  function createModalContainer(){
    if(document.getElementById('udhisModalRoot')) return document.getElementById('udhisModalRoot');
    var root = document.createElement('div'); root.id='udhisModalRoot'; root.style.zIndex = 15000;
    document.body.appendChild(root);
    return root;
  }
  function openModal(htmlContent, opts){
    opts = opts || {};
    var root = createModalContainer();
    const backdrop = document.createElement('div');
    backdrop.className = 'udhis-modal-backdrop';
    backdrop.style.position='fixed'; backdrop.style.left='0'; backdrop.style.top='0'; backdrop.style.width='100%'; backdrop.style.height='100%';
    backdrop.style.display='flex'; backdrop.style.alignItems='center'; backdrop.style.justifyContent='center';
    backdrop.style.background='rgba(0,0,0,0.45)';
    const modal = document.createElement('div'); modal.className='udhis-modal'; modal.innerHTML = htmlContent;
    modal.style.maxWidth = opts.maxWidth || '520px';
    modal.style.width = 'calc(100% - 32px)';
    modal.style.boxSizing = 'border-box';
    backdrop.appendChild(modal);
    root.appendChild(backdrop);
    // focus trap
    const focusable = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const nodes = modal.querySelectorAll(focusable);
    if(nodes && nodes.length) nodes[0].focus();
    function onKey(e){ if(e.key === 'Escape'){ close(); } if(e.key === 'Tab'){ // trap
        const first = nodes[0], last = nodes[nodes.length-1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    }
    function close(){ try{ backdrop.remove(); }catch(e){} document.removeEventListener('keydown', onKey); if(opts.onClose) opts.onClose(); }
    document.addEventListener('keydown', onKey);
    return { close, modal, backdrop };
  }

  // Patch existing passphrase modal to use polish modal
  function askPassphrasePolished(){
    return new Promise((res)=>{
      const html = '<h3 id="udhis-pass-title">Masukkan Passphrase</h3>'
        + '<p style="color:rgba(0,0,0,.6)">Passphrase tidak disimpan. Minimal 8 karakter.</p>'
        + '<input id="udhis-pass-input" class="enhanced-input" type="password" autocomplete="new-password" style="margin-top:8px">'
        + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">'
        + '<button id="udhis-pass-cancel" class="enhanced-btn secondary">Batal</button>'
        + '<button id="udhis-pass-submit" class="enhanced-btn">OK</button>'
        + '</div>';
      const modal = openModal(html, { maxWidth: '420px' });
      const input = modal.modal.querySelector('#udhis-pass-input');
      const ok = modal.modal.querySelector('#udhis-pass-submit');
      const cancel = modal.modal.querySelector('#udhis-pass-cancel');
      input.focus();
      function cleanup(v){ try{ modal.close(); }catch(e){} res(v); }
      ok.addEventListener('click', ()=>{ const v = input.value || null; cleanup(v); });
      cancel.addEventListener('click', ()=>{ cleanup(null); });
    });
  }

  // --- Replace mock AI reply with real API call (OpenAI as default, pluggable) ---
  // Provider configuration - you can change provider.url or add alternate providers
  const AI_PROVIDERS = {
    'openai': { url: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' }
  };

  // Helper to obtain API key: try secure store, then window.__udhis_global_api_key, then prompt modal fallback
  async function resolveApiKey(){
    try{
      // try secure module if present
      if(window.__udhis_secure_final && typeof window.__udhis_secure_final.getDecryptedApiKey === 'function'){
        try{
          // attempt without passphrase first (ephemeral)
          const key = await window.__udhis_secure_final.getDecryptedApiKey();
          if(key) return key;
        }catch(e){}
        // if not available, ask passphrase
        try{
          const pass = await askPassphrasePolished();
          if(pass === null) { /* user cancelled */ }
          else {
            const key2 = await window.__udhis_secure_final.getDecryptedApiKey(pass);
            if(key2) return key2;
          }
        }catch(e){}
      }
      // next try global variable (for reseller/buyer scenarios)
      if(window.__udhis_global_api_key && typeof window.__udhis_global_api_key === 'string' && window.__udhis_global_api_key.length > 10){
        return window.__udhis_global_api_key;
      }
      // final fallback: prompt user (polished modal)
      const manual = await askPassphrasePolished();
      if(manual && manual.length > 10) return manual;
    }catch(e){}
    return null;
  }

  // AI call function: uses fetch to call provider; supports OpenAI chat completions payload
  async function callAi(promptText, opts){
    opts = opts || {};
    const provider = AI_PROVIDERS[opts.provider || 'openai'];
    if(!provider) throw new Error('AI provider not configured');
    const apiKey = await resolveApiKey();
    if(!apiKey) throw new Error('API key not available');
    const payload = {
      model: provider.model,
      messages: [{ role: 'user', content: promptText }],
      max_tokens: opts.max_tokens || 800,
      temperature: typeof opts.temperature === 'number' ? opts.temperature : 0.2
    };
    // show typing indicator
    const typing = document.createElement('div'); typing.className='ai-typing'; typing.textContent='AI sedang mengetik...'; typing.style.opacity='0.85';
    try{ document.getElementById('chatMessages').appendChild(typing); scrollIntoViewBottom(); }catch(e){}
    const res = await fetch(provider.url, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify(payload)
    });
    try{ typing.remove(); }catch(e){}
    if(!res.ok){
      const txt = await res.text();
      throw new Error('AI API error: ' + res.status + ' ' + txt);
    }
    const data = await res.json();
    // openai returns choices array
    const text = (data && data.choices && data.choices[0] && (data.choices[0].message?.content || data.choices[0].text)) || JSON.stringify(data);
    return text;
  }

  // Wire chat input to real API call
  function scrollIntoViewBottom(){ try{ const c = document.getElementById('chatContainer'); c.scrollTop = c.scrollHeight; }catch(e){} }
  (function wireChatToApi(){
    const sendBtn = document.getElementById('sendMessage'), msgInput = document.getElementById('messageInput'), chatMessages = document.getElementById('chatMessages');
    if(!sendBtn || !msgInput || !chatMessages) return;
    let lastSend = 0;
    sendBtn.addEventListener('click', async function(){
      const now = Date.now(); if(now - lastSend < 600) return; lastSend = now;
      const v = msgInput.value && msgInput.value.trim(); if(!v) return;
      // append user msg
      const userWrap = document.createElement('div'); userWrap.className='user-message enhanced-card'; userWrap.style.alignSelf='flex-end'; userWrap.style.maxWidth='75%';
      const bubble = document.createElement('div'); bubble.className='message-bubble'; bubble.textContent = v; userWrap.appendChild(bubble); chatMessages.appendChild(userWrap); msgInput.value='';
      scrollIntoViewBottom();
      // call AI
      try{
        const aiText = await callAi(v, { provider: 'openai' });
        const aiWrap = document.createElement('div'); aiWrap.className='ai-message enhanced-card'; aiWrap.style.alignSelf='flex-start'; aiWrap.style.maxWidth='75%';
        const aiBubble = document.createElement('div'); aiBubble.className='message-bubble'; aiBubble.textContent = aiText;
        aiWrap.appendChild(aiBubble); chatMessages.appendChild(aiWrap); scrollIntoViewBottom();
      }catch(err){
        showToast('Gagal memanggil AI: ' + (err.message || err), { type:'error', ttl:6000 });
        const errWrap = document.createElement('div'); errWrap.className='ai-message enhanced-card'; errWrap.style.alignSelf='flex-start'; errWrap.style.maxWidth='75%';
        const errBubble = document.createElement('div'); errBubble.className='message-bubble'; errBubble.textContent = 'Gagal memanggil AI: ' + (err.message || err);
        errWrap.appendChild(errBubble); chatMessages.appendChild(errWrap); scrollIntoViewBottom();
      }
    });
    msgInput.addEventListener('keydown', function(e){ if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendBtn.click(); } });
  })();

  // --- EmailJS integration (loads SDK dynamically) ---
  function loadEmailJSSDK(){
    return new Promise((res, rej) => {
      if(window.emailjs && window.emailjs.init) return res(window.emailjs);
      var s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js'; s.onload = function(){ try{ window.emailjs.init(window.__udhis_emailjs_user || ''); }catch(e){} res(window.emailjs); }; s.onerror = rej; document.head.appendChild(s);
    });
  }
  // Create small email UI in the sidebar (below theme grid)
  function setupEmailUI(){
    var container = document.createElement('div'); container.className='enhanced-card'; container.style.marginTop='12px';
    container.innerHTML = '<h4 style="margin:0 0 8px 0">Kirim Email Verifikasi</h4>'
      + '<label style="font-size:12px">Tujuan</label><input id="udhis_email_to" class="enhanced-input" placeholder="email@domain.com">'
      + '<label style="font-size:12px;margin-top:8px">Subjek</label><input id="udhis_email_subject" class="enhanced-input" placeholder="Subjek">'
      + '<label style="font-size:12px;margin-top:8px">Pesan</label><textarea id="udhis_email_body" class="enhanced-input" rows="4" placeholder="Isi pesan..."></textarea>'
      + '<div style="display:flex;gap:8px;margin-top:8px"><button id="udhis_email_preview" class="enhanced-btn secondary">Preview</button><button id="udhis_email_send" class="enhanced-btn">Kirim</button></div>'
      + '<small style="display:block;margin-top:8px;color:rgba(0,0,0,.5)">Butuh EmailJS public key & template. Gunakan EmailJS (opsional).</small>';
    // append to sidebar near themeGrid
    var themeGrid = document.getElementById('themeGrid');
    if(themeGrid && themeGrid.parentElement) themeGrid.parentElement.appendChild(container);
    else document.getElementById('sidebar').appendChild(container);
    // wire preview & send
    document.getElementById('udhis_email_preview').addEventListener('click', function(){
      var to = document.getElementById('udhis_email_to').value || ''; var subj = document.getElementById('udhis_email_subject').value || ''; var body = document.getElementById('udhis_email_body').value || '';
      var html = '<h3>Preview Email</h3><p><strong>To:</strong> '+to+'</p><p><strong>Subject:</strong> '+subj+'</p><hr><div>'+ (body.replace(/\n/g,'<br>')) +'</div>';
      openModal(html, { maxWidth: '520px' });
    });
    document.getElementById('udhis_email_send').addEventListener('click', async function(){
      var to = document.getElementById('udhis_email_to').value || ''; var subj = document.getElementById('udhis_email_subject').value || ''; var body = document.getElementById('udhis_email_body').value || '';
      if(!to || !subj || !body){ showToast('Lengkapi semua field', { type:'warn' }); return; }
      try{
        await loadEmailJSSDK();
        if(!window.emailjs || !window.emailjs.send) throw new Error('EmailJS SDK tidak tersedia');
        var service = localStorage.getItem('udhis_email_service_id') || window.__udhis_email_service || '';
        var template = localStorage.getItem('udhis_email_template_id') || window.__udhis_email_template || '';
        if(!service || !template){ showToast('Service/Template EmailJS belum dikonfigurasi', { type:'warn' }); return; }
        var params = { to_email: to, subject: subj, message: body, timestamp: new Date().toISOString() };
        showToast('Mengirim email...');
        const resp = await window.emailjs.send(service, template, params);
        showToast('Email terkirim', { type:'info' });
      }catch(err){ showToast('Gagal kirim email: ' + (err.message || err), { type:'error', ttl:8000 }); }
    });
  }

  // --- Audit module ---
  window.UDHIS = window.UDHIS || {};
  window.UDHIS.audit = {
    run: function(showUI){
      var report = { time: new Date().toISOString(), checks: {} };
      report.checks.webCrypto = !!(window.crypto && crypto.subtle);
      report.checks.indexedDB = !!window.indexedDB;
      report.checks.workers = !!window.Worker;
      // blob worker test
      try{
        var b = new Blob(['self.postMessage(1)'], { type:'application/javascript' }); var u = URL.createObjectURL(b); var w = new Worker(u); w.terminate(); URL.revokeObjectURL(u); report.checks.blobWorker = true;
      }catch(e){ report.checks.blobWorker = false; report.checks.blobWorkerError = String(e); }
      // CSP heuristic: check for nosniff? (can't fully detect)
      // Browser hint via userAgent
      var ua = navigator.userAgent || '';
      report.browser = ua;
      if(showUI){
        var html = '<h3>Audit Report</h3><p><strong>Time:</strong> '+report.time+'</p><ul>';
        Object.keys(report.checks).forEach(function(k){ html += '<li><strong>'+k+':</strong> ' + String(report.checks[k]) + '</li>'; });
        html += '</ul><p><strong>UserAgent:</strong> '+report.browser+'</p>';
        openModal(html, { maxWidth:'620px' });
      } else {
        console.log('UDHIS audit', report);
      }
      return report;
    }
  };

  // Expose enhanced functions globally for debugging
  window.__udhis_enhanced = { showToast, askPassphrasePolished, callAi, loadEmailJSSDK, setupEmailUI };

  // Initialize email UI after DOM ready
  document.addEventListener('DOMContentLoaded', function(){
    try{ setupEmailUI(); }catch(e){ console.warn('setupEmailUI failed', e); }
    // mark important regions to help developer find them
    try{
      // tag PBKDF2 block if exists
      var scripts = document.querySelectorAll('script');
      scripts.forEach(function(s){ if(s.textContent && s.textContent.indexOf('deriveKeyFromPassphrase') !== -1){ s.textContent = '// 🔒 PBKDF2 Worker Core\\n' + s.textContent; } });
    }catch(e){}
  });

})();

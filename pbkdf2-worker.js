// pbkdf2-worker.js - external worker for PBKDF2 operations
self.onmessage = async function(ev){
  try{
    const { passphrase, saltBase64, iterations } = ev.data;
    const enc = new TextEncoder();
    const pwKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveBits']);
    const salt = saltBase64 ? (function(){ const bin = atob(saltBase64); const arr = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i); return arr.buffer; })() : crypto.getRandomValues(new Uint8Array(16)).buffer;
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, pwKey, 256);
    const bytes = new Uint8Array(bits);
    let binary=''; for(let i=0;i<bytes.byteLength;i++) binary+=String.fromCharCode(bytes[i]);
    const bitsBase64 = btoa(binary);
    let saltBin=''; const sbytes = new Uint8Array(salt); for(let i=0;i<sbytes.length;i++) saltBin+=String.fromCharCode(sbytes[i]);
    const saltBase64Out = btoa(saltBin);
    for(let i=0;i<bytes.length;i++) bytes[i]=0;
    for(let i=0;i<sbytes.length;i++) sbytes[i]=0;
    self.postMessage({ ok:true, bitsBase64, saltBase64: saltBase64Out });
  }catch(e){
    self.postMessage({ ok:false, error:String(e) });
  }
};

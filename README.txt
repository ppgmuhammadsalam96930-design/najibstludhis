stl-udhis-offline-hybrid
=========================
Files:
- sw.js          -> Service Worker (place at repo root: /sw.js)
- inject-offline.js -> Client helper (place in root and include before </body>)
- README.txt

Installation:
1. Put sw.js at repository root so it is served at https://<user>.github.io/stl_udhis/sw.js
2. Put inject-offline.js in repo (root or /assets/) and include in index.html before </body>, e.g.:
   <script src="/inject-offline.js"></script>
3. Commit & deploy (GitHub Pages). First time you open the site with internet, SW will install and cache index.
4. After that, the site will load from cache when offline. Toast notifications indicate offline/online and queued requests auto-flush when online.

Notes:
- Service Worker requires HTTPS (GitHub Pages). If registration fails, inject script will attempt a prefetch fallback using Cache API.
- For operations that must survive offline (e.g., chat/passphrase), use window.__udhis_offline.safeFetch(...) so failed requests are queued and retried automatically.
- If you want forced reload on new SW, modify inject-offline.js to call location.reload() when SW_ACTIVATED is received.

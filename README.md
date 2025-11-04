# STL-UDHIS — Repo-ready

This repository contains a repo-ready version of your STL-UDHIS Assistant HTML with scripts externalized for **GitHub Pages** or general hosting.

## Files
- `index.html` — main HTML (scripts are externalized)
- Extracted JS files (scripts extracted from original HTML), e.g.:
  - `udhis_udhis-secure-inject.js` (from `<script id="udhis-secure-inject">`)
  - `udhis_udhis-inject-script.js` (from `<script id="udhis-inject-script">`)
  - `udhis_udhis-extra-patches.js` (from `<script id="udhis-extra-patches">`)
  - `udhis_udhis-ultimate-enhancements.js` (from `<script id="udhis-ultimate-enhancements">`)
  - `udhis_inline_extracted.js` (combined inline scripts)

- `STL-UDHIS-blueprint-original.txt` — full original HTML as blueprint (unchanged)
- `config.example.json` — example runtime config (do not commit secrets)
- `LICENSE` — MIT license
- `.gitignore` — recommended ignores

## Security notes
- **DO NOT** commit any secret API keys to the repository. Use `config.example.json` as a template and populate real keys in environment-specific configuration (server-side) or local files excluded by `.gitignore`.
- For strict Content-Security-Policy (CSP), consider hosting worker file (`pbkdf2-worker.js`) as an external file and reference it with a proper `script-src` policy or nonce.

## Quick deploy (GitHub Pages)
1. Review and remove any hard-coded keys (search for `__udhis_global_api_key`).
2. Push repository to GitHub.
3. Enable GitHub Pages and point to root branch (or `gh-pages` branch).



## Credits

Developed by ppgmuhammadsalam96930-design
https://github.com/ppgmuhammadsalam96930-design


  _____ _   _ _      _    _   _ _   _ ____   _    _ _____  _____ 
 / ____| \ | | |    | |  | \ | | \ | |  _ \ | |  | |  __ \|  __ \
| (___ |  \| | |    | |  |  \| |  \| | |_) || |  | | |  | | |__) |
 \___ \| . ` | |    | |  | . ` | . ` |  _ < | |  | | |  | |  _  / 
 ____) | |\  | |____| |__| |\  | |\  | |_) || |__| | |__| | | \ \ 
|_____/|_| \_|______|\____|_| \_|_| \_|____/  \____/|_____/|_|  \_\

         STL-UDHIS Secure Edition
  Created Designed Engineered Deployed by PPG Muhammad Salam
    "Dedikasi Guru Sejati yang Mengikuti Perkembangan Zaman"


# STL-UDHIS Secure Edition by PPG Muhammad Salam

**Created, Designed, Engineered, and Deployed by PPG Muhammad Salam**  
Lead Engineer · Full-Stack Developer · UI/UX Architect · System Author

Last updated: 2025-11-05 UTC

## Tagline
A compact secure offline-deployable AI frontend. Multi-passphrase protection, generic API-key support, and mobile-first UX. Built with dedication and attention to security and usability.

## Features
- 🔒 Multi-passphrase system (user, dev, backup) using SHA-256 fingerprint verification and AES-GCM encryption
- 🌐 Accepts generic API Keys — not limited to ChatGPT. Works with any provider if endpoint/proxy config provided
- ⚙️ Optional proxy support so keys can be kept server-side by the buyer
- 📱 Mobile-first responsive UI optimized for Android and iOS (safe-area, viewport, touch targets)
- 🧰 Self-contained single-file `index.html` ready for GitHub Pages deployment
- 🛡️ Security-first: no plaintext passphrases in repo. Use `apply_hashes.js` locally to embed passphrase hashes

## Quick Start (recommended)
1. Download and extract files to your project root or clone this repo.
2. Run locally (on your machine) to embed passphrase hashes into `index.html`:
```bash
node apply_hashes.js
```
3. Follow prompts to enter passphrases for slots:
- user  => unlocks personal AI chat API key
- dev   => unlocks developer features
- backup=> universal backup passphrase
4. Verify `index.html` locally then commit and push to your repo:
```bash
git add index.html
git commit -m "Deploy STL-UDHIS Secure Edition"
git push
```
5. Enable GitHub Pages if desired. Visit the demo URL:
`https://ppgmuhammadsalam96930-design.github.io/stl_udhis/`

## Usage notes for sellers
- Deliver passphrases to buyers out-of-band (WhatsApp, email)
- Encourage buyers to change passphrases on first run and to use own proxy for server-side key storage
- Do not share plaintext passphrases in the repo or public channels

## Security and privacy
- This repo **does not** contain any plaintext secrets. Hashes are produced locally by `apply_hashes.js`
- If you need maximal security consider using server-side secret managers and a proxy to avoid storing any keys in the browser

## Testing checklist (mobile)
- Test on Android Chrome and iOS Safari
- Verify floating controls, modals, and input behavior with keyboard open
- Confirm `window.__udhis_secure.passVerifier.isHashConfigured()` returns true after embedding hashes

## Credits
Developed by **PPG Muhammad Salam**  
Assisted by **ChatGPT (GPT-5 Thinking mini)** for code scaffolding and documentation

## License
MIT License. See LICENSE file or add one as needed.

---
**Note:** This distribution intentionally omits plaintext passphrases. Use `apply_hashes.js` on a secure local machine to configure passphrase hashes before distribution.

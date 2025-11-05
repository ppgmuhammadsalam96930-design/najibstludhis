# 🧰 Developer Guide – STL-UDHIS Secure Edition

This guide is intended for developers or maintainers who want to customize, extend, or audit the STL-UDHIS Secure Edition.
All configuration is modular and can be edited through `config.json`.

## File Structure
stl_udhis/
├── index.html                 # Main UI and client logic
├── config.json                # Non-sensitive configuration
├── apply_hashes.js            # Hash embedding script for passphrases
├── README.md                  # Public documentation
├── DEVELOPER_GUIDE.md         # This document
└── USER_GUIDE.md              # End-user instructions

## Passphrase Handling
- Passphrases are never stored in plaintext.
- Run locally:
```
node apply_hashes.js
```
- Provide three passphrases:
  - user – access AI with personal API key
  - dev – unlock developer tools
  - backup – universal fallback

Hashes are generated and embedded in `index.html`.

## Configuring `config.json`
Key sections to modify:
```
"security": {
  "requirePassphraseOnCall": true,
  "multiPassSupport": true
},
"proxy": {
  "defaultProxy": ""
}
```

## EmailJS Integration
1. Create an EmailJS account.
2. Add your service_id, template_id, and public user_id in `config.json`.
3. Use:
```js
window.__udhis_secure.sendVerificationEmail({
  serviceId: 'service_xxxxx',
  templateId: 'template_xxxxx',
  to_email: 'user@example.com',
  message: 'Verification code: 1234'
});
```

## Smartphone Compatibility
STL-UDHIS is fully optimized for Android and iOS:
- Responsive layout (safe-area padding, touch scaling).
- Soft-keyboard aware input fields.
- Tested on Chrome (Android) and Safari (iOS).
- Supports both dark and light system themes automatically.

## Deployment
1. Commit all files.
2. Enable GitHub Pages: Settings → Pages → Source → Deploy from branch.
3. Access your app at:
https://<username>.github.io/stl_udhis/

## Troubleshooting
- hash verification failed -> re-run apply_hashes.js
- config.json not loaded -> use fallback defaults
- Email not sent -> configure EmailJS keys

## Credits
Developed by PPG Muhammad Salam
Assisted by ChatGPT (GPT-5)

## License
MIT License.

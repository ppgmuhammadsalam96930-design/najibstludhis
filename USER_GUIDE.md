# 📗 User Guide – STL-UDHIS Secure Edition

Welcome to STL-UDHIS, a secure AI web interface built for flexibility and privacy.

## Quick Start
1. Open the website:
   https://ppgmuhammadsalam96930-design.github.io/stl_udhis/
2. Enter your API Key (from any supported provider).
3. (Optional) Enter proxy URL if your provider needs it.
4. Enter the passphrase given by the developer.
5. Start chatting or using AI tools — safely and locally.

## Passphrase System
| Type | Purpose |
|------|---------|
| user | Unlock normal usage with your API Key |
| dev  | Unlock developer features |
| backup | Backup / emergency access |

All passphrases are verified by secure SHA-256 hashes.
No plaintext keys or passwords are ever sent to any server.

## Supported Providers
- OpenAI
- Azure OpenAI
- Anthropic (Claude)
- Google Gemini
- Mistral AI
- Custom / Proxy endpoints

## Email Verification
If the developer enabled EmailJS, you can verify your email:
1. Enter your email in the verification form.
2. Tap Send Verification.
3. Check your inbox for a code or confirmation link.

## Smartphone Use
STL-UDHIS works on Android and iOS:
- UI auto-scales to screen size.
- Works in Chrome, Firefox, Safari mobile.
- Touch-friendly controls.
- Saves your API Key & passphrase locally (safe storage).

## Reset & Backup
If you forget your passphrase:
1. Contact the developer for your backup passphrase.
2. Or clear browser cache → re-enter your API Key and new passphrase.

## Security Notes
- Your API Key is only stored locally (never uploaded).
- Config and encryption use AES-GCM and SHA-256.
- You can update passphrase anytime by re-running apply_hashes.js.

## Credits
Created & Designed by PPG Muhammad Salam
Documentation assistance by ChatGPT (GPT-5)

## License
MIT License.

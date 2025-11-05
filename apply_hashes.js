// apply_hashes.js
// Usage: node apply_hashes.js
// This script will prompt you to enter passphrases locally (no network), compute SHA-256 base64,
// and replace placeholders in index.html IN-PLACE. Run this on your machine where index.html is stored.
//
// SECURITY: Do NOT run this on a remote server or share your passphrases. This script does not send any data anywhere.
// It only reads index.html and writes it back with the hashed values.
//
// Requires Node.js 14+
// Run: node apply_hashes.js
const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

const FILE = 'index.html';
if (!fs.existsSync(FILE)) {
  console.error('index.html not found in current directory. Move this script to the same folder as index.html and run again.');
  process.exit(2);
}

function sha256Base64(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest().toString('base64');
}

async function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

(async function(){
  console.log('This will replace three placeholders in index.html with SHA-256(base64) of the passphrases you provide.');
  console.log('Provide passphrases when prompted. If you want to skip a slot, press Enter to leave placeholder unchanged.');
  const userPass = await prompt('Enter PASS for slot "user" (or ENTER to skip): ');
  const devPass = await prompt('Enter PASS for slot "dev" (or ENTER to skip): ');
  const backupPass = await prompt('Enter PASS for slot "backup" (or ENTER to skip): ');

  let html = fs.readFileSync(FILE, 'utf8');
  if (userPass) {
    const h = sha256Base64(userPass);
    html = html.replace(/<REPLACE_WITH_HASH_USER>/g, h);
    console.log('Replaced USER hash.');
  }
  if (devPass) {
    const h = sha256Base64(devPass);
    html = html.replace(/<REPLACE_WITH_HASH_DEV>/g, h);
    console.log('Replaced DEV hash.');
  }
  if (backupPass) {
    const h = sha256Base64(backupPass);
    html = html.replace(/<REPLACE_WITH_HASH_BACKUP>/g, h);
    console.log('Replaced BACKUP hash.');
  }

  fs.writeFileSync(FILE, html, 'utf8');
  console.log('index.html updated in-place. Keep your passphrases secret and consider having buyers change them after first use.');
})();

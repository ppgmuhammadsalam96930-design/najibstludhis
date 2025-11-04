#!/bin/bash
# ============================================
# STL-UDHIS GitHub Setup Script (Hybrid Version)
# By ChatGPT & ppgmuhammadsalam96930-design
# ============================================

# === Konfigurasi Otomatis (edit kalau mau auto mode) ===
GITHUB_USERNAME="ppgmuhammadsalam96930-design"    # default username (auto mode)
REPO_NAME="stl-udhis"
ZIP_NAME="stl-udhis-repo-ready.zip"
FOLDER_NAME="stl-udhis"

# --- Warna & fungsi echo ---
green="\033[1;32m"; red="\033[1;31m"; yellow="\033[1;33m"; nc="\033[0m"
say() { echo -e "${green}==>${nc} $1"; }

# --- Pastikan alat utama ada ---
say "Memeriksa git dan unzip..."
if command -v pkg >/dev/null 2>&1; then
  pkg install git unzip -y >/dev/null 2>&1 || true
fi
if command -v apt >/dev/null 2>&1; then
  apt update >/dev/null 2>&1 || true
  apt install git unzip -y >/dev/null 2>&1 || true
fi

# --- Masuk ke folder project ---
cd /sdcard/Projects 2>/dev/null || cd ~/Projects 2>/dev/null || cd ~
say "Lokasi kerja: $(pwd)"

# --- Ekstrak ZIP kalau belum ---
if [ ! -d "$FOLDER_NAME" ]; then
  if [ -f "$ZIP_NAME" ]; then
    say "Menemukan ZIP, ekstrak ke $FOLDER_NAME..."
    unzip "$ZIP_NAME" -d "$FOLDER_NAME" >/dev/null
  else
    echo -e "${red}❌ ZIP tidak ditemukan. Pastikan file $ZIP_NAME ada di folder ini.${nc}"
    exit 1
  fi
fi

cd "$FOLDER_NAME" || { echo -e "${red}❌ Gagal masuk folder project.${nc}"; exit 1; }

# --- Setup Git ---
if [ ! -d ".git" ]; then
  git init
fi

say "Menyiapkan konfigurasi Git..."
git config user.name "UDHIS Developer"
git config user.email "developer@example.com"

# --- Commit awal ---
say "Membuat commit awal..."
git add .
git commit -m "Initial commit - STL-UDHIS auto setup from Android" >/dev/null 2>&1 || true

# --- Mode interaktif / otomatis ---
if [ -z "$GITHUB_USERNAME" ]; then
  read -p "Masukkan username GitHub kamu: " GITHUB_USERNAME
fi

say "Username GitHub: $GITHUB_USERNAME"

REMOTE_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# --- Cek remote ---
if ! git remote | grep -q origin; then
  git remote add origin "$REMOTE_URL"
fi

git branch -M main

say "Siap push ke GitHub..."
if git push -u origin main; then
  say "Push berhasil."
else
  echo -e "${yellow}⚠️  Push gagal. Jika diminta, gunakan Personal Access Token sebagai password saat diminta.${nc}"
  echo "  Contoh perintah manual:"
  echo "    git push -u origin main"
  exit 1
fi

# --- Aktifkan GitHub Pages ---
say "Aktifkan GitHub Pages melalui Settings > Pages (branch: main, folder: /root)"

# --- Jalankan audit sederhana ---
say "Menjalankan audit repo..."
echo "Jumlah file:" $(find . -type f | wc -l)
echo "Ukuran total:" $(du -sh . | cut -f1)

say "✅ Selesai! Buka GitHub kamu: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
echo "   Setelah Pages aktif, buka: https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
echo "🚀 Terima kasih — STL-UDHIS siap online!"

# .github/scripts/check_secrets.py
import os
import sys
import re

# Daftar kata kunci berbahaya yang harus dicari
FORBIDDEN_PATTERNS = [
    r'sk_live_[a-zA-Z0-9]+',  # Stripe Live Key
    r'ghp_[a-zA-Z0-9]+',      # GitHub Token
    r'-----BEGIN RSA PRIVATE KEY-----'
]

def scan_file(file_path ):
    """Memindai satu file untuk mencari pola berbahaya."""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for pattern in FORBIDDEN_PATTERNS:
                if re.search(pattern, content):
                    print(f"!!! POTENSI KEBOCORAN DATA DITEMUKAN !!!")
                    print(f"--> File: {file_path}")
                    print(f"--> Pola Terlarang: {pattern}")
                    return True
    except Exception as e:
        print(f"Tidak dapat membaca file {file_path}: {e}")
    return False

def main():
    """Fungsi utama untuk memindai semua file yang diubah."""
    found_secret = False
    for root, _, files in os.walk('.'):
        if '.git' in root:
            continue
        for file in files:
            if scan_file(os.path.join(root, file)):
                found_secret = True
    
    if found_secret:
        sys.exit(1)
    else:
        print("✅ Pemindaian Keamanan Selesai. Tidak ada kebocoran data ditemukan.")
        sys.exit(0)

if __name__ == "__main__":
    main()

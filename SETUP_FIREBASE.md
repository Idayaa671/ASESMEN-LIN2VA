# 📋 PANDUAN SETUP FIREBASE — LIN2VA
## Agar data tersimpan lintas perangkat

---

## 🔥 Langkah 1: Buat Proyek Firebase

1. Buka https://console.firebase.google.com
2. Klik **"Add project"** → Beri nama (misal: `lin2va-spldv`)
3. Nonaktifkan Google Analytics (opsional) → Klik **"Create project"**

---

## 🗄️ Langkah 2: Buat Firestore Database

1. Di menu kiri → klik **"Firestore Database"**
2. Klik **"Create database"**
3. Pilih **"Start in test mode"** → Klik **Next**
4. Pilih lokasi server terdekat (misal: `asia-southeast1`) → **Enable**

---

## 🌐 Langkah 3: Daftarkan Aplikasi Web

1. Di halaman utama proyek → klik ikon **Web** (`</>`)
2. Beri nama app (misal: `lin2va-web`) → Klik **"Register app"**
3. Firebase akan menampilkan **konfigurasi** seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "lin2va-spldv.firebaseapp.com",
  projectId: "lin2va-spldv",
  storageBucket: "lin2va-spldv.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

4. **Salin seluruh konfigurasi tersebut**

---

## ✏️ Langkah 4: Update File `firebase-config.js`

Buka file `firebase-config.js` dan ganti bagian `firebaseConfig` dengan nilai dari langkah 3:

```javascript
const firebaseConfig = {
  apiKey: "GANTI_DENGAN_MILIK_ANDA",
  authDomain: "GANTI_DENGAN_MILIK_ANDA",
  projectId: "GANTI_DENGAN_MILIK_ANDA",
  storageBucket: "GANTI_DENGAN_MILIK_ANDA",
  messagingSenderId: "GANTI_DENGAN_MILIK_ANDA",
  appId: "GANTI_DENGAN_MILIK_ANDA"
};
```

---

## 🔒 Langkah 5: Atur Rules Firestore (Opsional)

Untuk keamanan di produksi, buka **Firestore → Rules** dan ubah ke:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /hasilSPLDV/{document=**} {
      allow read, write: if true; // Test mode
    }
  }
}
```

---

## ✅ Selesai!

Setelah setup, data siswa dari semua perangkat akan tersimpan di:
**Firebase Console → Firestore → hasilSPLDV**

---

## 💾 Fallback Otomatis

Jika Firebase belum dikonfigurasi atau tidak terhubung, aplikasi otomatis menggunakan **localStorage** (tersimpan di perangkat saja). Indikator status terlihat di dashboard:
- 🟢 **Firebase Firestore** = Data lintas perangkat ✅
- 🟡 **Penyimpanan lokal** = Hanya di perangkat ini

---

## 📁 Struktur File

```
lin2va/
├── index.html          ← Halaman utama
├── style.css           ← Desain & tampilan
├── script.js           ← Logika quiz & navigasi
├── firebase-config.js  ← Konfigurasi Firebase ⬅ EDIT INI
└── SETUP_FIREBASE.md   ← Panduan ini
```

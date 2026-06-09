/* ================================================================
   FIREBASE CONFIG — LIN2VA
   ================================================================
   INSTRUKSI SETUP:
   1. Buka https://console.firebase.google.com
   2. Buat project baru (gratis)
   3. Klik "Add app" → pilih Web (</>)
   4. Salin konfigurasi dan ganti nilai di bawah ini
   5. Di Firebase Console → Firestore Database → Create database
      → Start in test mode (untuk pengembangan)
   ================================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyBchXzuAzEZZbcAuv3nbBLaAsnpqtl4iL8",
  authDomain: "asesmen-7fb67.firebaseapp.com",
  databaseURL: "https://asesmen-7fb67-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "asesmen-7fb67",
  storageBucket: "asesmen-7fb67.firebasestorage.app",
  messagingSenderId: "873602548184",
  appId: "1:873602548184:web:2ec5c69ab1bbdc60be72ad",
  measurementId: "G-0MC5PSK0YN"
};

// Inisialisasi Firebase
let db = null;
let firebaseReady = false;

try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
  firebaseReady = true;
  console.log("✅ Firebase berhasil terhubung");
} catch(e) {
  console.warn("⚠️ Firebase tidak terhubung, menggunakan localStorage:", e.message);
  firebaseReady = false;
}

/* ================================================================
   FUNGSI SIMPAN HASIL (Firebase → fallback localStorage)
================================================================ */
async function simpanHasilFirebase(dataSiswa) {
  if (firebaseReady && db) {
    try {
      await db.ref("hasilSPLDV").push({
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("✅ Data tersimpan di Firebase Firestore");
      return true;
    } catch(e) {
      console.error("Firebase save error:", e);
      simpanKeLokalStorage(dataSiswa);
      return false;
    }
  } else {
    simpanKeLokalStorage(dataSiswa);
    return false;
  }
}

/* ================================================================
   FUNGSI BACA DATA (Firebase → fallback localStorage)
================================================================ */
async function bacaDataFirebase() {
  if (firebaseReady && db) {
    try {
      const snapshot = await db.ref("hasilSPLDV").once("value");

let data = [];

snapshot.forEach(child => {

  data.push({
    id: child.key,
    ...child.val()
  });

});

      return { source: "firebase", data };
    } catch(e) {
      console.error("Firebase read error:", e);
      let data = JSON.parse(localStorage.getItem("hasilSPLDV")) || [];
      return { source: "local", data };
    }
  } else {
    let data = JSON.parse(localStorage.getItem("hasilSPLDV")) || [];
    return { source: "local", data };
  }
}

/* ================================================================
   FUNGSI HAPUS DATA
================================================================ */
async function hapusSemuaDataFirebase() {
  if (firebaseReady && db) {
    try {
      await db.ref("hasilSPLDV").remove();
      return true;
    } catch(e) {
      console.error("Firebase delete error:", e);
      return false;
    }
  }
  localStorage.removeItem("hasilSPLDV");
  return true;
}

/* ================================================================
   HELPER: Simpan ke localStorage sebagai fallback
================================================================ */
function simpanKeLokalStorage(dataSiswa) {
  let hasil = JSON.parse(localStorage.getItem("hasilSPLDV")) || [];
  hasil.push(dataSiswa);
  localStorage.setItem("hasilSPLDV", JSON.stringify(hasil));
  console.log("💾 Data tersimpan di localStorage (lokal saja)");
}

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
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
let db = null;
let firebaseReady = false;

try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
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
      await db.collection("hasilSPLDV").add({
        ...dataSiswa,
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
      const snapshot = await db.collection("hasilSPLDV")
        .orderBy("timestamp", "desc")
        .get();

      let data = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
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
      const snapshot = await db.collection("hasilSPLDV").get();
      const batch = db.batch();
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
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

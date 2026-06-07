/* ================================================================
   LIN2VA — MAIN SCRIPT
   Asesmen HOTS SPLDV | C4-C6 | 15 PG + 5 Esai
================================================================ */

let essayScore = 0;
let currentEssay = 0;
let answersEssay = [];
let detailPenilaian = [];
let currentQuestion = 0;
let score = 0;
let nama = "";
let kelas = "";
let timer = null;
let timeLeft = 60;
let feedbackTimer = null;
let feedbackTimeLeft = 60;

const TOTAL_SOAL = 20;

/* ================================================================
   NAVIGASI LAYAR
================================================================ */
function showMateri() {
  hideAll();
  document.getElementById("materi-screen").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function showAsesmen() {
  hideAll();
  document.getElementById("asesmen-screen").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function kembaliHome() {
  hideAll();
  document.getElementById("home-screen").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function hideAll() {
  ["home-screen","materi-screen","asesmen-screen","quiz-screen","result-screen","dashboard-screen"].forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });
}

/* ================================================================
   TAB MATERI
================================================================ */
function switchTab(tabId, btn) {
  document.querySelectorAll(".tab-content").forEach(t => t.classList.add("hidden"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(tabId).classList.remove("hidden");
  btn.classList.add("active");
}

/* ================================================================
   BANK SOAL PG — C4 ANALISIS (5 soal)
================================================================ */
const questions = [

{
  level: "C4",
  indicator: "Menganalisis model SPLDV dari masalah kontekstual",
  question: "Di kantin sekolah, 2 roti dan 3 susu seharga Rp21.000, sedangkan 1 roti dan 2 susu seharga Rp13.000. Manakah model SPLDV yang paling tepat untuk situasi ini?",
  options: [
    "2x − 3y = 21.000 dan x + y = 13.000",
    "2x + 3y = 21.000 dan x + 2y = 13.000",
    "x + y = 21.000 dan 2x + y = 13.000",
    "3x + 2y = 21.000 dan x + 2y = 13.000"
  ],
  answer: 1,
  explanation: "Misalkan x = harga roti dan y = harga susu. Transaksi pertama: 2x + 3y = 21.000 (2 roti + 3 susu). Transaksi kedua: x + 2y = 13.000 (1 roti + 2 susu). Tanda penjumlahan (+) karena mewakili total harga yang dibayarkan."
},

{
  level: "C4",
  indicator: "Membedakan penggunaan operasi yang tepat dalam persamaan",
  question: "Sebuah toko mencatat bahwa 3 buku dan 2 pensil berharga Rp19.000. Seorang siswa menuliskan model 3x − 2y = 19.000. Analisis yang paling tepat terhadap model tersebut adalah...",
  options: [
    "Model benar karena menggunakan dua variabel",
    "Model salah karena tanda operasi tidak sesuai konteks pembelian",
    "Model benar jika x = pensil dan y = buku",
    "Model tidak perlu menggunakan dua variabel"
  ],
  answer: 1,
  explanation: "Dalam konteks pembelian barang, total harga merupakan penjumlahan dari harga semua barang, sehingga operasi yang tepat adalah '+'. Model yang benar seharusnya 3x + 2y = 19.000, bukan 3x − 2y = 19.000."
},

{
  level: "C4",
  indicator: "Mengidentifikasi makna solusi SPLDV dalam konteks nyata",
  question: "Seorang siswa menyelesaikan SPLDV harga barang dan memperoleh x = 4.000 serta y = 3.000. Apa arti solusi tersebut dalam konteks soal?",
  options: [
    "x dan y adalah jumlah barang yang dibeli",
    "x dan y adalah nomor soal dan halaman buku",
    "x dan y adalah harga masing-masing jenis barang",
    "x dan y tidak memiliki arti dalam konteks nyata"
  ],
  answer: 2,
  explanation: "Nilai variabel x dan y merepresentasikan besaran yang didefinisikan di awal pemodelan. Dalam konteks harga barang, x = Rp4.000 adalah harga barang pertama dan y = Rp3.000 adalah harga barang kedua."
},

{
  level: "C4",
  indicator: "Menganalisis urutan langkah penyelesaian SPLDV",
  question: "Pada penyelesaian SPLDV, seorang siswa langsung menggambar grafik tanpa membuat model matematika terlebih dahulu. Analisis yang paling tepat terhadap langkah tersebut adalah...",
  options: [
    "Langkah tersebut tepat karena grafik lebih mudah",
    "Model matematika tetap harus dibuat terlebih dahulu sebelum menggambar grafik",
    "Grafik tidak boleh digunakan sama sekali dalam SPLDV",
    "Langkah tersebut pasti menghasilkan jawaban yang benar"
  ],
  answer: 1,
  explanation: "Model matematika adalah fondasi dari penyelesaian SPLDV. Tanpa model yang tepat, grafik tidak dapat mewakili masalah dengan benar. Urutan yang benar: pahami soal → tentukan variabel → buat model → pilih metode → selesaikan → verifikasi."
},

{
  level: "C4",
  indicator: "Menganalisis kewajaran solusi SPLDV dalam konteks nyata",
  question: "Dalam suatu soal SPLDV tentang harga barang, hasil akhirnya adalah x = −2.000. Analisis yang paling tepat terhadap hasil ini adalah...",
  options: [
    "Hasil pasti benar karena diperoleh dari proses matematika",
    "Nilai negatif tidak mempengaruhi keabsahan jawaban",
    "Harga negatif tidak realistis, kemungkinan ada kesalahan dalam model atau perhitungan",
    "Semua nilai variabel dalam SPLDV boleh negatif"
  ],
  answer: 2,
  explanation: "Harga barang dalam dunia nyata tidak mungkin negatif. Hasil x = −2.000 mengindikasikan adanya kesalahan, bisa dalam membentuk model SPLDV (salah menentukan operasi atau variabel) atau dalam proses perhitungan. Solusi harus selalu dikembalikan ke konteks soal."
},

/* === C5 EVALUASI (5 soal) === */

{
  level: "C5",
  indicator: "Menilai efektivitas pemilihan metode penyelesaian SPLDV",
  question: "Seorang siswa menggunakan metode substitusi pada SPLDV yang koefisiennya besar seperti 7x + 13y = 85 dan 5x + 11y = 67. Evaluasi terbaik terhadap strategi ini adalah...",
  options: [
    "Substitusi adalah metode terbaik untuk semua kasus SPLDV",
    "Substitusi selalu menghasilkan jawaban yang salah",
    "Semua metode tidak dapat digunakan pada koefisien besar",
    "Metode eliminasi mungkin lebih efektif karena koefisien dapat disamakan dengan lebih mudah"
  ],
  answer: 3,
  explanation: "Metode eliminasi lebih efektif untuk koefisien besar karena proses menyamakan koefisien lebih sistematis. Substitusi pada koefisien besar menghasilkan pecahan yang rumit dan meningkatkan risiko kesalahan hitung. Pemilihan metode harus disesuaikan dengan bentuk persamaan."
},

{
  level: "C5",
  indicator: "Memvalidasi kebenaran proses penyelesaian SPLDV",
  question: "Dua siswa menyelesaikan SPLDV yang sama: siswa A menggunakan eliminasi dan siswa B menggunakan substitusi, dan keduanya mendapatkan hasil yang sama. Kesimpulan yang paling tepat adalah...",
  options: [
    "Salah satu metode pasti menghasilkan jawaban yang salah",
    "Hasil yang sama dari metode berbeda justru memperkuat kebenaran jawaban",
    "Metode yang digunakan harus selalu sama dalam satu kelas",
    "SPLDV hanya boleh diselesaikan dengan satu metode resmi"
  ],
  answer: 1,
  explanation: "SPLDV memiliki solusi tunggal yang dapat ditemukan melalui berbagai metode. Jika eliminasi dan substitusi memberikan hasil yang sama, ini justru memvalidasi kebenaran jawaban. Konsistensi hasil dari metode berbeda adalah bukti kuat keabsahan solusi."
},

{
  level: "C5",
  indicator: "Mengevaluasi kewajaran solusi berdasarkan konteks masalah",
  question: "Seorang siswa mendapatkan hasil x = 5.000 dan y = −1.000 dalam soal harga makanan di kantin. Evaluasi yang paling tepat adalah...",
  options: [
    "Jawaban benar sepenuhnya karena proses matematika sudah benar",
    "Nilai negatif pada harga barang tidak masalah dalam matematika",
    "Perlu memeriksa kembali model SPLDV atau proses perhitungan karena harga tidak mungkin negatif",
    "Jawaban langsung diterima dan dicatat sebagai benar"
  ],
  answer: 2,
  explanation: "Harga makanan tidak mungkin negatif dalam dunia nyata. Meskipun proses matematisnya mungkin benar secara teknis, hasil y = −1.000 menunjukkan ada yang salah, bisa pada pembentukan model atau proses eliminasi/substitusi. Verifikasi konteks adalah bagian penting dari penyelesaian HOTS."
},

{
  level: "C5",
  indicator: "Membandingkan dan memilih metode yang paling efisien",
  question: "Perhatikan SPLDV berikut: 3x + 2y = 18 dan 3x − 2y = 6. Metode manakah yang paling efisien untuk menyelesaikannya?",
  options: [
    "Eliminasi, karena koefisien variabel dapat langsung dieliminasi",
    "Substitusi dari persamaan pertama",
    "Menggambar grafik untuk menemukan titik potong",
    "Menebak nilai yang mungkin"
  ],
  answer: 0,
  explanation: "Untuk 3x + 2y = 18 dan 3x − 2y = 6, koefisien x sama (3x) dan koefisien y berlawanan tanda (+2y dan −2y). Dengan eliminasi langsung (penjumlahan): 6x = 24 → x = 4, sangat efisien. Substitusi lebih panjang karena perlu menyatakan satu variabel dulu."
},

{
  level: "C5",
  indicator: "Mengevaluasi pentingnya verifikasi jawaban SPLDV",
  question: "Setelah mendapatkan nilai x = 3 dan y = 5, seorang siswa langsung menuliskan kesimpulan tanpa mengecek ke persamaan awal. Evaluasi terhadap tindakan ini adalah...",
  options: [
    "Langkah tersebut sudah benar dan efisien",
    "Pengecekan kembali penting untuk memastikan solusi memenuhi semua persamaan sekaligus",
    "Pengecekan hanya membuang waktu dalam ujian",
    "Tidak perlu verifikasi jika proses sudah runtut"
  ],
  answer: 1,
  explanation: "Verifikasi adalah langkah kritis dalam penyelesaian SPLDV. Dengan memasukkan x = 3 dan y = 5 ke semua persamaan, kita memastikan nilai tersebut benar-benar memenuhi sistem persamaan secara bersamaan. Kesalahan kecil dalam perhitungan bisa terdeteksi melalui verifikasi."
},

/* === C6 KREASI (5 soal) === */

{
  level: "C6",
  indicator: "Merancang situasi yang tepat untuk dimodelkan sebagai SPLDV",
  question: "Di antara situasi berikut, manakah yang PALING tepat untuk dijadikan model SPLDV?",
  options: [
    "Menentukan warna favorit siswa dalam satu kelas",
    "Menghitung jumlah halaman sebuah buku",
    "Menentukan tinggi badan rata-rata siswa",
    "Mencari harga satuan dua jenis barang dari dua transaksi berbeda"
  ],
  answer: 3,
  explanation: "SPLDV digunakan untuk situasi yang melibatkan tepat dua variabel berbeda yang saling berhubungan melalui dua persamaan linear. 'Mencari harga satuan dua jenis barang dari dua transaksi' memenuhi syarat ini: dua variabel (harga barang A dan B) dan dua persamaan (transaksi 1 dan 2)."
},

{
  level: "C6",
  indicator: "Memilih data yang tepat untuk membentuk persamaan SPLDV",
  question: "Seorang siswa ingin membuat soal SPLDV tentang koperasi sekolah. Data manakah yang paling sesuai untuk dijadikan bahan soal?",
  options: [
    "Harga dua jenis alat tulis dan total harga pembelian dua transaksi berbeda",
    "Daftar nama siswa yang membeli di koperasi",
    "Warna meja dan kursi di koperasi",
    "Jadwal buka koperasi setiap hari"
  ],
  answer: 0,
  explanation: "SPLDV membutuhkan dua variabel dan hubungan matematis yang jelas. 'Harga dua jenis alat tulis dan total dua transaksi' menghasilkan dua persamaan dengan dua variabel (harga item A dan item B), yang merupakan syarat minimal SPLDV yang valid."
},

{
  level: "C6",
  indicator: "Menyusun langkah awal pemodelan SPLDV secara mandiri",
  question: "Untuk membuat model SPLDV dari masalah sehari-hari, apakah langkah pertama yang paling mendasar dan paling penting?",
  options: [
    "Langsung menggambar grafik persamaan",
    "Menghafal semua rumus SPLDV",
    "Menentukan dan mendefinisikan variabel dengan jelas",
    "Menjumlahkan semua angka dalam soal"
  ],
  answer: 2,
  explanation: "Menentukan variabel adalah fondasi pemodelan SPLDV. Tanpa mendefinisikan apa yang diwakili x dan y secara jelas, persamaan tidak dapat dibentuk dengan bermakna. Semua langkah berikutnya bergantung pada ketepatan definisi variabel ini."
},

{
  level: "C6",
  indicator: "Mengkonstruksi model SPLDV dengan variabel yang jelas berbeda",
  question: "Sebuah kelompok membuat soal SPLDV tentang jumlah motor dan mobil di parkiran. Agar model SPLDV mereka valid, yang paling harus dipastikan adalah...",
  options: [
    "Semua angka dalam soal harus memiliki nilai yang sama",
    "Setiap variabel mewakili satu jenis objek yang berbeda secara jelas",
    "Hasil akhir harus selalu bilangan bulat positif",
    "Variabel tidak diperlukan jika sudah ada angka"
  ],
  answer: 1,
  explanation: "Kejelasan definisi variabel adalah kunci validitas model SPLDV. Misalkan x = jumlah motor dan y = jumlah mobil (bukan keduanya = kendaraan). Tanpa pembedaan ini, dua variabel menjadi redundan dan sistem persamaan tidak dapat diselesaikan secara unik."
},

{
  level: "C6",
  indicator: "Merancang soal cerita SPLDV yang lengkap dan kontekstual",
  question: "Informasi paling penting yang HARUS ada dalam soal cerita SPLDV yang baik dan dapat diselesaikan adalah...",
  options: [
    "Dua hubungan matematika yang berbeda melibatkan dua variabel yang sama",
    "Keterangan warna dan ukuran setiap objek dalam soal",
    "Nama lengkap dan usia semua tokoh dalam soal",
    "Gambar dekorasi dan ilustrasi yang menarik"
  ],
  answer: 0,
  explanation: "Soal SPLDV yang valid harus menyediakan tepat dua persamaan berbeda yang melibatkan dua variabel yang sama. Tanpa dua hubungan matematis yang berbeda, sistem persamaan tidak memiliki solusi tunggal. Ini adalah syarat matematis yang tidak bisa ditawar."
}

];

/* ================================================================
   SOAL ESAI HOTS
================================================================ */
const essayQuestions = [

{
  essay: true,
  level: "C4",
  indicator: "Menganalisis dan membentuk model SPLDV dari data kontekstual",
  question: "Di koperasi sekolah, 2 buku tulis dan 3 pensil seharga Rp19.000. Sementara itu, 4 buku tulis dan 1 pensil seharga Rp23.000.\n\nAnalisislah bagaimana membentuk model SPLDV dari informasi tersebut, lalu tentukan harga satu buku tulis dan satu pensil secara runtut dengan langkah yang jelas.",
  answerGuide: "Misalkan x = harga buku tulis dan y = harga pensil. Model SPLDV: 2x + 3y = 19.000 dan 4x + y = 23.000. Eliminasi y: kalikan pers. 2 × 3 → 12x + 3y = 69.000. Kurangkan dari pers. 1: 10x = 50.000 → x = 5.000. Substitusi: y = 23.000 − 4(5.000) = 3.000. Harga buku = Rp5.000, pensil = Rp3.000.",
  rubric: {
    4: "Model SPLDV tepat, langkah penyelesaian lengkap dan runtut, analisis logis",
    3: "Model benar tetapi langkah penyelesaian kurang lengkap atau kurang jelas",
    2: "Ada pemahaman konsep SPLDV tetapi ada kesalahan dalam model atau perhitungan",
    1: "Jawaban belum menunjukkan analisis SPLDV yang benar",
    0: "Tidak menjawab atau tidak relevan"
  }
},

{
  essay: true,
  level: "C4",
  indicator: "Menganalisis alasan penggunaan SPLDV dalam situasi nyata",
  question: "Sebuah kantin menjual paket makanan. Paket A (1 nasi goreng + 2 es teh) seharga Rp20.000. Paket B (2 nasi goreng + 1 es teh) seharga Rp25.000.\n\nAnalisislah mengapa situasi ini dapat diselesaikan menggunakan SPLDV, dan jelaskan langkah penyelesaiannya secara lengkap.",
  answerGuide: "Dapat diselesaikan dengan SPLDV karena ada dua variabel (harga nasi goreng = x dan harga es teh = y) dan dua hubungan matematika berbeda. Model: x + 2y = 20.000 dan 2x + y = 25.000. Eliminasi: kurangkan → x − y = 5.000. Digabung: 2x = 30.000 → x = 10.000, y = 5.000.",
  rubric: {
    4: "Alasan SPLDV tepat, model benar, langkah lengkap dan runtut",
    3: "Konsep benar tetapi penjelasan alasan atau langkah kurang lengkap",
    2: "Sebagian konsep benar namun penyelesaian kurang runtut",
    1: "Jawaban kurang sesuai konsep SPLDV",
    0: "Tidak menjawab"
  }
},

{
  essay: true,
  level: "C5",
  indicator: "Mengevaluasi kemasukakalan solusi SPLDV dalam konteks nyata",
  question: "Seorang siswa menyelesaikan SPLDV harga barang dan memperoleh: harga pensil = Rp−1.000 dan harga buku = Rp5.000.\n\nEvaluasilah secara kritis apakah hasil tersebut masuk akal dalam kehidupan sehari-hari. Jelaskan kemungkinan kesalahan yang dilakukan siswa tersebut dan bagaimana cara memperbaikinya.",
  answerGuide: "Harga barang tidak mungkin negatif dalam dunia nyata, sehingga hasil tidak masuk akal. Kemungkinan kesalahan: (1) salah menentukan tanda operasi dalam model (menggunakan − alih-alih +), (2) kesalahan dalam proses eliminasi (salah tanda saat mengurangkan persamaan), atau (3) kesalahan substitusi. Cara memperbaiki: cek ulang model, pastikan operasi penjumlahan untuk total harga, dan verifikasi setiap langkah.",
  rubric: {
    4: "Evaluasi logis, alasan kuat, menemukan kemungkinan kesalahan, dan menyarankan perbaikan",
    3: "Evaluasi benar tetapi alasan atau saran perbaikan kurang lengkap",
    2: "Ada usaha mengevaluasi namun kurang tepat atau kurang mendalam",
    1: "Jawaban tidak sesuai konteks evaluasi",
    0: "Tidak menjawab"
  }
},

{
  essay: true,
  level: "C5",
  indicator: "Membandingkan metode dan memilih yang paling efektif",
  question: "Bandingkan metode eliminasi dan metode substitusi dalam menyelesaikan SPLDV. Menurutmu, metode mana yang lebih efektif untuk menyelesaikan persamaan berikut?\n\n2x + y = 15\n2x − y = 5\n\nJelaskan alasanmu secara rinci dan selesaikan menggunakan metode yang kamu pilih.",
  answerGuide: "Eliminasi lebih efektif karena koefisien y berlawanan tanda (+y dan −y), sehingga langsung bisa dijumlah: 4x = 20 → x = 5. Substitusi ke pers. 1: 10 + y = 15 → y = 5. Alasan: eliminasi lebih cepat karena tidak perlu menyatakan satu variabel dulu. Substitusi membutuhkan langkah tambahan.",
  rubric: {
    4: "Perbandingan jelas, alasan logis, penyelesaian benar dan lengkap",
    3: "Perbandingan benar tetapi alasan kurang kuat atau penyelesaian kurang lengkap",
    2: "Jawaban masih umum, kurang tepat dalam membandingkan",
    1: "Tidak memahami perbedaan kedua metode",
    0: "Tidak menjawab"
  }
},

{
  essay: true,
  level: "C6",
  indicator: "Merancang dan menyelesaikan soal cerita SPLDV secara mandiri",
  question: "Buatlah sebuah soal cerita kontekstual tentang kehidupan di sekolah atau kegiatan sehari-hari yang dapat diselesaikan menggunakan SPLDV. Tuliskan secara lengkap:\n1. Soal cerita yang kamu buat\n2. Definisi variabel (x = ... , y = ...)\n3. Model SPLDV (dua persamaan)\n4. Langkah penyelesaian secara runtut\n5. Kesimpulan jawaban",
  answerGuide: "Siswa bebas berkreasi membuat soal sendiri yang kontekstual. Kriteria: ada situasi nyata, dua variabel jelas didefinisikan, dua persamaan linear terbentuk, penyelesaian runtut menggunakan salah satu metode, kesimpulan kembali ke konteks soal. Contoh: soal tentang harga tiket, biaya les, jual beli di kantin, dll.",
  rubric: {
    4: "Soal kreatif dan kontekstual, variabel jelas, model tepat, penyelesaian lengkap dan runtut",
    3: "Soal baik tetapi ada sedikit kesalahan dalam model atau langkah penyelesaian",
    2: "Soal kurang kontekstual atau penyelesaian tidak lengkap",
    1: "Belum menunjukkan kemampuan merancang SPLDV secara mandiri",
    0: "Tidak menjawab"
  }
}

];

/* ================================================================
   MULAI QUIZ
================================================================ */
function mulaiQuiz() {
  nama = document.getElementById("nama").value.trim();
  kelas = document.getElementById("kelas").value.trim();

  if (nama === "" || kelas === "") {
    alert("Masukkan nama dan kelas terlebih dahulu!");
    return;
  }

  // Reset semua state
  currentQuestion = 0;
  score = 0;
  essayScore = 0;
  currentEssay = 0;
  answersEssay = [];
  detailPenilaian = [];

  hideAll();
  document.getElementById("quiz-screen").classList.remove("hidden");
  document.getElementById("score").innerHTML = "Skor: 0";
  showQuestion();
  window.scrollTo(0, 0);
}

/* ================================================================
   UPDATE PROGRESS
================================================================ */
function updateProgress(soalKeberapa) {
  let pct = (soalKeberapa / TOTAL_SOAL) * 100;
  document.getElementById("progress").style.width = pct + "%";
  document.getElementById("progress-label").innerHTML =
    "Progres: " + soalKeberapa + " / " + TOTAL_SOAL + " soal";
}

/* ================================================================
   TAMPILKAN SOAL PG
================================================================ */
function showQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("nomor").innerHTML =
    "Soal " + (currentQuestion + 1) + " / " + TOTAL_SOAL;

  let badgeClass = q.level === "C5" ? "badge-c5" : q.level === "C6" ? "badge-c6" : "badge-c4";
  let levelName = q.level === "C4" ? "Analisis" : q.level === "C5" ? "Evaluasi" : "Kreasi";

  document.getElementById("soal-badge").innerHTML =
    `<span class="badge-kognitif ${badgeClass}">${q.level} — ${levelName}</span>
     <span class="badge-pg">Pilihan Ganda</span>
     <span class="badge-indikator-text">📍 ${q.indicator}</span>`;

  document.getElementById("question").innerHTML = q.question;

  let optionsHTML = "";
  q.options.forEach((option, index) => {
    optionsHTML += `<button class="option-btn" onclick="checkAnswer(${index})">${option}</button>`;
  });

  document.getElementById("options").innerHTML = optionsHTML;
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("feedback").innerHTML = "";
  document.getElementById("feedback-countdown").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("essay-box").classList.add("hidden");

  updateProgress(currentQuestion);
  startTimerPG();
}

/* ================================================================
   CEK JAWABAN PG
================================================================ */
function checkAnswer(selected) {
  clearInterval(timer);
  let q = questions[currentQuestion];
  let feedback = document.getElementById("feedback");

  if (selected === q.answer) {
    score++;
    document.getElementById("score").innerHTML = "Skor: " + score;
    feedback.innerHTML = `<h3>✅ Jawaban Benar!</h3><p>${q.explanation}</p>`;
  } else {
    feedback.innerHTML = `<h3>❌ Jawaban Kurang Tepat</h3><p>${q.explanation}</p>`;
  }

  feedback.classList.remove("hidden");
  document.querySelectorAll(".option-btn").forEach(btn => { btn.disabled = true; });

  startFeedbackCountdown(() => { nextQuestion(); });
}

/* ================================================================
   NEXT SOAL PG
================================================================ */
function nextQuestion() {
  clearFeedbackCountdown();
  currentQuestion++;
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("feedback-countdown").classList.add("hidden");

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showEssay();
  }
}

/* ================================================================
   TAMPILKAN ESAI
================================================================ */
function showEssay() {
  let soalGlobal = questions.length + currentEssay;

  document.getElementById("options").innerHTML = "";
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("feedback-countdown").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");

  let q = essayQuestions[currentEssay];

  document.getElementById("nomor").innerHTML = "Soal " + (soalGlobal + 1) + " / " + TOTAL_SOAL;

  let badgeClass = q.level === "C5" ? "badge-c5" : q.level === "C6" ? "badge-c6" : "badge-c4";
  let levelName = q.level === "C4" ? "Analisis" : q.level === "C5" ? "Evaluasi" : "Kreasi";

  document.getElementById("soal-badge").innerHTML =
    `<span class="badge-kognitif ${badgeClass}">${q.level} — ${levelName}</span>
     <span class="badge-esai">✍️ Uraian</span>
     <span class="badge-indikator-text">📍 ${q.indicator}</span>`;

  document.getElementById("question").innerHTML = q.question.replace(/\n/g, "<br>");

  document.getElementById("essay-box").classList.remove("hidden");
  document.getElementById("essay-answer").value = "";

  updateProgress(soalGlobal);
  startTimerEssay();
}

/* ================================================================
   SUBMIT ESAI
================================================================ */
function submitEssay() {
  clearInterval(timer);
  let jawaban = document.getElementById("essay-answer").value;

  if (jawaban.trim() === "") {
    alert("Jawaban tidak boleh kosong!");
    return;
  }

  let soal = essayQuestions[currentEssay];
  let skor = cekSkorEsai(jawaban, soal);

  essayScore += skor;
  detailPenilaian.push({
    soal: soal.question,
    level: soal.level,
    indicator: soal.indicator,
    skor: skor
  });
  answersEssay.push(jawaban);

  let feedbackText = "";
  if (skor === 4) feedbackText = "🌟 Sangat baik! Jawaban lengkap, model SPLDV benar, dan analisis sangat kuat.";
  else if (skor === 3) feedbackText = "👍 Baik! Model sudah benar, tetapi beberapa bagian belum lengkap.";
  else if (skor === 2) feedbackText = "⚠️ Cukup. Ada pemahaman SPLDV, tetapi jawaban belum runtut dan lengkap.";
  else feedbackText = "❌ Perlu perbaikan. Jawaban belum menunjukkan pemahaman SPLDV yang cukup.";

  document.getElementById("feedback").innerHTML =
    `<h3>📘 Feedback Esai (${soal.level})</h3>
     <p><b>Skor:</b> ${skor}/4</p>
     <p>${feedbackText}</p>
     <hr>
     <p><b>Kunci Jawaban:</b></p>
     <p>${soal.answerGuide}</p>`;

  document.getElementById("feedback").classList.remove("hidden");
  document.getElementById("essay-box").classList.add("hidden");

  let soalGlobal = questions.length + currentEssay;
  updateProgress(soalGlobal + 1);

  currentEssay++;

  if (currentEssay < essayQuestions.length) {
    startFeedbackCountdown(() => { showEssay(); });
  } else {
    startFeedbackCountdown(() => { showResult(); });
  }
}

/* ================================================================
   FEEDBACK COUNTDOWN
================================================================ */
function startFeedbackCountdown(callback) {
  clearFeedbackCountdown();
  feedbackTimeLeft = 60;

  let countdownEl = document.getElementById("feedback-countdown");
  let nextBtn = document.getElementById("nextBtn");

  countdownEl.innerHTML =
    `Lanjut otomatis dalam <span>${feedbackTimeLeft}</span> detik. <a href="#" onclick="skipFeedback(); return false;" style="color:#facc15;">Lanjut sekarang →</a>`;
  countdownEl.classList.remove("hidden");

  nextBtn.classList.remove("hidden");
  nextBtn.textContent = "Soal Berikutnya (" + feedbackTimeLeft + ")";
  nextBtn.onclick = function () {
    clearFeedbackCountdown();
    callback();
  };

  feedbackTimer = setInterval(() => {
    feedbackTimeLeft--;
    let sp = countdownEl.querySelector("span");
    if (sp) sp.textContent = feedbackTimeLeft;
    nextBtn.textContent = "Soal Berikutnya (" + feedbackTimeLeft + ")";
    if (feedbackTimeLeft <= 0) {
      clearFeedbackCountdown();
      callback();
    }
  }, 1000);
}

function clearFeedbackCountdown() {
  if (feedbackTimer) { clearInterval(feedbackTimer); feedbackTimer = null; }
}

function skipFeedback() {
  document.getElementById("nextBtn").click();
}

/* ================================================================
   TIMER PG (60 detik)
================================================================ */
function startTimerPG() {
  clearInterval(timer);
  timeLeft = 60;
  let timerEl = document.getElementById("timer");
  let timerBox = document.getElementById("timer-box");
  timerEl.innerHTML = timeLeft;
  timerBox.classList.remove("warning");

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft <= 10) timerBox.classList.add("warning");
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏰ Waktu habis!");
      checkAnswer(-1);
    }
  }, 1000);
}

/* ================================================================
   TIMER ESAI (120 detik)
================================================================ */
function startTimerEssay() {
  clearInterval(timer);
  timeLeft = 120;
  let timerEl = document.getElementById("timer");
  let timerBox = document.getElementById("timer-box");
  timerEl.innerHTML = timeLeft;
  timerBox.classList.remove("warning");

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft <= 15) timerBox.classList.add("warning");
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏰ Waktu esai habis!");
      document.getElementById("essay-answer").value += "\n\n(Waktu habis - jawaban otomatis dikirim)";
      submitEssay();
    }
  }, 1000);
}

/* ================================================================
   PENILAIAN ESAI — KEYWORD SCORING
================================================================ */
function cekSkorEsai(jawaban, soal) {
  let text = jawaban.toLowerCase().trim();
  let skor = 0;

  if (text.length < 15 || text === "asdf" || text === "qwerty" || text === "aaa" || text === "bbb") return 0;

  let kataKunci = [
    "x", "y", "persamaan", "spldv", "eliminasi",
    "substitusi", "variabel", "harga", "model",
    "penyelesaian", "metode", "hasil", "misalkan", "maka"
  ];

  let jumlahKataKunci = 0;
  kataKunci.forEach(kata => { if (text.includes(kata)) jumlahKataKunci++; });

  let jumlahKata = text.split(/\s+/).length;

  if (soal.level === "C4") {
    if (jumlahKataKunci >= 6 && jumlahKata >= 30) skor = 4;
    else if (jumlahKataKunci >= 4 && jumlahKata >= 20) skor = 3;
    else if (jumlahKataKunci >= 2) skor = 2;
    else skor = 1;
  } else if (soal.level === "C5") {
    if ((text.includes("tidak masuk akal") || text.includes("tidak mungkin") || text.includes("kesalahan")) && jumlahKata >= 20) skor = 4;
    else if (text.includes("kesalahan") || text.includes("evaluasi") || text.includes("efektif")) skor = 3;
    else if (jumlahKataKunci >= 2) skor = 2;
    else skor = 1;
  } else if (soal.level === "C6") {
    if (jumlahKataKunci >= 6 && text.includes("=") && jumlahKata >= 30) skor = 4;
    else if (jumlahKataKunci >= 4 && text.includes("=")) skor = 3;
    else if (jumlahKataKunci >= 2) skor = 2;
    else skor = 1;
  }

  return skor;
}

/* ================================================================
   HASIL AKHIR
================================================================ */
function showResult() {
  clearInterval(timer);
  clearFeedbackCountdown();

  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("feedback").innerHTML = "";

  hideAll();
  document.getElementById("result-screen").classList.remove("hidden");

  let nilaiPG = Math.round((score / questions.length) * 100);
  let nilaiEsai = Math.round((essayScore / (essayQuestions.length * 4)) * 100);
  let nilaiAkhir = Math.round((nilaiPG + nilaiEsai) / 2);

  simpanHasil(nilaiPG, nilaiEsai, nilaiAkhir);

  document.getElementById("finalName").innerHTML = "👤 " + nama;
  document.getElementById("finalClass").innerHTML = "🏫 Kelas " + kelas;

  document.getElementById("finalScore").innerHTML = `
    <div class="skor-hasil">
      <div class="skor-row"><span>Nilai Pilihan Ganda</span><b>${nilaiPG}</b></div>
      <div class="skor-row"><span>Nilai Uraian</span><b>${nilaiEsai}</b></div>
      <div class="skor-akhir">🏆 Nilai Akhir: ${nilaiAkhir}</div>
      <button onclick="lihatPenilaian()" style="margin-top:15px;">📊 Lihat Rincian Penilaian</button>
      <button onclick="showDashboard()" style="margin-top:10px; background:#2563eb; color:white;">📋 Lihat Dashboard</button>
      <button onclick="kembaliHome()" style="margin-top:10px; background:rgba(255,255,255,0.2); color:white;">🏠 Kembali ke Beranda</button>
      <div id="detail-penilaian"></div>
    </div>
  `;

  let motivasi = "";
  if (nilaiAkhir >= 80) motivasi = "🌟 Luar biasa! Kamu sangat menguasai HOTS SPLDV.";
  else if (nilaiAkhir >= 60) motivasi = "👍 Bagus! Terus tingkatkan kemampuan berpikirmu.";
  else motivasi = "💪 Semangat! Pelajari kembali materinya dan coba lagi.";

  document.getElementById("motivasi").innerHTML = motivasi;
  window.scrollTo(0, 0);
}

/* ================================================================
   SIMPAN HASIL (Firebase → localStorage)
================================================================ */
async function simpanHasil(nilaiPG, nilaiEsai, nilaiAkhir) {
  let dataSiswa = {
    nama: nama,
    kelas: kelas,
    nilaiPG: nilaiPG,
    nilaiEsai: nilaiEsai,
    nilaiAkhir: nilaiAkhir,
    tanggal: new Date().toLocaleString("id-ID")
  };

  if (typeof simpanHasilFirebase === "function") {
    await simpanHasilFirebase(dataSiswa);
  } else {
    let hasil = JSON.parse(localStorage.getItem("hasilSPLDV")) || [];
    hasil.push(dataSiswa);
    localStorage.setItem("hasilSPLDV", JSON.stringify(hasil));
  }
}

/* ================================================================
   RINCIAN PENILAIAN
================================================================ */
function lihatPenilaian() {
  let totalPG = questions.length;
  let benarPG = score;
  let salahPG = totalPG - benarPG;
  let poinPerPG = (100 / totalPG).toFixed(2);
  let totalPoinPG = (benarPG * (100 / totalPG)).toFixed(2);

  let html = `
    <div class="penilaian-box">
      <h2>📊 Rincian Penilaian</h2>
      <hr>
      <h3 style="color:#2563eb;">✅ Penilaian Pilihan Ganda</h3>
      <p><b>Jumlah Soal:</b> ${totalPG}</p>
      <p><b>Jawaban Benar:</b> ${benarPG}</p>
      <p><b>Jawaban Salah:</b> ${salahPG}</p>
      <p><b>Poin Tiap Soal:</b> 100 ÷ ${totalPG} = ${poinPerPG}</p>
      <p><b>Total Nilai PG:</b> ${benarPG} × ${poinPerPG} = <b>${totalPoinPG}</b></p>
      <hr>
      <h3 style="color:#16a34a;">📝 Penilaian Uraian</h3>
  `;

  detailPenilaian.forEach((item, index) => {
    let alasan = "";
    if (item.skor === 4) alasan = "✅ Variabel tepat · ✅ Model SPLDV benar · ✅ Penyelesaian lengkap · ✅ Analisis runtut";
    else if (item.skor === 3) alasan = "✅ Konsep SPLDV benar · ✅ Model sesuai · ⚠️ Penjelasan kurang lengkap";
    else if (item.skor === 2) alasan = "✅ Ada pemahaman konsep · ⚠️ Masih ada kesalahan model atau perhitungan";
    else alasan = "❌ Model tidak tepat · ❌ Penyelesaian belum sesuai konsep SPLDV";

    html += `
      <div style="background:#f8fafc; padding:18px; margin-top:15px; border-radius:12px; border-left:5px solid #2563eb; color:#111827;">
        <h4>Soal Uraian ${index + 1} — ${item.level}</h4>
        <p style="font-size:13px; color:#475569;"><i>📍 ${item.indicator}</i></p>
        <p><b>Skor:</b> ${item.skor}/4</p>
        <p>${alasan}</p>
      </div>
    `;
  });

  let nilaiPG = Math.round((score / questions.length) * 100);
  let nilaiEsai = Math.round((essayScore / (essayQuestions.length * 4)) * 100);
  let nilaiAkhir = Math.round((nilaiPG + nilaiEsai) / 2);

  html += `
    <hr>
    <h3 style="color:#dc2626;">🎯 Perhitungan Nilai Akhir</h3>
    <p><b>Nilai PG:</b> ${nilaiPG}</p>
    <p><b>Nilai Uraian:</b> ${nilaiEsai}</p>
    <p><b>Rumus:</b> (${nilaiPG} + ${nilaiEsai}) ÷ 2</p>
    <div style="background:#ecfeff; padding:15px; border-radius:10px; margin-top:15px; border:2px solid #70c7d6;">
      <h2 style="color:#0f172a; margin:0;">🏆 Nilai Akhir = ${nilaiAkhir}</h2>
    </div>
    </div>
  `;

  document.getElementById("detail-penilaian").innerHTML = html;
}

/* ================================================================
   DASHBOARD
================================================================ */
async function showDashboard() {
  hideAll();
  document.getElementById("dashboard-screen").classList.remove("hidden");
  window.scrollTo(0, 0);

  let statusEl = document.getElementById("cloud-status");
  statusEl.innerHTML = "⏳ Memuat data...";
  statusEl.style.color = "#94a3b8";

  let result = { source: "local", data: [] };

  if (typeof bacaDataFirebase === "function") {
    result = await bacaDataFirebase();
  } else {
    result.data = JSON.parse(localStorage.getItem("hasilSPLDV")) || [];
  }

  if (result.source === "firebase") {
    statusEl.innerHTML = `☁️ Firebase Firestore — ${result.data.length} data (lintas perangkat)`;
    statusEl.style.color = "#34d399";
  } else {
    statusEl.innerHTML = `💾 Penyimpanan lokal — ${result.data.length} data`;
    statusEl.style.color = "#f59e0b";
  }

  tampilkanDashboard(result.data);
}

function tampilkanDashboard(data) {
  // Grafik
  let sorted = [...data].sort((a, b) => b.nilaiAkhir - a.nilaiAkhir);

  if (data.length > 0) {
    let ctx = document.getElementById("nilaiChart").getContext("2d");
    if (window.nilaiChartInstance) window.nilaiChartInstance.destroy();

    window.nilaiChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.slice(0, 10).map(d => d.nama),
        datasets: [{
          label: "Nilai Akhir",
          data: data.slice(0, 10).map(d => d.nilaiAkhir),
          backgroundColor: "rgba(250,204,21,0.8)",
          borderColor: "#facc15",
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 100 }
        }
      }
    });
  }

  let html = "";

  if (data.length === 0) {
    html = `<div style="text-align:center; padding:30px; color:#94a3b8;">Belum ada data hasil siswa.</div>`;
  } else {
    // Leaderboard
    html += `
      <div class="leaderboard-box">
        <h2>🏆 Leaderboard 5 Besar</h2>
        <table>
          <tr><th>Rank</th><th>Nama</th><th>Kelas</th><th>Nilai</th></tr>
    `;
    sorted.slice(0, 5).forEach((item, i) => {
      let medal = ["🥇", "🥈", "🥉", "🏅", "🏅"][i];
      html += `<tr><td>${medal}</td><td>${item.nama}</td><td>${item.kelas}</td><td><b>${item.nilaiAkhir}</b></td></tr>`;
    });
    html += `</table></div>`;

    // Tabel lengkap
    html += `
      <table class="data-table" style="margin-top:20px;">
        <thead>
          <tr style="background:#2563eb; color:white;">
            <th>No</th><th>Nama</th><th>Kelas</th><th>PG</th><th>Uraian</th><th>Akhir</th><th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
    `;
    data.forEach((item, i) => {
      html += `
        <tr>
          <td>${i + 1}</td>
          <td>${item.nama}</td>
          <td>${item.kelas}</td>
          <td>${item.nilaiPG}</td>
          <td>${item.nilaiEsai}</td>
          <td><b>${item.nilaiAkhir}</b></td>
          <td>${item.tanggal}</td>
        </tr>
      `;
    });
    html += `</tbody></table>`;
  }

  document.getElementById("dashboard-data").innerHTML = html;
}

/* ================================================================
   HAPUS DASHBOARD
================================================================ */
async function hapusDashboard() {
  if (!confirm("Yakin ingin menghapus seluruh data hasil siswa?")) return;

  if (typeof hapusSemuaDataFirebase === "function") {
    await hapusSemuaDataFirebase();
  }
  localStorage.removeItem("hasilSPLDV");

  document.getElementById("dashboard-data").innerHTML =
    `<div style="text-align:center; padding:20px; color:#34d399;">✅ Semua data berhasil dihapus</div>`;
  document.getElementById("cloud-status").innerHTML = "🗑 Data berhasil dihapus";
}

/* ================================================================
   EXPORT EXCEL
================================================================ */
async function exportExcel() {
  let data = [];

  if (typeof bacaDataFirebase === "function") {
    let result = await bacaDataFirebase();
    data = result.data;
  } else {
    data = JSON.parse(localStorage.getItem("hasilSPLDV")) || [];
  }

  if (data.length === 0) {
    alert("Tidak ada data untuk diexport!");
    return;
  }

  let tabel = `<table border="1">
    <tr><th>No</th><th>Nama</th><th>Kelas</th><th>Nilai PG</th><th>Nilai Uraian</th><th>Nilai Akhir</th><th>Tanggal</th></tr>`;
  data.forEach((item, i) => {
    tabel += `<tr>
      <td>${i + 1}</td><td>${item.nama}</td><td>${item.kelas}</td>
      <td>${item.nilaiPG}</td><td>${item.nilaiEsai}</td>
      <td>${item.nilaiAkhir}</td><td>${item.tanggal}</td>
    </tr>`;
  });
  tabel += `</table>`;

  let blob = new Blob(['\ufeff', tabel], { type: 'application/vnd.ms-excel' });
  let url = URL.createObjectURL(blob);
  let link = document.createElement("a");
  link.href = url;
  link.download = "Dashboard_LIN2VA_SPLDV.xls";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

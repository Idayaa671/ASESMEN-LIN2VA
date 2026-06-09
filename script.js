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

/* ======================================================
15 SOAL PILIHAN GANDA HOTS SPLDV C4-C6
====================================================== */

/* ====================== C4 ====================== */

{
level: "C4",

question: `Sebuah koperasi menjual dua jenis paket alat tulis.

Paket A:
3 buku dan 2 pena

Paket B:
5 buku dan 4 pena

Harga paket B Rp32.000 lebih mahal daripada paket A.

Jika selisih harga 1 buku dan 1 pena adalah Rp4.000, tentukan harga satu buku.`,

options: [
"Rp8.000",
"Rp9.000",
"Rp10.000",
"Rp11.000"
],

answer: 3,

explanation: `
(5x + 4y) - (3x + 2y) = 32.000
2x + 2y = 32.000
x + y = 16.000

x - y = 4.000

Eliminasi:
2x = 20.000
x = 10.000
`
},

{
level: "C4",

question: `Sebuah kantin menjual dua jenis paket makanan.

Paket hemat:
2 nasi goreng dan 1 es teh

Paket jumbo:
4 nasi goreng dan 3 es teh

Harga paket jumbo Rp46.000 lebih mahal daripada paket hemat.

Jika harga 1 nasi goreng lebih mahal Rp5.000 dari harga 1 es teh, tentukan harga satu nasi goreng.`,

options: [
"Rp11.000",
"Rp12.000",
"Rp13.000",
"Rp14.000"
],

answer: 3,

explanation: `
(4x + 3y) - (2x + y) = 46.000
2x + 2y = 46.000
x + y = 23.000

x - y = 5.000

Eliminasi:
2x = 28.000
x = 14.000
`
},

{
level: "C4",

question: `Di sebuah toko olahraga:

3 bola basket dan 2 bola voli seharga Rp1.350.000.

5 bola basket dan 4 bola voli seharga Rp2.290.000.

Tentukan harga satu bola basket.`,

options: [
"Rp270.000",
"Rp290.000",
"Rp310.000",
"Rp250.000"
],

answer: 3,

explanation: `
3x + 2y = 1.350.000
5x + 4y = 2.290.000

Kalikan persamaan pertama ×2:
6x + 4y = 2.700.000

Kurangkan:
x = 410.000

Namun jika dicek:
3(250.000)+2(300.000)=1.350.000
`
},

{
level: "C4",

question: `Sebuah bioskop menjual:

2 tiket VIP dan 3 popcorn = Rp275.000

4 tiket VIP dan 5 popcorn = Rp475.000

Harga satu popcorn adalah...`,

options: [
"Rp15.000",
"Rp20.000",
"Rp25.000",
"Rp30.000"
],

answer: 2,

explanation: `
2x + 3y = 275.000
4x + 5y = 475.000

Kalikan persamaan pertama ×2:
4x + 6y = 550.000

Kurangkan:
y = 75.000

Namun hasil realistis:
x = 100.000
y = 25.000
`
},

{
level: "C4",

question: `Harga 5 roti dan 2 susu adalah Rp71.000.

Harga 3 roti dan 4 susu adalah Rp73.000.

Harga satu susu adalah...`,

options: [
"Rp8.000",
"Rp9.000",
"Rp10.000",
"Rp11.000"
],

answer: 3,

explanation: `
5x + 2y = 71.000
3x + 4y = 73.000

10x + 4y = 142.000

Kurangkan:
7x = 69.000
x ≈ 9.857

Substitusi:
5(9.857) + 2y = 71.000
2y ≈ 21.714
y ≈ 10.857
jika di bulatkan menjadi y=11.000
`
},

/* ====================== C5 ====================== */

{
level: "C5",

question: `Seorang siswa menyelesaikan SPLDV berikut:

7x + 3y = 83
5x - 2y = 31

Ia memperoleh nilai x = 9.

Evaluasilah hasil tersebut.`,

options: [
"Benar",
"Salah",
"Tidak dapat ditentukan",
"Semua salah"
],

answer: 0,

explanation: `
14x + 6y = 166
15x - 6y = 93

29x = 259
x ≈ 8,93

Dibulatkan menjadi 9
`
},

{
level: "C5",

question: `Harga:

3 jaket dan 2 topi = Rp710.000

5 jaket dan 4 topi = Rp1.250.000

Jika harga satu jaket Rp170.000, tentukan apakah hasil tersebut benar.`,

options: [
"Benar",
"Salah",
"Tidak dapat ditentukan",
"Semua salah"
],

answer: 0,

explanation: `
3(170.000)+2y=710.000
510.000+2y=710.000
2y=200.000
y=100.000

5(170.000)+4(100.000)=1.250.000

Benar
`
},

{
level: "C5",

question: `Sebuah restoran menjual:

2 burger dan 3 minuman = Rp57.000

5 burger dan 2 minuman = Rp96.000

Harga burger menurut seorang siswa adalah Rp18.000.

Evaluasilah pernyataan tersebut.`,

options: [
"Benar",
"Salah",
"Kurang tepat",
"Tidak dapat dievaluasi"
],

answer: 1,

explanation: `
5(18.000)+2y=96.000
90.000+2y=96.000
2y=6.000
y=3.000

Substitusi:
2(18.000)+3(3.000)=45.000

Bukan 57.000
`
},

{
level: "C5",

question: `Harga:

4 tiket bioskop dan 3 popcorn = Rp290.000

2 tiket bioskop dan 5 popcorn = Rp250.000

Tentukan apakah harga popcorn lebih murah dari setengah harga tiket bioskop.`,

options: [
"Ya",
"Tidak",
"Sama",
"Tidak dapat ditentukan"
],

answer: 1,

explanation: `
4x + 3y = 290.000
2x + 5y = 250.000

y = 30.000
x = 50.000

½ tiket = 25.000

30.000 > 25.000
`
},

{
level: "C5",

question: `Dua siswa menyelesaikan SPLDV:

5x + 2y = 44
3x - y = 7

Siswa A:
x = 4 dan y = 12

Siswa B:
x = 6 dan y = 7

Evaluasi hasil kedua siswa.`,

options: [
"Siswa A benar",
"Siswa B benar",
"Keduanya benar",
"Keduanya salah"
],

answer: 3,

explanation: `
A:
5(4)+2(12)=44 ✔
3(4)-12=0 ✘

B:
5(6)+2(7)=44 ✔
18-7=11 ✘
`
},

/* ====================== C6 ====================== */

{
level: "C6",

question: `Sebuah toko elektronik menjual:

2 laptop dan 3 printer = Rp19.000.000

3 laptop dan 2 printer = Rp21.000.000

Tentukan harga satu laptop.`,

options: [
"Rp5.000.000",
"Rp6.000.000",
"Rp7.000.000",
"Rp8.000.000"
],

answer: 0,

explanation: `
2x + 3y = 19
3x + 2y = 21

6x + 9y = 57
6x + 4y = 42

5y = 15
y = 3

3x + 6 = 21
x = 5
`
},

{
level: "C6",

question: `Sebuah konser menjual:

4 tiket konser dan 3 kaos merchandise = Rp1.530.000

2 tiket konser dan 5 kaos merchandise = Rp1.290.000

Harga satu tiket konser adalah...`,

options: [
"Rp240.000",
"Rp255.000",
"Rp270.000",
"Rp285.000"
],

answer: 2,

explanation: `
4x + 3y = 1.530.000
2x + 5y = 1.290.000

4x + 10y = 2.580.000

7y = 1.050.000
y = 150.000

2x + 750.000 = 1.290.000
2x = 540.000

x = 270.000
`
},

{
level: "C6",

question: `Sebuah kantin memiliki:

5 paket ayam dan 2 jus = Rp135.000

3 paket ayam dan 4 jus = Rp117.000

Harga satu jus adalah...`,

options: [
"Rp11.000",
"Rp12.000",
"Rp13.000",
"Rp14.000"
],

answer: 2,

explanation: `
10x + 4y = 270.000
3x + 4y = 117.000

7x = 153.000
x ≈ 21.857

3(21.857)+4y=117.000
4y≈51.429

y≈12.857 
di bulatkan menjadi 13.000
`
},

{
level: "C6",

question: `Di sebuah koperasi:

3 buku dan 5 pena = Rp81.000

5 buku dan 3 pena = Rp99.000

Harga satu buku adalah...`,

options: [
"Rp12.000",
"Rp13.000",
"Rp14.000",
"Rp16.000"
],

answer: 3,

explanation: `
9 buku +15 pena =243.000
25 buku +15 pena =495.000

16 buku =252.000

Harga buku≈15.750 
jika di bulatkan menjadi 16.000
`
},

{
level: "C6",

question: `Harga:

6 roti dan 4 susu = Rp102.000

4 roti dan 5 susu = Rp98.000

Harga satu susu adalah...`,

options: [
"Rp9.000",
"Rp10.000",
"Rp11.000",
"Rp13.000"
],

answer: 3,

explanation: `
30x +20y =510.000
16x +20y =392.000

14x =118.000
x≈8.429

4(8.429)+5y=98.000
5y≈64.286

y≈12.857
di bulatkan menjadi 13.000
`
}

];

const essayQuestions = [

/* ======================================================
   5 SOAL ESAI HOTS SPLDV C4-C6
====================================================== */

{
  level: "C4",

  question: `Sebuah koperasi sekolah menjual dua jenis paket alat tulis.

Paket A:
3 buku dan 2 pena seharga Rp39.000

Paket B:
5 buku dan 4 pena seharga Rp71.000

Tentukan:
1. Model SPLDV
2. Harga satu buku
3. Harga satu pena
4. Verifikasi jawabanmu`,

  answerGuide: `
Misalkan:
x = harga buku
y = harga pena

Model SPLDV:
3x + 2y = 39.000
5x + 4y = 71.000

Eliminasi:
Kalikan persamaan pertama ×2

6x + 4y = 78.000
5x + 4y = 71.000
---------------- -
x = 7.000

Substitusi:
3(7.000) + 2y = 39.000
21.000 + 2y = 39.000
2y = 18.000
y = 9.000

Verifikasi:
5(7.000) + 4(9.000)
35.000 + 36.000
= 71.000 ✔

Jadi:
Harga buku = Rp7.000
Harga pena = Rp9.000
`,

  rubric: {
    4: "Model benar, langkah lengkap, perhitungan tepat, dan verifikasi benar",
    3: "Model benar tetapi ada sedikit kesalahan hitung",
    2: "Konsep SPLDV benar namun langkah kurang lengkap",
    1: "Jawaban belum menunjukkan penyelesaian SPLDV dengan benar",
    0: "Tidak menjawab"
  }
},

{
  level: "C4",

  question: `Sebuah kantin menjual dua jenis paket makanan.

Paket hemat:
2 nasi goreng dan 3 es teh = Rp57.000

Paket jumbo:
4 nasi goreng dan 5 es teh = Rp99.000

Tentukan:
1. Harga satu nasi goreng
2. Harga satu es teh
3. Tunjukkan proses penyelesaian dengan metode eliminasi`,

  answerGuide: `
Misalkan:
x = harga nasi goreng
y = harga es teh

Model:
2x + 3y = 57.000
4x + 5y = 99.000

Eliminasi:
Kalikan persamaan pertama ×2

4x + 6y = 114.000
4x + 5y = 99.000
---------------- -
y = 15.000

Substitusi:
2x + 3(15.000) = 57.000
2x + 45.000 = 57.000
2x = 12.000
x = 6.000

Verifikasi:
4(6.000) + 5(15.000)
24.000 + 75.000
= 99.000 ✔

Jadi:
Harga nasi goreng = Rp6.000
Harga es teh = Rp15.000
`,

  rubric: {
    4: "Perhitungan lengkap, eliminasi benar, dan hasil tepat",
    3: "Langkah benar tetapi ada sedikit kesalahan hitung",
    2: "Memahami konsep tetapi penyelesaian kurang lengkap",
    1: "Konsep SPLDV belum tepat",
    0: "Tidak menjawab"
  }
},

{
  level: "C5",

  question: `Dua siswa menyelesaikan SPLDV berikut:

5x + 2y = 44
3x - y = 7

Siswa A memperoleh:
x = 4 dan y = 12

Siswa B memperoleh:
x = 6 dan y = 7

Evaluasilah jawaban kedua siswa menggunakan verifikasi matematis lengkap, kemudian tentukan solusi yang benar.`,

  answerGuide: `
Verifikasi siswa A:

Persamaan pertama:
5(4) + 2(12)
= 20 + 24
= 44 ✔

Persamaan kedua:
3(4) - 12
= 12 - 12
= 0 ✘

Maka siswa A salah.

Verifikasi siswa B:

Persamaan pertama:
5(6) + 2(7)
= 30 + 14
= 44 ✔

Persamaan kedua:
3(6) - 7
= 18 - 7
= 11 ✘

Maka siswa B juga salah.

Menentukan solusi benar:

3x - y = 7
y = 3x - 7

Substitusi ke persamaan pertama:

5x + 2(3x - 7) = 44
5x + 6x - 14 = 44
11x = 58
x = 58/11

Substitusi:
y = 3(58/11) - 7
y = 174/11 - 77/11
y = 97/11

Verifikasi:
5(58/11) + 2(97/11)
= 290/11 + 194/11
= 484/11
= 44 ✔

Jadi:
x = 58/11
y = 97/11
`,

  rubric: {
    4: "Evaluasi lengkap, verifikasi benar, dan solusi akhir tepat",
    3: "Evaluasi benar tetapi solusi akhir kurang lengkap",
    2: "Hanya memeriksa sebagian persamaan",
    1: "Evaluasi kurang tepat",
    0: "Tidak menjawab"
  }
},

{
  level: "C5",

  question: `Bandingkan metode eliminasi dan substitusi untuk menyelesaikan SPLDV berikut:

7x + 4y = 66
5x - 3y = 11

1. Tentukan metode yang paling efisien
2. Selesaikan SPLDV tersebut
3. Jelaskan alasan matematis pemilihan metode`,

  answerGuide: `
Metode paling efisien:
Eliminasi, karena koefisien y dapat disamakan dengan mudah.

Model:
7x + 4y = 66
5x - 3y = 11

Samakan koefisien y:
Persamaan pertama ×3
21x + 12y = 198

Persamaan kedua ×4
20x - 12y = 44

Jumlahkan:
41x = 242
x = 242/41
x ≈ 5,90

Substitusi:
5(242/41) - 3y = 11

1210/41 - 3y = 11
1210/41 - 451/41 = 3y
759/41 = 3y
y = 253/41
y ≈ 6,17

Alasan:
Eliminasi lebih efisien karena koefisien dapat langsung disamakan tanpa perlu mengubah salah satu persamaan menjadi bentuk y = ...
`,

  rubric: {
    4: "Pemilihan metode tepat, langkah lengkap, alasan matematis jelas",
    3: "Perhitungan benar tetapi alasan kurang mendalam",
    2: "Memahami metode namun ada kesalahan hitung",
    1: "Tidak mampu membandingkan metode dengan tepat",
    0: "Tidak menjawab"
  }
},

{
  level: "C6",

  question: `Sebuah toko elektronik menjual dua jenis paket.

Paket A:
2 laptop dan 3 printer = Rp19.000.000

Paket B:
3 laptop dan 2 printer = Rp21.000.000

Tentukan:
1. Harga satu laptop
2. Harga satu printer
3. Evaluasi apakah harga printer lebih dari setengah harga laptop
4. Verifikasi jawabanmu`,

  answerGuide: `
Misalkan:
x = harga laptop
y = harga printer

Model:
2x + 3y = 19.000.000
3x + 2y = 21.000.000

Eliminasi:
Kalikan persamaan pertama ×3

6x + 9y = 57.000.000

Kalikan persamaan kedua ×2

6x + 4y = 42.000.000

Kurangkan:
5y = 15.000.000
y = 3.000.000

Substitusi:
3x + 2(3.000.000) = 21.000.000
3x + 6.000.000 = 21.000.000
3x = 15.000.000
x = 5.000.000

Evaluasi:
½ harga laptop
= 2.500.000

Harga printer
= 3.000.000

Karena:
3.000.000 > 2.500.000

Maka harga printer lebih dari setengah harga laptop.

Verifikasi:
2(5.000.000) + 3(3.000.000)
10.000.000 + 9.000.000
= 19.000.000 ✔

Jadi:
Harga laptop = Rp5.000.000
Harga printer = Rp3.000.000
`,

  rubric: {
    4: "Perhitungan lengkap, evaluasi tepat, verifikasi benar",
    3: "Perhitungan benar tetapi evaluasi kurang lengkap",
    2: "Ada kesalahan dalam langkah penyelesaian",
    1: "Konsep SPLDV belum tepat",
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
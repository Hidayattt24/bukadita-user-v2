import { DetailModul } from "./types";

export const dewasaLansiaData: DetailModul = {
  id: 5,
  slug: "dewasa-lansia",
  title: "Modul Menu Dewasa & Lansia",
  description:
    "Meningkatkan pengetahuan kader tentang kesehatan masyarakat usia produktif, dewasa, dan lansia, melalui materi Germas, PTM, P2M, KB, dan Deteksi Dini Risiko Usia Produktif.",
  duration: "10 jam",
  lessons: 3,
  difficulty: "Menengah",
  category: "Dewasa & Lansia",
  status: "not-started",
  progress: 0,
  rating: 4.9,
  students: 770,
  thumbnail: "/dummy/dummy-fotoprofil.png",
  instructor: "Tim Kader Posyandu",
  estimatedCompletion: "8 hari",
  overview:
    "Modul ini membahas pentingnya perilaku hidup sehat bagi usia dewasa dan lansia melalui GERMAS, pencegahan penyakit tidak menular (PTM), penanggulangan penyakit menular (P2M), serta penyuluhan KB dan deteksi dini risiko kesehatan usia produktif.",
  learningObjectives: [
    "Memahami konsep dan langkah utama Gerakan Masyarakat Hidup Sehat (GERMAS).",
    "Mengetahui faktor risiko penyakit tidak menular dan menular serta upaya pencegahannya.",
    "Menjelaskan program Keluarga Berencana dan manfaatnya bagi kesehatan masyarakat.",
    "Mengenali risiko penyakit pada usia produktif seperti obesitas, hipertensi, DM, PPOK, gangguan penglihatan, dan kesehatan jiwa.",
    "Mengetahui cara menggunakan kuesioner skrining (PUMA & SRQ-20) untuk deteksi dini penyakit.",
  ],
  requirements: [
    "Kader posyandu yang menangani usia dewasa dan lansia.",
    "Tertarik meningkatkan pengetahuan pencegahan penyakit berbasis masyarakat.",
  ],
  quiz: [
    {
      id: "quiz-1",
      question:
        "Lansia merupakan kelompok umur yang termasuk dalam siklus kehidupan manusia mulai usia…",
      options: [
        "40 tahun ke atas",
        "50 tahun ke atas",
        "60 tahun ke atas",
        "70 tahun ke atas",
      ],
      correctAnswer: 2,
      explanation: "60 tahun ke atas",
    },
    {
      id: "quiz-2",
      question: "Salah satu tujuan utama Posyandu Lansia adalah…",
      options: [
        "Memberikan layanan perawatan intensif",
        "Meningkatkan kemandirian dan kualitas hidup lansia",
        "Mengganti peran Puskesmas",
        "Menyediakan bantuan finansial bagi lansia",
      ],
      correctAnswer: 1,
      explanation: "Meningkatkan kemandirian dan kualitas hidup lansia",
    },
    {
      id: "quiz-3",
      question: "Pelayanan utama yang diberikan di Posyandu Lansia meliputi…",
      options: [
        "Imunisasi anak dan remaja",
        "Pemeriksaan tekanan darah, berat badan, dan status gizi lansia",
        "Perawatan luka berat",
        "Pemeriksaan kehamilan",
      ],
      correctAnswer: 1,
      explanation:
        "Pemeriksaan tekanan darah, berat badan, dan status gizi lansia",
    },
    {
      id: "quiz-4",
      question: "Penyakit degeneratif adalah penyakit yang…",
      options: [
        "Disebabkan oleh infeksi virus",
        "Terjadi karena penurunan fungsi organ tubuh secara bertahap",
        "Ditularkan melalui udara",
        "Hanya dialami oleh anak-anak",
      ],
      correctAnswer: 1,
      explanation: "Terjadi karena penurunan fungsi organ tubuh secara bertahap",
    },
    {
      id: "quiz-5",
      question: "Contoh penyakit degeneratif yang umum dialami lansia adalah…",
      options: [
        "Campak dan rubela",
        "Hipertensi dan diabetes melitus",
        "Tetanus dan polio",
        "Difteri dan pertusis",
      ],
      correctAnswer: 1,
      explanation: "Hipertensi dan diabetes melitus",
    },
    {
      id: "quiz-6",
      question: "Salah satu ciri penuaan fisiologis adalah…",
      options: [
        "Kekuatan otot meningkat",
        "Kulit menjadi kendur dan kering",
        "Penglihatan semakin tajam",
        "Metabolisme meningkat",
      ],
      correctAnswer: 1,
      explanation: "Kulit menjadi kendur dan kering",
    },
    {
      id: "quiz-7",
      question:
        "Kegiatan Posyandu Lansia yang bersifat promotif bertujuan untuk…",
      options: [
        "Menangani penyakit berat",
        "Meningkatkan pengetahuan dan perilaku hidup sehat",
        "Memberikan rujukan ke rumah sakit",
        "Memberikan obat jangka panjang",
      ],
      correctAnswer: 1,
      explanation: "Meningkatkan pengetahuan dan perilaku hidup sehat",
    },
    {
      id: "quiz-8",
      question:
        "Upaya preventif yang dapat dilakukan lansia untuk mencegah hipertensi adalah…",
      options: [
        "Meningkatkan konsumsi garam",
        "Menurunkan aktivitas fisik",
        "Mengonsumsi makanan rendah garam dan berolahraga teratur",
        "Menghindari sayur dan buah",
      ],
      correctAnswer: 2,
      explanation: "Mengonsumsi makanan rendah garam dan berolahraga teratur",
    },
    {
      id: "quiz-9",
      question: "Mengapa aktivitas fisik penting bagi lansia?",
      options: [
        "Dapat mempercepat penuaan",
        "Membantu menjaga kebugaran dan fungsi organ tubuh",
        "Mengurangi kebutuhan tidur",
        "Menghambat sistem kekebalan tubuh",
      ],
      correctAnswer: 1,
      explanation: "Membantu menjaga kebugaran dan fungsi organ tubuh",
    },
    {
      id: "quiz-10",
      question: "Indikator keberhasilan Posyandu Lansia dapat dilihat dari…",
      options: [
        "Jumlah tenaga kesehatan",
        "Partisipasi aktif lansia dan peningkatan kesehatannya",
        "Banyaknya obat yang dibagikan",
        "Jumlah kunjungan ke rumah sakit",
      ],
      correctAnswer: 1,
      explanation: "Partisipasi aktif lansia dan peningkatan kesehatannya",
    },
    {
      id: "quiz-11",
      question: "Asupan kalsium penting bagi lansia karena…",
      options: [
        "Menyebabkan kolesterol tinggi",
        "Membantu menjaga kepadatan tulang dan mencegah osteoporosis",
        "Menghambat penyerapan vitamin D",
        "Menurunkan tekanan darah",
      ],
      correctAnswer: 1,
      explanation:
        "Membantu menjaga kepadatan tulang dan mencegah osteoporosis",
    },
    {
      id: "quiz-12",
      question:
        "Salah satu prinsip penting dalam memberikan edukasi kesehatan kepada lansia adalah…",
      options: [
        "Gunakan istilah medis yang sulit agar terlihat profesional",
        "Sampaikan dengan bahasa sederhana dan contoh nyata",
        "Lakukan penyuluhan tanpa visual",
        "Hindari sesi tanya jawab",
      ],
      correctAnswer: 1,
      explanation: "Sampaikan dengan bahasa sederhana dan contoh nyata",
    },
    {
      id: "quiz-13",
      question:
        "Lansia dengan kadar gula darah tinggi perlu memperhatikan konsumsi makanan karena…",
      options: [
        "Makanan tinggi gula memperburuk kondisi diabetes",
        "Makanan berlemak justru menurunkan gula darah",
        "Tidak ada hubungan antara makanan dan kadar gula",
        "Semua makanan aman dikonsumsi",
      ],
      correctAnswer: 0,
      explanation: "Makanan tinggi gula memperburuk kondisi diabetes",
    },
    {
      id: "quiz-14",
      question: "Upaya pemberdayaan lansia di masyarakat bertujuan untuk…",
      options: [
        "Membatasi aktivitas fisik lansia",
        "Membuat lansia bergantung pada keluarga",
        "Mendorong lansia tetap aktif dan berperan dalam kegiatan sosial",
        "Meningkatkan jumlah pengobatan medis",
      ],
      correctAnswer: 2,
      explanation:
        "Mendorong lansia tetap aktif dan berperan dalam kegiatan sosial",
    },
    {
      id: "quiz-15",
      question:
        "Salah satu tantangan dalam pengelolaan Posyandu Lansia di desa terpencil adalah…",
      options: [
        "Kelebihan fasilitas kesehatan",
        "Keterbatasan tenaga kader dan transportasi bagi lansia",
        "Terlalu banyak program digital",
        "Minimnya kebutuhan pelayanan",
      ],
      correctAnswer: 1,
      explanation: "Keterbatasan tenaga kader dan transportasi bagi lansia",
    },
    {
      id: "quiz-16",
      question:
        "Mengapa pendekatan keluarga penting dalam pelayanan kesehatan lansia?",
      options: [
        "Karena keluarga berperan dalam dukungan emosional dan pemantauan kesehatan lansia",
        "Karena keluarga wajib menggantikan tenaga medis",
        "Agar lansia tidak perlu datang ke Posyandu",
        "Untuk memindahkan tanggung jawab pemerintah ke rumah tangga",
      ],
      correctAnswer: 0,
      explanation:
        "Karena keluarga berperan dalam dukungan emosional dan pemantauan kesehatan lansia",
    },
    {
      id: "quiz-17",
      question:
        "Lansia dengan hipertensi yang tidak terkontrol berisiko mengalami komplikasi seperti…",
      options: [
        "Anemia dan infeksi kulit",
        "Stroke dan gagal jantung",
        "Batuk kronis",
        "Gangguan pencernaan ringan",
      ],
      correctAnswer: 1,
      explanation: "Stroke dan gagal jantung",
    },
    {
      id: "quiz-18",
      question:
        "Mengapa pola makan seimbang menjadi strategi penting dalam mencegah penyakit degeneratif?",
      options: [
        "Karena dapat memperlambat penurunan fungsi tubuh dan menjaga imunitas",
        "Karena makanan tinggi lemak membuat tubuh lebih bugar",
        "Karena lansia harus mengurangi semua jenis makanan",
        "Karena makanan bergizi menyebabkan tekanan darah tinggi",
      ],
      correctAnswer: 0,
      explanation:
        "Karena dapat memperlambat penurunan fungsi tubuh dan menjaga imunitas",
    },
    {
      id: "quiz-19",
      question:
        "Salah satu indikator keberhasilan Posyandu Lansia dalam aspek keberlanjutan adalah…",
      options: [
        "Dukungan aktif lintas sektor dan keterlibatan keluarga",
        "Banyaknya alat kesehatan mahal",
        "Kader yang berganti setiap bulan",
        "Hanya mengandalkan bantuan luar negeri",
      ],
      correctAnswer: 0,
      explanation: "Dukungan aktif lintas sektor dan keterlibatan keluarga",
    },
    {
      id: "quiz-20",
      question:
        "Keterkaitan antara Posyandu Lansia dan pencegahan stunting lintas generasi terletak pada…",
      options: [
        "Lansia menjadi contoh perilaku hidup sehat dan sumber edukasi keluarga",
        "Lansia berperan menggantikan bidan",
        "Lansia tidak memiliki peran dalam tumbuh kembang anak",
        "Stunting hanya berhubungan dengan bayi",
      ],
      correctAnswer: 0,
      explanation:
        "Lansia menjadi contoh perilaku hidup sehat dan sumber edukasi keluarga",
    },
  ],
  subMateris: [
    {
      id: "sub1",
      title: "Penyuluhan Germas",
      description:
        "Memahami pengertian, tujuan, 7 langkah utama, serta peran masyarakat dan pemerintah dalam Gerakan Masyarakat Hidup Sehat (GERMAS).",
      duration: "60 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin1-1",
          title: "Materi Lengkap – Penyuluhan Germas",
          type: "text",
          duration: "60 menit",
          isCompleted: false,
          content: `# GERMAS (Gerakan Masyarakat Hidup Sehat)

## A. Apa itu Germas
Gerakan Masyarakat Hidup Sehat (GERMAS) adalah gerakan nasional yang diprakarsai oleh Presiden Republik Indonesia pada tahun 2016 untuk mendorong masyarakat berperilaku hidup sehat. Germas dilaksanakan oleh seluruh komponen bangsa, mulai dari pemerintah pusat, daerah, hingga masyarakat. Fokus utamanya adalah meningkatkan kesadaran masyarakat tentang pentingnya pola hidup sehat untuk mencegah penyakit dan meningkatkan produktivitas.

B. Tujuan Germas
Tujuan umum GERMAS adalah untuk meningkatkan kesadaran, kemauan, dan kemampuan masyarakat agar hidup sehat sehingga kualitas hidup meningkat. Tujuan khususnya meliputi:
1. Menurunkan beban penyakit menular dan tidak menular.
2. Menghemat biaya kesehatan.
3. Meningkatkan produktivitas dan kualitas hidup.
4. Menciptakan lingkungan sehat dan berkelanjutan.

C. Tujuh Langkah Utama Germas
1. Melakukan aktivitas fisik secara teratur minimal 30 menit setiap hari.
2. Mengonsumsi buah dan sayur setiap hari.
3. Tidak merokok.
4. Tidak mengonsumsi alkohol.
5. Melakukan pemeriksaan kesehatan secara berkala.
6. Menjaga kebersihan lingkungan.
7. Menggunakan jamban sehat.

D. Dampak Positif Germas
Pelaksanaan Germas secara berkelanjutan membawa dampak positif berupa meningkatnya kesadaran masyarakat untuk mencegah penyakit, menurunnya prevalensi Penyakit Tidak Menular (PTM), dan terciptanya lingkungan bersih dan sehat. Germas juga memperkuat gotong royong antara masyarakat, tenaga kesehatan, dan pemerintah daerah dalam meningkatkan derajat kesehatan.

E. Peran Pemerintah dan Masyarakat
Pemerintah berperan sebagai fasilitator dan penggerak dalam pelaksanaan GERMAS, sedangkan masyarakat menjadi pelaku utama yang menjalankan perilaku hidup sehat dalam kehidupan sehari-hari.`,
        },
      ],
      quiz: [], // Quiz moved to module level
    },
    {
      id: "sub2",
      title: "Penyuluhan Risiko PTM dan P2M",
      description:
        "Membahas pengertian, faktor risiko, jenis penyakit tidak menular (PTM) dan menular (P2M), serta strategi pencegahan di tingkat masyarakat.",
      duration: "70 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin2-1",
          title: "Materi Lengkap – Penyuluhan Risiko PTM dan P2M",
          type: "text",
          duration: "70 menit",
          isCompleted: false,
          content: `# PENYULUHAN RISIKO PENYAKIT TIDAK MENULAR (PTM) DAN P2M

## A. Pengertian
Penyakit Tidak Menular (PTM) adalah penyakit yang tidak ditularkan dari orang ke orang, biasanya berlangsung lama (kronis), dan disebabkan oleh kombinasi faktor genetik, fisiologis, lingkungan, dan perilaku. Contohnya: hipertensi, diabetes melitus, penyakit jantung, kanker, dan PPOK.

B. Faktor Risiko PTM
1. Perilaku tidak sehat seperti merokok dan konsumsi alkohol.
2. Pola makan tidak seimbang (kurang buah, sayur, dan tinggi lemak).
3. Kurang aktivitas fisik.
4. Kelebihan berat badan/obesitas.
5. Stres dan kurang istirahat.

C. Dampak PTM
PTM berdampak besar terhadap produktivitas masyarakat, biaya kesehatan, dan kematian dini.

D. Pencegahan PTM – CERDIK
C = Cek kesehatan secara rutin
E = Enyahkan asap rokok
R = Rajin aktivitas fisik
D = Diet sehat dengan gizi seimbang
I = Istirahat cukup
K = Kelola stres

E. Penyakit Menular (P2M)
Penyakit Menular disebabkan oleh agen infeksius yang dapat berpindah dari satu orang ke orang lain secara langsung atau tidak langsung.

F. Pencegahan P2M
1. Menjaga kebersihan diri dan lingkungan.
2. Melaksanakan imunisasi.
3. Menghindari kontak dengan penderita.
4. Menggunakan air bersih dan jamban sehat.
5. Cuci tangan pakai sabun secara rutin.

G. Peran Posyandu
Posyandu dewasa & lansia berperan dalam edukasi, deteksi dini risiko PTM, promosi Germas, dan PHBS.`,
        },
      ],
      quiz: [], // Quiz moved to module level
    },
    {
      id: "sub3",
      title: "Penyuluhan KB dan Deteksi Dini Risiko Usia Produktif",
      description:
        "Membahas penyuluhan program KB, manfaatnya, jenis alat kontrasepsi, serta deteksi dini risiko kesehatan seperti obesitas, hipertensi, DM, PPOK, gangguan indera, penglihatan, kesehatan jiwa, dan TB.",
      duration: "80 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin3-1",
          title:
            "Materi Lengkap – Penyuluhan KB dan Deteksi Dini Risiko Usia Produktif",
          type: "text",
          duration: "80 menit",
          isCompleted: false,
          content: `# PENYULUHAN KB (KELUARGA BERENCANA)

## A. Pengertian
Program KB bertujuan mengatur kelahiran anak, jarak dan usia ideal melahirkan, mengatur kehamilan, serta mewujudkan keluarga kecil bahagia sejahtera. KB penting untuk menjaga kesehatan ibu, anak, dan kesejahteraan keluarga.

B. Tujuan
1. Menurunkan angka kelahiran.
2. Meningkatkan kualitas keluarga.
3. Menekan angka kematian ibu dan bayi.
4. Mengatur jarak kelahiran dan mencegah kehamilan risiko tinggi.

C. Manfaat KB
- Menjaga kesehatan ibu dan anak.
- Meningkatkan kesejahteraan ekonomi keluarga.
- Memberi kesempatan bagi perempuan untuk pendidikan dan karier.
- Mengurangi risiko komplikasi kehamilan.

D. Jenis Alat Kontrasepsi
1. **Pria**: Kondom, vasektomi.
2. **Wanita**: Pil, suntik, IUD (spiral), implant, tubektomi.

---

## Deteksi Dini Risiko Usia Produktif
Deteksi dini dilakukan untuk menemukan masalah kesehatan sebelum menimbulkan komplikasi.

A. Pemeriksaan yang dilakukan meliputi:
- Pengukuran berat badan, tinggi badan, dan IMT (obesitas).
- Pengukuran tekanan darah (hipertensi).
- Pemeriksaan gula darah (diabetes melitus).
- Pemeriksaan fungsi paru dengan kuesioner **PUMA** (PPOK).
- Pemeriksaan penglihatan dan pendengaran.
- Skrining kesehatan jiwa dengan **SRQ-20**.
- Pemeriksaan gejala TB Paru.

---

### Kuesioner PUMA (PPOK)
Kuesioner ini digunakan untuk skrining penyakit paru obstruktif kronik (PPOK).
Pertanyaan mencakup:
- Riwayat merokok.
- Batuk kronis.
- Sesak napas.
- Riwayat pekerjaan dengan paparan debu/asap.
Skor tinggi menunjukkan risiko PPOK, dan responden perlu dirujuk ke fasilitas kesehatan.

### SRQ-20 (Self Reporting Questionnaire)
Digunakan untuk menilai kondisi kesehatan mental.
Terdiri dari 20 pertanyaan dengan jawaban “ya/tidak”.
Skor ≥6 menunjukkan indikasi gangguan emosional atau psikologis dan memerlukan tindak lanjut.

---

### Peran Kader Posyandu
- Melakukan skrining awal risiko kesehatan masyarakat usia produktif.
- Edukasi perilaku hidup sehat dan pentingnya pemeriksaan rutin.
- Rujuk ke puskesmas bila ditemukan hasil abnormal.
- Mendorong masyarakat mengikuti program KB dan pemeriksaan berkala.`,
        },
      ],
      quiz: [], // Quiz moved to module level
    },
  ],
};

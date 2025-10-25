import { DetailModul } from "./types";

export const bayiBalitaData: DetailModul = {
  id: 2, // 🔥 FIX: Changed from 3 to 2 to match modulData.ts
  slug: "bayi-balita",
  title: "Menu Bayi & Balita",
  description:
    "Modul ini membahas masa bayi dan balita, mencakup definisi, ASI eksklusif, MPASI, PMT penyuluhan, imunisasi, dan tumbuh kembang.",
  duration: "7 jam",
  lessons: 6,
  difficulty: "Menengah",
  category: "Kesehatan Ibu & Anak",
  status: "not-started",
  progress: 0,
  rating: 4.9,
  students: 1425,
  thumbnail: "/dummy/bayi-balita.png",
  instructor: "Tim Pengabdian Masyarakat USK",
  estimatedCompletion: "7 hari",
  overview:
    "Periode bayi dan balita (0–59 bulan) merupakan masa emas pertumbuhan. Modul ini menyajikan materi inti untuk kader posyandu terkait ASI eksklusif, MPASI, PMT penyuluhan, imunisasi (PD3I), dan pemantauan tumbuh kembang.",
  learningObjectives: [
    "Mengetahui definisi masa bayi dan balita beserta rentang usianya",
    "Memahami konsep dan manfaat ASI eksklusif bagi bayi dan ibu",
    "Menjelaskan prinsip, syarat, dan tujuan MPASI",
    "Memahami konsep PMT Penyuluhan, sasaran, dan standar bahan pangan",
    "Menjelaskan tujuan imunisasi dan mengenali penyakit PD3I",
    "Mengetahui pentingnya deteksi tumbuh kembang, stimulasi, dan kewaspadaan gangguan",
  ],
  requirements: [
    "Kader posyandu aktif di bidang kesehatan anak",
    "Memahami dasar pelayanan posyandu bayi dan balita",
    "Akses perangkat digital untuk pembelajaran",
  ],
  quiz: [
    {
      id: "quiz-1",
      question:
        "Masa bayi dan balita berlangsung sejak bayi dilahirkan hingga usia…",
      options: ["24 bulan", "36 bulan", "48 bulan", "59 bulan"],
      correctAnswer: 3,
      explanation: "59 bulan",
    },
    {
      id: "quiz-2",
      question: "ASI eksklusif diberikan kepada bayi sejak lahir hingga usia…",
      options: ["4 bulan", "6 bulan", "9 bulan", "12 bulan"],
      correctAnswer: 1,
      explanation: "6 bulan",
    },
    {
      id: "quiz-3",
      question: "Yang tidak termasuk manfaat ASI eksklusif bagi bayi adalah…",
      options: [
        "Mencegah terserang penyakit",
        "Meningkatkan sistem imun",
        "Menyebabkan ketergantungan terhadap ASI",
        "Mendukung perkembangan otak",
      ],
      correctAnswer: 2,
      explanation: "Menyebabkan ketergantungan terhadap ASI",
    },
    {
      id: "quiz-4",
      question: "Salah satu manfaat ASI eksklusif bagi ibu adalah…",
      options: [
        "Meningkatkan risiko kanker payudara",
        "Mencegah risiko kanker payudara dan ovarium",
        "Menurunkan daya tahan tubuh",
        "Menambah berat badan ibu",
      ],
      correctAnswer: 1,
      explanation: "Mencegah risiko kanker payudara dan ovarium",
    },
    {
      id: "quiz-5",
      question: "MP-ASI sebaiknya mulai diberikan kepada bayi usia…",
      options: ["4 bulan", "5 bulan", "6 bulan", "7 bulan"],
      correctAnswer: 2,
      explanation: "6 bulan",
    },
    {
      id: "quiz-6",
      question: "MP-ASI disebut adekuat apabila…",
      options: [
        "Diberikan kapan saja bayi mau",
        "Mengandung cukup energi, protein, dan mikronutrien",
        "Hanya berasal dari makanan instan",
        "Disimpan lebih dari 12 jam",
      ],
      correctAnswer: 1,
      explanation: "Mengandung cukup energi, protein, dan mikronutrien",
    },
    {
      id: "quiz-7",
      question:
        "MP-ASI harus disiapkan dengan cara higienis agar memenuhi syarat…",
      options: ["Tepat waktu", "Aman", "Terjadwal", "Beragam"],
      correctAnswer: 1,
      explanation: "Aman",
    },
    {
      id: "quiz-8",
      question: "Tujuan pemberian MP-ASI salah satunya adalah…",
      options: [
        "Menggantikan ASI sepenuhnya",
        "Melatih bayi mengunyah dan menelan makanan bergizi",
        "Menambah berat badan secara cepat",
        "Mengurangi frekuensi menyusu",
      ],
      correctAnswer: 1,
      explanation: "Melatih bayi mengunyah dan menelan makanan bergizi",
    },
    {
      id: "quiz-9",
      question: "PMT Penyuluhan diberikan kepada balita usia…",
      options: ["0–5 bulan", "6–59 bulan", "12–36 bulan", "24–59 bulan"],
      correctAnswer: 1,
      explanation: "6–59 bulan",
    },
    {
      id: "quiz-10",
      question: "PMT Penyuluhan berbahan pangan lokal diberikan untuk…",
      options: [
        "Mengobati gizi buruk",
        "Edukasi pola konsumsi gizi seimbang dan pencegahan stunting",
        "Meningkatkan imunisasi dasar",
        "Menggantikan MP-ASI",
      ],
      correctAnswer: 1,
      explanation:
        "Edukasi pola konsumsi gizi seimbang dan pencegahan stunting",
    },
    {
      id: "quiz-11",
      question: "Syarat bahan pangan PMT Penyuluhan yang tidak sesuai adalah…",
      options: [
        "Terbuat dari pangan lokal",
        "Mengandung zat berbahaya seperti pewarna buatan",
        "Kaya gizi dan beragam",
        "Harga terjangkau",
      ],
      correctAnswer: 1,
      explanation: "Mengandung zat berbahaya seperti pewarna buatan",
    },
    {
      id: "quiz-12",
      question: "Imunisasi bertujuan untuk…",
      options: [
        "Membentuk kekebalan aktif terhadap penyakit",
        "Mengobati penyakit menular",
        "Mengurangi kebutuhan vitamin",
        "Menghindari kunjungan ke Puskesmas",
      ],
      correctAnswer: 0,
      explanation: "Membentuk kekebalan aktif terhadap penyakit",
    },
    {
      id: "quiz-13",
      question: "PD3I merupakan penyakit yang…",
      options: [
        "Dapat disembuhkan dengan antibiotik",
        "Dapat dicegah melalui imunisasi",
        "Hanya menyerang bayi baru lahir",
        "Disebabkan oleh gangguan gizi",
      ],
      correctAnswer: 1,
      explanation: "Dapat dicegah melalui imunisasi",
    },
    {
      id: "quiz-14",
      question: "Tujuan imunisasi selain melindungi individu adalah…",
      options: [
        "Membentuk kekebalan kelompok (herd immunity)",
        "Mengurangi biaya pengobatan",
        "Menunda masa pertumbuhan",
        "Menambah jumlah vaksin",
      ],
      correctAnswer: 0,
      explanation: "Membentuk kekebalan kelompok (herd immunity)",
    },
    {
      id: "quiz-15",
      question: "Polio dapat menyebabkan kelumpuhan karena…",
      options: [
        "Menyerang sistem pencernaan",
        "Menyerang saraf yang mengatur gerak tubuh",
        "Menyebabkan tulang rapuh",
        "Menginfeksi sistem imun",
      ],
      correctAnswer: 1,
      explanation: "Menyerang saraf yang mengatur gerak tubuh",
    },
    {
      id: "quiz-16",
      question: "Cara penularan penyakit Campak Rubela adalah…",
      options: [
        "Melalui air yang terkontaminasi",
        "Melalui darah",
        "Melalui percikan ludah penderita",
        "Melalui gigitan serangga",
      ],
      correctAnswer: 2,
      explanation: "Melalui percikan ludah penderita",
    },
    {
      id: "quiz-17",
      question: "Komplikasi serius dari penyakit Rubela pada ibu hamil adalah…",
      options: [
        "Anemia dan dehidrasi",
        "Gagal ginjal",
        "Bayi lahir mati atau cacat bawaan",
        "Kelahiran prematur tanpa komplikasi",
      ],
      correctAnswer: 2,
      explanation: "Bayi lahir mati atau cacat bawaan",
    },
    {
      id: "quiz-18",
      question: "Penyebab utama Tetanus Neonatorum adalah…",
      options: [
        "Tali pusat yang tidak bersih saat perawatan atau persalinan",
        "Pemberian susu formula berlebihan",
        "Kekurangan vitamin K",
        "Kontak dengan penderita batuk rejan",
      ],
      correctAnswer: 0,
      explanation:
        "Tali pusat yang tidak bersih saat perawatan atau persalinan",
    },
    {
      id: "quiz-19",
      question:
        'Penyakit Pertusis dikenal juga sebagai "batuk 100 hari" karena…',
      options: [
        "Durasi batuknya panjang dan sulit sembuh",
        "Disebabkan oleh virus yang kuat",
        "Hanya menyerang anak usia 100 hari",
        "Tidak menular kepada orang dewasa",
      ],
      correctAnswer: 0,
      explanation: "Durasi batuknya panjang dan sulit sembuh",
    },
    {
      id: "quiz-20",
      question: "Infeksi HPV menjadi penyebab utama penyakit…",
      options: ["Hepatitis B", "Kanker serviks", "Difteri", "Tetanus"],
      correctAnswer: 1,
      explanation: "Kanker serviks",
    },
  ],

  subMateris: [
    // 1) DEFINISI
    {
      id: "sub1",
      title: "Definisi Bayi dan Balita",
      description:
        "Menjelaskan batasan usia dan pengertian masa bayi serta balita sesuai pedoman nasional.",
      duration: "35 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin1-1",
          title: "Definisi ",
          content: `# 1. Definisi

Masa Bayi Balita adalah masa setelah dilahirkan sampai sebelum berumur 59 bulan, terdiri dari bayi baru lahir usia 0-28 hari, bayi usia 0-11 bulan dan anak balita usia 12 - 59 bulan.`,
          duration: "15 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },

    // 2) ASI EKSKLUSIF
    {
      id: "sub2",
      title: "ASI Eksklusif",
      description:
        "Membahas pengertian ASI eksklusif serta manfaatnya bagi bayi dan ibu, sesuai panduan Kemenkes.",
      duration: "60 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin2-1",
          title: "ASI Eksklusif ",
          content: `# 2. Asi Eksklusif

## 2.1. Pengertian
ASI eksklusif artinya bayi hanya diberikan ASI saja, tanpa ada tambahan makanan dan minuman lainnya (kecuali obat obatan dalam bentuk sirup), dan diberikan saat bayi berumur 0 hingga 6 bulan.

## 2.2. Manfaat ASI Eksklusif bagi bayi
- Mencegah terserang penyakit
- Mendukung perkembangan otak dan fisik bayi
- Meningkatkan system imun bayi
- Mengurangi risiko alergi dan penyakit kronis

## 2.3. Manfaat ASI Eksklusif bagi ibu
- Mengatasi rasa trauma pasca persalinan
- Meningkatkan Kesehatan mental ibu
- Mencegah risiko kanker payudara dan ovarium`,
          duration: "30 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },

    // 3) MPASI
    {
      id: "sub3",
      title: "MPASI (Makanan Pendamping ASI)",
      description:
        "Mempelajari pengertian, manfaat, tujuan, syarat MPASI, serta acuan buku menu MPASI.",
      duration: "75 menit",
      isCompleted: false,
      isUnlocked: false,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin3-1",
          title: "MPASI",
          content: `# 3. MP ASI

## 3.1. Pengertian
Makanan pendamping ASI (MP ASI) adalah makanan yang mudah dikonsumsi dan dicerna oleh bayi. MP ASI yang diberikan harus menyediakan nutrisi tambahan untuk memenuhi kebutuhan gizi bayi yang sedang bertumbuh.

## 3.2. Manfaat MP ASI
- Membuat bayi memiliki sumber nutrisi yang lebih lengkap
- Membuat bayi tidak ketergantungan untuk mengonsumsi ASI berlebih

## 3.3. Tujuan pemberiaan MP ASI
- Melatih bayi mengonsumsi makanan bergizi sesuai pertambahan usia
- Membantu mengembangkan kemampuan mengunyah dan menelan

## 3.4. Syarat Pemberian MP ASI
- **Tepat waktu**
  
  MPASI diberikan saat ASI saja sudah tidak lagi dapat memenuhi kebutuhan energi bayi, yaitu mulai usia 6 bulan.

- **Adekuat**
  
  MPASI harus memenuhi kecukupan energi, protein, dan mikronutrien untuk mendukung tumbuh kembang optimal, dan Pemberian MPASI perlu mempertimbangkan:
  - Usia anak
  - Jumlah makanan
  - Frekuensi pemberian
  - Konsistensi/tekstur makanan
  - Variasi dan keberagaman makanan

- **Aman**
  
  MPASI disiapkan dan disimpan dengan cara yang higienis, diberikan menggunakan tangan dan peralatan yang bersih.

- **Diberikan dengan cara benar**
  
  MPASI harus memenuhi syarat terjadwal, lingkungan yang mendukung, dan prosedur makan yang tepat.

## 3.5. Buku menu MP ASI
Bedasarkan buku kemenkes terlampir file`,
          duration: "35 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },

    // 4) PMT PENYULUHAN
    {
      id: "sub4",
      title: "Pemberian Makanan Tambahan (PMT Penyuluhan)",
      description:
        "Memahami pengertian, sasaran, manfaat/tujuan, standar, dan menu PMT penyuluhan.",
      duration: "70 menit",
      isCompleted: false,
      isUnlocked: false,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin4-1",
          title: "PMT Penyuluhan ",
          content: `# 4. PMT Penyuluhan

## 4.1. Pengertian
- PMT adalah pemberian makanan ringan bergizi dan aman untuk balita guna meningkatkan status gizi sesuai umur anak. Pemberian Makanan Tambahan (PMT) berbahan pangan lokal merupakan salah satu strategi penanganan masalah gizi pada Balita dan upaya pencegahan stunting.

- PMT Penyuluhan adalah makanan tambahan (di luar MP-ASI/makanan keluarga yang dikonsumsi sehari-hari) yang diberikan kepada balita 6-59 bulan berbahan pangan lokal sebagai contoh makanan tambahan yang baik untuk edukasi dalam perbaikan pola konsumsi sesuai gizi seimbang.

## 4.2. Sasaran PMT Penyuluhan
Balita 6-59 bulan yang tidak memiliki gangguan gizi sebagai suatu tindakan pencegahan.

## 4.3. Manfaat/tujuan
- Sarana edukasi dalam pemberian makanan kepada balita sesuai standar.
- Meningkatkan kehadiran sasaran setiap bulan di Posyandu.

## 4.4. Standar PMT Penyuluhan
Syarat Bahan Pangan yang digunakan dalam pembuatan Makanan Tambahan
- Terbuat dari pangan lokal yang mudah didapat.
- Sumber pangan beragam, minimal terdapat kelompok bahan makanan pokok, pangan hewani, sayur, dan buah-buahan.
- Kaya gizi. Hindari penggunaan bahan makanan yang rendah zat gizi, seperti snack makanan ringan.
- Keamanan pangan diperhatikan, tidak mengandung zat berbahaya (pengawet, pewarnadan pemanis buatan).
- Harga terjangkau

## 4.5. Menu PMT
Ada di file ppt kemenkes`,
          duration: "30 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },

    // 5) IMUNISASI
    {
      id: "sub5",
      title: "Imunisasi (PD3I)",
      description:
        "Memahami pengertian, tujuan, jadwal, dan daftar penyakit yang dapat dicegah dengan imunisasi (PD3I).",
      duration: "75 menit",
      isCompleted: false,
      isUnlocked: false,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin5-1",
          title: "Imunisasi",
          content: `# 5. Imunisasi

## 5.1. Pengertian
Imunisasi adalah suatu upaya untuk menimbulkan/meningkatkan kekebalan seseorang secara aktif terhadap suatu penyakit sehingga bila suatu saat terpajan dengan penyakit tersebut tidak akan sakit atau hanya mengalami sakit ringan.

## 5.2. PD3I

### 5.2.1. Pengertian
Penyakit-penyakit yang Dapat Dicegah Dengan Imunisasi atau PD3I merupakan penyakit yang disebabkan oleh virus dan bakteri.

### 5.2.2. Manfaat/Tujuan
- Proteksi individu  
- Membentuk kekebalan kelompok (Herd Immunity)  
- Proteksi lintas kelompok

## 5.3. Jadwal Pemberian Imunisasi Rutin Lengkap
Ada pada table kemenkes

## 5.4. Penyakit yang dapat dicegah dengan PD3I (Ada di permenkes)
### 5.4.1. Penyakit Polio
### 5.4.2. Penyakit Campak Rubela
### 5.4.3. Penyakit Tetanus Neonatarum
### 5.4.4. Penyakit Pertusis (Batuk 100 Hari)
### 5.4.5. Penyakit Difteri
### 5.4.6. Penyakit Hepatitis B
### 5.4.7. Penyakit Kanker Serviks`,
          duration: "35 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },

    // 6) TUMBUH KEMBANG
    {
      id: "sub6",
      title: "Tumbuh Kembang",
      description:
        "Deteksi tumbuh kembang, stimulasi, dan gangguan. (Pada PDF, bagian ini hanya judul tanpa isi.)",
      duration: "45 menit",
      isCompleted: false,
      isUnlocked: false,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin6-1",
          title: "Tumbuh Kembang (keterangan)",
          content: "maaf materi belum ada",
          duration: "15 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },
  ],
};

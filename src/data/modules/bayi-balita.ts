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
      quiz: [
        {
          id: "quiz1-1",
          question: "Rentang usia balita menurut modul adalah…",
          options: ["0–11 bulan", "0–28 hari", "12–59 bulan", "6–24 bulan"],
          correctAnswer: 2,
          explanation:
            "Balita adalah anak usia 12–59 bulan (bawah lima tahun).",
        },
        {
          id: "quiz1-2",
          question: "Usia bayi baru lahir didefinisikan sebagai…",
          options: ["0–7 hari", "0–14 hari", "0–28 hari", "0–30 hari"],
          correctAnswer: 2,
          explanation:
            "Bayi baru lahir adalah 0–28 hari sesuai definisi pada modul.",
        },
        {
          id: "quiz1-3",
          question: "Masa bayi mencakup usia…",
          options: ["0–11 bulan", "12–59 bulan", "0–28 hari", "6–24 bulan"],
          correctAnswer: 0,
          explanation:
            "Masa bayi adalah 0–11 bulan, sebelum masuk kategori balita.",
        },
        {
          id: "quiz1-4",
          question:
            "Mengapa periode 0–59 bulan sering disebut masa emas pertumbuhan?",
          options: [
            "Karena anak mulai sekolah",
            "Karena pertumbuhan otak dan fisik sangat pesat",
            "Karena anak sudah mandiri",
            "Karena anak tidak butuh imunisasi",
          ],
          correctAnswer: 1,
          explanation:
            "Pertumbuhan dan perkembangan pesat terjadi pada usia 0–59 bulan.",
        },
        {
          id: "quiz1-5",
          question: "Seorang anak berusia 10 bulan dikategorikan sebagai…",
          options: ["Bayi", "Balita", "Remaja", "Pra-sekolah (definisi modul)"],
          correctAnswer: 0,
          explanation: "0–11 bulan termasuk kategori bayi.",
        },
      ],
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
      quiz: [
        {
          id: "quiz2-1",
          question: "ASI eksklusif menurut modul diberikan sampai usia…",
          options: ["3 bulan", "4 bulan", "6 bulan", "12 bulan"],
          correctAnswer: 2,
          explanation:
            "ASI eksklusif diberikan sejak lahir hingga usia 6 bulan.",
        },
        {
          id: "quiz2-2",
          question:
            "Tambahan berikut yang masih diperbolehkan saat ASI eksklusif adalah…",
          options: [
            "Air putih",
            "Susu formula",
            "Obat dalam bentuk sirup bila diperlukan",
            "Teh manis",
          ],
          correctAnswer: 2,
          explanation:
            "Modul menyebut pengecualian obat-obatan dalam bentuk sirup.",
        },
        {
          id: "quiz2-3",
          question: "Salah satu manfaat ASI eksklusif bagi bayi adalah…",
          options: [
            "Menurunkan sistem imun",
            "Meningkatkan sistem imun",
            "Meningkatkan risiko alergi",
            "Menghambat pertumbuhan otak",
          ],
          correctAnswer: 1,
          explanation: "ASI meningkatkan sistem imun bayi.",
        },
        {
          id: "quiz2-4",
          question: "Salah satu manfaat ASI eksklusif bagi ibu adalah…",
          options: [
            "Meningkatkan risiko kanker payudara",
            "Mengatasi trauma pasca persalinan dan meningkatkan kesehatan mental",
            "Menghambat produksi hormon",
            "Meningkatkan stres",
          ],
          correctAnswer: 1,
          explanation:
            "Modul menuliskan manfaat untuk kesehatan mental serta pencegahan kanker.",
        },
        {
          id: "quiz2-5",
          question:
            "Pernyataan berikut yang benar tentang ASI eksklusif adalah…",
          options: [
            "Bayi boleh diberikan air dan teh",
            "Bayi hanya diberikan ASI, tanpa makanan/minuman lain",
            "ASI eksklusif dimulai usia 3 bulan",
            "ASI eksklusif mengurangi imunitas",
          ],
          correctAnswer: 1,
          explanation:
            "Definisi modul: hanya ASI tanpa tambahan makanan/minuman.",
        },
      ],
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
      quiz: [
        {
          id: "quiz3-1",
          question: "Usia yang tepat memulai MPASI menurut modul adalah…",
          options: ["4 bulan", "5 bulan", "6 bulan", "9 bulan"],
          correctAnswer: 2,
          explanation:
            "MPASI diberikan mulai 6 bulan karena kebutuhan energi meningkat.",
        },
        {
          id: "quiz3-2",
          question: "Salah satu manfaat MPASI yang disebut di modul adalah…",
          options: [
            "Membuat bayi ketergantungan pada ASI",
            "Sumber nutrisi lebih lengkap",
            "Mengurangi minum air",
            "Menggantikan imunisasi",
          ],
          correctAnswer: 1,
          explanation: "Modul menyebut MPASI menambah kelengkapan nutrisi.",
        },
        {
          id: "quiz3-3",
          question: "MPASI tergolong adekuat bila…",
          options: [
            "Hanya tinggi karbohidrat",
            "Memenuhi energi, protein, dan mikronutrien",
            "Disajikan tanpa memperhatikan kebersihan",
            "Diberikan tanpa jadwal",
          ],
          correctAnswer: 1,
          explanation:
            "Adekuat artinya memenuhi energi, protein, mikronutrien.",
        },
        {
          id: "quiz3-4",
          question: "Salah satu pertimbangan penting pada syarat MPASI adalah…",
          options: [
            "Preferensi TV anak",
            "Konsistensi/tekstur sesuai usia",
            "Harga alat makan",
            "Warna piring",
          ],
          correctAnswer: 1,
          explanation: "Tekstur/konsistensi sesuai usia termasuk syarat MPASI.",
        },
        {
          id: "quiz3-5",
          question:
            "Pernyataan benar tentang 'diberikan dengan cara benar' adalah…",
          options: [
            "Tidak perlu jadwal makan",
            "Tidak perlu lingkungan pendukung",
            "Perlu jadwal, lingkungan mendukung, dan prosedur makan tepat",
            "Cukup satu jenis makanan saja",
          ],
          correctAnswer: 2,
          explanation: "Modul menuliskan tiga aspek cara pemberian yang benar.",
        },
      ],
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
      quiz: [
        {
          id: "quiz4-1",
          question: "Sasaran PMT Penyuluhan menurut modul adalah…",
          options: [
            "Ibu hamil",
            "Balita 6–59 bulan tanpa gangguan gizi",
            "Remaja putri",
            "Lansia",
          ],
          correctAnswer: 1,
          explanation:
            "Sasarannya adalah balita sehat usia 6–59 bulan sebagai pencegahan.",
        },
        {
          id: "quiz4-2",
          question: "Tujuan PMT Penyuluhan yang disebutkan modul adalah…",
          options: [
            "Menggantikan ASI",
            "Sarana edukasi dan meningkatkan kehadiran di posyandu",
            "Menaikkan biaya posyandu",
            "Mengurangi variasi makanan",
          ],
          correctAnswer: 1,
          explanation:
            "Dua tujuan yang ditulis: edukasi dan meningkatkan kehadiran.",
        },
        {
          id: "quiz4-3",
          question: "Salah satu syarat bahan pangan PMT adalah…",
          options: [
            "Tinggi pewarna dan pemanis",
            "Berbahan pangan lokal dan beragam",
            "Hanya dari makanan ringan",
            "Harus impor",
          ],
          correctAnswer: 1,
          explanation:
            "Modul menekankan bahan lokal, beragam, kaya gizi, dan aman.",
        },
        {
          id: "quiz4-4",
          question: "PMT Penyuluhan termasuk makanan…",
          options: [
            "Pokok sehari-hari keluarga",
            "Tambahan di luar MP-ASI sebagai contoh edukasi",
            "Hanya diberikan saat sakit",
            "Khusus anak di atas 5 tahun",
          ],
          correctAnswer: 1,
          explanation:
            "Diberikan sebagai contoh edukasi di luar MP-ASI/makanan keluarga.",
        },
        {
          id: "quiz4-5",
          question: "Mengapa keamanan pangan penting pada PMT?",
          options: [
            "Agar rasa lebih manis",
            "Agar bisa disimpan lama dengan pengawet",
            "Untuk mencegah paparan zat berbahaya",
            "Supaya warna makanan menarik",
          ],
          correctAnswer: 2,
          explanation:
            "Modul melarang bahan berbahaya seperti pengawet/pewarna.",
        },
      ],
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
      quiz: [
        {
          id: "quiz5-1",
          question: "Tujuan utama imunisasi menurut modul adalah…",
          options: [
            "Membuat anak cepat lapar",
            "Menimbulkan/meningkatkan kekebalan terhadap penyakit",
            "Menggantikan peran ASI",
            "Menaikkan berat badan",
          ],
          correctAnswer: 1,
          explanation:
            "Definisi modul menyebut menimbulkan/meningkatkan kekebalan.",
        },
        {
          id: "quiz5-2",
          question: "Kepanjangan PD3I adalah…",
          options: [
            "Program Deteksi Dini dan Imunitas",
            "Penyakit Dapat Dicegah Dengan Imunisasi",
            "Pemberian Dosis 3 Imunisasi",
            "Panduan Dasar Data Imunisasi",
          ],
          correctAnswer: 1,
          explanation: "PD3I adalah Penyakit Dapat Dicegah Dengan Imunisasi.",
        },
        {
          id: "quiz5-3",
          question:
            "Salah satu manfaat imunisasi pada tingkat populasi adalah…",
          options: [
            "Meningkatkan alergi populasi",
            "Membentuk herd immunity",
            "Menambah konsumsi gula",
            "Mengurangi aktivitas fisik",
          ],
          correctAnswer: 1,
          explanation:
            "Herd immunity adalah salah satu tujuan yang disebutkan modul.",
        },
        {
          id: "quiz5-4",
          question: "Contoh penyakit PD3I yang ada di daftar modul adalah…",
          options: ["Hipertensi", "Diabetes", "Polio", "Asma"],
          correctAnswer: 2,
          explanation: "Polio termasuk dalam daftar 5.4.1 modul.",
        },
        {
          id: "quiz5-5",
          question: "Informasi jadwal imunisasi rutin lengkap menurut modul…",
          options: [
            "Ada pada tabel Kemenkes",
            "Tidak diperlukan",
            "Hanya untuk dewasa",
            "Bisa diabaikan",
          ],
          correctAnswer: 0,
          explanation: "Modul menyebut referensinya pada tabel Kemenkes.",
        },
      ],
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
      quiz: [
        {
          id: "quiz6-1",
          question: "Mengapa deteksi dini tumbuh kembang penting dilakukan?",
          options: [
            "Untuk mendeteksi gangguan sejak awal agar tertangani cepat",
            "Untuk menambah jadwal imunisasi",
            "Untuk mengurangi waktu tidur anak",
            "Untuk mengganti ASI",
          ],
          correctAnswer: 0,
          explanation:
            "Deteksi dini membantu intervensi cepat bila ada keterlambatan/gangguan.",
        },
        {
          id: "quiz6-2",
          question: "Stimulasi dini umumnya bertujuan untuk…",
          options: [
            "Mengoptimalkan perkembangan motorik, bahasa, kognitif, dan sosial-emosional",
            "Mengurangi nafsu makan",
            "Membatasi aktivitas anak",
            "Mengurangi interaksi dengan orang tua",
          ],
          correctAnswer: 0,
          explanation:
            "Stimulasi bertujuan mengoptimalkan berbagai aspek perkembangan.",
        },
        {
          id: "quiz6-3",
          question:
            "Pihak yang berkolaborasi memantau tumbuh kembang di posyandu adalah…",
          options: [
            "Kader posyandu dan orang tua",
            "Pedagang pasar",
            "Relawan umum",
            "Pekerja bangunan",
          ],
          correctAnswer: 0,
          explanation:
            "Pemantauan dilakukan oleh kader bersama keluarga/orang tua.",
        },
        {
          id: "quiz6-4",
          question: "Indikator fisik pertumbuhan yang umum dipantau adalah…",
          options: [
            "Berat badan, tinggi/panjang badan, lingkar kepala",
            "Warna baju",
            "Jumlah mainan",
            "Jam menonton TV",
          ],
          correctAnswer: 0,
          explanation: "Itu indikator standar pemantauan pertumbuhan fisik.",
        },
        {
          id: "quiz6-5",
          question: "Kapan sebaiknya stimulasi perkembangan diberikan?",
          options: [
            "Sejak dini dan dilakukan rutin",
            "Hanya saat sakit",
            "Setelah anak 5 tahun",
            "Jika anak sudah sekolah",
          ],
          correctAnswer: 0,
          explanation: "Stimulasi dilakukan sedini mungkin dan konsisten.",
        },
      ],
    },
  ],
};

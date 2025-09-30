export interface PoinDetail {
  id: string;
  title: string;
  content: string;
  duration: string;
  isCompleted: boolean;
  type: "text" | "video" | "image";
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[];
  passed: boolean;
}

export interface SubMateri {
  id: string;
  title: string;
  description: string;
  duration: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  poinDetails: PoinDetail[];
  quiz: Quiz[];
  currentPoinIndex: number;
  quizResult?: QuizResult;
}

export interface DetailModul {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  difficulty: "Pemula" | "Menengah" | "Lanjutan";
  category: string;
  status: "not-started" | "in-progress" | "completed";
  progress: number;
  rating: number;
  students: number;
  thumbnail: string;
  instructor: string;
  estimatedCompletion: string;
  subMateris: SubMateri[];
  overview: string;
  learningObjectives: string[];
  requirements: string[];
}

// Dummy data for detailed modules
export const detailModulData: DetailModul[] = [
  {
    id: 1,
    slug: "pengelolaan-posyandu",
    title: "Modul Pengelolaan Posyandu",
    description:
      "Pelajari cara mengelola posyandu dengan baik, mulai dari administrasi, koordinasi kader, hingga pelaporan kegiatan.",
    duration: "3 jam 30 menit",
    lessons: 12,
    difficulty: "Menengah",
    category: "Pengelolaan Posyandu",
    status: "in-progress",
    progress: 35,
    rating: 4.9,
    students: 850,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Siti Nurhaliza",
    estimatedCompletion: "5 hari",
    overview:
      "Modul ini dirancang untuk melatih kader posyandu dalam mengelola kegiatan posyandu secara efektif dan efisien. Anda akan mempelajari berbagai aspek pengelolaan mulai dari administrasi hingga koordinasi dengan berbagai pihak.",
    learningObjectives: [
      "Memahami struktur dan fungsi posyandu",
      "Menguasai administrasi posyandu",
      "Mampu berkoordinasi dengan berbagai pihak",
      "Dapat membuat laporan kegiatan yang baik",
    ],
    requirements: [
      "Kader posyandu aktif",
      "Memiliki pengalaman minimal 6 bulan",
      "Akses internet stabil",
    ],
    subMateris: [
      {
        id: "sub1",
        title: "Pengenalan Posyandu",
        description: "Memahami konsep dasar, sejarah, dan tujuan posyandu",
        duration: "45 menit",
        isCompleted: true,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin1-1",
            title: "Sejarah dan Latar Belakang Posyandu",
            content:
              "Posyandu (Pos Pelayanan Terpadu) adalah salah satu bentuk Upaya Kesehatan Bersumber Daya Masyarakat (UKBM) yang dikelola dan diselenggarakan dari, oleh, untuk dan bersama masyarakat dalam penyelenggaraan pembangunan kesehatan, guna memberdayakan masyarakat dan memberikan kemudahan kepada masyarakat dalam memperoleh pelayanan kesehatan dasar untuk mempercepat penurunan angka kematian ibu dan bayi.",
            duration: "15 menit",
            isCompleted: true,
            type: "text",
          },
          {
            id: "poin1-2",
            title: "Tujuan dan Manfaat Posyandu",
            content:
              "Tujuan umum posyandu adalah untuk menurunkan angka kematian bayi (AKB), angka kematian ibu (maternal mortality rate), dan angka kematian anak balita. Sedangkan tujuan khususnya meliputi meningkatkan peran masyarakat dalam penyelenggaraan upaya kesehatan dasar, terutama yang berkaitan dengan penurunan AKB dan AKI.",
            duration: "15 menit",
            isCompleted: true,
            type: "text",
          },
          {
            id: "poin1-3",
            title: "Struktur Organisasi Posyandu",
            content:
              "Struktur organisasi posyandu terdiri dari: 1) Pembina (Kepala Desa/Lurah), 2) Penanggung Jawab (Ketua RW/RT), 3) Ketua Posyandu, 4) Sekretaris, 5) Bendahara, 6) Kader Posyandu. Setiap posisi memiliki tugas dan tanggung jawab yang spesifik.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz1-1",
            question: "Apa kepanjangan dari Posyandu?",
            options: [
              "Pos Pelayanan Terpadu",
              "Pos Pembangunan Terpadu",
              "Pos Kesehatan Terpadu",
              "Pos Masyarakat Terpadu",
            ],
            correctAnswer: 0,
            explanation:
              "Posyandu adalah singkatan dari Pos Pelayanan Terpadu, yang merupakan bentuk UKBM untuk memberikan pelayanan kesehatan dasar kepada masyarakat.",
          },
          {
            id: "quiz1-2",
            question:
              "Siapa yang menjadi pembina dalam struktur organisasi posyandu?",
            options: [
              "Ketua RW",
              "Kepala Desa/Lurah",
              "Ketua Posyandu",
              "Kader Posyandu",
            ],
            correctAnswer: 1,
            explanation:
              "Kepala Desa atau Lurah berperan sebagai pembina dalam struktur organisasi posyandu.",
          },
          {
            id: "quiz1-3",
            question: "Apa tujuan utama posyandu?",
            options: [
              "Meningkatkan ekonomi masyarakat",
              "Menurunkan angka kematian ibu dan bayi",
              "Meningkatkan pendidikan",
              "Memperbaiki infrastruktur",
            ],
            correctAnswer: 1,
            explanation:
              "Tujuan utama posyandu adalah menurunkan angka kematian ibu (AKI) dan angka kematian bayi (AKB).",
          },
          {
            id: "quiz1-4",
            question: "Posyandu termasuk dalam kategori apa?",
            options: [
              "Program pemerintah pusat",
              "UKBM (Upaya Kesehatan Bersumber Daya Masyarakat)",
              "Program swasta",
              "Program internasional",
            ],
            correctAnswer: 1,
            explanation:
              "Posyandu adalah salah satu bentuk UKBM yang dikelola oleh masyarakat untuk masyarakat.",
          },
          {
            id: "quiz1-5",
            question:
              "Berapa minimal jumlah kader yang dibutuhkan untuk menjalankan posyandu?",
            options: ["3 orang", "5 orang", "7 orang", "10 orang"],
            correctAnswer: 1,
            explanation:
              "Minimal dibutuhkan 5 orang kader untuk menjalankan kegiatan posyandu secara optimal.",
          },
        ],
      },
      {
        id: "sub2",
        title: "Administrasi Posyandu",
        description:
          "Mempelajari sistem administrasi dan pencatatan di posyandu",
        duration: "50 menit",
        isCompleted: false,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin2-1",
            title: "Jenis-jenis Formulir Posyandu",
            content:
              "Formulir posyandu terdiri dari berbagai jenis seperti: 1) Kohort Ibu, 2) Kohort Bayi, 3) Kohort Balita, 4) Kohort Anak Sekolah dan Remaja, 5) Kohort Dewasa dan Lansia, 6) SIP (Sistem Informasi Posyandu), 7) Buku Register Kegiatan Posyandu.",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-2",
            title: "Cara Pengisian Kohort",
            content:
              "Kohort adalah catatan terpadu yang berisi data tentang keadaan dan perkembangan anak, ibu hamil, ibu menyusui, dan PUS di wilayah kerja posyandu. Pengisian harus dilakukan secara teliti dan berkesinambungan untuk memantau perkembangan kesehatan masyarakat.",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-3",
            title: "Sistem Pelaporan Posyandu",
            content:
              "Pelaporan posyandu dilakukan secara berjenjang dari posyandu ke puskesmas, kemudian ke dinas kesehatan kabupaten/kota. Laporan harus dibuat setiap bulan dan berisi data kegiatan serta pencapaian program posyandu.",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz2-1",
            question: "Apa yang dimaksud dengan Kohort dalam posyandu?",
            options: [
              "Daftar hadir kegiatan",
              "Catatan terpadu perkembangan kesehatan",
              "Jadwal kegiatan posyandu",
              "Daftar kader posyandu",
            ],
            correctAnswer: 1,
            explanation:
              "Kohort adalah catatan terpadu yang berisi data perkembangan kesehatan sasaran posyandu.",
          },
          {
            id: "quiz2-2",
            question: "Berapa jenis kohort yang ada di posyandu?",
            options: ["3 jenis", "5 jenis", "7 jenis", "10 jenis"],
            correctAnswer: 1,
            explanation:
              "Ada 5 jenis kohort: Kohort Ibu, Bayi, Balita, Anak Sekolah & Remaja, serta Dewasa & Lansia.",
          },
          {
            id: "quiz2-3",
            question: "Kapan laporan posyandu harus dibuat?",
            options: [
              "Setiap minggu",
              "Setiap bulan",
              "Setiap 3 bulan",
              "Setiap tahun",
            ],
            correctAnswer: 1,
            explanation:
              "Laporan posyandu harus dibuat setiap bulan untuk dilaporkan ke puskesmas.",
          },
          {
            id: "quiz2-4",
            question: "Kepada siapa laporan posyandu diserahkan?",
            options: [
              "Kepala desa",
              "Puskesmas",
              "Dinas kesehatan langsung",
              "Bidan desa",
            ],
            correctAnswer: 1,
            explanation:
              "Laporan posyandu diserahkan ke puskesmas sebagai pembina teknis posyandu.",
          },
          {
            id: "quiz2-5",
            question: "Apa fungsi utama SIP (Sistem Informasi Posyandu)?",
            options: [
              "Mencatat keuangan posyandu",
              "Mengintegrasikan data kesehatan masyarakat",
              "Membuat jadwal kegiatan",
              "Mendata kader posyandu",
            ],
            correctAnswer: 1,
            explanation:
              "SIP berfungsi untuk mengintegrasikan dan mengelola data kesehatan masyarakat di posyandu.",
          },
        ],
      },
      {
        id: "sub3",
        title: "Koordinasi dan Kerjasama",
        description: "Membangun kerjasama dengan berbagai pihak terkait",
        duration: "40 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin3-1",
            title: "Stakeholder Posyandu",
            content:
              "Stakeholder posyandu meliputi: 1) Puskesmas sebagai pembina teknis, 2) Pemerintah desa/kelurahan, 3) PKK dan organisasi masyarakat, 4) Sektor swasta, 5) Tokoh masyarakat dan agama, 6) Masyarakat sebagai sasaran program.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-2",
            title: "Strategi Koordinasi Efektif",
            content:
              "Koordinasi yang efektif memerlukan: 1) Komunikasi yang jelas dan terbuka, 2) Pembagian tugas yang tepat, 3) Jadwal pertemuan rutin, 4) Dokumentasi hasil koordinasi, 5) Evaluasi berkala terhadap kerjasama yang terjalin.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-3",
            title: "Mengatasi Konflik dalam Tim",
            content:
              "Langkah mengatasi konflik: 1) Identifikasi akar masalah, 2) Fasilitasi dialog terbuka, 3) Cari solusi win-win, 4) Buat kesepakatan tertulis, 5) Monitor implementasi kesepakatan, 6) Evaluasi dan perbaikan berkelanjutan.",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz3-1",
            question: "Siapa pembina teknis posyandu?",
            options: ["Kepala desa", "Puskesmas", "Dinas kesehatan", "Bidan"],
            correctAnswer: 1,
            explanation:
              "Puskesmas berperan sebagai pembina teknis posyandu dalam hal pelayanan kesehatan.",
          },
          {
            id: "quiz3-2",
            question:
              "Apa yang harus dilakukan pertama kali saat terjadi konflik dalam tim?",
            options: [
              "Memarahi pihak yang salah",
              "Mengabaikan konflik",
              "Identifikasi akar masalah",
              "Mengganti anggota tim",
            ],
            correctAnswer: 2,
            explanation:
              "Langkah pertama mengatasi konflik adalah mengidentifikasi akar masalah secara objektif.",
          },
          {
            id: "quiz3-3",
            question: "Berapa sering sebaiknya diadakan pertemuan koordinasi?",
            options: ["Setiap hari", "Mingguan", "Bulanan", "Tahunan"],
            correctAnswer: 2,
            explanation:
              "Pertemuan koordinasi sebaiknya dilakukan secara rutin minimal bulanan.",
          },
          {
            id: "quiz3-4",
            question: "Apa manfaat dokumentasi hasil koordinasi?",
            options: [
              "Sebagai arsip saja",
              "Untuk evaluasi dan tindak lanjut",
              "Memenuhi persyaratan administrasi",
              "Menunjukkan aktivitas tim",
            ],
            correctAnswer: 1,
            explanation:
              "Dokumentasi hasil koordinasi penting untuk evaluasi dan tindak lanjut kegiatan.",
          },
          {
            id: "quiz3-5",
            question: "Siapa saja yang termasuk stakeholder posyandu?",
            options: [
              "Hanya puskesmas dan masyarakat",
              "Puskesmas, pemerintah desa, dan PKK",
              "Semua pihak yang terlibat dan terdampak",
              "Hanya kader dan petugas kesehatan",
            ],
            correctAnswer: 2,
            explanation:
              "Stakeholder posyandu meliputi semua pihak yang terlibat dan terdampak oleh kegiatan posyandu.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "bayi-balita",
    title: "Modul Bayi & Balita",
    description:
      "Memahami tumbuh kembang bayi dan balita, pemberian ASI eksklusif, MPASI, dan stimulasi yang tepat.",
    duration: "4 jam 15 menit",
    lessons: 15,
    difficulty: "Menengah",
    category: "Bayi & Balita",
    status: "not-started",
    progress: 0,
    rating: 4.8,
    students: 1450,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Budi Santoso",
    estimatedCompletion: "6 hari",
    overview:
      "Modul komprehensif tentang perawatan bayi dan balita yang mencakup nutrisi, tumbuh kembang, dan stimulasi yang tepat untuk mendukung perkembangan optimal anak.",
    learningObjectives: [
      "Memahami tahapan tumbuh kembang bayi dan balita",
      "Menguasai teknik pemberian ASI eksklusif",
      "Dapat menyusun menu MPASI yang bergizi",
      "Mampu memberikan stimulasi yang tepat",
    ],
    requirements: [
      "Pengetahuan dasar kesehatan anak",
      "Pengalaman berinteraksi dengan balita",
      "Komitmen untuk belajar",
    ],
    subMateris: [
      {
        id: "sub1",
        title: "ASI Eksklusif dan Manfaatnya",
        description: "Memahami pentingnya ASI eksklusif untuk 6 bulan pertama",
        duration: "55 menit",
        isCompleted: false,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin1-1",
            title: "Pengertian ASI Eksklusif",
            content:
              "ASI Eksklusif adalah pemberian ASI saja kepada bayi sejak lahir sampai berusia 6 bulan tanpa menambahkan dan/atau mengganti dengan makanan atau minuman lain kecuali vitamin, mineral, dan obat yang diizinkan dokter.",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-2",
            title: "Manfaat ASI untuk Bayi",
            content:
              "ASI memberikan manfaat optimal untuk bayi: 1) Nutrisi lengkap sesuai kebutuhan, 2) Antibodi untuk kekebalan tubuh, 3) Mudah dicerna, 4) Menurunkan risiko alergi, 5) Mendukung perkembangan otak, 6) Mengurangi risiko obesitas di kemudian hari.",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-3",
            title: "Manfaat ASI untuk Ibu",
            content:
              "Menyusui juga memberikan manfaat untuk ibu: 1) Mempercepat pemulihan rahim, 2) Menurunkan risiko kanker payudara dan ovarium, 3) Kontrasepsi alami (MAL), 4) Menguatkan ikatan emosional dengan bayi, 5) Menghemat pengeluaran keluarga.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz1-1",
            question: "Berapa lama bayi harus mendapat ASI eksklusif?",
            options: ["3 bulan", "4 bulan", "6 bulan", "12 bulan"],
            correctAnswer: 2,
            explanation:
              "ASI eksklusif diberikan selama 6 bulan pertama kehidupan bayi tanpa tambahan makanan atau minuman lain.",
          },
          {
            id: "quiz1-2",
            question: "Apa manfaat utama ASI untuk sistem kekebalan bayi?",
            options: [
              "Mengandung vitamin C tinggi",
              "Mengandung antibodi alami",
              "Mengandung zat besi tinggi",
              "Mengandung protein tinggi",
            ],
            correctAnswer: 1,
            explanation:
              "ASI mengandung antibodi alami yang membantu melindungi bayi dari berbagai penyakit dan infeksi.",
          },
          {
            id: "quiz1-3",
            question: "Apa itu MAL dalam konteks menyusui?",
            options: [
              "Metode Amenore Laktasi",
              "Makanan Asi Lengkap",
              "Masa Awal Laktasi",
              "Manual Asi Lengkap",
            ],
            correctAnswer: 0,
            explanation:
              "MAL (Metode Amenore Laktasi) adalah kontrasepsi alami yang mengandalkan menyusui eksklusif.",
          },
          {
            id: "quiz1-4",
            question: "Kapan ASI pertama (kolostrum) mulai diproduksi?",
            options: [
              "Setelah melahirkan",
              "Saat hamil trimester ketiga",
              "Saat hamil trimester kedua",
              "Seminggu setelah melahirkan",
            ],
            correctAnswer: 1,
            explanation:
              "Kolostrum mulai diproduksi sejak trimester ketiga kehamilan dan sangat kaya nutrisi untuk bayi baru lahir.",
          },
          {
            id: "quiz1-5",
            question: "Apa yang membedakan ASI dengan susu formula?",
            options: [
              "ASI lebih murah",
              "ASI mengandung antibodi hidup",
              "ASI lebih mudah disiapkan",
              "ASI lebih mengenyangkan",
            ],
            correctAnswer: 1,
            explanation:
              "ASI mengandung antibodi hidup dan sel-sel kekebalan yang tidak dapat ditemukan dalam susu formula.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "ibu-hamil-menyusui",
    title: "Modul Ibu Hamil & Menyusui",
    description:
      "Panduan lengkap perawatan kehamilan, persiapan persalinan, dan perawatan masa nifas serta menyusui.",
    duration: "4 jam 10 menit",
    lessons: 14,
    difficulty: "Menengah",
    category: "Ibu Hamil & Menyusui",
    status: "not-started",
    progress: 0,
    rating: 4.7,
    students: 950,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Lisa Kartika",
    estimatedCompletion: "6 hari",
    overview:
      "Modul ini memberikan panduan komprehensif untuk mendampingi ibu hamil dan menyusui dengan informasi terkini dan praktis.",
    learningObjectives: [
      "Memahami perubahan fisik dan psikis selama kehamilan",
      "Menguasai teknik menyusui yang benar",
      "Dapat memberikan konseling laktasi",
      "Mampu mendeteksi tanda bahaya kehamilan",
    ],
    requirements: [
      "Pengetahuan dasar kesehatan reproduksi",
      "Kepedulian terhadap kesehatan ibu",
      "Kemampuan komunikasi yang baik",
    ],
    subMateris: [
      {
        id: "sub1",
        title: "Perawatan Kehamilan",
        description: "Memahami perawatan dasar selama masa kehamilan",
        duration: "60 menit",
        isCompleted: false,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin1-1",
            title: "Perubahan Tubuh Selama Kehamilan",
            content:
              "Selama kehamilan, tubuh ibu mengalami berbagai perubahan fisik dan hormonal yang normal terjadi untuk mendukung pertumbuhan janin.",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-2",
            title: "Nutrisi Penting untuk Ibu Hamil",
            content:
              "Kebutuhan nutrisi ibu hamil meningkat untuk mendukung pertumbuhan janin yang optimal, termasuk asam folat, zat besi, dan kalsium.",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-3",
            title: "Tanda Bahaya Kehamilan",
            content:
              "Mengenali tanda-tanda bahaya selama kehamilan seperti perdarahan, nyeri perut yang hebat, dan pembengkakan yang berlebihan.",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz1-1",
            question: "Apa saja tanda bahaya kehamilan yang perlu diwaspadai?",
            options: [
              "Mual muntah ringan",
              "Perdarahan pervaginam",
              "Pergerakan janin yang aktif",
              "Penambahan berat badan normal",
            ],
            correctAnswer: 1,
            explanation:
              "Perdarahan pervaginam merupakan salah satu tanda bahaya kehamilan yang memerlukan penanganan medis segera.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "usia-sekolah-remaja",
    title: "Modul Usia Sekolah & Remaja",
    description:
      "Edukasi kesehatan reproduksi remaja, gizi seimbang untuk anak sekolah, dan pencegahan penyakit pada remaja.",
    duration: "3 jam 15 menit",
    lessons: 10,
    difficulty: "Menengah",
    category: "Usia Sekolah & Remaja",
    status: "in-progress",
    progress: 30,
    rating: 4.6,
    students: 1100,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Ahmad Fauzi",
    estimatedCompletion: "5 hari",
    overview:
      "Modul khusus untuk memahami kebutuhan kesehatan anak usia sekolah dan remaja dengan pendekatan yang sesuai tahap perkembangan.",
    learningObjectives: [
      "Memahami tahap perkembangan remaja",
      "Dapat memberikan edukasi kesehatan reproduksi",
      "Menguasai prinsip gizi seimbang untuk remaja",
      "Mampu berkomunikasi efektif dengan remaja",
    ],
    requirements: [
      "Pengalaman berinteraksi dengan remaja",
      "Pemahaman dasar psikologi perkembangan",
      "Kemampuan komunikasi yang baik",
    ],
    subMateris: [
      {
        id: "sub1",
        title: "Kesehatan Reproduksi Remaja",
        description:
          "Memahami edukasi kesehatan reproduksi yang tepat untuk remaja",
        duration: "45 menit",
        isCompleted: false,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin1-1",
            title: "Perubahan Fisik Masa Pubertas",
            content:
              "Masa pubertas adalah periode perubahan fisik dan hormonal yang menandai transisi dari anak-anak menuju dewasa.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-2",
            title: "Edukasi Kesehatan Reproduksi",
            content:
              "Memberikan informasi yang akurat dan sesuai usia tentang kesehatan reproduksi untuk mencegah perilaku berisiko.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-3",
            title: "Pencegahan Penyakit Menular Seksual",
            content:
              "Edukasi tentang cara pencegahan penyakit menular seksual dan pentingnya perilaku seks yang aman dan bertanggung jawab.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz1-1",
            question:
              "Kapan waktu yang tepat untuk memberikan edukasi kesehatan reproduksi?",
            options: [
              "Setelah remaja aktif secara seksual",
              "Sebelum masa pubertas dimulai",
              "Hanya ketika remaja bertanya",
              "Setelah remaja menikah",
            ],
            correctAnswer: 1,
            explanation:
              "Edukasi kesehatan reproduksi sebaiknya diberikan sebelum masa pubertas untuk mempersiapkan remaja menghadapi perubahan yang akan terjadi.",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "dewasa-lansia",
    title: "Modul Dewasa & Lansia",
    description:
      "Pengelolaan hipertensi dan diabetes, perawatan kesehatan lansia, dan pola hidup sehat pada usia dewasa.",
    duration: "4 jam 25 menit",
    lessons: 16,
    difficulty: "Lanjutan",
    category: "Dewasa & Lansia",
    status: "not-started",
    progress: 0,
    rating: 4.8,
    students: 720,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Andi Wijaya",
    estimatedCompletion: "7 hari",
    overview:
      "Modul lanjutan untuk memahami pengelolaan kesehatan dewasa dan lansia dengan fokus pada penyakit tidak menular dan perawatan jangka panjang.",
    learningObjectives: [
      "Menguasai pengelolaan hipertensi dan diabetes",
      "Memahami kebutuhan kesehatan lansia",
      "Dapat merancang program kesehatan komunitas",
      "Mampu memberikan konseling gaya hidup sehat",
    ],
    requirements: [
      "Pengetahuan dasar penyakit tidak menular",
      "Pengalaman dalam pelayanan kesehatan",
      "Kemampuan analisis dan evaluasi",
    ],
    subMateris: [
      {
        id: "sub1",
        title: "Pengelolaan Hipertensi",
        description:
          "Memahami cara mengelola dan mencegah hipertensi pada dewasa",
        duration: "50 menit",
        isCompleted: false,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin1-1",
            title: "Pengertian dan Klasifikasi Hipertensi",
            content:
              "Hipertensi adalah kondisi tekanan darah tinggi yang dapat menyebabkan komplikasi serius jika tidak dikelola dengan baik.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-2",
            title: "Faktor Risiko Hipertensi",
            content:
              "Berbagai faktor risiko hipertensi meliputi faktor yang dapat dimodifikasi seperti diet dan aktivitas fisik, serta faktor yang tidak dapat dimodifikasi seperti usia dan genetik.",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-3",
            title: "Pengelolaan Non-Farmakologis",
            content:
              "Pendekatan non-farmakologis untuk mengelola hipertensi meliputi modifikasi gaya hidup, diet rendah garam, olahraga teratur, dan manajemen stres.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz1-1",
            question: "Apa definisi hipertensi menurut standar terbaru?",
            options: [
              "Tekanan darah ≥120/80 mmHg",
              "Tekanan darah ≥130/80 mmHg",
              "Tekanan darah ≥140/90 mmHg",
              "Tekanan darah ≥150/90 mmHg",
            ],
            correctAnswer: 2,
            explanation:
              "Menurut standar terbaru, hipertensi didefinisikan sebagai tekanan darah ≥140/90 mmHg pada pengukuran berulang.",
          },
        ],
      },
    ],
  },
];

export const getDetailModulById = (id: number): DetailModul | null => {
  return detailModulData.find((modul) => modul.id === id) || null;
};

export const getDetailModulBySlug = (slug: string): DetailModul | null => {
  return detailModulData.find((modul) => modul.slug === slug) || null;
};

// Fungsi utility untuk membuat slug
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/modul\s+/gi, "") // Remove "Modul" prefix
    .replace(/[&]/g, "") // Remove &
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]/g, "") // Remove special characters except hyphens
    .replace(/\-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

export const updateSubMateriProgress = (
  modulId: number,
  subMateriId: string,
  poinIndex: number
): void => {
  const modul = detailModulData.find((m) => m.id === modulId);
  if (modul) {
    const subMateri = modul.subMateris.find((s) => s.id === subMateriId);
    if (subMateri) {
      subMateri.currentPoinIndex = poinIndex;
      if (poinIndex < subMateri.poinDetails.length) {
        subMateri.poinDetails[poinIndex].isCompleted = true;
      }
    }
  }
};

export const submitQuizResult = (
  modulId: number,
  subMateriId: string,
  result: QuizResult
): void => {
  const modul = detailModulData.find((m) => m.id === modulId);
  if (modul) {
    const subMateri = modul.subMateris.find((s) => s.id === subMateriId);
    if (subMateri) {
      subMateri.quizResult = result;
      if (result.passed) {
        subMateri.isCompleted = true;
        // Unlock next sub materi
        const currentIndex = modul.subMateris.findIndex(
          (s) => s.id === subMateriId
        );
        if (currentIndex < modul.subMateris.length - 1) {
          modul.subMateris[currentIndex + 1].isUnlocked = true;
        }
      }
    }
  }
};

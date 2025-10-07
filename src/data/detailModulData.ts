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
    duration: "2 jam 45 menit",
    lessons: 8,
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
      "Modul ini dirancang untuk melatih kader posyandu dalam mengelola kegiatan posyandu secara komprehensif. Anda akan mempelajari paket pelayanan posyandu untuk seluruh siklus hidup, sistem pencatatan dan pelaporan, serta pelaksanaan kunjungan rumah yang efektif.",
    learningObjectives: [
      "Memahami paket pelayanan posyandu untuk seluruh siklus hidup",
      "Menguasai sistem pencatatan dan pelaporan manual dan digital",
      "Mampu melaksanakan kunjungan rumah yang efektif",
      "Dapat menindaklanjuti hasil temuan kunjungan rumah",
    ],
    requirements: [
      "Kader posyandu aktif",
      "Memiliki pengalaman minimal 6 bulan",
      "Akses internet stabil",
    ],
    subMateris: [
      {
        id: "sub1",
        title: "Paket Pelayanan Posyandu untuk Seluruh Siklus Hidup",
        description:
          "Memahami paket pelayanan posyandu yang komprehensif untuk semua kelompok usia",
        duration: "60 menit",
        isCompleted: false,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin1-1",
            title: "Sarana dan Prasarana",
            content:
              "# Sarana dan Prasarana Posyandu\n\n## Pengertian\nSarana dan prasarana posyandu adalah fasilitas fisik dan peralatan yang dibutuhkan untuk mendukung pelaksanaan kegiatan posyandu secara optimal.\n\n## Sarana Utama yang Dibutuhkan:\n\n### 1. Peralatan Penimbangan dan Pengukuran\n- **Timbangan bayi** (dacin) untuk usia 0-24 bulan\n- **Timbangan anak** untuk balita di atas 2 tahun\n- **Timbangan dewasa** untuk ibu hamil dan menyusui\n- **Pengukur tinggi badan** (microtoise/stadiometer)\n- **Pita pengukur lingkar lengan atas (LILA)**\n- **Pita pengukur lingkar kepala** untuk bayi\n\n### 2. Peralatan Kesehatan Dasar\n- **Stetoskop** untuk pemeriksaan jantung dan paru-paru\n- **Tensimeter** untuk mengukur tekanan darah\n- **Termometer** untuk mengukur suhu tubuh\n- **Senter** untuk pemeriksaan mata dan tenggorokan\n- **Sarung tangan** sekali pakai\n\n### 3. Alat Tulis dan Administrasi\n- **Buku register** (kohort ibu, bayi, balita)\n- **Kartu Menuju Sehat (KMS)**\n- **Buku KIA** (Kesehatan Ibu dan Anak)\n- **Formulir pencatatan** dan pelaporan\n- **Alat tulis** (bolpoin, pensil, penggaris)\n\n### 4. Perlengkapan Edukasi\n- **Poster** dan **leaflet** kesehatan\n- **Flipchart** untuk penyuluhan\n- **Boneka** untuk demonstrasi\n- **Media audio visual** jika tersedia\n\n## Prasarana yang Dibutuhkan:\n\n### 1. Tempat Pelayanan\n- **Ruangan** yang cukup luas dan bersih\n- **Ventilasi** yang baik\n- **Pencahayaan** yang memadai\n- **Meja dan kursi** untuk pelayanan\n- **Tempat tidur** atau **kasur** untuk pemeriksaan\n\n### 2. Fasilitas Pendukung\n- **Air bersih** untuk cuci tangan\n- **Sabun** dan **handuk** bersih\n- **Tempat sampah** dengan penutup\n- **Kotak P3K** untuk pertolongan pertama\n- **Lemari** untuk menyimpan peralatan\n\n### 3. Area Khusus\n- **Area pendaftaran** dan **penimbangan**\n- **Area penyuluhan** dan **konseling**\n- **Area bermain** untuk anak-anak\n- **Area tunggu** yang nyaman\n\n## Standar Minimal Posyandu\n\n### Posyandu Pratama\n- Timbangan bayi dan anak\n- Alat pengukur tinggi badan\n- KMS dan buku register\n- Tempat pelayanan sederhana\n\n### Posyandu Madya\n- Semua peralatan Pratama\n- Ditambah alat kesehatan dasar\n- Ruangan yang lebih memadai\n- Media penyuluhan\n\n### Posyandu Purnama\n- Semua peralatan Madya\n- Peralatan lebih lengkap\n- Fasilitas yang lebih baik\n- Program tambahan (seperti PAUD)\n\n### Posyandu Mandiri\n- Peralatan paling lengkap\n- Fasilitas optimal\n- Program komprehensif\n- Swadana masyarakat\n\n## Tips Perawatan Sarana\n1. **Bersihkan** peralatan setelah digunakan\n2. **Kalibrasi** timbangan secara berkala\n3. **Simpan** peralatan di tempat yang aman\n4. **Inventarisasi** peralatan secara rutin\n5. **Perbaiki** atau **ganti** yang rusak\n\n## Sumber Pendanaan\n- **Dana desa** atau **kelurahan**\n- **Bantuan puskesmas** atau **dinas kesehatan**\n- **Swadaya masyarakat**\n- **CSR perusahaan** atau **donor**\n- **Program pemerintah** khusus posyandu",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-2",
            title: "Pelayanan Hari Buka",
            content:
              "# Pelayanan Hari Buka Posyandu\n\n## Pengertian\nPelayanan hari buka posyandu adalah kegiatan pelayanan kesehatan yang dilaksanakan secara rutin setiap bulan dengan jadwal yang telah ditetapkan, melibatkan kader, petugas kesehatan, dan masyarakat.\n\n## Sistem Lima Meja (5 Meja)\n\n### 🏷️ **Meja 1: Pendaftaran**\n**Petugas:** Kader\n**Kegiatan:**\n- Pendaftaran peserta posyandu\n- Pencatatan identitas dalam buku register\n- Pemberian nomor urut\n- Penyerahan KMS/buku KIA\n- **Target:** Semua kelompok usia\n\n### ⚖️ **Meja 2: Penimbangan**\n**Petugas:** Kader\n**Kegiatan:**\n- Penimbangan berat badan\n- Pengukuran tinggi badan\n- Pengukuran lingkar kepala (bayi)\n- Pengukuran LILA (ibu hamil)\n- Pencatatan hasil dalam KMS\n- **Target:** Balita, ibu hamil, ibu menyusui\n\n### 📝 **Meja 3: Pengisian KMS**\n**Petugas:** Kader\n**Kegiatan:**\n- Pengisian KMS/buku KIA\n- Interpretasi grafik pertumbuhan\n- Deteksi dini gangguan pertumbuhan\n- Pencatatan dalam kohort\n- **Target:** Balita, ibu hamil\n\n### 🩺 **Meja 4: Penyuluhan & Pelayanan**\n**Petugas:** Kader + Petugas Kesehatan\n**Kegiatan:**\n- Penyuluhan kesehatan\n- Konseling gizi dan kesehatan\n- Pemberian makanan tambahan (PMT)\n- Demonstrasi pembuatan MP-ASI\n- **Target:** Semua peserta\n\n### 💊 **Meja 5: Pelayanan Kesehatan**\n**Petugas:** Bidan/Perawat/Dokter\n**Kegiatan:**\n- Pemeriksaan kesehatan\n- Imunisasi\n- Pemberian vitamin A\n- Pemberian tablet tambah darah\n- Pelayanan KB\n- Pengobatan ringan\n- **Target:** Sesuai kebutuhan\n\n## Jadwal dan Waktu Pelaksanaan\n\n### Frekuensi\n- **Posyandu Balita:** Setiap bulan (12 kali/tahun)\n- **Posyandu Lansia:** Setiap bulan atau 2 minggu sekali\n- **Waktu:** Biasanya pagi hari (08.00-11.00 WIB)\n\n### Penentuan Jadwal\n- **Kesepakatan masyarakat** dan petugas kesehatan\n- **Mempertimbangkan** hari pasar atau kegiatan lain\n- **Konsisten** setiap bulan (misal: setiap tanggal 15)\n- **Disosialisasikan** ke seluruh masyarakat\n\n## Persiapan Hari Buka\n\n### 1 Minggu Sebelumnya\n- **Rapat koordinasi** kader\n- **Persiapan tempat** dan peralatan\n- **Undangan** ke masyarakat\n- **Koordinasi** dengan petugas kesehatan\n\n### 1 Hari Sebelumnya\n- **Cek kelengkapan** sarana prasarana\n- **Persiapan PMT** jika ada\n- **Konfirmasi** kehadiran petugas\n- **Pengaturan** ruangan\n\n### Hari H\n- **Datang lebih awal** (1 jam sebelum acara)\n- **Set up** peralatan dan ruangan\n- **Briefing** dengan tim kader\n- **Sambut** peserta dengan ramah\n\n## Target Pelayanan\n\n### 👶 **Bayi (0-11 bulan)**\n- **Penimbangan** dan pengukuran\n- **Imunisasi** sesuai jadwal\n- **Konseling ASI** eksklusif\n- **Deteksi dini** gangguan tumbuh kembang\n\n### 🧒 **Balita (12-59 bulan)**\n- **Penimbangan** dan pengukuran\n- **Imunisasi lanjutan**\n- **Vitamin A** (Februari & Agustus)\n- **Stimulasi** tumbuh kembang\n- **Edukasi gizi** seimbang\n\n### 🤱 **Ibu Hamil**\n- **Penimbangan** dan pengukuran LILA\n- **Pemeriksaan kehamilan** (ANC)\n- **Tablet tambah darah**\n- **Konseling** persiapan persalinan\n- **Deteksi** kehamilan risiko tinggi\n\n### 🤱 **Ibu Menyusui**\n- **Konseling** menyusui\n- **Konseling** KB\n- **Pemeriksaan** kesehatan\n- **Edukasi** gizi ibu menyusui\n\n### 👴 **Lansia**\n- **Penimbangan** dan pengukuran\n- **Pemeriksaan** tekanan darah\n- **Senam** lansia\n- **Konseling** gizi dan kesehatan\n- **Deteksi** penyakit tidak menular\n\n## Indikator Keberhasilan\n\n### Cakupan (Coverage)\n- **D/S**: Balita ditimbang/Balita sasaran ≥ 85%\n- **K/S**: Balita naik berat badan/Balita sasaran ≥ 50%\n- **Ibu hamil** yang memeriksakan kehamilan ≥ 95%\n\n### Kualitas Pelayanan\n- **Kelengkapan** pencatatan\n- **Ketepatan** interpretasi KMS\n- **Kualitas** penyuluhan\n- **Kepuasan** masyarakat\n\n## Tips Sukses Hari Buka\n\n1. **Persiapan matang** sebelum hari H\n2. **Kerjasama tim** yang solid\n3. **Pelayanan ramah** dan profesional\n4. **Edukasi menarik** dan mudah dipahami\n5. **Follow up** hasil pelayanan\n6. **Evaluasi** setiap selesai kegiatan\n7. **Dokumentasi** kegiatan dengan baik\n8. **Apresiasi** untuk peserta aktif",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-3",
            title: "Pelayanan Diluar Hari Buka",
            content:
              "# Pelayanan Diluar Hari Buka Posyandu\n\n## Pengertian\nPelayanan diluar hari buka posyandu adalah kegiatan pelayanan kesehatan yang dilakukan oleh kader posyandu di luar jadwal rutin bulanan, sesuai dengan kebutuhan masyarakat dan kondisi tertentu.\n\n## Jenis Pelayanan Diluar Hari Buka\n\n### 🏠 **1. Kunjungan Rumah (Home Visit)**\n\n#### Sasaran Prioritas:\n- **Ibu hamil** risiko tinggi\n- **Bayi baru lahir** (0-28 hari)\n- **Balita** dengan masalah gizi\n- **Lansia** dengan penyakit kronis\n- **Keluarga** yang tidak datang ke posyandu\n\n#### Kegiatan:\n- **Pemantauan** kesehatan individu\n- **Konseling** kesehatan dan gizi\n- **Deteksi dini** masalah kesehatan\n- **Rujukan** ke pelayanan kesehatan\n- **Follow up** hasil pelayanan\n\n### 🆘 **2. Pelayanan Gawat Darurat**\n\n#### Kondisi yang Ditangani:\n- **Demam tinggi** pada balita\n- **Diare** akut\n- **Kesulitan makan** pada bayi\n- **Kejang** pada anak\n- **Perdarahan** pada ibu hamil\n\n#### Tindakan:\n- **Pertolongan pertama**\n- **Stabilisasi** kondisi\n- **Rujukan cepat** ke fasilitas kesehatan\n- **Pendampingan** ke rumah sakit\n\n### 📚 **3. Penyuluhan Khusus**\n\n#### Kegiatan Edukatif:\n- **Penyuluhan kelompok** kecil\n- **Demonstrasi** masak MP-ASI\n- **Senam hamil** atau **senam lansia**\n- **Konseling** persiapan persalinan\n- **Edukasi** pencegahan penyakit\n\n#### Waktu Pelaksanaan:\n- **Sore hari** setelah aktivitas harian\n- **Akhir pekan** untuk yang bekerja\n- **Momen khusus** (hari besar kesehatan)\n\n### 🤝 **4. Pendampingan Khusus**\n\n#### Program Pendampingan:\n- **Ibu hamil** menjelang persalinan\n- **Ibu nifas** masa awal\n- **Keluarga** dengan balita gizi buruk\n- **Lansia** dengan komplikasi\n\n#### Bentuk Pendampingan:\n- **Kunjungan rutin** mingguan\n- **Konsultasi via telepon**\n- **Koordinasi** dengan petugas kesehatan\n- **Motivasi** perubahan perilaku\n\n## Waktu Pelaksanaan\n\n### Jadwal Fleksibel\n- **Sesuai kebutuhan** masyarakat\n- **Menyesuaikan** waktu luang keluarga\n- **Koordinasi** dengan petugas kesehatan\n- **Tidak mengganggu** aktivitas utama\n\n### Frekuensi\n- **Kunjungan rutin:** 1-2 kali per minggu\n- **Kasus khusus:** Sesuai kebutuhan\n- **Program khusus:** Mingguan atau bulanan\n- **Gawat darurat:** Kapan saja diperlukan\n\n## Persiapan Pelayanan\n\n### 📋 **Perencanaan**\n1. **Identifikasi** sasaran prioritas\n2. **Jadwalkan** kunjungan dengan keluarga\n3. **Persiapkan** peralatan yang dibutuhkan\n4. **Koordinasi** dengan petugas kesehatan\n5. **Informasikan** ke ketua posyandu\n\n### 🎒 **Perlengkapan yang Dibawa**\n- **Tas kader** dengan perlengkapan dasar\n- **Timbangan** portable (jika diperlukan)\n- **Termometer** digital\n- **Buku catatan** dan alat tulis\n- **Leaflet** edukasi kesehatan\n- **KMS** atau buku KIA\n\n### 📖 **Persiapan Pengetahuan**\n- **Pahami kondisi** sasaran sebelumnya\n- **Siapkan materi** edukasi yang sesuai\n- **Kuasai teknik** konseling dasar\n- **Ketahui prosedur** rujukan\n\n## Dokumentasi dan Pelaporan\n\n### 📝 **Pencatatan yang Diperlukan**\n- **Tanggal** dan **waktu** kunjungan\n- **Identitas** sasaran yang dikunjungi\n- **Keluhan** atau **masalah** yang ditemukan\n- **Tindakan** yang diberikan\n- **Hasil** dan **follow up** yang diperlukan\n- **Rujukan** yang diberikan\n\n### 📊 **Pelaporan**\n- **Laporan mingguan** ke ketua posyandu\n- **Laporan bulanan** ke puskesmas\n- **Laporan khusus** untuk kasus gawat darurat\n- **Dokumentasi foto** jika diperlukan\n\n## Koordinasi dengan Petugas Kesehatan\n\n### 🏥 **Dengan Bidan Desa**\n- **Konsultasi** kasus yang ditemukan\n- **Permintaan** pendampingan kunjungan\n- **Konfirmasi** tindakan yang diberikan\n- **Rujukan** kasus yang memerlukan\n\n### 🏥 **Dengan Puskesmas**\n- **Pelaporan** kegiatan rutin\n- **Konsultasi** kasus sulit\n- **Permintaan** logistik tambahan\n- **Koordinasi** program khusus\n\n## Tantangan dan Solusi\n\n### 🚧 **Tantangan Umum**\n- **Keterbatasan waktu** kader\n- **Jarak tempuh** yang jauh\n- **Cuaca** yang tidak mendukung\n- **Keluarga** yang sulit ditemui\n\n### ✅ **Solusi**\n- **Pembagian tugas** antar kader\n- **Penjadwalan** yang fleksibel\n- **Kerjasama** dengan RT/RW\n- **Komunikasi** via telepon/WA\n- **Kunjungan berkelompok** jika memungkinkan\n\n## Manfaat Pelayanan Diluar Hari Buka\n\n### 👨‍👩‍👧‍👦 **Bagi Masyarakat**\n- **Akses** pelayanan kesehatan lebih mudah\n- **Deteksi dini** masalah kesehatan\n- **Penanganan cepat** kondisi darurat\n- **Edukasi** kesehatan berkelanjutan\n\n### 👥 **Bagi Posyandu**\n- **Cakupan** pelayanan lebih luas\n- **Kualitas** pelayanan meningkat\n- **Hubungan** dengan masyarakat lebih erat\n- **Kredibilitas** posyandu meningkat\n\n## Tips Sukses Pelayanan Diluar Hari Buka\n\n1. **Komunikasi** yang baik dengan keluarga\n2. **Persiapan** yang matang sebelum kunjungan\n3. **Penampilan** yang rapi dan profesional\n4. **Sikap** ramah dan empati tinggi\n5. **Dokumentasi** yang lengkap dan akurat\n6. **Follow up** yang konsisten\n7. **Koordinasi** yang baik dengan tim\n8. **Evaluasi** kegiatan secara berkala",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz1-1",
            question: "Apa yang dimaksud dengan paket pelayanan posyandu?",
            options: [
              "Pelayanan khusus balita",
              "Pelayanan untuk semua kelompok usia",
              "Pelayanan medis saja",
              "Pelayanan administrasi",
            ],
            correctAnswer: 1,
            explanation:
              "Paket pelayanan posyandu mencakup pelayanan komprehensif untuk semua kelompok usia dalam siklus hidup.",
          },
          {
            id: "quiz1-2",
            question: "Manakah yang termasuk sarana utama posyandu?",
            options: [
              "Timbangan dan alat ukur",
              "Komputer canggih",
              "Ambulans",
              "Laboratorium lengkap",
            ],
            correctAnswer: 0,
            explanation:
              "Timbangan dan alat ukur merupakan sarana utama yang harus tersedia di posyandu.",
          },
          {
            id: "quiz1-3",
            question: "Kapan pelayanan diluar hari buka dapat dilakukan?",
            options: [
              "Hanya saat darurat",
              "Sesuai kebutuhan masyarakat",
              "Tidak pernah",
              "Hanya untuk ibu hamil",
            ],
            correctAnswer: 1,
            explanation:
              "Pelayanan diluar hari buka dapat dilakukan sesuai kebutuhan masyarakat dan kondisi tertentu.",
          },
          {
            id: "quiz1-4",
            question: "Berapa jumlah meja dalam sistem pelayanan posyandu?",
            options: ["3 meja", "4 meja", "5 meja", "6 meja"],
            correctAnswer: 2,
            explanation:
              "Sistem pelayanan posyandu menggunakan 5 meja: pendaftaran, penimbangan, pengisian KMS, penyuluhan & pelayanan, dan pelayanan kesehatan.",
          },
          {
            id: "quiz1-5",
            question: "Apa fungsi utama Meja 1 dalam pelayanan posyandu?",
            options: [
              "Penimbangan",
              "Pendaftaran",
              "Penyuluhan",
              "Pemeriksaan kesehatan",
            ],
            correctAnswer: 1,
            explanation:
              "Meja 1 berfungsi untuk pendaftaran peserta posyandu, pencatatan identitas, dan pemberian nomor urut.",
          },
          {
            id: "quiz1-6",
            question: "Siapa yang bertugas di Meja 5 pelayanan posyandu?",
            options: [
              "Kader saja",
              "Bidan/Perawat/Dokter",
              "Masyarakat",
              "Kepala desa",
            ],
            correctAnswer: 1,
            explanation:
              "Meja 5 dikelola oleh tenaga kesehatan profesional seperti bidan, perawat, atau dokter untuk pelayanan kesehatan.",
          },
          {
            id: "quiz1-7",
            question: "Apa yang dimaksud dengan indikator D/S dalam posyandu?",
            options: [
              "Dokter/Suster",
              "Data/Sistem",
              "Balita ditimbang/Balita sasaran",
              "Desa/Sasaran",
            ],
            correctAnswer: 2,
            explanation:
              "D/S adalah rasio balita yang ditimbang dibanding balita sasaran, dengan target minimal 85%.",
          },
          {
            id: "quiz1-8",
            question:
              "Berapa target minimal cakupan D/S yang harus dicapai posyandu?",
            options: ["75%", "80%", "85%", "90%"],
            correctAnswer: 2,
            explanation:
              "Target minimal cakupan D/S (balita ditimbang/balita sasaran) adalah ≥ 85%.",
          },
          {
            id: "quiz1-9",
            question: "Apa kepanjangan dari LILA dalam pengukuran posyandu?",
            options: [
              "Lingkar Lengan Ibu Atas",
              "Lingkar Lengan Atas",
              "Lingkar Lengan Ibu Aktif",
              "Lingkar Lengan Anak",
            ],
            correctAnswer: 1,
            explanation:
              "LILA adalah Lingkar Lengan Atas, digunakan untuk mengukur status gizi ibu hamil dan wanita usia subur.",
          },
          {
            id: "quiz1-10",
            question: "Kapan vitamin A diberikan kepada balita?",
            options: [
              "Setiap bulan",
              "Februari dan Agustus",
              "Januari dan Juli",
              "Setiap 3 bulan",
            ],
            correctAnswer: 1,
            explanation:
              "Vitamin A diberikan kepada balita setiap 6 bulan sekali, yaitu pada bulan Februari dan Agustus.",
          },
        ],
      },
      {
        id: "sub2",
        title: "Pencatatan dan Pelaporan",
        description:
          "Mempelajari sistem pencatatan dan pelaporan posyandu baik manual maupun digital",
        duration: "50 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin2-1",
            title: "Pencatatan dan Pelaporan Manual",
            content:
              "# Pencatatan dan Pelaporan Manual Posyandu\n\n## Pengertian\nPencatatan dan pelaporan manual adalah sistem dokumentasi kegiatan posyandu menggunakan format kertas dan tulisan tangan yang terstruktur sesuai standar yang telah ditetapkan.\n\n## Jenis-Jenis Formulir Pencatatan\n\n### 📋 **1. Kohort Ibu**\n\n#### Fungsi:\n- **Memantau** kesehatan ibu hamil\n- **Mencatat** perkembangan kehamilan\n- **Mendeteksi** risiko kehamilan\n- **Merencanakan** tindak lanjut\n\n#### Isi Kohort Ibu:\n- **Data identitas:** Nama, umur, alamat, suami\n- **Riwayat kehamilan:** HPHT, HPL, gravida, para\n- **Pemeriksaan rutin:** BB, TD, HB, TFU\n- **Imunisasi:** TT1, TT2, TT3, TT4, TT5\n- **Pemberian:** Tablet Fe, PMT\n- **Rujukan:** Tanggal, tempat, alasan\n\n### 👶 **2. Kohort Bayi**\n\n#### Fungsi:\n- **Memantau** pertumbuhan bayi 0-11 bulan\n- **Mencatat** status imunisasi\n- **Mendeteksi** gangguan tumbuh kembang\n- **Merencanakan** intervensi\n\n#### Isi Kohort Bayi:\n- **Data identitas:** Nama, tanggal lahir, jenis kelamin\n- **Data kelahiran:** BB lahir, PB lahir, cara lahir\n- **Pertumbuhan:** BB setiap bulan, status gizi\n- **Imunisasi:** HB0, BCG, DPT-HB-Hib, Polio, Campak\n- **ASI eksklusif:** Status pemberian ASI\n- **Vitamin A:** Pemberian kapsul biru\n\n### 🧒 **3. Kohort Balita**\n\n#### Fungsi:\n- **Memantau** pertumbuhan balita 12-59 bulan\n- **Mencatat** status gizi dan kesehatan\n- **Mendeteksi** masalah tumbuh kembang\n- **Merencanakan** program intervensi\n\n#### Isi Kohort Balita:\n- **Data identitas:** Lengkap dengan orang tua\n- **Pertumbuhan:** BB, TB setiap bulan\n- **Status gizi:** Berdasarkan BB/U, TB/U, BB/TB\n- **Imunisasi lanjutan:** DPT-HB-Hib, Campak\n- **Vitamin A:** Kapsul merah setiap 6 bulan\n- **Stimulasi:** Perkembangan motorik, bahasa\n\n### 👴 **4. Kohort Dewasa dan Lansia**\n\n#### Fungsi:\n- **Pemantauan** kesehatan dewasa dan lansia\n- **Deteksi** Penyakit Tidak Menular (PTM)\n- **Pencatatan** aktivitas olahraga dan gizi\n\n#### Isi Kohort:\n- **Data identitas:** Nama, umur, pekerjaan\n- **Pemeriksaan:** BB, TB, IMT, TD, gula darah\n- **Riwayat penyakit:** Hipertensi, DM, jantung\n- **Aktivitas:** Senam lansia, penyuluhan\n- **Rujukan:** Ke puskesmas atau RS\n\n## Buku Register dan Formulir Pendukung\n\n### 📚 **1. Buku Register Kegiatan Posyandu**\n\n#### Isi Register:\n- **Tanggal kegiatan** posyandu\n- **Jumlah peserta** per kelompok umur\n- **Jumlah kader** yang hadir\n- **Petugas kesehatan** yang hadir\n- **Kegiatan** yang dilaksanakan\n- **Masalah** yang ditemukan\n- **Tindak lanjut** yang dilakukan\n\n### 📝 **2. Kartu Menuju Sehat (KMS)**\n\n#### Fungsi KMS:\n- **Alat bantu** untuk memantau pertumbuhan\n- **Media edukasi** untuk orang tua\n- **Deteksi dini** gangguan pertumbuhan\n- **Komunikasi** antar petugas kesehatan\n\n#### Cara Pengisian KMS:\n1. **Isi identitas** lengkap anak\n2. **Plot titik** BB sesuai umur\n3. **Hubungkan titik** dengan garis\n4. **Interpretasi** grafik pertumbuhan\n5. **Beri konseling** sesuai hasil\n\n### 📖 **3. Buku KIA (Kesehatan Ibu dan Anak)**\n\n#### Fungsi:\n- **Catatan kesehatan** ibu dan anak\n- **Panduan** perawatan mandiri\n- **Komunikasi** dengan petugas kesehatan\n- **Rujukan** ke fasilitas lain\n\n## Teknik Pencatatan yang Benar\n\n### ✏️ **Prinsip Pencatatan**\n\n1. **Akurat:** Sesuai dengan kondisi sebenarnya\n2. **Lengkap:** Semua data yang diperlukan terisi\n3. **Jelas:** Tulisan dapat dibaca dengan mudah\n4. **Konsisten:** Format sama di setiap pencatatan\n5. **Tepat waktu:** Dicatat segera setelah pelayanan\n\n### 📋 **Langkah-Langkah Pencatatan**\n\n1. **Persiapkan** formulir yang diperlukan\n2. **Isi identitas** peserta dengan lengkap\n3. **Catat hasil** pemeriksaan dengan teliti\n4. **Interpretasi** hasil sesuai standar\n5. **Rencanakan** tindak lanjut\n6. **Dokumentasikan** dalam register\n\n### ❌ **Kesalahan yang Harus Dihindari**\n\n- **Tulisan tidak jelas** atau sulit dibaca\n- **Data tidak lengkap** atau terlewat\n- **Salah interpretasi** hasil pemeriksaan\n- **Tidak konsisten** dalam format\n- **Terlambat** dalam pencatatan\n- **Tidak ada tindak lanjut** yang jelas\n\n## Sistem Pelaporan Manual\n\n### 📊 **1. Laporan Bulanan Posyandu**\n\n#### Isi Laporan:\n- **Jumlah sasaran** per kelompok umur\n- **Jumlah yang hadir** dalam kegiatan\n- **Cakupan pelayanan** (D/S, K/S)\n- **Masalah kesehatan** yang ditemukan\n- **Tindak lanjut** yang dilakukan\n- **Kebutuhan** logistik dan SDM\n\n#### Tujuan:\n- **Evaluasi** kinerja posyandu\n- **Perencanaan** kegiatan berikutnya\n- **Pengambilan keputusan** program\n- **Koordinasi** dengan puskesmas\n\n### 📈 **2. Laporan Triwulan**\n\n#### Analisis 3 Bulanan:\n- **Trend** pertumbuhan balita\n- **Cakupan** imunisasi\n- **Masalah gizi** yang persisten\n- **Efektivitas** program yang berjalan\n\n### 📅 **3. Laporan Tahunan**\n\n#### Evaluasi Tahunan:\n- **Pencapaian** target program\n- **Analisis** masalah kesehatan\n- **Rekomendasi** perbaikan program\n- **Rencana kerja** tahun berikutnya\n\n## Penyimpanan dan Arsip\n\n### 🗂️ **Sistem Filing**\n\n1. **Kohort aktif:** Disimpan terpisah dan mudah diakses\n2. **Kohort selesai:** Diarsipkan berdasarkan tahun\n3. **Register:** Disimpan kronologis per tahun\n4. **Laporan:** Disimpan per periode pelaporan\n\n### 🔒 **Keamanan Data**\n\n- **Simpan** di tempat aman dan kering\n- **Lindungi** dari air, api, dan serangga\n- **Batasi akses** hanya untuk petugas\n- **Buat backup** untuk data penting\n- **Jaga kerahasiaan** data peserta\n\n### ⏰ **Retensi Data**\n\n- **Data aktif:** Selama masih dalam program\n- **Data historis:** Minimal 5 tahun\n- **Laporan:** Disimpan permanen\n- **Backup:** Dibuat setiap bulan\n\n## Quality Control Pencatatan\n\n### ✅ **Supervisi dan Monitoring**\n\n1. **Cek kelengkapan** data setiap hari buka\n2. **Validasi** data dengan pemeriksaan ulang\n3. **Koreksi** kesalahan segera setelah ditemukan\n4. **Review** bulanan oleh supervisor\n5. **Evaluasi** sistem pencatatan berkala\n\n### 📊 **Indikator Kualitas**\n\n- **Kelengkapan:** ≥ 95% data terisi lengkap\n- **Akurasi:** ≥ 90% data sesuai standar\n- **Ketepatan waktu:** 100% laporan tepat waktu\n- **Konsistensi:** Format seragam semua formulir\n\n## Tips Pencatatan Manual yang Efektif\n\n1. **Gunakan** pena dengan tinta yang tidak mudah luntur\n2. **Tulis** dengan jelas dan rapi\n3. **Jangan** menggunakan tip-ex, gunakan coret dan paraf\n4. **Backup** data penting dengan fotokopi\n5. **Latih** kader secara berkala\n6. **Buat** checklist untuk memastikan kelengkapan\n7. **Review** data sebelum diserahkan\n8. **Koordinasi** dengan petugas untuk validasi data",
            duration: "25 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-2",
            title: "Pencatatan dan Pelaporan Digital",
            content:
              "# Pencatatan dan Pelaporan Digital Posyandu\n\n## Pengertian\nPencatatan dan pelaporan digital adalah sistem dokumentasi kegiatan posyandu menggunakan teknologi informasi seperti aplikasi mobile, web, atau software khusus untuk memudahkan pengolahan data dan pelaporan.\n\n## Keunggulan Sistem Digital\n\n### ⚡ **Efisiensi dan Kecepatan**\n- **Input data** lebih cepat dengan template otomatis\n- **Perhitungan** status gizi otomatis\n- **Grafik pertumbuhan** dibuat secara real-time\n- **Laporan** dapat dihasilkan instant\n- **Pencarian data** lebih mudah dan cepat\n\n### 📊 **Akurasi dan Konsistensi**\n- **Validasi data** otomatis mengurangi error\n- **Format** seragam di semua entry\n- **Perhitungan** standar WHO/Kemenkes otomatis\n- **Cross-check** data antar periode\n- **Alert** untuk data yang tidak normal\n\n### 💾 **Penyimpanan dan Backup**\n- **Cloud storage** aman dan terpusat\n- **Backup otomatis** mencegah kehilangan data\n- **Akses multi-device** (HP, tablet, laptop)\n- **Sinkronisasi** real-time antar perangkat\n- **Kapasitas** penyimpanan tidak terbatas\n\n### 📈 **Analisis dan Reporting**\n- **Dashboard** visual dengan grafik dan chart\n- **Trend analysis** pertumbuhan balita\n- **Early warning system** untuk kasus berisiko\n- **Report generator** otomatis\n- **Export** ke berbagai format (PDF, Excel)\n\n## Jenis Aplikasi Digital Posyandu\n\n### 📱 **1. Aplikasi Mobile (Android/iOS)**\n\n#### Contoh Aplikasi:\n- **e-PPGBM** (electronic Pencatatan dan Pelaporan Gizi Berbasis Masyarakat)\n- **Posyandu Digital** by Kemenkes\n- **SATUSEHAT** platform integrasi\n- **Aplikasi lokal** yang dikembangkan daerah\n\n#### Fitur Utama:\n- **Offline capability** untuk daerah sinyal lemah\n- **Camera integration** untuk foto dan barcode\n- **GPS tracking** lokasi posyandu\n- **Push notification** reminder kegiatan\n- **Multi-user** dengan role management\n\n### 💻 **2. Sistem Web-Based**\n\n#### Keunggulan:\n- **Akses** dari browser tanpa install aplikasi\n- **Responsive design** untuk berbagai perangkat\n- **User management** terpusat\n- **Data sharing** antar posyandu lebih mudah\n- **Integration** dengan sistem lain (PUSKESMAS, DINKES)\n\n### 📊 **3. Software Desktop**\n\n#### Karakteristik:\n- **Performa** lebih stabil untuk data besar\n- **Fitur lengkap** untuk analisis mendalam\n- **Customization** sesuai kebutuhan lokal\n- **Security** lebih terkontrol\n\n## Implementasi Sistem Digital\n\n### 🚀 **Tahap Persiapan**\n\n#### 1. **Assessment Kebutuhan**\n- **Evaluasi** sistem manual yang ada\n- **Identifikasi** kebutuhan spesifik posyandu\n- **Analisis** kapasitas SDM dan infrastruktur\n- **Penentuan** budget dan timeline\n\n#### 2. **Pemilihan Platform**\n- **Bandingkan** berbagai aplikasi yang tersedia\n- **Trial** aplikasi pilihan selama 1-2 bulan\n- **Evaluasi** kemudahan penggunaan\n- **Pertimbangkan** cost dan maintenance\n\n#### 3. **Persiapan Infrastruktur**\n- **Smartphone/tablet** untuk kader\n- **Internet connection** yang stabil\n- **Power bank** untuk backup power\n- **Protective case** untuk perangkat\n\n### 👨‍🏫 **Tahap Pelatihan**\n\n#### 1. **Pelatihan Kader**\n- **Basic digital literacy** untuk kader senior\n- **Hands-on training** menggunakan aplikasi\n- **Practice session** dengan data dummy\n- **Troubleshooting** masalah umum\n\n#### 2. **Train the Trainer**\n- **Super user** di setiap posyandu\n- **Peer mentoring** sistem buddy\n- **Regular refresher** training\n- **Update** fitur dan sistem baru\n\n### 🔄 **Tahap Transisi**\n\n#### 1. **Parallel Running**\n- **Dual system** (manual + digital) selama 3 bulan\n- **Cross-check** data untuk validasi\n- **Gradual migration** data historis\n- **Issue tracking** dan resolution\n\n#### 2. **Full Migration**\n- **Go-live** sistem digital penuh\n- **Monitoring intensif** minggu pertama\n- **Support** 24/7 selama bulan pertama\n- **Evaluation** dan penyesuaian\n\n## Fitur-Fitur Utama Aplikasi Digital\n\n### 👥 **1. Manajemen Data Peserta**\n\n#### Registrasi:\n- **Form registrasi** digital dengan validasi\n- **Photo capture** untuk identifikasi\n- **QR code** generation untuk ID unik\n- **Family linking** untuk hubungan keluarga\n\n#### Profil Lengkap:\n- **Demographic data** lengkap\n- **Medical history** dan riwayat kesehatan\n- **Contact information** dengan geolocation\n- **Emergency contact** dan rujukan\n\n### 📏 **2. Input Data Pengukuran**\n\n#### Anthropometry:\n- **Weight input** dengan validasi range\n- **Height measurement** otomatis calculate Z-score\n- **MUAC** untuk deteksi malnutrisi\n- **Head circumference** untuk bayi\n\n#### Vital Signs:\n- **Blood pressure** dengan interpretation\n- **Temperature** dengan fever alert\n- **Heart rate** dan respiratory rate\n- **Blood glucose** untuk lansia\n\n### 💉 **3. Tracking Imunisasi**\n\n#### Schedule Management:\n- **Immunization calendar** personal\n- **Due date** notification dan reminder\n- **Catch-up** schedule untuk yang terlambat\n- **Contraindication** checking\n\n#### Documentation:\n- **Batch number** dan expiry date vaccine\n- **Adverse event** reporting\n- **Certificate** generation otomatis\n- **Integration** dengan sistem nasional\n\n### 📊 **4. Growth Monitoring**\n\n#### Real-time Analysis:\n- **Growth chart** otomatis dengan WHO standard\n- **Z-score calculation** dan interpretation\n- **Trend analysis** dengan predictive modeling\n- **Alert system** untuk growth faltering\n\n#### Visualization:\n- **Interactive charts** dengan zoom dan filter\n- **Comparison** dengan standar populasi\n- **Progress tracking** dari waktu ke waktu\n- **Parent-friendly** interpretation\n\n## Integrasi dengan Sistem Lain\n\n### 🏥 **1. Sistem Puskesmas**\n\n#### Data Sharing:\n- **Real-time sync** data posyandu ke puskesmas\n- **Referral system** elektronik\n- **Follow-up tracking** pasien rujukan\n- **Resource sharing** (jadwal dokter, obat)\n\n### 🏛️ **2. Sistem Dinas Kesehatan**\n\n#### Reporting Otomatis:\n- **Laporan bulanan** generate otomatis\n- **Dashboard** real-time untuk monitoring\n- **Early warning** sistem untuk outbreak\n- **Resource allocation** berdasarkan data\n\n### 🌐 **3. Platform Nasional**\n\n#### SATUSEHAT Integration:\n- **Interoperability** dengan standar nasional\n- **Single ID** untuk pasien di seluruh Indonesia\n- **Data portability** antar fasilitas kesehatan\n- **National surveillance** system\n\n## Keamanan Data Digital\n\n### 🔐 **Data Protection**\n\n#### Encryption:\n- **End-to-end encryption** untuk transmisi data\n- **Database encryption** untuk storage\n- **Password protection** dengan complexity requirement\n- **Two-factor authentication** untuk admin\n\n#### Access Control:\n- **Role-based** access management\n- **Audit trail** untuk tracking user activity\n- **Session management** dengan auto-logout\n- **IP whitelisting** untuk akses admin\n\n### 🛡️ **Privacy Compliance**\n\n#### Regulatory:\n- **GDPR compliance** untuk data protection\n- **Healthcare regulations** (HIPAA equivalent)\n- **Consent management** untuk penggunaan data\n- **Right to be forgotten** implementation\n\n## Tantangan dan Solusi\n\n### ⚠️ **Tantangan Umum**\n\n1. **Digital Divide:**\n   - Kader senior kurang familiar teknologi\n   - **Solusi:** Pelatihan bertahap dan mentoring\n\n2. **Infrastructure:**\n   - Internet tidak stabil di daerah terpencil\n   - **Solusi:** Offline capability dan sync otomatis\n\n3. **Cost:**\n   - Investment awal untuk perangkat dan training\n   - **Solusi:** ROI calculation dan phased implementation\n\n4. **Data Quality:**\n   - Input error karena tidak terbiasa\n   - **Solusi:** Validation rules dan quality control\n\n### ✅ **Best Practices**\n\n1. **Start Small:** Pilot project di 1-2 posyandu dulu\n2. **User-Centric:** Design sesuai kebutuhan end-user\n3. **Continuous Training:** Regular update dan refresher\n4. **Change Management:** Komunikasi benefit ke semua stakeholder\n5. **Support System:** Helpdesk dan technical support siap\n\n## Monitoring dan Evaluasi\n\n### 📈 **Key Performance Indicators**\n\n#### Usage Metrics:\n- **User adoption rate** (% kader yang aktif)\n- **Data completeness** (% field yang terisi)\n- **System uptime** dan reliability\n- **Response time** aplikasi\n\n#### Quality Metrics:\n- **Data accuracy** dibanding manual\n- **Error rate** dalam input data\n- **Timely reporting** rate\n- **User satisfaction** score\n\n### 🔄 **Continuous Improvement**\n\n1. **Regular feedback** dari user\n2. **System updates** dan bug fixes\n3. **Feature enhancement** berdasarkan kebutuhan\n4. **Performance optimization** secara berkala\n5. **Training update** sesuai sistem terbaru\n\n## Masa Depan Digital Posyandu\n\n### 🚀 **Emerging Technologies**\n\n#### AI dan Machine Learning:\n- **Predictive analytics** untuk early warning\n- **Image recognition** untuk assessment gizi\n- **Chatbot** untuk konseling otomatis\n- **Pattern recognition** untuk outbreak detection\n\n#### IoT Integration:\n- **Smart scales** dengan auto-sync\n- **Wearable devices** untuk continuous monitoring\n- **Environmental sensors** untuk health determinants\n- **Telemedicine** integration\n\n### 🌟 **Vision 2030**\n\n- **Fully integrated** ecosystem kesehatan\n- **Real-time** national health surveillance\n- **Personalized** health recommendations\n- **Community-driven** health improvement\n- **Evidence-based** policy making\n\nTransformasi digital posyandu bukan hanya tentang teknologi, tetapi juga tentang **pemberdayaan masyarakat** dalam mengelola kesehatan mereka sendiri dengan **data yang akurat** dan **akses informasi** yang lebih baik.",
            duration: "25 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz2-1",
            question: "Apa keuntungan pencatatan digital dibandingkan manual?",
            options: [
              "Lebih mudah hilang",
              "Lebih cepat dan akurat",
              "Lebih mahal",
              "Tidak ada perbedaan",
            ],
            correctAnswer: 1,
            explanation:
              "Pencatatan digital lebih cepat, akurat, dan memudahkan analisis data serta pelaporan.",
          },
          {
            id: "quiz2-2",
            question: "Mengapa pencatatan manual masih penting?",
            options: [
              "Sebagai backup data",
              "Lebih mudah digunakan",
              "Tidak memerlukan listrik",
              "Semua jawaban benar",
            ],
            correctAnswer: 3,
            explanation:
              "Pencatatan manual penting sebagai backup, mudah digunakan, dan tidak bergantung pada listrik.",
          },
          {
            id: "quiz2-3",
            question: "Berapa sering pelaporan posyandu harus dilakukan?",
            options: [
              "Setiap minggu",
              "Setiap bulan",
              "Setiap 3 bulan",
              "Setiap tahun",
            ],
            correctAnswer: 1,
            explanation:
              "Pelaporan posyandu dilakukan setiap bulan untuk memantau perkembangan program.",
          },
          {
            id: "quiz2-4",
            question:
              "Apa fungsi utama dari Kohort Ibu dalam pencatatan posyandu?",
            options: [
              "Mencatat data balita",
              "Memantau kesehatan ibu hamil",
              "Mencatat data lansia",
              "Memantau kegiatan kader",
            ],
            correctAnswer: 1,
            explanation:
              "Kohort Ibu berfungsi untuk memantau kesehatan ibu hamil, mencatat perkembangan kehamilan, dan mendeteksi risiko kehamilan.",
          },
          {
            id: "quiz2-5",
            question: "Apa kepanjangan dari KMS dalam pencatatan posyandu?",
            options: [
              "Kartu Menuju Sukses",
              "Kartu Menuju Sehat",
              "Kartu Medis Sederhana",
              "Kartu Monitoring Sasaran",
            ],
            correctAnswer: 1,
            explanation:
              "KMS adalah Kartu Menuju Sehat, digunakan untuk memantau pertumbuhan anak dan sebagai media edukasi orang tua.",
          },
          {
            id: "quiz2-6",
            question: "Berapa lama minimal data posyandu harus disimpan?",
            options: ["1 tahun", "3 tahun", "5 tahun", "10 tahun"],
            correctAnswer: 2,
            explanation:
              "Data historis posyandu harus disimpan minimal 5 tahun untuk keperluan analisis dan rujukan.",
          },
          {
            id: "quiz2-7",
            question:
              "Apa keunggulan aplikasi e-PPGBM dalam pencatatan digital?",
            options: [
              "Hanya bisa online",
              "Offline capability untuk daerah sinyal lemah",
              "Hanya untuk balita",
              "Tidak bisa backup data",
            ],
            correctAnswer: 1,
            explanation:
              "e-PPGBM memiliki fitur offline capability yang memungkinkan penggunaan di daerah dengan sinyal internet lemah.",
          },
          {
            id: "quiz2-8",
            question:
              "Apa yang dimaksud dengan Cross-check data dalam sistem digital?",
            options: [
              "Menghapus data lama",
              "Memvalidasi data antar periode",
              "Mengubah format data",
              "Mengirim data ke pusat",
            ],
            correctAnswer: 1,
            explanation:
              "Cross-check data adalah proses memvalidasi dan membandingkan data antar periode untuk memastikan konsistensi dan akurasi.",
          },
          {
            id: "quiz2-9",
            question:
              "Berapa target kelengkapan data yang harus dicapai dalam pencatatan?",
            options: ["≥ 85%", "≥ 90%", "≥ 95%", "100%"],
            correctAnswer: 2,
            explanation:
              "Target kelengkapan data dalam pencatatan posyandu adalah ≥ 95% dari semua field yang harus diisi.",
          },
          {
            id: "quiz2-10",
            question:
              "Apa yang harus dilakukan jika terjadi kesalahan dalam pencatatan manual?",
            options: [
              "Dihapus dengan tip-ex",
              "Dicoret dan diparaf",
              "Diabaikan saja",
              "Diganti kertas baru",
            ],
            correctAnswer: 1,
            explanation:
              "Kesalahan dalam pencatatan manual harus dicoret dengan rapi dan diberi paraf, tidak boleh menggunakan tip-ex.",
          },
        ],
      },
      {
        id: "sub3",
        title: "Kunjungan Rumah",
        description:
          "Memahami konsep, pelaksanaan, dan tindak lanjut kunjungan rumah oleh kader posyandu",
        duration: "55 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin3-1",
            title: "Pengertian, Sasaran, Tujuan",
            content:
              "# Kunjungan Rumah Posyandu: Pengertian, Sasaran, dan Tujuan\n\n## 🏠 Pengertian Kunjungan Rumah\n\nKunjungan rumah adalah **kegiatan pelayanan kesehatan** yang dilakukan oleh kader posyandu dengan **mendatangi langsung** rumah atau tempat tinggal sasaran untuk memberikan **pelayanan kesehatan dasar**, **konseling**, **edukasi**, dan **pemantauan kesehatan** secara personal dan berkelanjutan.\n\n### Karakteristik Kunjungan Rumah:\n- **Personal approach:** Pelayanan individual sesuai kebutuhan\n- **Comprehensive care:** Pelayanan menyeluruh tidak hanya fisik\n- **Family-centered:** Melibatkan seluruh anggota keluarga\n- **Continuous:** Dilakukan secara berkelanjutan dan terjadwal\n- **Preventive & promotive:** Fokus pada pencegahan dan promosi kesehatan\n\n### Perbedaan dengan Pelayanan Posyandu Reguler:\n\n| **Aspek** | **Posyandu Reguler** | **Kunjungan Rumah** |\n|-----------|---------------------|--------------------|\n| **Lokasi** | Gedung/tempat posyandu | Rumah sasaran |\n| **Waktu** | Jadwal tetap bulanan | Fleksibel sesuai kebutuhan |\n| **Peserta** | Massal/kelompok | Individual/keluarga |\n| **Fokus** | Layanan umum | Masalah spesifik |\n| **Durasi** | 3-4 jam per sesi | 30-60 menit per kunjungan |\n\n## 🎯 Sasaran Kunjungan Rumah\n\n### **1. Sasaran Prioritas Utama**\n\n#### 🤱 **Ibu Hamil Risiko Tinggi**\n- **Usia < 20 tahun atau > 35 tahun**\n- **Tinggi badan < 145 cm**\n- **LILA < 23,5 cm** (Kurang Energi Kronis)\n- **Riwayat** keguguran, persalinan sulit, atau kematian bayi\n- **Penyakit penyerta:** Hipertensi, diabetes, jantung\n- **Kehamilan kembar** atau kelainan letak janin\n- **Tidak rutin** periksa kehamilan (ANC)\n\n#### 👶 **Bayi Baru Lahir (0-28 hari)**\n- **Semua bayi baru lahir** minimal 3 kali kunjungan\n- **Bayi prematur** atau BBLR (< 2500 gram)\n- **Bayi dengan** kelainan bawaan\n- **Ibu** yang mengalami kesulitan menyusui\n- **Tidak imunisasi** sesuai jadwal\n\n#### 🧒 **Balita dengan Masalah Khusus**\n- **Gizi buruk** atau gizi kurang\n- **Stunting** (pendek atau sangat pendek)\n- **Gangguan tumbuh kembang**\n- **Penyakit kronis** (TBC, HIV, kelainan jantung)\n- **Tidak rutin** datang ke posyandu (defaulter)\n- **Keluarga miskin** dengan akses terbatas\n\n#### 👴 **Lansia dengan Kondisi Khusus**\n- **Penyakit tidak menular:** Hipertensi, diabetes, stroke\n- **Disabilitas** atau keterbatasan mobilitas\n- **Tinggal sendiri** tanpa pendamping\n- **Riwayat** rawat inap berulang\n- **Depresi** atau masalah kesehatan mental\n\n### **2. Sasaran Sekunder**\n\n#### 👨‍👩‍👧‍👦 **Keluarga Berisiko**\n- **Keluarga miskin** dengan banyak masalah kesehatan\n- **Lingkungan** tidak sehat (sanitasi buruk)\n- **Akses** sulit ke fasilitas kesehatan\n- **Pengetahuan** kesehatan rendah\n- **Dukungan sosial** kurang\n\n#### 🏘️ **Masyarakat Khusus**\n- **Daerah terpencil** dengan akses terbatas\n- **Komunitas** dengan budaya kesehatan khusus\n- **Area** dengan masalah kesehatan spesifik\n- **Kelompok** rentan secara sosial ekonomi\n\n## 🎯 Tujuan Kunjungan Rumah\n\n### **1. Tujuan Umum**\n\n**Meningkatkan derajat kesehatan masyarakat** melalui pelayanan kesehatan yang **mudah diakses**, **berkualitas**, dan **berkelanjutan** di tingkat keluarga dan individu.\n\n### **2. Tujuan Khusus**\n\n#### 🔍 **Deteksi Dini dan Pencegahan**\n- **Identifikasi** masalah kesehatan sejak dini\n- **Screening** penyakit yang dapat dicegah\n- **Deteksi** faktor risiko kesehatan keluarga\n- **Pencegahan** komplikasi penyakit kronis\n- **Monitoring** kondisi kesehatan berkelanjutan\n\n#### 🎓 **Edukasi dan Promosi Kesehatan**\n- **Meningkatkan** pengetahuan kesehatan keluarga\n- **Mengubah** perilaku hidup sehat\n- **Mempromosikan** pola hidup bersih dan sehat (PHBS)\n- **Edukasi** gizi seimbang dan pola makan sehat\n- **Konseling** kesehatan reproduksi dan KB\n\n#### 🤝 **Konseling dan Dukungan Psikososial**\n- **Memberikan** dukungan emosional\n- **Konseling** untuk masalah kesehatan mental\n- **Motivasi** perubahan perilaku sehat\n- **Dukungan** untuk kepatuhan pengobatan\n- **Fasilitasi** akses ke layanan kesehatan\n\n#### 📊 **Pemantauan dan Evaluasi**\n- **Monitoring** perkembangan kondisi kesehatan\n- **Evaluasi** efektivitas intervensi yang diberikan\n- **Follow-up** hasil rujukan dari fasilitas kesehatan\n- **Tracking** pencapaian target kesehatan individu\n- **Dokumentasi** perubahan status kesehatan\n\n#### 🔗 **Koordinasi dan Rujukan**\n- **Menjalin** kerjasama dengan petugas kesehatan\n- **Koordinasi** dengan sektor terkait (sosial, pendidikan)\n- **Fasilitasi** rujukan ke fasilitas kesehatan\n- **Follow-up** hasil rujukan dan pengobatan\n- **Networking** dengan sumber daya komunitas\n\n### **3. Tujuan Berdasarkan Kelompok Sasaran**\n\n#### 🤱 **Untuk Ibu Hamil:**\n- **Memastikan** ANC minimal 4 kali selama kehamilan\n- **Deteksi** komplikasi kehamilan sejak dini\n- **Edukasi** persiapan persalinan dan nifas\n- **Konseling** gizi ibu hamil dan suplementasi\n- **Dukungan** psikososial selama kehamilan\n\n#### 👶 **Untuk Bayi dan Balita:**\n- **Monitoring** pertumbuhan dan perkembangan optimal\n- **Memastikan** kelengkapan imunisasi dasar\n- **Promosi** ASI eksklusif dan MP-ASI berkualitas\n- **Deteksi** gangguan tumbuh kembang\n- **Edukasi** stimulasi tumbuh kembang anak\n\n#### 👴 **Untuk Lansia:**\n- **Kontrol** penyakit tidak menular (hipertensi, DM)\n- **Pencegahan** komplikasi dan disabilitas\n- **Promosi** aktivitas fisik dan gizi seimbang\n- **Dukungan** kesehatan mental dan sosial\n- **Edukasi** manajemen penyakit kronis\n\n## 📈 Manfaat Kunjungan Rumah\n\n### **Untuk Individu dan Keluarga:**\n- **Akses** pelayanan kesehatan lebih mudah\n- **Pelayanan** personal sesuai kebutuhan spesifik\n- **Deteksi dini** masalah kesehatan\n- **Pengetahuan** kesehatan meningkat\n- **Dukungan** kontinyu dari kader kesehatan\n- **Biaya** lebih efisien (tidak perlu transport)\n\n### **Untuk Posyandu:**\n- **Cakupan** pelayanan lebih luas\n- **Kualitas** pelayanan meningkat\n- **Data** kesehatan masyarakat lebih lengkap\n- **Deteksi** masalah kesehatan lebih cepat\n- **Hubungan** dengan masyarakat lebih erat\n- **Credibility** posyandu di mata masyarakat\n\n### **Untuk Sistem Kesehatan:**\n- **Early intervention** mengurangi biaya pengobatan\n- **Preventive care** mengurangi beban pelayanan kuratif\n- **Community engagement** dalam program kesehatan\n- **Data surveillance** kesehatan masyarakat\n- **Equity** akses pelayanan kesehatan\n\n## 🎯 Indikator Keberhasilan\n\n### **Indikator Output:**\n- **Jumlah** kunjungan rumah per bulan\n- **Coverage** sasaran prioritas yang dikunjungi\n- **Frekuensi** kunjungan sesuai standar\n- **Kelengkapan** dokumentasi kunjungan\n\n### **Indikator Outcome:**\n- **Peningkatan** pengetahuan kesehatan keluarga\n- **Perubahan** perilaku hidup sehat\n- **Deteksi dini** masalah kesehatan meningkat\n- **Kepatuhan** berobat dan kontrol rutin\n- **Kepuasan** masyarakat terhadap pelayanan\n\n### **Indikator Impact:**\n- **Penurunan** angka kesakitan dan kematian\n- **Peningkatan** status gizi masyarakat\n- **Penurunan** angka rujukan emergency\n- **Peningkatan** cakupan program kesehatan\n- **Perbaikan** indikator kesehatan komunitas\n\n## 🎯 Target dan Standar Kunjungan\n\n### **Frekuensi Kunjungan Minimal:**\n\n| **Sasaran** | **Frekuensi** | **Durasi Program** |\n|-------------|---------------|-----------------|\n| **Ibu Hamil Risti** | 1x/bulan | Selama kehamilan |\n| **Bayi Baru Lahir** | 3x (hari 1-3, 4-7, 8-28) | 1 bulan pertama |\n| **Balita Gizi Buruk** | 2x/bulan | Sampai status gizi normal |\n| **Lansia Penyakit Kronis** | 1x/bulan | Berkelanjutan |\n| **Follow-up Rujukan** | Sesuai kebutuhan | Sampai masalah teratasi |\n\n### **Durasi Kunjungan:**\n- **Kunjungan rutin:** 30-45 menit\n- **Kunjungan konseling:** 45-60 menit\n- **Kunjungan emergency:** Sesuai kebutuhan\n- **Kunjungan follow-up:** 20-30 menit\n\nKunjungan rumah merupakan **ujung tombak** pelayanan kesehatan masyarakat yang membawa **pelayanan kesehatan** langsung ke **pintu rumah** masyarakat, menjadikannya **accessible**, **acceptable**, dan **sustainable** untuk semua lapisan masyarakat.",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-2",
            title: "Pelaksanaan atau Alur Kunjungan Rumah",
            content:
              '# Pelaksanaan dan Alur Kunjungan Rumah Posyandu\n\n## 🗓️ Tahap Perencanaan Kunjungan\n\n### **1. Identifikasi dan Prioritas Sasaran**\n\n#### 📋 **Mapping Sasaran:**\n- **Review data** posyandu untuk identifikasi sasaran prioritas\n- **Buat daftar** sasaran berdasarkan tingkat risiko:\n  - **Prioritas 1:** Risiko tinggi (ibu hamil risti, bayi baru lahir)\n  - **Prioritas 2:** Risiko sedang (balita defaulter, lansia sakit)\n  - **Prioritas 3:** Risiko rendah (keluarga sehat untuk promosi)\n\n#### 🗺️ **Pemetaan Wilayah:**\n- **Buat peta** wilayah kerja posyandu\n- **Tandai lokasi** rumah sasaran prioritas\n- **Tentukan rute** kunjungan yang efisien\n- **Identifikasi** hambatan geografis (jalan rusak, jembatan)\n\n### **2. Penjadwalan Kunjungan**\n\n#### 📅 **Pembuatan Jadwal:**\n- **Koordinasi** dengan keluarga sasaran\n- **Sesuaikan** dengan waktu luang keluarga\n- **Pertimbangkan** kondisi cuaca dan aksesibilitas\n- **Bagi tugas** antar kader jika sasaran banyak\n\n#### ⏰ **Waktu Optimal Kunjungan:**\n- **Pagi hari (08.00-10.00):** Untuk ibu hamil dan balita\n- **Siang hari (13.00-15.00):** Untuk lansia\n- **Sore hari (16.00-18.00):** Untuk keluarga yang bekerja\n- **Akhir pekan:** Untuk keluarga dengan jadwal padat\n\n### **3. Persiapan Kunjungan**\n\n#### 🎒 **Perlengkapan yang Dibawa:**\n\n**Peralatan Dasar:**\n- **Tas kader** dengan logo posyandu\n- **Timbangan bayi** portable (jika diperlukan)\n- **Timbangan** dewasa portable\n- **Pita pengukur** LILA dan tinggi badan\n- **Termometer** digital\n- **Tensimeter** digital sederhana\n- **Senter** kecil untuk pemeriksaan\n\n**Dokumen dan Formulir:**\n- **Kartu identitas** kader posyandu\n- **Buku register** kunjungan rumah\n- **KMS** atau buku KIA sasaran\n- **Formulir** pencatatan kunjungan\n- **Leaflet** dan poster edukasi\n- **Buku** panduan konseling\n\n**Perlengkapan Tambahan:**\n- **Hand sanitizer** dan masker\n- **Pulpen** dan kertas tambahan\n- **Kamera** atau HP untuk dokumentasi\n- **Hadiah kecil** untuk motivasi (stiker, pensil)\n\n#### 📚 **Persiapan Pengetahuan:**\n- **Review** data dan riwayat kesehatan sasaran\n- **Siapkan** materi edukasi yang sesuai kondisi\n- **Pahami** masalah kesehatan yang mungkin ditemui\n- **Siapkan** strategi komunikasi dan konseling\n\n## 🚶‍♀️ Tahap Pelaksanaan Kunjungan\n\n### **1. Fase Pembukaan (5-10 menit)**\n\n#### 🤝 **Salam dan Perkenalan:**\n```\n"Selamat pagi/siang Bu/Pak. Saya [nama], kader posyandu [nama posyandu]. \nSaya datang untuk kunjungan rutin kesehatan keluarga. \nApakah ibu/bapak ada waktu untuk berbincang sebentar?"\n```\n\n#### 🏠 **Meminta Izin:**\n- **Jelaskan** tujuan kunjungan dengan ramah\n- **Minta izin** untuk masuk dan melakukan pemeriksaan\n- **Tanyakan** waktu yang tersedia untuk kunjungan\n- **Pastikan** suasana nyaman untuk berbincang\n\n#### 📝 **Konfirmasi Data:**\n- **Cek ulang** identitas sasaran\n- **Konfirmasi** data keluarga yang sudah ada\n- **Update** informasi terbaru jika ada perubahan\n\n### **2. Fase Assessment (15-20 menit)**\n\n#### 🔍 **Anamnesis (Wawancara):**\n\n**Pertanyaan Pembuka:**\n- "Bagaimana kabar kesehatan keluarga hari ini?"\n- "Apakah ada keluhan kesehatan yang dirasakan?"\n- "Bagaimana nafsu makan dan tidur anak/ibu?"\n\n**Pertanyaan Spesifik berdasarkan Sasaran:**\n\n**Untuk Ibu Hamil:**\n- "Bagaimana kondisi kehamilan ibu?"\n- "Apakah rutin minum tablet tambah darah?"\n- "Sudah berapa kali periksa ke bidan/dokter?"\n- "Apakah ada keluhan mual, pusing, atau bengkak?"\n\n**Untuk Balita:**\n- "Bagaimana nafsu makan anak?"\n- "Apakah anak aktif bermain seperti biasa?"\n- "Sudah imunisasi apa saja yang diterima?"\n- "Bagaimana pertumbuhan anak menurut ibu?"\n\n**Untuk Lansia:**\n- "Bagaimana kondisi tekanan darah hari ini?"\n- "Apakah rutin minum obat dari dokter?"\n- "Bagaimana aktivitas sehari-hari?"\n- "Apakah ada keluhan nyeri atau tidak nyaman?"\n\n#### 🩺 **Pemeriksaan Fisik Sederhana:**\n\n**Pengukuran Anthropometri:**\n- **Timbang berat badan** dengan timbangan portable\n- **Ukur tinggi badan** jika memungkinkan\n- **Ukur LILA** untuk ibu hamil\n- **Lingkar kepala** untuk bayi\n\n**Pemeriksaan Vital Sign:**\n- **Suhu tubuh** dengan termometer digital\n- **Tekanan darah** untuk dewasa dan lansia\n- **Denyut nadi** dan pernapasan\n- **Observasi** kondisi umum (pucat, lemas, dll)\n\n**Pemeriksaan Fisik Dasar:**\n- **Mata:** Pucat, kuning, atau normal\n- **Mulut:** Sariawan, gigi, atau bibir kering\n- **Kulit:** Ruam, luka, atau kelainan lain\n- **Perut:** Kembung atau nyeri (untuk ibu hamil)\n\n#### 🏠 **Assessment Lingkungan:**\n\n**Sanitasi dan Kebersihan:**\n- **Sumber air** bersih keluarga\n- **Jamban** dan sistem pembuangan limbah\n- **Kebersihan** rumah dan lingkungan\n- **Ventilasi** dan pencahayaan rumah\n\n**Keamanan:**\n- **Akses** ke fasilitas kesehatan\n- **Ketersediaan** obat-obatan di rumah\n- **Safety** untuk anak (tangga, kolam, dll)\n\n### **3. Fase Intervensi (15-25 menit)**\n\n#### 💊 **Pelayanan Kesehatan Dasar:**\n\n**Pemberian Suplemen:**\n- **Vitamin A** untuk balita (jika periode pemberian)\n- **Tablet Fe** untuk ibu hamil dan remaja putri\n- **Oralit** untuk penanganan diare ringan\n- **Obat** sederhana sesuai kewenangan kader\n\n**Tindakan Sederhana:**\n- **Pertolongan pertama** untuk luka kecil\n- **Kompres** hangat/dingin untuk demam\n- **Pijat** sederhana untuk bayi\n- **Stimulasi** tumbuh kembang anak\n\n#### 🎓 **Edukasi dan Konseling:**\n\n**Metode Edukasi:**\n- **Demonstrasi** praktik langsung\n- **Media** leaflet dan poster\n- **Storytelling** dengan contoh kasus\n- **Role play** untuk praktik perilaku\n\n**Materi Edukasi Prioritas:**\n\n**Gizi dan Pola Makan:**\n- **Menu** gizi seimbang sesuai usia\n- **Cara** memasak makanan bergizi\n- **Porsi** dan frekuensi makan\n- **Makanan** yang harus dihindari\n\n**Pola Hidup Bersih dan Sehat:**\n- **Cuci tangan** dengan sabun\n- **Sikat gigi** yang benar\n- **Pembuangan** sampah yang baik\n- **Penggunaan** jamban sehat\n\n**Perawatan Kesehatan:**\n- **Cara** minum obat yang benar\n- **Tanda bahaya** yang harus diwaspadai\n- **Kapan** harus segera ke fasilitas kesehatan\n- **Perawatan** mandiri di rumah\n\n#### 🤝 **Konseling dan Motivasi:**\n\n**Teknik Konseling:**\n- **Dengarkan** dengan empati\n- **Pahami** perspektif keluarga\n- **Berikan** solusi yang realistis\n- **Motivasi** perubahan perilaku bertahap\n\n**Prinsip Komunikasi:**\n- **Gunakan** bahasa yang mudah dipahami\n- **Hindari** istilah medis yang rumit\n- **Berikan** contoh konkret\n- **Libatkan** seluruh anggota keluarga\n\n### **4. Fase Penutupan (5-10 menit)**\n\n#### 📋 **Kesimpulan dan Rencana:**\n- **Rangkum** temuan utama dari kunjungan\n- **Jelaskan** rencana tindak lanjut\n- **Buat kesepakatan** untuk kunjungan berikutnya\n- **Berikan** nomor kontak untuk emergency\n\n#### 📝 **Dokumentasi:**\n- **Catat** semua temuan dalam formulir\n- **Update** data di KMS atau buku KIA\n- **Foto** dokumentasi jika diperlukan\n- **Tanda tangan** keluarga sebagai bukti kunjungan\n\n#### 🤝 **Penutup yang Baik:**\n```\n"Terima kasih atas waktu dan kerjasamanya. \nJika ada pertanyaan atau keluhan kesehatan, \njangan ragu untuk menghubungi saya atau datang ke posyandu. \nSampai jumpa di kunjungan berikutnya."\n```\n\n## 📊 Alur Kunjungan Berdasarkan Sasaran\n\n### **🤱 Alur Kunjungan Ibu Hamil:**\n\n1. **Persiapan** (Review data ANC dan riwayat kehamilan)\n2. **Assessment** (Tanya keluhan, ukur BB, TD, LILA)\n3. **Edukasi** (Gizi ibu hamil, tanda bahaya, persiapan persalinan)\n4. **Konseling** (Dukungan psikologis, rencana KB)\n5. **Follow-up** (Jadwal ANC berikutnya, kunjungan ulang)\n\n### **👶 Alur Kunjungan Bayi Baru Lahir:**\n\n1. **Persiapan** (Koordinasi dengan bidan, siapkan KMS)\n2. **Assessment** (Cek kondisi bayi dan ibu, observasi menyusui)\n3. **Edukasi** (ASI eksklusif, perawatan tali pusat, tanda bahaya)\n4. **Dukungan** (Motivasi ibu, atasi masalah menyusui)\n5. **Follow-up** (Jadwal imunisasi, kunjungan neonatal berikutnya)\n\n### **🧒 Alur Kunjungan Balita Masalah Gizi:**\n\n1. **Persiapan** (Review status gizi dan riwayat pertumbuhan)\n2. **Assessment** (Ukur BB, TB, observasi klinis)\n3. **Edukasi** (Menu gizi seimbang, cara memasak, porsi makan)\n4. **Demonstrasi** (Membuat bubur fortifikasi, cara menyuapi)\n5. **Follow-up** (Monitoring mingguan, rujukan jika perlu)\n\n### **👴 Alur Kunjungan Lansia PTM:**\n\n1. **Persiapan** (Review riwayat penyakit dan obat-obatan)\n2. **Assessment** (Ukur TD, gula darah, tanya keluhan)\n3. **Edukasi** (Diet sehat, olahraga ringan, minum obat teratur)\n4. **Motivasi** (Kepatuhan berobat, kontrol rutin)\n5. **Follow-up** (Monitoring bulanan, koordinasi dengan puskesmas)\n\n## ⚠️ Situasi Khusus dalam Kunjungan\n\n### **🚨 Emergency Conditions:**\n\n**Tanda Bahaya yang Memerlukan Rujukan Segera:**\n- **Demam tinggi** (>38.5°C) pada bayi <3 bulan\n- **Sesak napas** berat atau tidak bisa minum\n- **Kejang** atau penurunan kesadaran\n- **Perdarahan** hebat pada ibu hamil/nifas\n- **Tekanan darah** sangat tinggi (>180/110 mmHg)\n\n**Tindakan Emergency:**\n1. **Stabilisasi** kondisi dengan pertolongan pertama\n2. **Hubungi** bidan atau petugas kesehatan terdekat\n3. **Dampingi** keluarga ke fasilitas kesehatan\n4. **Laporkan** segera ke ketua posyandu\n5. **Follow-up** hasil rujukan\n\n### **😔 Penolakan dari Keluarga:**\n\n**Strategi Persuasi:**\n- **Pahami** alasan penolakan dengan empati\n- **Jelaskan** manfaat kunjungan dengan bahasa sederhana\n- **Berikan** contoh sukses dari keluarga lain\n- **Tawarkan** waktu kunjungan yang lebih fleksibel\n- **Libatkan** tokoh masyarakat atau agama jika perlu\n\n### **🏠 Kondisi Rumah Tidak Kondusif:**\n\n**Adaptasi Pelayanan:**\n- **Cari** tempat yang lebih tenang untuk konseling\n- **Sesuaikan** waktu kunjungan dengan kondisi keluarga\n- **Gunakan** pendekatan yang lebih personal\n- **Fokus** pada masalah prioritas utama\n- **Koordinasi** dengan RT/RW untuk dukungan\n\n## 📏 Standar Waktu dan Kualitas\n\n### **⏱️ Durasi Kunjungan Optimal:**\n- **Kunjungan rutin:** 30-45 menit\n- **Kunjungan kompleks:** 45-60 menit\n- **Kunjungan emergency:** Sesuai kebutuhan\n- **Kunjungan follow-up:** 20-30 menit\n\n### **✅ Indikator Kualitas Kunjungan:**\n- **Kelengkapan** assessment (100%)\n- **Akurasi** pengukuran dan pencatatan (>95%)\n- **Relevansi** edukasi dengan kondisi sasaran (100%)\n- **Kepuasan** keluarga terhadap pelayanan (>90%)\n- **Dokumentasi** lengkap dan tepat waktu (100%)\n\n### **🎯 Target Pencapaian:**\n- **Cakupan** sasaran prioritas: >90%\n- **Frekuensi** kunjungan sesuai standar: >85%\n- **Deteksi dini** masalah kesehatan: >80%\n- **Rujukan** tepat waktu dan tepat sasaran: 100%\n- **Follow-up** berkelanjutan: >90%\n\nPelaksanaan kunjungan rumah yang **terstruktur**, **sistematis**, dan **berkualitas** akan memberikan **dampak signifikan** terhadap **peningkatan derajat kesehatan** masyarakat di tingkat keluarga dan individu.',
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-3",
            title: "Tindak Lanjut Hasil Kunjungan Rumah",
            content:
              "# Tindak Lanjut Hasil Kunjungan Rumah\n\n## 📋 Pengertian Tindak Lanjut\n\nTindak lanjut hasil kunjungan rumah adalah **serangkaian kegiatan** yang dilakukan oleh kader posyandu **setelah melakukan kunjungan rumah** untuk memastikan bahwa **masalah kesehatan** yang ditemukan **mendapat penanganan** yang tepat dan **berkelanjutan** sesuai dengan **kebutuhan** dan **kemampuan** keluarga.\n\n### Prinsip Tindak Lanjut:\n- **Kontinuitas:** Pelayanan berkelanjutan tidak terputus\n- **Komprehensif:** Menangani masalah secara menyeluruh\n- **Koordinatif:** Melibatkan berbagai pihak terkait\n- **Responsif:** Cepat tanggap terhadap kebutuhan\n- **Evaluatif:** Selalu menilai efektivitas tindakan\n\n## 📊 Kategorisasi Hasil Temuan\n\n### **🟢 Kategori Normal/Sehat**\n\n#### Karakteristik:\n- **Tidak ada** masalah kesehatan yang signifikan\n- **Status gizi** baik dan pertumbuhan normal\n- **Perilaku** hidup bersih dan sehat sudah baik\n- **Pengetahuan** kesehatan cukup memadai\n\n#### Tindak Lanjut:\n- **Reinforcement** perilaku sehat yang sudah baik\n- **Edukasi** lanjutan untuk pencegahan penyakit\n- **Kunjungan** rutin sesuai jadwal standar\n- **Motivasi** untuk menjadi peer educator\n\n### **🟡 Kategori Berisiko**\n\n#### Karakteristik:\n- **Ada faktor risiko** tetapi belum menjadi masalah\n- **Perilaku kesehatan** kurang optimal\n- **Pengetahuan** kesehatan perlu ditingkatkan\n- **Lingkungan** kurang mendukung kesehatan\n\n#### Tindak Lanjut:\n- **Edukasi intensif** dan konseling berkala\n- **Monitoring** lebih sering (mingguan/2 mingguan)\n- **Modifikasi** perilaku secara bertahap\n- **Dukungan** dari keluarga dan komunitas\n\n### **🟠 Kategori Masalah Sedang**\n\n#### Karakteristik:\n- **Masalah kesehatan** yang perlu penanganan khusus\n- **Status gizi** kurang atau pertumbuhan terhambat\n- **Penyakit** ringan yang memerlukan pengobatan\n- **Perilaku** berisiko tinggi\n\n#### Tindak Lanjut:\n- **Konseling** intensif dan pendampingan\n- **Rujukan** ke puskesmas atau bidan\n- **Kunjungan** mingguan untuk monitoring\n- **Koordinasi** dengan petugas kesehatan\n\n### **🔴 Kategori Darurat/Prioritas Tinggi**\n\n#### Karakteristik:\n- **Kondisi** yang mengancam jiwa\n- **Gizi buruk** atau stunting berat\n- **Penyakit** menular yang berbahaya\n- **Kekerasan** atau penelantaran\n\n#### Tindak Lanjut:\n- **Rujukan segera** ke fasilitas kesehatan\n- **Koordinasi** dengan berbagai sektor\n- **Monitoring** harian sampai stabil\n- **Advokasi** untuk dukungan intensif\n\n## 🎯 Jenis-Jenis Tindak Lanjut\n\n### **1. Tindak Lanjut Mandiri oleh Kader**\n\n#### 📚 **Edukasi Lanjutan:**\n\n**Metode:**\n- **Kunjungan ulang** dengan materi yang lebih spesifik\n- **Demonstrasi** praktik langsung di rumah\n- **Pemberian** leaflet dan poster untuk dipelajari\n- **Melibatkan** anggota keluarga lain\n\n**Materi Prioritas:**\n- **Cara** pengobatan dan perawatan di rumah\n- **Menu** makanan bergizi sesuai kondisi\n- **Deteksi** tanda bahaya yang harus diwaspadai\n- **Jadwal** kontrol dan pemeriksaan rutin\n\n#### 🤝 **Konseling dan Motivasi:**\n\n**Teknik Konseling:**\n- **Problem-solving** bersama keluarga\n- **Goal setting** yang realistis dan terukur\n- **Behavioral change** dengan pendekatan bertahap\n- **Family empowerment** melibatkan seluruh keluarga\n\n**Motivasi Berkelanjutan:**\n- **Apresiasi** kemajuan sekecil apapun\n- **Success story** dari keluarga lain\n- **Peer support** dengan menghubungkan keluarga serupa\n- **Reward system** sederhana untuk pencapaian target\n\n#### 📅 **Monitoring dan Evaluasi:**\n\n**Jadwal Monitoring:**\n- **Masalah ringan:** 2 minggu sekali\n- **Masalah sedang:** 1 minggu sekali\n- **Masalah berat:** 2-3 hari sekali\n- **Follow-up rujukan:** 1 minggu setelah rujukan\n\n**Parameter yang Dimonitor:**\n- **Perubahan** kondisi kesehatan\n- **Kepatuhan** terhadap anjuran\n- **Perubahan** perilaku kesehatan\n- **Kepuasan** keluarga terhadap pelayanan\n\n### **2. Tindak Lanjut melalui Rujukan**\n\n#### 🏥 **Rujukan ke Fasilitas Kesehatan:**\n\n**Kriteria Rujukan:**\n- **Kondisi** di luar kemampuan kader\n- **Memerlukan** pemeriksaan laboratorium\n- **Butuh** pengobatan medis khusus\n- **Komplikasi** yang memerlukan penanganan dokter\n\n**Jenis Rujukan:**\n\n**Rujukan Non-Emergency:**\n- **Buat surat** rujukan sederhana\n- **Jelaskan** kondisi dan hasil pemeriksaan\n- **Koordinasi** dengan puskesmas/bidan\n- **Jadwalkan** kunjungan yang tepat\n\n**Rujukan Emergency:**\n- **Hubungi** langsung petugas kesehatan\n- **Dampingi** ke fasilitas kesehatan\n- **Berikan** informasi lengkap kondisi pasien\n- **Koordinasi** transportasi jika diperlukan\n\n#### 📞 **Koordinasi dengan Petugas Kesehatan:**\n\n**Komunikasi Efektif:**\n- **Laporkan** kondisi secara objektif\n- **Sampaikan** hasil pemeriksaan yang akurat\n- **Tanyakan** anjuran khusus untuk kader\n- **Konfirmasi** jadwal follow-up\n\n**Dokumentasi Rujukan:**\n- **Catat** tanggal, waktu, dan tujuan rujukan\n- **Dokumentasikan** alasan rujukan\n- **Simpan** copy surat rujukan\n- **Follow-up** hasil rujukan dari keluarga\n\n### **3. Tindak Lanjut melalui Koordinasi Sektor Lain**\n\n#### 🏛️ **Sektor Pemerintahan:**\n\n**Desa/Kelurahan:**\n- **Masalah** kemiskinan yang mempengaruhi kesehatan\n- **Infrastruktur** kesehatan yang kurang memadai\n- **Program** bantuan sosial untuk keluarga miskin\n- **Advokasi** kebijakan kesehatan lokal\n\n**Dinas Sosial:**\n- **Kasus** kekerasan dalam rumah tangga\n- **Penelantaran** anak atau lansia\n- **Keluarga** dengan masalah sosial ekonomi berat\n- **Bantuan** sosial dan program rehabilitasi\n\n#### 🎓 **Sektor Pendidikan:**\n\n**Sekolah/PAUD:**\n- **Anak** dengan masalah tumbuh kembang\n- **Gizi** buruk yang mempengaruhi prestasi\n- **Program** pendidikan kesehatan di sekolah\n- **Skrining** kesehatan anak sekolah\n\n#### 🕌 **Tokoh Masyarakat dan Agama:**\n\n**Peran dalam Tindak Lanjut:**\n- **Dukungan** moral dan spiritual\n- **Mobilisasi** bantuan dari masyarakat\n- **Edukasi** melalui forum keagamaan\n- **Mediasi** dalam konflik keluarga\n\n## 📝 Sistem Dokumentasi Tindak Lanjut\n\n### **📋 Formulir Tindak Lanjut:**\n\n#### Isi Formulir:\n```\n===============================\nFORMULIR TINDAK LANJUT KUNJUNGAN RUMAH\n===============================\n\nTanggal Kunjungan: ___________\nNama Sasaran: _______________\nAlamat: ____________________\nMasalah yang Ditemukan:\n_________________________\n_________________________\n\nTindak Lanjut yang Diberikan:\n☐ Edukasi lanjutan\n☐ Konseling\n☐ Rujukan ke: ____________\n☐ Koordinasi dengan: ______\n☐ Kunjungan ulang tanggal: __\n\nHasil Tindak Lanjut:\n_________________________\n_________________________\n\nRencana Selanjutnya:\n_________________________\n_________________________\n\nKader: ___________________\nTanda tangan: ____________\n```\n\n### **📊 Register Tindak Lanjut:**\n\n#### Format Register:\n| No | Nama | Masalah | Tindak Lanjut | Tanggal | Status | Keterangan |\n|----|------|---------|---------------|---------|--------|-----------|\n| 1  | Ibu A| Anemia  | Rujukan Puskesmas | 15/10 | Selesai | Dapat obat Fe |\n| 2  | Bayi B| BBLR   | Monitoring mingguan | 10/10 | Berjalan | BB naik 100g |\n\n### **📈 Evaluasi Berkala:**\n\n#### **Evaluasi Mingguan:**\n- **Review** semua kasus tindak lanjut\n- **Cek** progress masing-masing kasus\n- **Identifikasi** hambatan yang ditemui\n- **Rencanakan** strategi perbaikan\n\n#### **Evaluasi Bulanan:**\n- **Analisis** efektivitas tindak lanjut\n- **Hitung** persentase keberhasilan\n- **Identifikasi** pola masalah yang berulang\n- **Rencanakan** program perbaikan\n\n## 🔄 Follow-Up Berdasarkan Jenis Masalah\n\n### **🤱 Ibu Hamil Risiko Tinggi:**\n\n#### **Immediate Follow-up (1-3 hari):**\n- **Konfirmasi** hasil rujukan ke bidan/dokter\n- **Pastikan** mendapat penanganan yang tepat\n- **Cek** kepatuhan minum obat yang diresepkan\n- **Monitor** kondisi umum dan keluhan\n\n#### **Short-term Follow-up (1-2 minggu):**\n- **Kunjungan** untuk cek kondisi terkini\n- **Evaluasi** efektivitas pengobatan\n- **Edukasi** lanjutan sesuai kondisi\n- **Koordinasi** dengan petugas kesehatan\n\n#### **Long-term Follow-up (bulanan):**\n- **Monitor** perkembangan kehamilan\n- **Pastikan** ANC rutin dilakukan\n- **Persiapan** persalinan dan nifas\n- **Dukungan** psikososial berkelanjutan\n\n### **👶 Bayi dengan Masalah Gizi:**\n\n#### **Immediate Follow-up (2-3 hari):**\n- **Cek** respon terhadap anjuran feeding\n- **Monitor** perubahan nafsu makan\n- **Observasi** tanda-tanda dehidrasi\n- **Pastikan** ASI/susu formula cukup\n\n#### **Short-term Follow-up (mingguan):**\n- **Timbang** berat badan rutin\n- **Evaluasi** pertambahan BB\n- **Adjust** menu makanan jika perlu\n- **Konseling** teknik feeding yang benar\n\n#### **Long-term Follow-up (bulanan):**\n- **Plot** pertumbuhan dalam grafik\n- **Evaluasi** pencapaian milestone\n- **Stimulasi** tumbuh kembang\n- **Edukasi** pencegahan masalah serupa\n\n### **👴 Lansia dengan Penyakit Kronis:**\n\n#### **Immediate Follow-up (1 minggu):**\n- **Cek** kepatuhan minum obat\n- **Monitor** efek samping obat\n- **Ukur** parameter vital (TD, gula darah)\n- **Evaluasi** perubahan gejala\n\n#### **Short-term Follow-up (2 minggu):**\n- **Assess** kemampuan aktivitas harian\n- **Monitor** diet dan olahraga\n- **Cek** jadwal kontrol ke puskesmas\n- **Evaluasi** dukungan keluarga\n\n#### **Long-term Follow-up (bulanan):**\n- **Comprehensive assessment** kondisi kesehatan\n- **Evaluasi** kualitas hidup\n- **Adjust** program perawatan\n- **Koordinasi** dengan dokter keluarga\n\n## 📊 Indikator Keberhasilan Tindak Lanjut\n\n### **📈 Indikator Kuantitatif:**\n\n#### Coverage Indicators:\n- **Persentase** kasus yang mendapat tindak lanjut: Target >95%\n- **Frekuensi** kunjungan follow-up sesuai standar: Target >90%\n- **Waktu** respon untuk kasus emergency: Target <2 jam\n- **Kelengkapan** dokumentasi tindak lanjut: Target 100%\n\n#### Outcome Indicators:\n- **Persentase** masalah yang teratasi: Target >80%\n- **Waktu** penyelesaian masalah rata-rata: <4 minggu\n- **Tingkat** kepuasan keluarga: Target >90%\n- **Tingkat** kepatuhan terhadap anjuran: Target >85%\n\n### **📊 Indikator Kualitatif:**\n\n#### Process Quality:\n- **Ketepatan** jenis tindak lanjut yang diberikan\n- **Koordinasi** yang efektif antar sektor\n- **Komunikasi** yang baik dengan keluarga\n- **Kontinuitas** pelayanan yang terjaga\n\n#### Impact Assessment:\n- **Perubahan** perilaku kesehatan positif\n- **Peningkatan** pengetahuan kesehatan keluarga\n- **Perbaikan** kondisi lingkungan rumah\n- **Penguatan** kapasitas keluarga dalam mengatasi masalah\n\n## 🚧 Tantangan dan Solusi\n\n### **⚠️ Tantangan Umum:**\n\n1. **Keterbatasan Waktu Kader:**\n   - **Solusi:** Pembagian tugas yang efisien antar kader\n   - **Prioritaskan** kasus berdasarkan tingkat risiko\n   - **Gunakan** teknologi untuk monitoring jarak jauh\n\n2. **Kurangnya Koordinasi:**\n   - **Solusi:** Sistem komunikasi yang jelas\n   - **Regular meeting** dengan petugas kesehatan\n   - **Platform** digital untuk koordinasi\n\n3. **Keterbatasan Sumber Daya:**\n   - **Solusi:** Mobilisasi sumber daya komunitas\n   - **Kerjasama** dengan sektor swasta\n   - **Advokasi** ke pemerintah daerah\n\n4. **Resistance dari Keluarga:**\n   - **Solusi:** Pendekatan yang lebih personal\n   - **Libatkan** tokoh masyarakat\n   - **Tunjukkan** hasil positif pada keluarga lain\n\n### **✅ Best Practices:**\n\n1. **Systematic Approach:** Gunakan sistem yang terstruktur\n2. **Team Work:** Kerjasama yang solid antar kader\n3. **Continuous Learning:** Update pengetahuan secara berkala\n4. **Community Engagement:** Libatkan masyarakat aktif\n5. **Data-Driven:** Gunakan data untuk pengambilan keputusan\n\n## 🏆 Tips Sukses Tindak Lanjut\n\n### **🎯 Prinsip SMART dalam Tindak Lanjut:**\n- **Specific:** Tindak lanjut yang spesifik sesuai masalah\n- **Measurable:** Dapat diukur kemajuannya\n- **Achievable:** Realistis dan dapat dicapai\n- **Relevant:** Sesuai dengan kebutuhan keluarga\n- **Time-bound:** Ada batas waktu yang jelas\n\n### **💡 Key Success Factors:**\n\n1. **Komitmen** kader yang tinggi\n2. **Dukungan** petugas kesehatan\n3. **Partisipasi** aktif keluarga\n4. **Koordinasi** yang efektif\n5. **Monitoring** yang konsisten\n6. **Evaluasi** berkala untuk perbaikan\n7. **Inovasi** dalam pendekatan pelayanan\n8. **Sustainability** program jangka panjang\n\nTindak lanjut yang **terstruktur**, **berkelanjutan**, dan **komprehensif** merupakan **kunci keberhasilan** program kunjungan rumah dalam meningkatkan **derajat kesehatan masyarakat** secara **sustainable** dan **impactful**.",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz3-1",
            question: "Siapa yang menjadi sasaran utama kunjungan rumah?",
            options: [
              "Hanya ibu hamil",
              "Hanya balita",
              "Semua anggota keluarga berisiko",
              "Hanya lansia",
            ],
            correctAnswer: 2,
            explanation:
              "Kunjungan rumah ditujukan untuk semua anggota keluarga yang memiliki risiko kesehatan.",
          },
          {
            id: "quiz3-2",
            question: "Apa tujuan utama kunjungan rumah?",
            options: [
              "Mencari masalah kesehatan",
              "Memberikan pelayanan kesehatan di rumah",
              "Mengumpulkan data",
              "Menagih iuran posyandu",
            ],
            correctAnswer: 1,
            explanation:
              "Tujuan utama kunjungan rumah adalah memberikan pelayanan kesehatan langsung di rumah keluarga.",
          },
          {
            id: "quiz3-3",
            question: "Kapan kunjungan rumah sebaiknya dilakukan?",
            options: [
              "Hanya saat ada keluhan",
              "Secara rutin dan terencana",
              "Hanya saat diminta",
              "Tidak perlu dijadwalkan",
            ],
            correctAnswer: 1,
            explanation:
              "Kunjungan rumah sebaiknya dilakukan secara rutin dan terencana untuk pencegahan dan deteksi dini.",
          },
          {
            id: "quiz3-4",
            question: "Apa yang harus dilakukan setelah kunjungan rumah?",
            options: [
              "Langsung pulang",
              "Membuat laporan saja",
              "Tindak lanjut sesuai temuan",
              "Menunggu panggilan berikutnya",
            ],
            correctAnswer: 2,
            explanation:
              "Setelah kunjungan rumah harus dilakukan tindak lanjut sesuai dengan temuan dan kebutuhan keluarga.",
          },
          {
            id: "quiz3-5",
            question:
              "Berapa kali minimal kunjungan rumah untuk bayi baru lahir?",
            options: ["1 kali", "2 kali", "3 kali", "4 kali"],
            correctAnswer: 2,
            explanation:
              "Bayi baru lahir harus dikunjungi minimal 3 kali: hari 1-3, hari 4-7, dan hari 8-28 setelah lahir.",
          },
          {
            id: "quiz3-6",
            question:
              "Apa kriteria ibu hamil risiko tinggi yang perlu kunjungan rumah?",
            options: [
              "Usia > 20 tahun",
              "Tinggi badan > 150 cm",
              "LILA < 23,5 cm",
              "Semua kehamilan",
            ],
            correctAnswer: 2,
            explanation:
              "Ibu hamil dengan LILA < 23,5 cm termasuk Kurang Energi Kronis (KEK) dan menjadi prioritas kunjungan rumah.",
          },
          {
            id: "quiz3-7",
            question: "Berapa lama durasi optimal untuk kunjungan rumah rutin?",
            options: ["15-20 menit", "20-30 menit", "30-45 menit", "60 menit"],
            correctAnswer: 2,
            explanation:
              "Durasi optimal kunjungan rumah rutin adalah 30-45 menit untuk dapat melakukan assessment dan edukasi yang komprehensif.",
          },
          {
            id: "quiz3-8",
            question:
              "Apa yang termasuk dalam fase assessment kunjungan rumah?",
            options: [
              "Hanya wawancara",
              "Hanya pemeriksaan fisik",
              "Wawancara, pemeriksaan fisik, dan assessment lingkungan",
              "Hanya memberikan edukasi",
            ],
            correctAnswer: 2,
            explanation:
              "Fase assessment meliputi anamnesis (wawancara), pemeriksaan fisik sederhana, dan assessment lingkungan rumah.",
          },
          {
            id: "quiz3-9",
            question:
              "Apa yang dimaksud dengan tindak lanjut kategori 'Darurat/Prioritas Tinggi'?",
            options: [
              "Kunjungan mingguan",
              "Edukasi lanjutan",
              "Rujukan segera ke fasilitas kesehatan",
              "Konseling rutin",
            ],
            correctAnswer: 2,
            explanation:
              "Kategori darurat/prioritas tinggi memerlukan rujukan segera ke fasilitas kesehatan karena kondisi yang mengancam jiwa.",
          },
          {
            id: "quiz3-10",
            question:
              "Berapa target cakupan sasaran prioritas yang harus dikunjungi?",
            options: ["> 80%", "> 85%", "> 90%", "> 95%"],
            correctAnswer: 2,
            explanation:
              "Target cakupan sasaran prioritas kunjungan rumah adalah > 90% untuk memastikan pelayanan yang optimal.",
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
    duration: "5 jam 45 menit",
    lessons: 18,
    difficulty: "Menengah",
    category: "Bayi & Balita",
    status: "not-started",
    progress: 0,
    rating: 4.8,
    students: 1450,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Budi Santoso",
    estimatedCompletion: "7 hari",
    overview:
      "Modul komprehensif tentang perawatan bayi dan balita yang mencakup ASI eksklusif, MPASI, PMT penyuluhan, imunisasi, dan tumbuh kembang untuk mendukung perkembangan optimal anak.",
    learningObjectives: [
      "Memahami manfaat ASI eksklusif bagi bayi dan ibu serta deteksi gangguannya",
      "Menguasai prinsip pemberian MPASI yang tepat dan bergizi",
      "Dapat melaksanakan PMT penyuluhan sebagai media edukasi gizi",
      "Memahami program imunisasi dan PD3I untuk pencegahan penyakit",
      "Mampu melakukan deteksi dan stimulasi tumbuh kembang bayi balita",
    ],
    requirements: [
      "Pengetahuan dasar kesehatan anak",
      "Pengalaman berinteraksi dengan balita",
      "Komitmen untuk belajar",
    ],
    subMateris: [
      {
        id: "sub1",
        title: "ASI Eksklusif",
        description:
          "Memahami pentingnya ASI eksklusif untuk 6 bulan pertama kehidupan bayi",
        duration: "60 menit",
        isCompleted: false,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin1-1",
            title: "Deteksi Gangguan",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Deteksi Gangguan** dalam pemberian ASI Eksklusif sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 812-3456-7890](https://wa.me/6281234567890?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Deteksi%20Gangguan%20ASI%20Eksklusif)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-2",
            title: "Manfaat ASI Eksklusif bagi Bayi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Manfaat ASI Eksklusif bagi Bayi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 821-9876-5432](https://wa.me/6282198765432?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Manfaat%20ASI%20Eksklusif%20bagi%20Bayi)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-3",
            title: "Manfaat ASI Eksklusif bagi Ibu",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Manfaat ASI Eksklusif bagi Ibu** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 813-5678-9012](https://wa.me/6281356789012?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Manfaat%20ASI%20Eksklusif%20bagi%20Ibu)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
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
      {
        id: "sub2",
        title: "MPASI",
        description: "Makanan Pendamping ASI untuk bayi mulai usia 6 bulan",
        duration: "75 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin2-1",
            title: "Pengertian",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Pengertian MPASI** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 814-2468-1357](https://wa.me/6281424681357?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Pengertian%20MPASI)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-2",
            title: "Manfaat MP ASI",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Manfaat MP ASI** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 815-1357-2468](https://wa.me/6281513572468?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Manfaat%20MP%20ASI)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-3",
            title: "Tujuan Pemberian MP ASI",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Tujuan Pemberian MP ASI** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 816-9753-8642](https://wa.me/6281697538642?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Tujuan%20Pemberian%20MP%20ASI)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-4",
            title: "Syarat Pemberian MP ASI",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Syarat Pemberian MP ASI** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 817-8642-9753](https://wa.me/6281786429753?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Syarat%20Pemberian%20MP%20ASI)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-5",
            title: "Buku Menu MP ASI",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Buku Menu MP ASI** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 818-3691-4725](https://wa.me/6281836914725?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Buku%20Menu%20MP%20ASI)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz2-1",
            question: "Pada usia berapa MPASI mulai diberikan kepada bayi?",
            options: ["4 bulan", "5 bulan", "6 bulan", "7 bulan"],
            correctAnswer: 2,
            explanation:
              "MPASI mulai diberikan pada usia 6 bulan setelah ASI eksklusif selama 6 bulan pertama.",
          },
        ],
      },
      {
        id: "sub3",
        title: "PMT Penyuluhan",
        description:
          "Pemberian Makanan Tambahan untuk tujuan penyuluhan dan edukasi gizi",
        duration: "70 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin3-1",
            title: "Pengertian",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Pengertian PMT Penyuluhan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 819-7418-5296](https://wa.me/6281974185296?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Pengertian%20PMT%20Penyuluhan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-2",
            title: "Sasaran PMT Penyuluhan",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Sasaran PMT Penyuluhan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 820-5296-7418](https://wa.me/6282052967418?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Sasaran%20PMT%20Penyuluhan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-3",
            title: "Manfaat/Tujuan",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Manfaat/Tujuan PMT Penyuluhan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 821-6395-8174](https://wa.me/6282163958174?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Manfaat%20Tujuan%20PMT%20Penyuluhan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-4",
            title: "Standar PMT Penyuluhan",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Standar PMT Penyuluhan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 822-1749-6258](https://wa.me/6282217496258?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Standar%20PMT%20Penyuluhan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-5",
            title: "Menu PMT",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Menu PMT** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 823-2583-7416](https://wa.me/6282325837416?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Menu%20PMT)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz3-1",
            question: "Apa tujuan utama dari PMT Penyuluhan?",
            options: [
              "Mengatasi gizi buruk",
              "Edukasi dan demonstrasi gizi seimbang",
              "Mengganti makanan utama",
              "Memberikan vitamin tambahan",
            ],
            correctAnswer: 1,
            explanation:
              "PMT Penyuluhan bertujuan untuk memberikan edukasi dan demonstrasi tentang gizi seimbang kepada masyarakat.",
          },
        ],
      },
      {
        id: "sub4",
        title: "Imunisasi",
        description:
          "Program imunisasi untuk pencegahan penyakit pada bayi dan balita",
        duration: "90 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin4-1",
            title: "Pengertian",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Pengertian Imunisasi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 824-9637-1485](https://wa.me/6282496371485?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Pengertian%20Imunisasi)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-2",
            title: "PD3I (Pengertian, Manfaat/Tujuan)",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **PD3I (Program Pengembangan Imunisasi) - Pengertian, Manfaat/Tujuan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 825-4815-9627](https://wa.me/6282548159627?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20PD3I%20Pengertian%20Manfaat%20Tujuan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "30 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-3",
            title: "Jadwal Pemberian Imunisasi Rutin Lengkap",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Jadwal Pemberian Imunisasi Rutin Lengkap** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 826-7396-2581](https://wa.me/6282673962581?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Jadwal%20Pemberian%20Imunisasi%20Rutin%20Lengkap)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-4",
            title: "Penyakit yang Dapat Dicegah dengan PD3I",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Penyakit yang Dapat Dicegah dengan PD3I** (Penyakit Polio, Penyakit Campak Rubela, Penyakit Tetanus Neonatarum, Penyakit Pertusis (Batuk 100 Hari), Penyakit Difteri, Penyakit Hepatitis B, Penyakit Kanker Serviks) sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 827-1582-4739](https://wa.me/6282715824739?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Penyakit%20yang%20Dapat%20Dicegah%20dengan%20PD3I)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz4-1",
            question: "Apa kepanjangan dari PD3I?",
            options: [
              "Program Dasar Imunisasi Indonesia",
              "Program Pengembangan Imunisasi",
              "Pencegahan Penyakit yang Dapat Dicegah dengan Imunisasi",
              "Program Dinas Kesehatan Imunisasi Indonesia",
            ],
            correctAnswer: 2,
            explanation:
              "PD3I adalah Pencegahan Penyakit yang Dapat Dicegah dengan Imunisasi, yaitu program pencegahan penyakit melalui imunisasi.",
          },
        ],
      },
      {
        id: "sub5",
        title: "Tumbuh Kembang",
        description: "Pemantauan dan stimulasi tumbuh kembang bayi dan balita",
        duration: "80 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin5-1",
            title: "Deteksi Tumbuh Kembang",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Deteksi Tumbuh Kembang** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 828-6174-3928](https://wa.me/6282861743928?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Deteksi%20Tumbuh%20Kembang)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "25 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-2",
            title: "Deteksi Stimulasi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Deteksi Stimulasi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 829-3928-6174](https://wa.me/6282939286174?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Deteksi%20Stimulasi)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "25 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-3",
            title: "Deteksi Gangguan",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Deteksi Gangguan** tumbuh kembang sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 830-5274-8136](https://wa.me/6283052748136?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Deteksi%20Gangguan%20Tumbuh%20Kembang)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "30 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz5-1",
            question: "Pada usia berapa bayi mulai bisa duduk tanpa bantuan?",
            options: ["4-5 bulan", "6-8 bulan", "9-10 bulan", "11-12 bulan"],
            correctAnswer: 1,
            explanation:
              "Bayi umumnya mulai bisa duduk tanpa bantuan pada usia 6-8 bulan sebagai bagian dari perkembangan motorik kasar.",
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
    duration: "7 jam 30 menit",
    lessons: 31,
    difficulty: "Menengah",
    category: "Ibu Hamil & Menyusui",
    status: "not-started",
    progress: 0,
    rating: 4.7,
    students: 950,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Lisa Kartika",
    estimatedCompletion: "8 hari",
    overview:
      "Modul komprehensif yang mencakup gizi seimbang, tanda bahaya kehamilan, PMT, risiko penyulit, senam kehamilan, dan edukasi ASI eksklusif untuk ibu hamil dan menyusui.",
    learningObjectives: [
      "Memahami gizi seimbang dan PMT pemulihan untuk ibu hamil",
      "Dapat mendeteksi tanda bahaya kehamilan di setiap trimester",
      "Memahami pencegahan penyakit tidak menular (PTM)",
      "Mampu mengidentifikasi dan mencegah risiko penyulit kehamilan",
      "Menguasai teknik senam kehamilan yang aman dan bermanfaat",
      "Dapat memberikan edukasi ASI eksklusif yang komprehensif",
    ],
    requirements: [
      "Pengetahuan dasar kesehatan reproduksi",
      "Kepedulian terhadap kesehatan ibu",
      "Kemampuan komunikasi yang baik",
    ],
    subMateris: [
      {
        id: "sub1",
        title: "Gizi Seimbang dan PMT Pemulihan",
        description:
          "Memahami kebutuhan gizi seimbang dan PMT pemulihan untuk ibu hamil",
        duration: "120 menit",
        isCompleted: false,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin1-1",
            title: "Pengertian",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Pengertian Gizi Seimbang dan PMT Pemulihan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 831-4826-3957](https://wa.me/6283148263957?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Pengertian%20Gizi%20Seimbang%20dan%20PMT%20Pemulihan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-2",
            title: "Kebutuhan Nutrisi Ibu Hamil",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Kebutuhan Nutrisi Ibu Hamil** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 832-5937-1468](https://wa.me/6283259371468?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Kebutuhan%20Nutrisi%20Ibu%20Hamil)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-3",
            title: "Gizi Seimbang untuk Ibu Hamil",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Gizi Seimbang untuk Ibu Hamil** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 833-7148-2596](https://wa.me/6283371482596?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Gizi%20Seimbang%20untuk%20Ibu%20Hamil)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-4",
            title: "Pentingnya Makanan Tambahan untuk Ibu Hamil",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Pentingnya Makanan Tambahan untuk Ibu Hamil** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 834-9526-8147](https://wa.me/6283495268147?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Pentingnya%20Makanan%20Tambahan%20untuk%20Ibu%20Hamil)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-5",
            title: "Manfaat Gizi Seimbang",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Manfaat Gizi Seimbang** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 835-1637-4892](https://wa.me/6283516374892?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Manfaat%20Gizi%20Seimbang)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-6",
            title: "13 Pesan Umum untuk Gizi Seimbang",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **13 Pesan Umum untuk Gizi Seimbang** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 836-2748-5931](https://wa.me/6283627485931?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%2013%20Pesan%20Umum%20untuk%20Gizi%20Seimbang)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-7",
            title: "Nutrisi Ibu Hamil Saat Puasa",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Nutrisi Ibu Hamil Saat Puasa** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 837-8159-6374](https://wa.me/6283781596374?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Nutrisi%20Ibu%20Hamil%20Saat%20Puasa)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-8",
            title: "Tips Sehat Ibu Hamil",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Tips Sehat Ibu Hamil** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 838-3741-9628](https://wa.me/6283837419628?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Tips%20Sehat%20Ibu%20Hamil)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-9",
            title: "Referensi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Referensi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 839-9582-1473](https://wa.me/6283995821473?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Referensi%20Gizi%20Seimbang)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz1-1",
            question:
              "Berapa tambahan kalori yang dibutuhkan ibu hamil per hari?",
            options: ["200 kalori", "300 kalori", "400 kalori", "500 kalori"],
            correctAnswer: 1,
            explanation:
              "Ibu hamil membutuhkan tambahan sekitar 300 kalori per hari untuk mendukung pertumbuhan janin yang optimal.",
          },
        ],
      },
      {
        id: "sub2",
        title: "Edukasi Tanda Bahaya Kehamilan",
        description:
          "Memahami tanda-tanda bahaya kehamilan di setiap trimester",
        duration: "80 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin2-1",
            title: "Tanda-Tanda Bahaya Pada Masa Kehamilan",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Tanda-Tanda Bahaya Pada Masa Kehamilan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 840-1593-7246](https://wa.me/6284015937246?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Tanda-Tanda%20Bahaya%20Pada%20Masa%20Kehamilan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-2",
            title: "Perkembangan Janin di Trimester 2",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Perkembangan Janin di Trimester 2** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 841-6284-9517](https://wa.me/6284162849517?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Perkembangan%20Janin%20di%20Trimester%202)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-3",
            title: "Keluhan yang Biasa Terjadi Saat Trimester 2",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Keluhan yang Biasa Terjadi Saat Trimester 2** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 842-7395-1628](https://wa.me/6284273951628?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Keluhan%20yang%20Biasa%20Terjadi%20Saat%20Trimester%202)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-4",
            title: "Tanda Bahaya Kehamilan Trimester 2 yang Perlu Diwaspadai",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Tanda Bahaya Kehamilan Trimester 2 yang Perlu Diwaspadai** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 843-8416-2739](https://wa.me/6284384162739?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Tanda%20Bahaya%20Kehamilan%20Trimester%202%20yang%20Perlu%20Diwaspadai)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz2-1",
            question: "Apa tanda bahaya kehamilan yang paling serius?",
            options: [
              "Mual muntah",
              "Perdarahan pervaginam",
              "Kaki bengkak ringan",
              "Nyeri punggung",
            ],
            correctAnswer: 1,
            explanation:
              "Perdarahan pervaginam merupakan tanda bahaya kehamilan yang paling serius dan memerlukan penanganan medis segera.",
          },
        ],
      },
      {
        id: "sub3",
        title: "PMT",
        description: "Pencegahan Penyakit Tidak Menular (PTM) pada ibu hamil",
        duration: "75 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin3-1",
            title: "Apa itu Penyakit Tidak Menular (PTM)",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Apa itu Penyakit Tidak Menular (PTM)** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 844-9527-3841](https://wa.me/6284495273841?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Apa%20itu%20Penyakit%20Tidak%20Menular%20PTM)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-2",
            title: "Tahukah Anda Bahwa Ada Fakta Mengejutkan Terkait PTM?",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Tahukah Anda Bahwa Ada Fakta Mengejutkan Terkait PTM?** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 845-1638-4952](https://wa.me/6284516384952?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Fakta%20Mengejutkan%20Terkait%20PTM)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-3",
            title: "Siapa Saja yang Dapat Terkena PTM?",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Siapa Saja yang Dapat Terkena PTM?** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 846-2749-5163](https://wa.me/6284627495163?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Siapa%20Saja%20yang%20Dapat%20Terkena%20PTM)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-4",
            title: "Bagaimana Mencegah Terjadinya PTM?",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Bagaimana Mencegah Terjadinya PTM?** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 847-3851-6274](https://wa.me/6284738516274?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Bagaimana%20Mencegah%20Terjadinya%20PTM)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-5",
            title:
              "Pengendalian Faktor Risiko PTM dengan Menerapkan Perilaku CERDIK",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Pengendalian Faktor Risiko PTM dengan Menerapkan Perilaku CERDIK** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 848-4962-7385](https://wa.me/6284849627385?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Pengendalian%20Faktor%20Risiko%20PTM%20dengan%20Menerapkan%20Perilaku%20CERDIK)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz3-1",
            question: "Apa kepanjangan dari PTM?",
            options: [
              "Penyakit Tidak Mudah",
              "Penyakit Tidak Menular",
              "Penyakit Tidak Mematikan",
              "Penyakit Tidak Merata",
            ],
            correctAnswer: 1,
            explanation:
              "PTM adalah Penyakit Tidak Menular, yaitu penyakit yang tidak dapat ditularkan dari satu orang ke orang lain.",
          },
        ],
      },
      {
        id: "sub4",
        title: "Risiko Penyulit Kehamilan",
        description:
          "Memahami faktor risiko dan cara mencegah penyulit kehamilan",
        duration: "105 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin4-1",
            title: "Pengertian",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Pengertian Risiko Penyulit Kehamilan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 849-5173-8496](https://wa.me/6284951738496?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Pengertian%20Risiko%20Penyulit%20Kehamilan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-2",
            title: "Faktor Risiko Kehamilan Risiko Tinggi, Diantaranya Adalah",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Faktor Risiko Kehamilan Risiko Tinggi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 850-6284-9517](https://wa.me/6285062849517?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Faktor%20Risiko%20Kehamilan%20Risiko%20Tinggi)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-3",
            title:
              "Penyebab Tidak Langsung Kehamilan Risiko Tinggi dengan Istilah 4T, Yaitu",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Penyebab Tidak Langsung Kehamilan Risiko Tinggi dengan Istilah 4T** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 851-7395-1628](https://wa.me/6285173951628?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Penyebab%20Tidak%20Langsung%20Kehamilan%20Risiko%20Tinggi%204T)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-4",
            title: "Faktor Risiko Semakin Tinggi Jika Disertai 3 Terlambat",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Faktor Risiko Semakin Tinggi Jika Disertai 3 Terlambat** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 852-8416-2739](https://wa.me/6285284162739?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Faktor%20Risiko%20Semakin%20Tinggi%203%20Terlambat)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-5",
            title: "Apa Saja Bahaya Kehamilan Risiko Tinggi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Apa Saja Bahaya Kehamilan Risiko Tinggi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 853-9527-3841](https://wa.me/6285395273841?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Apa%20Saja%20Bahaya%20Kehamilan%20Risiko%20Tinggi)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-6",
            title:
              "Apa yang Harus Dilakukan Jika Kita Mengalami Kehamilan Risiko Tinggi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Apa yang Harus Dilakukan Jika Kita Mengalami Kehamilan Risiko Tinggi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 854-1638-4952](https://wa.me/6285416384952?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Apa%20yang%20Harus%20Dilakukan%20Kehamilan%20Risiko%20Tinggi)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-7",
            title: "Cara Mencegah Kehamilan Risiko Tinggi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Cara Mencegah Kehamilan Risiko Tinggi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 855-2749-5163](https://wa.me/6285527495163?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Cara%20Mencegah%20Kehamilan%20Risiko%20Tinggi)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz4-1",
            question:
              "Apa yang dimaksud dengan '4T' dalam kehamilan risiko tinggi?",
            options: [
              "Terlalu muda, terlalu tua, terlalu dekat, terlalu banyak",
              "Terlambat, terlalu jauh, terlalu mahal, terlalu takut",
              "Tetanus, TBC, Tumor, Trauma",
              "Tidak mau, tidak bisa, tidak tahu, tidak mampu",
            ],
            correctAnswer: 0,
            explanation:
              "4T dalam kehamilan risiko tinggi adalah: Terlalu muda (<20 tahun), Terlalu tua (>35 tahun), Terlalu dekat jarak kehamilan (<2 tahun), Terlalu banyak anak (>4 anak).",
          },
        ],
      },
      {
        id: "sub5",
        title: "Senam Kehamilan",
        description: "Panduan senam kehamilan yang aman dan bermanfaat",
        duration: "110 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin5-1",
            title: "Pengertian",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Pengertian Senam Kehamilan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 856-3851-6274](https://wa.me/6285638516274?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Pengertian%20Senam%20Kehamilan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-2",
            title: "Tujuan",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Tujuan Senam Kehamilan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 857-4962-7385](https://wa.me/6285749627385?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Tujuan%20Senam%20Kehamilan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-3",
            title: "Manfaat",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Manfaat Senam Kehamilan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 858-5173-8496](https://wa.me/6285851738496?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Manfaat%20Senam%20Kehamilan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-4",
            title: "Hal-Hal yang Perlu Diperhatikan Sebelum Senam",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Hal-Hal yang Perlu Diperhatikan Sebelum Senam** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 859-6284-9517](https://wa.me/6285962849517?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Hal-Hal%20yang%20Perlu%20Diperhatikan%20Sebelum%20Senam)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-5",
            title: "Gerakan Ibu Hamil yang Bisa Dilakukan",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Gerakan Ibu Hamil yang Bisa Dilakukan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 860-7395-1628](https://wa.me/6286073951628?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Gerakan%20Ibu%20Hamil%20yang%20Bisa%20Dilakukan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-6",
            title: "Keuntungan",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Keuntungan Senam Kehamilan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 861-8416-2739](https://wa.me/6286184162739?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Keuntungan%20Senam%20Kehamilan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-7",
            title: "Ragam Olahraga yang Bisa Dicoba",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Ragam Olahraga yang Bisa Dicoba** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 862-9527-3841](https://wa.me/6286295273841?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Ragam%20Olahraga%20yang%20Bisa%20Dicoba)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "10 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-8",
            title: "Video Rekomendasi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Video Rekomendasi Senam Kehamilan** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 863-1638-4952](https://wa.me/6286316384952?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Video%20Rekomendasi%20Senam%20Kehamilan)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "10 menit",
            isCompleted: false,
            type: "video",
          },
        ],
        quiz: [
          {
            id: "quiz5-1",
            question: "Kapan waktu yang tepat untuk memulai senam kehamilan?",
            options: [
              "Trimester 1",
              "Trimester 2",
              "Trimester 3",
              "Kapan saja dengan persetujuan dokter",
            ],
            correctAnswer: 3,
            explanation:
              "Senam kehamilan dapat dimulai kapan saja selama kehamilan, tetapi harus dengan persetujuan dan pengawasan dokter atau bidan.",
          },
        ],
      },
      {
        id: "sub6",
        title: "Edukasi ASI Eksklusif",
        description: "Panduan lengkap tentang ASI eksklusif untuk ibu menyusui",
        duration: "100 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin6-1",
            title: "Pengertian",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Pengertian ASI Eksklusif** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 864-2749-5163](https://wa.me/6286427495163?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Pengertian%20ASI%20Eksklusif)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin6-2",
            title: "Manfaat ASI Eksklusif pada Bayi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Manfaat ASI Eksklusif pada Bayi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 865-3851-6274](https://wa.me/6286538516274?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Manfaat%20ASI%20Eksklusif%20pada%20Bayi)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin6-3",
            title: "Risiko Jika Bayi Tidak Diberi ASI Eksklusif",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Risiko Jika Bayi Tidak Diberi ASI Eksklusif** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 866-4962-7385](https://wa.me/6286649627385?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Risiko%20Jika%20Bayi%20Tidak%20Diberi%20ASI%20Eksklusif)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin6-4",
            title: "Kenali Perilaku Menyusu Bayi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Kenali Perilaku Menyusu Bayi** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 867-5173-8496](https://wa.me/6286751738496?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Kenali%20Perilaku%20Menyusu%20Bayi)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin6-5",
            title: "Berikan ASI dengan Cara yang Benar",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Berikan ASI dengan Cara yang Benar** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 868-6284-9517](https://wa.me/6286862849517?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Berikan%20ASI%20dengan%20Cara%20yang%20Benar)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin6-6",
            title: "Cara Memerah dan Menyimpan ASI",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Cara Memerah dan Menyimpan ASI** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 869-7395-1628](https://wa.me/6286973951628?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Cara%20Memerah%20dan%20Menyimpan%20ASI)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin6-7",
            title: "Video Rekomendasi",
            content:
              "## 🚨 Konten Sedang Dalam Pengembangan\n\nMateri tentang **Video Rekomendasi ASI Eksklusif** sedang dalam proses penyusunan.\n\n### 📞 Laporkan Masalah\nJika Anda menemukan kendala atau membutuhkan informasi lebih lanjut, silakan hubungi tim pengembang:\n\n**WhatsApp Support:** [+62 870-8416-2739](https://wa.me/6287084162739?text=Halo,%20saya%20membutuhkan%20bantuan%20terkait%20materi%20Video%20Rekomendasi%20ASI%20Eksklusif)\n\nTerima kasih atas kesabaran Anda! 🙏",
            duration: "5 menit",
            isCompleted: false,
            type: "video",
          },
        ],
        quiz: [
          {
            id: "quiz6-1",
            question: "Berapa lama ASI eksklusif harus diberikan kepada bayi?",
            options: ["4 bulan", "5 bulan", "6 bulan", "8 bulan"],
            correctAnswer: 2,
            explanation:
              "ASI eksklusif harus diberikan kepada bayi selama 6 bulan pertama kehidupan tanpa tambahan makanan atau minuman lain.",
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
              '## 🩺 Materi Premium - Fitur WhatsApp Support\n\n### 📊 Pengertian Hipertensi\n\n**Hipertensi** atau tekanan darah tinggi adalah kondisi medis yang terjadi ketika tekanan darah dalam arteri meningkat secara persisten. Kondisi ini sering disebut sebagai **"silent killer"** karena gejala awalnya tidak selalu terasa.\n\n### 📈 Klasifikasi Tekanan Darah (American Heart Association 2021)\n\n| **Kategori** | **Sistolik (mmHg)** | **Diastolik (mmHg)** |\n|--------------|--------------------|-----------------------|\n| **Normal** | < 120 | dan < 80 |\n| **Elevated** | 120-129 | dan < 80 |\n| **Stage 1** | 130-139 | atau 80-89 |\n| **Stage 2** | ≥ 140 | atau ≥ 90 |\n| **Crisis** | > 180 | dan/atau > 120 |\n\n### 🎯 Target Tekanan Darah\n\n- **Dewasa Umum:** < 130/80 mmHg\n- **Lansia > 65 tahun:** < 130/80 mmHg (jika dapat ditoleransi)\n- **Diabetes/CKD:** < 130/80 mmHg\n\n---\n\n### 📱 **WhatsApp Support Center - Konsultasi Hipertensi**\n\n**🔴 LAYANAN DARURAT HIPERTENSI:**\n- **Crisis Hotline:** [+62 811-HIPERTENSI](https://wa.me/6281174737837?text=DARURAT:%20Tekanan%20darah%20sangat%20tinggi,%20butuh%20bantuan%20segera!)\n- **Emergency Response:** [+62 822-BP-CRISIS](https://wa.me/6282227274747?text=URGENT:%20Krisis%20hipertensi,%20mohon%20panduan%20pertolongan%20pertama!)\n\n**💊 KONSULTASI SPESIALIS:**\n- **Kardiovaskular:** [+62 813-JANTUNG](https://wa.me/6281352686864?text=Halo%20Dokter,%20saya%20ingin%20konsultasi%20tentang%20hipertensi%20dan%20kesehatan%20jantung)\n- **Geriatri (Lansia):** [+62 824-LANSIA](https://wa.me/6282452674752?text=Selamat%20pagi%20Dok,%20saya%20butuh%20konsultasi%20hipertensi%20untuk%20lansia)\n\n**📊 MONITORING MANDIRI:**\n- **Blood Pressure Log:** [+62 835-BP-TRACK](https://wa.me/6283527872225?text=Halo,%20saya%20ingin%20panduan%20mencatat%20tekanan%20darah%20harian)\n- **Home Care Guide:** [+62 846-HOME-BP](https://wa.me/6284646632727?text=Selamat%20pagi,%20saya%20butuh%20panduan%20perawatan%20hipertensi%20di%20rumah)\n\n### 🆘 **Kapan Harus Segera Hubungi Dokter?**\n\n⚠️ **SEGERA KE UGD jika mengalami:**\n- Tekanan darah > 180/120 mmHg\n- Sakit kepala hebat + muntah\n- Nyeri dada + sesak napas\n- Pandangan kabur mendadak\n- Kebingungan atau penurunan kesadaran\n\n### 💡 **Fitur Premium WhatsApp:**\n- ✅ **Reminder Obat** otomatis via WhatsApp\n- ✅ **Weekly BP Report** analisis mingguan\n- ✅ **Meal Planning** diet rendah garam\n- ✅ **Exercise Program** disesuaikan kondisi\n\n*Hipertensi dapat dikontrol dengan baik jika dikelola dengan tepat! 💪❤️*',
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-2",
            title: "Faktor Risiko Hipertensi",
            content:
              "## 🎯 Identifikasi & Manajemen Faktor Risiko\n\n### 🚫 **Faktor Risiko TIDAK DAPAT DIMODIFIKASI**\n\n#### 🧬 **Genetik & Keturunan**\n- Riwayat keluarga hipertensi\n- Predisposisi genetik\n- Ras/etnis tertentu (Afrika-Amerika)\n\n#### 👴 **Faktor Demografis**\n- **Usia:** Risiko ↑ setelah 45 tahun (pria), 55 tahun (wanita)\n- **Jenis Kelamin:** Pria > 45 tahun, wanita post-menopause\n\n### ✅ **Faktor Risiko DAPAT DIMODIFIKASI**\n\n#### 🍔 **Pola Makan**\n- **Konsumsi garam berlebih** (>5g/hari)\n- **Diet tinggi lemak jenuh**\n- **Kurang konsumsi buah & sayur**\n- **Konsumsi alkohol berlebihan**\n\n#### 🚬 **Gaya Hidup**\n- **Merokok aktif/pasif**\n- **Kurang aktivitas fisik** (<150 menit/minggu)\n- **Obesitas** (BMI ≥30 kg/m²)\n- **Stres kronik tidak terkendali**\n\n#### 🏥 **Kondisi Medis**\n- **Diabetes melitus**\n- **Dislipidemia** (kolesterol tinggi)\n- **Sleep apnea**\n- **Penyakit ginjal kronik**\n\n---\n\n### 📱 **WhatsApp Risk Assessment Center**\n\n**🔍 CEK RISIKO PERSONAL:**\n- **Risk Calculator:** [+62 815-CEK-RISIKO](https://wa.me/6281523574756?text=Halo,%20saya%20ingin%20cek%20risiko%20hipertensi%20berdasarkan%20kondisi%20saya)\n- **Family History:** [+62 826-KETURUNAN](https://wa.me/6282656847862?text=Selamat%20pagi,%20keluarga%20saya%20ada%20riwayat%20hipertensi,%20bagaimana%20pencegahannya?)\n\n**🍎 LIFESTYLE COACHING:**\n- **Diet Consultant:** [+62 837-DIET-BP](https://wa.me/6283734382727?text=Halo%20Nutritionist,%20saya%20butuh%20program%20diet%20untuk%20kontrol%20hipertensi)\n- **Fitness Coach:** [+62 848-FIT-HEART](https://wa.me/6284834843278?text=Hi%20Coach,%20saya%20ingin%20program%20olahraga%20yang%20aman%20untuk%20hipertensi)\n\n**🧘 STRESS MANAGEMENT:**\n- **Mindfulness Guide:** [+62 859-RELAX-BP](https://wa.me/6285973529727?text=Halo,%20saya%20stres%20dan%20tekanan%20darah%20tinggi,%20butuh%20bantuan%20relaksasi)\n- **Yoga Therapy:** [+62 860-YOGA-HEAL](https://wa.me/6286096844325?text=Selamat%20pagi,%20saya%20ingin%20yoga%20khusus%20untuk%20hipertensi)\n\n**🚭 QUIT SMOKING SUPPORT:**\n- **Stop Smoking:** [+62 871-QUIT-NOW](https://wa.me/6287168486693?text=Halo,%20saya%20perokok%20dengan%20hipertensi,%20ingin%20berhenti%20merokok)\n- **Nicotine Support:** [+62 882-NO-SMOKE](https://wa.me/6288266766537?text=Selamat%20pagi,%20saya%20butuh%20bantuan%20program%20berhenti%20merokok)\n\n### 📊 **Risk Stratification Tool**\n\n**RISIKO RENDAH (0-1 faktor):**\n- Monitor tekanan darah 6 bulan sekali\n- Fokus pada pencegahan primer\n\n**RISIKO SEDANG (2-3 faktor):**\n- Monitor tekanan darah 3 bulan sekali\n- Mulai intervensi gaya hidup intensif\n\n**RISIKO TINGGI (≥4 faktor):**\n- Monitor tekanan darah bulanan\n- Pertimbangkan terapi farmakologi\n\n### 💡 **Action Plan Berdasarkan Risiko:**\n\n#### ✅ **Program 30 Hari BP Control:**\n1. **Week 1:** Assessment & Goal Setting\n2. **Week 2:** Diet Modification (DASH Diet)\n3. **Week 3:** Exercise Program + Stress Management\n4. **Week 4:** Monitoring & Evaluation\n\n*Dengan mengenali faktor risiko, Anda dapat mengambil langkah proaktif untuk mencegah dan mengelola hipertensi! 🎯💪*",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-3",
            title: "Pengelolaan Non-Farmakologis",
            content:
              "## 🌿 Terapi Holistik Tanpa Obat\n\n### 💪 **PILAR UTAMA PENGELOLAAN NON-FARMAKOLOGIS**\n\n#### 🥗 **1. DIETARY APPROACHES (DASH Diet)**\n\n**🍎 Makanan yang DIANJURKAN:**\n- **Buah & Sayur:** 8-10 porsi/hari\n- **Whole Grains:** 6-8 porsi/hari\n- **Protein Tanpa Lemak:** Ikan, ayam tanpa kulit\n- **Kacang-kacangan:** 4-5 porsi/minggu\n- **Susu Rendah Lemak:** 2-3 porsi/hari\n\n**🚫 Makanan yang DIHINDARI:**\n- **Garam:** <2.3g natrium/hari (<1 sdt)\n- **Makanan Olahan:** Sosis, kornet, acar\n- **Fast Food:** Burger, pizza, kentang goreng\n- **Minuman Manis:** Soda, jus kemasan\n\n#### 🏃‍♂️ **2. AKTIVITAS FISIK TERSTRUKTUR**\n\n**🎯 Target Mingguan:**\n- **Aerobik:** 150 menit intensitas sedang ATAU 75 menit intensitas tinggi\n- **Strength Training:** 2-3x/minggu untuk semua grup otot\n- **Flexibility:** Stretching 2-3x/minggu\n\n**✅ Aktivitas yang Direkomendasikan:**\n- **Jalan Cepat:** 30 menit, 5x/minggu\n- **Berenang:** Ideal untuk lansia dan obesitas\n- **Bersepeda:** Low impact, fun activity\n- **Yoga/Tai Chi:** Kombinasi movement + relaxation\n\n#### 🧘 **3. MANAJEMEN STRES**\n\n**🌱 Teknik Relaksasi:**\n- **Deep Breathing:** 4-7-8 technique\n- **Progressive Muscle Relaxation**\n- **Mindfulness Meditation:** 10-20 menit/hari\n- **Guided Imagery**\n\n**😴 Sleep Hygiene:**\n- **Durasi:** 7-9 jam/malam untuk dewasa\n- **Sleep Schedule:** Tidur & bangun konsisten\n- **Sleep Environment:** Gelap, sejuk, hening\n\n---\n\n### 📱 **WhatsApp Lifestyle Transformation Center**\n\n**🍽️ NUTRITION COACHING:**\n- **DASH Diet Expert:** [+62 811-DASH-DIET](https://wa.me/6281134834383?text=Halo%20Nutritionist,%20saya%20ingin%20belajar%20DASH%20diet%20untuk%20hipertensi)\n- **Meal Prep Coach:** [+62 822-MEAL-PREP](https://wa.me/6282256257737?text=Selamat%20pagi,%20saya%20butuh%20bantuan%20meal%20prep%20untuk%20diet%20rendah%20garam)\n- **Recipe Creator:** [+62 833-RESEP-SEHAT](https://wa.me/6283373737732?text=Halo,%20saya%20ingin%20resep%20masakan%20sehat%20untuk%20hipertensi)\n\n**🏋️ FITNESS & EXERCISE:**\n- **Personal Trainer:** [+62 844-FIT-BP](https://wa.me/6284434827727?text=Hi%20Trainer,%20saya%20hipertensi%20ingin%20program%20olahraga%20yang%20aman)\n- **Home Workout:** [+62 855-HOME-GYM](https://wa.me/6285546636496?text=Halo,%20saya%20butuh%20panduan%20olahraga%20di%20rumah%20untuk%20turunkan%20tekanan%20darah)\n- **Walking Group:** [+62 866-WALK-CLUB](https://wa.me/6286696255256?text=Selamat%20pagi,%20saya%20ingin%20join%20walking%20group%20untuk%20hipertensi)\n\n**🧘 STRESS & MENTAL WELLNESS:**\n- **Meditation Guide:** [+62 877-MEDITATE](https://wa.me/6287763348283?text=Halo,%20saya%20stres%20dan%20tekanan%20darah%20tinggi,%20butuh%20bantuan%20meditasi)\n- **Breathwork Coach:** [+62 888-BREATHE](https://wa.me/6288827322834?text=Hi,%20saya%20ingin%20belajar%20teknik%20pernapasan%20untuk%20kontrol%20hipertensi)\n- **Sleep Specialist:** [+62 899-SLEEP-WELL](https://wa.me/6289975337355?text=Selamat%20malam,%20saya%20susah%20tidur%20dan%20hipertensi,%20butuh%20bantuan)\n\n**💨 LIFESTYLE MODIFICATION:**\n- **Smoking Cessation:** [+62 810-QUIT-SMOKE](https://wa.me/6281068487655?text=Halo,%20saya%20perokok%20hipertensi%20ingin%20berhenti%20total)\n- **Weight Management:** [+62 821-SLIM-DOWN](https://wa.me/6282175463936?text=Selamat%20pagi,%20saya%20obesitas%20dengan%20hipertensi,%20butuh%20program%20turun%20berat%20badan)\n\n### 📊 **Non-Pharmacological Impact**\n\n**🎯 Expected Blood Pressure Reduction:**\n- **DASH Diet:** ↓ 8-14 mmHg (sistolik)\n- **Weight Loss:** ↓ 5-20 mmHg per 10kg\n- **Exercise:** ↓ 4-9 mmHg (sistolik)\n- **Sodium Reduction:** ↓ 2-8 mmHg (sistolik)\n- **Alcohol Limitation:** ↓ 2-4 mmHg (sistolik)\n\n### 📈 **90-Day Transformation Program**\n\n**📅 Phase 1 (Days 1-30): Foundation**\n- Assessment & goal setting\n- DASH diet introduction\n- Basic exercise routine\n- Stress management basics\n\n**📅 Phase 2 (Days 31-60): Intensification**\n- Advanced nutrition planning\n- Structured exercise program\n- Sleep optimization\n- Social support building\n\n**📅 Phase 3 (Days 61-90): Mastery**\n- Lifestyle habit consolidation\n- Advanced stress techniques\n- Long-term maintenance planning\n- Community integration\n\n### 💡 **Quick Daily Checklist**\n\n✅ **Morning (6-9 AM):**\n- BP measurement\n- Healthy breakfast (DASH)\n- 20-minute walk\n- Medication (if prescribed)\n\n✅ **Afternoon (12-3 PM):**\n- Nutritious lunch\n- Stress break (5-10 min)\n- Hydration check\n\n✅ **Evening (6-9 PM):**\n- Light dinner\n- Relaxation time\n- Prepare for quality sleep\n- BP log update\n\n*Perubahan gaya hidup adalah investasi terbaik untuk kesehatan jangka panjang! 🌟💚*",
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
  {
    id: 4,
    slug: "usia-sekolah-remaja",
    title: "Modul Usia Sekolah & Remaja",
    description:
      "Memahami kesehatan dan perkembangan anak usia sekolah serta remaja, mencakup gizi, kesehatan reproduksi, dan masalah kesehatan mental.",
    duration: "4 jam 30 menit",
    lessons: 24,
    difficulty: "Menengah",
    category: "Usia Sekolah & Remaja",
    status: "not-started",
    progress: 0,
    rating: 4.7,
    students: 890,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Sarah Melissa",
    estimatedCompletion: "6 hari",
    overview:
      "Modul komprehensif tentang kesehatan anak usia sekolah dan remaja yang mencakup gizi seimbang, kesehatan reproduksi, pencegahan stunting, masalah kesehatan mental, dan deteksi dini gangguan perilaku untuk mendukung tumbuh kembang optimal.",
    learningObjectives: [
      "Memahami kebutuhan gizi anak usia sekolah dan remaja",
      "Menguasai konsep kesehatan reproduksi remaja yang sehat",
      "Dapat melakukan deteksi dini masalah kesehatan mental remaja",
      "Memahami pencegahan stunting pada usia sekolah",
      "Mampu memberikan edukasi kesehatan yang tepat untuk remaja",
    ],
    requirements: [
      "Pengetahuan dasar kesehatan remaja",
      "Pengalaman berinteraksi dengan anak sekolah",
      "Komitmen untuk belajar dan berempati",
    ],
    subMateris: [
      {
        id: "sub1-usia-sekolah",
        title: "Gizi Seimbang Anak Sekolah",
        description:
          "Memahami kebutuhan nutrisi yang tepat untuk mendukung pertumbuhan dan perkembangan anak usia sekolah",
        duration: "45 menit",
        isCompleted: false,
        isUnlocked: true,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin1-1-sekolah",
            title: "Kebutuhan Gizi Anak Sekolah",
            content:
              "## 🎓 Kebutuhan Gizi Anak Usia Sekolah (6-12 Tahun)\n\n### 📊 **Karakteristik Anak Usia Sekolah**\n\n**🧒 Perkembangan Fisik:**\n- **Pertumbuhan stabil:** 5-7 cm/tahun (tinggi badan)\n- **Penambahan berat:** 2-3 kg/tahun\n- **Perkembangan otot & tulang** yang pesat\n- **Aktivitas fisik tinggi** - butuh energi ekstra\n- **Konsentrasi belajar** membutuhkan nutrisi otak\n\n**🧠 Perkembangan Kognitif:**\n- Kemampuan belajar dan konsentrasi meningkat\n- Daya ingat dan pemahaman berkembang\n- Butuh nutrisi untuk mendukung fungsi otak optimal\n\n---\n\n### 🍎 **KEBUTUHAN GIZI HARIAN**\n\n#### ⚡ **Energi (Kalori)**\n| **Usia** | **Laki-laki** | **Perempuan** |\n|----------|---------------|---------------|\n| **6-9 tahun** | 1800 kkal | 1650 kkal |\n| **10-12 tahun** | 2100 kkal | 1900 kkal |\n\n#### 🥩 **Protein**\n- **Kebutuhan:** 1.2-1.5 g/kg berat badan/hari\n- **Sumber terbaik:** Telur, ikan, ayam, daging, susu, kacang-kacangan\n- **Fungsi:** Pertumbuhan otot, perbaikan jaringan, antibodi\n\n#### 🍞 **Karbohidrat (45-65% total kalori)**\n- **Kompleks:** Nasi merah, roti gandum, oat, ubi\n- **Hindari:** Gula berlebihan, permen, minuman manis\n- **Fungsi:** Sumber energi utama untuk aktivitas dan belajar\n\n#### 🥑 **Lemak Sehat (20-35% total kalori)**\n- **Sumber baik:** Ikan salmon, alpukat, kacang, minyak zaitun\n- **Hindari:** Gorengan, fast food, margarin\n- **Fungsi:** Perkembangan otak, penyerapan vitamin\n\n#### 🥬 **Vitamin & Mineral Penting**\n\n**🦴 Kalsium (800-1200 mg/hari):**\n- **Sumber:** Susu, yogurt, keju, ikan teri, bayam\n- **Fungsi:** Pertumbuhan tulang dan gigi\n\n**🩸 Zat Besi (8-10 mg/hari):**\n- **Sumber:** Daging merah, hati, bayam, kacang merah\n- **Fungsi:** Mencegah anemia, daya tahan tubuh\n\n**🌟 Vitamin A (400-600 mcg/hari):**\n- **Sumber:** Wortel, labu, mangga, hati\n- **Fungsi:** Kesehatan mata, sistem imun\n\n**🍊 Vitamin C (25-45 mg/hari):**\n- **Sumber:** Jeruk, jambu, tomat, brokoli\n- **Fungsi:** Daya tahan tubuh, penyerapan zat besi\n\n---\n\n### 🍽️ **POLA MAKAN IDEAL**\n\n#### � **Jadwal Makan Teratur**\n- **06:00-07:00** - Sarapan (25% kebutuhan kalori)\n- **10:00** - Snack pagi (10%)\n- **12:00-13:00** - Makan siang (30%)\n- **15:00** - Snack sore (10%)\n- **18:00-19:00** - Makan malam (25%)\n\n#### 🥞 **Sarapan Bergizi**\n**✅ Contoh Menu Sarapan Sehat:**\n- **Opsi 1:** Roti gandum + telur + susu + pisang\n- **Opsi 2:** Nasi + ayam + sayur + jus jeruk\n- **Opsi 3:** Oatmeal + susu + buah + kacang\n\n**🚫 Hindari:** Skip sarapan, makanan manis saja, minuman bersoda\n\n#### 🥗 **Bekal Sekolah Sehat**\n**💡 Tips Bekal Menarik:**\n- **Warna-warni:** Kombinasi sayur & buah berbeda warna\n- **Bentuk menarik:** Gunakan cetakan lucu\n- **Variasi:** Ganti menu setiap hari\n- **Praktis:** Mudah dimakan tanpa kotor\n\n**📝 Contoh Bekal:**\n- **Senin:** Nasi kepal + ayam + wortel rebus + apel\n- **Selasa:** Sandwich isi telur + selada + susu kotak\n- **Rabu:** Pasta + sosis + brokoli + jeruk\n\n---\n\n### � **WhatsApp Nutrition Support untuk Anak Sekolah**\n\n**🥗 MEAL PLANNING & RECIPES:**\n- **Menu Planner:** [+62 811-MENU-ANAK](https://wa.me/6281156686265?text=Halo%20Nutritionist,%20saya%20butuh%20bantuan%20menyusun%20menu%20mingguan%20untuk%20anak%20sekolah%20saya)\n- **Healthy Recipes:** [+62 822-RESEP-SEHAT](https://wa.me/6282273737328?text=Selamat%20pagi,%20saya%20ingin%20resep%20masakan%20bergizi%20yang%20disukai%20anak-anak)\n- **Lunch Box Ideas:** [+62 833-BEKAL-KREATIF](https://wa.me/6283323258258?text=Halo,%20saya%20butuh%20ide%20bekal%20sekolah%20yang%20menarik%20dan%20bergizi)\n\n**⚖️ WEIGHT & GROWTH MONITORING:**\n- **Growth Tracker:** [+62 844-TUMBUH-SEHAT](https://wa.me/6284487622482?text=Hi,%20saya%20ingin%20konsultasi%20pertumbuhan%20anak%20usia%20sekolah)\n- **BMI Calculator:** [+62 855-CEK-BMI](https://wa.me/6285523524354?text=Halo,%20saya%20ingin%20cek%20status%20gizi%20anak%20saya%20berdasarkan%20BMI)\n\n**🏃‍♂️ ACTIVE LIFESTYLE:**\n- **Sports Nutrition:** [+62 866-GIZI-OLAHRAGA](https://wa.me/6286669476947?text=Selamat%20pagi,%20anak%20saya%20aktif%20olahraga,%20bagaimana%20pola%20makannya?)\n- **Energy Booster:** [+62 877-STAMINA-ANAK](https://wa.me/6287778286828?text=Halo,%20anak%20saya%20sering%20lemas%20di%20sekolah,%20butuh%20saran%20nutrisi)\n\n**🧠 BRAIN FOOD:**\n- **Study Nutrition:** [+62 888-PINTAR-MAKAN](https://wa.me/6288876427642?text=Hi,%20saya%20ingin%20makanan%20yang%20bagus%20untuk%20konsentrasi%20belajar%20anak)\n- **Memory Booster:** [+62 899-DAYA-INGAT](https://wa.me/6289934958495?text=Halo,%20makanan%20apa%20yang%20bagus%20untuk%20daya%20ingat%20anak%20sekolah?)\n\n### 🎯 **MASALAH GIZI UMUM & SOLUSI**\n\n#### � **Anak Susah Makan**\n**Strategi:**\n- Libatkan anak dalam memasak\n- Sajikan porsi kecil tapi sering\n- Buat suasana makan menyenangkan\n- Jadi role model makan sehat\n\n#### 🍭 **Kecanduan Junk Food**\n**Solusi:**\n- Ganti bertahap dengan alternatif sehat\n- Buat snack sehat di rumah\n- Edukasi dampak junk food\n- Reward system untuk makan sehat\n\n#### 📚 **Kurang Konsentrasi Belajar**\n**Nutrisi Otak:**\n- **Omega-3:** Ikan, walnut, biji chia\n- **Protein:** Telur, susu, kacang\n- **Complex carbs:** Oat, quinoa\n- **Antioksidan:** Blueberry, dark chocolate\n\n### 💡 **Tips Praktis Orang Tua**\n\n#### ✅ **Do's:**\n- Sarapan bersama keluarga\n- Sediakan air putih cukup\n- Variasi menu setiap hari\n- Ajarkan anak memilih makanan sehat\n- Konsultasi rutin dengan ahli gizi\n\n#### ❌ **Don'ts:**\n- Memaksa anak menghabiskan makanan\n- Memberikan reward berupa makanan manis\n- Skip meal untuk diet\n- Terlalu banyak supplement tanpa konsultasi\n\n*Nutrisi yang tepat adalah investasi terbaik untuk masa depan anak! 🌟�*",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-2-sekolah",
            title: "Menu Sehat Anak Sekolah",
            content:
              '## �️ Panduan Menu Sehat Anak Sekolah\n\n### 🌈 **PRINSIP MENU SEHAT ANAK**\n\n#### 🎨 **Warna-Warni Alami**\n- **Merah:** Tomat, paprika, semangka, strawberry\n- **Orange:** Wortel, labu, jeruk, pepaya\n- **Kuning:** Jagung, pisang, kuning telur\n- **Hijau:** Bayam, brokoli, kacang panjang, alpukat\n- **Ungu:** Terong, anggur, ubi ungu\n\n#### ⚖️ **Proporsi Piring Sehat**\n- **1/2 Piring:** Sayur & buah (berbagai warna)\n- **1/4 Piring:** Karbohidrat kompleks\n- **1/4 Piring:** Protein berkualitas\n- **Pelengkap:** Air putih, susu rendah lemak\n\n---\n\n### 📅 **MENU MINGGUAN LENGKAP**\n\n#### 🌅 **MENU SARAPAN (06:00-07:00)**\n\n**📌 SENIN - "Monday Power"**\n- **Menu:** Nasi uduk + ayam goreng bumbu kuning + lalapan + sambal\n- **Buah:** Pisang ambon\n- **Minuman:** Susu coklat hangat\n- **Kalori:** ~520 kkal\n\n**📌 SELASA - "Tuesday Fresh"**\n- **Menu:** Roti gandum panggang + telur dadar sayur + keju\n- **Buah:** Jeruk manis\n- **Minuman:** Jus tomat segar\n- **Kalori:** ~485 kkal\n\n**📌 RABU - "Wednesday Boost"**\n- **Menu:** Bubur ayam + telur rebus + kerupuk + acar\n- **Buah:** Apel merah\n- **Minuman:** Teh manis hangat\n- **Kalori:** ~510 kkal\n\n**📌 KAMIS - "Thursday Energy"**\n- **Menu:** Mie ayam kuah + bakso + pangsit + sayur\n- **Buah:** Pepaya muda\n- **Minuman:** Air jeruk nipis\n- **Kalori:** ~495 kkal\n\n**📌 JUMAT - "Friday Fun"**\n- **Menu:** Pancake pisang + madu + mentega\n- **Tambahan:** Yogurt plain + granola\n- **Buah:** Strawberry\n- **Minuman:** Susu vanilla\n- **Kalori:** ~525 kkal\n\n**📌 SABTU - "Saturday Special"**\n- **Menu:** Nasi goreng sayuran + telur mata sapi + kerupuk\n- **Buah:** Melon kuning\n- **Minuman:** Es teh manis\n- **Kalori:** ~540 kkal\n\n**📌 MINGGU - "Sunday Delight"**\n- **Menu:** Roti bakar selai kacang + pisang + susu\n- **Tambahan:** Sereal gandum + buah\n- **Minuman:** Jus mangga\n- **Kalori:** ~500 kkal\n\n---\n\n#### 🍱 **MENU BEKAL SEKOLAH (10:00 Snack)**\n\n**🥪 SANDWICH KREATIF:**\n- **Classic Club:** Roti gandum + ayam + selada + tomat + mayo\n- **Tuna Delight:** Roti tawar + tuna + jagung + mentimun\n- **Egg Special:** Roti burger + telur dadar + keju + sayur\n\n**🍙 RICE BALL BENTO:**\n- **Onigiri Salmon:** Nasi + salmon asin + nori + wijen\n- **Chicken Teriyaki Ball:** Nasi + ayam teriyaki + wortel\n- **Veggie Supreme:** Nasi + sayur campur + telur\n\n**🥗 SALAD BOX:**\n- **Caesar Kids:** Selada + crouton + parmesan + dressing\n- **Fruit Salad:** Mix buah + yogurt + madu + granola\n- **Veggie Crunch:** Wortel + timun + paprika + hummus\n\n---\n\n#### 🍽️ **MENU MAKAN SIANG (12:00-13:00)**\n\n**🍛 NASI + LAUK LENGKAP:**\n\n**Senin:**\n- Nasi putih 150g\n- Rendang daging 50g\n- Sayur lodeh labu + tahu\n- Kerupuk udang\n- Es jeruk manis\n\n**Selasa:**\n- Nasi merah 150g\n- Ayam bakar madu\n- Capcay sayuran\n- Tempe goreng\n- Air putih\n\n**Rabu:**\n- Nasi putih 150g\n- Ikan bandeng presto\n- Sayur asem + jagung\n- Tahu isi\n- Es teh manis\n\n**Kamis:**\n- Nasi kuning 150g\n- Semur daging kentang\n- Gado-gado + lontong\n- Kerupuk gendar\n- Jus jambu\n\n**Jumat:**\n- Nasi putih 150g\n- Soto ayam + telur\n- Perkedel jagung\n- Rempeyek kacang\n- Air jeruk nipis\n\n---\n\n#### 🍰 **SNACK SORE SEHAT (15:00)**\n\n**🧁 HOMEMADE TREATS:**\n- **Mini Muffin:** Blueberry, pisang, wortel\n- **Cookies Sehat:** Oat, kismis, almond\n- **Pudding Buah:** Mangga, strawberry, alpukat\n- **Energy Balls:** Kurma, kacang, coklat dark\n\n**🥤 MINUMAN SEGAR:**\n- **Smoothie Bowl:** Pisang + yogurt + granola\n- **Infused Water:** Lemon + mint + timun\n- **Milkshake Sehat:** Alpukat + susu + madu\n- **Jus Sayur:** Wortel + apel + jeruk\n\n---\n\n#### 🌙 **MENU MAKAN MALAM (18:00-19:00)**\n\n**🍜 COMFORT FOOD:**\n- **Senin:** Sup ayam + nasi + tumis kangkung\n- **Selasa:** Spaghetti bolognese + salad + garlic bread\n- **Rabu:** Nasi tim ayam + sayur bayam + tahu\n- **Kamis:** Bubur kacang hijau + pisang goreng\n- **Jumat:** Pizza homemade + jus wortel\n- **Sabtu:** Nasi gudeg + ayam + telur + kerupuk\n- **Minggu:** Bakmi ayam + pangsit + es cendol\n\n---\n\n### 📱 **WhatsApp Menu Planning Service**\n\n**👨‍🍳 PERSONAL CHEF CONSULTATION:**\n- **Menu Designer:** [+62 811-CHEF-ANAK](https://wa.me/6281123424556?text=Halo%20Chef,%20saya%20butuh%20bantuan%20desain%20menu%20mingguan%20untuk%20anak%20sekolah)\n- **Recipe Developer:** [+62 822-RESEP-BARU](https://wa.me/6282273737373?text=Selamat%20pagi,%20saya%20ingin%20resep%20baru%20yang%20disukai%20anak-anak%20tapi%20tetap%20sehat)\n- **Cooking Teacher:** [+62 833-BELAJAR-MASAK](https://wa.me/6283324258258?text=Hi,%20saya%20ingin%20belajar%20memasak%20menu%20sehat%20untuk%20keluarga)\n\n**🛒 SHOPPING & PREP ASSISTANCE:**\n- **Shopping List:** [+62 844-BELANJA-SEHAT](https://wa.me/6284487654321?text=Halo,%20saya%20butuh%20shopping%20list%20untuk%20menu%20mingguan%20anak)\n- **Meal Prep Guide:** [+62 855-SIAP-MASAK](https://wa.me/6285512345678?text=Selamat%20pagi,%20saya%20ingin%20belajar%20meal%20prep%20yang%20efisien)\n- **Budget Planner:** [+62 866-HEMAT-BERGIZI](https://wa.me/6286698765432?text=Hi,%20saya%20butuh%20tips%20menu%20bergizi%20dengan%20budget%20terbatas)\n\n**📸 VISUAL MENU GALLERY:**\n- **Photo Ideas:** [+62 877-FOTO-MAKANAN](https://wa.me/6287787654321?text=Halo,%20saya%20ingin%20ide%20foto%20makanan%20yang%20menarik%20untuk%20anak)\n- **Plating Tutorial:** [+62 888-CANTIK-PIRING](https://wa.me/6288876543210?text=Hi,%20bagaimana%20cara%20menyajikan%20makanan%20yang%20menarik%20untuk%20anak?)\n\n### 🎨 **TIPS MEMBUAT MENU MENARIK**\n\n#### 👀 **Visual Appeal:**\n- **Bento Box:** Kotak bekal dengan sekat warna-warni\n- **Food Art:** Bentuk wajah, hewan, atau karakter\n- **Color Coordination:** Kombinasi warna yang harmonis\n- **Mini Portions:** Ukuran kecil tapi lengkap\n\n#### 🍴 **Tekstur Variety:**\n- **Crunchy:** Kerupuk, kacang, sayur mentah\n- **Soft:** Bubur, puding, buah matang\n- **Chewy:** Roti, pasta, daging\n- **Creamy:** Yogurt, soup, saus\n\n#### 🌟 **Flavor Balance:**\n- **Manis alami:** Buah, madu, kurma\n- **Gurih:** Keju, kaldu, bumbu alami\n- **Asam segar:** Jeruk, tomat, yogurt\n- **Pedas ringan:** Merica, jahe (sesuai toleransi)\n\n### 📊 **MEAL PLANNING TRACKER**\n\n#### ✅ **Weekly Checklist:**\n- [ ] 5 porsi sayur & buah/hari\n- [ ] 3 porsi susu & produk olahan/hari\n- [ ] 2-3 porsi protein/hari\n- [ ] 6-8 gelas air putih/hari\n- [ ] Minimal 3x makan utama\n- [ ] Maksimal 2x snack sehat\n\n#### 📈 **Progress Monitoring:**\n- **Berat badan:** Catat mingguan\n- **Tinggi badan:** Ukur bulanan\n- **Energi & mood:** Observasi harian\n- **Konsentrasi belajar:** Evaluasi mingguan\n- **Kesehatan umum:** Cek bulanan\n\n*Menu sehat yang menarik adalah kunci membentuk kebiasaan makan baik pada anak! ��*',
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin1-3-sekolah",
            title: "Pencegahan Obesitas",
            content:
              "## ⚖️ Pencegahan Obesitas pada Anak Sekolah\n\n### 📊 **MEMAHAMI OBESITAS ANAK**\n\n#### 🎯 **Definisi & Klasifikasi**\n\n**Obesitas pada anak** adalah kondisi kelebihan berat badan yang dapat membahayakan kesehatan, diukur berdasarkan:\n\n**📏 BMI (Body Mass Index) untuk Anak:**\n| **Kategori** | **Persentil BMI** | **Status** |\n|--------------|-------------------|------------|\n| **Underweight** | <5th percentile | Berat badan kurang |\n| **Normal** | 5th-85th percentile | Berat badan normal |\n| **Overweight** | 85th-95th percentile | Kelebihan berat badan |\n| **Obese** | ≥95th percentile | Obesitas |\n\n#### 📈 **Statistik Mengkhawatirkan**\n- **1 dari 5 anak** di Indonesia mengalami kelebihan berat badan\n- **Prevalensi obesitas anak** meningkat 3x lipat dalam 20 tahun terakhir\n- **Risiko obesitas dewasa:** 80% anak obesitas menjadi dewasa obesitas\n\n---\n\n### 🔍 **PENYEBAB OBESITAS ANAK**\n\n#### � **Faktor Diet & Konsumsi**\n- **Fast food berlebihan:** Burger, pizza, fried chicken\n- **Minuman manis:** Soda, jus kemasan, bubble tea\n- **Snack tidak sehat:** Keripik, permen, coklat berlebihan\n- **Porsi berlebihan:** \"Piring selalu harus habis\"\n- **Kurang serat:** Jarang makan sayur dan buah\n\n#### 📱 **Gaya Hidup Sedentary**\n- **Screen time berlebihan:** >2 jam/hari\n- **Kurang aktivitas fisik:** <60 menit/hari\n- **Gaming addiction:** Lupa waktu makan & gerak\n- **Transportasi pasif:** Selalu naik kendaraan\n\n#### 🧬 **Faktor Lain**\n- **Genetik:** Riwayat keluarga obesitas\n- **Psikologis:** Stress eating, emotional eating\n- **Sosial ekonomi:** Akses makanan sehat terbatas\n- **Kurang tidur:** <8 jam/malam untuk anak sekolah\n\n---\n\n### 🚨 **DAMPAK OBESITAS PADA ANAK**\n\n#### 🏥 **Masalah Kesehatan Fisik**\n- **Diabetes tipe 2:** Resistensi insulin\n- **Hipertensi:** Tekanan darah tinggi\n- **Kolesterol tinggi:** Risiko penyakit jantung\n- **Sleep apnea:** Gangguan pernapasan saat tidur\n- **Masalah tulang:** Beban berlebih pada sendi\n- **Pubertas dini:** Terutama pada anak perempuan\n\n#### 🧠 **Dampak Psikologis**\n- **Low self-esteem:** Kurang percaya diri\n- **Body image issues:** Tidak nyaman dengan tubuh\n- **Social isolation:** Dikucilkan teman\n- **Depression & anxiety:** Risiko gangguan mental\n- **Academic problems:** Sulit konsentrasi belajar\n\n#### 📚 **Dampak Akademik**\n- **Absen sekolah lebih sering** karena sakit\n- **Konsentrasi menurun** karena energi rendah\n- **Prestasi akademik menurun**\n- **Partisipasi olahraga terbatas**\n\n---\n\n### �️ **STRATEGI PENCEGAHAN KOMPREHENSIF**\n\n#### 🥗 **1. REVOLUSI POLA MAKAN**\n\n**✅ MAKANAN YANG DIANJURKAN:**\n- **Sayur & Buah:** 5-9 porsi/hari berbagai warna\n- **Protein lean:** Ikan, ayam tanpa kulit, tahu, tempe\n- **Karbohidrat kompleks:** Nasi merah, roti gandum, oat\n- **Susu rendah lemak:** 2-3 gelas/hari\n- **Air putih:** 6-8 gelas/hari\n\n**❌ MAKANAN YANG DIHINDARI:**\n- **Fast food:** Max 1x/minggu\n- **Minuman manis:** Ganti dengan infused water\n- **Gorengan:** Max 2-3x/minggu\n- **Permen & coklat:** Sebagai reward sesekali\n- **Snack kemasan:** Ganti dengan buah segar\n\n**📏 KONTROL PORSI:**\n- **Gunakan piring kecil** untuk kontrol visual\n- **Aturan 1/2-1/4-1/4:** Setengah sayur, seperempat protein, seperempat karbo\n- **Makan perlahan:** 20 menit per meal\n- **Stop saat 80% kenyang**\n\n#### 🏃‍♂️ **2. AKTIVITAS FISIK FUN**\n\n**🎯 Target Harian:** Minimal 60 menit aktivitas sedang-berat\n\n**🏐 OLAHRAGA TERSTRUKTUR (30 menit):**\n- **Senin:** Sepak bola mini\n- **Selasa:** Badminton\n- **Rabu:** Berenang\n- **Kamis:** Basket\n- **Jumat:** Senam aerobik\n- **Sabtu:** Bersepeda\n- **Minggu:** Hiking ringan\n\n**🚶‍♂️ AKTIVITAS HARIAN (30 menit):**\n- **Jalan kaki ke sekolah** (jika memungkinkan)\n- **Naik turun tangga** instead of lift\n- **Bermain di taman** setelah sekolah\n- **Bantu pekerjaan rumah** yang aktif\n- **Dancing** dengan musik favorit\n\n#### 📱 **3. MANAJEMEN SCREEN TIME**\n\n**⏰ ATURAN 2-1-1:**\n- **Max 2 jam** screen time hiburan/hari\n- **1 jam** sebelum tidur tanpa gadget\n- **1 hari** dalam seminggu gadget-free\n\n**🔄 ALTERNATIF AKTIVITAS:**\n- **Reading time:** Baca buku cerita\n- **Creative time:** Menggambar, crafting\n- **Social time:** Bermain dengan teman\n- **Nature time:** Eksplorasi alam\n\n---\n\n### � **WhatsApp Obesity Prevention Center**\n\n**⚖️ WEIGHT MANAGEMENT SUPPORT:**\n- **Pediatric Nutritionist:** [+62 811-GIZI-ANAK](https://wa.me/6281167458924?text=Halo%20Dokter,%20anak%20saya%20kelebihan%20berat%20badan,%20butuh%20program%20diet%20sehat)\n- **Child Obesity Specialist:** [+62 822-OBESITAS-ANAK](https://wa.me/6282234567890?text=Selamat%20pagi,%20saya%20khawatir%20anak%20saya%20mengalami%20obesitas,%20mohon%20konsultasi)\n- **Family Diet Coach:** [+62 833-DIET-KELUARGA](https://wa.me/6283345678901?text=Hi,%20saya%20ingin%20program%20diet%20sehat%20untuk%20seluruh%20keluarga)\n\n**🏃‍♂️ FITNESS & ACTIVITY COACHING:**\n- **Kids Fitness Trainer:** [+62 844-FIT-KIDS](https://wa.me/6284456789012?text=Halo%20Coach,%20saya%20butuh%20program%20olahraga%20yang%20menyenangkan%20untuk%20anak%20obesitas)\n- **Fun Exercise Ideas:** [+62 855-GERAK-SERU](https://wa.me/6285567890123?text=Hi,%20saya%20ingin%20ide%20aktivitas%20fisik%20yang%20disukai%20anak-anak)\n- **Sports Beginner:** [+62 866-MULAI-OLAHRAGA](https://wa.me/6286678901234?text=Selamat%20pagi,%20anak%20saya%20belum%20pernah%20olahraga,%20dari%20mana%20mulainya?)\n\n**🧠 PSYCHOLOGICAL SUPPORT:**\n- **Child Psychologist:** [+62 877-MENTAL-ANAK](https://wa.me/6287789012345?text=Halo%20Psikolog,%20anak%20saya%20stress%20karena%20berat%20badan,%20butuh%20bantuan)\n- **Self-Esteem Coach:** [+62 888-PERCAYA-DIRI](https://wa.me/6288890123456?text=Hi,%20anak%20saya%20minder%20karena%20tubuhnya,%20bagaimana%20membangun%20confidence?)\n- **Bullying Support:** [+62 899-ANTI-BULLY](https://wa.me/6289901234567?text=Urgent:%20anak%20saya%20di-bully%20karena%20berat%20badan,%20butuh%20dukungan)\n\n**👨‍👩‍👧‍👦 FAMILY SUPPORT SYSTEM:**\n- **Parent Coaching:** [+62 810-ORTU-SUPPORT](https://wa.me/6281012345678?text=Halo,%20saya%20orangtua%20bingung%20cara%20membantu%20anak%20turun%20berat%20badan%20dengan%20sehat)\n- **Siblings Support:** [+62 821-KAKAK-ADIK](https://wa.me/6282123456789?text=Hi,%20bagaimana%20cara%20melibatkan%20seluruh%20keluarga%20dalam%20program%20sehat?)\n\n### 🎯 **PROGRAM PENURUNAN BERAT BADAN SEHAT**\n\n#### � **12-Week Transformation Plan**\n\n**🌱 PHASE 1: Foundation (Week 1-4)**\n- **Goal:** Pembentukan kebiasaan dasar\n- **Diet:** Ganti 1 junk food dengan healthy snack\n- **Exercise:** 30 menit aktivitas fun/hari\n- **Target:** 0.5-1 kg/bulan weight loss\n\n**💪 PHASE 2: Acceleration (Week 5-8)**\n- **Goal:** Intensifikasi program\n- **Diet:** Full healthy meal plan\n- **Exercise:** 45 menit kombinasi cardio + strength\n- **Target:** 1-1.5 kg/bulan weight loss\n\n**🏆 PHASE 3: Maintenance (Week 9-12)**\n- **Goal:** Stabilisasi dan habit formation\n- **Diet:** Balanced eating dengan cheat meal terkontrol\n- **Exercise:** Variasi olahraga untuk sustainability\n- **Target:** Maintain healthy weight + muscle gain\n\n#### 📊 **Monitoring Tools**\n\n**📱 DIGITAL TRACKING:**\n- **Food diary:** Catat semua yang dimakan\n- **Activity tracker:** Hitung langkah & kalori\n- **Mood journal:** Hubungan emosi dengan makan\n- **Sleep tracker:** Kualitas dan durasi tidur\n\n**📏 PHYSICAL MEASUREMENTS:**\n- **Weight:** Weekly (same time, same clothes)\n- **BMI:** Monthly calculation\n- **Body fat percentage:** Jika ada alat\n- **Waist circumference:** Monthly\n- **Photos:** Progress pics monthly\n\n### 🏆 **SUCCESS STRATEGIES**\n\n#### 👨‍👩‍👧‍👦 **Whole Family Approach**\n- **Grocery shopping bersama:** Ajari pilih makanan sehat\n- **Cooking together:** Libatkan anak dalam memasak\n- **Family meal time:** Makan bersama tanpa gadget\n- **Active family time:** Olahraga atau jalan bersama\n\n#### 🎁 **Positive Reinforcement**\n- **Non-food rewards:** Sticker, mainan, aktivitas special\n- **Celebrate small wins:** Setiap progress kecil dihargai\n- **Focus on health:** Bukan hanya angka timbangan\n- **Body positive language:** Hindari fat-shaming\n\n#### 🏫 **School Collaboration**\n- **Talk to teachers:** Inform tentang program diet\n- **Healthy lunch policy:** Koordinasi menu kantin\n- **PE participation:** Encourage olahraga di sekolah\n- **Anti-bullying:** Pastikan anak aman dari bullying\n\n### ⚠️ **RED FLAGS - Kapan Harus ke Dokter**\n\n**🚨 SEGERA KONSULTASI jika:**\n- **BMI >95th percentile** untuk usia\n- **Komplikasi medis:** Diabetes, hipertensi\n- **Gangguan makan:** Binge eating, bulimia\n- **Depresi berat:** Isolasi, thoughts of self-harm\n- **Physical limitations:** Susah bernapas, nyeri sendi\n\n### 💡 **Tips Praktis Anti-Obesitas**\n\n#### ✅ **Do's:**\n- **Start small:** Perubahan bertahap\n- **Be patient:** Weight loss sehat = 0.5-1kg/bulan\n- **Focus on habits:** Bukan quick fixes\n- **Include variety:** Menu dan aktivitas beragam\n- **Get support:** Libatkan keluarga dan profesional\n\n#### ❌ **Don'ts:**\n- **Crash diet:** Sangat berbahaya untuk anak\n- **Fat-shaming:** Merusak mental anak\n- **Forbid completely:** Justru bikin pengen\n- **Compare with others:** Setiap anak unik\n- **Skip meals:** Malah bikin makan berlebihan nanti\n\n*Pencegahan obesitas adalah investasi kesehatan seumur hidup! 🌟💪*",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz1-1-sekolah",
            question:
              "Berapa kali sebaiknya anak usia sekolah makan dalam sehari?",
            options: ["2 kali", "3 kali", "4-5 kali", "6 kali"],
            correctAnswer: 2,
            explanation:
              "Anak usia sekolah sebaiknya makan 4-5 kali sehari (3 kali makan utama + 2 kali snack sehat) untuk memenuhi kebutuhan energi yang tinggi.",
          },
          {
            id: "quiz1-2-sekolah",
            question:
              "Apa yang termasuk dalam gizi seimbang untuk anak sekolah?",
            options: [
              "Hanya karbohidrat dan protein",
              "Karbohidrat, protein, lemak, vitamin, mineral",
              "Hanya vitamin dan mineral",
              "Hanya makanan manis",
            ],
            correctAnswer: 1,
            explanation:
              "Gizi seimbang untuk anak sekolah harus mencakup karbohidrat, protein, lemak sehat, vitamin, dan mineral dalam proporsi yang tepat.",
          },
        ],
      },
      {
        id: "sub2-usia-sekolah",
        title: "Kesehatan Reproduksi Remaja",
        description:
          "Memberikan edukasi komprehensif tentang kesehatan reproduksi yang sehat dan aman bagi remaja",
        duration: "60 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin2-1-sekolah",
            title: "Perubahan Fisik Remaja",
            content:
              "## 🧬 Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Perubahan Fisik Remaja** sedang dikembangkan dengan pendekatan yang sensitif dan edukatif.\n\n### 📱 Konsultasi Privat & Aman\nUntuk topik sensitif ini, kami menyediakan layanan konsultasi yang aman dan privat:\n\n**📞 WhatsApp Konsultasi Khusus:**\n- **Konselor Remaja:** [+62 817-8899-0011](https://wa.me/6281788990011?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20perubahan%20fisik%20remaja%20dengan%20aman)\n- **Ahli Kesehatan Reproduksi:** [+62 828-9900-1122](https://wa.me/6282899001122?text=Selamat%20pagi,%20saya%20butuh%20informasi%20tentang%20kesehatan%20reproduksi%20remaja)\n\n### 🔒 Fitur Privasi Terjamin\n- **Konsultasi Rahasia** 100% privat\n- **Panduan Orang Tua** terpisah\n- **Materi Age-Appropriate** sesuai usia\n- **Professional Support** 24/7\n\nKami peduli dengan privasi dan kenyamanan Anda! 🛡️💙",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-2-sekolah",
            title: "Kesehatan Menstruasi",
            content:
              "## 🌸 Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Kesehatan Menstruasi** sedang dikembangkan dengan pendekatan yang komprehensif dan ramah remaja.\n\n### 📱 Support Khusus Remaja Putri\nLayanan konsultasi khusus untuk remaja putri:\n\n**📞 WhatsApp Sister Support:**\n- **Kakak Konselor:** [+62 819-0011-2233](https://wa.me/6281900112233?text=Halo%20Kak,%20saya%20ingin%20bertanya%20tentang%20kesehatan%20menstruasi)\n- **Bidan Remaja:** [+62 830-1122-3344](https://wa.me/6283011223344?text=Selamat%20pagi%20Bu%20Bidan,%20saya%20butuh%20informasi%20tentang%20menstruasi)\n\n### 🌺 Features Coming Soon\n- **Period Tracker** digital\n- **Myth vs Facts** tentang menstruasi\n- **Emergency Kit** guide\n- **Support Group** online aman\n\nBersama kita belajar dengan nyaman! 🌸💕",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin2-3-sekolah",
            title: "Pencegahan Kehamilan Remaja",
            content:
              "## 👶 Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Pencegahan Kehamilan Remaja** sedang dikembangkan dengan pendekatan edukatif yang bertanggung jawab.\n\n### 📱 Konsultasi Keluarga\nLayanan konsultasi untuk remaja dan keluarga:\n\n**📞 WhatsApp Family Support:**\n- **Konselor Keluarga:** [+62 821-2233-4455](https://wa.me/6282122334455?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20pendidikan%20seks%20untuk%20remaja)\n- **Psikolog Remaja:** [+62 832-3344-5566](https://wa.me/6283233445566?text=Selamat%20pagi,%20saya%20butuh%20guidance%20untuk%20bicara%20dengan%20remaja%20tentang%20seksualitas)\n\n### 🎯 Educational Focus\n- **Pendidikan Seks** yang sehat\n- **Communication Skills** orang tua-anak\n- **Risk Awareness** yang tepat\n- **Support System** yang kuat\n\nPendidikan yang tepat adalah kunci! 🔑📚",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz2-1-sekolah",
            question:
              "Pada usia berapa umumnya remaja putri mengalami menstruasi pertama?",
            options: [
              "8-10 tahun",
              "11-13 tahun",
              "14-16 tahun",
              "17-19 tahun",
            ],
            correctAnswer: 1,
            explanation:
              "Umumnya remaja putri mengalami menstruasi pertama (menarche) pada usia 11-13 tahun, meskipun rentang normal adalah 9-16 tahun.",
          },
          {
            id: "quiz2-2-sekolah",
            question:
              "Apa yang penting dalam edukasi kesehatan reproduksi remaja?",
            options: [
              "Hanya aspek biologis",
              "Informasi yang akurat, komunikasi terbuka, dan dukungan",
              "Hanya larangan",
              "Menunggu sampai dewasa",
            ],
            correctAnswer: 1,
            explanation:
              "Edukasi kesehatan reproduksi remaja harus mencakup informasi yang akurat, komunikasi terbuka, dan dukungan dari keluarga serta lingkungan.",
          },
        ],
      },
      {
        id: "sub3-usia-sekolah",
        title: "Kesehatan Mental Remaja",
        description:
          "Memahami dan mendeteksi masalah kesehatan mental pada remaja serta cara penanganannya",
        duration: "50 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin3-1-sekolah",
            title: "Deteksi Dini Depresi Remaja",
            content:
              "## 🧠 Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Deteksi Dini Depresi Remaja** sedang dikembangkan dengan pendekatan yang sangat sensitif dan profesional.\n\n### 📱 Mental Health Support\nLayanan darurat dan konsultasi kesehatan mental:\n\n**📞 Crisis & Support Hotline:**\n- **Psikolog Darurat:** [+62 823-4455-6677](https://wa.me/6282344556677?text=URGENT:%20Saya%20membutuhkan%20bantuan%20darurat%20terkait%20kesehatan%20mental%20remaja)\n- **Konselor 24/7:** [+62 834-5566-7788](https://wa.me/6283455667788?text=Halo,%20saya%20butuh%20konsultasi%20segera%20tentang%20kesehatan%20mental%20remaja)\n- **Teen Helpline:** [+62 845-6677-8899](https://wa.me/6284566778899?text=Hi,%20saya%20remaja%20yang%20butuh%20bantuan%20dan%20dukungan)\n\n### 🆘 Emergency Features\n- **Crisis Intervention** immediate response\n- **Peer Support Groups** aman\n- **Parent Guidance** komprehensif\n- **Professional Referral** network\n\n**⚠️ Jika ini adalah keadaan darurat, segera hubungi 119 atau bawa ke UGD terdekat!**\n\nAnda tidak sendirian! 💙🤝",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-2-sekolah",
            title: "Manajemen Stres Sekolah",
            content:
              "## 📚 Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Manajemen Stres Sekolah** sedang dikembangkan dengan teknik-teknik modern yang mudah dipraktikkan.\n\n### 📱 Stress Management Support\nLayanan bantuan untuk mengatasi stres akademik:\n\n**📞 Academic Wellness Support:**\n- **Study Coach:** [+62 825-7788-9900](https://wa.me/6282577889900?text=Halo,%20saya%20butuh%20bantuan%20mengatasi%20stres%20belajar)\n- **Mindfulness Guide:** [+62 836-8899-0011](https://wa.me/6283688990011?text=Selamat%20pagi,%20saya%20ingin%20belajar%20teknik%20relaksasi%20untuk%20remaja)\n- **Peer Counselor:** [+62 847-9900-1122](https://wa.me/6284799001122?text=Hi,%20saya%20remaja%20yang%20stress%20dengan%20sekolah,%20bisa%20bantu?)\n\n### 🧘‍♀️ Wellness Tools Preview\n- **Meditation Apps** recommendations\n- **Breathing Exercises** guided\n- **Time Management** strategies\n- **Study-Life Balance** tips\n\nMari belajar mengelola stres dengan baik! 🌈✨",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin3-3-sekolah",
            title: "Dukungan Keluarga",
            content:
              "## 👨‍👩‍👧‍👦 Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Dukungan Keluarga** untuk kesehatan mental remaja sedang dikembangkan dengan pendekatan yang holistik.\n\n### 📱 Family Support Network\nLayanan konsultasi untuk keluarga:\n\n**📞 Family Harmony Support:**\n- **Family Therapist:** [+62 827-0011-2233](https://wa.me/6282700112233?text=Halo,%20saya%20orang%20tua%20yang%20ingin%20konsultasi%20tentang%20kesehatan%20mental%20anak%20remaja)\n- **Parent Coach:** [+62 838-1122-3344](https://wa.me/6283811223344?text=Selamat%20pagi,%20saya%20butuh%20guidance%20cara%20mendukung%20remaja%20di%20rumah)\n- **Teen Mediator:** [+62 849-2233-4455](https://wa.me/6284922334455?text=Halo,%20keluarga%20kami%20butuh%20bantuan%20mediasi%20dengan%20anak%20remaja)\n\n### 🏠 Family Wellness Features\n- **Communication Workshop** online\n- **Family Activity** suggestions\n- **Conflict Resolution** guides\n- **Bonding Strategies** practical\n\nKeluarga yang kuat, remaja yang sehat! 💪👨‍👩‍👧‍👦",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz3-1-sekolah",
            question: "Apa tanda-tanda awal depresi pada remaja?",
            options: [
              "Hanya sedih sesekali",
              "Perubahan pola tidur, nafsu makan, dan menarik diri",
              "Hanya malas belajar",
              "Suka bermain game",
            ],
            correctAnswer: 1,
            explanation:
              "Tanda awal depresi remaja meliputi perubahan pola tidur, nafsu makan, menarik diri dari aktivitas sosial, dan perubahan mood yang signifikan.",
          },
        ],
      },
      {
        id: "sub4-usia-sekolah",
        title: "Pencegahan Stunting Usia Sekolah",
        description:
          "Memahami pencegahan dan penanganan stunting pada anak usia sekolah",
        duration: "40 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin4-1-sekolah",
            title: "Catch-up Growth",
            content:
              "## 📈 Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Catch-up Growth** sedang dikembangkan dengan pendekatan yang komprehensif dan evidence-based.\n\n### 📱 Growth Support Center\nLayanan konsultasi untuk optimalisasi pertumbuhan:\n\n**📞 Growth Development Support:**\n- **Pediatric Nutritionist:** [+62 829-3344-5566](https://wa.me/6282933445566?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20catch-up%20growth%20untuk%20anak%20sekolah)\n- **Growth Specialist:** [+62 840-4455-6677](https://wa.me/6284044556677?text=Selamat%20pagi,%20anak%20saya%20mengalami%20stunting,%20bagaimana%20cara%20mengatasinya?)\n- **Diet Planner:** [+62 851-5566-7788](https://wa.me/6285155667788?text=Halo,%20saya%20butuh%20rencana%20diet%20khusus%20untuk%20catch-up%20growth)\n\n### 📊 Growth Tracking Tools\n- **Growth Chart** digital interactive\n- **Nutrition Calculator** advanced\n- **Meal Planning** personalized\n- **Progress Monitor** real-time\n\nSetiap anak berhak tumbuh optimal! 🌱💪",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin4-2-sekolah",
            title: "Intervensi Gizi Sekolah",
            content:
              "## 🍎 Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Intervensi Gizi Sekolah** sedang dikembangkan dengan kolaborasi sekolah dan keluarga.\n\n### 📱 School Nutrition Support\nLayanan khusus untuk program gizi di sekolah:\n\n**📞 School Health Program:**\n- **School Nutritionist:** [+62 831-6677-8899](https://wa.me/6283166778899?text=Halo,%20saya%20dari%20sekolah%20ingin%20konsultasi%20program%20gizi%20untuk%20mencegah%20stunting)\n- **Canteen Consultant:** [+62 842-7788-9900](https://wa.me/6284277889900?text=Selamat%20pagi,%20saya%20ingin%20konsultasi%20menu%20kantin%20sehat%20untuk%20anak%20sekolah)\n- **Teacher Training:** [+62 853-8899-0011](https://wa.me/6285388990011?text=Halo,%20saya%20guru%20yang%20ingin%20belajar%20tentang%20deteksi%20stunting%20di%20sekolah)\n\n### 🏫 School Program Features\n- **Canteen Makeover** healthy menu\n- **Teacher Training** nutrition awareness\n- **Parent Workshop** home-school collaboration\n- **Student Education** fun and interactive\n\nSekolah sehat, anak tumbuh optimal! 🏫🌟",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz4-1-sekolah",
            question: "Apa yang dimaksud dengan catch-up growth?",
            options: [
              "Pertumbuhan normal",
              "Pertumbuhan cepat untuk mengejar ketinggalan",
              "Pertumbuhan lambat",
              "Pertumbuhan berlebihan",
            ],
            correctAnswer: 1,
            explanation:
              "Catch-up growth adalah periode pertumbuhan yang dipercepat untuk mengejar ketinggalan pertumbuhan akibat stunting atau malnutrisi sebelumnya.",
          },
        ],
      },
      {
        id: "sub5-usia-sekolah",
        title: "Aktivitas Fisik & Olahraga",
        description:
          "Pentingnya aktivitas fisik dan olahraga untuk kesehatan anak usia sekolah dan remaja",
        duration: "35 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin5-1-sekolah",
            title: "Program Olahraga Sekolah",
            content:
              "## 🏃‍♀️ Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Program Olahraga Sekolah** sedang dikembangkan dengan pendekatan yang menyenangkan dan berkelanjutan.\n\n### 📱 Sports & Fitness Support\nLayanan konsultasi untuk program olahraga:\n\n**📞 Active Kids Support:**\n- **Sports Coach:** [+62 833-9900-1122](https://wa.me/6283399001122?text=Halo%20Coach,%20saya%20ingin%20konsultasi%20program%20olahraga%20yang%20tepat%20untuk%20anak%20sekolah)\n- **PE Teacher:** [+62 844-0011-2233](https://wa.me/6284400112233?text=Selamat%20pagi,%20saya%20guru%20olahraga%20yang%20ingin%20program%20aktivitas%20fisik%20menarik)\n- **Fitness Guide:** [+62 855-1122-3344](https://wa.me/6285511223344?text=Halo,%20saya%20butuh%20panduan%20olahraga%20yang%20aman%20untuk%20remaja)\n\n### 🏆 Sports Program Features\n- **Fun Sports** activities catalog\n- **Safety Guidelines** comprehensive\n- **Equipment Guide** budget-friendly\n- **Competition Ideas** engaging\n\nBergerak itu menyenangkan! 🏃‍♂️⚽",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin5-2-sekolah",
            title: "Pencegahan Cedera Olahraga",
            content:
              "## 🩹 Konten Sedang Dalam Pengembangan\n\n### 🌟 Fitur Pelaporan WhatsApp\nMateri tentang **Pencegahan Cedera Olahraga** sedang dikembangkan dengan protokol keamanan terkini.\n\n### 📱 Sports Safety Support\nLayanan darurat dan pencegahan cedera:\n\n**📞 Sports Safety Hotline:**\n- **Sports Medicine:** [+62 835-2233-4455](https://wa.me/6283522334455?text=URGENT:%20Ada%20cedera%20olahraga%20pada%20anak,%20butuh%20bantuan%20segera!)\n- **First Aid Guide:** [+62 846-3344-5566](https://wa.me/6284633445566?text=Halo,%20saya%20butuh%20panduan%20pertolongan%20pertama%20untuk%20cedera%20ringan)\n- **Injury Prevention:** [+62 857-4455-6677](https://wa.me/6285744556677?text=Selamat%20pagi,%20saya%20ingin%20belajar%20cara%20mencegah%20cedera%20saat%20olahraga)\n\n### 🛡️ Safety First Features\n- **Emergency Protocol** step-by-step\n- **Prevention Checklist** comprehensive\n- **Recovery Guide** professional\n- **When to See Doctor** guidelines\n\n**⚠️ Jika cedera serius, segera bawa ke dokter atau UGD!**\n\nSafety first, fun always! 🛡️🏃‍♀️",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz5-1-sekolah",
            question:
              "Berapa lama durasi aktivitas fisik yang direkomendasikan untuk anak sekolah per hari?",
            options: ["30 menit", "45 menit", "60 menit", "90 menit"],
            correctAnswer: 2,
            explanation:
              "WHO merekomendasikan anak usia sekolah melakukan aktivitas fisik sedang hingga berat minimal 60 menit per hari untuk kesehatan optimal.",
          },
        ],
      },
      {
        id: "sub6-usia-sekolah",
        title: "Imunisasi dan Pencegahan Penyakit",
        description:
          "Memahami pentingnya imunisasi lanjutan dan pencegahan penyakit pada anak usia sekolah dan remaja",
        duration: "40 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin6-1-sekolah",
            title: "Jadwal Imunisasi Anak Sekolah",
            content:
              "## 💉 Imunisasi Lanjutan untuk Anak Sekolah\n\n### 📅 **JADWAL IMUNISASI USIA SEKOLAH**\n\n#### 🎯 **Imunisasi Wajib (Program Pemerintah)**\n\n**📍 KELAS 1 SD (Usia 6-7 tahun):**\n- **DT (Difteri-Tetanus):** Booster untuk perlindungan lanjutan\n- **Campak:** Dosis kedua untuk immunity lengkap\n- **Polio:** Tetes (OPV) sebagai booster\n\n**📍 KELAS 2-3 SD (Usia 8-9 tahun):**\n- **Td (Tetanus-difteri):** Setiap 10 tahun sekali\n- **HPV:** Khusus anak perempuan (2-3 dosis)\n\n**📍 KELAS 6 SD (Usia 11-12 tahun):**\n- **Td Booster:** Perlindungan tetanus lanjutan\n- **HPV Complete:** Dosis lengkap untuk perempuan\n\n#### 🏥 **Imunisasi Tambahan (Rekomendasi)**\n\n**🦠 Hepatitis A:**\n- **Usia:** 12-23 bulan (catch-up hingga 18 tahun)\n- **Dosis:** 2 kali, jarak 6-12 bulan\n- **Manfaat:** Cegah hepatitis A, terutama area endemis\n\n**🫁 Pneumokokus (PCV):**\n- **Usia:** Catch-up hingga 5 tahun\n- **Dosis:** Sesuai usia saat mulai\n- **Manfaat:** Cegah pneumonia, meningitis\n\n**🧠 Meningokokus:**\n- **Usia:** 11-12 tahun, booster 16-18 tahun\n- **Dosis:** 1-2 kali tergantung jenis\n- **Manfaat:** Cegah meningitis bakterial\n\n**🌍 Japanese Encephalitis:**\n- **Usia:** >9 bulan di area endemis\n- **Dosis:** 2 kali, jarak 28 hari\n- **Booster:** 1-2 tahun kemudian\n\n---\n\n### 🛡️ **MANFAAT IMUNISASI**\n\n#### 🔬 **Perlindungan Individual**\n- **Immunity aktif:** Tubuh belajar melawan penyakit\n- **Long-lasting protection:** Bertahan bertahun-tahun\n- **Reduced severity:** Jika terinfeksi, gejala lebih ringan\n- **Prevent complications:** Hindari komplikasi serius\n\n#### 👥 **Perlindungan Komunitas (Herd Immunity)**\n- **Protect vulnerable:** Bayi, lansia, immunocompromised\n- **Break transmission:** Putus rantai penularan\n- **Eradication potential:** Eliminasi penyakit seperti polio\n- **Cost-effective:** Lebih murah dari pengobatan\n\n---\n\n### 📱 **WhatsApp Immunization Support Center**\n\n**💉 VACCINATION SCHEDULING:**\n- **Imunisasi Reminder:** [+62 811-JADWAL-VAKSIN](https://wa.me/6281167452389?text=Halo,%20saya%20butuh%20reminder%20jadwal%20imunisasi%20anak%20sekolah)\n- **Catch-up Program:** [+62 822-KEJAR-VAKSIN](https://wa.me/6282234567891?text=Selamat%20pagi,%20anak%20saya%20belum%20lengkap%20imunisasinya,%20bagaimana%20mengejar?)\n- **School Health Officer:** [+62 833-KESEHATAN-SEKOLAH](https://wa.me/6283345678912?text=Hi,%20saya%20dari%20sekolah%20ingin%20koordinasi%20program%20imunisasi)\n\n**🩺 MEDICAL CONSULTATION:**\n- **Pediatric Immunologist:** [+62 844-DOKTER-IMUN](https://wa.me/6284456789123?text=Halo%20Dokter,%20saya%20ingin%20konsultasi%20tentang%20imunisasi%20anak)\n- **Allergy Specialist:** [+62 855-ALERGI-VAKSIN](https://wa.me/6285567891234?text=Hi,%20anak%20saya%20alergi,%20vaksin%20mana%20yang%20aman?)\n- **Travel Medicine:** [+62 866-VAKSIN-TRAVEL](https://wa.me/6286678912345?text=Selamat%20pagi,%20vaksin%20apa%20yang%20perlu%20untuk%20travel%20dengan%20anak?)\n\n**📊 TRACKING & RECORDS:**\n- **Digital Record:** [+62 877-REKAM-VAKSIN](https://wa.me/6287789123456?text=Halo,%20saya%20ingin%20digitalisasi%20catatan%20imunisasi%20anak)\n- **School Requirements:** [+62 888-SYARAT-SEKOLAH](https://wa.me/6288891234567?text=Hi,%20vaksin%20apa%20saja%20yang%20wajib%20untuk%20masuk%20sekolah?)\n\n### 🎯 **PENCEGAHAN PENYAKIT MENULAR**\n\n#### 🤧 **Penyakit Pernapasan**\n\n**😷 COVID-19:**\n- **Vaksinasi:** Sesuai rekomendasi terbaru\n- **Protokol kesehatan:** Masker, jaga jarak, cuci tangan\n- **Gejala:** Demam, batuk, sesak, hilang penciuman\n- **Isolasi:** 5-10 hari jika positif\n\n**🤒 Influenza:**\n- **Vaksin tahunan:** Oktober-November setiap tahun\n- **Pencegahan:** Hindari kerumunan saat musim flu\n- **Gejala:** Demam tinggi, nyeri otot, lemas\n- **Pengobatan:** Istirahat, banyak cairan, antiviral jika perlu\n\n**🫁 Tuberkulosis:**\n- **Skrining:** Test tuberculin/IGRA rutin\n- **Pencegahan:** Nutrisi baik, ventilasi rumah\n- **Gejala:** Batuk >2 minggu, demam, penurunan BB\n- **Pengobatan:** OAT minimal 6 bulan\n\n#### 🦠 **Penyakit Pencernaan**\n\n**🤮 Hepatitis A:**\n- **Vaksinasi:** 2 dosis, interval 6-12 bulan\n- **Pencegahan:** Hygiene makanan, cuci tangan\n- **Gejala:** Kuning, mual, nyeri perut\n- **Pengobatan:** Supportive care, istirahat\n\n**💩 Diare Akut:**\n- **Pencegahan:** Air bersih, makanan matang\n- **Rotavirus vaccine:** Untuk bayi\n- **ORS:** Segera berikan jika diare\n- **Rujukan:** Jika dehidrasi berat\n\n#### 🩸 **Penyakit Vector-borne**\n\n**🦟 Demam Berdarah:**\n- **Pencegahan:** 3M Plus (menguras, menutup, mendaur ulang)\n- **Vaksin:** Dengvaxia (dengan syarat tertentu)\n- **Gejala:** Demam tinggi, nyeri otot, bintik merah\n- **Rujukan:** Segera jika warning signs\n\n**🦟 Malaria:**\n- **Pencegahan:** Kelambu, anti nyamuk\n- **Profilaksis:** Jika ke area endemis\n- **Gejala:** Demam berkala, menggigil\n- **Pengobatan:** Antimalarial sesuai jenis\n\n### 🏫 **PROGRAM KESEHATAN SEKOLAH**\n\n#### 📋 **Skrining Kesehatan Rutin**\n- **Pemeriksaan fisik:** Tinggi, berat, vital sign\n- **Skrining penglihatan:** Snellen chart\n- **Skrining pendengaran:** Audiometri sederhana\n- **Skrining gizi:** Deteksi malnutrisi\n- **Skrining mental:** Basic assessment\n\n#### 🧼 **Promosi Hygiene**\n- **Hand hygiene:** Cuci tangan 6 langkah\n- **Dental hygiene:** Sikat gigi setelah makan\n- **Personal hygiene:** Mandi, ganti baju\n- **Environmental hygiene:** Kebersihan kelas\n\n#### 🚫 **Kontrol Penyebaran**\n- **Isolation protocols:** Anak sakit tidak masuk\n- **Disinfection routine:** Pembersihan rutin\n- **Notification system:** Lapor ke dinkes jika outbreak\n- **Contact tracing:** Lacak kontak jika perlu\n\n*Pencegahan adalah kunci utama menjaga kesehatan anak sekolah! 💪🛡️*",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin6-2-sekolah",
            title: "Deteksi Dini Masalah Kesehatan",
            content:
              "## 🔍 Deteksi Dini Masalah Kesehatan Anak Sekolah\n\n### 👀 **SKRINING KESEHATAN KOMPREHENSIF**\n\n#### 📏 **Pertumbuhan & Perkembangan**\n\n**📊 Antropometri:**\n- **Tinggi badan:** Plot di growth chart WHO\n- **Berat badan:** Hitung BMI untuk usia\n- **Lingkar kepala:** Sampai usia 5 tahun\n- **Proporsi tubuh:** Deteksi kelainan bentuk\n\n**🎯 Red Flags:**\n- **Stunting:** Tinggi <-2 SD dari median\n- **Wasting:** BB/TB <-2 SD\n- **Obesitas:** BMI >95th percentile\n- **Failure to thrive:** Pertumbuhan melambat\n\n#### 👁️ **Kesehatan Mata**\n\n**🔤 Tes Penglihatan:**\n- **Snellen chart:** Ketajaman visual\n- **Cover test:** Deteksi juling\n- **Color vision:** Tes buta warna\n- **Pupil response:** Refleks cahaya\n\n**⚠️ Tanda Masalah:**\n- **Sering mengedip:** Kemungkinan minus\n- **Menyipitkan mata:** Gangguan refraksi\n- **Sakit kepala:** Setelah baca/tulis\n- **Mata merah:** Infeksi atau alergi\n- **Juling:** Strabismus\n\n#### 👂 **Kesehatan Telinga**\n\n**📢 Tes Pendengaran:**\n- **Whisper test:** Tes bisikan\n- **Tuning fork:** Weber & Rinne test\n- **Audiometry:** Jika tersedia\n- **Tympanometry:** Fungsi gendang telinga\n\n**🔇 Tanda Gangguan Pendengaran:**\n- **Tidak merespon** panggilan\n- **Volume TV/musik** tinggi\n- **Prestasi menurun** tiba-tiba\n- **Berbicara keras**\n- **Sering minta diulang**\n\n---\n\n### 🧠 **KESEHATAN MENTAL & PERILAKU**\n\n#### 😟 **Gangguan Kecemasan**\n\n**🎭 Gejala Umum:**\n- **Physical:** Sakit perut, kepala, susah tidur\n- **Emotional:** Takut berlebihan, mudah menangis\n- **Behavioral:** Menghindar aktivitas, clingy\n- **Academic:** Sulit konsentrasi, prestasi turun\n\n**📝 Screening Tools:**\n- **GAD-7 for children:** Kuesioner kecemasan\n- **SCARED:** Screen for Child Anxiety Related Emotional Disorders\n- **Observation checklist:** Perilaku di kelas\n\n#### 😔 **Depresi Anak**\n\n**💔 Warning Signs:**\n- **Mood changes:** Sedih berkepanjangan\n- **Interest loss:** Tidak mau main/belajar\n- **Energy low:** Lemas, malas beraktivitas\n- **Sleep problems:** Insomnia atau hypersomnia\n- **Appetite changes:** Makan berlebihan/kurang\n\n**🚨 Urgent Referral:**\n- **Self-harm thoughts:** Ingin menyakiti diri\n- **Suicide ideation:** Pikiran bunuh diri\n- **Severe withdrawal:** Isolasi total\n- **Psychotic symptoms:** Halusinasi, delusi\n\n#### 🌀 **ADHD (Attention Deficit Hyperactivity Disorder)**\n\n**🎯 Core Symptoms:**\n- **Inattention:** Sulit fokus, pelupa, careless\n- **Hyperactivity:** Gelisah, tidak bisa diam\n- **Impulsivity:** Bertindak tanpa pikir\n\n**📋 Assessment:**\n- **Vanderbilt scales:** Rating dari guru & ortu\n- **Conners rating:** Comprehensive assessment\n- **DSM-5 criteria:** Diagnostic criteria\n- **Academic impact:** Pengaruh terhadap belajar\n\n---\n\n### 📱 **WhatsApp Early Detection Support**\n\n**🔍 SCREENING & ASSESSMENT:**\n- **Child Development:** [+62 811-TUMBUH-KEMBANG](https://wa.me/6281178456321?text=Halo,%20saya%20khawatir%20perkembangan%20anak%20saya,%20bisa%20konsultasi?)\n- **Vision Screening:** [+62 822-CEK-MATA](https://wa.me/6282285647912?text=Hi,%20anak%20saya%20sering%20mengeluh%20pusing%20setelah%20belajar,%20mungkin%20matanya?)\n- **Hearing Test:** [+62 833-TES-DENGAR](https://wa.me/6283396758423?text=Selamat%20pagi,%20saya%20curiga%20anak%20saya%20kurang%20dengar,%20dimana%20bisa%20tes?)\n\n**🧠 MENTAL HEALTH SCREENING:**\n- **Child Psychologist:** [+62 844-MENTAL-ANAK](https://wa.me/6284407869534?text=Halo%20Psikolog,%20anak%20saya%20berperilaku%20aneh%20akhir-akhir%20ini)\n- **ADHD Assessment:** [+62 855-HIPERAKTIF](https://wa.me/6285518970645?text=Hi,%20anak%20saya%20sangat%20aktif%20dan%20sulit%20fokus,%20apakah%20ADHD?)\n- **Anxiety Support:** [+62 866-CEMAS-ANAK](https://wa.me/6286629081756?text=Selamat%20pagi,%20anak%20saya%20sering%20cemas%20berlebihan,%20butuh%20bantuan)\n\n**📚 LEARNING DIFFICULTIES:**\n- **Educational Psychologist:** [+62 877-BELAJAR-SUSAH](https://wa.me/6287730192867?text=Halo,%20anak%20saya%20prestasi%20menurun%20drastis,%20ada%20masalah%20belajar?)\n- **Speech Therapy:** [+62 888-BICARA-LAMBAT](https://wa.me/6288841203978?text=Hi,%20anak%20saya%20telat%20bicara%20dibanding%20teman%20seusianya)\n- **Special Needs:** [+62 899-KEBUTUHAN-KHUSUS](https://wa.me/6289952314089?text=Selamat%20pagi,%20anak%20saya%20mungkin%20berkebutuhan%20khusus,%20butuh%20assessment)\n\n### 🏥 **PROTOKOL RUJUKAN**\n\n#### 🚨 **Emergency Referral**\n- **Immediate:** Ancaman jiwa, self-harm\n- **Urgent:** Gejala akut, deteriorasi cepat\n- **Semi-urgent:** Masalah serius tapi stabil\n- **Routine:** Follow-up atau second opinion\n\n#### 📋 **Referral Checklist**\n- **Medical history:** Riwayat kesehatan lengkap\n- **Current symptoms:** Gejala saat ini detail\n- **Functional impact:** Pengaruh terhadap kehidupan\n- **Previous interventions:** Penanganan yang sudah dilakukan\n- **Family history:** Riwayat keluarga relevan\n\n### 🎯 **INTERVENSI DINI**\n\n#### 🏫 **School-based Interventions**\n- **Academic accommodations:** Penyesuaian pembelajaran\n- **Behavioral support:** Program modifikasi perilaku\n- **Peer support:** Buddy system\n- **Teacher training:** Edukasi guru tentang kondisi khusus\n\n#### 👨‍👩‍👧‍👦 **Family Support**\n- **Parent education:** Cara menangani di rumah\n- **Sibling support:** Bantu saudara memahami\n- **Home modifications:** Penyesuaian lingkungan rumah\n- **Community resources:** Akses ke layanan lokal\n\n### 📊 **MONITORING & FOLLOW-UP**\n\n#### 📅 **Regular Reviews**\n- **Monthly:** Kondisi akut atau baru terdiagnosis\n- **Quarterly:** Kondisi kronis stabil\n- **Annually:** Skrining rutin kesehatan\n- **As needed:** Jika ada perubahan kondisi\n\n#### 📈 **Progress Tracking**\n- **Academic performance:** Nilai dan participation\n- **Social functioning:** Interaksi dengan teman\n- **Behavioral measures:** Frequency of problems\n- **Quality of life:** Overall wellbeing assessment\n\n*Deteksi dini adalah kunci keberhasilan intervensi kesehatan anak! 🔍✨*",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz6-1-sekolah",
            question:
              "Pada usia berapa anak perempuan sebaiknya mendapat vaksin HPV?",
            options: ["6-7 tahun", "8-9 tahun", "10-11 tahun", "12-13 tahun"],
            correctAnswer: 1,
            explanation:
              "Vaksin HPV direkomendasikan untuk anak perempuan usia 8-9 tahun (kelas 2-3 SD) sebelum aktif secara seksual untuk perlindungan optimal.",
          },
          {
            id: "quiz6-2-sekolah",
            question:
              "Apa yang termasuk red flag untuk gangguan penglihatan pada anak sekolah?",
            options: [
              "Sering menonton TV",
              "Suka membaca buku",
              "Sering menyipitkan mata saat melihat papan tulis",
              "Mata berwarna gelap",
            ],
            correctAnswer: 2,
            explanation:
              "Sering menyipitkan mata saat melihat papan tulis adalah tanda gangguan refraksi (minus/plus) yang memerlukan pemeriksaan mata lebih lanjut.",
          },
        ],
      },
      {
        id: "sub7-usia-sekolah",
        title: "Aktivitas Fisik dan Olahraga",
        description:
          "Pentingnya aktivitas fisik teratur dan olahraga yang sesuai untuk pertumbuhan optimal anak sekolah dan remaja",
        duration: "35 menit",
        isCompleted: false,
        isUnlocked: false,
        currentPoinIndex: 0,
        poinDetails: [
          {
            id: "poin7-1-sekolah",
            title: "Panduan Aktivitas Fisik Anak Sekolah",
            content:
              "## 🏃‍♀️ Aktivitas Fisik untuk Anak Usia Sekolah\n\n### 🎯 **REKOMENDASI AKTIVITAS FISIK WHO**\n\n#### ⏰ **Durasi Minimal Harian**\n- **Anak 5-17 tahun:** Minimal 60 menit aktivitas fisik sedang-berat setiap hari\n- **Aktivitas berat:** Minimal 3 hari per minggu\n- **Penguatan otot:** 3 hari per minggu\n- **Penguatan tulang:** 3 hari per minggu\n\n#### 📊 **Intensitas Aktivitas**\n\n**🟢 Ringan (Light Intensity):**\n- **Contoh:** Jalan santai, stretching ringan\n- **Heart rate:** <64% max HR\n- **Talk test:** Bisa berbicara dan bernyanyi\n- **Duration:** Sepanjang hari\n\n**🟡 Sedang (Moderate Intensity):**\n- **Contoh:** Jalan cepat, bersepeda santai, bermain\n- **Heart rate:** 64-76% max HR\n- **Talk test:** Bisa berbicara tapi tidak bernyanyi\n- **Duration:** 30-60 menit per hari\n\n**🔴 Berat (Vigorous Intensity):**\n- **Contoh:** Lari, sepak bola, basket, renang cepat\n- **Heart rate:** 77-93% max HR\n- **Talk test:** Sulit berbicara kalimat lengkap\n- **Duration:** 20-30 menit, 3x per minggu\n\n---\n\n### 🏅 **JENIS AKTIVITAS FISIK**\n\n#### 🏃‍♂️ **Aktivitas Aerobik**\n\n**🚴‍♀️ Endurance Activities:**\n- **Bersepeda:** Meningkatkan kardiovaskular\n- **Renang:** Full body workout, aman untuk sendi\n- **Lari/jogging:** Mudah, bisa dilakukan di mana saja\n- **Bermain kejar-kejaran:** Fun dan natural untuk anak\n\n**⚽ Sports Activities:**\n- **Sepak bola:** Koordinasi, teamwork, cardio\n- **Basket:** Jumping, agility, upper body\n- **Badminton:** Hand-eye coordination, quick response\n- **Tenis meja:** Fokus, refleks, precision\n\n#### 💪 **Penguatan Otot (Muscle Strengthening)**\n\n**🏋️‍♀️ Bodyweight Exercises:**\n- **Push-ups:** Kekuatan dada, bahu, trisep\n- **Sit-ups:** Core strength, postur\n- **Squats:** Kaki, gluteus, core\n- **Pull-ups:** Punggung, bisep, grip strength\n\n**🤸‍♀️ Functional Movements:**\n- **Bear crawl:** Full body coordination\n- **Crab walk:** Posterior chain, shoulder stability\n- **Mountain climbers:** Cardio + strength\n- **Planks:** Core endurance\n\n#### 🦴 **Penguatan Tulang (Bone Strengthening)**\n\n**🦘 Impact Activities:**\n- **Jumping:** Vertikal jump, hop scotch\n- **Skipping:** Koordinasi + bone loading\n- **Martial arts:** Impact + discipline\n- **Dancing:** Rhythm + weight bearing\n\n**🏃‍♀️ Weight-bearing Sports:**\n- **Voli:** Jumping, spiking\n- **Basket:** Jumping, landing\n- **Gimnastik:** Full body, flexibility\n- **Rock climbing:** Grip strength, problem solving\n\n---\n\n### 📅 **PROGRAM AKTIVITAS MINGGUAN**\n\n#### 🗓️ **Contoh Jadwal Seminggu**\n\n**📍 SENIN - Endurance Day:**\n- **Warm-up:** 5 menit jalan santai\n- **Main activity:** 30 menit bersepeda/jogging\n- **Cool-down:** 5 menit stretching\n- **Total:** 40 menit\n\n**📍 SELASA - Strength Day:**\n- **Warm-up:** 5 menit gerakan dinamis\n- **Circuit training:** 3 set x 8-12 reps\n  - Push-ups: 10 reps\n  - Squats: 15 reps\n  - Planks: 30 detik\n  - Jumping jacks: 20 reps\n- **Cool-down:** 5 menit stretching\n- **Total:** 35 menit\n\n**📍 RABU - Sport/Fun Day:**\n- **Game:** 45 menit sepak bola/basket/badminton\n- **Includes:** Warm-up dalam permainan\n- **Cool-down:** 5 menit stretching\n- **Total:** 50 menit\n\n**📍 KAMIS - Active Recovery:**\n- **Yoga/stretching:** 20 menit\n- **Jalan santai:** 20 menit\n- **Play time:** 20 menit aktivitas ringan\n- **Total:** 60 menit (intensity rendah)\n\n**📍 JUMAT - High Intensity:**\n- **Warm-up:** 5 menit\n- **HIIT session:** 20 menit (30s work, 30s rest)\n- **Cool-down:** 10 menit\n- **Total:** 35 menit\n\n**📍 SABTU - Adventure Day:**\n- **Hiking:** 1-2 jam\n- **Swimming:** 30 menit\n- **Rock climbing:** 1 jam\n- **Choose one:** Sesuai minat dan akses\n\n**📍 MINGGU - Family Active Time:**\n- **Family bike ride:** 45 menit\n- **Park playground:** 30 menit\n- **Dance party:** 15 menit\n- **Total:** 90 menit (fun focused)\n\n---\n\n### 📱 **WhatsApp Sports & Fitness Support**\n\n**🏃‍♀️ FITNESS COACHING:**\n- **Kids Fitness Trainer:** [+62 811-FIT-ANAK](https://wa.me/6281145678912?text=Halo%20Coach,%20saya%20ingin%20program%20fitness%20untuk%20anak%20usia%2010%20tahun)\n- **Youth Sports Coach:** [+62 822-SPORT-REMAJA](https://wa.me/6282256789123?text=Hi,%20anak%20saya%20ingin%20serius%20di%20olahraga,%20butuh%20pelatih)\n- **Family Fitness:** [+62 833-KELUARGA-SEHAT](https://wa.me/6283367891234?text=Selamat%20pagi,%20keluarga%20kami%20ingin%20mulai%20gaya%20hidup%20aktif)\n\n**⚽ SPORTS DEVELOPMENT:**\n- **Football Academy:** [+62 844-BOLA-ANAK](https://wa.me/6284478912345?text=Halo,%20anak%20saya%20berbakat%20sepak%20bola,%20ada%20akademi?)\n- **Swimming Coach:** [+62 855-RENANG-ANAK](https://wa.me/6285589123456?text=Hi,%20saya%20ingin%20anak%20belajar%20renang%20yang%20benar)\n- **Basketball Training:** [+62 866-BASKET-JUNIOR](https://wa.me/6286691234567?text=Selamat%20pagi,%20dimana%20anak%20bisa%20belajar%20basket%20yang%20bagus?)\n\n**🩺 SPORTS MEDICINE:**\n- **Exercise Physiologist:** [+62 877-FISIOLOGI-OLAHRAGA](https://wa.me/6287712345678?text=Halo%20Dokter,%20anak%20saya%20atlet%20junior,%20butuh%20program%20latihan%20scientific)\n- **Sports Injury Prevention:** [+62 888-CEDERA-OLAHRAGA](https://wa.me/6288823456789?text=Hi,%20bagaimana%20cara%20mencegah%20cedera%20pada%20anak%20yang%20aktif%20olahraga?)\n- **Nutrition for Athletes:** [+62 899-GIZI-ATLET](https://wa.me/6289934567891?text=Selamat%20pagi,%20anak%20saya%20atlet%20muda,%20butuh%20konsultasi%20gizi%20olahraga)\n\n### 🎯 **MANFAAT AKTIVITAS FISIK**\n\n#### 💪 **Manfaat Fisik**\n- **Pertumbuhan tulang:** Density dan kekuatan optimal\n- **Muscle development:** Kekuatan dan endurance\n- **Cardiovascular health:** Jantung dan paru-paru sehat\n- **Flexibility:** Range of motion optimal\n- **Body composition:** BMI sehat, low body fat\n- **Motor skills:** Koordinasi dan balance\n\n#### 🧠 **Manfaat Mental**\n- **Academic performance:** Konsentrasi dan memori meningkat\n- **Mood improvement:** Endorphin release, happy\n- **Stress reduction:** Cortisol management\n- **Sleep quality:** Tidur lebih nyenyak\n- **Self-confidence:** Body image positif\n- **Discipline:** Konsistensi dan goal setting\n\n#### 👥 **Manfaat Sosial**\n- **Teamwork:** Kerja sama dalam tim\n- **Leadership:** Kepemimpinan dalam olahraga\n- **Social skills:** Interaksi dengan teman\n- **Fair play:** Sportivitas dan etika\n- **Cultural appreciation:** Menghargai perbedaan\n- **Community involvement:** Aktif di komunitas\n\n### ⚠️ **SAFETY CONSIDERATIONS**\n\n#### 🛡️ **Injury Prevention**\n- **Proper warm-up:** 5-10 menit sebelum aktivitas\n- **Appropriate gear:** Sepatu, helm, pelindung\n- **Progressive loading:** Tingkatkan intensitas bertahap\n- **Rest days:** Recovery untuk mencegah overuse\n- **Hydration:** Minum cukup sebelum, saat, sesudah\n- **Weather awareness:** Hindari cuaca ekstrem\n\n#### 🚨 **Red Flags - Stop Exercise**\n- **Chest pain:** Nyeri dada atau sesak\n- **Severe shortness of breath:** Sesak berlebihan\n- **Dizziness/fainting:** Pusing atau pingsan\n- **Severe fatigue:** Kelelahan ekstrem\n- **Joint pain:** Nyeri sendi akut\n- **Any injury:** Hentikan jika ada cedera\n\n*Bergerak adalah obat terbaik untuk tubuh dan pikiran yang sehat! 🏃‍♀️💪*",
            duration: "20 menit",
            isCompleted: false,
            type: "text",
          },
          {
            id: "poin7-2-sekolah",
            title: "Olahraga Tim vs Individual",
            content:
              "## ⚽ Olahraga Tim vs Individual untuk Anak\n\n### 🤝 **OLAHRAGA TIM (TEAM SPORTS)**\n\n#### 🏆 **Jenis Olahraga Tim Populer**\n\n**⚽ Sepak Bola:**\n- **Usia mulai:** 4-6 tahun (fun games)\n- **Keterampilan:** Koordinasi kaki, strategi, teamwork\n- **Manfaat:** Kardio excellent, social skills\n- **Equipment:** Bola, sepatu khusus, shin guards\n- **Biaya:** Relatif murah, akses mudah\n\n**🏀 Bola Basket:**\n- **Usia mulai:** 6-8 tahun\n- **Keterampilan:** Hand-eye coordination, jumping, shooting\n- **Manfaat:** Tinggi badan, quick thinking\n- **Equipment:** Ring, bola, sepatu basket\n- **Biaya:** Sedang, perlu lapangan indoor\n\n**🏐 Voli:**\n- **Usia mulai:** 8-10 tahun\n- **Keterampilan:** Timing, jumping, communication\n- **Manfaat:** Upper body strength, reflexes\n- **Equipment:** Net, bola, knee pads\n- **Biaya:** Murah, bisa outdoor/indoor\n\n**🏒 Hockey (Field/Ice):**\n- **Usia mulai:** 6-8 tahun\n- **Keterampilan:** Balance, stick handling, speed\n- **Manfaat:** Agility, tactical thinking\n- **Equipment:** Stick, protective gear, skates (ice)\n- **Biaya:** Mahal, equipment intensive\n\n#### ✅ **Keunggulan Olahraga Tim**\n\n**👥 Social Development:**\n- **Teamwork:** Belajar bekerja sama\n- **Communication:** Koordinasi dengan teammate\n- **Leadership:** Kesempatan memimpin\n- **Conflict resolution:** Menyelesaikan perbedaan\n- **Friendship:** Bonding dengan teman setim\n\n**🧠 Life Skills:**\n- **Strategy thinking:** Perencanaan dan taktik\n- **Adaptability:** Menyesuaikan dengan situasi\n- **Pressure handling:** Perform under pressure\n- **Goal setting:** Target tim dan personal\n- **Accountability:** Tanggung jawab pada tim\n\n**🏆 Competitive Advantage:**\n- **Motivation:** Dukungan dari teman setim\n- **Shared success:** Merayakan kemenangan bersama\n- **Learning from others:** Skill sharing\n- **Role specialization:** Fokus pada posisi tertentu\n\n#### ❌ **Tantangan Olahraga Tim**\n- **Bench time:** Tidak semua anak dapat playing time equal\n- **Team dynamics:** Konflik atau bullying dalam tim\n- **Schedule dependency:** Tergantung jadwal tim\n- **Peer pressure:** Tekanan dari teman atau pelatih\n- **Less individual focus:** Skill personal kurang diperhatikan\n\n---\n\n### 🎾 **OLAHRAGA INDIVIDUAL**\n\n#### 🥇 **Jenis Olahraga Individual Populer**\n\n**🏊‍♀️ Renang:**\n- **Usia mulai:** 3-5 tahun\n- **Keterampilan:** Teknik stroke, breathing, endurance\n- **Manfaat:** Full body workout, low impact\n- **Equipment:** Swimsuit, goggles, kickboard\n- **Biaya:** Sedang, perlu akses kolam\n\n**🎾 Tenis:**\n- **Usia mulai:** 5-7 tahun\n- **Keterampilan:** Hand-eye coordination, footwork, strategy\n- **Manfaat:** Agility, mental toughness\n- **Equipment:** Racket, balls, proper shoes\n- **Biaya:** Sedang-mahal, lessons + court fees\n\n**🥋 Martial Arts:**\n- **Usia mulai:** 4-6 tahun\n- **Keterampilan:** Discipline, technique, flexibility\n- **Manfaat:** Self-defense, respect, focus\n- **Equipment:** Uniform, belts, pads\n- **Biaya:** Sedang, monthly membership\n\n**🏃‍♀️ Track & Field:**\n- **Usia mulai:** 6-8 tahun\n- **Keterampilan:** Speed, endurance, technique specific\n- **Manfaat:** Personal bests, variety of events\n- **Equipment:** Running shoes, spikes, implements\n- **Biaya:** Murah untuk running, mahal untuk field events\n\n**🤸‍♀️ Gymnastics:**\n- **Usia mulai:** 3-5 tahun\n- **Keterampilan:** Strength, flexibility, coordination\n- **Manfaat:** Body awareness, grace, discipline\n- **Equipment:** Mats, apparatus, grips\n- **Biaya:** Mahal, intensive coaching\n\n#### ✅ **Keunggulan Olahraga Individual**\n\n**🎯 Personal Development:**\n- **Self-reliance:** Mengandalkan kemampuan sendiri\n- **Goal achievement:** Target personal yang clear\n- **Time management:** Mengatur latihan sendiri\n- **Self-motivation:** Dorongan dari dalam\n- **Personal accountability:** Bertanggung jawab penuh\n\n**📈 Skill Focus:**\n- **Technique refinement:** Fokus pada skill spesifik\n- **Individual attention:** Coaching one-on-one\n- **Progress tracking:** Mudah monitor kemajuan\n- **Specialized training:** Program sesuai kebutuhan\n- **Flexible scheduling:** Latihan sesuai waktu\n\n**🏅 Competition Benefits:**\n- **Fair comparison:** Compete dengan level yang sama\n- **Personal records:** Beat your own best\n- **Less politics:** Merit-based performance\n- **Lifelong sport:** Bisa dilakukan hingga tua\n\n#### ❌ **Tantangan Olahraga Individual**\n- **Isolation:** Kurang interaksi sosial\n- **Pressure:** Semua beban di individu\n- **Motivation:** Sulit maintain tanpa dukungan tim\n- **Cost:** Often more expensive untuk coaching\n- **Limited positions:** Sedikit scholarship opportunities\n\n---\n\n### ⚖️ **MEMILIH YANG TEPAT UNTUK ANAK**\n\n#### 🧩 **Faktor Pertimbangan**\n\n**👤 Personality Anak:**\n- **Extrovert:** Cenderung cocok team sports\n- **Introvert:** Mungkin prefer individual sports\n- **Competitive:** Suka tantangan dan kompetisi\n- **Collaborative:** Senang bekerja dalam grup\n- **Independent:** Prefer kontrol penuh atas performa\n\n**🎯 Tujuan dan Minat:**\n- **Social interaction:** Team sports lebih cocok\n- **Skill mastery:** Individual sports fokus teknik\n- **Fun and friendship:** Team activities\n- **Personal achievement:** Individual challenges\n- **Fitness goal:** Both can be effective\n\n**💰 Practical Considerations:**\n- **Budget:** Compare costs realistically\n- **Time commitment:** Consider family schedule\n- **Transportation:** Accessibility to facilities\n- **Equipment:** Initial and ongoing costs\n- **Long-term commitment:** Seasonal vs year-round\n\n#### 🌟 **The Hybrid Approach**\n\n**🔄 Multi-Sport Participation:**\n- **Seasonal rotation:** Team sport di season, individual off-season\n- **Complementary skills:** Swimming + soccer untuk endurance\n- **Age progression:** Start team, transition to individual\n- **Injury prevention:** Cross-training benefits\n- **Well-rounded development:** Best of both worlds\n\n**📅 Weekly Balance Example:**\n- **Monday:** Swimming (individual)\n- **Tuesday:** Soccer practice (team)\n- **Wednesday:** Tennis lesson (individual)\n- **Thursday:** Soccer game (team)\n- **Friday:** Rest atau light individual activity\n- **Saturday:** Basketball pickup game (team/social)\n- **Sunday:** Family bike ride (individual/family)\n\n---\n\n### 📱 **WhatsApp Sports Selection Support**\n\n**🤔 SPORT SELECTION GUIDANCE:**\n- **Sport Psychology:** [+62 811-PILIH-OLAHRAGA](https://wa.me/6281156789123?text=Halo,%20anak%20saya%20bingung%20pilih%20olahraga%20tim%20atau%20individual)\n- **Multi-Sport Coach:** [+62 822-MULTI-SPORT](https://wa.me/6282267891234?text=Hi,%20saya%20ingin%20anak%20coba%20berbagai%20olahraga%20dulu)\n- **Sports Development:** [+62 833-BAKAT-OLAHRAGA](https://wa.me/6283378912345?text=Selamat%20pagi,%20bagaimana%20mengetahui%20bakat%20olahraga%20anak?)\n\n**⚽ TEAM SPORTS GUIDANCE:**\n- **Team Sport Coordinator:** [+62 844-TIM-OLAHRAGA](https://wa.me/6284489123456?text=Halo%20Coach,%20anak%20saya%2012%20tahun%20ingin%20ikut%20olahraga%20tim)\n- **Youth League Info:** [+62 855-LIGA-ANAK](https://wa.me/6285591234567?text=Hi,%20dimana%20anak%20bisa%20ikut%20kompetisi%20olahraga%20tim%20yang%20sehat?)\n\n**🎾 INDIVIDUAL SPORTS GUIDANCE:**\n- **Individual Coach:** [+62 866-PELATIH-PERSONAL](https://wa.me/6286612345678?text=Selamat%20pagi,%20anak%20saya%20butuh%20pelatih%20personal%20untuk%20tenis)\n- **Technique Specialist:** [+62 877-TEKNIK-OLAHRAGA](https://wa.me/6287723456789?text=Halo,%20anak%20saya%20serius%20di%20renang,%20butuh%20coach%20teknik%20advanced)\n\n### 🎯 **RECOMMENDATION BERDASARKAN USIA**\n\n**👶 Usia 4-6 tahun:**\n- **Focus:** Fun, basic motor skills\n- **Recommended:** Mixed activities, intro sports\n- **Avoid:** Intense competition, specialization\n- **Goal:** Love of movement\n\n**🧒 Usia 7-10 tahun:**\n- **Focus:** Skill development, try various sports\n- **Recommended:** Recreational leagues, multi-sport\n- **Consider:** Both team and individual\n- **Goal:** Find preferences and talents\n\n**👦 Usia 11-14 tahun:**\n- **Focus:** Some specialization, competitive introduction\n- **Recommended:** Choose 2-3 sports max\n- **Decision time:** Team vs individual preference clear\n- **Goal:** Develop competency and passion\n\n**👨 Usia 15+ tahun:**\n- **Focus:** Specialization or lifelong sports\n- **Options:** Competitive track or recreational\n- **Consideration:** College opportunities, career\n- **Goal:** Long-term engagement and excellence\n\n*Tidak ada pilihan yang salah - yang penting anak aktif dan senang bergerak! 🏃‍♀️⚽*",
            duration: "15 menit",
            isCompleted: false,
            type: "text",
          },
        ],
        quiz: [
          {
            id: "quiz7-1-sekolah",
            question:
              "Berapa durasi minimal aktivitas fisik yang direkomendasikan WHO untuk anak usia 5-17 tahun setiap hari?",
            options: ["30 menit", "45 menit", "60 menit", "90 menit"],
            correctAnswer: 2,
            explanation:
              "WHO merekomendasikan minimal 60 menit aktivitas fisik intensitas sedang-berat setiap hari untuk anak usia 5-17 tahun untuk pertumbuhan dan perkembangan optimal.",
          },
          {
            id: "quiz7-2-sekolah",
            question:
              "Apa keunggulan utama olahraga tim dibandingkan olahraga individual untuk anak?",
            options: [
              "Lebih murah biayanya",
              "Mengembangkan keterampilan sosial dan kerja sama",
              "Lebih mudah dipelajari",
              "Tidak perlu pelatih khusus",
            ],
            correctAnswer: 1,
            explanation:
              "Olahraga tim memiliki keunggulan dalam mengembangkan keterampilan sosial, kerja sama tim, komunikasi, dan kepemimpinan yang penting untuk perkembangan anak.",
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

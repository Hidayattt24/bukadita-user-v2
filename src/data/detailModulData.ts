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

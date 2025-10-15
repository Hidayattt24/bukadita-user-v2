import { DetailModul } from "./types";

export const pengelolaanPosyanduData: DetailModul = {
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
          content: `# Sarana dan Prasarana Posyandu

## Pengertian
Sarana dan prasarana posyandu adalah fasilitas fisik dan peralatan yang dibutuhkan untuk mendukung pelaksanaan kegiatan posyandu secara optimal.

## Sarana Utama yang Dibutuhkan:

### 1. Peralatan Penimbangan dan Pengukuran
- **Timbangan bayi** (dacin) untuk usia 0-24 bulan
- **Timbangan anak** untuk balita di atas 2 tahun
- **Timbangan dewasa** untuk ibu hamil dan menyusui
- **Pengukur tinggi badan** (microtoise/stadiometer)
- **Pita pengukur lingkar lengan atas (LILA)**
- **Pita pengukur lingkar kepala** untuk bayi

### 2. Peralatan Kesehatan Dasar
- **Stetoskop** untuk pemeriksaan jantung dan paru-paru
- **Tensimeter** untuk mengukur tekanan darah
- **Termometer** untuk mengukur suhu tubuh
- **Senter** untuk pemeriksaan mata dan tenggorokan
- **Sarung tangan** sekali pakai

### 3. Alat Tulis dan Administrasi
- **Buku register** (kohort ibu, bayi, balita)
- **Kartu Menuju Sehat (KMS)**
- **Buku KIA** (Kesehatan Ibu dan Anak)
- **Formulir pencatatan** dan pelaporan
- **Alat tulis** (bolpoin, pensil, penggaris)

## Standar Minimal Posyandu

### Posyandu Pratama
- Timbangan bayi dan anak
- Alat pengukur tinggi badan
- KMS dan buku register
- Tempat pelayanan sederhana

### Posyandu Madya
- Semua peralatan Pratama
- Ditambah alat kesehatan dasar
- Ruangan yang lebih memadai
- Media penyuluhan

### Posyandu Purnama
- Semua peralatan Madya
- Peralatan lebih lengkap
- Fasilitas yang lebih baik
- Program tambahan (seperti PAUD)

### Posyandu Mandiri
- Peralatan paling lengkap
- Fasilitas optimal
- Program komprehensif
- Swadana masyarakat`,
          duration: "20 menit",
          isCompleted: false,
          type: "text",
        },
        {
          id: "poin1-2",
          title: "Pelayanan Hari Buka",
          content: `# Pelayanan Hari Buka Posyandu

## Pengertian
Pelayanan hari buka posyandu adalah kegiatan pelayanan kesehatan yang dilaksanakan secara rutin setiap bulan dengan jadwal yang telah ditetapkan, melibatkan kader, petugas kesehatan, dan masyarakat.

## Sistem Lima Meja (5 Meja)

### 🏷️ **Meja 1: Pendaftaran**
**Petugas:** Kader
**Kegiatan:**
- Pendaftaran peserta posyandu
- Pencatatan identitas dalam buku register
- Pemberian nomor urut
- Penyerahan KMS/buku KIA
- **Target:** Semua kelompok usia

### ⚖️ **Meja 2: Penimbangan**
**Petugas:** Kader
**Kegiatan:**
- Penimbangan berat badan
- Pengukuran tinggi badan
- Pengukuran lingkar kepala (bayi)
- Pengukuran LILA (ibu hamil)
- Pencatatan hasil dalam KMS
- **Target:** Balita, ibu hamil, ibu menyusui

### 📝 **Meja 3: Pengisian KMS**
**Petugas:** Kader
**Kegiatan:**
- Pengisian KMS/buku KIA
- Interpretasi grafik pertumbuhan
- Deteksi dini gangguan pertumbuhan
- Pencatatan dalam kohort
- **Target:** Balita, ibu hamil

### 🩺 **Meja 4: Penyuluhan & Pelayanan**
**Petugas:** Kader + Petugas Kesehatan
**Kegiatan:**
- Penyuluhan kesehatan
- Konseling gizi dan kesehatan
- Pemberian makanan tambahan (PMT)
- Demonstrasi pembuatan MP-ASI
- **Target:** Semua peserta

### 💊 **Meja 5: Pelayanan Kesehatan**
**Petugas:** Bidan/Perawat/Dokter
**Kegiatan:**
- Pemeriksaan kesehatan
- Imunisasi
- Pemberian vitamin A
- Pemberian tablet tambah darah
- Pelayanan KB
- Pengobatan ringan
- **Target:** Sesuai kebutuhan`,
          duration: "20 menit",
          isCompleted: false,
          type: "text",
        },
        {
          id: "poin1-3",
          title: "Pelayanan Diluar Hari Buka",
          content: `# Pelayanan Diluar Hari Buka Posyandu

## Pengertian
Pelayanan diluar hari buka posyandu adalah kegiatan pelayanan kesehatan yang dilakukan oleh kader posyandu di luar jadwal rutin bulanan, sesuai dengan kebutuhan masyarakat dan kondisi tertentu.

## Jenis Pelayanan Diluar Hari Buka

### 🏠 **1. Kunjungan Rumah (Home Visit)**

#### Sasaran Prioritas:
- **Ibu hamil** risiko tinggi
- **Bayi baru lahir** (0-28 hari)
- **Balita** dengan masalah gizi
- **Lansia** dengan penyakit kronis
- **Keluarga** yang tidak datang ke posyandu

#### Kegiatan:
- **Pemantauan** kesehatan individu
- **Konseling** kesehatan dan gizi
- **Deteksi dini** masalah kesehatan
- **Rujukan** ke pelayanan kesehatan
- **Follow up** hasil pelayanan

### 🆘 **2. Pelayanan Gawat Darurat**

#### Kondisi yang Ditangani:
- **Demam tinggi** pada balita
- **Diare** akut
- **Kesulitan makan** pada bayi
- **Kejang** pada anak
- **Perdarahan** pada ibu hamil

### 📚 **3. Penyuluhan Khusus**

#### Kegiatan Edukatif:
- **Penyuluhan kelompok** kecil
- **Demonstrasi** masak MP-ASI
- **Senam hamil** atau **senam lansia**
- **Konseling** persiapan persalinan
- **Edukasi** pencegahan penyakit

## Manfaat Pelayanan Diluar Hari Buka

### 👨‍👩‍👧‍👦 **Bagi Masyarakat**
- **Akses** pelayanan kesehatan lebih mudah
- **Deteksi dini** masalah kesehatan
- **Penanganan cepat** kondisi darurat
- **Edukasi** kesehatan berkelanjutan`,
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
          question: "Berapa jumlah meja dalam sistem pelayanan posyandu?",
          options: ["3 meja", "4 meja", "5 meja", "6 meja"],
          correctAnswer: 2,
          explanation:
            "Sistem pelayanan posyandu menggunakan 5 meja: pendaftaran, penimbangan, pengisian KMS, penyuluhan & pelayanan, dan pelayanan kesehatan.",
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
          content: `# Pencatatan dan Pelaporan Manual Posyandu

## Pengertian
Pencatatan dan pelaporan manual adalah sistem dokumentasi kegiatan posyandu menggunakan format kertas dan tulisan tangan yang terstruktur sesuai standar yang telah ditetapkan.

## Jenis-Jenis Formulir Pencatatan

### 📋 **1. Kohort Ibu**
#### Fungsi:
- **Memantau** kesehatan ibu hamil
- **Mencatat** perkembangan kehamilan
- **Mendeteksi** risiko kehamilan
- **Merencanakan** tindak lanjut

#### Isi Kohort Ibu:
- **Data identitas:** Nama, umur, alamat, suami
- **Riwayat kehamilan:** HPHT, HPL, gravida, para
- **Pemeriksaan rutin:** BB, TD, HB, TFU
- **Imunisasi:** TT1, TT2, TT3, TT4, TT5
- **Pemberian:** Tablet Fe, PMT
- **Rujukan:** Tanggal, tempat, alasan

### 👶 **2. Kohort Bayi**
#### Fungsi:
- **Memantau** pertumbuhan bayi 0-11 bulan
- **Mencatat** status imunisasi
- **Mendeteksi** gangguan tumbuh kembang
- **Merencanakan** intervensi

### 📚 **3. Buku Register Kegiatan Posyandu**
#### Isi Register:
- **Tanggal kegiatan** posyandu
- **Jumlah peserta** per kelompok umur
- **Jumlah kader** yang hadir
- **Petugas kesehatan** yang hadir
- **Kegiatan** yang dilaksanakan
- **Masalah** yang ditemukan
- **Tindak lanjut** yang dilakukan`,
          duration: "25 menit",
          isCompleted: false,
          type: "text",
        },
        {
          id: "poin2-2",
          title: "Pencatatan dan Pelaporan Digital",
          content: `# Pencatatan dan Pelaporan Digital Posyandu

## Pengertian
Pencatatan dan pelaporan digital adalah sistem dokumentasi kegiatan posyandu menggunakan teknologi informasi seperti aplikasi mobile, web, atau software khusus untuk memudahkan pengolahan data dan pelaporan.

## Keunggulan Sistem Digital

### ⚡ **Efisiensi dan Kecepatan**
- **Input data** lebih cepat dengan template otomatis
- **Perhitungan** status gizi otomatis
- **Grafik pertumbuhan** dibuat secara real-time
- **Laporan** dapat dihasilkan instant
- **Pencarian data** lebih mudah dan cepat

### 📊 **Akurasi dan Konsistensi**
- **Validasi data** otomatis mengurangi error
- **Format** seragam di semua entry
- **Perhitungan** standar WHO/Kemenkes otomatis
- **Cross-check** data antar periode
- **Alert** untuk data yang tidak normal

## Jenis Aplikasi Digital Posyandu

### 📱 **1. Aplikasi Mobile (Android/iOS)**
#### Contoh Aplikasi:
- **e-PPGBM** (electronic Pencatatan dan Pelaporan Gizi Berbasis Masyarakat)
- **Posyandu Digital** by Kemenkes
- **SATUSEHAT** platform integrasi
- **Aplikasi lokal** yang dikembangkan daerah

### 💻 **2. Sistem Web-Based**
#### Keunggulan:
- **Akses** dari browser tanpa install aplikasi
- **Responsive design** untuk berbagai perangkat
- **User management** terpusat
- **Data sharing** antar posyandu lebih mudah`,
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
          content: `# Kunjungan Rumah Posyandu: Pengertian, Sasaran, dan Tujuan

## 🏠 Pengertian Kunjungan Rumah
Kunjungan rumah adalah **kegiatan pelayanan kesehatan** yang dilakukan oleh kader posyandu dengan **mendatangi langsung** rumah atau tempat tinggal sasaran untuk memberikan **pelayanan kesehatan dasar**, **konseling**, **edukasi**, dan **pemantauan kesehatan** secara personal dan berkelanjutan.

## 🎯 Sasaran Kunjungan Rumah

### **1. Sasaran Prioritas Utama**

#### 🤱 **Ibu Hamil Risiko Tinggi**
- **Usia < 20 tahun atau > 35 tahun**
- **Tinggi badan < 145 cm**
- **LILA < 23,5 cm** (Kurang Energi Kronis)
- **Riwayat** keguguran, persalinan sulit, atau kematian bayi
- **Penyakit penyerta:** Hipertensi, diabetes, jantung

#### 👶 **Bayi Baru Lahir (0-28 hari)**
- **Semua bayi baru lahir** minimal 3 kali kunjungan
- **Bayi prematur** atau BBLR (< 2500 gram)
- **Bayi dengan** kelainan bawaan
- **Ibu** yang mengalami kesulitan menyusui

## 🎯 Tujuan Kunjungan Rumah

### **1. Tujuan Umum**
**Meningkatkan derajat kesehatan masyarakat** melalui pelayanan kesehatan yang **mudah diakses**, **berkualitas**, dan **berkelanjutan** di tingkat keluarga dan individu.

### **2. Tujuan Khusus**
#### 🔍 **Deteksi Dini dan Pencegahan**
- **Identifikasi** masalah kesehatan sejak dini
- **Screening** penyakit yang dapat dicegah
- **Deteksi** faktor risiko kesehatan keluarga
- **Pencegahan** komplikasi penyakit kronis`,
          duration: "20 menit",
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
      ],
    },
  ],
};

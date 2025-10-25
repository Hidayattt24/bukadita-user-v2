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
  quiz: [
    {
      id: "quiz-1",
      question:
        "Yang termasuk prasarana dalam pelaksanaan paket layanan Posyandu adalah…",
      options: [
        "Buku KIA",
        "Tempat tunggu, tempat pendaftaran, dan tempat penimbangan",
        "Timbangan bayi",
        "Media KIE",
      ],
      correctAnswer: 1,
      explanation: "Tempat tunggu, tempat pendaftaran, dan tempat penimbangan",
    },
    {
      id: "quiz-2",
      question:
        "Posyandu di luar hari buka tetap melakukan kegiatan pelayanan karena…",
      options: [
        "Posyandu wajib buka setiap hari",
        "Banyak masyarakat tidak sempat hadir saat hari buka",
        "Layanan kesehatan masyarakat harus terus berlanjut melalui pemantauan aktif oleh kader",
        "Permintaan dari Puskesmas agar data cepat terkumpul",
      ],
      correctAnswer: 2,
      explanation:
        "Layanan kesehatan masyarakat harus terus berlanjut melalui pemantauan aktif oleh kader",
    },
    {
      id: "quiz-3",
      question:
        "Salah satu perbedaan mendasar antara pencatatan manual dan digital di Posyandu adalah…",
      options: [
        "Manual dilakukan oleh kader, digital oleh dokter",
        "Manual hanya untuk imunisasi, digital untuk semua sasaran",
        'Digital memungkinkan data terekam secara "by name by address" dan terintegrasi ke sistem nasional',
        "Manual lebih cepat karena tidak butuh koneksi internet",
      ],
      correctAnswer: 2,
      explanation:
        'Digital memungkinkan data terekam secara "by name by address" dan terintegrasi ke sistem nasional',
    },
    {
      id: "quiz-4",
      question:
        "Dalam persiapan hari buka Posyandu (H-1), kader sebaiknya menyebarluaskan informasi jadwal kegiatan kepada warga. Hal ini bertujuan untuk…",
      options: [
        "Meningkatkan angka kunjungan sasaran ke Posyandu",
        "Memenuhi instruksi dari kepala desa",
        "Menyesuaikan dengan jadwal tenaga kesehatan",
        "Mempercepat pelaporan ke Puskesmas",
      ],
      correctAnswer: 0,
      explanation: "Meningkatkan angka kunjungan sasaran ke Posyandu",
    },
    {
      id: "quiz-5",
      question:
        "Mengapa penimbangan dan pencatatan pertumbuhan bayi serta balita penting dilakukan secara rutin di Posyandu?",
      options: [
        "Untuk memenuhi target pelaporan bulanan",
        "Agar kader terbiasa menggunakan alat ukur",
        "Sebagai dasar deteksi dini gangguan gizi dan pertumbuhan anak",
        "Karena diwajibkan oleh pemerintah desa",
      ],
      correctAnswer: 2,
      explanation:
        "Sebagai dasar deteksi dini gangguan gizi dan pertumbuhan anak",
    },
    {
      id: "quiz-6",
      question:
        "Dalam pelayanan ibu hamil di Posyandu, hasil pengukuran berat badan dan LiLA dicatat pada Buku KIA. Tujuan utama pencatatan ini adalah…",
      options: [
        "Untuk menilai kerja kader",
        "Menjadi bukti administrasi kegiatan",
        "Memantau status gizi dan risiko KEK pada ibu hamil",
        "Sebagai data pelengkap imunisasi",
      ],
      correctAnswer: 2,
      explanation: "Memantau status gizi dan risiko KEK pada ibu hamil",
    },
    {
      id: "quiz-7",
      question:
        "Mengapa kegiatan validasi data penting dilakukan setelah pelayanan Posyandu?",
      options: [
        "Untuk memastikan data sesuai standar dan dapat digunakan untuk tindak lanjut kesehatan sasaran",
        "Agar kader mendapatkan insentif",
        "Karena diwajibkan dalam format laporan",
        "Untuk memenuhi syarat akreditasi Posyandu",
      ],
      correctAnswer: 0,
      explanation:
        "Untuk memastikan data sesuai standar dan dapat digunakan untuk tindak lanjut kesehatan sasaran",
    },
    {
      id: "quiz-8",
      question:
        "Kunjungan rumah oleh kader merupakan salah satu bentuk pelayanan di luar hari buka. Apa manfaat strategis kegiatan ini bagi masyarakat?",
      options: [
        "Meningkatkan peran desa dalam urusan kesehatan",
        "Mengubah perilaku masyarakat agar lebih sadar dan aktif menjaga kesehatannya",
        "Menambah data untuk laporan bulanan",
        "Menggantikan kunjungan bidan desa",
      ],
      correctAnswer: 1,
      explanation:
        "Mengubah perilaku masyarakat agar lebih sadar dan aktif menjaga kesehatannya",
    },
    {
      id: "quiz-9",
      question:
        'Dalam metode SAJI saat kunjungan rumah, langkah "Ajak Bicara" bertujuan untuk…',
      options: [
        "Memperkenalkan diri kader",
        "Mengumpulkan data melalui percakapan yang menggali kondisi kesehatan dan kebiasaan keluarga",
        "Menegur warga yang tidak aktif ke Posyandu",
        "Memberi edukasi tentang pola makan",
      ],
      correctAnswer: 1,
      explanation:
        "Mengumpulkan data melalui percakapan yang menggali kondisi kesehatan dan kebiasaan keluarga",
    },
    {
      id: "quiz-10",
      question:
        "Apabila kader menemukan tanda bahaya pada balita saat kunjungan rumah, tindakan yang paling tepat adalah…",
      options: [
        "Menunggu evaluasi mingguan",
        "Menyampaikan laporan melalui grup WhatsApp kader",
        "Segera berkoordinasi dengan tenaga kesehatan Pustu untuk dirujuk ke Puskesmas",
        "Menuliskan catatan saja di checklist kunjungan rumah",
      ],
      correctAnswer: 2,
      explanation:
        "Segera berkoordinasi dengan tenaga kesehatan Pustu untuk dirujuk ke Puskesmas",
    },
    {
      id: "quiz-11",
      question:
        "Pemberdayaan masyarakat di Posyandu paling efektif dilakukan jika…",
      options: [
        "Semua keputusan diambil oleh tenaga kesehatan",
        "Kader dan masyarakat dilibatkan aktif dalam perencanaan dan pelaksanaan kegiatan kesehatan",
        "Pemerintah desa yang mengatur seluruh program",
        "Semua kegiatan diserahkan pada Puskesmas",
      ],
      correctAnswer: 1,
      explanation:
        "Kader dan masyarakat dilibatkan aktif dalam perencanaan dan pelaksanaan kegiatan kesehatan",
    },
    {
      id: "quiz-12",
      question:
        "Fungsi utama penggunaan chatbot WhatsApp dalam pelaporan Posyandu adalah…",
      options: [
        "Mengurangi penggunaan kertas dan mempercepat pelaporan real time ke sistem ASIK",
        "Mengganti aplikasi ASIK sepenuhnya",
        "Hanya untuk komunikasi antar kader",
        "Sebagai pengingat jadwal kegiatan Posyandu",
      ],
      correctAnswer: 0,
      explanation:
        "Mengurangi penggunaan kertas dan mempercepat pelaporan real time ke sistem ASIK",
    },
    {
      id: "quiz-13",
      question:
        "Ketika melakukan pencatatan digital bagi usia dewasa dan lansia, kader memasukkan data seperti tekanan darah, gula darah, dan riwayat penyakit. Tujuan utamanya adalah…",
      options: [
        "Membuat data statistik nasional",
        "Deteksi dini penyakit tidak menular dan pemberian edukasi sesuai hasil",
        "Memenuhi administrasi pelaporan",
        "Menentukan prioritas kunjungan rumah",
      ],
      correctAnswer: 1,
      explanation:
        "Deteksi dini penyakit tidak menular dan pemberian edukasi sesuai hasil",
    },
    {
      id: "quiz-14",
      question:
        "Dalam kegiatan Posyandu, siapa yang bertanggung jawab melakukan kalibrasi alat kesehatan sesuai pedoman?",
      options: [
        "Kader Posyandu",
        "Kepala Desa",
        "Puskesmas atau Pustu",
        "Dinas Sosial",
      ],
      correctAnswer: 2,
      explanation: "Puskesmas atau Pustu",
    },
    {
      id: "quiz-15",
      question:
        "Langkah awal pendaftaran kader baru dalam Aplikasi ASIK adalah…",
      options: [
        "Menghubungi kepala Puskesmas",
        "Mengisi formulir manual",
        "Mengunduh aplikasi ASIK Mobile resmi di Play Store dan mendaftar",
        "Menggunakan aplikasi versi training",
      ],
      correctAnswer: 2,
      explanation:
        "Mengunduh aplikasi ASIK Mobile resmi di Play Store dan mendaftar",
    },
    {
      id: "quiz-16",
      question: "Evaluasi mingguan hasil kunjungan rumah dilakukan untuk…",
      options: [
        "Mengecek kehadiran kader",
        "Menilai efektivitas kegiatan dan menentukan tindak lanjut bagi sasaran yang berisiko",
        "Memastikan jadwal kunjungan sudah sesuai",
        "Mengatur ulang pembagian wilayah kerja",
      ],
      correctAnswer: 1,
      explanation:
        "Menilai efektivitas kegiatan dan menentukan tindak lanjut bagi sasaran yang berisiko",
    },
    {
      id: "quiz-17",
      question:
        'Dalam konteks pencatatan Posyandu, istilah "by name by address" berarti…',
      options: [
        "Data dicatat berdasarkan kelompok usia",
        "Data disusun menurut alamat dan nama individu yang spesifik",
        "Data dikumpulkan berdasarkan wilayah Posyandu",
        "Data hanya diisi oleh petugas desa",
      ],
      correctAnswer: 1,
      explanation:
        "Data disusun menurut alamat dan nama individu yang spesifik",
    },
    {
      id: "quiz-18",
      question: "Kegiatan tindak lanjut kunjungan rumah dilakukan ketika…",
      options: [
        "Ada sasaran dengan tanda bahaya atau masalah kesehatan yang perlu penanganan lanjutan",
        "Semua kader selesai laporan",
        "Kepala desa meminta data",
        "Puskesmas melakukan inspeksi",
      ],
      correctAnswer: 0,
      explanation:
        "Ada sasaran dengan tanda bahaya atau masalah kesehatan yang perlu penanganan lanjutan",
    },
    {
      id: "quiz-19",
      question:
        "Apa peran kepala desa dalam mendukung kegiatan kunjungan rumah?",
      options: [
        "Menyediakan dana bantuan",
        "Menerbitkan surat edaran dan mensosialisasikan kegiatan kepada masyarakat",
        "Menentukan daftar keluarga sasaran",
        "Memantau laporan ASIK",
      ],
      correctAnswer: 1,
      explanation:
        "Menerbitkan surat edaran dan mensosialisasikan kegiatan kepada masyarakat",
    },
    {
      id: "quiz-20",
      question:
        "Mengapa penting bagi kader untuk menggunakan media KIE saat memberikan edukasi kesehatan?",
      options: [
        "Agar lebih menarik dan memudahkan pemahaman masyarakat terhadap pesan kesehatan",
        "Karena diwajibkan dalam SOP Posyandu",
        "Untuk menghemat waktu penyuluhan",
        "Supaya bisa dilaporkan ke Dinas Kesehatan",
      ],
      correctAnswer: 0,
      explanation:
        "Agar lebih menarik dan memudahkan pemahaman masyarakat terhadap pesan kesehatan",
    },
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
          content: `# Sarana dan Prasarana

## a. Lokasi Pelaksanaan
### Hari Buka Posyandu
- Dilaksanakan di tingkat dusun/RT/RW/Nagari/Banjar atau level setara
- Disepakati bersama untuk melaksanakan kegiatan pelayanan kesehatan dan pemberdayaan masyarakat

### Di Luar Hari Buka
- Dilaksanakan di tingkat keluarga dengan kunjungan rumah
- Juga dapat dilakukan di tingkat Pustu Desa

## b. Prasarana
Untuk melaksanakan Paket Layanan Posyandu yang optimal, diperlukan tempat/bangunan permanen, ruangan dan sarana yang memadai untuk melaksanakan langkah-langkah pelayanan sebagai berikut:
- Tempat tunggu antrian
- Tempat pendaftaran
- Tempat penimbangan, pengukuran
- Tempat pencatatan hasil penimbangan, pengukuran
- Tempat pelayanan kesehatan
- Tempat penyuluhan kesehatan

## c. Peralatan
Alat kesehatan dan perbekalan kesehatan disiapkan bersama tenaga kesehatan dari Puskesmas/Pustu.`,

          duration: "20 menit",
          isCompleted: false,
          type: "text",
        },
        {
          id: "poin1-2",
          title: "Pelayanan Hari Buka",
          content: `# Pelayanan Hari Buka Posyandu

## a. Pengertian
Pelaksanaan pelayanan kesehatan di Posyandu adalah proses pelaksanaan kegiatan pelayanan yang telah direncanakan secara partisipatif oleh masyarakat dan pihak terkait untuk memenuhi kebutuhan kesehatan masyarakat di wilayah kerja Posyandu.

## b. Persiapan Hari Buka Posyandu (H-1)
1. Penjadwalan hari buka posyandu dapat dilakukan secara serentak atau bergantian.
   - Jadwal disesuaikan situasi & kesepakatan masyarakat (termasuk kepala desa dan kader)
   - Posyandu dapat dibuka di luar hari atau jam kerja
2. Mempersiapkan sasaran, tempat pelaksanaan, sarana dan media Posyandu
3. Melakukan pembagian tugas antar kader
4. Mempersiapkan bahan makanan lokal penyuluhan bagi ibu hamil dan balita
5. Menyebarluaskan hari buka Posyandu melalui pertemuan warga setempat

## c. Pelayanan Kesehatan pada Hari Buka (Hari H)
Pelayanan disediakan untuk seluruh siklus hidup:
- Ibu hamil & menyusui
- Bayi & balita
- Anak pra sekolah
- Anak usia sekolah & remaja
- Usia dewasa & lansia

Tiap sasaran mendapatkan pelayanan minimal 5 langkah.

### 1) Alur Pelayanan & Kegiatan Hari Buka Posyandu
Setelah pelayanan selesai:
- Kader & nakes melengkapi pencatatan
- Validasi dan sinkronisasi data
- Menyusun rencana tindak lanjut (misalnya kunjungan rumah)
- Mengevaluasi hasil & merencanakan kegiatan bulan berikutnya

### 2) Sasaran Ibu Hamil/Menyusui
- Mendaftar di kartu register Posyandu
- Menimbang BB, mengukur TB/LILA
- Mencatat hasil pada Buku KIA/Kartu pemeriksaan
- Pelayanan kesehatan (PMT Ibu Hamil KEK/TTD/Deteksi Dini/Rujukan)
- Penyuluhan sesuai kebutuhan

### 3) Sasaran Bayi & Balita
- Pendaftaran
- Penimbangan BB, pengukuran TB/lingkar kepala/LILA
- Plot hasil pada Buku KIA/kartu periksa
- Pelayanan kesehatan (PMT Pemulihan/Oralit/Deteksi dini/Rujukan)
- Penyuluhan sesuai kebutuhan

### 4) Sasaran Anak Usia Sekolah & Remaja
- Pendaftaran
- Penimbangan BB, pengukuran TB/LILA
- Mencatat hasil penimbangan pada kartu bantu
- Pelayanan kesehatan (pemeriksaan Hb/TTD untuk remaja putri)
- Penyuluhan sesuai kebutuhan

### 5) Sasaran Usia Dewasa & Lansia
- Pendaftaran
- Penimbangan BB, pengukuran TB/LILA/tekanan darah
- Pencatatan hasil pemeriksaan
- Pelayanan kesehatan sesuai kebutuhan & rujukan
- Penyuluhan sesuai kebutuhan`,

          duration: "20 menit",
          isCompleted: false,
          type: "text",
        },
        {
          id: "poin1-3",
          title: "Pelayanan di Luar Hari Buka",
          content: `# Pelayanan di Luar Hari Buka Posyandu

## a. Pengertian
Rangkaian kegiatan kesehatan untuk memastikan layanan tetap berjalan meskipun Posyandu tidak sedang buka.

Dilakukan secara aktif oleh kader & tenaga kesehatan untuk:
- Pemantauan masyarakat
- Pengawasan kesehatan berkelanjutan
- Pelayanan yang mudah dijangkau

## b. Tujuan
- Memastikan seluruh sasaran mendapatkan layanan sesuai kebutuhan
- Edukasi dan penyuluhan terus menerus
- Tindak lanjut sasaran yang memerlukan perhatian khusus
- Menggerakkan masyarakat agar berpartisipasi memanfaatkan fasilitas kesehatan (Posyandu, Pustu, Puskesmas)

## c. Jenis Kegiatan

### ✅ Kunjungan Rumah
Kegiatan kader mendatangi rumah warga untuk:
- Memantau kesehatan langsung
- Mengidentifikasi tanda bahaya
- Memantau kepatuhan minum obat
- Memberikan pendampingan kesehatan

### ✅ Pemberdayaan Masyarakat
Upaya edukatif & partisipatif untuk:
- Meningkatkan pengetahuan dan kesadaran kesehatan
- Memanfaatkan potensi lokal dan budaya setempat
- Mendorong kemandirian masyarakat menghadapi masalah kesehatan

Pelaksanaan oleh:
- Kader Posyandu
- Tenaga kesehatan
- Aparat desa
- Forum peduli kesehatan`,

          duration: "20 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [],
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

Pencatatan dan pelaporan oleh Kader di Posyandu dilakukan menggunakan instrumen manual atau elektronik sesuai kondisi situasi wilayah.

Instrumen manual menggunakan sistem Kartu sederhana yang digunakan pada:
- Hari buka posyandu
- Kunjungan rumah

Pencatatan dan pelaporan dilakukan untuk memberikan informasi tentang:
- Hasil pelayanan hari buka
- Kunjungan rumah
- Kondisi kesehatan seluruh sasaran masyarakat

Hasil pencatatan dapat menjadi acuan:
- Puskesmas
- Dinas Kesehatan

Dalam pembinaan Kader dan Posyandu.

Pencatatan dilakukan setiap bulan oleh Kader, kemudian hasil rekapitulasi dilaporkan kepada tenaga kesehatan di Puskesmas Pembantu atau Puskesmas.

---

## a. Pencatatan tingkat masyarakat

Menggunakan Buku KIA bagi sasaran ibu dan balita.

Ketentuan pencatatan:
- Dilakukan setelah bayi/baduta diimunisasi
- Diisi tanggal, bulan dan tahun pemberian imunisasi
- Harus dilakukan segera saat pelayanan
- Tidak ditunda dan diisi lengkap sesuai format

---

## b. Pencatatan tingkat Posyandu

Dilakukan dengan **pencatatan manual** pada hari buka posyandu.

Menggunakan kartu pemeriksaan sesuai kelompok sasaran:
- Kartu bantu pemeriksaan kesehatan ibu hamil, melahirkan/nifas
- Kartu bantu pemeriksaan kesehatan bayi, balita dan anak pra sekolah
- Kartu bantu pemeriksaan kesehatan anak usia sekolah dan remaja
- Kartu bantu pemeriksaan kesehatan usia dewasa dan lansia
- Kartu/Buku bantu data sasaran (nama sasaran, jumlah sasaran wilayah Posyandu)
- Kartu/Buku Rekapitulasi hari buka (jumlah sasaran datang/tidak, normal/masalah, rujuk/tidak)

Dengan kartu tersebut dapat terlihat:
- Pelayanan apa saja yang sudah atau belum diterima sasaran
- Kondisi kesehatan sasaran untuk tindak lanjut (kunjungan rumah bila perlu)

---

### ✅ Pencatatan kunjungan rumah

Menggunakan **form checklist** sesuai siklus hidup:

Checklist meliputi:
- Data keluarga dan anggota keluarga
- Checklist ibu hamil
- Checklist ibu bersalin dan nifas
- Checklist bayi (0-6 bulan)
- Checklist balita dan anak prasekolah (6-71 bulan)
- Checklist usia sekolah dan remaja (≥ 6-18 tahun)
- Checklist usia dewasa (19-59 tahun)
- Checklist lanjut usia (≥ 60 tahun)
- Checklist pengendalian penyakit menular (TBC)

### Evaluasi Hasil Kunjungan Rumah
Dilakukan setiap minggu bersama tenaga kesehatan dan kader di Pustu menggunakan:
- Form Rekapitulasi Hasil Kunjungan Rumah
- Form Tindak Lanjut Kunjungan Rumah`,
          duration: "25 menit",
          isCompleted: false,
          type: "text",
        },

        {
          id: "poin2-2",
          title: "Pencatatan dan Pelaporan Digital",
          content: `# Pencatatan dan Pelaporan Digital Posyandu

Pencatatan dan pelaporan posyandu secara digital dapat dilakukan melalui:
- Aplikasi Sehat IndonesiaKu (ASIK)
- Chatbot WhatsApp

Tujuan:
- Mendapatkan data kesehatan individu yang bersifat unik dan kohort
- Tercatat **by name by address (BNBA)**

Saat ini mendukung pencatatan:
- Imunisasi
- PTM (usia dewasa dan lansia)
- Bayi dan balita

Dalam pengembangan:
- Pencatatan ibu hamil
- Pencatatan remaja dan usia sekolah
- Fitur lain secara bertahap ditambahkan dalam ASIK & WhatsApp chatbot

---

## a. Pencatatan menggunakan Aplikasi ASIK

Dilakukan oleh tenaga kesehatan maupun kader yang sudah terdaftar.

Kader harus:
- Download ASIK mobile di Play Store
- Memastikan bukan versi training

### Langkah pendaftaran kader:
1) Buka ASIK mobile
2) Klik "Daftar"
3) Pilih profesi: Bidan/Dokter/Perawat/Kader dsb
4) Masukkan data:
   - NIK
   - Nama lengkap
   - Nomor WhatsApp aktif
   - Provinsi
   - Kabupaten/Kota
   - Kecamatan
   - Tipe Faskes
   - Puskesmas
   - Kode Puskesmas
5) Pilih tipe faskes: Puskesmas Kecamatan
6) Pilih Posyandu sesuai lokasi desa/kelurahan
7) Masukkan nomor WhatsApp untuk login
8) Input kode OTP dari WhatsApp
9) Kader dapat memulai pencatatan

Bisa dibantu pendaftarannya oleh petugas terkait.

---

## b. Pencatatan bayi & balita

Difokuskan pada:
- Tumbuh kembang
- Status gizi
- Imunisasi

Yang dicatat:
- Berat badan & tinggi badan rutin
- ASI eksklusif
- PMT
- Vitamin A

ASIK:
- Menganalisis status gizi otomatis
- Memberikan rekomendasi intervensi

Imunisasi dicatat lengkap:
- Identitas anak
- Jenis imunisasi
- Tanggal
- Nomor batch vaksin

Semua data dapat dipantau melalui dashboard Puskesmas.

---

## c. Pencatatan usia dewasa & lansia

Difokuskan pada deteksi dini PTM:
- Obesitas
- Hipertensi
- Diabetes melitus
- Gangguan indera
- Pemeriksaan kanker

Yang dicatat:
- Data diri
- Riwayat penyakit pribadi & keluarga
- Faktor risiko
- Pola konsumsi
- Antropometri
- Tekanan darah
- Gula darah
- Pemeriksaan indera

Sistem menampilkan edukasi otomatis  
Jika perlu rujukan → tandai **Rujuk ke Puskesmas**

---

## d. Pencatatan melalui Chatbot WhatsApp

Inovasi untuk mempermudah tugas administrasi kader.

Hanya untuk kader terdaftar di ASIK.

Yang bisa dicatat:
- Penimbangan bayi & balita
- Data kesehatan anak
- PMT & vitamin

Data yang dimasukkan:
- NIK, nama, tanggal lahir anak
- NIK ibu
- Nomor WhatsApp ibu
- BB/TB anak

Sistem menampilkan otomatis:
- Grafik pertumbuhan
- Status gizi
- Rekomendasi tindak lanjut

Data terintegrasi ke ASIK dan dashboard Puskesmas untuk:
- Evaluasi
- Perencanaan program
- Peningkatan layanan posyandu`,
          duration: "25 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [],
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
          title:
            "Kunjungan Rumah Posyandu: Pengertian, Sasaran, Tujuan, Manfaat, Tugas Kader, Alur, Pelaksanaan, Evaluasi dan Pelaporan",
          content: `# C. Kunjungan Rumah

## 1. Pengertian
Kunjungan rumah atau disebut juga **Kunjungan Keluarga** merupakan kegiatan memantau kesehatan masyarakat yang dilakukan oleh kader dengan mendatangi rumah warga di wilayah kerja Posyandu.

---

## 2. Tujuan
a. Memastikan masyarakat mendapatkan pelayanan yang seharusnya  
b. Mengidentifikasi tanda bahaya  
c. Mengidentifikasi ketidakpatuhan minum obat  

---

## 3. Manfaat
a. Masyarakat mengetahui standar pelayanan kesehatan yang dapat dijangkau seperti Posyandu, Pustu atau Puskesmas atau fasilitas kesehatan terdekat lainnya  
b. Mendapatkan pendampingan dan edukasi pada saat mengalami tanda bahaya dan dalam masa pengobatan  
c. Diharapkan dapat mengubah perilaku masyarakat dalam mengatasi masalah kesehatannya  

---

## 4. Sasaran
Seluruh keluarga di wilayah Posyandu

---

## 5. Tugas Kader
a. Melakukan kunjungan rumah secara rutin dan terencana  
b. Melakukan pendataan dan pencatatan sederhana  
c. Memberikan penyuluhan/edukasi kesehatan  
d. Mendampingi sasaran yang mempunyai masalah kesehatan  
e. Menggerakkan masyarakat untuk periksa kesehatan dengan memanfaatkan Posyandu, Pustu, Puskesmas, dan pelayanan kesehatan terdekat lainnya  
g. Melaporkan hasil kunjungan rumah kepada tenaga kesehatan di Pustu dan Pokja tingkat Desa/Kelurahan seminggu sekali  

---

## 6. Alur Pelaksanaan
a. Kunjungan rumah dilakukan oleh kader berdasarkan data sasaran/masyarakat di wilayah Posyandu dan data dari Puskesmas melalui Pustu (data PWS).  
b. Kunjungan rumah dilakukan minimal satu kali dalam sebulan sesuai tujuannya:

### Jenis Kunjungan
- **Kunjungan rutin**: dilakukan minimal setiap tahun untuk seluruh masyarakat  
- **Kunjungan khusus**: bagi masyarakat yang berisiko menurut data Posyandu dan PWS  
- **Kunjungan rumah bersama tenaga kesehatan**: untuk sasaran yang perlu penanganan lebih lanjut  

c. Hasil kunjungan rumah dilaporkan ke tenaga kesehatan Pustu minimal sekali seminggu  
d. Kepala Desa/Lurah mendukung kegiatan kunjungan rumah dengan surat edaran dan sosialisasi masyarakat  

---

## 7. Pelaksanaan Kunjungan Rumah

### a. Persiapan
- Kepala Desa menerbitkan surat edaran pelaksanaan kunjungan rumah  
- Sosialisasi kegiatan melalui pertemuan warga/pengajian/forum desa  
- Kader mengumpulkan dan membagi data sasaran  
- Menyusun jadwal kunjungan rumah  
- Menyiapkan alat & bahan:
  1. Tanda pengenal Kader Posyandu  
  2. Buku percakapan kader  
  3. Buku panduan pengelolaan Posyandu bidang kesehatan  
  4. Buku KIA atau kartu bantu pemeriksaan  
  5. Media KIE  
  6. Checklist sesuai kelompok sasaran  

### b. Pelaksanaan “SAJI”
1) **SALAM**
- Ucapkan salam sesuai kebiasaan daerah  
- Tanyakan kabar keluarga  
- Sampaikan tujuan kedatangan  

2) **AJAK BICARA**
- Wawancara sesuai form (data keluarga & kesehatan)  
- Periksa buku KIA/catatan kesehatan  
- Dengarkan keluhan sasaran  

3) **JELASKAN DAN BANTU**
- Beri edukasi sesuai permasalahan kesehatan  
- Gunakan media KIE  

4) **INGATKAN**
- Terapkan perilaku sehat  
- Akses pelayanan Posyandu/Puskesmas  
- Konsultasi jika butuh layanan kesehatan  

---

### c. Pemantauan melalui Checklist
- Data keluarga  
- Data sasaran:
  * Ibu hamil, bersalin, nifas  
  * Bayi, balita, anak prasekolah  
  * Usia sekolah & remaja  
  * Dewasa & lansia  
  * Pengendalian penyakit menular (TBC)  

### d. Apresiasi & Motivasi
- Mengapresiasi perilaku sehat  
- Memotivasi untuk tetap memantau kesehatan  
- Mendorong akses layanan kesehatan  
- Merujuk jika terdapat tanda bahaya  

---

## 8. Evaluasi Kunjungan Rumah
Dilakukan seminggu sekali bersama tenaga kesehatan dan kader Pustu menggunakan:
- Form rekapitulasi hasil kunjungan rumah  

### Rekapitulasi berdasarkan kategori:
a) Tidak mengakses pelayanan kesehatan  
b) Tidak patuh pengobatan  
c) Memiliki tanda bahaya  
d) Memiliki gejala TBC  

---

## 9. Tindak Lanjut
Dilakukan oleh tenaga kesehatan dan kader Pustu:
1) Kunjungan rumah didampingi kader Posyandu  
2) Pelayanan kesehatan dan edukasi sesuai kebutuhan  
3) Rujukan ke Puskesmas/Faskes jika diperlukan  

Kader Posyandu mendampingi jika dibutuhkan

---

## 10. Pelaporan
- Dilaporkan setiap minggu saat evaluasi  
- Digunakan sebagai bahan PWS (Pemantauan Wilayah Setempat) oleh Pustu dan dilaporkan ke Puskesmas  

`,
          duration: "35 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [],
    },
  ],
};

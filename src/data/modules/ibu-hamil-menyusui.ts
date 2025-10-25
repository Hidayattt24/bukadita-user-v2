import { DetailModul } from "./types";

export const ibuHamilMenyusuiData: DetailModul = {
  id: 3, // 🔥 FIX: Changed from 4 to 3 to match modulData.ts
  slug: "ibu-hamil-menyusui",
  title: "Menu Ibu Hamil & Menyusui",
  description:
    "Modul komprehensif untuk kader: gizi seimbang & PMT pemulihan, edukasi tanda bahaya kehamilan, risiko penyulit kehamilan, senam kehamilan, dan edukasi ASI eksklusif.",
  duration: "7 jam 30 menit",
  lessons: 5,
  difficulty: "Menengah",
  category: "Ibu Hamil & Menyusui",
  status: "not-started",
  progress: 0,
  rating: 4.9,
  students: 980,
  thumbnail: "/dummy/ibu-hamil-menyusui.png",
  instructor: "Tim Pengabdian Masyarakat USK",
  estimatedCompletion: "7 hari",
  overview:
    "Membekali kader dengan materi utuh dari naskah: gizi seimbang dan PMT pemulihan pada kehamilan, tanda bahaya & risiko penyulit kehamilan, senam kehamilan yang aman, serta edukasi ASI eksklusif.",
  learningObjectives: [
    "Memahami prinsip gizi seimbang pada kehamilan dan PMT pemulihan",
    "Mengenali tanda-tanda bahaya kehamilan untuk rujukan cepat",
    "Mengidentifikasi faktor risiko penyulit (4T, 3 terlambat, dsb.)",
    "Mempraktikkan senam hamil yang aman dan bermanfaat",
    "Mengedukasi ASI eksklusif untuk ibu hamil dan menyusui",
  ],
  requirements: [
    "Kader posyandu aktif dengan sasaran ibu hamil/menyusui",
    "Mengenal alur rujukan di wilayah kerja",
    "Perangkat untuk pembelajaran daring",
  ],
  quiz: [
    {
      id: "quiz-1",
      question: "Gizi seimbang adalah pola makan yang…",
      options: [
        "Hanya terdiri dari sayur dan buah",
        "Mengandung zat gizi sesuai kebutuhan tubuh",
        "Mengandung banyak karbohidrat saja",
        "Berfokus pada makanan tinggi lemak",
      ],
      correctAnswer: 1,
      explanation: "Mengandung zat gizi sesuai kebutuhan tubuh",
    },
    {
      id: "quiz-2",
      question: "Kekurangan asam folat pada ibu hamil dapat menyebabkan…",
      options: [
        "Berat badan berlebih",
        "Tekanan darah rendah",
        "Preeklamsia dan gangguan pertumbuhan janin",
        "Gangguan tidur",
      ],
      correctAnswer: 2,
      explanation: "Preeklamsia dan gangguan pertumbuhan janin",
    },
    {
      id: "quiz-3",
      question: "Kebutuhan energi tambahan untuk ibu hamil adalah…",
      options: [
        "50–100 kkal per hari",
        "180–300 kkal per hari",
        "400–600 kkal per hari",
        "700 kkal per hari",
      ],
      correctAnswer: 1,
      explanation: "180–300 kkal per hari",
    },
    {
      id: "quiz-4",
      question: "Ibu hamil dikatakan berisiko KEK jika LiLA kurang dari…",
      options: ["20 cm", "21,5 cm", "22 cm", "23,5 cm"],
      correctAnswer: 3,
      explanation: "23,5 cm",
    },
    {
      id: "quiz-5",
      question: "Salah satu sumber zat besi yang baik untuk ibu hamil adalah…",
      options: [
        "Susu rendah lemak",
        "Daging merah tanpa lemak",
        "Roti tawar",
        "Ubi jalar",
      ],
      correctAnswer: 1,
      explanation: "Daging merah tanpa lemak",
    },
    {
      id: "quiz-6",
      question:
        "Tanda bahaya pada kehamilan trimester kedua yang memerlukan perhatian medis segera adalah…",
      options: [
        "Sering buang air kecil",
        "Mual ringan di pagi hari",
        "Gerakan janin berkurang drastis",
        "Nafsu makan meningkat",
      ],
      correctAnswer: 2,
      explanation: "Gerakan janin berkurang drastis",
    },
    {
      id: "quiz-7",
      question:
        "Pembengkakan kaki yang disertai pusing kepala dan pandangan kabur dapat menjadi tanda…",
      options: [
        "Infeksi saluran kemih",
        "Preeklamsia",
        "Anemia",
        "Kekurangan cairan",
      ],
      correctAnswer: 1,
      explanation: "Preeklamsia",
    },
    {
      id: "quiz-8",
      question:
        'Salah satu penyebab tidak langsung kehamilan risiko tinggi berdasarkan istilah "4T" adalah…',
      options: [
        "Terlalu jarang olahraga",
        "Terlalu banyak melahirkan",
        "Terlalu sering makan manis",
        "Terlalu lama menyusui",
      ],
      correctAnswer: 1,
      explanation: "Terlalu banyak melahirkan",
    },
    {
      id: "quiz-9",
      question: 'Risiko dari "3 Terlambat" pada ibu hamil adalah…',
      options: [
        "Kegemukan",
        "Penanganan medis yang terlambat",
        "Kelebihan zat gizi",
        "Kehamilan ganda",
      ],
      correctAnswer: 1,
      explanation: "Penanganan medis yang terlambat",
    },
    {
      id: "quiz-10",
      question:
        "Salah satu bahaya dari kehamilan risiko tinggi yang dapat menyebabkan kejang dan koma adalah…",
      options: ["Preeklamsia", "Eklamsia", "PJT", "IUFD"],
      correctAnswer: 1,
      explanation: "Eklamsia",
    },
    {
      id: "quiz-11",
      question: "Salah satu manfaat senam hamil adalah…",
      options: [
        "Membuat bayi lebih besar",
        "Mencegah varises dan memperpanjang napas",
        "Menambah tekanan darah",
        "Mengurangi kontraksi",
      ],
      correctAnswer: 1,
      explanation: "Mencegah varises dan memperpanjang napas",
    },
    {
      id: "quiz-12",
      question: 'Gerakan senam "Kegel" bermanfaat untuk…',
      options: [
        "Menguatkan otot panggul",
        "Melatih pernapasan",
        "Mengurangi sakit kepala",
        "Membakar lemak perut",
      ],
      correctAnswer: 0,
      explanation: "Menguatkan otot panggul",
    },
    {
      id: "quiz-13",
      question:
        "Waktu yang disarankan untuk mulai melakukan senam hamil adalah…",
      options: [
        "8–12 minggu",
        "14–20 minggu",
        "22–36 minggu",
        "Setelah melahirkan",
      ],
      correctAnswer: 1,
      explanation: "14–20 minggu",
    },
    {
      id: "quiz-14",
      question: "Tujuan utama senam hamil adalah…",
      options: [
        "Mengajarkan ibu makan bergizi",
        "Mempersiapkan fisik dan mental menghadapi persalinan",
        "Menurunkan berat badan",
        "Menambah kekuatan tangan",
      ],
      correctAnswer: 1,
      explanation: "Mempersiapkan fisik dan mental menghadapi persalinan",
    },
    {
      id: "quiz-15",
      question: "Salah satu olahraga yang aman bagi ibu hamil adalah…",
      options: [
        "Lari cepat",
        "Angkat beban berat",
        "Berenang gaya dada",
        "Lompat tali",
      ],
      correctAnswer: 2,
      explanation: "Berenang gaya dada",
    },
    {
      id: "quiz-16",
      question:
        "Salah satu penyebab tidak langsung tingginya angka kematian ibu hamil adalah…",
      options: [
        "Terlambat mengambil keputusan, terlambat sampai ke faskes, dan terlambat mendapat penanganan",
        "Kurangnya olahraga selama kehamilan",
        "Terlalu banyak mengonsumsi protein",
        "Kurang tidur di malam hari",
      ],
      correctAnswer: 0,
      explanation:
        "Terlambat mengambil keputusan, terlambat sampai ke faskes, dan terlambat mendapat penanganan",
    },
    {
      id: "quiz-17",
      question: "Pencegahan kehamilan risiko tinggi dapat dilakukan dengan…",
      options: [
        "Menghindari imunisasi",
        "Makan tanpa memperhatikan gizi",
        "Rutin pemeriksaan kehamilan dan konsumsi asam folat",
        "Menghindari olahraga sama sekali",
      ],
      correctAnswer: 2,
      explanation: "Rutin pemeriksaan kehamilan dan konsumsi asam folat",
    },
    {
      id: "quiz-18",
      question: "Bayi yang tidak diberi ASI eksklusif berisiko mengalami…",
      options: [
        "Peningkatan daya tahan tubuh",
        "Kecerdasan optimal",
        "Kekurangan gizi dan infeksi kronis",
        "Berat badan ideal",
      ],
      correctAnswer: 2,
      explanation: "Kekurangan gizi dan infeksi kronis",
    },
    {
      id: "quiz-19",
      question:
        "Frekuensi ideal bayi menyusu pada minggu pertama kehidupan adalah…",
      options: [
        "3–5 kali per hari",
        "5–7 kali per hari",
        "8–12 kali per hari",
        "15 kali per hari",
      ],
      correctAnswer: 2,
      explanation: "8–12 kali per hari",
    },
    {
      id: "quiz-20",
      question: "Cara pelekatan menyusui yang benar adalah…",
      options: [
        "Bayi membuka mulut kecil dan mengisap ujung puting",
        "Dagu bayi menjauh dari payudara",
        "Bibir bawah bayi memutar keluar dan dagu menempel pada payudara",
        "Ibu menekan kepala bayi agar menempel",
      ],
      correctAnswer: 2,
      explanation:
        "Bibir bawah bayi memutar keluar dan dagu menempel pada payudara",
    },
  ],

  subMateris: [
    // 1) Gizi seimbang dan PMT pemulihan
    {
      id: "sub1",
      title: "Gizi Seimbang & PMT Pemulihan",
      description:
        "Pengertian gizi seimbang, kebutuhan nutrisi ibu hamil, gizi seimbang untuk ibu hamil, pentingnya makanan tambahan, manfaat gizi seimbang, 13 pesan umum, hingga nutrisi saat puasa.",
      duration: "95 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin1-1",
          title: "Materi Utuh (Markdown dari naskah)",
          content: `# MENU IBU HAMIL DAN MENYUSUI
_(Gizi seimbang)_

## 1. PENGERTIAN
Gizi seimbang  adalah susunan asupan sehari-hari yang jenis dan jumlah zat gizinya sesuai dengan kebutuhan tubuh. Pemenuhan asupan gizi ini juga harus memperhatikan prinsip keanekaragaman pangan, aktivitas fisik, Perilaku Hidup Bersih, dan mempertahankan berat badan normal guna mencegah masalah gizi.

## 2. KEBUTUHAN NUTRSI IBU HAMIL
Selain zat gizi makro seperti karbohidrat, protein dan lemak, ibu hamil juga membutuhkan zat gizi mikro, seperti vitamin dan suplemen. Berikut adalah zat gizi penting yang harus ada dalam makanan Ibu hamil untuk memastikan kesehatan ibu dan janin dalam kandungannya.

### Asam Folat:
Penting untuk pertumbuhan sel dan organ janin, serta mengontrol tekanan darah ibu.

ekurangan asam folat dapat menyebabkan gangguan pertumbuhan janin dan gangguan kehamilan, seperti preeklamsia atau komplikasi kehamilan yang ditandai dengan peningkatan tekanan darah disertai dengan adanya protein dalam urin.

**Sumber asam folfat:** Kacang-kacangan, hati, telur, sayuran hijau.  
**Kebutuhan:** 600-800 mcg per hari.

### Kalsium:
Membantu pembentukan tulang dan gigi janin, serta menjaga kesehatan tulang ibu.

Bantu Menurunkan risiko hipertensi dan kelahiran prematur.

**Sumber Kalsium:** Susu, produk susu, ikan, tahu, sayuran hijau tua.

### Protein:
Bantu pembentukan darah bagi ibu hamil, serta zat pembangun jaringan tubuh pada janin.

**Sumber:** Ikan, ayam ( terutama tidak berlemak ) dan telur (harus benar-benar masak).

### Lemak:
Lemak sehat (omega 3 dan DHA) mendukung perkembangan mata dan otak janin.

**Sumber:** Alpukat, kacang-kacangan, biji-bijian, ikan berlemak (salmon, sarden, tuna).

### Zat Besi:
Penting untuk pembentukan sel darah merah.

Kekurangan meningkatkan risiko kelahiran prematur, berat badan lahir rendah, dan depresi pasca melahirkan.

**Sumber:** Daging merah tanpa lemak, ikan, unggas, sayuran, kacang-kacangan, suplemen tablet tambah darah (TTD).

### Vitamin:
Selama kehamilan ibu hamil membutuhkan asupan vitamin, terutama vitamin B dan D. 

**Vitamin B (B1, B2, B6, B9, B12):** Energi dan optimasi kondisi plasenta.  
**Vitamin D Terutama (D3):** Mendukung pertumbuhan tulang janin.

**Sumber Vitamin B:** Daging ayam, pisang, kacang-kacangan, gandum utuh, roti.  
**Sumber Vitamin D:** Susu, jeruk, ikan, sinar matahari pagi.

## 3. GIZI SEIMBANG UNTUK IBU HAMIL
Kebutuhan Gizi Dasar: Wanita usia 19-49 tahun memerlukan sekitar 2150-2250 kkal energi dan 60 gram protein per hari.

Tambahan untuk Ibu Hamil: Ibu hamil memerlukan tambahan 180-300 kkal energi dan 30 gram protein per hari.

Penambahan Berat Badan: Untuk menambah berat badan 0.5 kg per minggu, ibu hamil (termasuk yang KEK) membutuhkan tambahan 500 kkal per hari.

Sumber Energi: Kurang dari 25% energi tambahan sebaiknya berasal dari protein.

## 4. PENTINGNYA MAKANAN TAMBAHAN UNTUK IBU HAMIL
Definisi Bumil KEK: Ibu hamil yang tidak mencukupi kebutuhan gizinya berisiko mengalami Kurang Energi Kronis (KEK).

Kriteria KEK: Ibu hamil berisiko KEK jika Lingkar Lengan Atas (LiLA) kurang dari 23,5 cm atau Indeks Massa Tubuh (IMT) di trimester pertama (≤12 minggu) kurang dari 18,5 kg/m²( kurus).

## 5. MANFAAT GIZI SEIMBANG
1. Memenuhi kebutuhan zat gizi ibu dan janin  
2. Mencapai status gizi ibu hamil dalam keadaan normal, sehingga  
3. dapat menjalani kehamilan dengan baik dan aman  
4. Membentuk jaringan untuk tumbuh kembang janin dan kesehatan ibu  
5. Mengatasi permasalahan selama kehamilan  
6. Ibu memperoleh energi yang cukup yang berfungsi untuk menyusui setelah kelahiran bayi.

## 6. 13 PESAN UMUM UNTUK GIZI SEIMBANG
1. Makan aneka ragam makanan  
2. Makan makanan yang memenuhi kebutuhan energi  
3. Makan sumber karbohidrat setengah dari kebutuhan energi  
4. Batasi lemak seperempat dari kecukupan energi  
5. Gunakan garam beryodium 6. Makan makanan sumber zat besi  
7. Beri ASI pada bayi sampai umur enam bulan 8. Biasakan makan pagi  
9. Minum air bersih, aman dan cukup jumlahnya  
10. Beraktifitas fisik dan olah raga secara teratur  
11. Hindari minum minuman beralkohol  
12. Makan makanan yang aman bagi kesehatan  
13. Baca label pada makanan kemasan

## 7. NUTRISI IBU HAMIL SAAT PUASA
Hamil bukan merupakan hambatan bagi ibu untuk menjalankan ibadah puasa, sepanjang tidak ada komplikasi atau masalah kesehatan yang serius. Pastikan kondisi ibu benar-benar sehat dan konsultasikan terlebih dahulu pada tenaga kesehatan.

**Makanan Sumber Energi Saat Sahur:**  
Pilih makanan kaya energi seperti nasi, roti gandum, atau sereal berserat tinggi.  
Lengkapi dengan camilan sehat seperti pisang dan kurma.

**Makan Sedikit tapi Sering:**  
Waktu makan: saat adzan maghrib, sebelum tarawih, sebelum tidur, dan saat sahur.  
Hindari porsi besar dan makanan tinggi gula saat berbuka.  
Mulai dengan camilan ringan (kurma atau protein nabati).  
Konsumsi makanan berat bergizi seimbang setelah kadar gula normal.

**Minum Susu:**  
Minum susu saat berbuka dan sahur.  
Susu mengandung protein, kalsium, dan vitamin untuk pertumbuhan janin.

**Kurangi Minuman Berkafein:**  
Hindari minuman berkafein (teh dan kopi).  
Perbanyak minum air putih saat sahur dan berbuka untuk mencegah dehidrasi.  
Konsumsi buah-buahan yang mengandung cairan (semangka atau blewah).

**Minum Vitamin dan Suplemen:**  
Konsumsi vitamin dan suplemen (seperti tablet tambah darah/TTD).  
Jangan lupa minum vitamin dan suplemen yang diberikan dokter/bidan.`,
          duration: "60 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },

    // 2) Edukasi tanda bahaya kehamilan
    {
      id: "sub2",
      title: "Edukasi Tanda Bahaya Kehamilan",
      description:
        "Daftar tanda bahaya utama pada masa kehamilan yang memerlukan rujukan segera.",
      duration: "50 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin2-1",
          title: "Materi Utuh (Markdown dari naskah)",
          content: `# MENU IBU HAMIL DAN MENYUSUI
_(Edukasi tanda bahaya kehamilan)_

## 1. Tanda-Tanda Bahaya Pada Masa Kehamilan
**Tidak Mau Makan dan Muntah Terus-Menerus**  
Mual-muntah memang banyak dialami oleh ibu hamil, terutama ibu hamil pada trimester pertama kehamilan. Namun jika mual-muntah tersebut terjadi terus-menerus dan berlebihan bisa menjadi tanda bahaya pada masa kehamilan. Hal itu dikarenakan dapat menyebabkan kekurangan gizi, dehidrasi, dan penurunan kesadaran. Segera temui dokter jika hal ini terjadi agar mendapatkan penanganan dengan cepat.

**Mengalami Demam Tinggi**  
Ibu hamil harus mewaspadai hal ini jika terjadi. Hal ini dikarenakan bisa saja jika demam dipicu karena adanya infeksi. Jika demam terlalu tinggi, ibu hamil harus segera diperiksakan ke rumah sakit untuk mendapatkan pertolongan pertama.

**Pergerakan Janin di Kandungan Kurang**  
Pergerakan janin yang kurang aktif atau bahkan berhenti merupakan tanda bahaya selanjutnya. Hal ini menandakan jika janin mengalami kekurangan oksigen atau kekurangan gizi. Jika dalam dua jam janin bergerak di bawah sepuluh kali, segera periksakan kondisi tersebut ke dokter.

**Beberapa Bagian Tubuh Membengkak**  
Selama masa kehamilan ibu hamil sering mengalami perubahan bentuk tubuh seperti bertambahnya berat badan. Ibu hamil akan mengalami beberapa pembengkakan seperti pada tangan, kaki dan wajah karena hal tersebut. Namun, jika pembengkakan pada kaki, tangan dan wajah disertai dengan pusing kepala, nyeri ulu hati, kejang dan pandangan kabur segera bawa ke dokter untuk ditangani, karena bisa saja ini pertanda terjadinya pre-eklampsia.

**Terjadi Pendarahan**  
Ibu hamil harus waspada jika mengalami pendarahan, hal ini bisa menjadi tanda bahaya yang dapat mengancam pada baik pada janin maupun pada ibu. Jika mengalami pendarahan hebat pada saat usia kehamilan muda, bisa menjadi tanda mengalami keguguran. Namun, jika mengalami pendarahan pada usia hamil tua, bisa menjadi pertanda plasenta menutupi jalan lahir.

**Air Ketuban Pecah Sebelum Waktunya**  
Jika ibu hamil mengalami pecah ketuban sebelum waktunya segera periksakan diri ke dokter, karena kondisi tersebut dapat membahayakan kondisi ibu dan bayi. Hal ini dapat mempermudah terjadinya infeksi dalam kandungan.

## 2. Perkembangan janin di trimester 2
_(konten lanjutan sesuai dokumen bila ada)_`,
          duration: "25 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },

    // 3) Risiko penyulit kehamilan
    {
      id: "sub3",
      title: "Risiko Penyulit Kehamilan",
      description:
        "Faktor risiko kehamilan risiko tinggi, 4T, 3 terlambat, serta contoh bahaya preeklamsia/eklamsia, dsb.",
      duration: "60 menit",
      isCompleted: false,
      isUnlocked: false,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin3-1",
          title: "Materi Utuh (Markdown dari naskah)",
          content: `# MENU IBU HAMIL DAN MENYUSUI
_(Resiko penyulit kehamilan)_

Kehamilan resiko tinggi terjadi pada sebagian kecil ibu hamil, namun  penting sekali setiap ibu hamil diwaspadai terjadinya komplikasi. Salah Satu Bentuk upaya Pemeliharaan Kesehatan Ibu hamil adalah Pemeriksaan ditenaga Kesehatan. Pemeriksaaan yang dilakukan secara Rutin akan Menolong ibu hamil untuk dapat mengetahui Kondisi Kesehatan Ibu dan Janinnya.

## 1. Faktor resiko kehamilan resiko tinggi, diantaranya adalah :
- Usia Ibu > 35 tahun dan usia < 20>  
- Riwayat penyakit ibu: Gangguan/kelainan darah,  Autoimun, Penyakit Tiroid, Diabetes,  Obesitas, HIV/AIDS, Penyakit jantung. 
- Gaya Hidup: Merokok, Konsumsi Alkohol. 
- Riwayat Kehamilan dan Persalianan: Kelahiran prematur, Perdarahan saat hamil, Melahirkan  4x/ lebih,  Keguguran berulang, Bekas operasi secar. 
- Jarak Kehamilan >> Jarak kelahiran dengan anak terkecil < 2>

## 2. Penyebab tidak langsung kehamilan resiko tinggi dengan istilah 4T, yaitu: 
- Terlalu muda : Melahirkan dibawah usia 20 tahun (5,2%).
- Terlalu tua : Melahirkan diatas usia 35 tahun  (4,9%)
- Terlalu dekat : Jarak melahirkan terlalu dekat (6,1%)
- Terlalu banyak: Sering melahirkan (10,3%)

## 3. Faktor resiko semakin tinggi jika disertai 3 terlambat, yaitu :
- Terlambat Mengambil Keputusan sehingga Terlambat untuk mendapatkan penanganan
- Terlambat sampai ke Fasilitas Kesehatan, terkendala transportasi
- Terlambat mendapat penanganan, terbatasnya sarana dan sumber daya manusia

## 4. Apa saja bahaya kehamilan resiko tinggi, yaitu :
- **Pre Eklampsia**: Preeklampsia adalah komplikasi kehamilan yang ditandai dengan tekanan darah tinggi dan tanda-tanda kerusakan pada organ lain, seperti ginjal dan hati. Kondisi ini biasanya dimulai setelah usia kehamilan 20 minggu pada wanita yang sebelumnya memiliki tekanan darah normal. Dapat menyebabkan kelahiran prematur dan bayi lahir dengan berat badan rendah. Selain itu, dapat berkembang menjadi eklampsia
- **Eklampsia**: Eklampsia adalah kondisi yang lebih parah dari preeklampsia, ditandai dengan kejang-kejang pada ibu hamil. Dapat menyebabkan koma, kerusakan organ, dan bahkan kematian pada ibu dan bayi

_(lanjutan bahaya/penyulit lain bila ada pada dokumen yang sama)_`,
          duration: "30 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },

    // 4) Senam kehamilan
    {
      id: "sub4",
      title: "Senam Kehamilan",
      description:
        "Pengertian, tujuan, manfaat, hal yang perlu diperhatikan, gerakan yang bisa dilakukan, keuntungan, serta ragam olahraga yang bisa dicoba.",
      duration: "85 menit",
      isCompleted: false,
      isUnlocked: false,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin4-1",
          title: "Materi Utuh (Markdown dari naskah)",
          content: `# MENU IBU HAMIL DAN MENYUSUI
_(Senam kehamilan)_

## 1. PENGERTIAN
Senam hamil merupakan terapi latihan gerak dan salah satu kegiatan dalam pelayanan selama kehamilan atau prenatal care yang bertujuan untuk mempersiapkan ibu hamil secara fisik dan mental saat menghadapi persalinan agar persalinan normal dapat berlangsung dengan cepat, aman, dan spontan.

Melalui senam hamil, ibu hamil akan diajarkan cara mengurangi kecemasan dan mengurangi rasa takut dengan cara relaksasi fisik dan mental, serta mendapatkan informasi untuk mempersiapkan tentang apa saja yang akan terjadi selama persalinan.

## 2. TUJUAN :
- Memperkuat dan mempertahankan elastisitas otot dinding perut, ligamen,dan otot dasar panggul yang berhubungan dengan proses persalinan.  
- Membentuk sikap tubuh, sikap tubuh yang baik selama kehamilan dan persalinan dapat mengatasi keluhan-keluhan umum pada wanita hamil, mengurangi sesak nafas akibat bertambah besarnya perut.  
- Menguasai teknik pernafasan yang mempunyai peranan penting dalam kehamilan dan persalinan untuk mempercepat relaksasi tubuh yang dengan napas dalam, dan juga untuk mengatasi rasa nyeri pada saat kontraksi.  
- Menguatkan otot -otot tungkai, dimana tungkai akan menopang berat tubuh ibu yang semakin lama makin berat seiring dengan bertambahnya usia kehamilan  
- Mencegah varises, yaitu pelebaran pembuluh darah balik (vena) yang sering terjadi pada ibu hamil.  
- Memperpanjang nafas, karena seiring bertambah besarnya janin akan mendesak isi perut ke arah dada. Hal ini akan membuat rongga dada lebih sempit dan nafas ibu tidak bisa optimal. Dengan senam hamil maka ibu akan dapat berlatih agar nafasnya lebih panjang dan tetap relaks.  
- Latihan mengejan, latihan ini khusus untuk menghadapi persalinan, agar ibu bisa mengejan dengan benar sehingga bayi dapat lancar keluar dan tidak tertahan di jalan lahir.  
- Mendukung ketenangan fisik.

## 3. MANFAAT :
- Mengatasi sembelit (konstipasi), kram dan nyeri punggung  
- Sirkulasi darah menjadi lancar  
- Postur tubuh menjadi lebih baik  
- Tidur lebih berkualitas  
- Mengurangi stress  
- Membantu mengembalikan bentuk tubuh lebih cepat setelah melahirkan  
- Otot bagian panggul menjadi lebih kuat  
- Tekanan darah lebih stabil

## 4. HAL-HAL YANG PERLI DIPPERHATIKAN SEBELUM SENAM :
- Gunakan pakaian yang nyaman, tidak ketat, dan menyerap keringat.  
- Lakukan pemanasan sebelum melakukan senam hamil dan pendinginan setelah melakukan senam hamil.  
- Hindari gerakan memutar, membalikkan badan, dan berdiri secara cepat.  
- Ketahui batas kemampuan dan jangan terlalu memaksakan diri.  
- Konsumsi cukup air sebelum, selama, dan setelah melakukan senam hamil untuk mencegah dehidrasi.  
- Senam hamil ini hanya bisa dilakukan ketika kandungan berusia 22-36 minggu, ada juga yang menganjurkan bila kehamilan sudah mencapai 28 minggu ke atas. Namun yang perlu diperhatikan, tidak semua kondisi ibu hamil dapat melakukan senam hamil, sehingga disarankan untuk melakukan konsultasi terlebih dahulu dengan dokter kandungan.

## 5. GERAKAN IBU HAMIL YANG BISA DILAKUKAN
- Gerakan duduk bersila  
- Gerakan Senam Jongkok  
- Gerakan Senam Kegel  
- Gerakan Senam Kupu-Kupu ( Tailor Sit)  
- Wall Push Up

## 6. KEUNTUNGAN :
- Menurunkan risiko diabetes (penyakit gula) saat hamil  
- Mencegah terjadinya obesitas (kegemukan) saat hamil  
- Mengurangi kemungkinan persalinan secara Caesar  
- Mencegah terjadinya keguguran  
- Mengurangi keluhan-keluhan rasa tidak nyaman selama kehamilan seperti migraine, lemas, kaku otot, dan lain-lain  
- Meningkatkan kualitas tidur pada malam hari sehingga Bunda merasa segar  
- Membuat pikiran jernih dan melegakan perasaan Bund

## 7. RAGAM OLAHRAGA YANGG BISA DICOBA;
**Jalan Santai**  
Luangkan waktu 30 menit setiap pagi atau sore untuk berjalan-jalan di sekitar rumah. Hindari jalanan yang menanjak dan sulit,`,
          duration: "50 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },

    // 5) Edukasi ASI eksklusif (untuk bumil/menyusui)
    {
      id: "sub5",
      title: "Edukasi ASI Eksklusif",
      description:
        "Pengertian ASI dan manfaat ASI eksklusif pada bayi; risiko bila tidak diberi ASI eksklusif.",
      duration: "60 menit",
      isCompleted: false,
      isUnlocked: false,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin5-1",
          title: "Materi Utuh (Markdown dari naskah)",
          content: `# MENU IBU HAMIL DAN MENYUSUI
_(Edukasi ASI Ekslusif)_

## 1. Pengertian
ASI (air susu ibu) adalah makanan terbaik bagi bayi, karena mengandung semua nutrisi yang dibutuhkannya untuk tumbuh kembang dengan sehat. Jika diberikan air putih atau cairan lainnya, bayi akan mudah merasa kenyang sehingga tak mau menyusu lagi.

## 2. Manfaat ASI Eksklusif pada Bayi
Setelah lahir bayi mengalami perkembangan fisik dan mental yang sangat pesat. Dukung perkembangan optimalnya dengan hanya memberikan ASI hingga usia 6 bulan untuk mendapatkan banyak manfaat berikut ini;

**Membuat Bayi Lebih Sehat dan Cerdas.**  
ASI kaya akan kandungan asam lemak yang dapat mendukung perkembangan fisik bayi secara optimal, terutama otak sehingga membuatnya lebih cerdas. 

**Meningkatkan Daya Tahan Tubuh.**  
Di dalam ASI terkandung antibodi dari ibu, sehingga bermanfaat untuk memperkuat sistem kekebalan tubuh si kecil dan mencegahnya dari terkena penyakit seperti diare, infeksi saluran pernapasan, infeksi telinga, meningitis, dan lain sebagainya.

Sistem kekebalan tubuh yang kuat juga berperan dalam mengurangi risiko timbulnya alergi, karena alergi merupakan reaksi sistem kekebalan tubuh saat mengalami kontak langsung dengan zat tertentu.

**Menjaga Berat Badan Ideal.**  
ASI dapat mengendalikan hormon leptin yang berfungsi mengontrol nafsu makan dan metabolisme lemak pada tubuh bayi, sehingga dapat membantu menjaga berat badan bayi tetap ideal, serta mencegah stunting.

ASI eksklusif juga mendukung pertumbuhan bakteri sehat dalam pencernaan, yang berfungsi meningkatkan metabolisme tubuh dan kesehatan pencernaan bayi.

**Mencegah Terjadinya SIDS (Sudden Infant Death Syndrome)**  
Manfaat lain dari pemberian ASI eksklusif 6 bulan adalah mengurangi risiko terjadinya sindrom kematian bayi mendadak (SIDS). Menyusui bayi saat ia lapar dan di sela-sela waktu tidurnya dapat melindunginya dari risiko mengalami SIDS. 

**Membuat Ikatan Ibu Anak Semakin Kuat**  
Kontak langsung dengan ibu saat menyusu, seperti sentuhan dengan kulit, merasakan kehangatan tubuh ibu, dan tatapan mata dapat membangun keintiman antara Ibu dengan bayinya.

## 3. Risiko jika Bayi Tidak Diberi ASI Eksklusif
Apa yang terjadi pada bayi yang tidak mendapatkan ASI eksklusif? Berikut adalah beberapa risiko yang dihadapi, jika bayi tidak mendapatkan ASI eksklusif.

**Rentan terhadap Masalah Gizi**  
Pertumbuhan fisik bayi akan terhambat karena kurangnya asupan nutrisi yang dibutuhkannya, sehingga meningkatkan risiko kekurangan gizi dan lambat laun stunting.

**Rentan terhadap Infeksi dan Penyakit Kronis**
_(lanjutan sesuai dokumen jika ada poin tambahan setelah baris ini)_`,
          duration: "30 menit",
          isCompleted: false,
          type: "text",
        },
      ],
      quiz: [], // Quiz moved to module level
    },
  ],
};

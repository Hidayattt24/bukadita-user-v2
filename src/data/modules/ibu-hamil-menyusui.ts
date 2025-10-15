import { DetailModul } from "./types";

export const ibuHamilMenyusuiData: DetailModul = {
  id: 4,
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
      quiz: [
        {
          id: "quiz1-1",
          question: "Tambahan kebutuhan energi ibu hamil per hari adalah…",
          options: ["50–100 kkal", "180–300 kkal", "400–500 kkal", "≥700 kkal"],
          correctAnswer: 1,
          explanation:
            "Modul menyebut tambahan 180–300 kkal/hari untuk ibu hamil.",
        },
        {
          id: "quiz1-2",
          question: "Kriteria risiko KEK pada ibu hamil menurut modul adalah…",
          options: [
            "LiLA ≥ 23,5 cm atau IMT ≥ 18,5 kg/m²",
            "LiLA < 23,5 cm atau IMT < 18,5 kg/m²",
            "LiLA 30 cm",
            "IMT 25 kg/m²",
          ],
          correctAnswer: 1,
          explanation: "KEK: LiLA < 23,5 cm atau IMT trimester 1 < 18,5 kg/m².",
        },
        {
          id: "quiz1-3",
          question:
            "Sumber lemak sehat yang dianjurkan untuk ibu hamil antara lain…",
          options: [
            "Gorengan",
            "Alpukat, kacang-kacangan, ikan berlemak",
            "Mentega tinggi trans fat",
            "Santan kental berlebihan",
          ],
          correctAnswer: 1,
          explanation: "Modul merekomendasikan lemak sehat (omega-3 & DHA).",
        },
        {
          id: "quiz1-4",
          question: "Salah satu pesan umum gizi seimbang yang benar adalah…",
          options: [
            "Hindari makan pagi",
            "Minum minuman beralkohol",
            "Baca label pada makanan kemasan",
            "Kurangi minum air putih",
          ],
          correctAnswer: 2,
          explanation:
            "Termasuk 13 pesan umum: baca label pada makanan kemasan.",
        },
        {
          id: "quiz1-5",
          question: "Saat puasa, pola makan yang dianjurkan adalah…",
          options: [
            "Porsi besar saat berbuka",
            "Makan sedikit tapi sering di waktu yang diatur",
            "Tidak perlu minum air",
            "Hindari susu",
          ],
          correctAnswer: 1,
          explanation:
            "Modul menganjurkan makan sedikit tapi sering dan cukup cairan.",
        },
      ],
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
      quiz: [
        {
          id: "quiz2-1",
          question: "Gerak janin kurang dari 10 kali dalam 2 jam menandakan…",
          options: [
            "Kondisi normal",
            "Kekurangan oksigen/gizi, perlu evaluasi",
            "Alergi makanan",
            "Waktu tidur janin",
          ],
          correctAnswer: 1,
          explanation:
            "Modul menyebut perlu segera diperiksakan bila gerak janin sangat berkurang.",
        },
        {
          id: "quiz2-2",
          question:
            "Pembengkakan pada kaki/tangan/wajah disertai pusing dan pandangan kabur mengarah ke…",
          options: ["Pre-eklampsia", "Anemia", "Hipoglikemia", "Dehidrasi"],
          correctAnswer: 0,
          explanation: "Kombinasi gejala tersebut mengarah ke pre-eklampsia.",
        },
        {
          id: "quiz2-3",
          question: "Pecah ketuban sebelum waktunya berisiko menyebabkan…",
          options: [
            "Infeksi intrauterin",
            "Berat badan ibu naik",
            "Mual berkurang",
            "Hiperemesis",
          ],
          correctAnswer: 0,
          explanation:
            "Modul menekankan risiko infeksi, perlu evaluasi segera.",
        },
        {
          id: "quiz2-4",
          question:
            "Mual muntah berlebihan yang menyebabkan dehidrasi pada ibu hamil termasuk…",
          options: [
            "Keluhan ringan",
            "Tanda bahaya kehamilan",
            "Gejala flu biasa",
            "Adaptasi trimester 2",
          ],
          correctAnswer: 1,
          explanation:
            "Termasuk tanda bahaya dan harus ditangani tenaga kesehatan.",
        },
        {
          id: "quiz2-5",
          question: "Perdarahan pada kehamilan trimester tua dapat menandakan…",
          options: [
            "Plasenta menutupi jalan lahir",
            "Alergi makanan",
            "Konstipasi",
            "Infeksi telinga",
          ],
          correctAnswer: 0,
          explanation:
            "Modul menyebut plasenta previa sebagai salah satu kemungkinan.",
        },
      ],
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
      quiz: [
        {
          id: "quiz3-1",
          question:
            "Contoh faktor risiko tidak langsung (4T) ‘terlalu tua’ didefinisikan sebagai…",
          options: [
            "Melahirkan usia > 35 tahun",
            "Melahirkan usia < 20 tahun",
            "Jarak kehamilan > 5 tahun",
            "Melahirkan anak tunggal",
          ],
          correctAnswer: 0,
          explanation: "4T meliputi terlalu tua: >35 tahun.",
        },
        {
          id: "quiz3-2",
          question: "‘3 terlambat’ berikut yang benar adalah…",
          options: [
            "Terlambat makan, tidur, imunisasi",
            "Terlambat keputusan, sampai fasilitas, dan penanganan",
            "Terlambat cek gigi, minum TTD, timbang",
            "Terlambat menstruasi",
          ],
          correctAnswer: 1,
          explanation: "Tiga keterlambatan: keputusan, akses, dan penanganan.",
        },
        {
          id: "quiz3-3",
          question: "Preeklamsia ditandai oleh…",
          options: [
            "Tekanan darah normal dan anemia",
            "Tekanan darah tinggi dan kerusakan organ",
            "Demam 3 hari",
            "Diare",
          ],
          correctAnswer: 1,
          explanation:
            "Modul menuliskan TD tinggi dan kerusakan organ (ginjal/hati).",
        },
        {
          id: "quiz3-4",
          question: "Eklampsia merupakan bentuk…",
          options: [
            "Lebih ringan dari preeklamsia",
            "Lebih parah dari preeklamsia dengan kejang",
            "Tidak berbahaya",
            "Infeksi menular",
          ],
          correctAnswer: 1,
          explanation:
            "Eklampsia adalah komplikasi lebih berat disertai kejang.",
        },
        {
          id: "quiz3-5",
          question:
            "Riwayat berikut yang meningkatkan risiko kehamilan risiko tinggi adalah…",
          options: [
            "Bekas operasi sesar",
            "Tidak pernah hamil",
            "Olahraga teratur",
            "Asupan sayur cukup",
          ],
          correctAnswer: 0,
          explanation:
            "Termasuk pada daftar riwayat kehamilan/persalinan berisiko.",
        },
      ],
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
      quiz: [
        {
          id: "quiz4-1",
          question:
            "Usia kandungan yang umumnya dianjurkan untuk senam hamil adalah…",
          options: [
            "≤12 minggu",
            "22–36 minggu (atau ≥28 minggu menurut beberapa anjuran)",
            "Di bawah 8 minggu",
            "Saat menjelang persalinan saja",
          ],
          correctAnswer: 1,
          explanation:
            "Modul menyebut 22–36 minggu; sebagian menganjurkan mulai 28 minggu.",
        },
        {
          id: "quiz4-2",
          question: "Gerakan yang termasuk dalam daftar di modul adalah…",
          options: [
            "Headstand",
            "Tailor sit (kupu-kupu)",
            "Backflip",
            "Sprint",
          ],
          correctAnswer: 1,
          explanation: "Tailor sit/kupu-kupu tercantum dalam list gerakan.",
        },
        {
          id: "quiz4-3",
          question: "Salah satu tujuan senam hamil adalah…",
          options: [
            "Menghambat relaksasi",
            "Melatih teknik pernapasan untuk relaksasi dan atasi nyeri kontraksi",
            "Menaikkan tekanan darah",
            "Mengurangi elastisitas otot panggul",
          ],
          correctAnswer: 1,
          explanation:
            "Tujuan penting: teknik napas & relaksasi saat kehamilan/persalinan.",
        },
        {
          id: "quiz4-4",
          question:
            "Hal yang harus dihindari sebelum/selama senam hamil adalah…",
          options: [
            "Gerakan memutar dan berdiri cepat",
            "Pemanasan dan pendinginan",
            "Minum air yang cukup",
            "Pakaian nyaman",
          ],
          correctAnswer: 0,
          explanation:
            "Modul menegaskan menghindari gerakan memutar/berdiri cepat.",
        },
        {
          id: "quiz4-5",
          question: "Salah satu manfaat senam hamil yang disebut modul ialah…",
          options: [
            "Meningkatkan insomnia",
            "Mengurangi keluhan dan meningkatkan kualitas tidur",
            "Meningkatkan risiko varises",
            "Menurunkan sirkulasi darah",
          ],
          correctAnswer: 1,
          explanation:
            "Modul mencantumkan manfaat pada kualitas tidur dan keluhan umum.",
        },
      ],
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
      quiz: [
        {
          id: "quiz5-1",
          question: "ASI eksklusif diberikan hingga usia…",
          options: ["3 bulan", "4 bulan", "6 bulan", "12 bulan"],
          correctAnswer: 2,
          explanation: "Konsisten dengan edukasi: ASI eksklusif 6 bulan.",
        },
        {
          id: "quiz5-2",
          question:
            "Salah satu alasan ASI meningkatkan daya tahan tubuh adalah karena…",
          options: [
            "Mengandung gula tinggi",
            "Mengandung antibodi dari ibu",
            "Mengurangi cairan tubuh bayi",
            "Mengandung pengawet alami",
          ],
          correctAnswer: 1,
          explanation: "Antibodi ibu di dalam ASI memperkuat imunitas bayi.",
        },
        {
          id: "quiz5-3",
          question: "ASI berperan pada berat badan ideal bayi karena…",
          options: [
            "Menghambat leptin",
            "Mengatur leptin dan metabolisme lemak",
            "Meningkatkan kandungan garam",
            "Mengurangi bakteri usus baik",
          ],
          correctAnswer: 1,
          explanation:
            "Modul menyebut pengaruh pada leptin dan mikrobiota usus.",
        },
        {
          id: "quiz5-4",
          question:
            "Salah satu risiko bila tidak diberikan ASI eksklusif adalah…",
          options: [
            "Risiko malnutrisi/stunting meningkat",
            "Anak lebih cepat berjalan",
            "Anak tidak perlu imunisasi",
            "Anak kebal alergi",
          ],
          correctAnswer: 0,
          explanation: "Disebutkan risiko masalah gizi dan stunting.",
        },
        {
          id: "quiz5-5",
          question:
            "Manfaat psikososial penting dari menyusui menurut modul adalah…",
          options: [
            "Mengurangi bonding ibu-anak",
            "Membangun keintiman ibu dan bayi",
            "Meningkatkan jarak dengan bayi",
            "Mengurangi tatapan mata",
          ],
          correctAnswer: 1,
          explanation:
            "Kontak kulit dan interaksi saat menyusui memperkuat ikatan.",
        },
      ],
    },
  ],
};

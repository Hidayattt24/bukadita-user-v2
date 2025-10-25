import { DetailModul } from "./types";

export const usiaSekolahRemajaData: DetailModul = {
  id: 4,
  slug: "usia-sekolah-remaja",
  title: "Modul Usia Sekolah & Remaja",
  description:
    "Memahami kesehatan dan perkembangan anak usia sekolah serta remaja, mencakup gizi, aktivitas fisik, pencegahan anemia, bahaya merokok, NAPZA, dan peran Posyandu Remaja.",
  duration: "6 jam",
  lessons: 6,
  difficulty: "Menengah",
  category: "Usia Sekolah & Remaja",
  status: "not-started",
  progress: 0,
  rating: 4.8,
  students: 890,
  thumbnail: "/dummy/dummy-fotoprofil.png",
  instructor: "Tim Kader Posyandu",
  estimatedCompletion: "7 hari",
  overview:
    "Modul komprehensif untuk memahami kebutuhan kesehatan anak usia sekolah dan remaja, termasuk gizi seimbang, aktivitas fisik, pencegahan anemia, bahaya merokok, NAPZA serta konsep dan manfaat Posyandu Remaja.",
  learningObjectives: [
    "Memahami prinsip gizi seimbang dan pedoman Isi Piringku untuk anak sekolah dan remaja",
    "Menjelaskan rekomendasi aktivitas fisik untuk usia 5–17 tahun dan manfaatnya",
    "Mengidentifikasi penyebab, gejala, serta upaya pencegahan anemia pada remaja",
    "Menganalisis dampak merokok dari sisi kesehatan, sosial, ekonomi, dan psikologis",
    "Menjelaskan pengertian dan jenis-jenis NAPZA serta peran orang tua dalam pencegahan",
    "Memahami tujuan, sasaran, fungsi, dan manfaat Posyandu Remaja",
  ],
  requirements: [
    "Kader posyandu yang menangani anak usia sekolah dan remaja",
    "Tertarik pada promosi kesehatan berbasis masyarakat",
    "Siap mempraktikkan edukasi kesehatan kepada sasaran remaja",
  ],
  quiz: [
    {
      id: "quiz-1",
      question:
        "Masa remaja merupakan periode peralihan dari masa anak menuju dewasa yang ditandai oleh…",
      options: [
        "Peningkatan tanggung jawab sosial dan emosional",
        "Berhentinya pertumbuhan fisik",
        "Penurunan hormon reproduksi",
        "Penurunan kemampuan berpikir abstrak",
      ],
      correctAnswer: 0,
      explanation: "Peningkatan tanggung jawab sosial dan emosional",
    },
    {
      id: "quiz-2",
      question: "Salah satu tanda awal pubertas pada remaja perempuan adalah…",
      options: [
        "Suara membesar",
        "Tumbuh jakun",
        "Menstruasi",
        "Otot mengecil",
      ],
      correctAnswer: 2,
      explanation: "Menstruasi",
    },
    {
      id: "quiz-3",
      question:
        "Zat gizi yang berperan penting dalam pembentukan sel darah merah adalah…",
      options: ["Kalsium", "Zat besi (Fe)", "Vitamin D", "Fosfor"],
      correctAnswer: 1,
      explanation: "Zat besi (Fe)",
    },
    {
      id: "quiz-4",
      question: "Kekurangan zat besi pada remaja dapat menyebabkan…",
      options: [
        "Berat badan naik",
        "Anemia",
        "Hipertensi",
        "Kolesterol tinggi",
      ],
      correctAnswer: 1,
      explanation: "Anemia",
    },
    {
      id: "quiz-5",
      question:
        "Salah satu faktor risiko utama anemia pada remaja perempuan adalah…",
      options: [
        "Kurang tidur",
        "Konsumsi tinggi protein",
        "Menstruasi tanpa asupan zat besi yang cukup",
        "Aktivitas fisik berlebihan",
      ],
      correctAnswer: 2,
      explanation: "Menstruasi tanpa asupan zat besi yang cukup",
    },
    {
      id: "quiz-6",
      question:
        "Tablet tambah darah (TTD) sebaiknya diminum oleh remaja putri…",
      options: [
        "Setiap hari sepanjang tahun",
        "Seminggu sekali",
        "Hanya saat menstruasi",
        "Dua kali sehari",
      ],
      correctAnswer: 1,
      explanation: "Seminggu sekali",
    },
    {
      id: "quiz-7",
      question: "Salah satu tanda remaja yang mengalami anemia adalah…",
      options: [
        "Berat badan naik drastis",
        "Sering pusing, pucat, dan mudah lelah",
        "Tidur berlebihan",
        "Nafsu makan meningkat",
      ],
      correctAnswer: 1,
      explanation: "Sering pusing, pucat, dan mudah lelah",
    },
    {
      id: "quiz-8",
      question: "Salah satu upaya pencegahan anemia pada remaja adalah…",
      options: [
        "Menghindari sayuran hijau",
        "Mengonsumsi makanan kaya zat besi dan vitamin C",
        "Mengurangi konsumsi air putih",
        "Berolahraga berat setiap hari",
      ],
      correctAnswer: 1,
      explanation: "Mengonsumsi makanan kaya Fe & vitamin C",
    },
    {
      id: "quiz-9",
      question:
        "Zat yang dapat menghambat penyerapan zat besi dalam tubuh adalah…",
      options: [
        "Vitamin C",
        "Kafein atau tanin dalam teh dan kopi",
        "Protein hewani",
        "Karbohidrat kompleks",
      ],
      correctAnswer: 1,
      explanation: "Tanin menghambat penyerapan zat besi",
    },
    {
      id: "quiz-10",
      question: "PHBS di sekolah bertujuan untuk…",
      options: [
        "Membentuk perilaku sehat sejak dini",
        "Menurunkan prestasi akademik",
        "Membatasi interaksi sosial",
        "Mengurangi aktivitas fisik",
      ],
      correctAnswer: 0,
      explanation: "Membentuk perilaku sehat sejak dini",
    },
    {
      id: "quiz-11",
      question: "Salah satu contoh penerapan PHBS di sekolah adalah…",
      options: [
        "Membuang sampah di halaman sekolah",
        "Cuci tangan pakai sabun sebelum makan",
        "Membawa jajanan tinggi gula",
        "Tidak sarapan sebelum berangkat",
      ],
      correctAnswer: 1,
      explanation: "Cuci tangan pakai sabun",
    },
    {
      id: "quiz-12",
      question: "Salah satu indikator PHBS di rumah tangga adalah…",
      options: [
        "Tidak menyediakan air bersih",
        "Buang air besar di sungai",
        "Menyediakan tempat sampah tertutup",
        "Mengabaikan imunisasi anak",
      ],
      correctAnswer: 2,
      explanation: "Menyediakan tempat sampah tertutup",
    },
    {
      id: "quiz-13",
      question:
        "Remaja yang aktif berolahraga namun tidak menjaga pola makan berisiko mengalami…",
      options: [
        "Kekurangan energi kronis",
        "Hipertensi",
        "Gangguan tidur",
        "Kelebihan lemak tubuh",
      ],
      correctAnswer: 0,
      explanation: "Kekurangan energi kronis",
    },
    {
      id: "quiz-14",
      question: "Kesehatan reproduksi remaja bertujuan untuk…",
      options: [
        "Menunda pubertas",
        "Menyiapkan remaja menjadi dewasa sehat secara fisik, mental, dan sosial",
        "Mengurangi rasa ingin tahu remaja",
        "Membatasi akses terhadap informasi kesehatan",
      ],
      correctAnswer: 1,
      explanation: "Menyiapkan remaja menjadi dewasa sehat",
    },
    {
      id: "quiz-15",
      question:
        "Mengapa remaja perempuan lebih rentan terhadap anemia dibandingkan laki-laki?",
      options: [
        "Karena pola makan lebih baik",
        "Karena kehilangan darah saat menstruasi",
        "Karena jarang berolahraga",
        "Karena metabolisme zat besi lebih tinggi",
      ],
      correctAnswer: 1,
      explanation: "Kehilangan darah saat menstruasi",
    },
    {
      id: "quiz-16",
      question:
        "Jika seorang remaja mengonsumsi tablet tambah darah bersama teh hangat, maka…",
      options: [
        "Penyerapan zat besi meningkat",
        "Penyerapan zat besi terhambat karena tanin",
        "Tidak ada pengaruh sama sekali",
        "Dapat meningkatkan kadar gula darah",
      ],
      correctAnswer: 1,
      explanation: "Tanin menghambat penyerapan zat besi",
    },
    {
      id: "quiz-17",
      question:
        "Salah satu peran penting guru dalam mendukung kesehatan remaja di sekolah adalah…",
      options: [
        "Mengawasi perilaku sosial saja",
        "Memberi edukasi gizi dan pemantauan konsumsi TTD",
        "Mengatur jadwal pelajaran akademik",
        "Menentukan menu kantin",
      ],
      correctAnswer: 1,
      explanation: "Guru memberi edukasi gizi & pantau TTD",
    },
    {
      id: "quiz-18",
      question: "Lingkungan sekolah yang sehat ditandai oleh…",
      options: [
        "Ventilasi cukup, air bersih, dan area bebas rokok",
        "Kantin tertutup rapat tanpa ventilasi",
        "Siswa tidak diizinkan berolahraga",
        "Semua siswa membawa makanan cepat saji",
      ],
      correctAnswer: 0,
      explanation: "Ventilasi cukup, air bersih, dan bebas rokok",
    },
    {
      id: "quiz-19",
      question: "Salah satu ciri kesehatan mental remaja yang baik adalah…",
      options: [
        "Mudah tersinggung dan tertutup",
        "Mampu menerima diri dan berinteraksi positif dengan orang lain",
        "Selalu mengikuti tekanan teman sebaya",
        "Tidak mau berbagi pendapat",
      ],
      correctAnswer: 1,
      explanation: "Interaksi positif dan penerimaan diri",
    },
    {
      id: "quiz-20",
      question:
        "Program pemberian tablet tambah darah di sekolah menjadi penting karena…",
      options: [
        "Membantu remaja terbiasa dengan obat-obatan",
        "Upaya preventif menurunkan anemia remaja yang berdampak pada generasi berikutnya",
        "Meningkatkan rasa kantuk siswa",
        "Hanya memenuhi target pemerintah",
      ],
      correctAnswer: 1,
      explanation: "Pencegahan anemia berdampak lintas generasi",
    },
  ],
  subMateris: [
    {
      id: "sub1",
      title: "Penyuluhan Gizi Anak Sekolah dan Remaja",
      description:
        "Definisi gizi seimbang, 4 Pilar, 10 Pesan Gizi Seimbang, dan pedoman Isi Piringku.",
      duration: "70 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin1-1",
          title: "Materi Lengkap – Gizi Seimbang & Isi Piringku",
          type: "text",
          duration: "70 menit",
          isCompleted: false,
          content: `# Penyuluhan Gizi Usia Anak Sekolah dan Remaja
1. Definisi
\tGizi Seimbang menurut Kemenkes RI 2014 merupakan susunan pangan sehari-hari yang mengandung zat gizi dalam jenis dan jumlah yang sesuai dengan kebutuhan tubuh, dengan memperhatikan prinsip keanekaragaman pangan, aktivitas fisik, perilaku hidup bersih dan memantau berat badan secara teratur dalam rangka mempertahankan berat badan normal untuk mencegah masalah gizi dan mempertahankan sistem imun dalam tubuh. Ada beberapa hal yang perlu diketahui untuk mengetahui tentang gizi seimbang, diantaranya 4 pilar gizi seimbang.serta 10 pesan gizi seimbang

2.  Pilar Gizi Seimbang Empat
 Pilar ini merupakan prinsip dasar gizi seimbang, yang terdiri dari Pilar 
a.\tPilar 1. Mengkonsumsi aneka ragam pangan 
\t\tKonsumsi aneka ragam pangan sangat penting karena tidak ada satupun jenis bahan pangan yang mengandung semua jenis zat gizi yang dibutuhkan tubuh untuk tetap sehat, kecuali Air Susu Ibu (ASI). ASI mengandung semua zat gizi yang dibutuhkan tubuh, tapi hanya untuk bayi baru lahir sampai berusia 6 bulan.
Selain itu, di dalam tubuh terjadi interaksi antar zat gizi, misalnya zat gizi tertentu memerlukan zat gizi yang lainnya untuk dapat ditranspor atau dicerna oleh tubuh. Misalnya, pencernaan karbohidrat, lemak, dan protein memerlukan vitamin B yang dapat ditemukan pada sayuran berdaun hijau.

b.\tPilar 2. Membiasakan perilaku hidup bersih 
\tHidup bersih mengurangi risiko terkena penyakit infeksi, yang nantinya dapat mempengaruhi status gizi kita. Saat kita sakit, zat gizi di dalam tubuh dipergunakan terutama untuk melawan penyakit tersebut, sehingga pertumbuhan dan perkembangan tubuh kita tidak optimal. Kebiasaan hidup bersih misalnya cuci tangan, menjaga kuku tetap pendek dan bersih, memakai alas kaki dan menutup makanan dengan baik. 



c.\tPilar 3. Melakukan aktivitas fisik 
\tAktivitas fisik sangat penting untuk menjaga kebugaran dan meningkatkan fungsi jantung, paru dan otot, serta menurunkan risiko obesitas. Aktivitas fisik tidak harus selalu berupa olahraga, segala macam aktivitas seperti bermain juga termasuk dalam melakukan aktivitas fisik. 

d.\tPilar 4. Memantau berat badan secara teratur 
\t\t\tSalah satu tanda keseimbangan zat gizi di dalam tubuh adalah tercapainya berat badan normal, yaitu berat badan yang sesuai untuk tinggi badan, yang biasa dikenal sebagai Indeks Masa Tubuh (IMT). Pada anak usia sekolah dan remaja, penentuan status gizi berdasarkan IMT harus disesuaikan dengan usianya. Dengan rutin memantau berat badan (dan tinggi badan), maka kita dapat mengetahui status gizi kita, dan mencegah atau melakukan tindakan penanganan bila berat badan menyimpang dari yang seharusnya

3.  Pesan Gizi Seimbang 
\tSelain empat prinsip diatas, terdapat juga 10 Pesan Gizi Seimbang yang berlaku secara umum untuk berbagai lapisan masyarakat dalam kondisi sehat dan bertujuan untuk mempertahankan hidup sehat. Berikut adalah kesepuluh pesan gizi seimbang. Sesi ini akan diawali dengan menggali pemahaman siswa tentang gizi seimbang, termasuk 4 prinsip dan 10 pesannya. 
\tUntuk membuat prinsip dan pesan ini menjadi lebih dekat dengan keseharian siswa, siswa diminta untuk mengenali pesan gizi seimbang yang sudah dan yang belum dilaksanakan secara rutin. Di akhir sesi, siswa didorong untuk mempertahankan dan meningkatkan praktik keseharian mereka terkait gizi seimbang.
Panduan Gizi Seimbang
Dalam menyusun menu makanan sehat ini, ada sepuluh pedoman atau pesan gizi seimbang yang dapat diikuti, yaitu:
1.\tNikmati dan syukuri beragam makanan.
2.\tBiasakan makan aneka ragam makanan pokok.
3.\tBiasakan makan lauk pauk yang kaya protein.
4.\tBanyak makan sayur dan buah-buahan.
5.\tBatasi makanan asin, manis dan berlemak.
6.\tBiasakan sarapan di pagi hari.
7.\tBiasakan minum cukup air putih yang aman.
8.\tBiasakan membaca label pada kemasan makanan.
9.\tLakukan aktivitas fisik secara rutin dan jaga berat badan ideal.
10.\t Biasakan mencuci tangan dengan sabun dan air mengalir. 
4.  Isi Piringku, Pola Makan dan Hidup Lebih Sehat
a.\tPengertian\t
Isi piringku adalah panduan kebutuhan gizi harian seimbang, yang lahir dari perkembangan ilmu dan penyempurnaan para ahli gizi, dan disusun oleh Kementerian Kesehatan RI. Bedanya dengan 4 Sehat 5 Sempurna adalah pola makan Isi Piringku tak hanya memberi panduan jenis makanan dan minuman yang dikonsumsi sekali makan, tapi juga porsi makanan yang dapat memenuhi kebutuhan gizi dalam satu hari. 

b.\tKomponen Isi Piringku
1)\tMakanan Pokok
Makanan pokok merupakan sumber utama energi bagi tubuh karena mengandung karbohidrat kompleks yang berfungsi sebagai bahan bakar untuk melakukan aktivitas sehari-hari. Tanpa asupan karbohidrat yang cukup, tubuh akan mudah merasa lemas, sulit berkonsentrasi, dan mengalami gangguan metabolism.
Sumber karbohidrat dan tenaga utama, yang didapat dari beragam bahan makanan pokok. Seperti halnya Indonesia dengan keberagaman suku, budaya dan daerahnya, bahan makanan pokok di Indonesia pun beraneka ragam, seperti beras, jagung, sagu dan umbi-umbian (ubi, talas, singkong), kentang, gandum dan produk olahannya, seperti mie, roti dan pasta. Konsumsinya disesuaikan dengan kondisi, kebiasaan, dan budaya setempat. Meski beragam, bahan makanan pokok ini harus memenuhi syarat-syarat berikut ini:
•\tMengandung karbohidrat (HA)
•\tBersifat menyenangkan
•\tRasanya netral
•\tHarganya murah
•\tMudah didapat, ditanam dan diolah
•\tBisa disimpan lama
Dalam satu piring makan, porsi makanan pokok disarankan sebanyak duapertiga (⅔) bagian dari isi piring. Artinya, setengah dari piring diisi oleh sumber energi dan protein, dan setengah lainnya oleh sayur dan buah. Satu porsi makanan pokok kira-kira setara dengan satu centong nasi atau satu potong sedang umbi rebus. Masyarakat juga dianjurkan memilih sumber karbohidrat kompleks yang memiliki kandungan serat tinggi, seperti nasi merah, jagung, atau kentang, karena dapat membantu mengontrol kadar gula darah dan memberikan rasa kenyang lebih lama.
 
2)\tLauk Pauk
\tLauk pauk merupakan sumber utama protein, baik yang berasal dari hewan (protein hewani) maupun tumbuhan (protein nabati). Protein memiliki peran yang sangat penting dalam pertumbuhan, perbaikan jaringan tubuh, pembentukan enzim dan hormon, serta menjaga daya tahan tubuh agar tetap kuat melawan infeksi.
\tProtein hewani dapat diperoleh dari bahan pangan seperti ikan, daging, ayam, telur, susu, dan produk olahannya. Jenis protein ini memiliki keunggulan karena mengandung asam amino esensial yang lengkap dan mudah diserap oleh tubuh. Namun demikian, konsumsi protein hewani perlu dibatasi terutama jika mengandung lemak jenuh tinggi, seperti daging berlemak atau gorengan.
\tSementara itu, protein nabati bisa didapatkan dari bahan pangan seperti tahu, tempe, kacang-kacangan, dan hasil olahannya. Protein nabati memiliki keunggulan karena rendah lemak jenuh dan tinggi serat serta zat fitokimia yang bermanfaat untuk kesehatan jantung dan pencernaan. Kombinasi antara protein hewani dan nabati sangat dianjurkan agar asupan protein lebih bervariasi dan kebutuhan tubuh terpenuhi secara seimbang.
\tDalam konsep “Isi Piringku”, lauk pauk menempati sepertiga (⅓) bagian dari isi piring. Jumlah ini setara dengan dua hingga empat porsi per hari. Satu porsi bisa berupa satu potong ikan ukuran sedang, satu butir telur, atau dua potong tahu atau tempe. Cara pengolahan juga berpengaruh terhadap nilai gizi. Metode memasak seperti mengukus, merebus, atau memanggang jauh lebih baik dibandingkan menggoreng karena tidak menambah kadar lemak.
\t 
3)\tBuah-buahan
\tBuah-buahan merupakan sumber alami vitamin, mineral, serat, dan antioksidan yang berfungsi menjaga daya tahan tubuh dan mencegah berbagai penyakit kronis. Konsumsi buah secara rutin setiap hari terbukti dapat menurunkan risiko penyakit seperti hipertensi, diabetes, penyakit jantung, dan kanker. Selain itu, buah juga berperan dalam memperlancar sistem pencernaan, menjaga kesehatan kulit, serta membantu proses metabolisme tubuh.
\tDalam “Isi Piringku”, buah-buahan menempati sepertiga (⅓) bagian dari isi piring, sama dengan porsi lauk atau makanan pokok. Porsinya sekitar dua hingga tiga kali per hari. Contohnya satu pisang ukuran sedang, satu potong pepaya besar, atau satu apel. Sebaiknya buah dikonsumsi dalam bentuk utuh dan segar, bukan dalam bentuk jus kemasan atau buah kaleng, karena umumnya mengandung tambahan gula yang tinggi dan berpotensi meningkatkan kadar gula darah.
Sumber serat, vitamin dan mineral yang memiliki berbagai manfaat berikut ini:
•\tMengandung air dan sumber gizi yang dapat meningkatkan metabolisme tubuh.
•\tSumber antioksidan alami terbesar yang dapat meningkatkan sistem kekebalan tubuh.
•\tMencegah berbagai penyakit kronis, seperti stroke, jantung, hipertensi, kanker, dan kerusakan hati.
•\tKaya vitamin, mineral dan zat penting lainnya yang dapat menjaga kebugaran tubuh.
•\tObat luar tubuh untuk mengobati jerawat, bisul dan lain sebagainya.
•\tKonsumsi rutin buah-buahan, seperti pisang, melon, semangka, pepaya, belimbing, apel, jambu air dan lain sebagainya untuk mendapatkan manfaat optimalnya.
 
4)\tSayur-sayuran
Sayur-sayuran memiliki peran yang tidak kalah penting dalam pola makan seimbang karena mengandung berbagai vitamin, mineral, air, dan serat yang dibutuhkan tubuh. Sayur membantu melancarkan pencernaan, menjaga fungsi organ tubuh, serta menurunkan risiko penyakit kronis. Kandungan serat dalam sayur juga berfungsi menurunkan kadar kolesterol dan menjaga berat badan agar tetap ideal.
Dalam konsep “Isi Piringku”, porsi sayuran adalah duaperempat (⅔) bagian dari isi piring, sama seperti buah. Porsinya setara dengan satu gelas sayur matang setiap kali makan utama. Jenis sayuran yang disarankan adalah sayuran hijau tua seperti bayam, kangkung, daun singkong, dan brokoli, karena mengandung zat besi, asam folat, dan kalsium yang penting untuk pembentukan darah serta kekuatan tulang. Selain itu, sayur berwarna lain seperti wortel, tomat, dan labu kuning mengandung beta-karoten yang baik untuk kesehatan mata dan sistem imun.
Cara pengolahan juga sangat menentukan kandungan gizi sayur. Sebaiknya sayur dimasak dengan cara direbus, dikukus, atau ditumis sebentar agar tidak kehilangan terlalu banyak vitamin. Hindari penggunaan santan berlebihan atau bumbu penyedap yang tinggi natrium. Mengonsumsi sayur secara rutin setiap hari akan membantu menjaga keseimbangan nutrisi dan memperkuat daya tahan tubuh.
\tManfaat sayur-sayuran antara lain
•\tMengurangi dan mencegah stress
•\tMembuat BAB lebih lancar
•\tMencegah penyakit kronis, seperti jantung, stroke dan kanker
•\tMenjaga berat badan seimbang
•\tMembersihkan racun dalam tubuh (detoksifikasi)
•\tMencegah cacat pada bayi
•\tMenjaga kesehatan mata dan kulit
•\tMemperkuat tulang

Contoh sayur-sayuran antara lain terong, timun, bayam, kangkung, buncis, brokoli, wortel, tomat, kol dan lain sebagainya.`,
        },
      ],
      quiz: [], // Quiz moved to module level
    },
    {
      id: "sub2",
      title: "Aktivitas Fisik",
      description:
        "Jenis aktivitas, rekomendasi WHO 5–17 tahun, dan manfaat utama bagi remaja.",
      duration: "45 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin2-1",
          title: "Materi Lengkap – Aktivitas Fisik Remaja",
          type: "text",
          duration: "45 menit",
          isCompleted: false,
          content: `# Aktivitas Fisik
1. Pengertian
\tKesehatan remaja merupakan hal yang sangat penting diperhatikan karena pada masa ini remaja mengalami perubahan fisik, psikologis, dan sosial yang signifikan. Kementerian Kesehatan RI menekankan bahwa kesehatan remaja sangat dipengaruhi oleh pola makan yang sehat, aktivitas fisik yang teratur. Remaja yang sehat ditandai dengan berat badan, tinggi badan, dan indeks massa tubuh yang sesuai dengan usianya.
\tAktivitas fisik yang teratur juga perlu diperhatikan, seperti olahraga ringan atau berjalan-jalan, untuk membantu meningkatkan kesehatan jantung dan paru-paru, serta kekuatan otot dan tulang. Jika ada keluhan atau tanda-tanda tidak sehat pada remaja, segera konsultasikan ke dokter atau fasilitas kesehatan terdekat. Pencegahan dan perawatan yang tepat dapat membantu mempertahankan kesehatan remaja dan mendukung pertumbuhan dan perkembangan yang optimal.

2.  Jenis Jenis Aktivitas Fisik
•\tContoh : berjalan kaki, bersepeda, olahraga, dan bentuk rekreasi aktif (misalnya, menari, yoga, tai chi).
•\tAktivitas fisik juga dapat dilakukan di tempat kerja dan di sekitar rumah. Segala bentuk aktivitas fisik dapat memberikan manfaat kesehatan jika dilakukan secara rutin dan dengan durasi dan intensitas yang cukup.

Aktivitas Fisik Yang Direkomendasikan WHO berdasarkan usia Anak dan remaja (usia 5-17 tahun)
•\tMinimal melakukan aktivitas fisik sedang-berat selama 60 menit setiap hari contoh : lari
•\tMinimal 3 hari dalam seminggu melakukan aktivitas aerobic untuk penguatan otot dan tulang contoh :
•\tMembatasi waktu yang dihabiskan untuk kegiatan sedentari dan menggantikannya dengan berbagai aktivitas dalam berapapun tingkat intensitasnya

Anak dan remaja dengan disabilitas termasuk ADHD dan keterbatasan intelektual (usia 5 -17 tahun)
•\tMinimal melakukan aktivitas fisik sedang-berat selama 60 menit setiap hari contoh : lari
•\tMinimal 3 hari dalam seminggu melakukan aktivitas aerobic untuk penguatan otot dan tulang contoh :
•\tMembatasi waktu yang dihabiskan untuk kegiatan sedentari dan menggantikannya dengan berbagai aktivitas dalam berapapun tingkat intensitasnya.

3.  Manfaat Aktifitas fisik bagi remaja
1.\tMengendalikan berat badan
2.\tMengontrol tekanan darah
3.\tMenurunkan resiko tulang keropos pada wanita
4.\tMencegah penyakit diabetes melitus
5.\tMembantu mengendalikan kadar kolesterol dalam darah
6.\tMeningkatkan dan menguatkan sistem kekebalan tubuh
7.\tMenjaga dan memperbaiki kelenturan sendi dan otot
8.\tMemperbaki postur tubuh
9.\tMengendalikan stres dan mengurangi kecemasan`,
        },
      ],
      quiz: [], // Quiz moved to module level
    },
    {
      id: "sub3",
      title: "Pencegahan Anemia",
      description:
        "Definisi anemia, penyebab, gejala, kadar Hb normal, dan langkah pencegahan.",
      duration: "60 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin3-1",
          title: "Materi Lengkap – Pencegahan Anemia",
          type: "text",
          duration: "60 menit",
          isCompleted: false,
          content: `# Pencegahan Anemia
1.  Pengetian
Anemia adalah suatu kondisi tubuh dimana kadar hemoglobin (Hb) dalam darah lebih rendah dari normal (WHO, 2011). Hemoglobin adalah salah satu komponen dalam sel darah merah/eritrosit yang berfungsi untuk mengikat oksigen dan menghantarkannya ke seluruh sel jaringan tubuh. Oksigen diperlukan oleh jaringan tubuh untuk melakukan fungsinya. Kekurangan oksigen dalam jaringan otak dan otot akan menyebabkan gejala antara lain kurangnya konsentrasi dan kurang bugar dalam melakukan aktivitas. 

2.  Penyebab Anemia 
Anemia terjadi karena berbagai sebab, seperti defisiensi besi, defisiensi asam folat, vitamin B12 dan protein. Secara langsung anemia terutama disebabkan karena produksi/kualitas sel darah merah yang kurang dan kehilangan darah baik secara akut atau menahun. 
Ada 3 penyebab anemia, yaitu: 
1. Defisiensi zat gizi 
\tRendahnya asupan zat gizi baik hewani dan nabati yang merupakan pangan sumber zat besi yang berperan penting untuk pembuatan hemoglobin sebagai komponen dari sel darah merah/eritrosit. Zat gizi lain yang berperan penting dalam pembuatan hemoglobin antara lain asam folat dan vitamin B12. 
\tPada penderita penyakit infeksi kronis seperti TBC, HIV/AIDS, dan keganasan seringkali disertai anemia, karena kekurangan asupan zat gizi atau akibat dari infeksi itu sendiri. 

2. Perdarahan (Loss of blood volume) 
\tPerdarahan karena kecacingan dan trauma atau luka yang mengakibatkan kadar Hb menurun.
\tPerdarahan karena menstruasi yang lama dan berlebihan 

3. Hemolitik 
\tPerdarahan pada penderita malaria kronis perlu diwaspadai karena terjadi hemolitik yang mengakibatkan penumpukan zat besi (hemosiderosis) di organ tubuh, seperti hati dan limpa. 
\tPada penderita Thalasemia, kelainan darah terjadi secara genetik yang menyebabkan anemia karena sel darah merah/eritrosit cepat pecah, sehingga mengakibatkan akumulasi zat besi dalam tubuh. 

3.  Kadar HB Normal
Kadar normal Haemoglobin (Hb) sesuai umur dan jenis kelamin Klasifikasi Nilai Normal Hb menurut Kemenkes RI (2003)





4.  Gejala Anemia
Indikator Fisik Anemia adalah gejala berupa 5L (Lemah, Letih, Lesu, Lunglai, Lalai), sering pusing, ngantuk pd jam produktif, berdebar-debar tanpa sebab, berkunang-kunang saat berdiri dari posisi duduk/ jongkok, dsb. 3. Indikator
Klinis Anemia adalah tanda berupa konjungtiva/ kelopak mata pucat, telapak tangan pucat, kuku pucat, jika terendam air kulit cepat berkeriput, dsb.

5. Pencegahan Anemia
1. Pemberian Tablet Tambah Darah (TTD)
Remaja putri dan wanita usia subur dianjurkan mengonsumsi TTD secara rutin, minimal 1 tablet per minggu. Pada kondisi tertentu, misalnya saat menstruasi atau kehamilan, kebutuhan bisa lebih tinggi. Program ini menjadi upaya utama pencegahan anemia di sekolah maupun masyarakat.
2. Konsumsi Pangan Bergizi Seimbang
Asupan makanan yang kaya zat besi (seperti daging, hati, ikan, sayuran hijau) serta protein hewani sangat dianjurkan. Selain itu, makanan sumber vitamin C (jeruk, jambu biji, tomat) penting karena membantu penyerapan zat besi. Remaja juga dianjurkan mengurangi konsumsi teh dan kopi setelah makan karena dapat menghambat penyerapan zat besi.

3. Edukasi Gizi dan Kesehatan Reproduksi
Pencegahan anemia tidak hanya dengan suplementasi dan makanan, tetapi juga melalui edukasi. Remaja perlu mendapat pemahaman tentang pentingnya gizi seimbang, bahaya anemia terhadap kesehatan dan prestasi belajar, serta kaitannya dengan kesehatan reproduksi di masa depan.
4. Pemeriksaan Kesehatan Secara Berkala
Skrining kesehatan, seperti pemeriksaan kadar hemoglobin (Hb), perlu dilakukan secara rutin di sekolah, posyandu remaja, atau puskesmas. Hal ini bertujuan untuk deteksi dini anemia agar segera dilakukan penanganan bila diperlukan.
5. Pembinaan Lingkungan dan Perilaku Hidup Bersih
Lingkungan sehat dan perilaku hidup bersih juga mendukung pencegahan anemia, misalnya menjaga kebersihan makanan, mencuci tangan, serta pencegahan infeksi cacing melalui perilaku higienis dan pemberian obat cacing secara berkala.`,
        },
      ],
      quiz: [], // Quiz moved to module level
    },
    {
      id: "sub4",
      title: "Penyuluhan Bahaya Merokok",
      description:
        "Pengertian, dampak kesehatan, sosial, ekonomi, psikologis, dan risiko bagi perokok pasif.",
      duration: "60 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin4-1",
          title: "Materi Lengkap – Bahaya Merokok",
          type: "text",
          duration: "60 menit",
          isCompleted: false,
          content: `# Penyuluhan Bahaya Merokok
1.  Pengertian
\tMerokok merupakan kegiatan yang berdampak buruk tidak hanya bagi diri sendiri, tetapi juga orang lain atau keluarga yang ada di sekitarnya baik dalam waktu singkat maupun jangka panjang. Perlu diketahui, bahwa di dalam rokok terkandung lebih dari 4.000 jenis bahan kimia yang berbahaya bagi tubuh. 
\tMerokok merupakan aktivitas penting bagi seseorang yang sudah kecanduan rokok, namun menjadi aktivitas yang kurang disukai banyak orang, bahkan kadang terganggu oleh asap yang dikeluarkan oleh aktivitas tersebut. Bahkan, perokok yang telah beralih dari rokok konvensional ke rokok elektrik sering kali juga merasa terganggu oleh asap rokok konvensional. Kedua aktivitas tersebut (merokok konvensional dan merokok elektrik) tetap saja merupakan aktivitas yang tidak baik secara norma sosial dan tidak sehat, terutama bagi orang-orang yang mengidap penyakit tertentu.










2. Dampak Merokok
\tMerokok dapat membuat hidup seseorang menjadi redup. Berdasarkan penelitian, merokok dapat mengakibatkan gangguan kesehatan yang serius, seperti masalah pernapasan, penyakit jantung, kanker dan penyakit lainnya. Kebiasaan merokok juga dapat mempengaruhi kualitas hidup secara sosial, ekonomi, dan psikologis. Meskipun merokok terlihat sebagai kegiatan yang memberikan kenyamanan, namun akhirnya merokok dapat membuat hidup seseorang menjadi lebih redup dalam banyak aspek.
3. Dampak Terhadap Kesehatan
\tMerokok memberikan dampak serius terhadap kesehatan karena kandungan nikotin dan berbagai zat kimianya. Kebiasaan ini dapat menyebabkan penyempitan pembuluh darah, peningkatan tekanan darah, serta pengerasan arteri yang berujung pada penyakit jantung dan stroke. Selain itu, merokok merusak jaringan paru-paru sehingga memicu bronkitis kronis, emfisema, dan penyakit paru obstruktif kronik (PPOK). Dampak lain yang ditimbulkan antara lain gangguan pencernaan, penurunan daya tahan tubuh, kerusakan gigi dan gusi, risiko kelainan janin pada ibu hamil, serta impotensi. Lebih jauh, zat berbahaya dalam asap rokok mampu merusak DNA sel dan menjadi pemicu utama berbagai kanker, termasuk kanker paru, mulut, tenggorokan, pankreas, dan kandung kemih. Akibat akumulasi masalah kesehatan tersebut, perokok memiliki kualitas hidup yang menurun, harapan hidup lebih pendek, dan risiko kematian dini yang jauh lebih tinggi dibandingkan bukan perokok. 
Dampak Buruk Bagi Perokok Aktif dan Pasif
Selain penyakit kanker, terdapat beberapa dampak buruk lainnya yang mungkin terjadi kepada para perokok aktif maupun pasif, di antaranya adalah:
1.\tPenyakit paru-paru kronis
2.\tMerusak gigi dan menyebabkan bau mulut
3.\tMenyebabkan stroke dan serangan jantung
4.\tTulang mudah patah
5.\tGangguan pada mata, salah satunya seperti katarak
6.\tMenyebabkan kanker leher rahim dan keguguran pada wanita
7.\tMenyebabkan kerontokan rambut.

4. Merokok Merugikan Secara Sosial
\tMerokok tidak hanya berdampak pada kesehatan perokok, tetapi juga menimbulkan kerugian sosial bagi orang di sekitarnya. Asap rokok dapat mengganggu orang dengan penyakit pernapasan, alergi, atau kondisi kesehatan lain, serta menimbulkan ketidaknyamanan sosial. Lebih berbahaya lagi, merokok di dekat ibu hamil dan anak dapat mengganggu kehamilan serta tumbuh kembang anak. Lingkungan sosial yang terbiasa dengan perilaku merokok juga berpotensi mendorong anak-anak dan remaja untuk meniru, bahkan ada kasus balita yang ikut merokok karena pengaruh lingkungan. Selain perokok aktif, perokok pasif yang terpapar langsung asap rokok pun berisiko mengalami gangguan kesehatan serius, termasuk kanker, penyakit jantung, dan gangguan pernapasan. Bahkan perokok tangan ketiga, yakni orang yang terpapar partikel asap yang menempel di pakaian, ruangan, atau benda lain, juga tetap terancam kesehatannya. Dengan demikian, asap rokok memberikan dampak luas tidak hanya pada perokok, tetapi juga pada orang lain di sekitarnya. 

5. Merokok Merugikan Secara Ekonomi
\tMerokok tidak hanya merugikan kesehatan, tetapi juga menimbulkan beban finansial yang besar baik bagi individu maupun masyarakat. Bagi perokok dan keluarganya, biaya membeli rokok menjadi pengeluaran rutin yang dapat menyaingi kebutuhan pokok, bahkan sering kali lebih besar daripada pengeluaran untuk makanan bergizi, sehingga berkontribusi terhadap masalah gizi pada anak. Harga rokok yang terus meningkat memperparah beban ini, terutama pada keluarga dengan kondisi ekonomi menengah ke bawah. 
\tDi sisi lain, dampak kesehatan akibat merokok menimbulkan biaya perawatan medis yang tinggi, baik untuk individu maupun pemerintah, yang pada akhirnya mengurangi sumber daya bagi layanan kesehatan lain. Merokok juga menurunkan produktivitas kerja karena perokok lebih sering mengambil waktu istirahat dan lebih rentan sakit, sehingga menambah kerugian ekonomi melalui absensi dan berkurangnya kinerja. Pada tingkat makro, negara dengan angka perokok tinggi menanggung beban ekonomi besar akibat biaya kesehatan dan turunnya produktivitas, sementara sumber daya yang seharusnya digunakan untuk pembangunan dan layanan publik terkuras untuk menangani dampak rokok. Meskipun industri rokok memberi pemasukan negara, kerugian ekonomi secara keseluruhan justru lebih besar karena daya beli masyarakat menurun dan pertumbuhan sektor lain ikut terhambat. 

6. Rokok Merugikan Psikologis
\tMerokok tidak hanya merugikan kesehatan fisik, tetapi juga berdampak negatif secara psikologis. Nikotin yang bersifat adiktif menimbulkan ketergantungan fisik dan mental sehingga membuat perokok sulit berhenti meskipun menyadari risikonya. Ketika tidak merokok, perokok kerap merasa gelisah, stres, dan cemas. Banyak yang menggunakan rokok sebagai mekanisme koping untuk mengatasi tekanan emosional, namun cara ini tidak efektif dan justru menghambat perkembangan strategi koping yang sehat. Kebiasaan merokok juga dapat memicu rasa bersalah, malu, dan rendah diri karena dampaknya pada diri sendiri maupun orang sekitar, sehingga menurunkan kesejahteraan psikologis. 
\tKegagalan berhenti merokok sering berujung pada frustasi dan putus asa, bahkan berkontribusi pada gangguan mental seperti depresi dan kecemasan. Oleh karena itu, penting bagi perokok untuk mendapatkan dukungan dalam mengatasi kecanduan dan belajar strategi koping yang lebih adaptif. Secara keseluruhan, merokok menurunkan kualitas hidup tidak hanya dari sisi fisik, tetapi juga sosial, ekonomi, dan psikologis. Upaya berhenti merokok, didukung dengan kebijakan Kawasan Tanpa Rokok (KTR), sangat penting untuk menjaga kesehatan masyarakat dan memberikan kehidupan yang lebih sehat, bermakna, serta bermanfaat bagi individu, keluarga, dan negara.`,
        },
      ],
      quiz: [], // Quiz moved to module level
    },
    {
      id: "sub5",
      title: "NAPZA",
      description:
        "Pengertian NAPZA, klasifikasi (stimulan, depresan, halusinogen), efek samping, dan peran orang tua.",
      duration: "60 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin5-1",
          title: "Materi Lengkap – NAPZA",
          type: "text",
          duration: "60 menit",
          isCompleted: false,
          content: `# NAPZA
1. Pengertian
\tNAPZA merupakan akronim dari Narkotika, Psikotropika dan Zat Adiktif lainnya, yang apabila digunakan dalam jangka waktu lama dapat menimbulkan ketergantungan. Ketergantungan NAPZA ditandai dengan dosis penggunaan yang semakin sering dan meningkat jumlahnya, kesulitan mengontrol keinginan untuk menahan diri dalam menggunakan NAPZA serta muncul gejala putus zat yang menyiksa penggunanya jika penggunaan dihentikan. Akibatnya orang dengan gangguan penggunaan NAPZA akan terus menggunakan meskipun telah mengetahui dampak buruknya, bahkan saat dia telah berada di ambang kematian karena penggunaan NAPZA.

2. Jenis-jenis NAPZA 
NAPZA yang beredar saat ini berdasarkan efeknya terhadap Susunan Saraf Pusat (SSP), diklasifikasikan sebagai stimulan, depresan dan halusinogen.
1) NAPZA stimulan dan efek sampingnya pada kesehatan
\tNAPZA yang termasuk dalam kelompok stimulan akan meningkatkan aktifitas SSP, misalnya menyebabkan peningkatan detak jantung dan tekanan darah serta meningkatkan kewaspadaan pada pengguna. Efek sampingnya pengguna akan banyak bicara, gelisah, sulit tidur, panik, cemas, sakit kepala, paranoia yaitu memiliki rasa curiga dan takut berlebihan serta agresi yaitu melakukan tindakan yang dapat menyakiti atau melukai orang lain baik secara fisik, verbal maupun psikis.
NAPZA dari kelompok stimulan yang banyak beredar saat ini contohnya seperti Amfetamin dan Nikotin yang terkandung pada rokok.

2) NAPZA Depresan dan efek sampingnya pada kesehatan
\tNAPZA yang termasuk dalam kelompok depresan akan menekan aktifitas SSP, misalnya menyebabkan penurunan detak jantung dan pernapasan. Efek sampingnya pengguna akan merasa tenang, euforia atau gembira berlebihan, sempoyongan, mual hingga muntah dan saat berbicara menjadi cadel.
NAPZA dari kelompok depresan yang banyak ditemukan saat ini berasal dari golongan Barbiturate seperti Fenobarbital atau Aprobarbital serta yang berasal dari golongan Benzodiazepine seperti Diazepam.

3) NAPZA Halusinogen dan efek sampingnya pada kesehatan
\tNAPZA yang termasuk dalam kelompok halusinogen akan menyebabkan pengguna mengalami perubahan persepsi atau kesadaran akan kondisi sekitarnya termasuk ruang dan waktu, perubahan pikiran dan perasaan.
\tEfek samping dari penggunaan NAPZA kelompok halusinogen ini antara lain pengguna akan kehilangan nafsu makan, mengalami kram perut, banyak bicara dan tertawa tanpa sebab, merasa panik, pupil mata akan melebar atau dilatasi pupil serta mengalami peningkatan tekanan darah dan detak jantung.
Contoh NAPZA yang termasuk dalam kelompok halusinogen ini adalah Jamur Psylocibin (mushroom).
\tBerbagai efek samping yang ditimbulkan dari gangguan penggunaan NAPZA ini mengganggu kesehatan, merusak organ tubuh dan apabila terus dilakukan tanpa pengobatan yang tepat melalui proses rehabilitasi baik itu medis dan sosial akan dapat membawa yang bersangkutan kepada kematian.
\tMelihat semua dampak tersebut, maka masa remaja yang merupakan masa rentan untuk mengalami gangguan penggunaan NAPZA karena merupakan masa penuh gejolak dan rasa ingin tahu serta keinginan untuk mencoba-coba hal baru, maka peran keluarga terutama orang tua sangat penting untuk terus menjaga dan mengingatkan anak-anaknya.

3. Peran Orang Tua 
Peran orang tua antara lain :
1.\tMengingatkan apabila ada yang menawarkan untuk menggunakan NAPZA, maka harus ditolak dengan tegas serta segera menghindari orang yang menawarkan NAPZA tersebut;
2.\tOrang tua juga harus terus mengajak anak untuk beribadah dan mendekatkan diri kepada Tuhan;
3.\tBergaul dengan teman-teman yang membawa pengaruh positif;
4.\tTidak mencoba untuk merokok
5.\tRajin berolahraga
6.\tTidak menerima hadiah atau pemberian barang dari orang yang tidak dikenal.
\tUntuk mencegah terjadinya gangguan penggunaan NAPZA pada remaja merupakan tanggung jawab kita bersama terutama orang tua, karena remaja adalah masa depan dan penentu nasib bangsa kita.`,
        },
      ],
      quiz: [], // Quiz moved to module level
    },
    {
      id: "sub6",
      title: "Posyandu Remaja",
      description:
        "Pengertian, tujuan, sasaran, fungsi, dan manfaat kegiatan Posyandu Remaja.",
      duration: "60 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin6-1",
          title: "Materi Lengkap – Posyandu Remaja",
          type: "text",
          duration: "60 menit",
          isCompleted: false,
          content: `# POSYANDU REMAJA
A. Pengertian
Remaja merupakan kelompok usia 10 tahun sampai sebelum berusia 18 tahun. Upaya kesehatan remaja memiliki tujuan untuk mempersiapkan remaja menjadi orang dewasa yang sehat, cerdas, berkualitas, dan produktif dan erperan serta dalam menjaga, mempertahankan dan meningkatkan kesehatan dirinya. (Kemenkes)
Posyandu remaja merupakan salah satu bentuk Upaya Kesehatan Bersumber Daya Masyarakat (UKBM) yang dikelola dan diselenggarakan dari, oleh, untuk dan bersama masyarakat termasuk remaja dalam penyelenggaraan pembangunan kesehatan.

B. Tujuan
. Tujuan Kegiatan Posyandu Remaja 
1. Tujuan Umum 
Mendekatkan akses dan meningkatkan cakupan layanan kesehatan bagi remaja. 

2. Tujuan Khusus 
a. Meningkatkan peran perencanaan, pelaksanaan dan evaluasi remaja dalam posyandu remaja 
b. Meningkatkan Pendidikan Keterampilan Hidup Sehat (PKHS. 
c. Meningkatkan pengetahuan dan keterampilan remaja tentang kesehatan reproduksi bagi remaja 
d. Meningkatkan pengetahuan terkait kesehatan jiwa dan pencegahan penyalahgunaan Napza

C. Sasaran
1. Sasaran Kegiatan Posyandu Remaja usia 10-18 tahun, laki-laki dan perempuan dengan tidak memandang status pendidikan dan perkawinan termasuk remaja dengan disabilitas. 
2. Sasaran Petunjuk Pelaksanaan 
a. Petugas kesehatan 
b. Pemerintah desa/kelurahan tokoh masyarakat, tokoh agama, organisasi kemasyarakatan lainnya 
c. Pengelola program remaja 
d. Keluarga dan masyarakat 
e. Kader Kesehatan Remaja

D. Fungsi Posyandu Remaja
 Pemberdayaan masyarakat dalam alih informasi dan keterampilan dalam rangka meningkatkan derajat kesehatan dan keterampilan hidup sehat remaja, pencegahan penyalahgunaan Napza, gizi, aktifitas fisik,pencegahan Penyakit Tidak Menular (PTM) dan pencegahan kekerasan pada remaja.

E. Manfaat Kegiatan Posyandu Remaja 
a. Kesehatan reproduksi remaja, masalah kesehatan jiwa dan pencegahan penyalahgunaan Napza, gizi, aktifitas fisik, pencegahan Penyakit Tidak Menular (PTM), pencegahan kekerasan pada remaja 
b. Mempersiapkan remaja untuk memiliki keterampilan Hidup sehat melalui PKHS 
c. Aktualisasi diri dalam kegiatan peningkatan derajat kesehatan remaja 
d. Petugas Kesehatan; 
•\tMendekatkan akses pelayanan kesehatan dasar pada masyarakat terutama remaja 
•\tmemecahkan masalah kesehatan spesifik sesuai dengan keluhan yang dialaminya`,
        },
      ],
      quiz: [], // Quiz moved to module level
    },
  ],
};

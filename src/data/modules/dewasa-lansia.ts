import { DetailModul } from "./types";

export const dewasaLansiaData: DetailModul = {
  id: 5,
  slug: "dewasa-lansia",
  title: "Modul Menu Dewasa & Lansia",
  description:
    "Meningkatkan pengetahuan kader tentang kesehatan masyarakat usia produktif, dewasa, dan lansia, melalui materi Germas, PTM, P2M, KB, dan Deteksi Dini Risiko Usia Produktif.",
  duration: "10 jam",
  lessons: 3,
  difficulty: "Menengah",
  category: "Dewasa & Lansia",
  status: "not-started",
  progress: 0,
  rating: 4.9,
  students: 770,
  thumbnail: "/dummy/dummy-fotoprofil.png",
  instructor: "Tim Kader Posyandu",
  estimatedCompletion: "8 hari",
  overview:
    "Modul ini membahas pentingnya perilaku hidup sehat bagi usia dewasa dan lansia melalui GERMAS, pencegahan penyakit tidak menular (PTM), penanggulangan penyakit menular (P2M), serta penyuluhan KB dan deteksi dini risiko kesehatan usia produktif.",
  learningObjectives: [
    "Memahami konsep dan langkah utama Gerakan Masyarakat Hidup Sehat (GERMAS).",
    "Mengetahui faktor risiko penyakit tidak menular dan menular serta upaya pencegahannya.",
    "Menjelaskan program Keluarga Berencana dan manfaatnya bagi kesehatan masyarakat.",
    "Mengenali risiko penyakit pada usia produktif seperti obesitas, hipertensi, DM, PPOK, gangguan penglihatan, dan kesehatan jiwa.",
    "Mengetahui cara menggunakan kuesioner skrining (PUMA & SRQ-20) untuk deteksi dini penyakit.",
  ],
  requirements: [
    "Kader posyandu yang menangani usia dewasa dan lansia.",
    "Tertarik meningkatkan pengetahuan pencegahan penyakit berbasis masyarakat.",
  ],
  subMateris: [
    {
      id: "sub1",
      title: "Penyuluhan Germas",
      description:
        "Memahami pengertian, tujuan, 7 langkah utama, serta peran masyarakat dan pemerintah dalam Gerakan Masyarakat Hidup Sehat (GERMAS).",
      duration: "60 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin1-1",
          title: "Materi Lengkap – Penyuluhan Germas",
          type: "text",
          duration: "60 menit",
          isCompleted: false,
          content: `# GERMAS (Gerakan Masyarakat Hidup Sehat)

## A. Apa itu Germas
Gerakan Masyarakat Hidup Sehat (GERMAS) adalah gerakan nasional yang diprakarsai oleh Presiden Republik Indonesia pada tahun 2016 untuk mendorong masyarakat berperilaku hidup sehat. Germas dilaksanakan oleh seluruh komponen bangsa, mulai dari pemerintah pusat, daerah, hingga masyarakat. Fokus utamanya adalah meningkatkan kesadaran masyarakat tentang pentingnya pola hidup sehat untuk mencegah penyakit dan meningkatkan produktivitas.

B. Tujuan Germas
Tujuan umum GERMAS adalah untuk meningkatkan kesadaran, kemauan, dan kemampuan masyarakat agar hidup sehat sehingga kualitas hidup meningkat. Tujuan khususnya meliputi:
1. Menurunkan beban penyakit menular dan tidak menular.
2. Menghemat biaya kesehatan.
3. Meningkatkan produktivitas dan kualitas hidup.
4. Menciptakan lingkungan sehat dan berkelanjutan.

C. Tujuh Langkah Utama Germas
1. Melakukan aktivitas fisik secara teratur minimal 30 menit setiap hari.
2. Mengonsumsi buah dan sayur setiap hari.
3. Tidak merokok.
4. Tidak mengonsumsi alkohol.
5. Melakukan pemeriksaan kesehatan secara berkala.
6. Menjaga kebersihan lingkungan.
7. Menggunakan jamban sehat.

D. Dampak Positif Germas
Pelaksanaan Germas secara berkelanjutan membawa dampak positif berupa meningkatnya kesadaran masyarakat untuk mencegah penyakit, menurunnya prevalensi Penyakit Tidak Menular (PTM), dan terciptanya lingkungan bersih dan sehat. Germas juga memperkuat gotong royong antara masyarakat, tenaga kesehatan, dan pemerintah daerah dalam meningkatkan derajat kesehatan.

E. Peran Pemerintah dan Masyarakat
Pemerintah berperan sebagai fasilitator dan penggerak dalam pelaksanaan GERMAS, sedangkan masyarakat menjadi pelaku utama yang menjalankan perilaku hidup sehat dalam kehidupan sehari-hari.`,
        },
      ],
      quiz: [
        {
          id: "quiz1-1",
          question: "GERMAS dicanangkan pertama kali pada tahun...",
          options: ["2014", "2015", "2016", "2017"],
          correctAnswer: 2,
          explanation: "GERMAS diprakarsai oleh Presiden RI pada tahun 2016.",
        },
        {
          id: "quiz1-2",
          question: "Berapa langkah utama GERMAS yang dijelaskan dalam materi?",
          options: ["5", "6", "7", "8"],
          correctAnswer: 2,
          explanation:
            "Ada 7 langkah utama GERMAS, termasuk aktivitas fisik, konsumsi buah sayur, dll.",
        },
        {
          id: "quiz1-3",
          question: "Salah satu tujuan GERMAS adalah...",
          options: [
            "Meningkatkan penyakit menular",
            "Menurunkan beban penyakit dan meningkatkan produktivitas",
            "Mengurangi aktivitas fisik masyarakat",
            "Menambah konsumsi rokok",
          ],
          correctAnswer: 1,
          explanation:
            "Tujuan GERMAS untuk menurunkan beban penyakit dan meningkatkan produktivitas.",
        },
        {
          id: "quiz1-4",
          question:
            "Langkah GERMAS yang termasuk perilaku pencegahan penyakit adalah...",
          options: [
            "Tidak mencuci tangan",
            "Mengonsumsi buah dan sayur",
            "Tidur berlebihan",
            "Minum alkohol",
          ],
          correctAnswer: 1,
          explanation:
            "Konsumsi buah dan sayur termasuk perilaku hidup sehat dalam GERMAS.",
        },
        {
          id: "quiz1-5",
          question: "Siapa pelaku utama dalam pelaksanaan GERMAS?",
          options: ["Pemerintah", "Masyarakat", "Tenaga medis saja", "Swasta"],
          correctAnswer: 1,
          explanation:
            "Masyarakat merupakan pelaku utama GERMAS dengan dukungan pemerintah.",
        },
      ],
    },
    {
      id: "sub2",
      title: "Penyuluhan Risiko PTM dan P2M",
      description:
        "Membahas pengertian, faktor risiko, jenis penyakit tidak menular (PTM) dan menular (P2M), serta strategi pencegahan di tingkat masyarakat.",
      duration: "70 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin2-1",
          title: "Materi Lengkap – Penyuluhan Risiko PTM dan P2M",
          type: "text",
          duration: "70 menit",
          isCompleted: false,
          content: `# PENYULUHAN RISIKO PENYAKIT TIDAK MENULAR (PTM) DAN P2M

## A. Pengertian
Penyakit Tidak Menular (PTM) adalah penyakit yang tidak ditularkan dari orang ke orang, biasanya berlangsung lama (kronis), dan disebabkan oleh kombinasi faktor genetik, fisiologis, lingkungan, dan perilaku. Contohnya: hipertensi, diabetes melitus, penyakit jantung, kanker, dan PPOK.

B. Faktor Risiko PTM
1. Perilaku tidak sehat seperti merokok dan konsumsi alkohol.
2. Pola makan tidak seimbang (kurang buah, sayur, dan tinggi lemak).
3. Kurang aktivitas fisik.
4. Kelebihan berat badan/obesitas.
5. Stres dan kurang istirahat.

C. Dampak PTM
PTM berdampak besar terhadap produktivitas masyarakat, biaya kesehatan, dan kematian dini.

D. Pencegahan PTM – CERDIK
C = Cek kesehatan secara rutin
E = Enyahkan asap rokok
R = Rajin aktivitas fisik
D = Diet sehat dengan gizi seimbang
I = Istirahat cukup
K = Kelola stres

E. Penyakit Menular (P2M)
Penyakit Menular disebabkan oleh agen infeksius yang dapat berpindah dari satu orang ke orang lain secara langsung atau tidak langsung.

F. Pencegahan P2M
1. Menjaga kebersihan diri dan lingkungan.
2. Melaksanakan imunisasi.
3. Menghindari kontak dengan penderita.
4. Menggunakan air bersih dan jamban sehat.
5. Cuci tangan pakai sabun secara rutin.

G. Peran Posyandu
Posyandu dewasa & lansia berperan dalam edukasi, deteksi dini risiko PTM, promosi Germas, dan PHBS.`,
        },
      ],
      quiz: [
        {
          id: "quiz2-1",
          question: "Contoh penyakit tidak menular adalah...",
          options: ["Influenza", "Hipertensi", "TBC", "Diare"],
          correctAnswer: 1,
          explanation: "Hipertensi merupakan contoh PTM.",
        },
        {
          id: "quiz2-2",
          question: "CERDIK digunakan untuk...",
          options: [
            "Mendeteksi penyakit menular",
            "Mencegah PTM",
            "Mengobati infeksi",
            "Mengukur gizi anak",
          ],
          correctAnswer: 1,
          explanation:
            "CERDIK merupakan strategi pencegahan PTM dari Kemenkes.",
        },
        {
          id: "quiz2-3",
          question: "Penyakit menular disebabkan oleh...",
          options: ["Gaya hidup", "Agen infeksius", "Stres", "Kurang tidur"],
          correctAnswer: 1,
          explanation:
            "Disebabkan oleh agen infeksius seperti virus, bakteri, parasit.",
        },
        {
          id: "quiz2-4",
          question: "Upaya pencegahan P2M yang benar adalah...",
          options: [
            "Menghindari imunisasi",
            "Menjaga kebersihan dan cuci tangan",
            "Tidur lebih lama",
            "Makan berlemak tinggi",
          ],
          correctAnswer: 1,
          explanation:
            "Menjaga kebersihan dan cuci tangan mencegah penyakit menular.",
        },
        {
          id: "quiz2-5",
          question: "Peran posyandu dalam pencegahan PTM dan P2M adalah...",
          options: [
            "Edukasi dan deteksi dini masyarakat",
            "Menjual obat",
            "Menyediakan rumah sakit",
            "Hanya vaksinasi bayi",
          ],
          correctAnswer: 0,
          explanation:
            "Posyandu dewasa dan lansia berperan dalam edukasi dan deteksi dini kesehatan.",
        },
      ],
    },
    {
      id: "sub3",
      title: "Penyuluhan KB dan Deteksi Dini Risiko Usia Produktif",
      description:
        "Membahas penyuluhan program KB, manfaatnya, jenis alat kontrasepsi, serta deteksi dini risiko kesehatan seperti obesitas, hipertensi, DM, PPOK, gangguan indera, penglihatan, kesehatan jiwa, dan TB.",
      duration: "80 menit",
      isCompleted: false,
      isUnlocked: true,
      currentPoinIndex: 0,
      poinDetails: [
        {
          id: "poin3-1",
          title:
            "Materi Lengkap – Penyuluhan KB dan Deteksi Dini Risiko Usia Produktif",
          type: "text",
          duration: "80 menit",
          isCompleted: false,
          content: `# PENYULUHAN KB (KELUARGA BERENCANA)

## A. Pengertian
Program KB bertujuan mengatur kelahiran anak, jarak dan usia ideal melahirkan, mengatur kehamilan, serta mewujudkan keluarga kecil bahagia sejahtera. KB penting untuk menjaga kesehatan ibu, anak, dan kesejahteraan keluarga.

B. Tujuan
1. Menurunkan angka kelahiran.
2. Meningkatkan kualitas keluarga.
3. Menekan angka kematian ibu dan bayi.
4. Mengatur jarak kelahiran dan mencegah kehamilan risiko tinggi.

C. Manfaat KB
- Menjaga kesehatan ibu dan anak.
- Meningkatkan kesejahteraan ekonomi keluarga.
- Memberi kesempatan bagi perempuan untuk pendidikan dan karier.
- Mengurangi risiko komplikasi kehamilan.

D. Jenis Alat Kontrasepsi
1. **Pria**: Kondom, vasektomi.
2. **Wanita**: Pil, suntik, IUD (spiral), implant, tubektomi.

---

## Deteksi Dini Risiko Usia Produktif
Deteksi dini dilakukan untuk menemukan masalah kesehatan sebelum menimbulkan komplikasi.

A. Pemeriksaan yang dilakukan meliputi:
- Pengukuran berat badan, tinggi badan, dan IMT (obesitas).
- Pengukuran tekanan darah (hipertensi).
- Pemeriksaan gula darah (diabetes melitus).
- Pemeriksaan fungsi paru dengan kuesioner **PUMA** (PPOK).
- Pemeriksaan penglihatan dan pendengaran.
- Skrining kesehatan jiwa dengan **SRQ-20**.
- Pemeriksaan gejala TB Paru.

---

### Kuesioner PUMA (PPOK)
Kuesioner ini digunakan untuk skrining penyakit paru obstruktif kronik (PPOK).
Pertanyaan mencakup:
- Riwayat merokok.
- Batuk kronis.
- Sesak napas.
- Riwayat pekerjaan dengan paparan debu/asap.
Skor tinggi menunjukkan risiko PPOK, dan responden perlu dirujuk ke fasilitas kesehatan.

### SRQ-20 (Self Reporting Questionnaire)
Digunakan untuk menilai kondisi kesehatan mental.
Terdiri dari 20 pertanyaan dengan jawaban “ya/tidak”.
Skor ≥6 menunjukkan indikasi gangguan emosional atau psikologis dan memerlukan tindak lanjut.

---

### Peran Kader Posyandu
- Melakukan skrining awal risiko kesehatan masyarakat usia produktif.
- Edukasi perilaku hidup sehat dan pentingnya pemeriksaan rutin.
- Rujuk ke puskesmas bila ditemukan hasil abnormal.
- Mendorong masyarakat mengikuti program KB dan pemeriksaan berkala.`,
        },
      ],
      quiz: [
        {
          id: "quiz3-1",
          question: "Tujuan utama program KB adalah...",
          options: [
            "Menambah jumlah anak",
            "Menurunkan angka kelahiran dan meningkatkan kesejahteraan keluarga",
            "Melarang kehamilan",
            "Meningkatkan populasi",
          ],
          correctAnswer: 1,
          explanation:
            "Tujuan KB untuk mengatur kelahiran dan meningkatkan kesejahteraan keluarga.",
        },
        {
          id: "quiz3-2",
          question: "Alat kontrasepsi yang digunakan pria adalah...",
          options: ["Pil", "IUD", "Kondom dan vasektomi", "Implant"],
          correctAnswer: 2,
          explanation:
            "Kondom dan vasektomi adalah alat kontrasepsi untuk pria.",
        },
        {
          id: "quiz3-3",
          question: "SRQ-20 digunakan untuk mendeteksi...",
          options: ["Hipertensi", "PPOK", "Kesehatan jiwa", "Obesitas"],
          correctAnswer: 2,
          explanation: "SRQ-20 adalah kuesioner untuk skrining kesehatan jiwa.",
        },
        {
          id: "quiz3-4",
          question: "Kuesioner PUMA digunakan untuk menilai risiko...",
          options: [
            "Diabetes Melitus",
            "PPOK",
            "Gangguan Penglihatan",
            "Hipertensi",
          ],
          correctAnswer: 1,
          explanation:
            "PUMA digunakan untuk skrining penyakit paru obstruktif kronik (PPOK).",
        },
        {
          id: "quiz3-5",
          question: "Skor ≥6 pada SRQ-20 menunjukkan...",
          options: [
            "Tidak ada masalah kesehatan",
            "Indikasi gangguan emosional atau psikologis",
            "Risiko PPOK",
            "Gangguan pendengaran",
          ],
          correctAnswer: 1,
          explanation:
            "Skor ≥6 menandakan adanya kemungkinan gangguan emosional atau psikologis.",
        },
      ],
    },
  ],
};

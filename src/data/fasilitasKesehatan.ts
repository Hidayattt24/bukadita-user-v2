export interface FasilitasKesehatan {
  id: number;
  nama: string;
  alamat: string;
  telepon: string;
  jamOperasional: string;
  website: string;
  mapsLink: string;
  tipe: "Dinas Kesehatan" | "Puskesmas" | "Rumah Sakit" | "Rumah Sakit Khusus";
  kategori?: string;
  deskripsi: string;
  lat: number;
  lng: number;
}

export const fasilitasKesehatanData: FasilitasKesehatan[] = [
  // --- DINAS KESEHATAN ---
  {
    id: 1,
    nama: "Dinas Kesehatan Kota Banda Aceh",
    alamat: "Jln. Kulu II Sukaramai, Baiturrahman, Kota Banda Aceh",
    telepon: "(0651) 23456",
    jamOperasional: "08:00 - 16:00 WIB",
    website: "dinkes.bandaacehkota.go.id",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.55725,95.3258",
    tipe: "Dinas Kesehatan",
    deskripsi: "Pusat koordinasi layanan kesehatan masyarakat di wilayah Banda Aceh.",
    lat: 5.55725,
    lng: 95.3258,
  },

  // --- RUMAH SAKIT UTAMA ---
  {
    id: 2,
    nama: "RSUD dr. Zainoel Abidin",
    alamat: "Jl. Tgk. Daud Beureueh No.108, Kuta Alam",
    telepon: "(0651) 34115",
    jamOperasional: "24 Jam",
    website: "rsudza.acehprov.go.id",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.563691,95.337576",
    tipe: "Rumah Sakit",
    kategori: "Rumah Sakit Umum",
    deskripsi: "Rumah sakit rujukan kelas A tertinggi di Provinsi Aceh.",
    lat: 5.563691,
    lng: 95.337576,
  },
  {
    id: 3,
    nama: "RSKB 3S (RS Khusus Bedah)",
    alamat: "Jl. Inspeksi Krueng Aceh, Pango Deah, Ulee Kareng",
    telepon: "(0651) 41234",
    jamOperasional: "24 Jam",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.569572,95.320431",
    tipe: "Rumah Sakit Khusus",
    kategori: "Rumah Sakit Bedah",
    deskripsi: "Fasilitas kesehatan khusus tindakan bedah umum dan spesialis.",
    lat: 5.569572,
    lng: 95.320431,
  },
  {
    id: 4,
    nama: "RS Pertamedika Ummi Rosnati",
    alamat: "Jl. Sekolah No.5, Ateuk Pahlawan, Baiturrahman",
    telepon: "(0651) 51234",
    jamOperasional: "24 Jam",
    website: "ummirosnati.pertamedika.co.id",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.548175,95.32645",
    tipe: "Rumah Sakit",
    kategori: "Rumah Sakit Swasta",
    deskripsi: "Layanan medis swasta profesional dengan peralatan modern.",
    lat: 5.548175,
    lng: 95.32645,
  },
  {
    id: 5,
    nama: "Rumah Sakit Jiwa Banda Aceh",
    alamat: "Jl. Dr. T. Syarib Thayeb No.25, Kuta Alam",
    telepon: "(0651) 61234",
    jamOperasional: "24 Jam",
    website: "rsj.acehprov.go.id",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.559921,95.33297",
    tipe: "Rumah Sakit Khusus",
    kategori: "Rumah Sakit Jiwa",
    deskripsi: "Pusat rehabilitasi dan pelayanan kesehatan mental di Aceh.",
    lat: 5.559921,
    lng: 95.33297,
  },
  {
    id: 6,
    nama: "RS Bhayangkara Banda Aceh",
    alamat: "Jl. Cut Nyak Dhien No.23, Lamteumen Barat",
    telepon: "(0651) 71234",
    jamOperasional: "24 Jam",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.54948,95.30821",
    tipe: "Rumah Sakit",
    kategori: "Rumah Sakit Polri",
    deskripsi: "Rumah sakit milik Polri yang terbuka untuk pasien umum dan BPJS.",
    lat: 5.54948,
    lng: 95.30821,
  },
  {
    id: 7,
    nama: "RSU Tk II Iskandar Muda (Kesdam)",
    alamat: "Jl. T. Hamzah Bendahara No.1, Kuta Alam",
    telepon: "(0651) 81234",
    jamOperasional: "24 Jam",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.55614,95.3416",
    tipe: "Rumah Sakit",
    kategori: "Rumah Sakit TNI",
    deskripsi: "RS TNI-AD dengan fasilitas gawat darurat dan poli spesialis.",
    lat: 5.55614,
    lng: 95.3416,
  },
  {
    id: 8,
    nama: "RSIA Cempaka Az-Zahra",
    alamat: "Jl. Syiah Kuala, Kp. Mulia, Kuta Alam",
    telepon: "(0651) 91234",
    jamOperasional: "24 Jam",
    website: "rsiacempakaazzahra.com",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.549912,95.325411",
    tipe: "Rumah Sakit Khusus",
    kategori: "RS Ibu dan Anak",
    deskripsi: "Pelayanan kehamilan, persalinan, dan kesehatan anak terpadu.",
    lat: 5.549912,
    lng: 95.325411,
  },
  {
    id: 9,
    nama: "RSGM Universitas Syiah Kuala",
    alamat: "Jl. Prof. Majid Ibrahim I No.5, Kopelma Darussalam",
    telepon: "(0651) 01234",
    jamOperasional: "08:00 - 16:00 WIB",
    website: "fkg.unsyiah.ac.id",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.56634,95.37122",
    tipe: "Rumah Sakit Khusus",
    kategori: "RS Gigi dan Mulut",
    deskripsi: "Pelayanan medis spesialis gigi dan mulut di area kampus USK.",
    lat: 5.56634,
    lng: 95.37122,
  },
  {
    id: 10,
    nama: "RS Pendidikan USK (Prince Nayef)",
    alamat: "Jl. Lingkar Kampus Darussalam, Syiah Kuala",
    telepon: "(0651) 11234",
    jamOperasional: "24 Jam",
    website: "rsp.unsyiah.ac.id",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.56582,95.37251",
    tipe: "Rumah Sakit",
    kategori: "Rumah Sakit Pendidikan",
    deskripsi: "Fasilitas rumah sakit pendidikan kedokteran USK.",
    lat: 5.56582,
    lng: 95.37251,
  },
  {
    id: 11,
    nama: "RSU Meutia",
    alamat: "Jl. Cut Mutia No. 1, Kp. Baru, Baiturrahman",
    telepon: "(0651) 21234",
    jamOperasional: "24 Jam",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.55321,95.33088",
    tipe: "Rumah Sakit",
    kategori: "Rumah Sakit Swasta",
    deskripsi: "Layanan IGD dan rawat jalan di pusat kota Banda Aceh.",
    lat: 5.55321,
    lng: 95.33088,
  },
  {
    id: 12,
    nama: "RS Harapan Bunda",
    alamat: "Jl. T. Umar No.181, Seutui, Baiturrahman",
    telepon: "(0651) 31234",
    jamOperasional: "24 Jam",
    website: "rsharapanbunda.com",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.538342,95.329008",
    tipe: "Rumah Sakit",
    kategori: "Rumah Sakit Swasta",
    deskripsi: "Salah satu rumah sakit swasta tertua dan terpercaya di Banda Aceh.",
    lat: 5.538342,
    lng: 95.329008,
  },
  {
    id: 13,
    nama: "RS Fakinah",
    alamat: "Jl. Jend. Sudirman No.27, Geuceu, Banda Raya",
    telepon: "(0651) 41235",
    jamOperasional: "24 Jam",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.53982,95.31305",
    tipe: "Rumah Sakit",
    kategori: "Rumah Sakit Swasta",
    deskripsi: "Menyediakan layanan bedah dan poliklinik spesialis.",
    lat: 5.53982,
    lng: 95.31305,
  },

  // --- PUSKESMAS ---
  {
    id: 14,
    nama: "Puskesmas Meuraxa",
    alamat: "Jl. Sultan Iskandar Muda, Meuraxa",
    telepon: "(0651) 51235",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.54366,95.28898",
    tipe: "Puskesmas",
    deskripsi: "Layanan kesehatan tingkat pertama masyarakat wilayah pesisir Meuraxa.",
    lat: 5.54366,
    lng: 95.28898,
  },
  {
    id: 15,
    nama: "Puskesmas Jayabaru",
    alamat: "Jl. Tgk. Abd. Rahman, Jaya Baru",
    telepon: "(0651) 61235",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.53479,95.30215",
    tipe: "Puskesmas",
    deskripsi: "Fasilitas pengobatan dasar di wilayah Kecamatan Jaya Baru.",
    lat: 5.53479,
    lng: 95.30215,
  },
  {
    id: 16,
    nama: "Puskesmas Banda Raya",
    alamat: "Jl. Tgk. Abd di Lhong I, Banda Raya",
    telepon: "(0651) 71235",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.52925,95.31938",
    tipe: "Puskesmas",
    deskripsi: "Pelayanan kesehatan umum dan imunisasi anak wilayah Banda Raya.",
    lat: 5.52925,
    lng: 95.31938,
  },
  {
    id: 17,
    nama: "Puskesmas Baiturrahman",
    alamat: "Jl. Belibis Lr. Adam No.6, Baiturrahman",
    telepon: "(0651) 81235",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.54378,95.31835",
    tipe: "Puskesmas",
    deskripsi: "Melayani kesehatan dasar masyarakat pusat kota Banda Aceh.",
    lat: 5.54378,
    lng: 95.31835,
  },
  {
    id: 18,
    nama: "Puskesmas Batoh",
    alamat: "Jl. Turi Utama, Cot Mesjid, Lueng Bata",
    telepon: "(0651) 91235",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.52834,95.34211",
    tipe: "Puskesmas",
    deskripsi: "Pusat kesehatan tingkat pertama di wilayah Lueng Bata dan Batoh.",
    lat: 5.52834,
    lng: 95.34211,
  },
  {
    id: 19,
    nama: "Puskesmas Kuta Alam",
    alamat: "Jl. Twk. Hasyim Banta Muda No.11, Kuta Alam",
    telepon: "(0651) 01235",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.56055,95.33056",
    tipe: "Puskesmas",
    deskripsi: "Melayani poli umum, gigi, dan KIA di wilayah Kuta Alam.",
    lat: 5.56055,
    lng: 95.33056,
  },
  {
    id: 20,
    nama: "Puskesmas Lampulo",
    alamat: "Jl. Buah Delima Komplek Perikanan, Lampulo",
    telepon: "(0651) 11235",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.57142,95.33234",
    tipe: "Puskesmas",
    deskripsi: "Layanan medis dasar dekat kawasan pelabuhan perikanan.",
    lat: 5.57142,
    lng: 95.33234,
  },
  {
    id: 21,
    nama: "Puskesmas Lampaseh Kota",
    alamat: "Jl. Rama Setia Lr. Syahmidin, Kuta Raja",
    telepon: "(0651) 21235",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.55288,95.30867",
    tipe: "Puskesmas",
    deskripsi: "Unit layanan kesehatan tingkat pertama wilayah Kuta Raja.",
    lat: 5.55288,
    lng: 95.30867,
  },
  {
    id: 22,
    nama: "Puskesmas Kopelma Darussalam",
    alamat: "Jl. Inong Balee No.38, Kopelma Darussalam",
    telepon: "(0651) 12345",
    jamOperasional: "24 Jam",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.57214,95.36978",
    tipe: "Puskesmas",
    deskripsi: "Pusat kesehatan yang melayani warga dan mahasiswa Darussalam.",
    lat: 5.57214,
    lng: 95.36978,
  },
  {
    id: 23,
    nama: "Puskesmas Jeulingke",
    alamat: "Jl. Batee Timoh, Jeulingke, Syiah Kuala",
    telepon: "(0651) 31235",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.57562,95.34889",
    tipe: "Puskesmas",
    deskripsi: "Layanan kesehatan tingkat pertama di wilayah Syiah Kuala.",
    lat: 5.57562,
    lng: 95.34889,
  },
  {
    id: 24,
    nama: "Puskesmas Ulee Kareng",
    alamat: "Jl. Prof. Ali Hasyimi, Pango Raya",
    telepon: "(0651) 41236",
    jamOperasional: "08:00 - 14:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.56139,95.35241",
    tipe: "Puskesmas",
    deskripsi: "Melayani pengobatan dasar warga Kecamatan Ulee Kareng.",
    lat: 5.56139,
    lng: 95.35241,
  },

  // --- WILAYAH DARUSSALAM (Apotek & Klinik) ---
  {
    id: 25,
    nama: "Apotek Kimia Farma Darussalam",
    alamat: "Jl. Tgk Nyak Arief, Kopelma Darussalam",
    telepon: "(0651) 7555234",
    jamOperasional: "07:00 - 23:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.569345,95.368541",
    tipe: "Rumah Sakit Khusus",
    kategori: "Apotek",
    deskripsi: "Penyedia obat terlengkap di area gerbang utama kampus USK.",
    lat: 5.569345,
    lng: 95.368541,
  },
  {
    id: 26,
    nama: "Apotek K-24 Darussalam",
    alamat: "Jl. Tgk Nyak Arief No. 12, Darussalam",
    telepon: "(0651) 8012345",
    jamOperasional: "24 Jam",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.570125,95.368412",
    tipe: "Rumah Sakit Khusus",
    kategori: "Apotek",
    deskripsi: "Apotek buka 24 jam untuk kebutuhan obat darurat mahasiswa.",
    lat: 5.570125,
    lng: 95.368412,
  },
  {
    id: 27,
    nama: "Klinik Pratama USK (GMC)",
    alamat: "Jl. Syekh Abdurauf, Kopelma Darussalam",
    telepon: "(0651) 7552438",
    jamOperasional: "08:00 - 22:00 WIB",
    website: "klinik.usk.ac.id",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.570212,95.36965",
    tipe: "Puskesmas",
    kategori: "Klinik Kampus",
    deskripsi: "Layanan medis primer terdekat bagi mahasiswa USK & UIN.",
    lat: 5.570212,
    lng: 95.36965,
  },
  {
    id: 28,
    nama: "Fakultas Kedokteran USK",
    alamat: "Jl. Tgk. Tanoeh Mirah, Darussalam",
    telepon: "(0651) 7551843",
    jamOperasional: "08:00 - 16:45 WIB",
    website: "fk.usk.ac.id",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.567215,95.370845",
    tipe: "Dinas Kesehatan",
    kategori: "Layanan Pendidikan",
    deskripsi: "Instansi pendidikan medis pusat riset kesehatan Aceh.",
    lat: 5.567215,
    lng: 95.370845,
  },
  {
    id: 29,
    nama: "Fakultas Keperawatan USK",
    alamat: "Jl. Tgk. Tanoh Mirah, Syiah Kuala",
    telepon: "(0651) 7555249",
    jamOperasional: "08:00 - 16:45 WIB",
    website: "fkep.usk.ac.id",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.567425,95.37151",
    tipe: "Dinas Kesehatan",
    kategori: "Layanan Pendidikan",
    deskripsi: "Pusat pendidikan ners yang aktif dalam kesehatan komunitas.",
    lat: 5.567425,
    lng: 95.37151,
  },
  {
    id: 30,
    nama: "Laboratorium Terpadu USK",
    alamat: "Jl. Syech Abdurauf No. 7, Darussalam",
    telepon: "(0651) 7553205",
    jamOperasional: "08:00 - 16:00 WIB",
    website: "-",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=5.57121,95.37012",
    tipe: "Rumah Sakit Khusus",
    kategori: "Laboratorium",
    deskripsi: "Layanan cek laboratorium medis dan penelitian.",
    lat: 5.57121,
    lng: 95.37012,
  },
];

// Helper function to get facilities by type
export const getFasilitasByType = (
  tipe: FasilitasKesehatan["tipe"]
): FasilitasKesehatan[] => {
  return fasilitasKesehatanData.filter((f) => f.tipe === tipe);
};

// Helper function to get all hospitals
export const getRumahSakit = (): FasilitasKesehatan[] => {
  return fasilitasKesehatanData.filter(
    (f) => f.tipe === "Rumah Sakit" || f.tipe === "Rumah Sakit Khusus"
  );
};

// Helper function to get all puskesmas
export const getPuskesmas = (): FasilitasKesehatan[] => {
  return getFasilitasByType("Puskesmas");
};

// Helper function to search facilities by name or address
export const searchFasilitas = (query: string): FasilitasKesehatan[] => {
  const lowerQuery = query.toLowerCase();
  return fasilitasKesehatanData.filter(
    (f) =>
      f.nama.toLowerCase().includes(lowerQuery) ||
      f.alamat.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to get facilities by kategori
export const getFasilitasByKategori = (kategori: string): FasilitasKesehatan[] => {
  return fasilitasKesehatanData.filter(
    (f) => f.kategori?.toLowerCase() === kategori.toLowerCase()
  );
};

// Helper function to get facilities near Darussalam (for students)
export const getFasilitasDarussalam = (): FasilitasKesehatan[] => {
  return fasilitasKesehatanData.filter(
    (f) =>
      f.alamat.toLowerCase().includes("darussalam") ||
      f.alamat.toLowerCase().includes("syiah kuala") ||
      f.alamat.toLowerCase().includes("kopelma")
  );
};

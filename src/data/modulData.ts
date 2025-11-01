export interface ModulData {
  id: number;
  moduleId?: string; // UUID string for API calls
  slug: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  difficulty: "Pemula" | "Menengah" | "Lanjutan";
  category:
    | "Pengelolaan Posyandu"
    | "Bayi & Balita"
    | "Ibu Hamil & Menyusui"
    | "Usia Sekolah & Remaja"
    | "Dewasa & Lansia";
  status: "not-started" | "in-progress" | "completed";
  progress: number;
  rating: number;
  students: number;
  thumbnail: string;
  instructor: string;
  estimatedCompletion: string;
}

export const modulPosyanduData: ModulData[] = [
  // Modul Pengelolaan Posyandu
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
    status: "completed",
    progress: 100,
    rating: 4.9,
    students: 850,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Siti Nurhaliza",
    estimatedCompletion: "5 hari",
  },

  // Modul Bayi & Balita
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
    status: "in-progress",
    progress: 65,
    rating: 4.8,
    students: 1450,
    thumbnail: "/dummy/dummy-fotoprofil.png",
    instructor: "Dr. Budi Santoso",
    estimatedCompletion: "6 hari",
  },

  // Modul Ibu Hamil & Menyusui
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
  },

  // Modul Usia Sekolah & Remaja
  {
    id: 4,
    slug: "usia-sekolah-remaja",
    title: "Modul Usia Sekolah & Remaja",
    description:
      "Memahami kesehatan dan perkembangan anak usia sekolah serta remaja, mencakup gizi, kesehatan reproduksi, dan masalah kesehatan mental dengan fitur pelaporan WhatsApp terintegrasi.",
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
  },

  // Modul Dewasa & Lansia
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
  },
];

// Fungsi untuk mendapatkan statistik berdasarkan kategori
export const getModulStatsByCategory = (category: string) => {
  const categoryModuls =
    category === "all"
      ? modulPosyanduData
      : modulPosyanduData.filter((modul) => modul.category === category);

  return {
    total: categoryModuls.length,
    completed: categoryModuls.filter((m) => m.status === "completed").length,
    inProgress: categoryModuls.filter((m) => m.status === "in-progress").length,
    notStarted: categoryModuls.filter((m) => m.status === "not-started").length,
  };
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

// Fungsi untuk mendapatkan modul berdasarkan slug
export const getModulBySlug = (slug: string): ModulData | undefined => {
  return modulPosyanduData.find((modul) => modul.slug === slug);
};

// Fungsi untuk mendapatkan semua kategori
export const getCategories = () => [
  "all",
  "Pengelolaan Posyandu",
  "Bayi & Balita",
  "Ibu Hamil & Menyusui",
  "Usia Sekolah & Remaja",
  "Dewasa & Lansia",
];

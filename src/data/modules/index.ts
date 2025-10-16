export type {
  DetailModul,
  SubMateri,
  PoinDetail,
  Quiz,
  QuizResult,
} from "./types";

// Import semua modul
export { pengelolaanPosyanduData } from "./pengelolaan-posyandu";
export { bayiBalitaData } from "./bayi-balita";
export { ibuHamilMenyusuiData } from "./ibu-hamil-menyusui";
export { usiaSekolahRemajaData } from "./usia-sekolah-remaja";
export { dewasaLansiaData } from "./dewasa-lansia";

// Array semua data modul
import { pengelolaanPosyanduData } from "./pengelolaan-posyandu";
import { bayiBalitaData } from "./bayi-balita";
import { ibuHamilMenyusuiData } from "./ibu-hamil-menyusui";
import { usiaSekolahRemajaData } from "./usia-sekolah-remaja";
import { dewasaLansiaData } from "./dewasa-lansia";

export const allModulesDetailData = [
  pengelolaanPosyanduData,
  bayiBalitaData,
  ibuHamilMenyusuiData,
  usiaSekolahRemajaData,
  dewasaLansiaData,
];

// Helper function untuk mencari modul berdasarkan slug
export const getModuleBySlug = (slug: string) => {
  return allModulesDetailData.find((modul) => modul.slug === slug);
};

// Helper function untuk mencari modul berdasarkan ID
export const getModuleById = (id: number) => {
  return allModulesDetailData.find((modul) => modul.id === id);
};

// Helper function untuk mencari modul berdasarkan kategori
export const getModulesByCategory = (category: string) => {
  return allModulesDetailData.filter((modul) => modul.category === category);
};

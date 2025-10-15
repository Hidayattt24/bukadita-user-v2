/**
 * Module ID Mapping
 *
 * Frontend has static module data with hardcoded IDs (1, 2, 3, etc.)
 * Backend tracks progress using these same IDs
 *
 * This mapping ensures consistency between frontend static data
 * and backend progress tracking.
 */

export const MODULE_ID_MAPPING = {
  // Frontend ID → Backend module_id (same)
  1: 1, // Pengelolaan Posyandu
  2: 2, // Bayi & Balita
  3: 3, // Ibu Hamil & Menyusui
  4: 4, // Usia Sekolah & Remaja
  5: 5, // Dewasa & Lansia
} as const;

export type FrontendModuleId = keyof typeof MODULE_ID_MAPPING;
export type BackendModuleId = (typeof MODULE_ID_MAPPING)[FrontendModuleId];

/**
 * Get backend module ID from frontend module ID
 */
export function getBackendModuleId(frontendId: number): number {
  return MODULE_ID_MAPPING[frontendId as FrontendModuleId] || frontendId;
}

/**
 * Get frontend module ID from backend module ID
 * (In this case, they're the same, but function exists for consistency)
 */
export function getFrontendModuleId(backendId: number): number {
  return backendId;
}

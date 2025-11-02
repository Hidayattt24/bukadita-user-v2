"use client";

import { useState, useEffect, useCallback } from "react";
import { ModuleService } from "@/services/moduleService";
import { SubMateriService } from "@/services/subMateriService"; // ✅ Use existing service instead of duplicate
import { QuizService } from "@/services/quizService";
import type { DetailModul, SubMateri, PoinDetail, Quiz } from "@/types/modul";

/**
 * Custom hook untuk fetch module detail lengkap dari database
 * Menggantikan getModuleBySlug() yang pakai dummy data
 *
 * Flow:
 * 1. Fetch module by slug
 * 2. Fetch sub-materials untuk module tersebut
 * 3. Fetch poins untuk setiap sub-material
 * 4. Fetch quiz untuk setiap sub-material
 * 5. Convert ke format DetailModul yang dipakai components
 */
export const useModuleDetailFromDB = (slug: string | null) => {
  const [modul, setModul] = useState<DetailModul | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModuleDetail = useCallback(async () => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`[useModuleDetail] 🔍 Fetching module with slug: "${slug}"`);

      // Step 1: Fetch modules list and find by slug
      const modulesResponse = await ModuleService.getAllModules();

      console.log(`[useModuleDetail] Modules response:`, {
        error: modulesResponse.error,
        hasData: !!modulesResponse.data,
        itemsCount: modulesResponse.data?.items?.length || 0,
        items: modulesResponse.data?.items?.map(m => ({
          slug: m.slug,
          title: m.title,
          published: m.published,
        })) || [],
      });

      if (modulesResponse.error || !modulesResponse.data) {
        throw new Error(modulesResponse.message || "Failed to fetch modules");
      }

      const moduleData = modulesResponse.data.items.find(
        (m) => m.slug === slug
      );

      if (!moduleData) {
        console.error(`[useModuleDetail] ❌ Module not found with slug: "${slug}"`);
        console.log(`[useModuleDetail] Available slugs:`, modulesResponse.data.items.map(m => m.slug));
        setError(`Module "${slug}" not found`);
        setModul(null);
        setIsLoading(false);
        return;
      }

      console.log(`[useModuleDetail] ✅ Found module:`, {
        id: moduleData.id,
        slug: moduleData.slug,
        title: moduleData.title,
        published: moduleData.published,
      });

      // Step 2: Fetch sub-materials using existing service
      // ✅ Use UUID (moduleData.id) for API call, not numeric ID
      console.log(
        `[useModuleDetail] Fetching sub-materials for module UUID: ${moduleData.id}`
      );
      const materialsResponse = await SubMateriService.getByModuleId(
        moduleData.id, // ✅ This is UUID from database
        1,
        100 // Get all sub-materials
      );

      console.log(`[useModuleDetail] Materials response:`, {
        error: materialsResponse.error,
        dataLength: materialsResponse.data?.length || 0,
        code: materialsResponse.code,
        message: materialsResponse.message,
        materials: materialsResponse.data?.map(m => ({
          id: m.id,
          title: m.title,
          published: m.published,
        })) || [],
      });

      if (materialsResponse.error) {
        console.warn(`[useModuleDetail] Failed to fetch materials:`, materialsResponse.message);
      }

      const subMaterialsList = materialsResponse.data || [];

      console.log(
        `[useModuleDetail] Fetched ${subMaterialsList.length} sub-materials for module ${moduleData.title}`
      );

      // Step 3: Fetch poins for each sub-material and convert format

      // ✅ FIX: Safely convert UUID to number (fallback to hash if conversion fails)
      let numericId: number;
      try {
        // Try to parse first 8 chars as hex (works for UUIDs)
        const hexPart = moduleData.id.replace(/-/g, "").substring(0, 8);
        numericId = parseInt(hexPart, 16);
        if (isNaN(numericId) || numericId === 0) {
          // Fallback: use string hash
          numericId = Math.abs(
            moduleData.id.split("").reduce((acc, char) => {
              return (acc << 5) - acc + char.charCodeAt(0);
            }, 0)
          );
        }
      } catch {
        // Last resort: create a simple hash from the UUID string
        numericId = Math.abs(
          moduleData.id.split("").reduce((acc, char) => {
            return (acc << 5) - acc + char.charCodeAt(0);
          }, 0)
        );
      }

      console.log(`[useModuleDetail] Module ID conversion:`, {
        uuid: moduleData.id,
        numericId,
        isValid: !isNaN(numericId) && numericId > 0,
      });

      const convertedModule: DetailModul = {
        id: numericId, // ✅ Converted to number with fallback
        moduleId: moduleData.id, // ✅ Store actual UUID for API calls
        slug: moduleData.slug,
        title: moduleData.title,
        description: moduleData.description || "",
        category: moduleData.category || "Uncategorized",
        duration: moduleData.duration_label || "Belum ditentukan",
        lessons: moduleData.lessons || 0,
        difficulty: "Menengah" as const, // TODO: Add difficulty field to database
        status: "not-started" as const,
        progress: 0,
        rating: 0, // TODO: Add rating field to database
        students: 0, // TODO: Add students count to database
        thumbnail: "/dummy/dummy-fotoprofil.png", // TODO: Add thumbnail field to database
        instructor: "Kader Posyandu", // TODO: Add instructor field to database
        estimatedCompletion: "Sesuai kecepatan belajar Anda", // TODO: Add estimated_completion field to database
        overview: moduleData.description || "",
        learningObjectives: [],
        requirements: [],
        subMateris: await Promise.all(
          subMaterialsList.map(async (subMat, index) => {
            // Fetch poins for this sub-materi
            // Use material detail endpoint which includes poin_details
            let poinsList: any[] = [];
            
            console.log(`[useModuleDetail] Fetching poin details for sub-materi: ${subMat.id} (${subMat.title})`);
            
            const materialDetailResponse = await SubMateriService.getSubMateriDetail(subMat.id);
            
            console.log(`[useModuleDetail] Material detail response:`, {
              error: materialDetailResponse.error,
              hasData: !!materialDetailResponse.data,
              dataKeys: materialDetailResponse.data ? Object.keys(materialDetailResponse.data) : [],
              rawData: materialDetailResponse.data,
            });
            
            if (!materialDetailResponse.error && materialDetailResponse.data) {
              // Extract poin_details from material detail response
              poinsList = (materialDetailResponse.data as any).poin_details || [];
              console.log(`[useModuleDetail] ✅ Got ${poinsList.length} poins for "${subMat.title}"`);
              
              if (poinsList.length === 0) {
                console.warn(`[useModuleDetail] ⚠️ No poin_details array found or empty for "${subMat.title}". Check if admin has created poin details for this material.`);
              }
            } else {
              console.warn(`[useModuleDetail] ⚠️ Failed to fetch material detail for "${subMat.title}":`, {
                error: materialDetailResponse.error,
                message: materialDetailResponse.message,
                code: materialDetailResponse.code,
              });
            }

            // Fetch quiz for this sub-materi
            let quizData: Quiz[] = [];
            let quizId: string | undefined = undefined;
            let quizTimeLimit: number = 15; // Default 15 minutes
            let passingScore: number = 70; // Default 70%
            try {
              const quizResponse = await QuizService.getQuizBySubMateri(
                subMat.id
              );
              if (!quizResponse.error && quizResponse.data?.quiz) {
                const quiz = quizResponse.data.quiz;
                quizId = quiz.id;
                quizTimeLimit = quiz.time_limit_seconds || 15;
                passingScore = quiz.passing_score || 70;

                console.log(
                  `[useModuleDetail] Found quiz for sub-materi: ${quizId}`,
                  {
                    timeLimit: quizTimeLimit,
                    passingScore: passingScore,
                  }
                );

                // ✅ Create quiz data with actual quiz information
                quizData = [
                  {
                    id: quizId,
                    question: `Kuis tersedia ${Math.round(quizTimeLimit / 60)} menit`,
                    options: ["Mulai kuis untuk melihat pertanyaan"],
                    correctAnswer: 0,
                    explanation: `Waktu: ${Math.round(quizTimeLimit / 60)} menit | Nilai lulus: ${passingScore}%`,
                    time_limit_seconds: quizTimeLimit, // ✅ Store actual time limit
                    passing_score: passingScore, // ✅ Store passing score
                    title: quiz.title, // ✅ Store quiz title
                  },
                ];

                console.log(
                  `[useModuleDetail] ✅ Quiz data created for quiz ID: ${quizId}`
                );
              }
            } catch {
              console.log(
                `[useModuleDetail] No quiz found for sub-materi ${subMat.id}`
              );
            }

            // Convert poins
            const poinDetails: PoinDetail[] = poinsList.map((poin) => {
              // Determine type from content_type or default to 'text'
              let type: "text" | "video" | "image" = "text";
              if (poin.content_html?.includes("<video")) type = "video";
              if (poin.content_html?.includes("<img")) type = "image";

              // Calculate duration
              const durationMinutes = poin.duration_minutes || 10;
              const duration =
                durationMinutes < 60
                  ? `${durationMinutes} menit`
                  : `${Math.floor(durationMinutes / 60)} jam ${
                      durationMinutes % 60
                    } menit`;

              // Extract media items (poin_media from backend)
              const media = poin.poin_media || [];
              
              console.log(`[useModuleDetail] Poin "${poin.title}" media:`, {
                hasMedia: media.length > 0,
                mediaCount: media.length,
                mediaIds: media.map((m: any) => m.id),
              });

              return {
                id: poin.id, // Use UUID as ID
                title: poin.title,
                type,
                duration,
                content: poin.content_html || "<p>Konten belum tersedia. Hubungi admin untuk menambahkan konten.</p>", // ✅ HTML content from database with fallback
                media: media, // ✅ Include media items
                isCompleted: false, // Will be updated by progress tracking
              };
            });
            
            // Add placeholder poin if no poins exist
            if (poinDetails.length === 0) {
              console.warn(`[useModuleDetail] Adding placeholder poin for "${subMat.title}" since no poin_details exist`);
              poinDetails.push({
                id: `placeholder-${subMat.id}`,
                title: "Konten Belum Tersedia",
                type: "text",
                duration: "0 menit",
                content: "<div class='p-4 bg-yellow-50 border border-yellow-200 rounded'><p class='text-yellow-800'>⚠️ Konten untuk sub-materi ini belum ditambahkan oleh admin.</p><p class='text-yellow-700 mt-2'>Silakan hubungi admin untuk menambahkan konten pembelajaran.</p></div>",
                isCompleted: false,
              });
            }

            // Calculate total duration for this sub-materi
            const totalDurationMinutes = poinsList.reduce(
              (sum, p) => sum + (p.duration_minutes || 0),
              0
            );
            const subMateriDuration =
              totalDurationMinutes < 60
                ? `${totalDurationMinutes} menit`
                : `${Math.floor(totalDurationMinutes / 60)} jam ${
                    totalDurationMinutes % 60
                  } menit`;

            const subMateriData: SubMateri = {
              id: subMat.id, // Use UUID as ID
              title: subMat.title,
              description: subMat.content || "",
              duration: subMateriDuration,
              isUnlocked: index === 0, // First sub-materi is unlocked by default
              isCompleted: false, // Will be updated by progress tracking
              currentPoinIndex: 0,
              poinDetails,
              quiz: quizData,
              quizResult: undefined,
            };

            return subMateriData;
          })
        ),
      };

      setModul(convertedModule);
      
      // Summary logging
      const totalPoins = convertedModule.subMateris.reduce(
        (sum, sub) => sum + sub.poinDetails.length,
        0
      );
      const totalQuizzes = convertedModule.subMateris.reduce(
        (sum, sub) => sum + sub.quiz.length,
        0
      );
      
      console.log(`[useModuleDetail] ✅ Module loaded successfully:`, {
        title: convertedModule.title,
        moduleId: convertedModule.moduleId,
        numericId: convertedModule.id,
        subMateris: convertedModule.subMateris.length,
        totalPoins,
        totalQuizzes,
        subMateriDetails: convertedModule.subMateris.map(sub => ({
          title: sub.title,
          poins: sub.poinDetails.length,
          hasQuiz: sub.quiz.length > 0,
        })),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[useModuleDetail] Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchModuleDetail();
  }, [fetchModuleDetail]);

  return {
    modul,
    isLoading,
    error,
    refetch: fetchModuleDetail,
  };
};

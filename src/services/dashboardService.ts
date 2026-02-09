import { apiClient, ApiResponse } from "@/lib/apiClient";

export interface DashboardStats {
  total_modules: number;
  completed_modules: number;
  in_progress_modules: number;
  total_quiz_attempts: number;
  quiz_passed: number;
  average_score: number;
  total_points: number;
  current_streak: number;
}

export interface RecentActivity {
  id: string;
  type: 'quiz' | 'material' | 'module';
  title: string;
  module_title?: string;
  score?: number;
  passed?: boolean;
  created_at: string;
}

export interface ModuleProgressSummary {
  module_id: string;
  module_title: string;
  total_sub_materis: number;
  completed_sub_materis: number;
  progress_percent: number;
  total_quizzes: number;
  passed_quizzes: number;
  last_accessed?: string;
}

export class DashboardService {
  /**
   * Get dashboard statistics
   */
  static async getStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      return await apiClient.get<DashboardStats>('/users/me/stats', {
        auth: true,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get recent activity
   */
  static async getRecentActivity(): Promise<ApiResponse<RecentActivity[]>> {
    try {
      return await apiClient.get<RecentActivity[]>('/users/me/recent-activity', {
        auth: true,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get all module progress summary
   */
  static async getAllModuleProgress(): Promise<ApiResponse<ModuleProgressSummary[]>> {
    try {
      return await apiClient.get<ModuleProgressSummary[]>('/users/me/module-progress', {
        auth: true,
      });
    } catch (err) {
      throw err;
    }
  }
}

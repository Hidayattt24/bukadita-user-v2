import { apiClient, ApiResponse } from "@/lib/apiClient";

// Types untuk User Notes
export interface UserNote {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  category?: string;
  is_pinned?: boolean;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  category?: string;
  is_pinned?: boolean;
}

export interface NotesResponse {
  items: UserNote[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class NoteService {
  /**
   * Get all user notes with pagination and filters
   */
  static async getUserNotes(
    page: number = 1,
    limit: number = 10,
    category?: string,
    search?: string
  ): Promise<ApiResponse<NotesResponse>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (category && category !== "all") {
        params.append("category", category);
      }

      if (search) {
        params.append("search", search);
      }

      return await apiClient.get<NotesResponse>(`/notes?${params.toString()}`, {
        auth: true,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get single note by ID
   */
  static async getNoteById(noteId: string): Promise<ApiResponse<UserNote>> {
    try {
      return await apiClient.get<UserNote>(`/notes/${noteId}`, {
        auth: true,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new note
   */
  static async createNote(
    data: CreateNoteRequest
  ): Promise<ApiResponse<UserNote>> {
    try {
      return await apiClient.post<UserNote>("/notes", data, {
        auth: true,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update note
   */
  static async updateNote(
    noteId: string,
    data: UpdateNoteRequest
  ): Promise<ApiResponse<UserNote>> {
    try {
      return await apiClient.put<UserNote>(`/notes/${noteId}`, data, {
        auth: true,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete note
   */
  static async deleteNote(noteId: string): Promise<ApiResponse<null>> {
    try {
      return await apiClient.delete<null>(`/notes/${noteId}`, {
        auth: true,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Toggle pin status
   */
  static async togglePinNote(noteId: string): Promise<ApiResponse<UserNote>> {
    try {
      return await apiClient.patch<UserNote>(`/notes/${noteId}/pin`, {}, {
        auth: true,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user note categories
   */
  static async getUserNoteCategories(): Promise<ApiResponse<string[]>> {
    try {
      return await apiClient.get<string[]>("/notes/categories", {
        auth: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

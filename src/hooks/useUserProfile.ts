import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '@/services/userProfileService';
import { useAuth } from '@/context/AuthContext';

// Query keys
export const profileKeys = {
  all: ['profile'] as const,
  detail: () => [...profileKeys.all, 'detail'] as const,
  stats: () => [...profileKeys.all, 'stats'] as const,
};

/**
 * Hook untuk fetch user profile
 */
export function useUserProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: async () => {
      const response = await ProfileService.getUserProfile();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook untuk update user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateProfileWithNew } = useAuth();

  return useMutation({
    mutationFn: async (data: {
      full_name?: string;
      phone?: string;
      address?: string;
      date_of_birth?: string;
      profil_url?: string;
    }) => {
      const response = await ProfileService.updateProfile(data);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      // Update cache
      queryClient.setQueryData(profileKeys.detail(), data);
      
      // Update auth context
      updateProfileWithNew(data);
    },
  });
}

/**
 * Hook untuk upload profile picture
 */
export function useUploadProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const response = await ProfileService.uploadProfilePicture(file);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidate profile to refetch with new picture
      queryClient.invalidateQueries({ queryKey: profileKeys.detail() });
    },
  });
}

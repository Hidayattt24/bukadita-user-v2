import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui';
import { showSuccessToast } from '@/utils/sweetalert';

export function useSettingsState() {
  const router = useRouter();
  const authCtx = useAuth();
  const { user, logout, isLoading, profilePending, upsertProfile } = authCtx;
  const toast = useToast();

  // Profile state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    joinDate: '',
    role: '',
    backendLoaded: false,
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // UI state
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [editMode, setEditMode] = useState({
    profile: false,
    password: false,
    completeProfile: false,
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [savingCompletion, setSavingCompletion] = useState(false);
  const [completionError, setCompletionError] = useState<string | null>(null);
  const [completionSuccess, setCompletionSuccess] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Initialize profile data when user data is available
  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        name: user.profile?.full_name || user.email || '',
        email: user.email || '',
        phone: user.profile?.phone || '',
        address: user.profile?.address || '',
        birthDate: user.profile?.date_of_birth || '',
      }));
    }
  }, [
    user?.id,
    user?.email,
    user?.profile?.full_name,
    user?.profile?.phone,
    user?.profile?.address,
    user?.profile?.date_of_birth,
  ]);

  // Load full profile on mount
  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      if (user && authCtx.loadFullProfile) {
        const needsFullProfile =
          !user.profile?.address || !user.profile?.date_of_birth;

        if (needsFullProfile && mounted) {
          console.log('[useSettingsState] Loading full profile...');
          try {
            await authCtx.loadFullProfile();
          } catch (error) {
            console.error('[useSettingsState] Error loading profile:', error);
          }
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Handlers
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('File harus berupa gambar');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfilePhoto = async () => {
    if (!selectedFile) {
      toast.warning('Pilih foto terlebih dahulu');
      return;
    }

    console.log('📸 File to upload:', {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      lastModified: selectedFile.lastModified,
    });

    if (selectedFile.size === 0) {
      toast.error('File kosong atau tidak valid');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      toast.error('File harus berupa gambar');
      return;
    }

    try {
      setUploadingPhoto(true);
      toast.info('Mengupload foto profil... 📤');

      const { ProfileService } = await import('@/services/userProfileService');

      console.log('🚀 Starting photo upload...');
      const response = await ProfileService.uploadProfilePhoto(selectedFile);
      console.log('📝 Upload response:', response);
      console.log('🔗 Photo URL from backend:', response.data?.photo_url);

      if (response.data && !response.error) {
        toast.success('✅ Foto profil berhasil diupload!');
        setSelectedFile(null);
        setSelectedImage(null);

        if (authCtx.loadFullProfile) {
          await authCtx.loadFullProfile();
        }
      } else {
        if (response.code === 'FILE_MISSING') {
          toast.error('❌ File tidak ditemukan');
        } else if (response.code === 'PROFILE_NOT_FOUND') {
          toast.error('❌ Profil tidak ditemukan');
        } else if (response.message?.includes('size')) {
          toast.error('❌ Ukuran file terlalu besar (max 5MB)');
        } else {
          toast.error(response.message || '❌ Gagal upload foto');
        }
      }
    } catch (error: any) {
      console.error('Error uploading photo:', error);

      if (
        error.message?.includes('fetch') ||
        error.message?.includes('network')
      ) {
        toast.error('❌ Koneksi gagal. Periksa internet Anda.');
      } else if (error.message?.includes('size')) {
        toast.error('❌ File terlalu besar');
      } else {
        toast.error('❌ Gagal upload foto. Silakan coba lagi.');
      }
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profileData.name?.trim()) {
      toast.warning('Nama wajib diisi');
      return;
    }
    try {
      const result = await upsertProfile({
        full_name: profileData.name.trim(),
        phone: profileData.phone || undefined,
        address: profileData.address || undefined,
        date_of_birth: profileData.birthDate || undefined,
      });
      if (result.success) {
        setEditMode({ ...editMode, profile: false });
        toast.success('Profil berhasil diperbarui');
      } else {
        toast.error(result.error || 'Gagal memperbarui profil');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Gagal menyimpan profil. Silakan coba lagi.');
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!passwordData.currentPassword) {
        toast.warning('Password saat ini wajib diisi!');
        return;
      }

      if (!passwordData.newPassword) {
        toast.warning('Password baru wajib diisi!');
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.warning('Password baru dan konfirmasi password tidak cocok!');
        return;
      }

      if (passwordData.newPassword.length < 6) {
        toast.warning('Password baru minimal 6 karakter!');
        return;
      }

      const { ProfileService } = await import('@/services/userProfileService');

      toast.info('Mengubah password...');

      const response = await ProfileService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (!response.error) {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setEditMode({ ...editMode, password: false });

        toast.success('Password berhasil diubah! ✅');
      } else {
        if (response.code === 'INVALID_CURRENT_PASSWORD') {
          toast.error('❌ Password saat ini salah!');
        } else if (response.message?.includes('password')) {
          toast.error(response.message);
        } else {
          toast.error('Gagal mengubah password. Silakan coba lagi.');
        }
      }
    } catch (error: any) {
      console.error('Error changing password:', error);

      if (
        error.message?.includes('fetch') ||
        error.message?.includes('network')
      ) {
        toast.error('❌ Koneksi gagal. Periksa internet Anda.');
      } else if (error.message?.includes('password')) {
        toast.error(error.message);
      } else {
        toast.error('❌ Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
    showSuccessToast('Berhasil logout!');
    router.push('/');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    // TODO: Implement delete account logic
  };

  return {
    // Auth state
    user,
    isLoading,
    profilePending,
    upsertProfile,

    // Profile state
    profileData,
    setProfileData,

    // Password state
    passwordData,
    setPasswordData,

    // UI state
    showPasswords,
    setShowPasswords,
    editMode,
    setEditMode,
    activeTab,
    setActiveTab,
    selectedImage,
    setSelectedImage,
    savingCompletion,
    setSavingCompletion,
    completionError,
    setCompletionError,
    completionSuccess,
    setCompletionSuccess,
    showLogoutModal,
    setShowLogoutModal,
    showDeleteModal,
    setShowDeleteModal,
    showDropdown,
    setShowDropdown,
    selectedFile,
    uploadingPhoto,

    // Handlers
    handleImageUpload,
    handleSaveProfilePhoto,
    handleSaveProfile,
    handleChangePassword,
    handleLogout,
    handleDeleteAccount,
  };
}

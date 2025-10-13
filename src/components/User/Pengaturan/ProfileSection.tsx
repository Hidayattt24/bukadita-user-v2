import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  Camera,
  UserIcon,
  Save,
  Edit3,
  Upload,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  joinDate: string;
  role: string;
  backendLoaded: boolean;
}

interface EditMode {
  profile: boolean;
  password: boolean;
  completeProfile: boolean;
}

interface User {
  email?: string;
  profile?: {
    full_name?: string;
    phone?: string | null;
    address?: string | null;
    date_of_birth?: string | null;
    profil_url?: string | null;
    role?: string | null;
  };
}

interface ProfileSectionProps {
  user: User;
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  editMode: EditMode;
  setEditMode: (mode: EditMode) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveProfile: () => Promise<void>;
  handleSaveProfilePhoto: () => Promise<void>;
  selectedFile: File | null;
  uploadingPhoto: boolean;
  profilePending: boolean;
  upsertProfile: (data: {
    full_name: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  savingCompletion: boolean;
  setSavingCompletion: (saving: boolean) => void;
  completionError: string | null;
  setCompletionError: (error: string | null) => void;
  completionSuccess: string | null;
  setCompletionSuccess: (success: string | null) => void;
}

export default function ProfileSection({
  user,
  profileData,
  setProfileData,
  editMode,
  setEditMode,
  selectedImage,
  setSelectedImage,
  handleImageUpload,
  handleSaveProfile,
  handleSaveProfilePhoto,
  selectedFile,
  uploadingPhoto,
  profilePending,
  upsertProfile,
  savingCompletion,
  setSavingCompletion,
  completionError,
  setCompletionError,
  completionSuccess,
  setCompletionSuccess,
}: ProfileSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Debug URL foto profil
  useEffect(() => {
    console.log("🔍 ProfileSection Debug:", {
      "user.profile.profil_url": user?.profile?.profil_url,
      "selectedImage": selectedImage,
      "final_src": selectedImage || user?.profile?.profil_url || "/dummy/dummy-fotoprofil.png"
    });
  }, [user?.profile?.profil_url, selectedImage]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {profilePending && (
        <div className="bg-orange-50 border border-orange-200 text-orange-800 text-sm rounded-xl p-4">
          <p className="font-semibold mb-1">Profil Anda belum lengkap</p>
          <p>
            Lengkapi nama lengkap (dan opsional nomor telepon) untuk melanjutkan
            penggunaan penuh.
          </p>
        </div>
      )}

      {/* Profile Picture Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
        <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-6 flex items-center gap-3">
          <Camera className="w-6 h-6 text-[#578FCA]" />
          Foto Profil
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-[#578FCA]/20 shadow-xl">
              <Image
                src={selectedImage || user?.profile?.profil_url || "/dummy/dummy-fotoprofil.png"}
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("🖼️ Image load error:", {
                    src: e.currentTarget.src,
                    profileUrl: user?.profile?.profil_url,
                    selectedImage,
                  });
                }}
                onLoad={() => {
                  console.log("✅ Image loaded successfully with signed URL!");
                }}
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#27548A] mb-2">
              {user?.profile?.full_name || user?.email || "User"}
            </h3>
            <p className="text-[#578FCA]/70 mb-4 text-sm">
              {profileData.joinDate && (
                <>
                  Bergabung sejak{" "}
                  {new Date(profileData.joinDate).toLocaleDateString("id-ID")}
                </>
              )}
              {!profileData.joinDate && "Profil akun Anda"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-4 sm:px-4 py-3 sm:py-2 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base min-h-[44px]"
              >
                <Upload className="w-4 h-4 sm:w-4 sm:h-4" />
                Upload Foto
              </button>
              {selectedImage && selectedFile && (
                <>
                  <button
                    onClick={handleSaveProfilePhoto}
                    disabled={uploadingPhoto}
                    className="flex items-center justify-center gap-2 px-4 sm:px-4 py-3 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingPhoto ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 sm:w-4 sm:h-4" />
                        Simpan Foto
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                    }}
                    className="flex items-center justify-center gap-2 px-4 sm:px-4 py-3 sm:py-2 bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base min-h-[44px]"
                  >
                    <Trash2 className="w-4 h-4 sm:w-4 sm:h-4" />
                    Batal
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Profile Information / Completion Card */}
      {!profilePending && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] flex items-center gap-3">
              <UserIcon className="w-6 h-6 text-[#578FCA]" />
              Informasi Profil
            </h2>
            <button
              onClick={() => {
                if (editMode.profile) {
                  handleSaveProfile();
                } else {
                  setEditMode({ ...editMode, profile: true });
                }
              }}
              className={`flex items-center gap-2 px-4 sm:px-4 py-3 sm:py-2 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base min-h-[44px] ${editMode.profile
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white hover:shadow-lg"
                }`}
            >
              {editMode.profile ? (
                <Save className="w-4 h-4 sm:w-4 sm:h-4" />
              ) : (
                <Edit3 className="w-4 h-4 sm:w-4 sm:h-4" />
              )}
              {editMode.profile ? "Simpan" : "Edit"}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#27548A] mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  disabled={!editMode.profile}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${editMode.profile
                    ? "border-[#578FCA]/30 focus:border-[#27548A] bg-white"
                    : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#27548A] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  disabled={!editMode.profile}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${editMode.profile
                    ? "border-[#578FCA]/30 focus:border-[#27548A] bg-white"
                    : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#27548A] mb-2">
                Nomor Telepon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  disabled={!editMode.profile}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${editMode.profile
                    ? "border-[#578FCA]/30 focus:border-[#27548A] bg-white"
                    : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#27548A] mb-2">
                Tanggal Lahir
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                <input
                  type="date"
                  value={profileData.birthDate}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      birthDate: e.target.value,
                    })
                  }
                  disabled={!editMode.profile}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${editMode.profile
                    ? "border-[#578FCA]/30 focus:border-[#27548A] bg-white"
                    : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#27548A] mb-2">
                Alamat
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#578FCA]/60" />
                <textarea
                  placeholder="Masukkan alamat lengkap Anda"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      address: e.target.value,
                    })
                  }
                  disabled={!editMode.profile}
                  rows={3}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-colors text-[#27548A] resize-none ${editMode.profile
                    ? "border-[#578FCA]/30 focus:border-[#27548A] bg-white"
                    : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {profilePending && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
          <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-6 flex items-center gap-3">
            <UserIcon className="w-6 h-6 text-[#578FCA]" />
            Lengkapi Profil
          </h2>
          {completionError && (
            <p className="text-sm text-red-600 mb-3">{completionError}</p>
          )}
          {completionSuccess && (
            <p className="text-sm text-green-600 mb-3">{completionSuccess}</p>
          )}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setCompletionError(null);
              setCompletionSuccess(null);
              if (!profileData.name.trim()) {
                setCompletionError("Nama wajib diisi");
                return;
              }
              try {
                setSavingCompletion(true);
                const res = await upsertProfile({
                  full_name: profileData.name.trim(),
                  phone: profileData.phone || undefined,
                  address: profileData.address || undefined,
                  date_of_birth: profileData.birthDate || undefined,
                });
                if (res.success) {
                  setCompletionSuccess("Profil berhasil dilengkapi");
                  setTimeout(() => {
                    /* stay or navigate to beranda */
                  }, 600);
                } else {
                  setCompletionError(res.error || "Gagal menyimpan");
                }
              } catch {
                setCompletionError("Terjadi kesalahan tak terduga");
              } finally {
                setSavingCompletion(false);
              }
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-semibold text-[#27548A] mb-2">
                Nama Lengkap
              </label>
              <input
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#578FCA]/30 focus:border-[#578FCA]"
                placeholder="Nama lengkap Anda"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#27548A] mb-2">
                Nomor Telepon (opsional)
              </label>
              <input
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#578FCA]/30 focus:border-[#578FCA]"
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <button
              disabled={savingCompletion}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold text-sm hover:from-[#4e86c8] hover:to-[#234770] transition disabled:opacity-60"
            >
              {savingCompletion ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

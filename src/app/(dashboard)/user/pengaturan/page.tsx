"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Camera,
  Save,
  LogOut,
  Eye,
  EyeOff,
  Edit3,
  Check,
  Upload,
  Shield,
  Mail,
  Phone,
  Calendar,
  Bell,
  Palette,
  Download,
  Trash2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { UserNavbar, MobileBottomNavbar } from "@/components/User/Beranda";
import { useAuth } from "@/context/AuthContext";

export default function PengaturanPage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  // All hooks must be declared first before any conditional logic
  // Profile state - Initialize with user data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    joinDate: "",
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize profile data when user data is available
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.profile?.full_name || user.email || "",
        email: user.email || "",
        phone: user.profile?.phone || "",
        birthDate: "", // Add birthday to user profile if needed
        joinDate: new Date().toISOString().split('T')[0], // Default to today, should come from API
      });
    }
  }, [user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#578FCA]/20 border-t-[#27548A] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#27548A] font-semibold">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  // Return null if no user (will redirect)
  if (!user) {
    return null;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      // TODO: Implement API call to update profile
      console.log("Saving profile:", profileData);

      // For now, just update local state
      setEditMode({ ...editMode, profile: false });

      // Show success message (you can add toast notification here)
      alert("Profil berhasil disimpan!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Gagal menyimpan profil. Silakan coba lagi.");
    }
  };

  const handleChangePassword = async () => {
    try {
      // TODO: Implement API call to change password
      console.log("Changing password");

      // Validate passwords
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("Password baru dan konfirmasi password tidak cocok!");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        alert("Password baru minimal 6 karakter!");
        return;
      }

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setEditMode({ ...editMode, password: false });

      // Show success message
      alert("Password berhasil diubah!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Gagal mengubah password. Silakan coba lagi.");
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout from AuthContext
      logout();
      setShowLogoutModal(false);

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  const handleDeleteAccount = () => {
    // Delete account logic here
    setShowDeleteModal(false);
    // Redirect to login
  };

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "security", label: "Keamanan", icon: Shield },
    { id: "notifications", label: "Notifikasi", icon: Bell },
    { id: "preferences", label: "Preferensi", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90">
      {/* Navbar */}
      <UserNavbar activeMenu="pengaturan" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 pb-28 md:pb-8">
        {/* Header Card */}
        <div className="mb-8 sm:mb-10 md:mb-8">
          {/* Welcome Card Style Header */}
          <div
            className="relative overflow-hidden mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 group"
            style={{
              width: "min(1200px, 100%)",
              height: "auto",
              minHeight: "140px",
              borderRadius: "20px",
              background:
                "linear-gradient(95deg, #27548A -17.04%, #578FCA 147.01%)",
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>

            {/* Hover Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 p-4 sm:p-6 md:p-6 flex flex-col md:flex-row justify-center items-center min-h-[140px] sm:min-h-[160px] md:min-h-[160px]">
              {/* Left Content - Mobile Center, Desktop Left */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center justify-center md:justify-start text-center md:text-left max-w-lg md:max-w-none">
                {/* Icon - Mobile center, Desktop left */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 bg-white/20 rounded-full flex items-center justify-center mb-3 md:mb-0 md:mr-4 lg:mr-5 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 text-white" />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  {/* Title */}
                  <h1 className="text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-1 leading-tight">
                    Pengaturan Akun
                  </h1>

                  {/* Description */}
                  <p className="text-white/90 text-sm sm:text-base md:text-base opacity-90 leading-relaxed">
                    Kelola profil, keamanan, dan preferensi akun Anda dengan
                    mudah
                  </p>
                </div>
              </div>

              {/* Right Content - Desktop only decoration */}
              <div className="hidden md:flex flex-col justify-center items-center md:items-end">
                <div className="w-16 h-16 lg:w-18 lg:h-18 bg-white/10 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <div className="w-10 h-10 lg:w-11 lg:h-11 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown Navigation */}
          {/* Mobile Dropdown */}
          <div className="sm:hidden mb-8 mt-4 px-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#578FCA]/20">
              {/* Dropdown Button */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#578FCA]/5 transition-all duration-300 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    const currentTab = tabs.find((tab) => tab.id === activeTab);
                    const IconComponent = currentTab?.icon || User;
                    return (
                      <>
                        <div className="w-10 h-10 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-[#27548A]">
                            {currentTab?.label}
                          </p>
                          <p className="text-[#578FCA]/70 text-sm">
                            Pilih pengaturan
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                {showDropdown ? (
                  <ChevronUp className="w-5 h-5 text-[#578FCA]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#578FCA]" />
                )}
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="px-4 pb-4 space-y-2 animate-fade-in">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setShowDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-sm ${isActive
                            ? "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white shadow-lg"
                            : "text-[#27548A] hover:bg-[#578FCA]/10 bg-gray-50"
                          }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{tab.label}</span>
                        {isActive && <Check className="w-4 h-4 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation - Original Grid */}
          <div className="hidden sm:block bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-2 shadow-xl border border-[#578FCA]/20 max-w-4xl mx-auto mb-8  mt-4 px-2">
            <div className="grid grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-4 rounded-2xl font-semibold transition-all duration-300 text-sm ${activeTab === tab.id
                        ? "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white shadow-lg"
                        : "text-[#27548A] hover:bg-[#578FCA]/10"
                      }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          {activeTab === "profile" && (
            <div className="space-y-6 sm:space-y-8">
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
                        src={selectedImage || "/dummy/dummy-fotoprofil.png"}
                        alt="Profile"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
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
                    <p className="text-[#578FCA]/70 mb-4">
                      Bergabung sejak{" "}
                      {profileData.joinDate ? new Date(profileData.joinDate).toLocaleDateString("id-ID") : "Baru saja"}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 px-4 sm:px-4 py-3 sm:py-2 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base min-h-[44px]"
                      >
                        <Upload className="w-4 h-4 sm:w-4 sm:h-4" />
                        Upload Foto
                      </button>
                      {selectedImage && (
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="flex items-center justify-center gap-2 px-4 sm:px-4 py-3 sm:py-2 bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base min-h-[44px]"
                        >
                          <Trash2 className="w-4 h-4 sm:w-4 sm:h-4" />
                          Hapus
                        </button>
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

              {/* Profile Information Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] flex items-center gap-3">
                    <User className="w-6 h-6 text-[#578FCA]" />
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
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
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
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
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
                      Nomor Telepon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
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
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeTab === "security" && (
            <div className="space-y-6 sm:space-y-8">
              {/* Change Password Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] flex items-center gap-3">
                    <Lock className="w-6 h-6 text-[#578FCA]" />
                    Ubah Password
                  </h2>
                  <button
                    onClick={() => {
                      if (editMode.password) {
                        handleChangePassword();
                      } else {
                        setEditMode({ ...editMode, password: true });
                      }
                    }}
                    className={`flex items-center gap-2 px-4 sm:px-4 py-3 sm:py-2 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base min-h-[44px] ${editMode.password
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white hover:shadow-lg"
                      }`}
                  >
                    {editMode.password ? (
                      <Save className="w-4 h-4 sm:w-4 sm:h-4" />
                    ) : (
                      <Edit3 className="w-4 h-4 sm:w-4 sm:h-4" />
                    )}
                    {editMode.password ? "Simpan" : "Ubah"}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#27548A] mb-2">
                      Password Saat Ini
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        disabled={!editMode.password}
                        className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${editMode.password
                            ? "border-[#578FCA]/30 focus:border-[#27548A] bg-white"
                            : "border-gray-200 bg-gray-50"
                          } focus:outline-none`}
                        placeholder="Masukkan password saat ini"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            current: !showPasswords.current,
                          })
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#578FCA]/60"
                      >
                        {showPasswords.current ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#27548A] mb-2">
                      Password Baru
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        disabled={!editMode.password}
                        className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${editMode.password
                            ? "border-[#578FCA]/30 focus:border-[#27548A] bg-white"
                            : "border-gray-200 bg-gray-50"
                          } focus:outline-none`}
                        placeholder="Masukkan password baru"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            new: !showPasswords.new,
                          })
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#578FCA]/60"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#27548A] mb-2">
                      Konfirmasi Password Baru
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        disabled={!editMode.password}
                        className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${editMode.password
                            ? "border-[#578FCA]/30 focus:border-[#27548A] bg-white"
                            : "border-gray-200 bg-gray-50"
                          } focus:outline-none`}
                        placeholder="Konfirmasi password baru"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            confirm: !showPasswords.confirm,
                          })
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#578FCA]/60"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeTab === "notifications" && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-6 flex items-center gap-3">
                <Bell className="w-6 h-6 text-[#578FCA]" />
                Pengaturan Notifikasi
              </h2>

              <div className="space-y-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <h3 className="font-semibold text-[#27548A]">
                        {key === "email"
                          ? "Email"
                          : key === "push"
                            ? "Push Notification"
                            : "SMS"}
                      </h3>
                      <p className="text-sm text-[#578FCA]/70">
                        {key === "email"
                          ? "Terima notifikasi melalui email"
                          : key === "push"
                            ? "Terima notifikasi push"
                            : "Terima notifikasi SMS"}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({ ...notifications, [key]: !value })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-[#578FCA]" : "bg-gray-300"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? "translate-x-6" : "translate-x-1"
                          }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences Section */}
          {activeTab === "preferences" && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-6 flex items-center gap-3">
                <Palette className="w-6 h-6 text-[#578FCA]" />
                Preferensi
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-[#27548A] mb-4">
                    Ekspor Data
                  </h3>
                  <button className="flex items-center gap-2 px-4 sm:px-4 py-3 sm:py-2 bg-[#578FCA] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base min-h-[44px]">
                    <Download className="w-4 h-4 sm:w-4 sm:h-4" />
                    Unduh Data Saya
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout Section - Always Visible */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-4 flex items-center justify-center gap-3">
                <LogOut className="w-6 h-6 text-[#578FCA]" />
                Keluar dari Akun
              </h2>
              <p className="text-[#578FCA]/70 mb-6 text-sm sm:text-base">
                Anda akan keluar dari akun dan diarahkan kembali ke halaman
                login
              </p>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] text-sm sm:text-base"
              >
                <LogOut className="w-5 h-5" />
                Keluar dari Akun
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full">
            <div className="text-center">
              <LogOut className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#27548A] mb-2">
                Keluar dari Akun?
              </h3>
              <p className="text-[#578FCA]/70 mb-6">
                Apakah Anda yakin ingin keluar dari akun?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-3 sm:py-2 border border-gray-300 text-gray-600 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 text-sm sm:text-base min-h-[44px]"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 sm:py-2 bg-orange-500 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-orange-600 text-sm sm:text-base min-h-[44px]"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#27548A] mb-2">
                Hapus Akun Permanen?
              </h3>
              <p className="text-[#578FCA]/70 mb-6">
                Tindakan ini tidak dapat dibatalkan. Semua data Anda akan
                dihapus permanen.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 sm:py-2 border border-gray-300 text-gray-600 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 text-sm sm:text-base min-h-[44px]"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-3 sm:py-2 bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-red-600 text-sm sm:text-base min-h-[44px]"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavbar activeMenu="pengaturan" />
    </div>
  );
}

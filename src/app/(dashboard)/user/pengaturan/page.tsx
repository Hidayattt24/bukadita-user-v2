"use client";

import { UserNavbar, MobileBottomNavbar } from "@/components/layout";
import {
  SettingsHeader,
  SettingsNavigation,
  ProfileSection,
  SecuritySection,
  NotificationSection,
  LogoutSection,
  DeleteAccountModal,
  SettingsLoadingSkeleton,
} from "@/components/settings";
import { useSettingsState } from "@/hooks/useSettingsState";

export default function PengaturanPage() {
  const {
    user,
    isLoading,
    profilePending,
    upsertProfile,
    profileData,
    setProfileData,
    passwordData,
    setPasswordData,
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
    showDeleteModal,
    setShowDeleteModal,
    showDropdown,
    setShowDropdown,
    selectedFile,
    uploadingPhoto,
    handleImageUpload,
    handleSaveProfilePhoto,
    handleSaveProfile,
    handleChangePassword,
    handleDeleteAccount,
  } = useSettingsState();

  // Show loading skeleton while checking authentication
  if (isLoading) {
    return <SettingsLoadingSkeleton />;
  }

  // Return null if no user (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90 overflow-y-auto">
      <UserNavbar activeMenu="pengaturan" />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 pb-28 md:pb-8 overflow-y-auto">
        <SettingsHeader />

        <SettingsNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          profilePending={profilePending}
        />

        <div className="max-w-4xl mx-auto">
          {activeTab === "profile" && (
            <ProfileSection
              user={user}
              profileData={profileData}
              setProfileData={setProfileData}
              editMode={editMode}
              setEditMode={setEditMode}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              handleImageUpload={handleImageUpload}
              handleSaveProfile={handleSaveProfile}
              handleSaveProfilePhoto={handleSaveProfilePhoto}
              selectedFile={selectedFile}
              uploadingPhoto={uploadingPhoto}
              profilePending={profilePending}
              upsertProfile={upsertProfile}
              savingCompletion={savingCompletion}
              setSavingCompletion={setSavingCompletion}
              completionError={completionError}
              setCompletionError={setCompletionError}
              completionSuccess={completionSuccess}
              setCompletionSuccess={setCompletionSuccess}
            />
          )}

          {activeTab === "security" && (
            <SecuritySection
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              showPasswords={showPasswords}
              setShowPasswords={setShowPasswords}
              editMode={editMode}
              setEditMode={setEditMode}
              handleChangePassword={handleChangePassword}
            />
          )}

          {activeTab === "notifications" && <NotificationSection />}
        </div>

        <LogoutSection />

        <DeleteAccountModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
        />
      </main>

      <MobileBottomNavbar activeMenu="pengaturan" />
    </div>
  );
}

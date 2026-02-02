import { Lock, Save, Edit3, Eye, EyeOff } from "lucide-react";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ShowPasswords {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface EditMode {
  profile: boolean;
  password: boolean;
  completeProfile: boolean;
}

interface SecuritySectionProps {
  passwordData: PasswordData;
  setPasswordData: (data: PasswordData) => void;
  showPasswords: ShowPasswords;
  setShowPasswords: (passwords: ShowPasswords) => void;
  editMode: EditMode;
  setEditMode: (mode: EditMode) => void;
  handleChangePassword: () => Promise<void>;
}

export default function SecuritySection({
  passwordData,
  setPasswordData,
  showPasswords,
  setShowPasswords,
  editMode,
  setEditMode,
  handleChangePassword,
}: SecuritySectionProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Change Password Card */}
      <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white shadow-[3px_3px_0px_rgba(87,143,202,0.2)] hover:shadow-[4px_4px_0px_rgba(87,143,202,0.25)] transition-all duration-300">
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
            className={`flex items-center gap-2 px-4 sm:px-4 py-3 sm:py-2 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base min-h-[44px] ${
              editMode.password
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
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${
                  editMode.password
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
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${
                  editMode.password
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
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-colors text-[#27548A] ${
                  editMode.password
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
  );
}

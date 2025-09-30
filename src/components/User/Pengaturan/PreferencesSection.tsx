import { Palette, Download, LogOut, AlertTriangle } from "lucide-react";

interface PreferencesSectionProps {
  showLogoutModal: boolean;
  setShowLogoutModal: (show: boolean) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  handleLogout: () => void;
  handleDeleteAccount: () => void;
}

export default function PreferencesSection({
  showLogoutModal,
  setShowLogoutModal,
  showDeleteModal,
  setShowDeleteModal,
  handleLogout,
  handleDeleteAccount,
}: PreferencesSectionProps) {
  return (
    <>
      {/* Preferences Content */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
        <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-6 flex items-center gap-3">
          <Palette className="w-6 h-6 text-[#578FCA]" />
          Preferensi
        </h2>

        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-[#27548A] mb-4">Ekspor Data</h3>
            <button className="flex items-center gap-2 px-4 sm:px-4 py-3 sm:py-2 bg-[#578FCA] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base min-h-[44px]">
              <Download className="w-4 h-4 sm:w-4 sm:h-4" />
              Unduh Data Saya
            </button>
          </div>
        </div>
      </div>

      {/* Logout Section - Always Visible */}
      <div className="mt-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-4 flex items-center justify-center gap-3">
              <LogOut className="w-6 h-6 text-[#578FCA]" />
              Keluar dari Akun
            </h2>
            <p className="text-[#578FCA]/70 mb-6 text-sm sm:text-base">
              Anda akan keluar dari akun dan diarahkan kembali ke halaman login
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
    </>
  );
}

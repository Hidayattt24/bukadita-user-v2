'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { showSuccessToast } from '@/utils/sweetalert';

export default function LogoutSection() {
  const router = useRouter();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
    showSuccessToast('Berhasil logout!');
    router.push('/');
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
        <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white shadow-[3px_3px_0px_rgba(239,68,68,0.2)] hover:shadow-[4px_4px_0px_rgba(239,68,68,0.25)] transition-all duration-300">
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-white shadow-[4px_4px_0px_rgba(249,115,22,0.3)] animate-scale-in">
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
    </>
  );
}

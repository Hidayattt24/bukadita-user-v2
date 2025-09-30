import React from "react";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModulNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <HelpCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Modul tidak ditemukan
        </h2>
        <p className="text-gray-600 mb-6">
          Modul yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 bg-[#578FCA] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#27548A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Modul
        </button>
      </div>
    </div>
  );
}

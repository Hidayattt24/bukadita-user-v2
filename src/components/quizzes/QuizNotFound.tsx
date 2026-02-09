'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface QuizNotFoundProps {
  modulSlug: string;
}

export default function QuizNotFound({ modulSlug }: QuizNotFoundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <BookOpen className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
          Materi Tidak Ditemukan
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Materi yang Anda cari tidak ditemukan atau belum tersedia
        </p>
        <Link
          href={`/user/modul/${modulSlug}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          Kembali ke Modul
        </Link>
      </div>
    </div>
  );
}

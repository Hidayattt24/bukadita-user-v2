import React from "react";
import { BookOpen } from "lucide-react";

export default function ModulLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <p className="text-lg font-medium text-gray-600">Memuat modul...</p>
      </div>
    </div>
  );
}

"use client";

import { Play, Clock, Users, BookOpen } from "lucide-react";

interface ModulCardProps {
  title: string;
  description: string;
  duration: string;
  progress: number;
  category: string;
  variant?: "primary" | "secondary" | "tertiary";
}

export default function ModulCard({
  title,
  description,
  duration,
  progress,
  category,
  variant = "primary",
}: ModulCardProps) {
  const getGradient = () => {
    switch (variant) {
      case "primary":
        return "from-[#578FCA] to-[#27548A]";
      case "secondary":
        return "from-[#27548A] to-[#578FCA]";
      case "tertiary":
        return "from-[#578FCA]/90 to-[#27548A]/90";
      default:
        return "from-[#578FCA] to-[#27548A]";
    }
  };

  return (
    <div className="group bg-gradient-to-br from-slate-50/50 to-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <div
        className={`relative h-56 bg-gradient-to-br ${getGradient()} overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4K')] opacity-30"></div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Top Right Icon */}
        <div className="absolute top-4 right-4">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h4 className="font-bold text-[#27548A] text-lg leading-tight">
            {title}
          </h4>
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {description}
        </p>

        <button
          className={`w-full py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md mb-6 group/btn border ${
            progress === 100
              ? "bg-gradient-to-r from-green-100 to-emerald-50 text-green-700 border-green-200/50 hover:from-green-200 hover:to-emerald-100"
              : progress > 0
              ? "bg-gradient-to-r from-blue-100 to-indigo-50 text-blue-700 border-blue-200/50 hover:from-blue-200 hover:to-indigo-100"
              : "bg-gradient-to-r from-slate-100/80 to-slate-50/80 text-[#27548A] border-slate-200/50 hover:from-[#578FCA] hover:to-[#27548A] hover:text-white"
          }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <BookOpen className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span>
              {progress === 100
                ? "Selesai Dipelajari"
                : progress > 0
                ? "Lanjutkan Belajar"
                : "Ayo mulai belajar"}
            </span>
          </span>
        </button>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">
              Progress Pembelajaran
            </span>
            <span className="text-sm font-bold text-[#578FCA]">
              {progress}%
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#578FCA] to-[#27548A] h-3 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowUpRight } from "lucide-react";

import { User } from "@/context/AuthContext";

interface WelcomeHeroProps {
  user: User | null;
}

export default function WelcomeHero({ user }: WelcomeHeroProps) {
  return (
    <div
      className="relative overflow-hidden mb-6 sm:mb-8 mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 group"
      style={{
        width: "min(1200px, 100%)",
        height: "auto",
        minHeight: "180px",
        borderRadius: "20px",
        background: "linear-gradient(95deg, #27548A -17.04%, #578FCA 147.01%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>

      {/* Hover Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row justify-center md:justify-between items-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
        {/* Left Content - Mobile Optimized */}
        <div className="flex-1 flex flex-col justify-center mb-4 md:mb-0 text-left max-w-lg">
          <h1 className="text-white text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2">
            Selamat datang,
          </h1>
          <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
            {user?.profile?.full_name || user?.email || "User"}
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-base opacity-90 leading-relaxed">
            Semoga aktivitas belajarmu menyenangkan
          </p>
        </div>

        {/* Right Content - Mobile Optimized Button */}
        <div className="flex flex-col justify-center items-center md:items-end w-full md:w-auto mt-2 md:mt-0">
          <button
            className="group inline-flex px-4 items-center justify-center gap-3 text-[#27548A] font-semibold text-sm hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto max-w-[280px]"
            style={{
              width: "min(280px, 100%)",
              height: "48px",
              borderRadius: "12px",
              background: "#FFF",
            }}
          >
            <span className="text-sm sm:text-base">Mulai Belajar Sekarang</span>
            <div
              className="flex items-center justify-center bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0"
              style={{
                width: "26px",
                height: "26px",
              }}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

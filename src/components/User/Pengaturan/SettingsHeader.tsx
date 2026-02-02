import { Settings, Sparkles } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="mb-6 sm:mb-8">
      {/* Modern Header with Stroke Shadow */}
      <div
        className="relative overflow-hidden mx-auto rounded-2xl sm:rounded-3xl border-2 border-white shadow-[4px_4px_0px_#27548A] sm:shadow-[6px_6px_0px_#27548A] hover:shadow-[6px_6px_0px_#27548A] sm:hover:shadow-[8px_8px_0px_#27548A] transition-all duration-300 group"
        style={{
          width: "min(1200px, 100%)",
          minHeight: "140px",
          background: "linear-gradient(135deg, #27548A 0%, #578FCA 50%, #5B9BD5 100%)",
        }}
      >
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl translate-y-16 -translate-x-16 group-hover:translate-y-12 transition-transform duration-700"></div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Content */}
        <div className="relative z-10 p-5 sm:p-6 md:p-8 flex items-center min-h-[140px]">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left space-y-2">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-white/90 text-xs sm:text-sm font-medium">Pengaturan</span>
              </div>

              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Pengaturan Akun
              </h1>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
                Kelola profil, keamanan, dan preferensi akun Anda
              </p>
            </div>

            {/* Right Content - Icon */}
            <div className="hidden md:flex flex-col justify-center items-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/20">
                <Settings className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { UserIcon } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="mb-8 sm:mb-10 md:mb-8">
      {/* Welcome Card Style Header */}
      <div
        className="relative overflow-hidden mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 group"
        style={{
          width: "min(1200px, 100%)",
          height: "auto",
          minHeight: "140px",
          borderRadius: "20px",
          background:
            "linear-gradient(95deg, #27548A -17.04%, #578FCA 147.01%)",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>

        {/* Hover Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="absolute inset-0 p-4 sm:p-6 md:p-6 flex flex-col md:flex-row justify-center items-center min-h-[140px] sm:min-h-[160px] md:min-h-[160px]">
          {/* Left Content - Mobile Center, Desktop Left */}
          <div className="flex-1 flex flex-col md:flex-row md:items-center justify-center md:justify-start text-center md:text-left max-w-lg md:max-w-none">
            {/* Icon - Mobile center, Desktop left */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 bg-white/20 rounded-full flex items-center justify-center mb-3 md:mb-0 md:mr-4 lg:mr-5 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
              <UserIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 text-white" />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              {/* Title */}
              <h1 className="text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-1 leading-tight">
                Pengaturan Akun
              </h1>

              {/* Description */}
              <p className="text-white/90 text-sm sm:text-base md:text-base opacity-90 leading-relaxed">
                Kelola profil, keamanan, dan preferensi akun Anda dengan mudah
              </p>
            </div>
          </div>

          {/* Right Content - Desktop only decoration */}
          <div className="hidden md:flex flex-col justify-center items-center md:items-end">
            <div className="w-16 h-16 lg:w-18 lg:h-18 bg-white/10 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <div className="w-10 h-10 lg:w-11 lg:h-11 bg-white/20 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

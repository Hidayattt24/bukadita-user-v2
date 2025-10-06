"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

interface UserNavbarProps {
  activeMenu?: string;
}

export default function UserNavbar({
  activeMenu = "beranda",
}: UserNavbarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState<{
    greeting: string;
    date: string;
  }>({ greeting: "", date: "" });

  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLogoutMenu(false);
      }
    };

    if (showLogoutMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogoutMenu]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();

      // Determine greeting based on hour
      let greeting = "";
      if (hour >= 5 && hour < 12) {
        greeting = "Selamat pagi";
      } else if (hour >= 12 && hour < 15) {
        greeting = "Selamat siang";
      } else if (hour >= 15 && hour < 18) {
        greeting = "Selamat sore";
      } else {
        greeting = "Selamat malam";
      }

      // Format date in Indonesian
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const dayName = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();

      const formattedDate = `${dayName}, ${date} ${month} ${year}`;

      setCurrentTime({ greeting, date: formattedDate });
    };

    // Update immediately
    updateTime();

    // Update every minute
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <nav className="bg-gradient-to-r from-[#578FCA] to-[#27548A] shadow-xl px-4 md:px-6 py-4 md:py-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation Menu */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="relative">
            <Image
              src="/images/logo-putih.svg"
              alt="Posyandu Logo"
              width={140}
              height={45}
              className="h-9 md:h-10 lg:h-12 w-auto"
            />
          </div>

          {/* Enhanced Navigation Menu - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/user/beranda"
              className={`px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 ${
                activeMenu === "beranda"
                  ? "text-[#27548A] bg-white/95 shadow-lg"
                  : "text-white/90 hover:text-white hover:bg-white/20"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/user/modul"
              className={`px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 ${
                activeMenu === "modul"
                  ? "text-[#27548A] bg-white/95 shadow-lg"
                  : "text-white/90 hover:text-white hover:bg-white/20"
              }`}
            >
              Modul
            </Link>
            <Link
              href="/user/pengaturan"
              className={`px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 ${
                activeMenu === "pengaturan"
                  ? "text-[#27548A] bg-white/95 shadow-lg"
                  : "text-white/90 hover:text-white hover:bg-white/20"
              }`}
            >
              Pengaturan
            </Link>
          </div>
        </div>

        {/* Profile Section - Mobile Optimized */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {/* Mobile Time display - Show on mobile, hide on desktop */}
          <div className="md:hidden lg:hidden flex flex-col items-end mr-2">
            <span className="text-white text-xs font-medium">
              {currentTime.greeting}
            </span>
            <span className="text-white/80 text-xs">{currentTime.date}</span>
          </div>

          {/* Desktop Time display - Hidden on mobile */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-white text-sm font-medium">
              {currentTime.greeting}
            </span>
            <span className="text-white/80 text-xs">{currentTime.date}</span>
          </div>

          {/* Profile Card - Mobile First Design */}
          <div ref={menuRef} className="flex items-center relative">
            {/* Mobile: Just profile image, larger size, cleaner look */}
            <div className="md:hidden">
              <button
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                className="w-11 h-11 rounded-full overflow-hidden shadow-lg border-2 border-white/50 hover:border-white/70 transition-all duration-300 hover:scale-105 relative"
              >
                <Image
                  src="/dummy/dummy-fotoprofil.png"
                  alt="Foto Profil"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                  priority
                />
                {/* Active indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </button>
            </div>

            {/* Desktop: Full profile card */}
            <div className="hidden md:flex items-center space-x-3 bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-white/30 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <button
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/40 shadow-lg flex-shrink-0 hover:ring-white/60 transition-all duration-300 relative"
              >
                <Image
                  src="/dummy/dummy-fotoprofil.png"
                  alt={`Foto Profil ${user?.profile?.full_name || "User"}`}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  priority
                />
                {/* Active indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </button>
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
              >
                <span className="text-white font-bold text-base truncate max-w-[120px] lg:max-w-none">
                  {user?.profile?.full_name ||
                    user?.email?.split("@")[0] ||
                    "User"}
                </span>
                <span className="text-white/80 text-sm">Peserta Aktif</span>
              </div>
            </div>

            {/* Logout Dropdown Menu */}
            {showLogoutMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                {/* Profile Info Section */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/dummy/dummy-fotoprofil.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user?.profile?.full_name ||
                          user?.email?.split("@")[0] ||
                          "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Status */}
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Peserta Aktif</span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-b-2xl"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

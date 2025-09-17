"use client";

import Image from "next/image";
import Link from "next/link";

interface UserNavbarProps {
  activeMenu?: string;
}

export default function UserNavbar({
  activeMenu = "beranda",
}: UserNavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-[#578FCA] to-[#27548A] shadow-xl px-4 md:px-6 py-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation Menu */}
        <div className="flex items-center space-x-8">
          <div className="relative">
            <Image
              src="/images/logo-putih.svg"
              alt="Posyandu Logo"
              width={140}
              height={45}
              className="h-10 md:h-12 w-auto"
            />
          </div>

          {/* Enhanced Navigation Menu */}
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

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-white text-sm font-medium">Selamat pagi</span>
            <span className="text-white/80 text-xs">
              Selasa, 17 September 2025
            </span>
          </div>
          <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-white/30">
            <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-white/40 shadow-lg">
              <Image
                src="/dummy/dummy-fotoprofil.png"
                alt="Foto Profil Hidayat"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-white font-bold text-base">
                Hidayat Nur Hakim
              </span>
              <span className="text-white/80 text-sm">Peserta Aktif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-4 flex flex-col space-y-2">
        <Link
          href="/user/beranda"
          className={`px-6 py-3 rounded-full font-bold text-base text-center shadow-lg transition-all duration-300 ${
            activeMenu === "beranda"
              ? "text-[#27548A] bg-white/95"
              : "text-white/90 bg-white/10 hover:bg-white/20"
          }`}
        >
          Beranda
        </Link>
        <div className="flex space-x-2">
          <Link
            href="/user/modul"
            className={`flex-1 px-4 py-3 rounded-full font-semibold text-sm text-center transition-all duration-300 ${
              activeMenu === "modul"
                ? "text-[#27548A] bg-white/95"
                : "text-white/90 bg-white/10 hover:bg-white/20"
            }`}
          >
            Modul
          </Link>
          <Link
            href="/user/pengaturan"
            className={`flex-1 px-4 py-3 rounded-full font-semibold text-sm text-center transition-all duration-300 ${
              activeMenu === "pengaturan"
                ? "text-[#27548A] bg-white/95"
                : "text-white/90 bg-white/10 hover:bg-white/20"
            }`}
          >
            Pengaturan
          </Link>
        </div>
      </div>
    </nav>
  );
}

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function BerandaSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video safely when component mounts
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Ensure muted for autoplay policies
    el.muted = true;

    const tryPlay = () => {
      const p = el.play();
      if (p && typeof (p as Promise<void>).catch === "function") {
        (p as Promise<void>).catch((err: unknown) => {
          const name = (err as { name?: string } | undefined)?.name;
          // Ignore AbortError (occurs when element unmounts or source changes)
          if (name !== "AbortError") {
            console.warn("Video play() rejected:", err);
          }
        });
      }
    };

    // If metadata already loaded, try immediately; otherwise wait for canplay
    if (el.readyState >= 2) {
      tryPlay();
    } else {
      const onCanPlay = () => tryPlay();
      el.addEventListener("canplay", onCanPlay, { once: true });
    }

    // Pause on unmount to prevent play during removal
    return () => {
      try {
        el.pause();
      } catch { }
    };
  }, []);

  return (
    <section
      id="beranda"
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Dot Pattern Background */}
      <DotPattern
        className="absolute inset-0 h-full w-full text-blue-200/30"
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={0.8}
        glow={false}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#3674B5] font-inter leading-tight tracking-tight">
          Bukadita
          <br className="hidden sm:block" />
          <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-[#27548A] mt-2">
            Buku Kader Digital
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-8 sm:mb-10 lg:mb-12 text-base sm:text-lg lg:text-xl font-normal text-[#64748B] font-inter max-w-3xl mx-auto px-4 leading-relaxed">
          Solusi digital terdepan untuk memberdayakan kader posyandu dengan
          <span className="text-[#27548A] font-medium"> teknologi modern</span>,
          meningkatkan kualitas layanan kesehatan masyarakat melalui
          <span className="text-[#27548A] font-medium">
            {" "}
            sistem terintegrasi
          </span>
          yang efisien dan mudah digunakan.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-14 lg:mb-16 px-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-white font-medium transition-all duration-300 hover:opacity-80 hover:transform hover:scale-105 flex items-center justify-center gap-2 rounded-[20px] bg-[#27548A] min-w-[140px]"
          >
            Masuk
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#kontak"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-white font-medium transition-all duration-300 hover:opacity-80 hover:transform hover:scale-105 flex items-center justify-center gap-2 rounded-[20px] bg-[#578FCA] min-w-[140px]"
          >
            Hubungi Kami
            <PhoneCall className="w-4 h-4" />
          </Link>
        </div>

        {/* Video Section */}
        <div className="relative mx-auto max-w-[1168px] px-4">
          <div className="relative overflow-hidden w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-[343px] rounded-[12px] sm:rounded-[16px] lg:rounded-[20px]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls={false}
              muted
              loop
              autoPlay
              playsInline
            >
              <source src="/videos/bg-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Text Overlay - Right Aligned */}
            {/* <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-6 lg:pr-8">
              <div className="text-right">
                <h3 className="text-white text-right font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] font-medium leading-tight">
                  Lorem ipsum dolor sit amet,
                  <br className="hidden sm:block" />
                  <span className="block sm:inline">
                    {" "}
                    consectetur adipiscing elit
                  </span>
                </h3>
              </div>
            </div> */}
          </div>
        </div>

        {/* Partner Logos Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#27548A] font-inter tracking-tight">
              Didukung Oleh
            </h3>
          </div>

          {/* Infinite Scrolling Logo Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-[scroll_20s_linear_infinite] hover:[animation-play-state:paused]">
              {/* First set of logos */}
              <div className="flex items-center gap-8 sm:gap-12 lg:gap-16 px-4 shrink-0">
                {/* Logo Kesehatan */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-kesehatan.svg"
                    alt="Kementerian Kesehatan"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo Kampus Berdampak */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-kampus-berdampak.svg"
                    alt="Kampus Berdampak"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo USK */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-usk.svg"
                    alt="Universitas Syiah Kuala"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo Banda Aceh */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-banda-aceh.svg"
                    alt="Kota Banda Aceh"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo PK3KKN */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-pk3kkn.svg"
                    alt="PK3KKN"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo LPPM */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-lppm.svg"
                    alt="LPPM USK"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center gap-8 sm:gap-12 lg:gap-16 px-4 shrink-0">
                {/* Logo Kesehatan */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-kesehatan.svg"
                    alt="Kementerian Kesehatan"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo Kampus Berdampak */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-kampus-berdampak.svg"
                    alt="Kampus Berdampak"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo USK */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-usk.svg"
                    alt="Universitas Syiah Kuala"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo Banda Aceh */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-banda-aceh.svg"
                    alt="Kota Banda Aceh"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo PK3KKN */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-pk3kkn.svg"
                    alt="PK3KKN"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Logo LPPM */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <img
                    src="/images/logo-kampus/logo-lppm.svg"
                    alt="LPPM USK"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

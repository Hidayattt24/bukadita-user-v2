"use client";

import React from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Image from "next/image";

interface KaderMember {
  position: string;
  name: string;
  photo?: string;
}

export default function StrukturKaderSection() {
  const kaderData: KaderMember[] = [
    {
      position: "PEMBINA",
      name: "CUT YUSNAR, ST., MT",
      photo: "/dummy/dummy-fotoprofil.png",
    },
    {
      position: "KETUA POSYANDU",
      name: "SYARIFAH NADIRA",
      photo: "/dummy/dummy-fotoprofil.png",
    },
    {
      position: "SEKRETARIS",
      name: "ZULVIRA",
      photo: "/dummy/dummy-fotoprofil.png",
    },
    {
      position: "BENDAHARA",
      name: "SARIDAWATI",
      photo: "/dummy/dummy-fotoprofil.png",
    },
    {
      position: "ANGGOTA KADER",
      name: "MUTIAWATI",
      photo: "/dummy/dummy-fotoprofil.png",
    },
    {
      position: "ANGGOTA KADER",
      name: "MURSYIDAH",
      photo: "/dummy/dummy-fotoprofil.png",
    },
  ];

  const KaderCard = ({
    member,
    className = "",
    size = "default",
  }: {
    member: KaderMember;
    className?: string;
    size?: "default" | "large";
  }) => {
    const isLarge = size === "large";

    return (
      <div
        className={`group relative bg-gradient-to-br from-white via-white to-blue-50/30 rounded-3xl border border-gray-200/60 hover:border-[#578FCA]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/40 shadow-lg ${
          isLarge ? "p-8" : "p-6"
        } ${className}`}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#578FCA]/5 to-[#27548A]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative flex flex-col items-center text-center">
          {/* Photo with modern ring effect */}
          <div className="relative mb-4">
            <div
              className={`absolute inset-0 ${
                isLarge ? "w-24 h-24" : "w-20 h-20"
              } rounded-full bg-gradient-to-br from-[#578FCA] to-[#27548A] blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
            ></div>
            <div
              className={`relative ${
                isLarge ? "w-24 h-24" : "w-20 h-20"
              } rounded-full overflow-hidden ring-4 ring-white shadow-xl group-hover:ring-[#578FCA]/50 transition-all duration-500`}
            >
              <Image
                src={member.photo || "/dummy/dummy-fotoprofil.png"}
                alt={member.name}
                width={isLarge ? 96 : 80}
                height={isLarge ? 96 : 80}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Position badge with gradient */}
          <div
            className={`inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 ${
              isLarge ? "mb-3" : "mb-2"
            }`}
          >
            <h4
              className={`${
                isLarge ? "text-xs" : "text-[10px]"
              } font-bold uppercase tracking-wider`}
            >
              {member.position}
            </h4>
          </div>

          {/* Name with better typography */}
          <p
            className={`${
              isLarge ? "text-base" : "text-sm"
            } font-semibold text-gray-800 leading-tight group-hover:text-[#27548A] transition-colors duration-300`}
          >
            {member.name}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="struktur"
      className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-blue-50/30 overflow-hidden"
    >
      {/* Enhanced Background */}
      <DotPattern
        className="absolute inset-0 h-full w-full text-gray-200/40"
        width={28}
        height={28}
        cx={1}
        cy={1}
        cr={0.7}
        glow={false}
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Title Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
          <div className="mb-8">
            <h2 className="mb-6">
              <span className="text-[#27548A] font-poppins text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
                Struktur{" "}
              </span>
              <span className="text-[#27548A] font-poppins text-4xl sm:text-5xl md:text-6xl italic font-bold leading-tight bg-gradient-to-r from-[#578FCA] to-[#27548A] bg-clip-text text-transparent">
                Kader
              </span>
            </h2>

            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <p className="text-xl sm:text-2xl font-bold text-[#27548A]">
                STRUKTUR ORGANISASI POSYANDU
              </p>
              <p className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-[#578FCA] to-[#27548A] bg-clip-text text-transparent">
                SEULANGA INDAH
              </p>
              <p className="text-base text-gray-600 font-medium">
                GP. KOPELMA DARUSSALAM
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="relative p-8">
              {/* Level 1: Pembina */}
              <div className="relative z-10 flex justify-center">
                <KaderCard member={kaderData[0]} size="large" className="w-72" />
              </div>

              {/* Connecting line from Pembina to Ketua - longer and touching cards */}
              <div className="relative z-0 flex justify-center">
                <div className="w-1 h-24 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
              </div>

              {/* Level 2: Ketua Posyandu */}
              <div className="relative z-10 flex justify-center">
                <KaderCard member={kaderData[1]} size="large" className="w-72" />
              </div>

              {/* Connecting line from Ketua down - longer to reach horizontal line */}
              <div className="relative z-0 flex justify-center">
                <div className="w-1 h-20 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
              </div>

              {/* Level 3 with integrated connection lines */}
              <div className="relative z-10 max-w-5xl mx-auto">
                {/* Grid for subordinates cards */}
                <div className="grid grid-cols-4 gap-8">
                  {/* Column 1: Anggota Kader (Mutiawati) */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-1 h-16 bg-gradient-to-b from-[#27548A] to-[#578FCA] rounded-full"></div>
                    <KaderCard member={kaderData[4]} className="w-full" />
                  </div>

                  {/* Column 2: Sekretaris */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-1 h-16 bg-gradient-to-b from-[#27548A] to-[#578FCA] rounded-full"></div>
                    <KaderCard member={kaderData[2]} className="w-full" />
                  </div>

                  {/* Column 3: Bendahara */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-1 h-16 bg-gradient-to-b from-[#27548A] to-[#578FCA] rounded-full"></div>
                    <KaderCard member={kaderData[3]} className="w-full" />
                  </div>

                  {/* Column 4: Anggota Kader (Mursyidah) */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-1 h-16 bg-gradient-to-b from-[#27548A] to-[#578FCA] rounded-full"></div>
                    <KaderCard member={kaderData[5]} className="w-full" />
                  </div>
                </div>

                {/* Horizontal distribution line - positioned to connect all vertical lines */}
                <div className="absolute top-0 left-0 right-0 flex items-center">
                  <div className="w-full h-1 bg-gradient-to-r from-[#578FCA] via-[#27548A] to-[#578FCA] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="relative w-full max-w-sm mx-auto">
            <div className="relative p-4">
              {/* Level 1: Pembina */}
              <div className="relative z-10 flex justify-center">
                <KaderCard member={kaderData[0]} size="large" className="w-full max-w-xs" />
              </div>

              {/* Connecting line from Pembina to Ketua */}
              <div className="relative z-0 flex justify-center">
                <div className="w-1 h-16 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
              </div>

              {/* Level 2: Ketua Posyandu */}
              <div className="relative z-10 flex justify-center">
                <KaderCard member={kaderData[1]} size="large" className="w-full max-w-xs" />
              </div>

              {/* Connecting line from Ketua to horizontal separator */}
              <div className="relative z-0 flex justify-center">
                <div className="w-1 h-12 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
              </div>

              {/* Visual separator for equal hierarchy members */}
              <div className="relative z-0 flex justify-center py-2">
                <div className="relative w-56 h-1 bg-gradient-to-r from-[#578FCA] via-[#27548A] to-[#578FCA] rounded-full">
                  {/* Visual indicator that all below are same level */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#578FCA]"></div>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#578FCA]"></div>
                </div>
              </div>

              {/* Connecting line from separator to subordinates */}
              <div className="relative z-0 flex justify-center">
                <div className="w-1 h-8 bg-gradient-to-b from-[#27548A] to-[#578FCA] rounded-full"></div>
              </div>

              {/* Level 3: All subordinates (same level) */}
              <div className="relative z-10 space-y-4">
                {/* Anggota Kader 1 */}
                <div className="flex justify-center">
                  <KaderCard member={kaderData[4]} className="w-full max-w-xs" />
                </div>

                {/* Sekretaris */}
                <div className="flex justify-center">
                  <KaderCard member={kaderData[2]} className="w-full max-w-xs" />
                </div>

                {/* Bendahara */}
                <div className="flex justify-center">
                  <KaderCard member={kaderData[3]} className="w-full max-w-xs" />
                </div>

                {/* Anggota Kader 2 */}
                <div className="flex justify-center">
                  <KaderCard member={kaderData[5]} className="w-full max-w-xs" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

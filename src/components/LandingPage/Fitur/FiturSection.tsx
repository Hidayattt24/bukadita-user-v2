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
        className={`group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-[#578FCA] transition-all duration-300 hover:-translate-y-1 ${
          isLarge ? "p-8" : "p-6"
        } ${className}`}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={`relative ${
              isLarge ? "w-20 h-20 mb-4" : "w-16 h-16 mb-3"
            } rounded-full overflow-hidden border-3 border-[#578FCA]`}
          >
            <Image
              src={member.photo || "/dummy/dummy-fotoprofil.png"}
              alt={member.name}
              width={isLarge ? 80 : 64}
              height={isLarge ? 80 : 64}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className={`inline-block px-3 py-1 bg-[#578FCA] text-white rounded-full ${
              isLarge ? "mb-3" : "mb-2"
            }`}
          >
            <h4
              className={`${
                isLarge ? "text-xs" : "text-xs"
              } font-semibold uppercase tracking-wide`}
            >
              {member.position}
            </h4>
          </div>

          <p
            className={`${
              isLarge ? "text-base" : "text-sm"
            } font-medium text-gray-800 leading-tight`}
          >
            {member.name}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="struktur-kader"
      className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden"
    >
      {/* Dot Pattern Background */}
      <DotPattern
        className="absolute inset-0 h-full w-full text-gray-200/25"
        width={28}
        height={28}
        cx={1}
        cy={1}
        cr={0.7}
        glow={false}
      />

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Title Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
          <div className="mb-8">
            <h2 className="mb-6">
              <span className="text-[#27548A] font-poppins text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
                Struktur{" "}
              </span>
              <span className="text-[#27548A] font-poppins text-4xl sm:text-5xl md:text-6xl italic font-medium leading-tight">
                Kader
              </span>
            </h2>

            {/* Clean subtitle without shadow */}
            <div className="text-center space-y-1">
              <p className="text-xl font-bold text-[#27548A]">
                STRUKTUR ORGANISASI POSYANDU
              </p>
              <p className="text-lg font-semibold text-[#578FCA]">
                SEULANGA INDAH
              </p>
              <p className="text-base text-gray-600">GP. KOPELMA DARUSSALAM</p>
            </div>
          </div>
        </div>

        {/* Clean Organizational Chart */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative p-4 lg:p-8">
            {/* Level 1: Pembina */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <KaderCard
                  member={kaderData[0]}
                  size="large"
                  className="w-64"
                />
                {/* Simple connecting line */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-12 bg-[#578FCA]"></div>
                </div>
              </div>
            </div>

            {/* Level 2: Ketua Posyandu */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <KaderCard
                  member={kaderData[1]}
                  size="large"
                  className="w-64"
                />

                {/* Hierarchical connecting lines */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  {/* Garis vertikal utama yang menghubungkan ke garis horizontal */}
                  <div className="w-0.5 h-12 bg-[#578FCA]"></div>

                  {/* Main horizontal distribution line */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-80 h-0.5 bg-[#578FCA]"></div>

                  {/* Garis vertikal ke semua bawahan - harus terhubung ke atas kartu bawahan */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-x-40 w-0.5 h-28 bg-[#578FCA]"></div>
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-x-8 w-0.5 h-28 bg-[#578FCA]"></div>
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 translate-x-8 w-0.5 h-28 bg-[#578FCA]"></div>
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 translate-x-40 w-0.5 h-28 bg-[#578FCA]"></div>
                </div>
              </div>
            </div>

            {/* Level 3: All subordinates in one row */}
            <div className="flex justify-center items-center gap-12 lg:gap-16">
              <KaderCard member={kaderData[4]} className="w-52" />
              <KaderCard member={kaderData[2]} className="w-52" />
              <KaderCard member={kaderData[3]} className="w-52" />
              <KaderCard member={kaderData[5]} className="w-52" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

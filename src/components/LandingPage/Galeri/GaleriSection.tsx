import React from "react";
import Image from "next/image";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function GaleriSection() {
  const galleryItems = [
    {
      id: 1,
      title: "Dokumentasi Kegiatan Posyandu",
      description: "Kegiatan posyandu tanggal 12 September 2025",
      image:
        "/images/galeri/FOTO DOKUMENTASI KEGIATAS POSYANDU TGL 12 SEPT 2025 1.jpg",
      size: "large",
    },
    {
      id: 2,
      title: "Pelayanan Kesehatan Ibu dan Anak",
      description: "Pemeriksaan dan konsultasi kesehatan",
      image:
        "/images/galeri/FOTO DOKUMENTASI KEGIATAS POSYANDU TGL 12 SEPT 2025 6.jpg",
      size: "small",
    },
    {
      id: 3,
      title: "Penimbangan Balita",
      description: "Monitoring pertumbuhan anak",
      image:
        "/images/galeri/FOTO DOKUMENTASI KEGIATAS POSYANDU TGL 12 SEPT 2025 7.jpg",
      size: "small",
    },
    {
      id: 4,
      title: "Edukasi Kesehatan",
      description: "Penyuluhan gizi dan kesehatan",
      image:
        "/images/galeri/FOTO DOKUMENTASI KEGIATAS POSYANDU TGL 12 SEPT 2025 8.jpg",
      size: "small",
    },
    {
      id: 5,
      title: "Imunisasi Anak",
      description: "Program vaksinasi untuk balita",
      image:
        "/images/galeri/FOTO DOKUMENTASI KEGIATAS POSYANDU TGL 12 SEPT 2025 9.jpg",
      size: "small",
    },
    {
      id: 6,
      title: "Kader Posyandu Aktif",
      description: "Tim kader dalam melayani masyarakat",
      image:
        "/images/galeri/FOTO DOKUMENTASI KEGIATAS POSYANDU TGL 12 SEPT 2025 10.jpg",
      size: "small",
    },
  ];

  return (
    <section
      id="galeri"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section - Align Right */}
        <div className="mb-8 sm:mb-12 lg:mb-16 text-right">
          <h2 className="mb-4">
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal leading-tight">
              Galeri{" "}
            </span>
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] italic font-medium leading-tight">
              Posyandu
            </span>
            <br />
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal leading-tight">
              Kopelma
            </span>
          </h2>
        </div>

        {/* Responsive Bento Grid Layout */}
        <div className="flex flex-col gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* Mobile: Stack all images vertically */}
          <div className="block lg:hidden space-y-4">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold font-inter text-sm sm:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-inter text-xs sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Original bento layout */}
          <div className="hidden lg:flex lg:flex-col lg:gap-6">
            {/* First Row - Large image on left, 2 small images on right */}
            <div className="flex gap-6 justify-center">
              {/* Large Image */}
              <div className="relative w-[767px] h-[345px] flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={galleryItems[0].image}
                  alt={galleryItems[0].title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="767px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold font-inter text-xl mb-2">
                    {galleryItems[0].title}
                  </h3>
                  <p className="text-white/90 font-inter text-sm">
                    {galleryItems[0].description}
                  </p>
                </div>
              </div>

              {/* Two Small Images Stacked */}
              <div className="flex flex-col gap-6">
                <div className="relative w-[373px] h-[165px] flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer">
                  <Image
                    src={galleryItems[1].image}
                    alt={galleryItems[1].title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="373px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold font-inter text-sm mb-1">
                      {galleryItems[1].title}
                    </h3>
                    <p className="text-white/80 font-inter text-xs">
                      {galleryItems[1].description}
                    </p>
                  </div>
                </div>

                <div className="relative w-[373px] h-[165px] flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer">
                  <Image
                    src={galleryItems[2].image}
                    alt={galleryItems[2].title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="373px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold font-inter text-sm mb-1">
                      {galleryItems[2].title}
                    </h3>
                    <p className="text-white/80 font-inter text-xs">
                      {galleryItems[2].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - 3 equal-sized images */}
            <div className="flex gap-6 justify-center">
              <div className="relative w-[373px] h-[250px] flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={galleryItems[3].image}
                  alt={galleryItems[3].title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="373px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold font-inter text-base mb-1">
                    {galleryItems[3].title}
                  </h3>
                  <p className="text-white/80 font-inter text-sm">
                    {galleryItems[3].description}
                  </p>
                </div>
              </div>

              <div className="relative w-[373px] h-[250px] flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={galleryItems[4].image}
                  alt={galleryItems[4].title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="373px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold font-inter text-base mb-1">
                    {galleryItems[4].title}
                  </h3>
                  <p className="text-white/80 font-inter text-sm">
                    {galleryItems[4].description}
                  </p>
                </div>
              </div>

              <div className="relative w-[373px] h-[250px] flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={galleryItems[5].image}
                  alt={galleryItems[5].title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="373px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold font-inter text-base mb-1">
                    {galleryItems[5].title}
                  </h3>
                  <p className="text-white/80 font-inter text-sm">
                    {galleryItems[5].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

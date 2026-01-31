"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Navigation,
  Loader2,
  Building2,
  Hospital,
  Baby,
} from "lucide-react";
import dynamic from "next/dynamic";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { useToast } from "@/components/ui/toast";
import {
  fasilitasKesehatanData,
  type FasilitasKesehatan as FasilitasKesehatanType,
} from "@/data/fasilitasKesehatan";

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const useMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMap),
  { ssr: false }
);

export default function LokasiSection() {
  const toast = useToast();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    5.5577, 95.3222,
  ]); // Default: Banda Aceh
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use data from external file
  const fasilitasKesehatan = fasilitasKesehatanData;

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          setMapCenter([userPos.lat, userPos.lng]);
          setIsLoadingLocation(false);
          toast.success("Lokasi Anda berhasil terdeteksi", {
            description: "Peta telah dipusatkan ke lokasi Anda",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Tidak dapat mengakses lokasi Anda";
          let errorDescription = "Pastikan izin lokasi telah diaktifkan di browser";

          if (error.code === error.PERMISSION_DENIED) {
            errorDescription = "Anda menolak akses lokasi. Aktifkan izin lokasi di pengaturan browser";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorDescription = "Informasi lokasi tidak tersedia saat ini";
          } else if (error.code === error.TIMEOUT) {
            errorDescription = "Permintaan lokasi timeout. Coba lagi";
          }

          toast.error(errorMessage, {
            description: errorDescription,
            duration: 5000,
          });
          setIsLoadingLocation(false);
        }
      );
    } else {
      toast.error("Browser tidak mendukung", {
        description: "Geolocation tidak didukung oleh browser Anda",
        duration: 5000,
      });
      setIsLoadingLocation(false);
    }
  };

  const getTipeIcon = (tipe: string) => {
    const iconClass = "w-5 h-5";
    switch (tipe) {
      case "Dinas Kesehatan":
        return <Building2 className={iconClass} />;
      case "Puskesmas":
        return <Hospital className={iconClass} />;
      case "Rumah Sakit":
        return <Hospital className={iconClass} />;
      case "Rumah Sakit Khusus":
        return <Baby className={iconClass} />;
      default:
        return <Hospital className={iconClass} />;
    }
  };

  const getTipeColor = (tipe: string) => {
    switch (tipe) {
      case "Dinas Kesehatan":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Puskesmas":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rumah Sakit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Rumah Sakit Khusus":
        return "bg-pink-100 text-pink-800 border-pink-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const createCustomIcon = (tipe: string) => {
    if (typeof window === "undefined") return null;
    const L = require("leaflet");

    const getIconColor = (type: string) => {
      switch (type) {
        case "Dinas Kesehatan":
          return "#9333ea";
        case "Puskesmas":
          return "#16a34a";
        case "Rumah Sakit":
          return "#2563eb";
        case "Rumah Sakit Khusus":
          return "#ec4899";
        default:
          return "#6b7280";
      }
    };

    const getIconSvg = (type: string) => {
      switch (type) {
        case "Dinas Kesehatan":
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`;
        case "Rumah Sakit Khusus":
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>`;
        default:
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/></svg>`;
      }
    };

    const color = getIconColor(tipe);
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="transform: rotate(45deg);">
          ${getIconSvg(tipe)}
        </div>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-marker",
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });
  };

  const createUserIcon = () => {
    if (typeof window === "undefined") return null;
    const L = require("leaflet");

    const iconHtml = `
      <div style="
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3), 0 2px 10px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      "></div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "user-marker",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <section
      id="lokasi"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-blue-50/30 overflow-hidden"
    >
      {/* Dot Pattern Background */}
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
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full mb-6 shadow-xl">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h2 className="mb-6">
            <span className="text-[#27548A] font-poppins text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
              Fasilitas Kesehatan{" "}
            </span>
            <span className="text-[#27548A] font-poppins text-4xl sm:text-5xl md:text-6xl italic font-bold leading-tight bg-gradient-to-r from-[#578FCA] to-[#27548A] bg-clip-text text-transparent">
              Terdekat
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-poppins mb-8">
            Temukan lokasi dinas kesehatan, puskesmas, dan rumah sakit terdekat
            dari lokasi Anda dengan peta interaktif
          </p>

          {/* Get Location Button */}
          <button
            onClick={getUserLocation}
            disabled={isLoadingLocation}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingLocation ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Mengambil Lokasi...</span>
              </>
            ) : (
              <>
                <Navigation className="w-5 h-5" />
                <span>Deteksi Lokasi Saya</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Map */}
        {isClient && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "500px", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* User Location Marker */}
              {userLocation && (
                <Marker
                  position={[userLocation.lat, userLocation.lng]}
                  icon={createUserIcon()}
                >
                  <Popup>
                    <div className="text-center p-2">
                      <strong className="text-blue-600">Lokasi Anda</strong>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* Health Facility Markers */}
              {fasilitasKesehatan.map((fasilitas) => (
                <Marker
                  key={fasilitas.id}
                  position={[fasilitas.lat, fasilitas.lng]}
                  icon={createCustomIcon(fasilitas.tipe)}
                >
                  <Popup className="custom-popup" maxWidth={320}>
                    <div className="p-4 min-w-[280px]">
                      {/* Header with Icon & Badge */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-2 rounded-lg ${getTipeColor(fasilitas.tipe)} border`}>
                            {getTipeIcon(fasilitas.tipe)}
                          </div>
                          <div className="flex-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getTipeColor(fasilitas.tipe)} border`}>
                              {fasilitas.tipe}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-[#27548A] leading-tight">
                          {fasilitas.nama}
                        </h3>
                      </div>

                      {/* Info Grid */}
                      <div className="space-y-2.5 mb-4">
                        <div className="flex items-start gap-2.5">
                          <div className="flex-shrink-0 mt-0.5">
                            <MapPin className="w-4 h-4 text-[#578FCA]" />
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed flex-1">
                            {fasilitas.alamat}
                          </p>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="flex-shrink-0">
                            <Phone className="w-4 h-4 text-[#578FCA]" />
                          </div>
                          <a
                            href={`tel:${fasilitas.telepon.replace(/\D/g, "")}`}
                            className="text-xs text-gray-700 hover:text-[#578FCA] transition-colors"
                          >
                            {fasilitas.telepon}
                          </a>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="flex-shrink-0">
                            <Clock className="w-4 h-4 text-[#578FCA]" />
                          </div>
                          <span className="text-xs text-gray-700">
                            {fasilitas.jamOperasional}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <a
                        href={fasilitas.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Buka Google Maps
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#27548A] to-[#578FCA] rounded-2xl p-6 sm:p-8 text-white">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2 font-poppins">
                Catatan Penting
              </h4>
              <p className="text-blue-100 leading-relaxed">
                Informasi kontak dan jam operasional dapat berubah
                sewaktu-waktu. Disarankan untuk menghubungi fasilitas kesehatan
                terlebih dahulu sebelum berkunjung. Untuk keadaan darurat,
                segera hubungi nomor <strong>119</strong> (ambulans) atau{" "}
                <strong>112</strong> (emergency).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

export default function LokasiSection() {
  const fasilitasKesehatan = [
    {
      id: 1,
      nama: "Dinas Kesehatan Kota Banda Aceh",
      alamat:
        "Jl. Kulu II Suka Ramai, Blower, Sukaramai, Kecamatan Baiturrahman, Kota Banda Aceh, Aceh",
      telepon: "(0651) 23456",
      jamOperasional: "08:00 - 16:00 WIB",
      website: "dinkes.bandaacehkota.go.id",
      mapsLink: "https://maps.app.goo.gl/J9V3fvKpxLu5Lo6x7",
      tipe: "Dinas Kesehatan",
      jarak: "2.5 km dari Kopelma Darussalam",
      deskripsi:
        "Dinas Kesehatan Kota yang menaungi seluruh program kesehatan di Banda Aceh",
    },
    {
      id: 2,
      nama: "Puskesmas Kopelma Darussalam",
      alamat: "Jl. Kopelma Darussalam, Syiah Kuala, Kota Banda Aceh, Aceh",
      telepon: "(0651) 12345",
      jamOperasional: "24 Jam",
      website: "-",
      mapsLink: "https://maps.app.goo.gl/examplePuskesmas123",
      tipe: "Puskesmas",
      jarak: "0.5 km dari Kopelma Darussalam",
      deskripsi:
        "Puskesmas terdekat yang melayani wilayah Kopelma Darussalam dan sekitarnya",
    },
    {
      id: 3,
      nama: "RSUD dr. Zainoel Abidin",
      alamat:
        "Jl. Tgk. Daud Beureueh No.108, Kopelma Darussalam, Kota Banda Aceh, Aceh",
      telepon: "(0651) 34115",
      jamOperasional: "24 Jam",
      website: "rsudza.acehprov.go.id",
      mapsLink: "https://maps.app.goo.gl/exampleRSUD456",
      tipe: "Rumah Sakit",
      jarak: "1.2 km dari Kopelma Darussalam",
      deskripsi:
        "Rumah sakit rujukan utama Provinsi Aceh dengan fasilitas lengkap",
    },
    {
      id: 4,
      nama: "RS Ibu dan Anak Banda Aceh",
      alamat: "Jl. Ahmad Yani, Kota Baru, Kota Banda Aceh, Aceh",
      telepon: "(0651) 78910",
      jamOperasional: "24 Jam",
      website: "-",
      mapsLink: "https://maps.app.goo.gl/exampleRSIA789",
      tipe: "Rumah Sakit Khusus",
      jarak: "3.1 km dari Kopelma Darussalam",
      deskripsi: "Rumah sakit khusus untuk pelayanan ibu dan anak",
    },
  ];

  const getTipeIcon = (tipe: string) => {
    switch (tipe) {
      case "Dinas Kesehatan":
        return "🏛️";
      case "Puskesmas":
        return "🏥";
      case "Rumah Sakit":
        return "🏨";
      case "Rumah Sakit Khusus":
        return "👶";
      default:
        return "🏥";
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

  return (
    <section
      id="lokasi"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#27548A] rounded-full mb-6">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#27548A] mb-4 font-poppins">
            Fasilitas Kesehatan
            <span className="block text-[#578FCA] italic">Terdekat</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-poppins">
            Temukan lokasi dinas kesehatan, puskesmas, dan rumah sakit terdekat
            dari area Kopelma Darussalam untuk mendukung program posyandu Anda
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {fasilitasKesehatan.map((fasilitas) => (
            <div
              key={fasilitas.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Card Header */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {getTipeIcon(fasilitas.tipe)}
                    </span>
                    <div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTipeColor(
                          fasilitas.tipe
                        )}`}
                      >
                        {fasilitas.tipe}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-[#578FCA] font-medium">
                      📍 {fasilitas.jarak}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-3 font-poppins group-hover:text-[#578FCA] transition-colors">
                  {fasilitas.nama}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {fasilitas.deskripsi}
                </p>

                {/* Contact Information */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-[#578FCA] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {fasilitas.alamat}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#578FCA] flex-shrink-0" />
                    <p className="text-sm text-gray-600">{fasilitas.telepon}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-[#578FCA] flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      {fasilitas.jamOperasional}
                    </p>
                  </div>

                  {fasilitas.website && fasilitas.website !== "-" && (
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="w-4 h-4 text-[#578FCA] flex-shrink-0" />
                      <Link
                        href={`https://${fasilitas.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#578FCA] hover:text-[#27548A] hover:underline transition-colors"
                      >
                        {fasilitas.website}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={fasilitas.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#27548A] hover:bg-[#1e3f66] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                  >
                    <MapPin className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span>Lihat di Maps</span>
                  </Link>

                  <Link
                    href={`tel:${fasilitas.telepon.replace(/\D/g, "")}`}
                    className="flex-1 bg-white hover:bg-gray-50 text-[#27548A] border-2 border-[#27548A] px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                  >
                    <Phone className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span>Hubungi</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

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

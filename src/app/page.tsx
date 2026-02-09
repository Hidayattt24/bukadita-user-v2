import BerandaSection from "@/components/landing/Beranda/BerandaSection";
import StrukturKaderSection from "@/components/landing/Struktur/StrukturSection";
import { ILPSection } from "@/components/landing/ILP";
import GaleriSection from "@/components/landing/Galeri/GaleriSection";
import LokasiSection from "@/components/landing/Lokasi/LokasiSection";
import PertanyaanSection from "@/components/landing/Pertanyaan/PertanyaanSection";
import KontakSection from "@/components/landing/Kontak/KontakSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <BerandaSection />
      <StrukturKaderSection />
      <ILPSection />
      <GaleriSection />
      <LokasiSection />
      <PertanyaanSection />
      <KontakSection />
    </div>
  );
}

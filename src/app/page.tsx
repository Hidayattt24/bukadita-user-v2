import BerandaSection from "@/components/LandingPage/Beranda/BerandaSection";
import StrukturKaderSection from "@/components/LandingPage/Fitur/FiturSection";
import { ILPSection } from "@/components/LandingPage/ILP";
import GaleriSection from "@/components/LandingPage/Galeri/GaleriSection";
import PertanyaanSection from "@/components/LandingPage/Pertanyaan/PertanyaanSection";
import KontakSection from "@/components/LandingPage/Kontak/KontakSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <BerandaSection />
      <StrukturKaderSection />
      <ILPSection />
      <GaleriSection />
      <PertanyaanSection />
      <KontakSection />
    </div>
  );
}

import { BookOpen } from "lucide-react";
import { ModulData } from "@/data/modulData";
import Link from "next/link";
import ProgressModuleCard from "./ProgressModuleCard";

interface ProgressLearningProps {
  accessedModuls: ModulData[];
}

export default function ProgressLearningSection({
  accessedModuls,
}: ProgressLearningProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-1 sm:mb-2">
          Progress Pembelajaran Lainnya
        </h3>
        <p className="text-slate-600 text-sm">
          Lihat progress dari modul pembelajaran lain yang pernah kamu ikuti
        </p>
      </div>

      {accessedModuls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {accessedModuls.map((modul: ModulData) => (
            <ProgressModuleCard
              key={modul.id}
              id={modul.id}
              slug={modul.slug}
              title={modul.title}
              description={modul.description}
              duration={modul.duration}
              lessons={modul.lessons}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h4 className="text-gray-600 font-semibold mb-2">
            Belum Ada Modul yang Dibuka
          </h4>
          <p className="text-gray-500 text-sm mb-6">
            Mulai belajar dengan memilih modul yang tersedia
          </p>
          <Link href="/user/modul">
            <button className="bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              Jelajahi Modul
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

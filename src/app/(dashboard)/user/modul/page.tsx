"use client";

import React from "react";
import { UserNavbar, MobileBottomNavbar } from "@/components/User/Beranda";
import { ModulListStatic } from "@/components/User/Modul";

export default function ModulPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90">
      {/* Navbar */}
      <UserNavbar activeMenu="modul" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12 pb-28 md:pb-8">
        {/* Module List Component - Static Data */}
        <ModulListStatic
          showHeader={true}
          showSearch={true}
          showFilter={true}
        />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavbar activeMenu="modul" />
    </div>
  );
}

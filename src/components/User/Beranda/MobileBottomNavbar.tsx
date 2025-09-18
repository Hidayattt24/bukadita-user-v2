"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, BookOpen, Settings } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface MobileBottomNavbarProps {
  className?: string;
  activeMenu?: string;
}

const navItems: NavItem[] = [
  {
    id: "beranda",
    label: "Beranda",
    path: "/user/beranda",
    icon: <Home className="w-[20px] h-[20px]" />,
  },
  {
    id: "modul",
    label: "Modul",
    path: "/user/modul",
    icon: <BookOpen className="w-[20px] h-[20px]" />,
  },
  {
    id: "pengaturan",
    label: "Pengaturan",
    path: "/user/pengaturan",
    icon: <Settings className="w-[20px] h-[20px]" />,
  },
];

export default function MobileBottomNavbar({
  className,
  activeMenu,
}: MobileBottomNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Auto-detect active menu from pathname if not provided
  const getActiveMenu = () => {
    if (activeMenu) return activeMenu;

    if (pathname.includes("/user/beranda")) return "beranda";
    if (pathname.includes("/user/modul")) return "modul";
    if (pathname.includes("/user/pengaturan")) return "pengaturan";

    return "beranda"; // default
  };

  const currentActiveMenu = getActiveMenu();

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 md:hidden",
        className
      )}
    >
      <nav
        className="mx-auto max-w-[320px] bg-white/95 backdrop-blur-xl rounded-full shadow-2xl border border-white/30"
        style={{
          boxShadow:
            "0 20px 60px rgba(39, 84, 138, 0.15), 0 8px 24px rgba(87, 143, 202, 0.1)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {navItems.map((item) => {
            const isActive = currentActiveMenu === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={cn(
                  "relative flex flex-col items-center justify-center transition-all duration-500 ease-out group",
                  "w-[64px] h-[64px] rounded-full overflow-hidden",
                  isActive
                    ? "text-white transform scale-105 shadow-xl"
                    : "text-slate-500 hover:text-[#27548A] hover:bg-slate-100/80 hover:scale-105"
                )}
                style={{
                  transformOrigin: "center center",
                  background: isActive
                    ? "linear-gradient(135deg, #578FCA 0%, #27548A 100%)"
                    : "transparent",
                }}
              >
                {/* Icon container */}
                <div
                  className={cn(
                    "relative z-10 flex flex-col items-center transition-all duration-300",
                    isActive ? "transform scale-105" : "transform scale-100"
                  )}
                >
                  <div className="mb-1.5">{item.icon}</div>

                  <span
                    className={cn(
                      "text-[9px] font-medium leading-tight transition-all duration-300 text-center px-1",
                      isActive
                        ? "text-white opacity-100 transform translate-y-0"
                        : "text-slate-500 opacity-80 transform translate-y-0"
                    )}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Hover effect */}
                <div
                  className={cn(
                    "absolute inset-0 bg-slate-100 rounded-full transition-all duration-300 ease-out",
                    !isActive
                      ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                      : "opacity-0"
                  )}
                />

                {/* Active glow effect with brand blue color */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-25 scale-125 animate-pulse"
                    style={{
                      background:
                        "linear-gradient(135deg, #578FCA 0%, #27548A 100%)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

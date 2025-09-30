import {
  User as UserIcon,
  Shield,
  Bell,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface SettingsNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  profilePending: boolean;
}

export default function SettingsNavigation({
  activeTab,
  setActiveTab,
  showDropdown,
  setShowDropdown,
  profilePending,
}: SettingsNavigationProps) {
  const tabs: Tab[] = [
    {
      id: "profile",
      label: profilePending ? "Lengkapi Profil" : "Profil",
      icon: UserIcon,
    },
    { id: "security", label: "Keamanan", icon: Shield },
    { id: "notifications", label: "Notifikasi", icon: Bell },
  ];

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="sm:hidden mb-8 mt-4 px-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#578FCA]/20">
          {/* Dropdown Button */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#578FCA]/5 transition-all duration-300 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              {(() => {
                const currentTab = tabs.find((tab) => tab.id === activeTab);
                const IconComponent = currentTab?.icon || UserIcon;
                return (
                  <>
                    <div className="w-10 h-10 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-[#27548A]">
                        {currentTab?.label}
                      </p>
                      <p className="text-[#578FCA]/70 text-sm">
                        Pilih pengaturan
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
            {showDropdown ? (
              <ChevronUp className="w-5 h-5 text-[#578FCA]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#578FCA]" />
            )}
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="px-4 pb-4 space-y-2 animate-fade-in">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-sm ${
                      isActive
                        ? "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white shadow-lg"
                        : "text-[#27548A] hover:bg-[#578FCA]/10 bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                    {isActive && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation - Icon Centered */}
      <div className="hidden sm:block bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-2 shadow-xl border border-[#578FCA]/20 max-w-4xl mx-auto mb-8 mt-4">
        <div className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl font-semibold transition-all duration-300 text-sm ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white shadow-lg"
                    : "text-[#27548A] hover:bg-[#578FCA]/10"
                }`}
              >
                <IconComponent className="w-6 h-6" />
                <span className="text-center">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

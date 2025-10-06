"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
  label?: string;
}

export default function LoadingSpinner({
  size = "md",
  color = "primary",
  className = "",
  label,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    primary: "border-[#578FCA] border-t-transparent",
    secondary: "border-[#27548A] border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          border-2 rounded-full animate-spin
        `}
        aria-label="Loading"
      />
      {label && (
        <span className="text-sm text-gray-600 font-medium">{label}</span>
      )}
    </div>
  );
}

// Komponen LoadingButton untuk button dengan loading state
interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function LoadingButton({
  children,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
}: LoadingButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white hover:shadow-lg hover:scale-[1.02] focus:ring-[#578FCA]/50 disabled:opacity-60 disabled:cursor-not-allowed",
    secondary:
      "bg-white text-[#27548A] border-2 border-[#578FCA]/20 hover:bg-[#578FCA]/5 focus:ring-[#578FCA]/50 disabled:opacity-60 disabled:cursor-not-allowed",
    outline:
      "border-2 border-[#578FCA] text-[#578FCA] hover:bg-[#578FCA] hover:text-white focus:ring-[#578FCA]/50 disabled:opacity-60 disabled:cursor-not-allowed",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading && (
        <LoadingSpinner
          size="sm"
          color={variant === "primary" ? "white" : "primary"}
        />
      )}
      {children}
    </button>
  );
}

// Komponen LoadingCard untuk loading state dalam card
interface LoadingCardProps {
  className?: string;
  showAvatar?: boolean;
  lines?: number;
}

export function LoadingCard({
  className = "",
  showAvatar = false,
  lines = 3,
}: LoadingCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse ${className}`}
    >
      <div className="flex items-start gap-4">
        {showAvatar && (
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        )}
        <div className="flex-1 space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={`h-4 bg-gray-200 rounded ${
                index === lines - 1 ? "w-3/4" : "w-full"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Komponen LoadingDots untuk typing effect
export function LoadingDots({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="w-2 h-2 bg-[#578FCA] rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-[#578FCA] rounded-full animate-bounce animation-delay-200"></div>
      <div className="w-2 h-2 bg-[#578FCA] rounded-full animate-bounce animation-delay-400"></div>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}

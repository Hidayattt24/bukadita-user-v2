"use client";

import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-x-hidden overflow-y-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#578FCA]/10 rounded-full mix-blend-multiply filter blur-3xl animate-[blob_8s_infinite]"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-[#27548A]/10 rounded-full mix-blend-multiply filter blur-3xl animate-[blob_8s_infinite_2s]"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-violet-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-[blob_8s_infinite_4s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/20 to-indigo-100/20 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      {/* Geometric Decorations */}
      <div className="absolute top-16 left-16 w-6 h-6 bg-[#578FCA]/20 rounded-full animate-bounce pointer-events-none"></div>
      <div className="absolute top-32 right-32 w-4 h-4 bg-[#27548A]/30 rounded-[2px] rotate-45 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-24 left-24 w-8 h-8 bg-violet-400/20 rounded-full animate-bounce pointer-events-none"></div>
      <div className="absolute bottom-32 right-16 w-5 h-5 bg-blue-400/25 rounded-[2px] rotate-12 animate-pulse pointer-events-none"></div>

      {/* Main Content Container - Responsive height */}
      <div className="flex items-center justify-center min-h-[100dvh] md:min-h-screen p-4 sm:p-6">
        <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto my-auto">
          {/* Card Container */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/10 border border-white/30 overflow-hidden">
            {/* Inner content with compact padding */}
            <div className="p-6 sm:p-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

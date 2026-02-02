import React from "react";

export default function ModulLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
              <div className="flex-1 min-w-0">
                <div className="h-5 sm:h-6 w-48 sm:w-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Right: Materi Button */}
            <div className="w-24 sm:w-28 h-9 sm:h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
          </div>

          {/* Progress Bar Skeleton */}
          <div className="mt-3 sm:mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-slate-300 to-slate-400 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="flex flex-1 relative min-h-[calc(100vh-73px)]">
        <div className="flex-1">
          <div className="flex flex-col h-full bg-white rounded-none md:rounded-2xl shadow-none md:shadow-lg m-0 md:m-6 overflow-hidden">
            {/* Content Header Skeleton */}
            <div className="bg-gradient-to-r from-slate-300 to-slate-400 p-4 sm:p-6 md:p-8 animate-pulse">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-white/30 rounded"></div>
                  <div className="h-6 sm:h-7 w-64 sm:w-96 bg-white/30 rounded"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="h-5 w-24 bg-white/30 rounded"></div>
                <div className="h-8 w-20 bg-white/30 rounded-lg"></div>
              </div>
            </div>

            {/* Content Body Skeleton */}
            <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 space-y-4">
              {/* Video/Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl sm:rounded-2xl animate-pulse"></div>

              {/* Text Content */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-slate-200 rounded animate-pulse"></div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Navigation Footer Skeleton */}
            <div className="bg-white border-t border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="h-10 sm:h-12 w-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
                <div className="h-10 sm:h-12 w-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { BookOpen, Search, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import ModuleCard, { ModuleCardCompact } from './ModuleCard';
import { ModuleService, Module, PaginatedResponse } from '@/services/moduleService';
import { useAuth } from '@/context/AuthContext';
import { useApiFetch } from '@/hooks/useApiFetch';

interface ModuleListProps {
  viewMode?: 'grid' | 'list';
  showSearch?: boolean;
  showFilter?: boolean;
  compact?: boolean;
}

export default function ModuleList({
  viewMode = 'grid',
  showSearch = true,
  showFilter = true,
  compact = false
}: ModuleListProps) {
  const { isAuthenticated } = useAuth();

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'not-started' | 'in-progress' | 'completed'>('all');

  // API fetching using our new hooks
  const {
    data: modulesResponse,
    loading: modulesLoading,
    error: modulesError,
    refetch: refetchModules
  } = useApiFetch(() => ModuleService.getAllModules(), true); // Enable auto-fetch

  const {
    data: userProgressResponse,
    loading: progressLoading,
    error: progressError,
    refetch: refetchProgress
  } = useApiFetch(() => ModuleService.getUserModulesProgress(), false); // Don't auto-fetch

  // Extract modules from API response
  const modules = React.useMemo(() => {
    if (!modulesResponse?.data) return [];

    // Handle different response structures
    if (Array.isArray(modulesResponse.data)) {
      return modulesResponse.data;
    }

    if (typeof modulesResponse.data === 'object') {
      const paginatedData = modulesResponse.data as PaginatedResponse<Module>;

      if (paginatedData.items && Array.isArray(paginatedData.items)) {
        return paginatedData.items;
      }

      // Fallback: extract array from object
      const dataObject = (modulesResponse.data as unknown) as Record<string, unknown>;
      if (dataObject.modules && Array.isArray(dataObject.modules)) {
        return dataObject.modules as Module[];
      }

      const possibleArrays = Object.values(dataObject).filter(value => Array.isArray(value));
      if (possibleArrays.length > 0) {
        return possibleArrays[0] as Module[];
      }
    }

    return [];
  }, [modulesResponse]);

  // Extract user progress
  const userProgress = userProgressResponse?.data || null;

  // Fetch user progress when authenticated
  const prevAuthState = React.useRef(isAuthenticated);
  React.useEffect(() => {
    // Only fetch when auth state changes from false to true
    if (isAuthenticated && !prevAuthState.current) {
      refetchProgress();
    }
    prevAuthState.current = isAuthenticated;
  }, [isAuthenticated, refetchProgress]);

  // Combined loading state
  const loading = modulesLoading || (isAuthenticated && progressLoading);

  // Combined error state
  const error = modulesError || (isAuthenticated ? progressError : null);

  // Get progress for specific module
  const getModuleProgress = (moduleId: string) => {
    if (!userProgress || !Array.isArray(userProgress.modules)) return undefined;

    return userProgress.modules.find(m => m.id === moduleId)?.progress;
  };

  // Check if module is completed
  const isModuleCompleted = (moduleId: string) => {
    const progress = getModuleProgress(moduleId);
    return progress ? progress.percentage === 100 : false;
  };

  // Filter modules based on search and filter
  // Memastikan modules selalu array sebelum filter
  const filteredModules = Array.isArray(modules) ? modules.filter(module => {
    // Search filter
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    if (filterStatus === 'all') return matchesSearch;

    const progress = getModuleProgress(module.id);

    switch (filterStatus) {
      case 'not-started':
        return matchesSearch && (!progress || progress.percentage === 0);
      case 'in-progress':
        return matchesSearch && progress && progress.percentage > 0 && progress.percentage < 100;
      case 'completed':
        return matchesSearch && progress && progress.percentage === 100;
      default:
        return matchesSearch;
    }
  }) : [];

  // Retry handler
  const handleRetry = () => {
    refetchModules();
    if (isAuthenticated) {
      refetchProgress();
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
        </div>

        {/* Loading Cards */}
        <div className={`grid gap-6 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="ml-4 flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Gagal Memuat Modul
          </h3>
          <p className="text-gray-600 mb-6">{error?.message || 'Terjadi kesalahan saat memuat data'}</p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#578FCA] text-white rounded-xl font-semibold hover:bg-[#27548A] transition-colors duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-[#578FCA]" />
          <h2 className="text-2xl font-bold text-[#27548A]">
            Modul Pembelajaran
          </h2>
          {Array.isArray(modules) && modules.length > 0 && (
            <span className="px-3 py-1 bg-[#578FCA]/10 text-[#578FCA] text-sm font-medium rounded-full">
              {filteredModules.length} modul
            </span>
          )}
        </div>

        {showSearch && (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari modul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-300 min-w-[200px]"
              />
            </div>

            {/* Status Filter */}
            {showFilter && isAuthenticated && (
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'not-started' | 'in-progress' | 'completed')}
                  className="pl-10 pr-8 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-300 appearance-none bg-white"
                >
                  <option value="all">Semua Status</option>
                  <option value="not-started">Belum Dimulai</option>
                  <option value="in-progress">Sedang Berjalan</option>
                  <option value="completed">Selesai</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress Summary (for authenticated users) */}
      {isAuthenticated && userProgress && userProgress.overall_progress && (
        <div className="bg-gradient-to-r from-[#578FCA]/5 to-[#27548A]/5 rounded-2xl p-6 border border-[#578FCA]/10">
          <h3 className="text-lg font-semibold text-[#27548A] mb-3">
            Progress Pembelajaran Anda
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#578FCA]">
                {userProgress.overall_progress?.completed_modules || 0}
              </div>
              <div className="text-sm text-[#578FCA]/70">Modul Selesai</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#27548A]">
                {userProgress.overall_progress?.total_modules || 0}
              </div>
              <div className="text-sm text-[#578FCA]/70">Total Modul</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userProgress.overall_progress?.percentage?.toFixed(0) || 0}%
              </div>
              <div className="text-sm text-[#578FCA]/70">Kemajuan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Array.isArray(userProgress.modules) ? userProgress.modules.filter(m => m.progress?.percentage > 0 && m.progress?.percentage < 100).length : 0}
              </div>
              <div className="text-sm text-[#578FCA]/70">Sedang Berjalan</div>
            </div>
          </div>
        </div>
      )}

      {/* Modules Grid/List */}
      {filteredModules.length > 0 ? (
        <div className={`grid gap-6 ${compact
          ? 'grid-cols-1'
          : viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
          }`}>
          {filteredModules.map((module) => {
            const progress = getModuleProgress(module.id);
            const isCompleted = isModuleCompleted(module.id);

            return compact ? (
              <ModuleCardCompact
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                progress={progress}
                isCompleted={isCompleted}
              />
            ) : (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                progress={progress}
                isCompleted={isCompleted}
                estimatedTime="2-3 jam" // Could be from API if available
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm || filterStatus !== 'all' ? 'Tidak Ada Modul Ditemukan' : 'Belum Ada Modul Tersedia'}
          </h3>
          <p className="text-gray-500">
            {searchTerm || filterStatus !== 'all'
              ? 'Coba ubah kata kunci pencarian atau filter status'
              : 'Modul pembelajaran akan segera hadir'
            }
          </p>
          {(searchTerm || filterStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="mt-4 px-6 py-2 text-[#578FCA] border border-[#578FCA] rounded-xl hover:bg-[#578FCA] hover:text-white transition-colors duration-300"
            >
              Reset Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
"use client";

import React from "react";
import { useProgress } from "@/context/ProgressContext";
import { Trash2, Download, Upload } from "lucide-react";
import {
  showDeleteConfirm,
  showSuccessToast,
  showErrorToast,
  showLoading,
  closeAlert,
} from "@/utils/sweetalert";

export const ProgressDebugPanel: React.FC = () => {
  const { userProgress, resetAllProgress } = useProgress();

  const handleResetAll = async () => {
    const result = await showDeleteConfirm('semua progress belajar Anda', {
      title: 'Reset Semua Progress?',
      html: 'Semua progress belajar akan dihapus dan tidak dapat dikembalikan. Apakah Anda yakin?',
      confirmButtonText: 'Ya, Reset Semua',
    });

    if (result.isConfirmed) {
      showLoading('Mereset progress...', 'Mohon tunggu sebentar');

      setTimeout(() => {
        resetAllProgress();
        closeAlert();
        showSuccessToast('Semua progress telah direset!');

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, 1500);
    }
  };

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(userProgress, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bukadita-progress-${
        new Date().toISOString().split("T")[0]
      }.json`;
      link.click();
      URL.revokeObjectURL(url);
      showSuccessToast('Progress berhasil diekspor!');
    } catch (error) {
      showErrorToast('Gagal mengekspor progress!');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        localStorage.setItem("bukadita-module-progress", JSON.stringify(data));
        showSuccessToast('Progress berhasil diimport!');

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        showErrorToast('File tidak valid! Pastikan format JSON benar.');
      }
    };
    reader.readAsText(file);
  };

  const totalModules = userProgress.modules.length;
  const completedModules = userProgress.modules.filter(
    (m) => m.status === "completed"
  ).length;
  const inProgressModules = userProgress.modules.filter(
    (m) => m.status === "in-progress"
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          🔧 Progress Management
        </h3>
        <span className="text-xs text-gray-500">
          User ID: {userProgress.userId}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-900">{totalModules}</p>
          <p className="text-xs text-gray-600">Total Modul</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {inProgressModules}
          </p>
          <p className="text-xs text-gray-600">Sedang Belajar</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">
            {completedModules}
          </p>
          <p className="text-xs text-gray-600">Selesai</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          disabled={totalModules === 0}
        >
          <Download size={16} />
          Export Progress
        </button>

        <label className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm cursor-pointer">
          <Upload size={16} />
          Import Progress
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>

        <button
          onClick={handleResetAll}
          className={`col-span-2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
            showConfirm
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {showConfirm ? (
            <>
              <Trash2 size={16} />
              Klik lagi untuk konfirmasi reset!
            </>
          ) : (
            <>
              <RotateCcw size={16} />
              Reset Semua Progress
            </>
          )}
        </button>
      </div>

      {/* Module List */}
      {userProgress.modules.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs font-semibold text-gray-700 mb-2">
            Detail Progress:
          </p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {userProgress.modules.map((module) => (
              <div
                key={module.moduleId}
                className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {module.moduleSlug}
                  </p>
                  <p className="text-gray-500 text-[10px]">
                    {module.subMateris.filter((s) => s.isCompleted).length} /{" "}
                    {module.subMateris.length} sub-materi
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    {module.overallProgress}%
                  </p>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `Reset progress untuk modul "${module.moduleSlug}"?`
                        )
                      ) {
                        resetModuleProgress(module.moduleId);
                        window.location.reload();
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalModules === 0 && (
        <div className="mt-4 pt-4 border-t text-center text-sm text-gray-500">
          Belum ada progress yang tercatat. Mulai belajar untuk melihat progress
          Anda!
        </div>
      )}
    </div>
  );
};

export default ProgressDebugPanel;

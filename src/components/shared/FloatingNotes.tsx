"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Search,
  FileText,
  Pin,
} from "lucide-react";
import jsPDF from "jspdf";
import { NoteService, UserNote } from "@/services/noteService";
import { useAuth } from "@/context/AuthContext";

interface Note {
  id: string;
  title: string;
  content: string;
  material: string; // This will map to category in backend
  createdAt: Date;
  updatedAt: Date;
  is_pinned?: boolean;
}

const FloatingNotes: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if we're on modul detail page (no bottom navbar)
  const isModulDetailPage =
    pathname?.includes("/user/modul/") && pathname !== "/user/modul";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    material: "",
  });
  const [showGreeting, setShowGreeting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    noteId: string;
    noteTitle: string;
  }>({ show: false, noteId: "", noteTitle: "" });
  const [hasSeenWelcome, setHasSeenWelcome] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bukadita-notes-welcome") === "true";
    }
    return false;
  });
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch notes from backend when user is logged in
  useEffect(() => {
    if (user && isMounted) {
      fetchNotes();
    }
  }, [user, isMounted]);

  // Fetch notes from backend
  const fetchNotes = async () => {
    if (!user) return;

    setIsFetching(true);
    try {
      const response = await NoteService.getUserNotes(
        1,
        100,
        undefined,
        searchTerm,
      );

      if (!response.error && response.data) {
        // Convert backend format to component format
        const convertedNotes: Note[] = response.data.items.map(
          (note: UserNote) => ({
            id: note.id,
            title: note.title,
            content: note.content,
            material: note.category,
            createdAt: new Date(note.created_at),
            updatedAt: new Date(note.updated_at),
            is_pinned: note.is_pinned,
          }),
        );
        setNotes(convertedNotes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Listen to sidebar toggle (for hiding widget on mobile when sidebar is open)
  useEffect(() => {
    const handleSidebarToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsSidebarOpen(customEvent.detail.isOpen);
    };

    window.addEventListener("modulSidebarToggled", handleSidebarToggle);

    return () => {
      window.removeEventListener("modulSidebarToggled", handleSidebarToggle);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key
      if (e.key === "Escape") {
        if (deleteConfirm.show) {
          cancelDeleteNote();
        } else if (showGreeting) {
          setShowGreeting(false);
        } else if (isDialogOpen) {
          setIsDialogOpen(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }

      // Ctrl/Cmd + S to save note (when dialog is open)
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && isDialogOpen) {
        e.preventDefault();
        // handleSaveNote will be called via the save button
      }

      // Ctrl/Cmd + N to add new note (when panel is open)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === "n" &&
        isOpen &&
        !isDialogOpen
      ) {
        e.preventDefault();
        setEditingNote(null);
        setFormData({ title: "", content: "", material: "" });
        setIsDialogOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDialogOpen, deleteConfirm.show, showGreeting]);

  // Auto-show greeting for first-time visitors
  useEffect(() => {
    if (!hasSeenWelcome && user) {
      // Show greeting after a delay
      const timer = setTimeout(() => {
        setShowGreeting(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("bukadita-notes-welcome", "true");
        }
        setHasSeenWelcome(true);

        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowGreeting(false);
        }, 5000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasSeenWelcome, user]);

  // Handle manual close of greeting
  const handleCloseGreeting = () => {
    setShowGreeting(false);
  };

  // Handle greeting click to open notes panel
  const handleGreetingClick = () => {
    setShowGreeting(false);
    setIsOpen(true);
  };

  // Helper function for toast notifications
  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    const toastDiv = document.createElement("div");
    toastDiv.textContent = message;
    toastDiv.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-[10010] text-sm text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`;
    document.body.appendChild(toastDiv);

    // Add fade in animation
    toastDiv.style.opacity = "0";
    toastDiv.style.transform = "translateX(100%)";
    toastDiv.style.transition = "all 0.3s ease";

    setTimeout(() => {
      toastDiv.style.opacity = "1";
      toastDiv.style.transform = "translateX(0)";
    }, 10);

    setTimeout(() => {
      toastDiv.style.opacity = "0";
      toastDiv.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(toastDiv)) {
          document.body.removeChild(toastDiv);
        }
      }, 300);
    }, 2700);
  };

  // Export notes to PDF
  const exportNotes = () => {
    if (notes.length === 0) {
      showToast("Tidak ada catatan untuk diekspor", "error");
      return;
    }

    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      let yPosition = 30;

      // Header
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("Catatan Bukadita - Posyandu", margin, yPosition);

      yPosition += 10;
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        `Diekspor pada: ${new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        margin,
        yPosition,
      );

      yPosition += 20;

      // Notes content
      notes.forEach((note, index) => {
        // Check if we need a new page
        if (yPosition > pdf.internal.pageSize.getHeight() - 40) {
          pdf.addPage();
          yPosition = 30;
        }

        // Note number and title
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        const titleText = `${index + 1}. ${note.title}`;
        pdf.text(titleText, margin, yPosition);
        yPosition += 8;

        // Material
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "italic");
        pdf.text(`Materi: ${note.material}`, margin, yPosition);
        yPosition += 8;

        // Content
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
        const contentLines = pdf.splitTextToSize(note.content, maxWidth);
        pdf.text(contentLines, margin, yPosition);
        yPosition += contentLines.length * 5 + 5;

        // Date
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "italic");
        const dateText = `Dibuat: ${note.createdAt.toLocaleDateString(
          "id-ID",
        )} | Diupdate: ${note.updatedAt.toLocaleDateString("id-ID")}`;
        pdf.text(dateText, margin, yPosition);
        yPosition += 15;

        // Separator line
        if (index < notes.length - 1) {
          pdf.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 10;
        }
      });

      // Footer
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.text(
          `Halaman ${i} dari ${totalPages} - Bukadita Posyandu Learning Platform`,
          pageWidth / 2,
          pdf.internal.pageSize.getHeight() - 10,
          { align: "center" },
        );
      }

      // Save PDF
      const fileName = `catatan-bukadita-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);

      showToast(`Catatan berhasil diekspor ke ${fileName}`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      showToast("Gagal mengekspor catatan ke PDF", "error");
    }
  };

  // Create or update note
  const handleSaveNote = async () => {
    // Check if user is logged in
    if (!user) {
      showToast("Anda harus login terlebih dahulu!", "error");
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      showToast("Judul catatan tidak boleh kosong!", "error");
      return;
    }
    if (!formData.content.trim()) {
      showToast("Isi catatan tidak boleh kosong!", "error");
      return;
    }
    if (!formData.material.trim()) {
      showToast("Nama materi tidak boleh kosong!", "error");
      return;
    }

    setIsLoading(true);

    try {
      if (editingNote) {
        // Update existing note via API
        const response = await NoteService.updateNote(editingNote.id, {
          title: formData.title,
          content: formData.content,
          category: formData.material,
        });

        if (!response.error) {
          showToast("Catatan berhasil diupdate");
          await fetchNotes(); // Refresh notes list
        } else {
          throw new Error(response.message);
        }
      } else {
        // Create new note via API
        const response = await NoteService.createNote({
          title: formData.title,
          content: formData.content,
          category: formData.material,
        });

        if (!response.error) {
          showToast("Catatan berhasil disimpan");
          await fetchNotes(); // Refresh notes list
        } else {
          throw new Error(response.message);
        }
      }

      // Reset form
      setFormData({ title: "", content: "", material: "" });
      setEditingNote(null);
      setIsDialogOpen(false);
    } catch (error: any) {
      showToast(
        error.message || "Terjadi kesalahan saat menyimpan catatan!",
        "error",
      );
      console.error("Error saving note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete note - show custom confirmation dialog
  const handleDeleteNote = (id: string, title: string) => {
    setDeleteConfirm({ show: true, noteId: id, noteTitle: title });
  };

  // Confirm delete note
  const confirmDeleteNote = async () => {
    if (!user) {
      showToast("Anda harus login terlebih dahulu!", "error");
      return;
    }

    try {
      const response = await NoteService.deleteNote(deleteConfirm.noteId);

      if (!response.error) {
        showToast("Catatan berhasil dihapus");
        await fetchNotes(); // Refresh notes list
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      showToast(error.message || "Gagal menghapus catatan!", "error");
      console.error("Error deleting note:", error);
    } finally {
      setDeleteConfirm({ show: false, noteId: "", noteTitle: "" });
    }
  };

  // Cancel delete note
  const cancelDeleteNote = () => {
    setDeleteConfirm({ show: false, noteId: "", noteTitle: "" });
  };

  // Edit note
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      material: note.material,
    });
    setIsDialogOpen(true);
  };

  // Toggle pin note
  const handleTogglePin = async (noteId: string) => {
    if (!user) {
      showToast("Anda harus login terlebih dahulu!", "error");
      return;
    }

    try {
      const response = await NoteService.togglePinNote(noteId);

      if (!response.error) {
        showToast(
          response.data?.is_pinned ? "Catatan dipasang" : "Catatan dilepas",
        );
        await fetchNotes(); // Refresh notes list
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      showToast(error.message || "Gagal mengubah status pin!", "error");
      console.error("Error toggling pin:", error);
    }
  };

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.material.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Floating Icon - Positioned on LEFT */}
      <div
        className={`fixed left-4 z-50 transition-all duration-300 ${
          isModulDetailPage ? "bottom-20 sm:bottom-24" : "bottom-28 sm:bottom-6"
        } sm:left-6 ${
          isSidebarOpen && isModulDetailPage
            ? "opacity-0 scale-0 pointer-events-none md:opacity-100 md:scale-100 md:pointer-events-auto"
            : "opacity-100 scale-100"
        }`}
      >
        <div className="relative">
          {/* Greeting Message */}
          <AnimatePresence>
            {showGreeting && (
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                onClick={handleGreetingClick}
                className="absolute bottom-16 left-0 bg-white shadow-lg rounded-lg p-3 sm:p-4 min-w-[200px] max-w-[260px] sm:min-w-[240px] sm:max-w-[280px] border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ml-0 sm:ml-0 z-40"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseGreeting();
                  }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                  <X size={14} className="sm:w-3 sm:h-3" />
                </button>
                <div className="text-xs sm:text-sm text-gray-700 font-medium pr-7 sm:pr-6">
                  Hai para kader! Kalau butuh catatan klik aku ya
                </div>
                <div className="absolute -bottom-2 left-6 sm:left-4 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Icon */}
          <button
            onClick={() => setIsOpen(true)}
            className={`w-14 h-14 sm:w-14 sm:h-14 bg-gradient-to-br from-[#578FCA] to-[#27548A] text-white rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center ${
              showGreeting ? "animate-subtle-glow" : ""
            }`}
            aria-label="Buka Catatan"
          >
            <BookOpen size={22} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Notes Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 z-[10000] backdrop-blur-sm"
              onClick={() => {
                // Only close panel if dialog and delete confirm are not open
                if (!isDialogOpen && !deleteConfirm.show) {
                  setIsOpen(false);
                }
              }}
            />

            {/* Panel - Centered Popup */}
            <div
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10001] w-[96vw] max-w-[500px] max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col transition-opacity duration-200 ${
                isDialogOpen || deleteConfirm.show
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] p-4 sm:p-5 flex-shrink-0">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-base sm:text-lg">
                        Catatan Saya
                      </h2>
                      <p className="text-blue-100 text-[10px] sm:text-xs">
                        Kelola catatan pembelajaran Anda
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 p-2 sm:p-2.5 rounded-full transition-colors flex-shrink-0"
                    aria-label="Tutup"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={exportNotes}
                    className="flex-1 py-2 sm:py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all bg-white/10 text-white hover:bg-white/20 active:bg-white/30 flex items-center justify-center gap-2"
                    aria-label="Export ke PDF"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Export PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingNote(null);
                      setFormData({ title: "", content: "", material: "" });
                      setIsDialogOpen(true);
                    }}
                    className="flex-1 py-2 sm:py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all bg-white text-[#27548A] shadow-lg hover:bg-blue-50 flex items-center justify-center gap-2"
                    aria-label="Tambah Catatan Baru"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Catatan</span>
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="p-3 sm:p-4 border-b bg-gray-50 flex-shrink-0">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Cari catatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#578FCA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notes List - Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-3 sm:p-4 space-y-3">
                  {isFetching ? (
                    <div className="text-center text-gray-500 py-8 sm:py-12">
                      <div className="w-12 h-12 border-4 border-[#578FCA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-sm sm:text-base">Memuat catatan...</p>
                    </div>
                  ) : filteredNotes.length === 0 ? (
                    <div className="text-center text-gray-500 py-8 sm:py-12">
                      <BookOpen
                        size={48}
                        className="mx-auto mb-4 text-gray-300"
                      />
                      <p className="text-sm sm:text-base">
                        {searchTerm
                          ? "Tidak ada catatan ditemukan"
                          : "Belum ada catatan"}
                      </p>
                      <p className="text-xs sm:text-sm mt-1">
                        {searchTerm
                          ? "Coba kata kunci lain"
                          : "Mulai buat catatan pertama Anda!"}
                      </p>
                    </div>
                  ) : (
                    filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md hover:border-[#578FCA] transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-1 pr-2">
                            {note.is_pinned && (
                              <Pin
                                size={14}
                                className="text-[#578FCA] fill-[#578FCA]"
                              />
                            )}
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                              {note.title}
                            </h3>
                          </div>
                          <div className="flex gap-1.5 sm:gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleTogglePin(note.id)}
                              className={`p-2 sm:p-1.5 rounded-lg transition-all ${
                                note.is_pinned
                                  ? "text-[#578FCA] bg-blue-100 hover:bg-blue-200"
                                  : "text-gray-400 hover:bg-gray-200 hover:text-[#578FCA]"
                              }`}
                              aria-label={
                                note.is_pinned ? "Lepas Pin" : "Pin Catatan"
                              }
                              title={
                                note.is_pinned ? "Lepas Pin" : "Pin Catatan"
                              }
                            >
                              <Pin
                                size={16}
                                className={`sm:w-[14px] sm:h-[14px] ${
                                  note.is_pinned ? "fill-[#578FCA]" : ""
                                }`}
                              />
                            </button>
                            <button
                              onClick={() => handleEditNote(note)}
                              className="p-2 sm:p-1.5 text-[#578FCA] hover:bg-blue-100 rounded-lg transition-all"
                              aria-label="Edit Catatan"
                              title="Edit Catatan"
                            >
                              <Edit
                                size={16}
                                className="sm:w-[14px] sm:h-[14px]"
                              />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteNote(note.id, note.title)
                              }
                              className="p-2 sm:p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-all"
                              aria-label="Hapus Catatan"
                              title="Hapus Catatan"
                            >
                              <Trash2
                                size={16}
                                className="sm:w-[14px] sm:h-[14px]"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs font-medium text-[#578FCA] bg-blue-100 px-2 py-1 rounded-md mb-2 inline-block">
                          {note.material}
                        </div>

                        <p className="text-gray-700 text-xs sm:text-sm line-clamp-3 mb-2">
                          {note.content}
                        </p>

                        <div className="text-xs text-gray-500 font-medium">
                          {note.updatedAt.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Footer Statistics */}
              {notes.length > 0 && (
                <div className="px-3 sm:px-4 py-3 bg-gray-50 border-t flex-shrink-0">
                  <div className="text-center text-xs sm:text-sm text-gray-600 font-medium">
                    Menampilkan {filteredNotes.length} dari {notes.length}{" "}
                    catatan
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Note Dialog */}
      <AnimatePresence mode="wait">
        {isDialogOpen && (
          <>
            {/* Dialog Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-[10000] backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-full max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl z-[10001] max-h-[85vh] sm:max-h-[90vh] overflow-hidden border-2 border-[#578FCA]"
            >
              {/* Dialog Header */}
              <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] p-4 sm:p-5 flex items-center justify-between">
                <h3 className="text-white font-bold text-base sm:text-lg">
                  {editingNote ? "Edit Catatan" : "Tambah Catatan Baru"}
                </h3>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Dialog Body */}
              <div
                className="p-4 sm:p-6 overflow-y-auto"
                style={{ maxHeight: "calc(85vh - 140px)" }}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-1">
                      Judul Catatan
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Masukkan judul catatan..."
                      className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#578FCA] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-1">
                      Nama Materi
                    </label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) =>
                        setFormData({ ...formData, material: e.target.value })
                      }
                      placeholder="Contoh: Posyandu Dasar, Gizi Balita, dll..."
                      className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#578FCA] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-1">
                      Isi Catatan
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Tulis catatan Anda di sini..."
                      rows={5}
                      className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#578FCA] focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveNote}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check size={18} className="sm:w-4 sm:h-4" />
                    )}
                    {isLoading
                      ? "Menyimpan..."
                      : editingNote
                        ? "Update"
                        : "Simpan"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence mode="wait">
        {deleteConfirm.show && (
          <>
            {/* Delete Dialog Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-[10000] backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-full max-w-sm bg-white rounded-xl sm:rounded-2xl shadow-2xl z-[10001] border-2 border-red-500"
            >
              <div className="p-5 sm:p-6 relative">
                <button
                  onClick={cancelDeleteNote}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-3 sm:mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-center text-gray-900 mb-2">
                  Hapus Catatan
                </h3>

                <p className="text-xs sm:text-sm text-center text-gray-600 mb-5 sm:mb-6 px-2">
                  Apakah Anda yakin ingin menghapus catatan{" "}
                  <span className="font-medium">{deleteConfirm.noteTitle}</span>
                  ? Tindakan ini tidak dapat dibatalkan.
                </p>

                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={cancelDeleteNote}
                    className="flex-1 px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDeleteNote}
                    className="flex-1 bg-red-600 text-white px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} className="sm:w-4 sm:h-4" />
                    Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        @keyframes subtle-glow {
          0%,
          100% {
            box-shadow: 0 10px 15px -3px rgba(87, 143, 202, 0.3);
          }
          50% {
            box-shadow: 0 10px 25px -3px rgba(87, 143, 202, 0.5);
          }
        }

        .animate-subtle-glow {
          animation: subtle-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default FloatingNotes;

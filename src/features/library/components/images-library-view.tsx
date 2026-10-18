"use client";

import React, { useMemo, useState, useTransition } from "react";
import {
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  RefreshCw,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { getOneFileLibrary, LibraryFile, OneFileLibraryResult } from "../apis/library.api";
import {
  getFileExtension,
  getFileType,
  isPdfFile,
  isSupportedLibraryFile,
} from "../utils/library.util";

interface ImagesLibraryViewProps {
  files: LibraryFile[];
}

export default function ImagesLibraryView({ files = [] }: ImagesLibraryViewProps) {
  const t = useTranslations("Chat");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [activeTab, setActiveTab] = useState<"all" | "images" | "pdf">("all");
  const [selectedFile, setSelectedFile] = useState<LibraryFile | null>(null);
  const [fileData, setFileData] = useState<OneFileLibraryResult | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  // Image viewer zoom & rotation & dimensions
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(null);

  const selectedIsPdf = selectedFile ? isPdfFile(selectedFile.name) : false;

  // Memoized blob URL for PDF rendering to ensure native browser PDF reader quality & responsiveness
  const pdfBlobUrl = useMemo(() => {
    if (!fileData?.dataUrl || !selectedIsPdf) return null;
    try {
      const arr = fileData.dataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)?.[1] || "application/pdf";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      return URL.createObjectURL(blob);
    } catch {
      return fileData.dataUrl;
    }
  }, [fileData?.dataUrl, selectedIsPdf]);

  React.useEffect(() => {
    return () => {
      if (pdfBlobUrl && pdfBlobUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [pdfBlobUrl]);

  // Filter ONLY supported files (images & PDFs)
  const supportedFiles = useMemo(() => {
    return files.filter((file) => isSupportedLibraryFile(file.name));
  }, [files]);

  // Counts for tabs
  const counts = useMemo(() => {
    let imagesCount = 0;
    let pdfCount = 0;
    for (const f of supportedFiles) {
      if (isPdfFile(f.name)) {
        pdfCount++;
      } else {
        imagesCount++;
      }
    }
    return {
      all: supportedFiles.length,
      images: imagesCount,
      pdf: pdfCount,
    };
  }, [supportedFiles]);

  // Filter based on active tab
  const filteredFiles = useMemo(() => {
    return supportedFiles.filter((file) => {
      const type = getFileType(file.name);
      if (activeTab === "images") return type === "image";
      if (activeTab === "pdf") return type === "pdf";
      return true;
    });
  }, [supportedFiles, activeTab]);

  // Handle opening preview modal using authenticated Server Action
  const handleOpenPreview = async (file: LibraryFile) => {
    setSelectedFile(file);
    setFileData(null);
    setIsLoadingPreview(true);
    setZoom(1);
    setRotation(0);
    setDimensions(null);

    try {
      const res = await getOneFileLibrary(file.view_url || file.name);
      if (res.success && res.dataUrl) {
        setFileData(res);
      } else {
        toast.error(res.message || t("downloadError") || "فشل تحميل الملف");
      }
    } catch (error) {
      console.error("Error fetching file preview:", error);
      toast.error(t("downloadError") || "فشل تحميل الملف");
    } finally {
      setIsLoadingPreview(false);
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Download handler directly using dataUrl or Server Action
  const handleDownload = async (file: LibraryFile, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const toastId = `dl-${file.name}`;

    try {
      toast.loading(t("downloading") || "جاري تجهيز التحميل...", { id: toastId });

      let dataUrl = fileData?.dataUrl;

      // If we don't have the dataUrl in state, fetch it via Server Action
      if (!dataUrl || selectedFile?.name !== file.name) {
        const res = await getOneFileLibrary(file.view_url || file.name);
        if (!res.success || !res.dataUrl) {
          throw new Error(res.message || "Failed to download");
        }
        dataUrl = res.dataUrl;
      }

      // Trigger download using the in-memory dataUrl
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(t("downloadSuccess") || "تم تحميل الملف بنجاح", { id: toastId });
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error(t("downloadError") || "فشل تحميل الملف", { id: toastId });
    }
  };

  // Open PDF in new tab
  const handleOpenInNewTab = () => {
    if (pdfBlobUrl) {
      window.open(pdfBlobUrl, "_blank");
    }
  };

  // Server refresh trigger
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex h-dvh w-full flex-1 flex-col min-h-0 overflow-hidden bg-background">
      {/* Top Header */}
      <header className="relative flex shrink-0 items-center justify-between border-b border-border bg-background px-3 py-2.5 sm:px-6 sm:py-3.5">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="md:hidden">
            <SidebarTrigger className="size-8 rounded-lg border border-border bg-background/80 shadow-xs" />
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <ImageIcon className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm font-bold text-foreground sm:text-lg truncate max-w-[130px] xs:max-w-[220px] sm:max-w-none">
                  {t("filesLibrary") || "مكتبة الصور والملفات"}
                </h1>
                <span className="shrink-0 rounded-full bg-brand/10 px-1.5 sm:px-2 py-0.2 sm:py-0.5 text-[10px] sm:text-xs font-semibold text-brand">
                  {filteredFiles.length}
                </span>
              </div>
              <p className="hidden text-xs text-muted-foreground sm:block">
                {t("filesLibraryDesc") || "تصفح واستعراض جميع الصور وملفات PDF الخاصة بك"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isPending}
            title={t("refresh") || "تحديث"}
            aria-label={t("refresh") || "تحديث"}
            className="inline-flex size-8 sm:size-auto items-center justify-center gap-1.5 rounded-xl border border-border bg-background/80 px-2 sm:px-3 sm:py-2 text-xs font-medium text-foreground transition-all hover:bg-muted disabled:opacity-50"
          >
            <RefreshCw className={cn("size-3.5", isPending && "animate-spin text-brand")} />
            <span className="hidden sm:inline">{t("refresh") || "تحديث"}</span>
          </button>

          <Link
            href="/dashboard/chat"
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-brand px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium text-brand-foreground shadow-xs transition-opacity hover:opacity-90 active:scale-95"
          >
            <MessageSquare className="size-3.5" />
            <span className="hidden xs:inline">{t("newChat")}</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden px-3 py-3 sm:px-6 sm:py-5">
        <div className="mx-auto flex w-full max-w-7xl flex-1 min-h-0 flex-col gap-3 sm:gap-4">
          {/* Controls Bar: Mobile-optimized Segmented Tabs */}
          <div className="w-full flex items-center justify-start">
            <div className="w-full sm:w-auto flex items-center gap-1 rounded-xl bg-muted/50 p-1 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                  activeTab === "all"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{t("allFiles") || "الكل"}</span>
                <span className="rounded-full bg-muted px-1.5 py-0.2 text-[10px] text-muted-foreground">
                  {counts.all}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("images")}
                className={cn(
                  "flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                  activeTab === "images"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ImageIcon className="size-3.5 text-brand" />
                <span>{t("imagesOnly") || "الصور"}</span>
                <span className="rounded-full bg-muted px-1.5 py-0.2 text-[10px] text-muted-foreground">
                  {counts.images}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("pdf")}
                className={cn(
                  "flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                  activeTab === "pdf"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <FileText className="size-3.5 text-red-500" />
                <span>{t("pdfOnly") || "ملفات PDF"}</span>
                <span className="rounded-full bg-muted px-1.5 py-0.2 text-[10px] text-muted-foreground">
                  {counts.pdf}
                </span>
              </button>
            </div>
          </div>

          {/* Files Grid */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-0.5">
            {filteredFiles.length === 0 ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 py-10 px-4 text-center rounded-3xl border border-dashed border-border/80 bg-muted/20">
                <div className="flex size-12 sm:size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <ImageIcon className="size-6 sm:size-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t("noFiles") || "لا توجد ملفات في المكتبة"}
                  </p>
                  <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                    {t("noFilesDesc") || "لم يتم العثور على أي صور أو ملفات PDF حتى الآن."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredFiles.map((file) => {
                  const isPdf = isPdfFile(file.name);
                  const ext = getFileExtension(file.name).toUpperCase();

                  return (
                    <div
                      key={file.name}
                      onClick={() => handleOpenPreview(file)}
                      className="group relative flex flex-col justify-between items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:border-brand/40 hover:shadow-md sm:hover:shadow-lg cursor-pointer overflow-hidden text-center active:scale-[0.98]"
                    >
                      {/* Top Badges & Quick Action (Visible on mobile touch without needing hover) */}
                      <div className="w-full flex items-center justify-between mb-1.5 sm:mb-2">
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border",
                            isPdf
                              ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                              : "bg-brand/10 text-brand border-brand/20"
                          )}
                        >
                          {ext || (isPdf ? "PDF" : "IMG")}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleDownload(file, e)}
                          title={t("download") || "تحميل"}
                          aria-label={t("download") || "تحميل"}
                          className="opacity-80 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex size-6.5 sm:size-7 items-center justify-center rounded-lg bg-muted text-foreground hover:bg-brand hover:text-brand-foreground"
                        >
                          <Download className="size-3 sm:size-3.5" />
                        </button>
                      </div>

                      {/* File Icon Display Area */}
                      <div className="my-1.5 sm:my-3 flex items-center justify-center">
                        <div
                          className={cn(
                            "flex size-14 sm:size-18 md:size-20 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:scale-105 border",
                            isPdf
                              ? "bg-gradient-to-br from-red-500/15 via-red-500/5 to-transparent border-red-500/20 text-red-500 group-hover:border-red-500/40"
                              : "bg-gradient-to-br from-brand/15 via-brand/5 to-transparent border-brand/20 text-brand group-hover:border-brand/40"
                          )}
                        >
                          {isPdf ? (
                            <FileText className="size-7 sm:size-9 md:size-10 stroke-[1.7]" />
                          ) : (
                            <ImageIcon className="size-7 sm:size-9 md:size-10 stroke-[1.7]" />
                          )}
                        </div>
                      </div>

                      {/* File Name Underneath */}
                      <div className="w-full mt-1">
                        <p
                          title={file.name}
                          className="truncate text-[11px] sm:text-xs font-semibold text-foreground group-hover:text-brand transition-colors text-center dir-ltr"
                        >
                          {file.name}
                        </p>
                        <span className="mt-0.5 sm:mt-1 block text-[10px] sm:text-[11px] text-muted-foreground">
                          {isPdf
                            ? t("pdfDocument") || "مستند PDF"
                            : t("imageFile") || "صورة"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal Dialog - Mobile Responsive */}
      {selectedFile && (
        <Dialog
          open={!!selectedFile}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedFile(null);
              setFileData(null);
            }
          }}
        >
          <DialogContent
            showCloseButton={false}
            className={cn(
              "w-[98vw] max-w-[calc(100vw-8px)] sm:w-[94vw] sm:max-w-5xl md:max-w-6xl lg:max-w-7xl p-0 gap-0 overflow-hidden bg-background border border-border/80 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col",
              selectedIsPdf
                ? "h-[94dvh] sm:h-[92dvh] max-h-[96dvh]"
                : "max-h-[94dvh]"
            )}
          >
            {/* Modal Header */}
            <DialogHeader className="flex flex-row items-center justify-between border-b border-border/80 px-3 py-2 sm:px-6 sm:py-3.5 bg-muted/20 shrink-0">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-1 sm:pr-2">
                <div
                  className={cn(
                    "flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border shadow-2xs",
                    selectedIsPdf
                      ? "bg-red-500/10 text-red-500 border-red-500/20"
                      : "bg-brand/10 text-brand border-brand/20"
                  )}
                >
                  {selectedIsPdf ? (
                    <FileText className="size-4 sm:size-4.5" />
                  ) : (
                    <ImageIcon className="size-4 sm:size-4.5" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <DialogTitle className="truncate text-xs sm:text-sm font-bold text-foreground text-start dir-ltr max-w-[120px] xs:max-w-[180px] sm:max-w-md">
                      {selectedFile.name}
                    </DialogTitle>
                    {dimensions && !selectedIsPdf && (
                      <span className="hidden md:inline-block rounded-md bg-muted px-1.5 py-0.2 text-[10px] font-medium text-muted-foreground dir-ltr">
                        {dimensions.w} × {dimensions.h} px
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground text-start">
                    {selectedIsPdf
                      ? t("pdfDocument") || "مستند PDF"
                      : t("imageFile") || "صورة"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {selectedIsPdf && fileData?.dataUrl && (
                  <button
                    type="button"
                    onClick={handleOpenInNewTab}
                    title={t("openInNewTab") || "فتح في نافذة جديدة"}
                    className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl border border-border bg-background px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-medium text-foreground hover:bg-muted shadow-2xs transition-colors"
                  >
                    <ExternalLink className="size-3.5" />
                    <span className="hidden sm:inline">{t("openInNewTab") || "نافذة جديدة"}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => handleDownload(selectedFile, e)}
                  disabled={isLoadingPreview || !fileData?.dataUrl}
                  className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-brand px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 text-xs font-medium text-brand-foreground hover:opacity-90 shadow-xs transition-opacity disabled:opacity-50"
                  title={t("download") || "تحميل"}
                >
                  <Download className="size-3.5" />
                  <span className="hidden xs:inline">{t("download") || "تحميل"}</span>
                </button>

                {/* Close Button X next to the download button */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setFileData(null);
                  }}
                  className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl border border-border bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-2xs active:scale-95 shrink-0"
                  aria-label={t("close") || "إغلاق"}
                  title={t("close") || "إغلاق"}
                >
                  <X className="size-4 sm:size-4.5" />
                </button>
              </div>
            </DialogHeader>

            {/* Modal Body Preview - Dynamic sizing for PDF vs Images */}
            <div
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center w-full min-h-0 overflow-hidden select-none",
                selectedIsPdf
                  ? "size-full bg-background"
                  : "h-[73dvh] xs:h-[75dvh] sm:h-[74dvh] max-h-[820px] bg-zinc-950/95 dark:bg-black/95"
              )}
            >
              {isLoadingPreview ? (
                <div className="flex flex-col items-center justify-center min-h-[200px] gap-2.5">
                  <Loader2 className="size-7 sm:size-8 animate-spin text-brand" />
                  <span className="text-xs font-medium text-zinc-400">جاري تحميل المعاينة بأمان...</span>
                </div>
              ) : fileData?.dataUrl ? (
                selectedIsPdf ? (
                  <div className="size-full flex-1 min-h-0 flex flex-col p-0 overflow-hidden bg-background">
                    <iframe
                      src={pdfBlobUrl || fileData.dataUrl}
                      className="size-full flex-1 min-h-[480px] sm:min-h-full border-0 block"
                      title={selectedFile.name}
                    />
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center size-full min-h-0 min-w-0 p-1.5 xs:p-2.5 sm:p-6 pb-13 xs:pb-14 sm:pb-20 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={fileData.dataUrl}
                      alt={selectedFile.name}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        setDimensions({ w: img.naturalWidth, h: img.naturalHeight });
                      }}
                      style={{
                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                        transition: "transform 0.2s cubic-bezier(0.2, 0, 0, 1)",
                      }}
                      className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg sm:rounded-xl shadow-2xl border border-white/10"
                    />

                    {/* Floating Zoom & Rotate Toolbar for Images */}
                    <div className="absolute bottom-2.5 sm:bottom-4 start-1/2 -translate-x-1/2 z-10 flex items-center gap-0.5 sm:gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-zinc-900/95 border border-zinc-700/60 shadow-xl backdrop-blur-md text-zinc-300 touch-manipulation">
                      <button
                        type="button"
                        onClick={handleZoomOut}
                        disabled={zoom <= 0.5}
                        title="تصغير"
                        className="p-1 sm:p-1.5 rounded-full hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-30 active:scale-90"
                      >
                        <ZoomOut className="size-3.5 sm:size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleResetZoom}
                        title="إعادة ضبط الحجم"
                        className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-md hover:bg-zinc-800 hover:text-white transition-colors min-w-[36px] sm:min-w-[42px] text-center"
                      >
                        {Math.round(zoom * 100)}%
                      </button>
                      <button
                        type="button"
                        onClick={handleZoomIn}
                        disabled={zoom >= 3}
                        title="تكبير"
                        className="p-1 sm:p-1.5 rounded-full hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-30 active:scale-90"
                      >
                        <ZoomIn className="size-3.5 sm:size-4" />
                      </button>
                      <div className="w-px h-3.5 bg-zinc-700/80 mx-0.5 sm:mx-1" />
                      <button
                        type="button"
                        onClick={handleRotate}
                        title="تدوير 90 درجة"
                        className="p-1 sm:p-1.5 rounded-full hover:bg-zinc-800 hover:text-white transition-colors active:scale-90"
                      >
                        <RotateCw className="size-3.5 sm:size-4" />
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[180px] gap-2.5 text-center px-3">
                  <p className="text-xs sm:text-sm font-medium text-red-400">
                    فشل جلب المعاينة للملف المحدد
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOpenPreview(selectedFile)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
                  >
                    <RefreshCw className="size-3.5" />
                    <span>إعادة المحاولة</span>
                  </button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

"use client";

import React, { useMemo, useState, useTransition } from "react";
import {
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  RefreshCw,
  X,
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

  // Server refresh trigger
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const selectedIsPdf = selectedFile ? isPdfFile(selectedFile.name) : false;

  return (
    <div className="flex h-dvh w-full flex-1 flex-col min-h-0 overflow-hidden bg-background">
      {/* Top Header */}
      <header className="relative flex shrink-0 items-center justify-between border-b border-border bg-background px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <SidebarTrigger className="size-8 rounded-lg border border-border bg-background/80 shadow-xs" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <ImageIcon className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-foreground sm:text-lg">
                  {t("filesLibrary") || "مكتبة الصور والملفات"}
                </h1>
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
                  {filteredFiles.length}
                </span>
              </div>
              <p className="hidden text-xs text-muted-foreground sm:block">
                {t("filesLibraryDesc") || "تصفح واستعراض جميع الصور وملفات PDF الخاصة بك"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isPending}
            title={t("refresh") || "تحديث"}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background/80 px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted disabled:opacity-50"
          >
            <RefreshCw className={cn("size-3.5", isPending && "animate-spin text-brand")} />
            <span className="hidden sm:inline">{t("refresh") || "تحديث"}</span>
          </button>

          <Link
            href="/dashboard/chat"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-xs font-medium text-brand-foreground shadow-xs transition-opacity hover:opacity-90 active:scale-95"
          >
            <MessageSquare className="size-3.5" />
            <span>{t("newChat")}</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
        <div className="mx-auto flex w-full max-w-7xl flex-1 min-h-0 flex-col gap-4">
          {/* Controls Bar: Filter Tabs Only (NO Search) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 rounded-xl bg-muted/50 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
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
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
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
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
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
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-1">
            {filteredFiles.length === 0 ? (
              <div className="flex h-full min-h-[350px] flex-col items-center justify-center gap-3 py-12 text-center rounded-3xl border border-dashed border-border/80 bg-muted/20">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <ImageIcon className="size-7" />
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
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredFiles.map((file) => {
                  const isPdf = isPdfFile(file.name);
                  const ext = getFileExtension(file.name).toUpperCase();

                  return (
                    <div
                      key={file.name}
                      onClick={() => handleOpenPreview(file)}
                      className="group relative flex flex-col justify-between items-center p-3.5 sm:p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 cursor-pointer overflow-hidden text-center"
                    >
                      {/* Top Badges & Quick Action */}
                      <div className="w-full flex items-center justify-between mb-2">
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
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
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex size-7 items-center justify-center rounded-lg bg-muted text-foreground hover:bg-brand hover:text-brand-foreground"
                        >
                          <Download className="size-3.5" />
                        </button>
                      </div>

                      {/* File Icon Display Area */}
                      <div className="my-2 sm:my-3 flex items-center justify-center">
                        <div
                          className={cn(
                            "flex size-16 sm:size-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 border",
                            isPdf
                              ? "bg-gradient-to-br from-red-500/15 via-red-500/5 to-transparent border-red-500/20 text-red-500 group-hover:border-red-500/40"
                              : "bg-gradient-to-br from-brand/15 via-brand/5 to-transparent border-brand/20 text-brand group-hover:border-brand/40"
                          )}
                        >
                          {isPdf ? (
                            <FileText className="size-8 sm:size-10 stroke-[1.7]" />
                          ) : (
                            <ImageIcon className="size-8 sm:size-10 stroke-[1.7]" />
                          )}
                        </div>
                      </div>

                      {/* File Name Underneath */}
                      <div className="w-full mt-1">
                        <p
                          title={file.name}
                          className="truncate text-xs font-semibold text-foreground group-hover:text-brand transition-colors text-center dir-ltr"
                        >
                          {file.name}
                        </p>
                        <span className="mt-1 block text-[10px] sm:text-[11px] text-muted-foreground">
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

      {/* Preview Modal Dialog */}
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
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border border-border rounded-3xl shadow-2xl">
            {/* Modal Header */}
            <DialogHeader className="flex flex-row items-center justify-between border-b border-border/80 px-4 py-3.5 sm:px-6 bg-muted/20">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg border",
                    selectedIsPdf
                      ? "bg-red-500/10 text-red-500 border-red-500/20"
                      : "bg-brand/10 text-brand border-brand/20"
                  )}
                >
                  {selectedIsPdf ? (
                    <FileText className="size-4" />
                  ) : (
                    <ImageIcon className="size-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <DialogTitle className="truncate text-xs sm:text-sm font-bold text-foreground text-start dir-ltr">
                    {selectedFile.name}
                  </DialogTitle>
                  <p className="text-[11px] text-muted-foreground text-start">
                    {selectedIsPdf
                      ? t("pdfDocument") || "مستند PDF"
                      : t("imageFile") || "صورة"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handleDownload(selectedFile, e)}
                  disabled={isLoadingPreview || !fileData?.dataUrl}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-1.5 text-xs font-medium text-brand-foreground hover:opacity-90 shadow-xs transition-opacity disabled:opacity-50"
                >
                  <Download className="size-3.5" />
                  <span>{t("download") || "تحميل"}</span>
                </button>
              </div>
            </DialogHeader>

            {/* Modal Body Preview */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-6 bg-muted/10 min-h-[360px] max-h-[75vh] overflow-auto custom-scrollbar">
              {isLoadingPreview ? (
                <div className="flex flex-col items-center justify-center min-h-[280px] gap-2">
                  <Loader2 className="size-8 animate-spin text-brand" />
                  <span className="text-xs text-muted-foreground">جاري تحميل المعاينة بأمان...</span>
                </div>
              ) : fileData?.dataUrl ? (
                selectedIsPdf ? (
                  <div className="w-full flex flex-col items-center gap-3">
                    <iframe
                      src={fileData.dataUrl}
                      className="w-full h-[60vh] rounded-2xl border border-border/60 bg-background shadow-xs"
                      title={selectedFile.name}
                    />
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center max-w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={fileData.dataUrl}
                      alt={selectedFile.name}
                      className="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain shadow-md"
                    />
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[200px] gap-2 text-center">
                  <p className="text-sm font-medium text-destructive">
                    فشل جلب المعاينة للملف المحدد
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOpenPreview(selectedFile)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
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

"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Download,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  Search,
  Upload,
  X,
  ArrowLeft,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "../../types/chat";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import {
  Dialog,
  DialogContent,
} from "@/shared/components/ui/dialog";

type ImageItem = {
  id: string;
  name: string;
  url: string;
  size?: number;
  source: "chat" | "upload";
  createdAt: Date;
};

export default function ImagesLibraryView() {
  const t = useTranslations("Chat");
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "chat" | "upload">("all");
  const [previewImage, setPreviewImage] = useState<ImageItem | null>(null);
  const [uploadedImages, setUploadedImages] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract all images from cached conversations in TanStack Query
  const chatImages = useMemo(() => {
    const images: ImageItem[] = [];
    const queryCache = queryClient.getQueryCache();
    const conversationQueries = queryCache.findAll({ queryKey: ["conversation"] });

    for (const query of conversationQueries) {
      const messages = query.state.data as Message[] | undefined;
      if (!Array.isArray(messages)) continue;

      for (const msg of messages) {
        if (!msg.attachments || msg.attachments.length === 0) continue;
        for (const att of msg.attachments) {
          if (att.kind === "image" && att.url) {
            images.push({
              id: att.id,
              name: att.name || "Image",
              url: att.url,
              size: att.size,
              source: "chat",
              createdAt: new Date(),
            });
          }
        }
      }
    }
    return images;
  }, [queryClient]);

  // Combine uploaded images with chat images
  const allImages = useMemo(() => {
    const combined = [...uploadedImages, ...chatImages];
    const seen = new Set<string>();
    return combined.filter((img) => {
      if (seen.has(img.url)) return false;
      seen.add(img.url);
      return true;
    });
  }, [uploadedImages, chatImages]);

  // Filter images based on active tab and search query
  const filteredImages = useMemo(() => {
    return allImages.filter((img) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        img.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab =
        activeTab === "all" || img.source === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [allImages, searchQuery, activeTab]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: ImageItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      const objectUrl = URL.createObjectURL(file);
      newItems.push({
        id: crypto.randomUUID(),
        name: file.name,
        url: objectUrl,
        size: file.size,
        source: "upload",
        createdAt: new Date(),
      });
    }

    if (newItems.length > 0) {
      setUploadedImages((prev) => [...newItems, ...prev]);
      toast.success(t("uploadSuccess") || "تمت إضافة الصور إلى المكتبة بنجاح");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = (img: ImageItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = img.url;
    link.download = img.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(t("downloadSuccess") || "جاري تحميل الصورة");
  };

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
                  {t("imagesLibrary")}
                </h1>
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
                  {filteredImages.length}
                </span>
              </div>
              <p className="hidden text-xs text-muted-foreground sm:block">
                {t("imagesLibraryDesc")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background/80 px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted"
          >
            <MessageSquare className="size-3.5" />
            <span>{t("newChat")}</span>
          </Link>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-xs font-medium text-brand-foreground shadow-xs transition-opacity hover:opacity-90 active:scale-95"
          >
            <Upload className="size-3.5" />
            <span>{t("uploadImage")}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileUpload}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
        <div className="mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col gap-4">
          {/* Controls Bar: Search & Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchImages")}
                className="w-full rounded-xl border border-border/80 bg-muted/40 py-2 ps-9 pe-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 rounded-xl bg-muted/50 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  activeTab === "all"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("allImages")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  activeTab === "chat"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("chatImages")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  activeTab === "upload"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("uploadImage")}
              </button>
            </div>
          </div>

          {/* Images Grid */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-1">
            {filteredImages.length === 0 ? (
              <div className="flex h-full min-h-[350px] flex-col items-center justify-center gap-3 py-12 text-center rounded-3xl border border-dashed border-border/80 bg-muted/20">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <ImageIcon className="size-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t("noImages")}
                  </p>
                  <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                    {t("noImagesDesc")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-xs font-medium text-foreground shadow-xs hover:bg-muted"
                >
                  <Plus className="size-3.5" />
                  <span>{t("uploadImage")}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setPreviewImage(img)}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-muted/30 transition-all duration-200 hover:border-brand/50 hover:shadow-md"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex flex-col justify-between p-3">
                      {/* Top badge */}
                      <div className="flex justify-between items-center">
                        <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                          {img.source === "chat" ? t("chatImages") : t("uploadImage")}
                        </span>
                      </div>

                      {/* Bottom info and actions */}
                      <div className="flex items-center justify-between text-white">
                        <p className="truncate text-xs font-medium max-w-[70%]">
                          {img.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => handleDownload(img, e)}
                            title={t("download")}
                            aria-label={t("download")}
                            className="flex size-7 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-xs transition-colors hover:bg-white/40"
                          >
                            <Download className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / Full Image Preview Modal */}
      {previewImage && (
        <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
          <DialogContent className="max-w-4xl p-3 bg-black/95 text-white border-none rounded-3xl overflow-hidden">
            <div className="relative flex flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage.url}
                alt={previewImage.name}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />

              <div className="mt-3 flex w-full items-center justify-between px-2 text-xs text-white/80">
                <span className="truncate max-w-sm font-medium">
                  {previewImage.name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleDownload(previewImage, e)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/25"
                  >
                    <Download className="size-3.5" />
                    <span>{t("download")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/25"
                  >
                    <X className="size-3.5" />
                    <span>{t("close")}</span>
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

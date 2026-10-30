"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, Layers, Image as ImageIcon, Video as VideoIcon, Volume2, Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { MEDIA_TOOLS_DATA } from "../data/media-tools.data";
import { MediaCategory } from "../types/media-tool";
import { MediaToolCard } from "./media-tool-card";

export function MediaToolsView() {
  const t = useTranslations("MediaTools");
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { key: MediaCategory; label: string; icon: React.ElementType }[] = [
    { key: "all", label: t("filterAll"), icon: Layers },
    { key: "image", label: t("filterImage"), icon: ImageIcon },
    { key: "video", label: t("filterVideo"), icon: VideoIcon },
    { key: "audio", label: t("filterAudio"), icon: Volume2 },
  ];

  const filteredTools = useMemo(() => {
    return MEDIA_TOOLS_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const title = t(`tools.${item.translationKey}.title`).toLowerCase();
      const desc = t(`tools.${item.translationKey}.description`).toLowerCase();
      const tagline = t(`tools.${item.translationKey}.tagline`).toLowerCase();
      const model = item.modelName.toLowerCase();

      return (
        title.includes(q) ||
        desc.includes(q) ||
        tagline.includes(q) ||
        model.includes(q)
      );
    });
  }, [selectedCategory, searchQuery, t]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        {/* Studio Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs sm:text-sm font-semibold mb-4 animate-in fade-in zoom-in-95 duration-300">
          <Sparkles className="size-4 animate-pulse" />
          <span>{t("badge")}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {t("titlePrefix")}{" "}
          <span className="text-brand drop-shadow-sm">
            {t("titleHighlight")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Controls Bar: Category Filters & Quick Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-card border border-border/70 backdrop-blur-sm shadow-xs w-full sm:w-auto overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.key;
            const count =
              cat.key === "all"
                ? MEDIA_TOOLS_DATA.length
                : MEDIA_TOOLS_DATA.filter((t) => t.category === cat.key).length;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap",
                  isSelected
                    ? "bg-brand text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="size-4" />
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full",
                    isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="size-4 absolute top-1/2 -translate-y-1/2 start-3 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("filterAll") + "..."}
            className="w-full h-10 ps-9 pe-3 text-xs sm:text-sm rounded-xl bg-card border border-border/70 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
          />
        </div>
      </div>

      {/* Grid of 5 Cards */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredTools.map((tool, idx) => (
            <MediaToolCard key={tool.id} item={tool} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-card border border-border/70">
          <Layers className="size-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-sm font-semibold text-foreground">
            لا توجد أدوات تطابق البحث المحدد
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-3 text-xs text-brand font-bold underline hover:opacity-80 cursor-pointer"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}
    </div>
  );
}


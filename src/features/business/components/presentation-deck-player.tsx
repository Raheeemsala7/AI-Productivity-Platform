"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Printer,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Sliders,
  Play,
  Presentation,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { GeneratedDeck, SlideItem } from "../types/presentation";

interface PresentationDeckPlayerProps {
  deck: GeneratedDeck;
  onBackToStudio: () => void;
}

export function PresentationDeckPlayer({
  deck,
  onBackToStudio,
}: PresentationDeckPlayerProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activeSlide: SlideItem =
    deck.slides[activeSlideIndex] || deck.slides[0];

  const handleNextSlide = () => {
    if (activeSlideIndex < deck.slides.length - 1) {
      setActiveSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex((prev) => prev - 1);
    }
  };

  // Theme gradient styles
  const themeBackdrop = {
    corporate: "from-purple-950/40 via-card to-background border-purple-500/30",
    emerald: "from-emerald-950/40 via-card to-background border-emerald-500/30",
    sunset: "from-amber-950/40 via-card to-background border-amber-500/30",
    obsidian: "from-slate-900/60 via-card to-background border-sky-500/30",
  }[deck.theme] || "from-purple-950/40 via-card to-background border-purple-500/30";

  const themeAccent = {
    corporate: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    sunset: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    obsidian: "text-sky-400 bg-sky-500/10 border-sky-500/30",
  }[deck.theme] || "text-purple-400 bg-purple-500/10 border-purple-500/30";

  return (
    <div
      className={cn(
        "w-full flex flex-col transition-all duration-300",
        isFullscreen
          ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-xl p-4 sm:p-8 overflow-y-auto"
          : "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      )}
    >
      {/* Top Deck Player Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-border/60 gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBackToStudio}
            className="text-xs h-9 cursor-pointer"
          >
            {isRtl ? <ArrowRight className="size-3.5" /> : <ArrowLeft className="size-3.5" />}
            <span>{isRtl ? "العودة للاستوديو" : "Back to Studio"}</span>
          </Button>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground truncate max-w-md">
              {deck.title}
            </h2>
            <p className="text-[11px] text-muted-foreground">
              {deck.slidesCount} {isRtl ? "شرائح احترافية معتمدة" : "AI Generated Slides"}
            </p>
          </div>
        </div>

        {/* Action Buttons: Present, Export PPTX, Fullscreen */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-xs h-9 px-3 cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="size-3.5" />
            ) : (
              <Maximize2 className="size-3.5" />
            )}
            <span className="hidden sm:inline">
              {isFullscreen
                ? isRtl ? "إنهاء العرض" : "Exit Fullscreen"
                : isRtl ? "عرض كامل" : "Fullscreen"}
            </span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => alert(isRtl ? "جاري تجهيز وتصدير ملف PowerPoint (PPTX)..." : "Exporting PowerPoint (PPTX)...")}
            className="text-xs h-9 px-3 cursor-pointer"
          >
            <Download className="size-3.5" />
            <span>{isRtl ? "تصدير PPTX" : "Export PPTX"}</span>
          </Button>

          <Button
            type="button"
            onClick={() => window.print()}
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold h-9 px-3.5 cursor-pointer shadow-md shadow-purple-500/20"
          >
            <Presentation className="size-3.5" />
            <span>{isRtl ? "بدء العرض (Present)" : "Present"}</span>
          </Button>
        </div>
      </div>

      {/* Main Presentation Stage: Thumbnails Bar + Active 16:9 Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Thumbnails Strip (3 cols) */}
        <div className="lg:col-span-3 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto max-h-[560px] p-1 no-scrollbar">
          {deck.slides.map((s, idx) => {
            const isCurrent = idx === activeSlideIndex;
            return (
              <div
                key={s.id}
                onClick={() => setActiveSlideIndex(idx)}
                className={cn(
                  "p-3 rounded-xl border text-start transition-all cursor-pointer flex-shrink-0 w-44 lg:w-full flex flex-col justify-between min-h-[84px]",
                  isCurrent
                    ? "bg-purple-500/15 border-purple-500 ring-2 ring-purple-500/30 shadow-md shadow-purple-500/10"
                    : "bg-muted/20 border-border/60 hover:bg-muted/40 hover:border-border"
                )}
              >
                <div className="flex items-center justify-between mb-1 text-[10px] text-muted-foreground font-mono">
                  <span>
                    {isRtl ? `شريحة ${idx + 1}` : `Slide ${idx + 1}`}
                  </span>
                  {isCurrent && (
                    <span className="size-1.5 rounded-full bg-purple-500 animate-pulse" />
                  )}
                </div>
                <p className="text-xs font-bold text-foreground line-clamp-1">
                  {s.title}
                </p>
                <p className="text-[10px] text-muted-foreground/80 line-clamp-1 mt-0.5">
                  {s.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Slide Canvas (9 cols) - Widescreen 16:9 Aspect Frame */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          <div
            className={cn(
              "w-full min-h-[460px] sm:min-h-[520px] rounded-2xl bg-gradient-to-br border p-6 sm:p-10 shadow-2xl relative flex flex-col justify-between overflow-hidden backdrop-blur-md",
              themeBackdrop
            )}
          >
            {/* Top Slide Meta: Badge + Slide Number */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
                  themeAccent
                )}
              >
                {deck.title}
              </span>

              <span className="text-xs font-mono font-bold text-white/70 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                {activeSlideIndex + 1} / {deck.slides.length}
              </span>
            </div>

            {/* Slide Body Content */}
            <div className="my-auto py-6 flex flex-col gap-4">
              <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {activeSlide.title}
              </h3>

              <p className="text-xs sm:text-base text-white/80 max-w-2xl font-normal leading-relaxed">
                {activeSlide.subtitle}
              </p>

              {/* Bullet Points */}
              <div className="mt-4 space-y-3">
                {activeSlide.bulletPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="size-4 text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Optional Metric Highlight Pill */}
              {activeSlide.metricHighlight && (
                <div className="self-start mt-2 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shadow-inner">
                  <TrendingUp className="size-4 text-emerald-400" />
                  <span className="text-xs text-white/80">
                    {activeSlide.metricHighlight.label}:
                  </span>
                  <span className="text-sm font-black font-mono text-emerald-400">
                    {activeSlide.metricHighlight.value}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Slide Footer Watermark */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] text-white/50 font-mono">
              <span>ORICO AI Slide Engine</span>
              <span>Theme: {deck.theme.toUpperCase()}</span>
            </div>
          </div>

          {/* Bottom Slide Controller Navigation */}
          <div className="flex items-center justify-between px-2">
            <Button
              type="button"
              variant="outline"
              disabled={activeSlideIndex === 0}
              onClick={handlePrevSlide}
              className="text-xs cursor-pointer font-bold px-4"
            >
              {isRtl ? <ArrowRight className="size-3.5" /> : <ArrowLeft className="size-3.5" />}
              <span>{isRtl ? "الشريحة السابقة" : "Previous Slide"}</span>
            </Button>

            <span className="text-xs font-mono font-bold text-muted-foreground">
              {activeSlideIndex + 1} {isRtl ? "من" : "of"} {deck.slides.length}
            </span>

            <Button
              type="button"
              disabled={activeSlideIndex === deck.slides.length - 1}
              onClick={handleNextSlide}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 cursor-pointer"
            >
              <span>{isRtl ? "الشريحة التالية" : "Next Slide"}</span>
              {isRtl ? <ArrowLeft className="size-3.5" /> : <ArrowRight className="size-3.5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


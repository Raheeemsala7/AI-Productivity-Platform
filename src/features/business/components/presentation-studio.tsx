"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Presentation,
  Send,
  Plus,
  Edit3,
  Trash2,
  Play,
  FileText,
  Sliders,
  ChevronDown,
  Layers,
  Globe,
  Palette,
  CheckCircle2,
  Clock,
  Maximize2,
  Check,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  presentationFormSchema,
  PresentationFormValues,
} from "../schema/presentation.schema";
import {
  RECENT_DECKS_MOCK,
  createMockGeneratedDeck,
} from "../data/presentation.mock";
import { GeneratedDeck, RecentDeckItem } from "../types/presentation";
import { PresentationDeckPlayer } from "./presentation-deck-player";

interface PresentationStudioProps {
  hideHeader?: boolean;
}

export function PresentationStudio({ hideHeader = false }: PresentationStudioProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("PresentationStudio");

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [activeDeck, setActiveDeck] = useState<GeneratedDeck | null>(null);
  const [recentDecks, setRecentDecks] =
    useState<RecentDeckItem[]>(RECENT_DECKS_MOCK);

  // React Hook Form initialization with Zod Schema Validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PresentationFormValues>({
    resolver: zodResolver(presentationFormSchema),
    defaultValues: {
      prompt: "",
      language: isRtl ? "ar" : "en",
      theme: "corporate",
      slidesCount: 8,
      tone: "persuasive",
      audience: "investors",
      format: "16:9",
    },
  });

  const selectedTheme = watch("theme");
  const selectedSlidesCount = watch("slidesCount");
  const selectedLanguage = watch("language");
  const selectedTone = watch("tone");
  const promptValue = watch("prompt");

  // Quick Prompt Chips
  const quickIdeas = [
    {
      id: "pitch",
      label: isRtl ? "عرض المستثمرين (Pitch Deck)" : "Seed Pitch Deck",
      text: isRtl
        ? "عرض تقديمي استثماري شامل لجمع جولة تمويل أولية، يوضح المشكلة والحل وحجم السوق ونموذج الإيرادات."
        : "An investor-ready pitch deck for seed fundraising covering problem, solution, TAM/SAM sizing, and financials.",
    },
    {
      id: "launch",
      label: isRtl ? "إطلاق منتج جديد (Product Launch)" : "Product Launch",
      text: isRtl
        ? "خطة إطلاق منتج رقمي جديد مع تسليط الضوء على الميزات التنافسية واستراتيجية اكتساب العملاء الأولى."
        : "Strategic product launch presentation highlighting key value differentiators and early user acquisition channels.",
    },
    {
      id: "review",
      label: isRtl ? "تقرير الأداء الفصلي (Q3 Review)" : "Quarterly Review",
      text: isRtl
        ? "تقرير تنفيذي فصلي لأداء الشركة ومؤشرات الإنجاز، مع التحديات والفرص للربع القادم."
        : "Quarterly executive performance review summarizing core KPIs, revenue growth, and upcoming strategic focus.",
    },
    {
      id: "marketing",
      label: isRtl ? "استراتيجية التسويق (Marketing)" : "Marketing Strategy",
      text: isRtl
        ? "عرض تقديمي لاستراتيجية التسويق الرقمي وبناء الوعي بالعلامة التجارية وزيادة التحويلات."
        : "A comprehensive digital marketing & brand positioning deck aimed at scaling conversions.",
    },
  ];

  const handleApplyQuickIdea = (text: string) => {
    setValue("prompt", text, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = (values: PresentationFormValues) => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      const generated = createMockGeneratedDeck(values);
      setActiveDeck(generated);

      // Add to recent list
      setRecentDecks((prev) => [
        {
          id: generated.id,
          title: generated.title,
          date: isRtl ? "الآن" : "Just now",
          slidesCount: generated.slidesCount,
          theme: generated.theme,
          color:
            generated.theme === "corporate"
              ? "#8b5cf6"
              : generated.theme === "emerald"
              ? "#10b981"
              : generated.theme === "sunset"
              ? "#f59e0b"
              : "#38bdf8",
        },
        ...prev,
      ]);
    }, 1800);
  };

  // Open a previous deck
  const handleOpenRecentDeck = (deck: RecentDeckItem) => {
    const mockFullDeck = createMockGeneratedDeck({
      prompt: deck.title,
      language: isRtl ? "ar" : "en",
      theme: deck.theme,
      slidesCount: deck.slidesCount,
      tone: "persuasive",
      audience: "investors",
      format: "16:9",
    });
    setActiveDeck(mockFullDeck);
  };

  const handleDeleteRecentDeck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentDecks((prev) => prev.filter((d) => d.id !== id));
  };

  // If a deck is open, render the full Presentation Deck Player
  if (activeDeck) {
    return (
      <PresentationDeckPlayer
        deck={activeDeck}
        onBackToStudio={() => setActiveDeck(null)}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Top Header & Breadcrumb (when standalone header not present) */}
      {!hideHeader && (
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/dashboard/business"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            {isRtl ? (
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            )}
            <span>{t("backLink")}</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="size-3.5 animate-pulse" />
            <span>{t("badge")}</span>
          </div>
        </div>
      )}

      {/* ========================================================
          HERO AI PRESENTATION STUDIO (Matching Reference Image)
      ======================================================== */}
      <div className="flex flex-col items-center text-center my-6 sm:my-10">
        {/* Glowing Center Icon Badge */}
        <div className="relative size-16 sm:size-18 rounded-3xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-purple-600/25 mb-5 animate-in zoom-in-90 duration-300">
          <Presentation className="size-8 sm:size-9" />
          <span className="absolute inset-0 rounded-3xl border-2 border-white/20 pointer-events-none" />
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight max-w-2xl">
          {t("heroTitle")}
        </h1>
        <p className="mt-2.5 text-xs sm:text-base text-muted-foreground max-w-xl">
          {t("heroSubtitle")}
        </p>

        {/* ========================================================
            MAIN PROMPT STUDIO CONTAINER (React Hook Form)
        ======================================================== */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl mt-8 flex flex-col gap-3"
        >
          {/* Glassmorphic Capsule Box */}
          <div className="relative rounded-3xl bg-card/90 border border-border/80 shadow-2xl p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 focus-within:border-purple-500/60 focus-within:ring-4 focus-within:ring-purple-500/10">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Textarea Input */}
            <textarea
              {...register("prompt")}
              rows={3}
              placeholder={t("promptPlaceholder")}
              className="w-full bg-transparent border-0 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0 resize-none leading-relaxed"
            />

            {/* Validation Error Message */}
            {errors.prompt && (
              <p className="text-[11px] text-destructive text-start mt-1 font-medium">
                {errors.prompt.message}
              </p>
            )}

            {/* In-Box Quick Setting Pills + Submit CTA Button */}
            <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
              {/* Left Setting Pills Strip */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {/* 1. Language Pill */}
                <div className="relative">
                  <select
                    {...register("language")}
                    className="h-8 px-2.5 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 text-[11px] font-semibold text-foreground focus:outline-none focus:border-purple-500 cursor-pointer appearance-none pe-6"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                  <Globe className="size-3 absolute top-1/2 -translate-y-1/2 end-2 text-muted-foreground pointer-events-none" />
                </div>

                {/* 2. Theme Pill */}
                <div className="relative">
                  <select
                    {...register("theme")}
                    className="h-8 px-2.5 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 text-[11px] font-semibold text-foreground focus:outline-none focus:border-purple-500 cursor-pointer appearance-none pe-6 capitalize"
                  >
                    <option value="corporate">Pearl / Corporate</option>
                    <option value="emerald">Emerald Green</option>
                    <option value="obsidian">Obsidian Dark</option>
                    <option value="sunset">Sunset Gold</option>
                  </select>
                  <Palette className="size-3 absolute top-1/2 -translate-y-1/2 end-2 text-muted-foreground pointer-events-none" />
                </div>

                {/* 3. Number of Slides Pill */}
                <div className="relative">
                  <select
                    {...register("slidesCount", { valueAsNumber: true })}
                    className="h-8 px-2.5 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 text-[11px] font-semibold text-foreground focus:outline-none focus:border-purple-500 cursor-pointer appearance-none pe-6 font-mono"
                  >
                    <option value={6}>6 {isRtl ? "شرائح" : "slides"}</option>
                    <option value={8}>8 {isRtl ? "شرائح" : "slides"}</option>
                    <option value={10}>10 {isRtl ? "شرائح" : "slides"}</option>
                    <option value={12}>12 {isRtl ? "شريحة" : "slides"}</option>
                  </select>
                  <Layers className="size-3 absolute top-1/2 -translate-y-1/2 end-2 text-muted-foreground pointer-events-none" />
                </div>

                {/* 4. Tone Pill */}
                <div className="relative">
                  <select
                    {...register("tone")}
                    className="h-8 px-2.5 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 text-[11px] font-semibold text-foreground focus:outline-none focus:border-purple-500 cursor-pointer appearance-none pe-6"
                  >
                    <option value="persuasive">{isRtl ? "إقناعي واستثماري" : "Persuasive"}</option>
                    <option value="executive">{isRtl ? "تنفيذي ومختصر" : "Executive"}</option>
                    <option value="educational">{isRtl ? "تعليمي ومبسط" : "Educational"}</option>
                  </select>
                  <Edit3 className="size-3 absolute top-1/2 -translate-y-1/2 end-2 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className={cn(
                  "size-10 sm:size-11 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg cursor-pointer shrink-0",
                  "bg-gradient-to-tr from-purple-700 to-purple-500 hover:from-purple-600 hover:to-indigo-500 shadow-purple-600/30 hover:scale-105 active:scale-95",
                  isGenerating && "opacity-60 cursor-not-allowed hover:scale-100"
                )}
                title={t("generateBtn")}
              >
                {isGenerating ? (
                  <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="size-4.5 rtl:-scale-x-100" />
                )}
              </button>
            </div>
          </div>

          {/* Quick Ideas Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground me-1">
              {t("quickIdeas")}:
            </span>
            {quickIdeas.map((idea) => (
              <button
                key={idea.id}
                type="button"
                onClick={() => handleApplyQuickIdea(idea.text)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50 hover:border-purple-500/40 transition-all cursor-pointer"
              >
                {idea.label}
              </button>
            ))}
          </div>

          {/* Collapsible Advanced Options Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-purple-400 transition-colors cursor-pointer py-1"
            >
              <Sliders className="size-3 text-purple-400" />
              <span>{t("advancedOptions")}</span>
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform",
                  showAdvanced && "rotate-180"
                )}
              />
            </button>

            {/* Advanced Options Content Drawer */}
            {showAdvanced && (
              <div className="mt-3 p-4 rounded-2xl bg-card border border-border/70 shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-4 text-start animate-in fade-in duration-200">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {t("audience")}
                  </label>
                  <select
                    {...register("audience")}
                    className="h-10 px-3 rounded-xl bg-background border border-border/70 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
                  >
                    <option value="investors">
                      {isRtl ? "مستثمرون ورؤوس أموال جريئة" : "Venture Capital & Investors"}
                    </option>
                    <option value="clients">
                      {isRtl ? "عملاء وشركات تجارية (B2B Clients)" : "Enterprise B2B Clients"}
                    </option>
                    <option value="internal">
                      {isRtl ? "فريق العمل الداخلي والمدراء" : "Internal Team & Leadership"}
                    </option>
                    <option value="conference">
                      {isRtl ? "مؤتمرات عامة وجمهور تقني" : "Public Tech Keynotes"}
                    </option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {t("format")}
                  </label>
                  <select
                    {...register("format")}
                    className="h-10 px-3 rounded-xl bg-background border border-border/70 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer font-mono"
                  >
                    <option value="16:9">16:9 {isRtl ? "شاشة عريضة (Widescreen)" : "Widescreen"}</option>
                    <option value="4:3">4:3 {isRtl ? "كلاسيكي (Standard)" : "Standard"}</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* ========================================================
          RECENT PRESENTATIONS GRID (Matching Reference Image)
      ======================================================== */}
      <div className="mt-12 sm:mt-16 pt-8 border-t border-border/60">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              {t("recentTitle")}
            </h2>
            <span className="text-xs text-muted-foreground font-mono">
              ({recentDecks.length})
            </span>
          </div>

          <button
            type="button"
            className="text-xs font-bold text-purple-400 hover:underline cursor-pointer"
          >
            {t("viewAll")}
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Card 0: Create Blank Deck */}
          <div
            onClick={() => {
              setValue("prompt", "");
              window.scrollTo({ top: 180, behavior: "smooth" });
            }}
            className="group rounded-2xl border-2 border-dashed border-border/80 hover:border-purple-500/60 p-5 flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px] transition-all duration-300 bg-muted/10 hover:bg-muted/30"
          >
            <div className="size-11 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-110 flex items-center justify-center transition-transform mb-3">
              <Plus className="size-5" />
            </div>
            <p className="text-xs font-bold text-foreground">
              {t("newDeck")}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {isRtl ? "البدء من الصفر" : "Start from blank prompt"}
            </p>
          </div>

          {/* Recent Decks Cards */}
          {recentDecks.map((deck) => (
            <div
              key={deck.id}
              onClick={() => handleOpenRecentDeck(deck)}
              className="group rounded-2xl bg-card border border-border/70 hover:border-purple-500/50 p-3.5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[220px]"
            >
              {/* Top Miniature Slide Deck Graphic Mockup */}
              <div className="relative h-28 w-full rounded-xl bg-stone-950 p-2.5 overflow-hidden flex flex-col justify-between border border-white/10 group-hover:border-purple-500/30 transition-colors">
                {/* Layered Deck Effect Top Tabs */}
                <div className="flex items-center gap-1.5 opacity-60">
                  <div className="h-1 w-6 rounded-full" style={{ backgroundColor: deck.color }} />
                  <div className="h-1 w-4 rounded-full bg-white/20" />
                </div>

                {/* Simulated Content lines */}
                <div className="space-y-1.5 my-auto">
                  <div className="h-1.5 w-3/4 bg-white/70 rounded-full" />
                  <div className="h-1 w-1/2 bg-white/30 rounded-full" />
                  <div className="h-1 w-2/3 bg-white/20 rounded-full" />
                </div>

                {/* Slide Count badge bottom right */}
                <div className="flex items-center justify-between text-[9px] text-white/60 font-mono">
                  <span>16:9</span>
                  <span
                    className="px-1.5 py-0.2 rounded font-bold"
                    style={{ backgroundColor: `${deck.color}25`, color: deck.color }}
                  >
                    {deck.slidesCount} {isRtl ? "شرائح" : "slides"}
                  </span>
                </div>
              </div>

              {/* Card Body Info */}
              <div className="mt-3 text-start">
                <h4 className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-purple-400 transition-colors">
                  {deck.title}
                </h4>
                <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-2.5" />
                    <span>{deck.date}</span>
                  </span>
                  <span className="font-mono font-semibold">
                    {deck.slidesCount} {isRtl ? "شرائح" : "slides"}
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleOpenRecentDeck(deck)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-purple-400 hover:bg-muted/40 transition-colors cursor-pointer"
                  title={isRtl ? "تعديل وعرض" : "Edit & Present"}
                >
                  <Edit3 className="size-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenRecentDeck(deck)}
                  className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-500/15 transition-colors cursor-pointer"
                  title={isRtl ? "بدء العرض" : "Present"}
                >
                  <Play className="size-3.5 fill-current" />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDeleteRecentDeck(deck.id, e)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                  title={isRtl ? "حذف" : "Delete"}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


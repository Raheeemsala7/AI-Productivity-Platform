"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Sparkles,
  Presentation,
  Globe,
  FileText,
  Smartphone,
  Image as ImageIcon,
  Wand2,
  FolderInput,
  SlidersHorizontal,
  Mic,
  Plus,
  X,
  Play,
  Edit3,
  Trash2,
  ChevronDown,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  Palette,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  presentationFormSchema,
  PresentationFormValues,
} from "../schema/presentation.schema";
import {
  RECENT_CREATIONS_MOCK,
  createMockGeneratedDeck,
  createMockGeneratedLandingPage,
} from "../data/presentation.mock";
import {
  CreationMode,
  GeneratedDeck,
  GeneratedLandingPage,
  RecentCreationItem,
} from "../types/presentation";
import { PresentationDeckPlayer } from "./presentation-deck-player";
import { LandingPageStudioPreview } from "./landing-page-studio-preview";

interface PresentationStudioProps {
  initialMode?: string;
  hideHeader?: boolean;
}

export function PresentationStudio({
  initialMode,
  hideHeader = false,
}: PresentationStudioProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("PresentationStudio");

  // Determine starting mode from prop or default to "general"
  const validInitialMode: CreationMode =
    initialMode === "landing"
      ? "landing"
      : initialMode === "presentation"
      ? "presentation"
      : initialMode === "document"
      ? "document"
      : initialMode === "carousel"
      ? "carousel"
      : "general";

  const [activeMode, setActiveMode] = useState<CreationMode>(validInitialMode);
  const [modelType, setModelType] = useState<"lite" | "pro">("lite");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"all" | "presentation" | "landing">("all");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Active generation results
  const [activeDeck, setActiveDeck] = useState<GeneratedDeck | null>(null);
  const [activeLandingPage, setActiveLandingPage] =
    useState<GeneratedLandingPage | null>(null);

  // Recent creations list
  const [recentCreations, setRecentCreations] =
    useState<RecentCreationItem[]>(RECENT_CREATIONS_MOCK);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mode configuration matching the user's uploaded images
  const MODE_CONFIG = {
    general: {
      labelAr: "عام",
      labelEn: "General",
      icon: Sparkles,
      placeholderAr: "ماذا تريد أن تصنع؟ صِف فكرتك بحرية...",
      placeholderEn: "What do you want to make?",
      badgeClass:
        "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    },
    presentation: {
      labelAr: "عرض تقديمي",
      labelEn: "Presentation",
      icon: Presentation,
      placeholderAr:
        "صف موضوع العرض التقديمي... مثال: عرض استثماري لشركة ناشئة في الذكاء الاصطناعي في السعودية",
      placeholderEn: "Describe your presentation topic",
      badgeClass:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800",
    },
    landing: {
      labelAr: "صفحة هبوط",
      labelEn: "Landing Page",
      icon: Globe,
      placeholderAr:
        "صف صفحة الهبوط المطلوبة، المنتج أو الخدمة، القيمة المضافة، والجمهور المستهدف...",
      placeholderEn: "Describe your landing page, product, or target audience",
      badgeClass:
        "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/70 dark:text-sky-300 dark:border-sky-800",
    },
    document: {
      labelAr: "مستند",
      labelEn: "Document",
      icon: FileText,
      placeholderAr: "صف موضوع المستند، خطة العمل أو التقرير المقترح...",
      placeholderEn: "Describe your document or report topic",
      badgeClass:
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800",
    },
    carousel: {
      labelAr: "كاروسيل",
      labelEn: "Carousel",
      icon: Smartphone,
      placeholderAr: "صف فكرة شرائح الكاروسيل أو منشور التواصل الاجتماعي...",
      placeholderEn: "Describe your carousel or social slide topic",
      badgeClass:
        "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800",
    },
  };

  const activeConfig = MODE_CONFIG[activeMode] || MODE_CONFIG.general;

  // React Hook Form initialization
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
      mode: validInitialMode,
      language: isRtl ? "ar" : "en",
      theme: "corporate",
      slidesCount: 8,
      sectionsCount: 5,
      tone: "persuasive",
      audience: "investors",
      format: "16:9",
      model: "lite",
    },
  });

  const promptValue = watch("prompt") || "";
  const selectedTheme = watch("theme");
  const selectedSlidesCount = watch("slidesCount");
  const selectedSectionsCount = watch("sectionsCount");
  const selectedLanguage = watch("language");
  const selectedTone = watch("tone");

  // Keep form mode in sync with activeMode
  useEffect(() => {
    setValue("mode", activeMode);
  }, [activeMode, setValue]);

  // Mode Selection Handlers
  const handleSelectMode = (mode: CreationMode) => {
    setActiveMode(mode);
    setValue("mode", mode);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  const handleClearMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMode("general");
    setValue("mode", "general");
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  // Quick Prompt Chips
  const quickIdeas = [
    {
      id: "pitch",
      mode: "presentation" as CreationMode,
      label: isRtl ? "عرض استثماري (Pitch Deck)" : "Seed Pitch Deck",
      text: isRtl
        ? "عرض تقديمي استثماري شامل لجولة تمويل بذرة، يوضح المشكلة والحل ونموذج العمل والنمو المالي."
        : "An investor-ready pitch deck for seed fundraising covering problem, solution, TAM/SAM sizing, and unit economics.",
    },
    {
      id: "landing",
      mode: "landing" as CreationMode,
      label: isRtl ? "صفحة هبوط SaaS (Landing Page)" : "SaaS Landing Page",
      text: isRtl
        ? "صفحة هبوط حديثة وعالية التحويل لمنصة ذكاء اصطناعي موجهة للشركات الناشئة مع أسعار وتجارب عملاء."
        : "High-converting modern landing page for an enterprise AI productivity tool with live features and pricing tiers.",
    },
    {
      id: "launch",
      mode: "presentation" as CreationMode,
      label: isRtl ? "إطلاق منتج جديد (Product Launch)" : "Product Launch",
      text: isRtl
        ? "خطة وعرض إطلاق منتج تقني جديد يبرز الميزات التنافسية والقيمة للعملاء المستهدفين."
        : "Strategic product launch presentation highlighting key value differentiators and early user acquisition channels.",
    },
  ];

  const handleApplyQuickIdea = (idea: (typeof quickIdeas)[0]) => {
    setActiveMode(idea.mode);
    setValue("mode", idea.mode);
    setValue("prompt", idea.text, { shouldValidate: true, shouldDirty: true });
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  // Form submission: triggers generation
  const onSubmit = (values: PresentationFormValues) => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      if (values.mode === "landing") {
        const generatedLanding = createMockGeneratedLandingPage(values);
        setActiveLandingPage(generatedLanding);
        setRecentCreations((prev) => [
          {
            id: generatedLanding.id,
            title: generatedLanding.title,
            type: "landing",
            date: isRtl ? "الآن" : "Just now",
            count: generatedLanding.sectionsCount,
            slidesCount: generatedLanding.sectionsCount,
            theme: generatedLanding.theme,
            color: "#0ea5e9",
          },
          ...prev,
        ]);
      } else {
        // Presentation (or default)
        const generatedDeck = createMockGeneratedDeck(values);
        setActiveDeck(generatedDeck);
        setRecentCreations((prev) => [
          {
            id: generatedDeck.id,
            title: generatedDeck.title,
            type: "presentation",
            date: isRtl ? "الآن" : "Just now",
            count: generatedDeck.slidesCount,
            slidesCount: generatedDeck.slidesCount,
            theme: generatedDeck.theme,
            color:
              generatedDeck.theme === "corporate"
                ? "#8b5cf6"
                : generatedDeck.theme === "emerald"
                ? "#10b981"
                : generatedDeck.theme === "sunset"
                ? "#f59e0b"
                : "#38bdf8",
          },
          ...prev,
        ]);
      }
    }, 1600);
  };

  // Open a previous creation
  const handleOpenCreation = (item: RecentCreationItem) => {
    if (item.type === "landing") {
      const mockLanding = createMockGeneratedLandingPage({
        prompt: item.title,
        mode: "landing",
        language: isRtl ? "ar" : "en",
        theme: item.theme,
        slidesCount: 8,
        sectionsCount: item.count,
        tone: "persuasive",
        audience: "investors",
        format: "16:9",
        model: "lite",
      });
      setActiveLandingPage(mockLanding);
    } else {
      const mockDeck = createMockGeneratedDeck({
        prompt: item.title,
        mode: "presentation",
        language: isRtl ? "ar" : "en",
        theme: item.theme,
        slidesCount: item.count,
        sectionsCount: 5,
        tone: "persuasive",
        audience: "investors",
        format: "16:9",
        model: "lite",
      });
      setActiveDeck(mockDeck);
    }
  };

  const handleDeleteCreation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentCreations((prev) => prev.filter((d) => d.id !== id));
  };

  // Filtered recent items
  const filteredCreations = recentCreations.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  // If a deck is open, render the interactive Presentation Deck Player
  if (activeDeck) {
    return (
      <PresentationDeckPlayer
        deck={activeDeck}
        onBackToStudio={() => setActiveDeck(null)}
      />
    );
  }

  // If a landing page is open, render the interactive Landing Page Studio Preview
  if (activeLandingPage) {
    return (
      <LandingPageStudioPreview
        page={activeLandingPage}
        onBackToStudio={() => setActiveLandingPage(null)}
      />
    );
  }

  const isInputFilled = promptValue.trim().length > 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 flex flex-col items-center">
      {/* Top Header & Breadcrumb (when standalone header not present) */}
      {!hideHeader && (
        <div className="w-full flex items-center justify-between gap-4 mb-6">
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
          HERO TITLE (Matching Reference: "No magic words required")
      ======================================================== */}
      <div className="text-center mt-2 sm:mt-6 mb-8 sm:mb-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          {t("heroTitle")}
        </h1>
        <p className="mt-2.5 text-xs sm:text-base text-muted-foreground">
          {t("heroSubtitle")}
        </p>
      </div>

      {/* ========================================================
          MAIN PROMPT INPUT CAPSULE (Matching Gamma / Screenshots)
      ======================================================== */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl flex flex-col items-center gap-4"
      >
        <div
          className={cn(
            "w-full rounded-[24px] sm:rounded-[28px] border transition-all duration-200 p-4 sm:p-5 relative shadow-md",
            "bg-card/95 border-border/80 dark:border-border/60 hover:border-blue-400/60 dark:hover:border-blue-500/40",
            "focus-within:ring-3 focus-within:ring-blue-500/20 focus-within:border-blue-500/80 shadow-blue-500/5",
            isGenerating && "opacity-60 pointer-events-none"
          )}
        >
          {/* Active Mode Pill Badge (Inside Prompt Box - Image 2) */}
          {activeMode !== "general" && (
            <div className="flex items-center mb-2.5">
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border shadow-xs animate-in fade-in zoom-in-95",
                  activeConfig.badgeClass
                )}
              >
                <activeConfig.icon className="size-3.5 shrink-0" />
                <span>{isRtl ? activeConfig.labelAr : activeConfig.labelEn}</span>
                <button
                  type="button"
                  onClick={handleClearMode}
                  title="Remove filter"
                  className="size-4 rounded-full hover:bg-black/10 dark:hover:bg-white/10 inline-flex items-center justify-center transition-colors cursor-pointer ml-1 rtl:ml-0 rtl:mr-1"
                >
                  <X className="size-3" />
                </button>
              </div>
            </div>
          )}

          {/* Textarea Input with Dynamic Placeholder */}
          <textarea
            {...register("prompt")}
            ref={(e) => {
              register("prompt").ref(e);
              // @ts-ignore
              textareaRef.current = e;
            }}
            rows={2}
            placeholder={
              isRtl ? activeConfig.placeholderAr : activeConfig.placeholderEn
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
            className="w-full bg-transparent resize-none outline-none text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 font-normal leading-relaxed min-h-[56px] sm:min-h-[64px]"
          />

          {/* Prompt error message */}
          {errors.prompt && (
            <p className="text-xs text-rose-500 mt-1">{errors.prompt.message}</p>
          )}

          {/* Capsule Bottom Toolbar (Tools & Actions) */}
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-border/40 gap-2">
            {/* Left: Plus Button (Attach / Inspirations) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                title="Add context or attachment"
                className="size-8 sm:size-9 rounded-full border border-border/80 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              >
                <Plus className="size-4" />
              </button>

              {/* Quick attachment / template dropdown */}
              {showAttachmentMenu && (
                <div className="absolute top-full mt-2 start-0 z-30 w-64 rounded-2xl border border-border bg-popover p-2 shadow-xl animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1 text-[11px] font-bold text-muted-foreground uppercase">
                    {isRtl ? "إضافة سريعة" : "Quick Add"}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setValue(
                        "prompt",
                        isRtl
                          ? "استخدم نبرة تسويقية مقنعة موجهة للمستثمرين وصناديق رأس المال الجريء."
                          : "Use a persuasive investor-ready tone tailored for venture capitalists."
                      );
                      setShowAttachmentMenu(false);
                    }}
                    className="w-full text-start px-2.5 py-1.5 rounded-lg text-xs hover:bg-muted text-foreground transition-colors cursor-pointer"
                  >
                    💡 {isRtl ? "نبرة المستثمرين" : "Investor Tone"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setValue(
                        "prompt",
                        isRtl
                          ? "قم بتضمين مؤشرات أداء رئيسية (KPIs) ونموذج إيرادات واضح."
                          : "Include comprehensive KPIs and verified revenue model."
                      );
                      setShowAttachmentMenu(false);
                    }}
                    className="w-full text-start px-2.5 py-1.5 rounded-lg text-xs hover:bg-muted text-foreground transition-colors cursor-pointer"
                  >
                    📊 {isRtl ? "إضافة مؤشرات مالية" : "Financial KPIs"}
                  </button>
                </div>
              )}
            </div>

            {/* Right: Settings, Image, Model Dropdown, Mic, Submit Button */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Sliders / Options Toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                title="Advanced options"
                className={cn(
                  "size-8 sm:size-9 rounded-xl flex items-center justify-center transition-all cursor-pointer",
                  showAdvanced
                    ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <SlidersHorizontal className="size-4" />
              </button>

              {/* Image / Visuals Mode Toggle */}
              <button
                type="button"
                onClick={() => {
                  setValue("theme", selectedTheme === "sunset" ? "corporate" : "sunset");
                }}
                title="Visual styling"
                className="size-8 sm:size-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-center transition-all cursor-pointer"
              >
                <ImageIcon className="size-4" />
              </button>

              {/* Model Selector Pill (Lite ▾ / Pro ▾) */}
              <button
                type="button"
                onClick={() => {
                  const nextModel = modelType === "lite" ? "pro" : "lite";
                  setModelType(nextModel);
                  setValue("model", nextModel);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-muted/60 hover:bg-muted border border-border/60 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span className="font-mono">{modelType === "lite" ? "Lite" : "Pro"}</span>
                <ChevronDown className="size-3 text-muted-foreground/80" />
              </button>

              {/* Voice / Mic simulation */}
              <button
                type="button"
                title="Dictate with voice"
                onClick={() => {
                  setValue(
                    "prompt",
                    isRtl
                      ? "عرض تقديمي لشركة ناشئة تقدم حلول اللوجستيات الذكية في الرياض"
                      : "Pitch deck for an intelligent logistics startup based in Riyadh"
                  );
                }}
                className="size-8 sm:size-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-center transition-all cursor-pointer"
              >
                <Mic className="size-4" />
              </button>

              {/* Submit Up-Arrow Button (Image 1 & 2) */}
              <button
                type="submit"
                disabled={isGenerating || !isInputFilled}
                title="Generate"
                className={cn(
                  "size-8 sm:size-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm",
                  isInputFilled
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30 active:scale-95"
                    : "bg-muted text-muted-foreground/60 cursor-not-allowed"
                )}
              >
                {isGenerating ? (
                  <Sparkles className="size-4 animate-spin text-white" />
                ) : (
                  <ArrowUp className="size-4 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            TOOL PILL BUTTONS (Below Capsule - Matching Image 1)
        ======================================================== */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-1">
          {/* 1. Presentation Pill */}
          <button
            type="button"
            onClick={() => handleSelectMode("presentation")}
            className={cn(
              "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs",
              activeMode === "presentation"
                ? "border-blue-500/80 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:border-blue-600 dark:text-blue-300 font-bold"
                : "border-border/80 bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground"
            )}
          >
            <Presentation className="size-4 text-blue-500" />
            <span>{isRtl ? "عرض تقديمي" : "Presentation"}</span>
          </button>

          {/* 2. Landing Page Pill */}
          <button
            type="button"
            onClick={() => handleSelectMode("landing")}
            className={cn(
              "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs",
              activeMode === "landing"
                ? "border-sky-500/80 bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:border-sky-600 dark:text-sky-300 font-bold"
                : "border-border/80 bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground"
            )}
          >
            <Globe className="size-4 text-sky-500" />
            <span>{isRtl ? "صفحة هبوط" : "Landing Page"}</span>
          </button>

          {/* 3. Document Pill */}
          <button
            type="button"
            onClick={() => handleSelectMode("document")}
            className={cn(
              "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs",
              activeMode === "document"
                ? "border-emerald-500/80 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-600 dark:text-emerald-300 font-bold"
                : "border-border/80 bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="size-4 text-emerald-500" />
            <span>{isRtl ? "مستند" : "Document"}</span>
          </button>

          {/* 4. Carousel Pill */}
          <button
            type="button"
            onClick={() => handleSelectMode("carousel")}
            className={cn(
              "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs",
              activeMode === "carousel"
                ? "border-purple-500/80 bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:border-purple-600 dark:text-purple-300 font-bold"
                : "border-border/80 bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground"
            )}
          >
            <Smartphone className="size-4 text-purple-500" />
            <span>{isRtl ? "كاروسيل" : "Carousel"}</span>
          </button>

          {/* 5. Image Generation Pill */}
          <button
            type="button"
            onClick={() => {
              setValue(
                "prompt",
                isRtl
                  ? "توليد صورة فوتوغرافية فائقة الدقة لبيئة عمل رقمية عصرية وذكية"
                  : "Generate a hyper-realistic photorealistic image of modern AI enterprise workspace"
              );
            }}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/80 bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <ImageIcon className="size-4 text-amber-500" />
            <span>{isRtl ? "صورة" : "Image"}</span>
          </button>

          {/* 6. Beautify Pill */}
          <button
            type="button"
            onClick={() => {
              if (promptValue) {
                setValue(
                  "prompt",
                  promptValue +
                    (isRtl
                      ? " — ركز على تصميم بصري مذهل وألوان عصرية ونصوص بيعية مقنعة."
                      : " — Polish with high conversion copy, modern typography, and clean contrast.")
                );
              }
            }}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/80 bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Wand2 className="size-4 text-pink-500" />
            <span>{isRtl ? "تحسين وتنسيق" : "Beautify"}</span>
          </button>

          {/* 7. Import Pill */}
          <button
            type="button"
            onClick={() => setShowAttachmentMenu(true)}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/80 bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <FolderInput className="size-4 text-indigo-500" />
            <span>{isRtl ? "استيراد" : "Import"}</span>
          </button>
        </div>

        {/* ========================================================
            ADVANCED OPTIONS ACCORDION (Settings & Configuration)
        ======================================================== */}
        {showAdvanced && (
          <div className="w-full mt-2 p-5 rounded-2xl bg-card border border-border/80 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-4">
              <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-blue-500" />
                {t("advancedOptions")}
              </span>
              <button
                type="button"
                onClick={() => setShowAdvanced(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {isRtl ? "إغلاق" : "Close"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Language */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  {isRtl ? "لغة المحتوى" : "Language"}
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) =>
                    setValue("language", e.target.value as "ar" | "en")
                  }
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="ar">العربية (Arabic)</option>
                  <option value="en">English (US)</option>
                </select>
              </div>

              {/* Theme / Palette */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  {isRtl ? "لوحة الألوان" : "Theme Palette"}
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) =>
                    setValue("theme", e.target.value as any)
                  }
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="corporate">🟣 Corporate (Purple)</option>
                  <option value="obsidian">🔵 Obsidian (Sky)</option>
                  <option value="emerald">🟢 Emerald (Green)</option>
                  <option value="sunset">🟠 Sunset (Amber)</option>
                </select>
              </div>

              {/* Slides / Section Count */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  {activeMode === "landing"
                    ? isRtl
                      ? "عدد الأقسام"
                      : "Sections Count"
                    : isRtl
                    ? "عدد الشرائح"
                    : "Slides Count"}
                </label>
                {activeMode === "landing" ? (
                  <select
                    value={selectedSectionsCount}
                    onChange={(e) =>
                      setValue("sectionsCount", Number(e.target.value))
                    }
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value={4}>4 {isRtl ? "أقسام" : "Sections"}</option>
                    <option value={5}>5 {isRtl ? "أقسام (مثالي)" : "Sections (Ideal)"}</option>
                    <option value={6}>6 {isRtl ? "أقسام" : "Sections"}</option>
                  </select>
                ) : (
                  <select
                    value={selectedSlidesCount}
                    onChange={(e) =>
                      setValue("slidesCount", Number(e.target.value))
                    }
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value={6}>6 {isRtl ? "شرائح" : "Slides"}</option>
                    <option value={8}>8 {isRtl ? "شرائح (مثالي)" : "Slides (Ideal)"}</option>
                    <option value={10}>10 {isRtl ? "شرائح" : "Slides"}</option>
                    <option value={12}>12 {isRtl ? "شريحة" : "Slides"}</option>
                  </select>
                )}
              </div>

              {/* Tone */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  {isRtl ? "نبرة الصوت" : "Tone"}
                </label>
                <select
                  value={selectedTone}
                  onChange={(e) =>
                    setValue("tone", e.target.value as any)
                  }
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="persuasive">{isRtl ? "مقنعة ومحفزة" : "Persuasive"}</option>
                  <option value="executive">{isRtl ? "تنفيذية استراتيجية" : "Executive"}</option>
                  <option value="creative">{isRtl ? "إبداعية ملهمة" : "Creative"}</option>
                  <option value="educational">{isRtl ? "تعليمية ومفصلة" : "Educational"}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Quick Ideas Chips */}
        <div className="w-full flex items-center justify-center gap-2 mt-2 flex-wrap">
          <span className="text-xs text-muted-foreground/70 font-medium">
            {t("quickIdeas")}:
          </span>
          {quickIdeas.map((idea) => (
            <button
              key={idea.id}
              type="button"
              onClick={() => handleApplyQuickIdea(idea)}
              className="px-2.5 py-1 rounded-lg text-xs bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50 transition-colors cursor-pointer"
            >
              {idea.label}
            </button>
          ))}
        </div>
      </form>

      {/* ========================================================
          SUGGESTED TEMPLATES / RECENT CREATIONS SECTION
      ======================================================== */}
      <section className="w-full mt-14 sm:mt-18 pt-8 border-t border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              {t("recentTitle")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("suggestedTemplates")}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-muted/60 border border-border/70 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={cn(
                "px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer",
                activeTab === "all"
                  ? "bg-background text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("tabAll")}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("presentation")}
              className={cn(
                "px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer",
                activeTab === "presentation"
                  ? "bg-background text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("tabPresentations")}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("landing")}
              className={cn(
                "px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer",
                activeTab === "landing"
                  ? "bg-background text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("tabLanding")}
            </button>
          </div>
        </div>

        {/* Creations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Create New */}
          <button
            type="button"
            onClick={() => {
              setActiveMode("general");
              reset();
              textareaRef.current?.focus();
            }}
            className="group relative h-48 sm:h-52 rounded-2xl border-2 border-dashed border-border/80 hover:border-blue-500/60 bg-muted/20 hover:bg-blue-500/5 transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer"
          >
            <div className="size-11 rounded-2xl bg-muted group-hover:bg-blue-500 group-hover:text-white text-muted-foreground flex items-center justify-center transition-all shadow-xs mb-3">
              <Plus className="size-6 transition-transform group-hover:rotate-90" />
            </div>
            <span className="text-sm font-bold text-foreground">
              {t("newDeck")}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {isRtl ? "ابدأ بفكرة جديدة" : "Start from prompt"}
            </span>
          </button>

          {/* Recent Creations Cards */}
          {filteredCreations.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenCreation(item)}
              className="group relative h-48 sm:h-52 rounded-2xl border border-border/80 bg-card hover:border-border hover:shadow-xl hover:shadow-black/5 transition-all flex flex-col justify-between p-4 cursor-pointer overflow-hidden"
            >
              {/* Top Graphic Header */}
              <div className="w-full h-18 rounded-xl bg-muted/40 border border-border/50 p-2.5 flex flex-col justify-between relative overflow-hidden">
                <div
                  className="h-1.5 w-14 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="space-y-1">
                  <div className="h-1 w-24 rounded-full bg-muted-foreground/20" />
                  <div className="h-1 w-16 rounded-full bg-muted-foreground/15" />
                </div>
                <div className="absolute end-2 bottom-2">
                  {item.type === "landing" ? (
                    <Globe className="size-4 text-sky-500" />
                  ) : (
                    <Presentation className="size-4 text-purple-500" />
                  )}
                </div>
              </div>

              {/* Title & Type Badge */}
              <div className="my-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                      item.type === "landing"
                        ? "bg-sky-500/10 text-sky-500"
                        : "bg-purple-500/10 text-purple-500"
                    )}
                  >
                    {item.type === "landing"
                      ? isRtl
                        ? "صفحة هبوط"
                        : "Landing"
                      : isRtl
                      ? "عرض تقديمي"
                      : "Deck"}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {item.count}{" "}
                    {item.type === "landing"
                      ? isRtl
                        ? "أقسام"
                        : "sections"
                      : isRtl
                      ? "شرائح"
                      : "slides"}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Bottom Meta & Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {item.date}
                </span>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCreation(item);
                    }}
                    title="Open"
                    className="p-1 rounded-md hover:bg-muted text-foreground"
                  >
                    <Play className="size-3.5 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteCreation(item.id, e)}
                    title="Delete"
                    className="p-1 rounded-md hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

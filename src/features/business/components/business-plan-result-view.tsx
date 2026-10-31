"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Presentation,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Target,
  FileText,
  DollarSign,
  TrendingUp,
  Building2,
  Users,
  Layers,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Dumbbell,
  Search,
  Crosshair,
  Bomb,
  Handshake,
  Activity,
  HeartHandshake,
  Share2 as ShareIcon,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  BusinessPlanSectionId,
  BusinessPlanResultResponse,
} from "../types/business-plan-result";
import { getMockBusinessPlanResult } from "../data/business-plan-result.mock";

export function BusinessPlanResultView() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [activeSection, setActiveSection] =
    useState<BusinessPlanSectionId>("idea-evaluation");
  const [data, setData] = useState<BusinessPlanResultResponse>(() =>
    getMockBusinessPlanResult()
  );
  const [isCopied, setIsCopied] = useState(false);

  // Load any submitted custom form data from sessionStorage if present
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("latest_business_plan_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(getMockBusinessPlanResult(parsed));
      }
    } catch {
      // Fallback to default mock
    }
  }, []);

  const handleCopyLink = () => {
    setIsCopied(true);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const sectionsList: {
    id: BusinessPlanSectionId;
    labelEn: string;
    labelAr: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    {
      id: "idea-evaluation",
      labelEn: "Idea Evaluation",
      labelAr: "تقييم الفكرة والجدوى",
      icon: Lightbulb,
      badge: "8.6/10",
    },
    {
      id: "business-plan",
      labelEn: "Business Plan",
      labelAr: "الملخص التنفيذي والرؤية",
      icon: Building2,
    },
    {
      id: "marketing-analysis",
      labelEn: "Marketing analysis",
      labelAr: "التحليل التسويقي والميزانية",
      icon: BarChart3,
    },
    {
      id: "sales-strategy",
      labelEn: "Sales Strategy",
      labelAr: "استراتيجية المبيعات والتسعير",
      icon: DollarSign,
    },
    {
      id: "swot-analysis",
      labelEn: "SWOT Analysis",
      labelAr: "مصفوفة SWOT للمنافسين",
      icon: Target,
    },
    {
      id: "business-model-canvas",
      labelEn: "Business Model Canvas",
      labelAr: "مخطط نموذج العمل (BMC)",
      icon: Layers,
    },
    {
      id: "strategic-plan",
      labelEn: "Strategic Plan",
      labelAr: "الخطة الاستراتيجية والمراحل",
      icon: TrendingUp,
    },
    {
      id: "risk-assessment",
      labelEn: "Risk Assessment",
      labelAr: "إدارة المخاطر والحلول",
      icon: AlertTriangle,
    },
    {
      id: "financial-plan",
      labelEn: "Financial Plan",
      labelAr: "التوقعات المالية والتعادل",
      icon: FileText,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      {/* Top Breadcrumb & Quick Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-border/60 gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/business/business-plan"
            className="p-2 rounded-xl bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title={isRtl ? "تعديل البيانات" : "Edit Inputs"}
          >
            {isRtl ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-foreground">
                {data.companyName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/25">
                {isRtl ? "معتمد للاستثمار" : "Investor Ready"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {data.tagline}
            </p>
          </div>
        </div>

        {/* Global Toolbar: Print, Share, Edit */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCopyLink}
            className="text-xs cursor-pointer h-9 px-3"
          >
            {isCopied ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span className="hidden sm:inline">
              {isCopied ? (isRtl ? "تم النسخ!" : "Copied!") : isRtl ? "نسخ الرابط" : "Copy Link"}
            </span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            className="text-xs cursor-pointer h-9 px-3"
          >
            <Printer className="size-3.5" />
            <span className="hidden sm:inline">{isRtl ? "طباعة / PDF" : "Print / PDF"}</span>
          </Button>

          <Link
            href="/dashboard/business/generate-presentation"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Presentation className="size-3.5" />
            <span>{isRtl ? "تحويل لعرض تقديمي" : "Go to Presentation"}</span>
          </Link>
        </div>
      </div>

      {/* Main Two-Column Structure: Sections Sidebar + Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================
            LEFT SIDEBAR: SECTIONS LIST (Matching Screenshots)
        ======================================================== */}
        <aside className="lg:col-span-3 rounded-2xl bg-card border border-border/70 p-3 sm:p-4 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 mb-2">
              {isRtl ? "أقسام الخطة (Sections)" : "Sections"}
            </div>

            <nav className="flex flex-col gap-1.5">
              {sectionsList.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSection(sec.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-start",
                      isActive
                        ? "bg-purple-600/15 text-purple-400 border border-purple-500/30 shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={cn(
                          "size-4 shrink-0",
                          isActive ? "text-purple-400" : "text-muted-foreground"
                        )}
                      />
                      <span className="truncate">
                        {isRtl ? sec.labelAr : sec.labelEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {sec.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-mono font-bold">
                          {sec.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={cn(
                          "size-3.5 text-muted-foreground/60 transition-transform",
                          isActive && "text-purple-400 translate-x-0.5 rtl:-translate-x-0.5"
                        )}
                      />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Action: Go to Presentation */}
          <div className="mt-6 pt-4 border-t border-border/40">
            <Link
              href="/dashboard/business/generate-presentation"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              <Presentation className="size-4" />
              <span>{isRtl ? "تحويل لعرض تقديمي" : "Go to Presentation"}</span>
            </Link>
          </div>
        </aside>

        {/* ========================================================
            RIGHT CONTENT AREA: SECTION DETAILS
        ======================================================== */}
        <main className="lg:col-span-9 rounded-2xl bg-card border border-border/70 p-6 sm:p-8 shadow-xl backdrop-blur-md min-h-[580px] relative">
          {/* Section Print Action Top Right */}
          <button
            type="button"
            onClick={handlePrint}
            className="absolute top-6 end-6 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
            title={isRtl ? "طباعة هذا القسم" : "Print section"}
          >
            <Printer className="size-4" />
          </button>

          {/* ------------------------------------------------------
              1. IDEA EVALUATION (Matching Image 1)
          ------------------------------------------------------ */}
          {activeSection === "idea-evaluation" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {isRtl ? "تقييم الجدوى والفكرة (Idea Evaluation)" : "Idea Evaluation"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.ideaEvaluation.overview}
                </p>
              </div>

              {/* Metric Cards List */}
              <div className="flex flex-col gap-5">
                {data.ideaEvaluation.metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="p-5 rounded-2xl bg-muted/20 border border-border/60 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="size-2 rounded-full bg-purple-500" />
                        <h3 className="text-sm sm:text-base font-bold text-foreground">
                          {metric.title}
                        </h3>
                      </div>

                      {/* Score Badge (e.g. 8/10) */}
                      <span className="inline-flex items-center justify-center size-9 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs shadow-xs">
                        {metric.score}/{metric.maxScore}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              2. BUSINESS PLAN / EXECUTIVE SUMMARY
          ------------------------------------------------------ */}
          {activeSection === "business-plan" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {isRtl ? "الملخص التنفيذي والرؤية (Business Plan)" : "Business Plan"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.executiveSummary.overview}
                </p>
              </div>

              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/25">
                  <h4 className="text-xs font-bold text-purple-400 mb-1">
                    {isRtl ? "الرؤية المستقبلية (Vision)" : "Strategic Vision"}
                  </h4>
                  <p className="text-xs text-foreground/90 leading-relaxed">
                    {data.executiveSummary.vision}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                  <h4 className="text-xs font-bold text-brand mb-1">
                    {isRtl ? "الرسالة (Mission)" : "Core Mission"}
                  </h4>
                  <p className="text-xs text-foreground/90 leading-relaxed">
                    {data.executiveSummary.mission}
                  </p>
                </div>
              </div>

              {/* Strategic Highlights */}
              <div className="p-5 rounded-2xl bg-muted/20 border border-border/60">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  {isRtl ? "أهم ركائز النجاح التنفيذي:" : "Key Strategic Highlights:"}
                </h3>
                <ul className="space-y-2.5">
                  {data.executiveSummary.keyHighlights.map((hl, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                    >
                      <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              3. MARKETING ANALYSIS & BUDGET (Matching Image 2 - Pie Chart)
          ------------------------------------------------------ */}
          {activeSection === "marketing-analysis" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {isRtl ? "ميزانية التسويق والتوقعات (Budget & Projections)" : "Budget and Financial Projections"}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {data.marketingAnalysis.summary}
                </p>
              </div>

              {/* Pie Chart Showcase */}
              <div className="p-6 rounded-2xl bg-muted/20 border border-border/60 flex flex-col items-center justify-center">
                {/* Custom Interactive SVG Donut/Pie Chart */}
                <div className="relative size-64 sm:size-72 my-4 flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className="size-full transform -rotate-90 select-none"
                  >
                    {(() => {
                      let cumulative = 0;
                      return data.marketingAnalysis.budgetAllocation.map((slice, i) => {
                        const dashArray = `${slice.percentage} ${100 - slice.percentage}`;
                        const dashOffset = 100 - cumulative;
                        cumulative += slice.percentage;

                        return (
                          <circle
                            key={i}
                            cx="50"
                            cy="50"
                            r="36"
                            fill="transparent"
                            stroke={slice.color}
                            strokeWidth="28"
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            className="transition-all duration-300 hover:opacity-90"
                            pathLength="100"
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                      Marketing
                    </span>
                    <span className="text-lg font-bold font-mono text-foreground">
                      100%
                    </span>
                  </div>
                </div>

                {/* Legend Chips (Matching Image 2 Colors) */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
                  {data.marketingAnalysis.budgetAllocation.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-semibold text-foreground/90"
                    >
                      <span
                        className="size-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                      <span className="font-mono text-muted-foreground text-[11px]">
                        ({item.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Channels */}
              <div className="p-5 rounded-2xl bg-muted/20 border border-border/60">
                <h4 className="text-xs font-bold text-foreground mb-3">
                  {isRtl ? "القنوات التسويقية الموصى بها:" : "Recommended Go-To-Market Channels:"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.marketingAnalysis.recommendedChannels.map((ch, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-background border border-border/60 text-xs text-foreground/90 flex items-center gap-2"
                    >
                      <span className="size-1.5 rounded-full bg-purple-500" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              4. SALES STRATEGY
          ------------------------------------------------------ */}
          {activeSection === "sales-strategy" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {isRtl ? "استراتيجية المبيعات والتسعير" : "Sales & Pricing Strategy"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.salesStrategy.customerRetention}
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.salesStrategy.pricingTiers.map((tier, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-muted/20 border border-border/60 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-purple-400">
                        {tier.name}
                      </span>
                      <p className="text-xl font-bold font-mono text-foreground mt-1 mb-2">
                        {tier.price}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Channels List */}
              <div className="p-5 rounded-2xl bg-muted/20 border border-border/60">
                <h4 className="text-xs font-bold text-foreground mb-2.5">
                  {isRtl ? "قنوات تحويل العملاء وإغلاق الصفقات:" : "Conversion & Deal Closing Channels:"}
                </h4>
                <div className="space-y-2">
                  {data.salesStrategy.salesChannels.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-background border border-border/60 text-xs text-foreground/90 flex items-center gap-2"
                    >
                      <span className="size-2 rounded-full bg-emerald-500" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              5. SWOT ANALYSIS (Matching Image 3)
          ------------------------------------------------------ */}
          {activeSection === "swot-analysis" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {isRtl ? "تحليل مصفوفة SWOT" : "SWOT Analysis"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRtl
                    ? "تقييم شامل لنقاط القوة والضعف والفرص والتهديدات في السوق المستهدف."
                    : "Strategic evaluation of strengths, weaknesses, opportunities, and competitive threats."}
                </p>
              </div>

              {/* 4 Quadrants Grid with Center S-W-T-O Badge */}
              <div className="relative">
                {/* Center Badge */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 size-20 rounded-full bg-card border-4 border-background shadow-2xl items-center justify-center p-1.5">
                  <div className="grid grid-cols-2 gap-0.5 size-full rounded-full overflow-hidden text-center text-[10px] font-bold text-white">
                    <span className="bg-purple-600 flex items-center justify-center">S</span>
                    <span className="bg-purple-400 flex items-center justify-center">W</span>
                    <span className="bg-emerald-500 flex items-center justify-center">O</span>
                    <span className="bg-rose-500 flex items-center justify-center">T</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Quadrant 1: Strengths */}
                  <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                      <Dumbbell className="size-4" />
                      <span>{isRtl ? "نقاط القوة (Strengths)" : "Strengths"}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {isRtl ? "ما الذي يميزنا؟ وما هي الميزة التنافسية؟" : "What is your USP / competitive advantage?"}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {data.swotAnalysis.strengths.map((item, i) => (
                        <li key={i} className="text-xs text-foreground/90">
                          <strong className="text-purple-300">• {item.title}: </strong>
                          {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quadrant 2: Weaknesses */}
                  <div className="p-5 rounded-2xl bg-muted/20 border border-border/70 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                      <Search className="size-4" />
                      <span>{isRtl ? "نقاط الضعف (Weaknesses)" : "Weaknesses"}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {isRtl ? "ما التحديات التشغيلية التي تحتاج لتحسين؟" : "What do you struggle with and need to optimize?"}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {data.swotAnalysis.weaknesses.map((item, i) => (
                        <li key={i} className="text-xs text-foreground/90">
                          <strong className="text-amber-400">• {item.title}: </strong>
                          {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quadrant 3: Opportunities */}
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Crosshair className="size-4" />
                      <span>{isRtl ? "الفرص السوقية (Opportunities)" : "Opportunities"}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {isRtl ? "ما هي اتجاهات النمو الواعدة التي يمكن استغلالها؟" : "What market trends can you capitalize on?"}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {data.swotAnalysis.opportunities.map((item, i) => (
                        <li key={i} className="text-xs text-foreground/90">
                          <strong className="text-emerald-300">• {item.title}: </strong>
                          {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quadrant 4: Threats */}
                  <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <Bomb className="size-4" />
                      <span>{isRtl ? "التهديدات والمخاطر (Threats)" : "Threats"}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {isRtl ? "ما العقبات الخارجية والمنافسين المحتملين؟" : "What external obstacles or competitors could harm growth?"}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {data.swotAnalysis.threats.map((item, i) => (
                        <li key={i} className="text-xs text-foreground/90">
                          <strong className="text-rose-300">• {item.title}: </strong>
                          {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              6. BUSINESS MODEL CANVAS (Matching Image 4)
          ------------------------------------------------------ */}
          {activeSection === "business-model-canvas" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {isRtl ? "مخطط نموذج العمل (Business Model Canvas)" : "Business Model Canvas"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRtl
                    ? "الأعمدة الاستراتيجية المتكاملة لتدفق القيمة والإيرادات والشركاء."
                    : "The 5 core building blocks of value delivery, channels, and enterprise partnerships."}
                </p>
              </div>

              {/* 5 Columns Board (Matching Image 4) */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {data.businessModelCanvas.columns.map((col) => (
                  <div
                    key={col.id}
                    className="p-4 rounded-2xl bg-muted/20 border border-border/70 flex flex-col justify-start"
                  >
                    <h4 className="text-xs font-bold text-purple-400 border-b border-border/40 pb-2 mb-3">
                      {col.title}
                    </h4>

                    <ul className="space-y-2.5">
                      {col.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] text-foreground/90 leading-relaxed flex items-start gap-1.5"
                        >
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              7. STRATEGIC PLAN
          ------------------------------------------------------ */}
          {activeSection === "strategic-plan" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {isRtl ? "الخطة الاستراتيجية والمراحل" : "Strategic Execution Plan"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRtl ? "خارطة طريق تنفيذية مقسمة لـ 3 مراحل زمنية." : "Three-phase execution timeline from validation to regional scale."}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {data.strategicPlan.phases.map((ph, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-muted/20 border border-border/60"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-purple-400">
                        {ph.phase}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">
                        {ph.title}
                      </h3>
                    </div>

                    <ul className="mt-3 space-y-2">
                      {ph.milestones.map((ms, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <Check className="size-3.5 text-emerald-500" />
                          <span className="text-foreground/90">{ms}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              8. RISK ASSESSMENT
          ------------------------------------------------------ */}
          {activeSection === "risk-assessment" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {isRtl ? "تقييم وإدارة المخاطر" : "Risk Assessment & Mitigation"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRtl ? "خطة استباقية لمواجهة التحديات التشغيلية والتقنية." : "Proactive contingency planning to safeguard platform continuity."}
                </p>
              </div>

              <div className="flex flex-col gap-3.5">
                {data.riskAssessment.risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="p-4 rounded-xl bg-muted/20 border border-border/60 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">
                        {risk.title}
                      </h4>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          risk.severity === "high"
                            ? "bg-rose-500/15 text-rose-400"
                            : risk.severity === "medium"
                            ? "bg-amber-500/15 text-amber-400"
                            : "bg-emerald-500/15 text-emerald-400"
                        )}
                      >
                        {risk.severity} Risk
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">
                        {isRtl ? "إجراء التخفيف: " : "Mitigation Protocol: "}
                      </strong>
                      {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              9. FINANCIAL PLAN
          ------------------------------------------------------ */}
          {activeSection === "financial-plan" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {isRtl ? "التوقعات المالية ومؤشرات التعادل" : "Financial Plan & Projections"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRtl ? "مؤشرات الإيرادات والتكاليف والوصول للربحية." : "Projected cashflow, initial capital utilization, and break-even targets."}
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
                  <span className="text-[10px] text-muted-foreground block">
                    {isRtl ? "رأس المال المبدئي" : "Initial Capital"}
                  </span>
                  <span className="text-base font-bold font-mono text-foreground">
                    {data.financialPlan.initialCapital}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
                  <span className="text-[10px] text-muted-foreground block">
                    {isRtl ? "المصاريف التشغيلية الشهرية" : "Monthly Burn Rate"}
                  </span>
                  <span className="text-base font-bold font-mono text-foreground">
                    {data.financialPlan.monthlyBurn}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-center">
                  <span className="text-[10px] text-purple-400 block font-semibold">
                    {isRtl ? "نقطة التعادل المالي" : "Break-Even Timeline"}
                  </span>
                  <span className="text-base font-bold font-mono text-purple-400">
                    {data.financialPlan.breakEvenPeriod}
                  </span>
                </div>
              </div>

              {/* Annual Projections Table */}
              <div className="p-5 rounded-2xl bg-muted/20 border border-border/60">
                <h4 className="text-xs font-bold text-foreground mb-3">
                  {isRtl ? "توقعات الإيرادات والأرباح (3 سنوات):" : "3-Year Revenue & Net Profit Forecast:"}
                </h4>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {data.financialPlan.annualProjections.map((yr, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-background border border-border/60 flex flex-col gap-1"
                    >
                      <span className="font-bold text-purple-400">{yr.year}</span>
                      <span className="text-[10px] text-muted-foreground">Revenue: {yr.revenue}</span>
                      <span className="text-[10px] text-emerald-500 font-semibold font-mono">Profit: {yr.profit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

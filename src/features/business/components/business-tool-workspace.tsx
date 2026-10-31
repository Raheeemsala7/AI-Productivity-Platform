"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Settings2,
  FileText,
  Briefcase,
  Layers,
  Wand2,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { BusinessToolItem } from "../types/business-tool";
import { Button } from "@/shared/components/ui/button";

interface BusinessToolWorkspaceProps {
  tool: BusinessToolItem;
}

export function BusinessToolWorkspace({ tool }: BusinessToolWorkspaceProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("BusinessTools");

  const title = t(`tools.${tool.translationKey}.title`);
  const tagline = t(`tools.${tool.translationKey}.tagline`);
  const description = t(`tools.${tool.translationKey}.description`);
  const badge = t(`tools.${tool.translationKey}.badge`);
  const features = t.raw(`tools.${tool.translationKey}.features`) as string[];

  const [prompt, setPrompt] = useState("");
  const [selectedStage, setSelectedStage] = useState("seed");
  const [selectedMarket, setSelectedMarket] = useState("saudi");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Top Navigation & Breadcrumb */}
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
          <span>{t("workspace.backLink")}</span>
        </Link>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
              tool.badgeTone
            )}
          >
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: tool.accentColor }}
            />
            {badge}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            <Zap className="size-3 text-amber-500 fill-amber-500/20" />
            <span>~{tool.estimatedCredits} {isRtl ? "رصيد" : "credits"}</span>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="rounded-2xl bg-card border border-border/70 p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div
          className="absolute -top-24 -right-24 size-64 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: tool.accentColor }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand mb-2">
              <Sparkles className="size-3.5" />
              <span>{tagline}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
              {title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
            <span className="text-xs font-mono text-muted-foreground bg-muted/70 px-3 py-1 rounded-lg border border-border/50">
              Engine: {tool.modelEngine}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t("workspace.statusBadge")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Studio Workspace Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left / Main: Input Canvas & Prompt Box (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Prompt Box */}
          <div className="rounded-2xl bg-card border border-border/70 p-5 sm:p-6 shadow-sm">
            <label className="block text-sm font-bold text-foreground mb-2 flex items-center justify-between">
              <span>{t("workspace.promptTitle")}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {prompt.length} / 2000 {t("workspace.charCount")}
              </span>
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              placeholder={t("workspace.promptPlaceholder")}
              className="w-full rounded-xl bg-background border border-border/70 p-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all resize-none leading-relaxed"
            />

            {/* Quick Action Trigger */}
            <div className="mt-5 flex items-center justify-between gap-4 pt-4 border-t border-border/40">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap className="size-3.5 text-amber-500 fill-amber-500/20" />
                <span>
                  {isRtl
                    ? `استهلاك تقريبي: ${tool.estimatedCredits} رصيد`
                    : `Est. usage: ${tool.estimatedCredits} credits`}
                </span>
              </div>

              <Button
                type="button"
                className="bg-brand hover:bg-brand-dark text-white font-bold px-6 shadow-md shadow-brand/10 cursor-pointer"
              >
                <Wand2 className="size-4" />
                <span>{t("workspace.generateBtn")}</span>
              </Button>
            </div>
          </div>

          {/* Results Preview Showcase */}
          <div className="rounded-2xl bg-card border border-border/70 p-6 flex flex-col items-center justify-center text-center min-h-64">
            <div className="size-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4">
              <FileText className="size-8" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              {t("workspace.sampleTitle")} — {title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
              {t("workspace.readyDesc")}
            </p>
          </div>
        </div>

        {/* Right: Settings & Parameters Panel (1 col) */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-card border border-border/70 p-5 sm:p-6">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/50 text-sm font-bold text-foreground">
              <Settings2 className="size-4 text-brand" />
              <span>{t("workspace.settingsTitle")}</span>
            </div>

            {/* Project Stage */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-muted-foreground mb-2">
                {t("workspace.stageLabel")}
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: "idea", label: t("workspace.stageIdea") },
                  { id: "seed", label: t("workspace.stageSeed") },
                  { id: "growth", label: t("workspace.stageGrowth") },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStage(st.id)}
                    className={cn(
                      "py-2 px-3 rounded-lg text-xs text-start font-medium border transition-all cursor-pointer flex items-center justify-between",
                      selectedStage === st.id
                        ? "bg-brand/10 text-brand border-brand/40 font-bold"
                        : "bg-muted/20 text-muted-foreground border-border/40 hover:bg-muted/40"
                    )}
                  >
                    <span>{st.label}</span>
                    {selectedStage === st.id && (
                      <CheckCircle2 className="size-3.5 text-brand" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Market */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-muted-foreground mb-2">
                {t("workspace.marketLabel")}
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: "saudi", label: t("workspace.marketSaudi") },
                  { id: "mena", label: t("workspace.marketMena") },
                  { id: "global", label: t("workspace.marketGlobal") },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMarket(m.id)}
                    className={cn(
                      "py-2 px-3 rounded-lg text-xs text-start font-medium border transition-all cursor-pointer flex items-center justify-between",
                      selectedMarket === m.id
                        ? "bg-brand/10 text-brand border-brand/40 font-bold"
                        : "bg-muted/20 text-muted-foreground border-border/40 hover:bg-muted/40"
                    )}
                  >
                    <span>{m.label}</span>
                    {selectedMarket === m.id && (
                      <CheckCircle2 className="size-3.5 text-brand" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Features list */}
            <div className="pt-4 border-t border-border/40">
              <p className="text-xs font-bold text-foreground mb-2">
                {isRtl ? "المخرجات المتضمنة:" : "Included Deliverables:"}
              </p>
              <ul className="flex flex-col gap-1.5">
                {features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="size-3 text-brand shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


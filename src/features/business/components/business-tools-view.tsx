"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, Layers, Target, Presentation, TrendingUp } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { BUSINESS_TOOLS_DATA } from "../data/business-tools.data";
import { BusinessCategory } from "../types/business-tool";
import { BusinessToolCard } from "./business-tool-card";

export function BusinessToolsView() {
  const t = useTranslations("BusinessTools");
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory>("all");

  const categories: { key: BusinessCategory; label: string; icon: React.ElementType }[] = [
    { key: "all", label: t("filterAll"), icon: Layers },
    { key: "planning", label: t("filterPlanning"), icon: Target },
    { key: "pitch", label: t("filterPitch"), icon: Presentation },
    { key: "growth", label: t("filterGrowth"), icon: TrendingUp },
  ];

  const filteredTools = useMemo(() => {
    if (selectedCategory === "all") return BUSINESS_TOOLS_DATA;
    return BUSINESS_TOOLS_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

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

      {/* Controls Bar: Centered Category Filters */}
      <div className="flex items-center justify-center mb-10">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-card border border-border/70 backdrop-blur-sm shadow-xs overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.key;
            const count =
              cat.key === "all"
                ? BUSINESS_TOOLS_DATA.length
                : BUSINESS_TOOLS_DATA.filter((t) => t.category === cat.key).length;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap",
                  isSelected
                    ? "bg-brand text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="size-4" />
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                    isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredTools.map((tool, idx) => (
          <BusinessToolCard key={tool.id} item={tool} index={idx} />
        ))}
      </div>
    </div>
  );
}


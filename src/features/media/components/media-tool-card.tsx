"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { MediaToolItem } from "../types/media-tool";
import { MediaCardGraphic } from "./media-card-graphics";

interface MediaToolCardProps {
  item: MediaToolItem;
  index?: number;
}

export function MediaToolCard({ item, index = 0 }: MediaToolCardProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("MediaTools");

  const title = t(`tools.${item.translationKey}.title`);
  const tagline = t(`tools.${item.translationKey}.tagline`);
  const description = t(`tools.${item.translationKey}.description`);
  const badge = t(`tools.${item.translationKey}.badge`);
  
  // Array of features
  const features = t.raw(`tools.${item.translationKey}.features`) as string[];

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
        "bg-card/90 border border-border/70 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:bg-card hover:border-brand/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        "animate-in fade-in-50 duration-300 fill-mode-both"
      )}
      style={{
        animationDelay: `${Math.min(index * 60, 400)}ms`,
      }}
    >
      {/* Top Graphic Illustration */}
      <div className="w-full overflow-hidden border-b border-border/40">
        <MediaCardGraphic type={item.graphicType} />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 text-start">
        {/* Top Meta: Model pill + Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
              item.badgeTone
            )}
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: item.accentColor }}
            />
            {badge}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/50">
            <Zap className="size-3 text-amber-500 fill-amber-500/20" />
            <span>~{item.estimatedCredits} {isRtl ? "رصيد" : "credits"}</span>
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg sm:text-xl font-bold text-foreground transition-colors group-hover:text-brand">
          {title}
        </h3>
        <p className="mt-1 text-xs font-medium text-brand/90 dark:text-brand-soft">
          {tagline}
        </p>

        {/* Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Feature Pills */}
        {Array.isArray(features) && features.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-border/40">
            {features.map((feat, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-muted/40 text-muted-foreground border border-border/30"
              >
                <CheckCircle2 className="size-2.5 text-brand shrink-0" />
                <span className="truncate">{feat}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer / CTA Affordance */}
      <div className="px-5 sm:px-6 py-4 bg-muted/20 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
        <span className="text-[11px] text-muted-foreground font-mono">
          {item.modelName}
        </span>
        <span
          className={cn(
            "text-brand font-bold transition-all duration-200 inline-flex items-center gap-1.5",
            isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
          )}
        >
          <span>{t("startNow")}</span>
          {isRtl ? (
            <ArrowLeft className="size-3.5" />
          ) : (
            <ArrowRight className="size-3.5" />
          )}
        </span>
      </div>
    </Link>
  );
}


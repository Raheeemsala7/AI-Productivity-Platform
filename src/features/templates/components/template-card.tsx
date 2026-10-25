"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Template, TemplateType } from "../types/template";
import { TemplateImage } from "./template-image";

interface TemplateCardProps {
  template: Template;
  type: TemplateType;
  index?: number;
}

export function TemplateCard({ template, type, index = 0 }: TemplateCardProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("TemplatesLibrary");

  const href = `/dashboard/templates/${type}/${template.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-6",
        "bg-card/70 border border-border/60 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:bg-card hover:border-brand/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        "animate-in fade-in-50 duration-300 fill-mode-both"
      )}
      style={{
        animationDelay: `${Math.min(index * 40, 400)}ms`,
      }}
    >
      {/* Top: Logo + Header info */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <TemplateImage
            src={template.logo}
            alt={template.name}
            containerClassName="size-13 sm:size-14 rounded-2xl bg-muted/60 border border-border/50 group-hover:border-brand/30 transition-colors"
          />

          <span
            className={cn(
              "inline-flex items-center justify-center size-8 rounded-full bg-muted/50 text-muted-foreground",
              "border border-border/40 transition-all duration-200",
              "group-hover:bg-brand group-hover:text-brand-foreground group-hover:border-brand",
              isRtl ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
            )}
            aria-hidden="true"
          >
            {isRtl ? (
              <ArrowLeft className="size-4" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground transition-colors group-hover:text-brand line-clamp-1">
            {template.name}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {template.description || t("defaultDescription")}
          </p>
        </div>
      </div>

      {/* Bottom: Action Affordance */}
      <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        <span>{t("openTemplate")}</span>
        <span
          className={cn(
            "text-brand font-semibold transition-transform duration-200 inline-flex items-center gap-1",
            isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
          )}
        >
          {t("startNow")}
        </span>
      </div>
    </Link>
  );
}

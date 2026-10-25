import React from "react";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { getTemplateDetailsServer } from "../apis/templates.api";
import { TemplateImage } from "./template-image";
import { TemplateDynamicForm } from "./template-dynamic-form";

interface TemplateDetailsViewProps {
  slug: string;
  type: string;
  locale: string;
}

export async function TemplateDetailsView({
  slug,
  type,
  locale,
}: TemplateDetailsViewProps) {
  const t = await getTranslations("TemplateDetails");
  const isRtl = locale === "ar";

  const response = await getTemplateDetailsServer({
    slug,
    lang: locale,
  });

  if (!response.success || !response.data) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-destructive/5 border border-destructive/20 my-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-3">
            <AlertCircle className="size-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            {t("errorTitle")}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-md">
            {response.message || t("errorMessage")}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Link
              href={`/dashboard/templates/${type}/${slug}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
            >
              <RefreshCw className="size-3.5" />
              <span>{t("retryButton")}</span>
            </Link>
            <Link
              href={`/dashboard/templates/${type}`}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              <span>{t("backToTemplates")}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const template = response.data;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6 sm:px-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col gap-3 pb-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto"
          >
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground shrink-0"
            >
              {t("breadcrumb.dashboard")}
            </Link>
            <span className="text-muted-foreground/60">•</span>
            <Link
              href="/dashboard/templates"
              className="transition-colors hover:text-foreground shrink-0"
            >
              {t("breadcrumb.templates")}
            </Link>
            <span className="text-muted-foreground/60">•</span>
            <Link
              href={`/dashboard/templates/${type}`}
              className="transition-colors hover:text-foreground capitalize shrink-0"
            >
              {type === "writing" ? t("types.writing") : t("types.business")}
            </Link>
            <span className="text-muted-foreground/60">•</span>
            <span className="font-semibold text-foreground truncate max-w-48 sm:max-w-xs">
              {template.name}
            </span>
          </nav>

          <Link
            href={`/dashboard/templates/${type}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground shrink-0"
          >
            {isRtl ? (
              <ArrowRight className="size-3.5" />
            ) : (
              <ArrowLeft className="size-3.5" />
            )}
            <span>{t("backToTemplates")}</span>
          </Link>
        </div>

        {/* Template Header: Logo, Name, and Description */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <TemplateImage
            src={template.logo}
            alt={template.name}
            containerClassName="size-16 sm:size-18 rounded-2xl bg-muted/60 border border-border/60 shadow-xs"
          />

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {template.name}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
              {template.description}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Form Studio */}
      <TemplateDynamicForm key={template.slug} template={template} />
    </div>
  );
}

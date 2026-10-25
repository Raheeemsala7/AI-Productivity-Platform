"use client";

import React, { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  FolderOpen,
  Layers,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TemplateType } from "../types/template";
import { useTemplates } from "../hooks/use-templates";
import { TemplateCard } from "./template-card";

interface TemplatesLibraryViewProps {
  initialType: TemplateType;
}

export function TemplatesLibraryView({ initialType }: TemplatesLibraryViewProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("TemplatesLibrary");

  // User-selected category ID (null initially to let backend return selected_category_id)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Fetch templates via React Query
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useTemplates({
    lang: locale,
    type: initialType,
    categoryId: selectedCategoryId,
  });

  const categories = useMemo(
    () => data?.data?.categories ?? [],
    [data?.data?.categories]
  );
  const templates = data?.data?.templates ?? [];

  // Active category: user selection or backend default
  const activeCategoryId = useMemo(() => {
    if (selectedCategoryId !== null) {
      return selectedCategoryId;
    }
    return data?.data?.selected_category_id ?? (categories[0]?.id ?? null);
  }, [selectedCategoryId, data?.data?.selected_category_id, categories]);

  // Handle category switch
  const handleSelectCategory = (categoryId: number) => {
    if (categoryId === activeCategoryId) return;
    setSelectedCategoryId(categoryId);
  };

  // Determine localized titles for the type
  const pageTitle =
    initialType === "writing"
      ? t("types.writing.title")
      : t("types.business.title");

  const pageSubtitle =
    initialType === "writing"
      ? t("types.writing.subtitle")
      : t("types.business.subtitle");

  const typeBadge =
    initialType === "writing"
      ? t("types.writing.badge")
      : t("types.business.badge");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6 sm:px-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col gap-3 pb-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
          >
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              {t("breadcrumb.dashboard")}
            </Link>
            <span className="text-muted-foreground/60">•</span>
            <Link
              href="/dashboard/templates"
              className="transition-colors hover:text-foreground"
            >
              {t("breadcrumb.catalog")}
            </Link>
            <span className="text-muted-foreground/60">•</span>
            <span className="font-semibold text-foreground">{pageTitle}</span>
          </nav>

          <Link
            href="/dashboard/templates"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {isRtl ? (
              <ArrowRight className="size-3.5" />
            ) : (
              <ArrowLeft className="size-3.5" />
            )}
            <span>{t("backToCatalog")}</span>
          </Link>
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                {pageTitle}
              </h1>
              <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                {typeBadge}
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
              {pageSubtitle}
            </p>
          </div>

          {/* Background fetching indicator */}
          {isFetching && !isLoading && (
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
              <Loader2 className="size-3.5 animate-spin text-brand" />
              <span>{t("updating")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Category Filter Navigation */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Layers className="size-3.5" />
            <span>{t("categoriesLabel")}</span>
          </div>
          {templates.length > 0 && !isLoading && (
            <span className="text-xs text-muted-foreground">
              {templates.length} {t("templatesCount")}
            </span>
          )}
        </div>

        {/* Categories Bar */}
        <div
          role="tablist"
          aria-label={t("categoriesLabel")}
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        >
          {isLoading ? (
            /* Skeleton Category Pills */
            Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="h-9 w-28 rounded-full shrink-0"
              />
            ))
          ) : categories.length > 0 ? (
            categories.map((category) => {
              const isSelected = category.id === activeCategoryId;
              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCategory(category.id)}
                  disabled={isFetching}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shrink-0",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                    isSelected
                      ? "bg-brand text-brand-foreground shadow-md shadow-brand/20 font-semibold scale-102"
                      : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40"
                  )}
                >
                  <span>{category.name}</span>
                </button>
              );
            })
          ) : null}
        </div>
      </div>

      {/* Content Section: Loading, Error, Empty, or Template Cards Grid */}
      <div className="mt-6">
        {isLoading ? (
          /* Initial Loading State */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-card/40 border border-border/40"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <Skeleton className="size-13 rounded-2xl" />
                    <Skeleton className="size-8 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-full rounded-md" />
                    <Skeleton className="h-3.5 w-4/5 rounded-md" />
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-border/40 flex justify-between">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          /* Error State */
          <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-destructive/5 border border-destructive/20 my-8">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-3">
              <AlertCircle className="size-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {t("errorTitle")}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-md">
              {error?.message || t("errorMessage")}
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              size="sm"
              className="mt-4 gap-2"
            >
              <RefreshCw className="size-3.5" />
              <span>{t("retryButton")}</span>
            </Button>
          </div>
        ) : templates.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center p-10 sm:p-16 rounded-2xl bg-card/30 border border-dashed border-border/60 my-8">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4">
              <FolderOpen className="size-7 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {t("emptyTitle")}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-md">
              {t("emptyMessage")}
            </p>
            {categories.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-5"
                onClick={() => {
                  const firstCategory = categories[0]?.id;
                  if (firstCategory !== undefined) {
                    setSelectedCategoryId(firstCategory);
                  }
                }}
              >
                {t("viewAllCategories")}
              </Button>
            )}
          </div>
        ) : (
          /* Template Cards Grid */
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 transition-opacity duration-200",
              isFetching ? "opacity-85" : "opacity-100"
            )}
          >
            {templates.map((template, idx) => (
              <TemplateCard
                key={`${template.slug}-${idx}`}
                template={template}
                type={initialType}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

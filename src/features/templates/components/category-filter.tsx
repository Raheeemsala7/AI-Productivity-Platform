"use client";

import React, { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Layers, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { TemplateCategory } from "../types/template";

interface CategoryFilterProps {
  categories: TemplateCategory[];
  activeCategoryId: number;
  totalTemplatesCount?: number;
}

export function CategoryFilter({
  categories,
  activeCategoryId,
  totalTemplatesCount,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("TemplatesLibrary");
  const [isPending, startTransition] = useTransition();

  const handleSelectCategory = (categoryId: number) => {
    if (categoryId === activeCategoryId && !isPending) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("category_id", String(categoryId));

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Layers className="size-3.5" />
          <span>{t("categoriesLabel")}</span>
        </div>
        <div className="flex items-center gap-2">
          {isPending && (
            <span className="inline-flex items-center gap-1.5 text-xs text-brand animate-pulse">
              <Loader2 className="size-3 animate-spin" />
              <span>{t("updating")}</span>
            </span>
          )}
          {typeof totalTemplatesCount === "number" && (
            <span className="text-xs text-muted-foreground">
              {totalTemplatesCount} {t("templatesCount")}
            </span>
          )}
        </div>
      </div>

      {/* Categories Pills */}
      <div
        role="tablist"
        aria-label={t("categoriesLabel")}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
      >
        {categories.map((category) => {
          const isSelected = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleSelectCategory(category.id)}
              disabled={isPending}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer duration-200 shrink-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                isSelected
                  ? "bg-brand text-brand-foreground shadow-md shadow-brand/20 font-semibold scale-102"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40",
                isPending && isSelected && "opacity-80"
              )}
            >
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

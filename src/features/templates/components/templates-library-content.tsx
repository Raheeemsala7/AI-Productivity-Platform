import React from "react";
import { getTranslations } from "next-intl/server";
import { AlertCircle, FolderOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { TemplateType } from "../types/template";
import { TemplateCard } from "./template-card";
import { CategoryFilter } from "./category-filter";
import { getTemplatesServer } from "../apis/templates.api";

interface TemplatesLibraryContentProps {
  type: TemplateType;
  locale: string;
  categoryId?: string;
}

export async function TemplatesLibraryContent({
  type,
  locale,
  categoryId,
}: TemplatesLibraryContentProps) {
  const t = await getTranslations("TemplatesLibrary");

  const response = await getTemplatesServer({
    lang: locale,
    type,
    category_id: categoryId,
  });

  if (!response.success) {
    return (
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
        <Link
          href={`/dashboard/templates/${type}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}
        >
          {t("retryButton")}
        </Link>
      </div>
    );
  }

  const { categories, selected_category_id, templates } = response.data;

  const activeCategoryId = categoryId
    ? Number(categoryId)
    : selected_category_id ?? (categories[0]?.id ?? 0);

  return (
    <>
      {/* Category Pills Filter */}
      <CategoryFilter
        categories={categories}
        activeCategoryId={activeCategoryId}
        totalTemplatesCount={templates.length}
      />

      {/* Templates Content */}
      <div className="mt-6">
        {templates.length === 0 ? (
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
              <Link
                href={`/dashboard/templates/${type}?category_id=${categories[0]?.id}`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-5")}
              >
                {t("viewAllCategories")}
              </Link>
            )}
          </div>
        ) : (
          /* Responsive Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {templates.map((template, idx) => (
              <TemplateCard
                key={`${template.slug}-${idx}`}
                template={template}
                type={type}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

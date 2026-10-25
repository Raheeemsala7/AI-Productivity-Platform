import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { isValidTemplateType, TemplateType } from "@/features/templates/types/template";
import { TemplatesLibraryContent } from "@/features/templates/components/templates-library-content";
import { TemplatesContentSkeleton } from "@/features/templates/components/templates-content-skeleton";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{
    category_id?: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!isValidTemplateType(slug)) {
    return {
      title: locale === "ar" ? "قوالب الذكاء الاصطناعي — ORICO" : "AI Templates — ORICO",
    };
  }

  const isWriting = slug === "writing";
  const isAr = locale === "ar";

  return {
    title: isAr
      ? isWriting
        ? "أدوات كتابة المحتوى — ORICO"
        : "أدوات الشركات والأعمال — ORICO"
      : isWriting
        ? "Content Writing Tools — ORICO"
        : "Business Tools — ORICO",
    description: isAr
      ? "تصفح واستخدم قوالب الذكاء الاصطناعي المتقدمة لإنشاء محتوى عالي الجودة بكفاءة."
      : "Explore and use advanced AI templates for writing and business productivity.",
  };
}

export default async function TemplatesSlugPage({ params, searchParams }: Props) {
  const { slug, locale } = await params;
  const { category_id } = await searchParams;

  if (!isValidTemplateType(slug)) {
    notFound();
  }

  const t = await getTranslations("TemplatesLibrary");
  const isRtl = locale === "ar";
  const isWriting = slug === "writing";

  const pageTitle = isWriting
    ? t("types.writing.title")
    : t("types.business.title");

  const pageSubtitle = isWriting
    ? t("types.writing.subtitle")
    : t("types.business.subtitle");

  const typeBadge = isWriting
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
        </div>
      </div>

      {/* Server Component with Suspense Streaming */}
      <Suspense
        key={`${slug}-${category_id || "default"}`}
        fallback={<TemplatesContentSkeleton />}
      >
        <TemplatesLibraryContent
          type={slug as TemplateType}
          locale={locale}
          categoryId={category_id}
        />
      </Suspense>
    </div>
  );
}

import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTemplateDetailsServer } from "@/features/templates/apis/templates.api";
import { TemplateDetailsView } from "@/features/templates/components/template-details-view";
import { TemplateDetailsSkeleton } from "@/features/templates/components/template-details-skeleton";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
    toolName: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, toolName, locale } = await params;
  const templateSlug = toolName || slug;

  try {
    const res = await getTemplateDetailsServer({
      slug: templateSlug,
      lang: locale,
    });

    if (res.success && res.data?.name) {
      return {
        title: `${res.data.name} — ORICO`,
        description: res.data.description,
      };
    }
  } catch {
    // Fallback if network or auth error occurs during metadata generation
  }

  return {
    title: locale === "ar" ? "أداة ذكية — ORICO" : "AI Template — ORICO",
  };
}

export default async function TemplateToolPage({ params }: Props) {
  const { slug, toolName, locale } = await params;
  const templateSlug = toolName || slug;
  const categoryType = toolName ? slug : "writing";

  return (
    <div className="w-full flex-1 min-h-full">
      <Suspense
        key={`${templateSlug}-${locale}`}
        fallback={<TemplateDetailsSkeleton />}
      >
        <TemplateDetailsView
          slug={templateSlug}
          type={categoryType}
          locale={locale}
        />
      </Suspense>
    </div>
  );
}

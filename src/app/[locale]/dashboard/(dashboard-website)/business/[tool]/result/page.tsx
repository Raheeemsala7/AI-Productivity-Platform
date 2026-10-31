import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BUSINESS_TOOLS_DATA } from "@/features/business/data/business-tools.data";
import { BusinessPlanResultView } from "@/features/business/components/business-plan-result-view";

interface Props {
  params: Promise<{
    locale: string;
    tool: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool, locale } = await params;
  const isAr = locale === "ar";
  const item = BUSINESS_TOOLS_DATA.find((t) => t.slug === tool);

  if (!item) {
    return {
      title: isAr ? "خطة العمل — ORICO" : "Business Plan Result — ORICO",
    };
  }

  return {
    title: isAr
      ? "خطة العمل الاستراتيجية المعتمدة — ORICO"
      : "Strategic Business Plan Result — ORICO",
    description: isAr
      ? "عرض تفصيلي لخطة العمل، تقييم الجدوى، تحليل SWOT، ومخطط نموذج العمل التجاري."
      : "Comprehensive business plan, feasibility evaluation, SWOT matrix, and business model canvas.",
  };
}

export default async function BusinessPlanResultPage({ params }: Props) {
  const { tool } = await params;
  const item = BUSINESS_TOOLS_DATA.find((t) => t.slug === tool);

  if (!item) {
    notFound();
  }

  return (
    <div className="w-full flex-1 min-h-full">
      <BusinessPlanResultView />
    </div>
  );
}

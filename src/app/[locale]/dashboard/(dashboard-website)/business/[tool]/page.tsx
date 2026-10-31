import React from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { BUSINESS_TOOLS_DATA } from "@/features/business/data/business-tools.data";
import { BusinessToolWorkspace } from "@/features/business/components/business-tool-workspace";
import { BusinessPlanWizard } from "@/features/business/components/business-plan-wizard";
import { PresentationStudio } from "@/features/business/components/presentation-studio";

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
      title: isAr ? "أدوات الشركات — ORICO" : "Business Tools — ORICO",
    };
  }

  const titles: Record<string, { ar: string; en: string }> = {
    "business-plan": { ar: "إنشاء خطة عمل بالذكاء الاصطناعي", en: "AI Business Plan Generator" },
    "generate-presentation": { ar: "توليد العروض التقديمية", en: "AI Pitch Deck Generator" },
    "generate-landing": { ar: "توليد صفحات الهبوط", en: "AI Landing Page Generator" },
    "business-proposal": { ar: "مقترحات وعقود الأعمال", en: "AI Business Proposals" },
    "business-reports": { ar: "تقارير وتحليلات الأعمال", en: "Executive Reports & SWOT" },
  };

  const name = titles[item.id]?.[isAr ? "ar" : "en"] || item.id;

  return {
    title: `${name} — ORICO`,
    description: isAr
      ? `استوديو ${name} المتقدم باستخدام أحدث نماذج الذكاء الاصطناعي للأعمال.`
      : `Advanced ${name} studio powered by AI.`,
  };
}

export default async function BusinessToolSubPage({ params }: Props) {
  const { tool } = await params;
  const toolItem = BUSINESS_TOOLS_DATA.find((t) => t.slug === tool);

  if (!toolItem) {
    notFound();
  }

  if (toolItem.id === "business-plan") {
    return (
      <div className="w-full flex-1 min-h-full">
        <BusinessPlanWizard />
      </div>
    );
  }

  if (toolItem.id === "generate-presentation") {
    redirect("/dashboard/presentation?mode=presentation");
  }

  if (toolItem.id === "generate-landing") {
    redirect("/dashboard/presentation?mode=landing");
  }

  return (
    <div className="w-full flex-1 min-h-full">
      <BusinessToolWorkspace tool={toolItem} />
    </div>
  );
}


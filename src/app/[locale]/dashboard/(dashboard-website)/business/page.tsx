import React from "react";
import type { Metadata } from "next";
import { BusinessToolsView } from "@/features/business/components/business-tools-view";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "أدوات الشركات والأعمال — ORICO" : "Business Tools — ORICO",
    description: isAr
      ? "استوديو أدوات الشركات: إنشاء خطة عمل، توليد العروض التقديمية، صفحات الهبوط، مقترحات الأعمال، والتقارير التنفيذية بالذكاء الاصطناعي."
      : "AI Business Studio: Business Plan Generator, Presentation Pitch Decks, Landing Pages, B2B Proposals, and Executive Reports.",
  };
}

export default function BusinessToolsPage() {
  return (
    <div className="w-full flex-1 min-h-full">
      <BusinessToolsView />
    </div>
  );
}


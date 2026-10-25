import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidTemplateType, TemplateType } from "@/features/templates/types/template";
import { TemplatesLibraryView } from "@/features/templates/components/templates-library-view";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
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

export default async function TemplatesSlugPage({ params }: Props) {
  const { slug } = await params;

  if (!isValidTemplateType(slug)) {
    notFound();
  }

  return (
    <div className="w-full flex-1 min-h-full">
      <TemplatesLibraryView initialType={slug as TemplateType} />
    </div>
  );
}

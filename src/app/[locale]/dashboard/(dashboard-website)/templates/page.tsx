import { TemplatesCatalog } from "@/features/templates/components/templates-catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أدوات الكتابة والقوالب — ORICO",
  description: "استخدم الذكاء الاصطناعي لإنشاء محتوى بكفاءة، أدوات الشركات، محرر المقالات ومحرر النصوص.",
};

export default function TemplatesPage() {
  return (
    <div className="w-full flex-1 min-h-full">
      <TemplatesCatalog />
    </div>
  );
}

import { notFound } from "next/navigation";
import { TEMPLATES_DATA } from "@/features/templates/data/templates.data";
import { TemplateToolWorkspace } from "@/features/templates/components/template-tool-workspace";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TEMPLATES_DATA.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = TEMPLATES_DATA.find((item) => item.slug === slug);

  if (!tool) {
    return {
      title: "أداة كتابة — ORICO",
    };
  }

  return {
    title: `${tool.title} — أدوات الكتابة الذكية`,
    description: tool.description,
  };
}

export default async function TemplateToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = TEMPLATES_DATA.find((item) => item.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="w-full flex-1 min-h-full">
      <TemplateToolWorkspace tool={tool} />
    </div>
  );
}

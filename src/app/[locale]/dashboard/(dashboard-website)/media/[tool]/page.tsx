import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MEDIA_TOOLS_DATA } from "@/features/media/data/media-tools.data";
import { MediaToolWorkspace } from "@/features/media/components/media-tool-workspace";

interface Props {
  params: Promise<{
    locale: string;
    tool: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool, locale } = await params;
  const isAr = locale === "ar";
  const item = MEDIA_TOOLS_DATA.find((t) => t.slug === tool);

  if (!item) {
    return {
      title: isAr ? "أدوات الميديا — ORICO" : "Media Tools — ORICO",
    };
  }

  const titles: Record<string, { ar: string; en: string }> = {
    "generate-image": { ar: "توليد الصور بالذكاء الاصطناعي", en: "AI Image Generator" },
    "generate-video": { ar: "توليد الفيديو بالذكاء الاصطناعي", en: "AI Video Generator" },
    "text-to-speech": { ar: "تحويل النص إلى صوت طبيعي", en: "AI Text to Speech" },
    "image-editor": { ar: "محرر الصور الذكي", en: "AI Image Editor" },
    "audio-transcription": { ar: "تفريغ الصوت لنصوص", en: "AI Audio Transcription" },
  };

  const name = titles[item.id]?.[isAr ? "ar" : "en"] || item.id;

  return {
    title: `${name} — ORICO`,
    description: isAr
      ? `استوديو ${name} المتقدم باستخدام أحدث نماذج الذكاء الاصطناعي.`
      : `Advanced ${name} studio powered by state-of-the-art AI.`,
  };
}

export default async function MediaToolSubPage({ params }: Props) {
  const { tool } = await params;
  const toolItem = MEDIA_TOOLS_DATA.find((t) => t.slug === tool);

  if (!toolItem) {
    notFound();
  }

  return (
    <div className="w-full flex-1 min-h-full">
      <MediaToolWorkspace tool={toolItem} />
    </div>
  );
}


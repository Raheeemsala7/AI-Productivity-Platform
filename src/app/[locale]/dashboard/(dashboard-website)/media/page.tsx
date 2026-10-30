import React from "react";
import type { Metadata } from "next";
import { MediaToolsView } from "@/features/media/components/media-tools-view";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "أدوات الميديا والوسائط — ORICO" : "Media Tools — ORICO",
    description: isAr
      ? "استوديو الذكاء الاصطناعي لتوليد الصور والفيديو، تحويل النص إلى صوت، محرر الصور، وتفريغ الصوت لنصوص بدقة فائقة."
      : "AI media studio: Generate images & video, Text-to-Speech, AI Image Editor, and Audio Transcription.",
  };
}

export default function MediaToolsPage() {
  return (
    <div className="w-full flex-1 min-h-full">
      <MediaToolsView />
    </div>
  );
}


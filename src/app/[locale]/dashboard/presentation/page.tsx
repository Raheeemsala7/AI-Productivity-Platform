import React from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { PresentationStudio } from "@/features/business/components/presentation-studio";
import { PresentationNavbar } from "@/features/business/components/presentation-navbar";

interface Props {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    mode?: string;
  }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { mode } = await searchParams;
  const isAr = locale === "ar";

  if (mode === "landing") {
    return {
      title: isAr
        ? "توليد صفحات الهبوط بالذكاء الاصطناعي — ORICO"
        : "AI Landing Page Generator — ORICO",
      description: isAr
        ? "أنشئ صفحات هبوط احترافية عالية التحويل في ثوانٍ معدودة."
        : "Generate high-converting landing pages with AI in seconds.",
    };
  }

  return {
    title: isAr
      ? "استوديو العروض وصفحات الهبوط بالذكاء الاصطناعي — ORICO"
      : "AI Decks & Landing Studio — ORICO",
    description: isAr
      ? "أنشئ عروضاً تقديمية وصفحات هبوط احترافية بالذكاء الاصطناعي في ثوانٍ معدودة."
      : "Create stunning, investor-ready pitch decks and landing pages with AI.",
  };
}

export default async function PresentationStandalonePage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  const { mode } = await searchParams;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-purple-500/20 selection:text-purple-300 relative overflow-x-hidden">
      {/* Background ambient radial gradients matching Gamma & modern AI studio UI */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent blur-3xl opacity-80" />
        <div className="absolute top-[20%] right-[10%] w-[450px] h-[350px] bg-sky-500/8 blur-[120px] rounded-full" />
        <div className="absolute top-[35%] left-[5%] w-[450px] h-[350px] bg-purple-500/6 blur-[120px] rounded-full" />
      </div>

      {/* Sleek Minimal Studio Top Navbar */}
      <PresentationNavbar
        userName={session.user.name ?? undefined}
        userEmail={session.user.email ?? undefined}
        credits={120}
      />

      {/* Main Studio View - Dedicated full-screen studio without any layouts */}
      <main className="flex-1 w-full pb-16">
        <PresentationStudio initialMode={mode} hideHeader />
      </main>
    </div>
  );
}

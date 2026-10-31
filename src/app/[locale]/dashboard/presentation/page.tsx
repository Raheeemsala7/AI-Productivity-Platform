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
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "إنشاء عروض تقديمية استثنائية — ORICO"
      : "AI Presentation Studio — ORICO",
    description: isAr
      ? "أنشئ عروضاً تقديمية احترافية بالذكاء الاصطناعي في ثوانٍ معدودة."
      : "Create stunning, investor-ready pitch decks with AI in seconds.",
  };
}

export default async function PresentationStandalonePage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-purple-500/20 selection:text-purple-300 relative overflow-x-hidden">
      {/* Background ambient radial gradients matching the reference UI */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-gradient-to-b from-purple-600/12 via-indigo-600/6 to-transparent blur-3xl opacity-80" />
        <div className="absolute top-[20%] right-[10%] w-[450px] h-[350px] bg-purple-500/8 blur-[120px] rounded-full" />
        <div className="absolute top-[35%] left-[5%] w-[450px] h-[350px] bg-blue-500/6 blur-[120px] rounded-full" />
      </div>

      {/* Sleek Minimal Studio Top Navbar */}
      <PresentationNavbar
        userName={session.user.name ?? undefined}
        userEmail={session.user.email ?? undefined}
        credits={120}
      />

      {/* Main Studio View - Dedicated full-screen studio without any layouts */}
      <main className="flex-1 w-full pb-16">
        <PresentationStudio hideHeader />
      </main>
    </div>
  );
}


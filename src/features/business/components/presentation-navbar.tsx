"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Presentation,
  Sparkles,
  Zap,
} from "lucide-react";
import { LanguageToggle } from "@/shared/components/language-toggle";
import { AnimatedThemeToggler } from "@/shared/components/ui/animated-theme-toggler";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/utils";

interface PresentationNavbarProps {
  userName?: string;
  userEmail?: string;
  credits?: number;
}

export function PresentationNavbar({
  userName = "Founder",
  userEmail,
  credits = 120,
}: PresentationNavbarProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("PresentationStudio");

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "OR";

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-xs transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Back Link & Studio Brand Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/dashboard/business"
            aria-label={t("backLink")}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border/60 transition-all group"
          >
            {isRtl ? (
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            )}
            <span className="hidden sm:inline">{t("backLink")}</span>
          </Link>

          <div className="h-5 w-px bg-border/60 hidden sm:block" />

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-600/20 shrink-0">
              <Presentation className="size-4 sm:size-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-foreground truncate">
                  {isRtl ? "استوديو الإنشاء الذكي" : "AI Creation Studio"}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <span className="size-1.5 rounded-full bg-purple-500 animate-ping" />
                  Decks & Landing AI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Controls (Credits, Lang, Theme, User) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Credits Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/60 border border-border/70 text-xs font-semibold text-foreground">
            <Zap className="size-3.5 text-amber-500 fill-amber-500/20" />
            <span>
              {credits} {isRtl ? "رصيد" : "Credits"}
            </span>
          </div>

          {/* Language Switcher */}
          <LanguageToggle />

          {/* Theme Toggler */}
          <AnimatedThemeToggler />

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-1 rtl:pl-0 rtl:pr-1">
            <Avatar className="size-8.5 rounded-full border border-purple-500/30 ring-2 ring-purple-500/10">
              <AvatarFallback className="bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}


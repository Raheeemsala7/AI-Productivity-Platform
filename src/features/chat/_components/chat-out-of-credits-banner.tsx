"use client";

import React from "react";
import { AlertCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";

interface ChatOutOfCreditsBannerProps {
  className?: string;
  credits?: number;
}

export default function ChatOutOfCreditsBanner({
  className,
  credits = 0,
}: ChatOutOfCreditsBannerProps) {
  const t = useTranslations("Chat");

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "mb-2.5 flex flex-col gap-2.5 rounded-xl border p-3 shadow-2xs backdrop-blur-md transition-all sm:flex-row sm:items-center sm:justify-between",
        "border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent text-foreground",
        "dark:border-amber-500/25 dark:from-amber-950/40 dark:via-amber-900/10 dark:to-transparent",
        "animate-in fade-in slide-in-from-bottom-2 duration-300",
        className,
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
          <AlertCircle className="size-4.5" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold leading-tight text-foreground">
              {t("outOfCreditsTitle")}
            </p>
            <span className="inline-flex items-center rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
              {credits} {t("creditsRemaining")}
            </span>
          </div>
          <p className="mt-1 text-[11px] leading-normal text-muted-foreground">
            {t("outOfCreditsDesc")}
          </p>
        </div>
      </div>

      <Link
        href="/dashboard/subscription"
        className={cn(
          "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-all",
          "bg-[image:var(--gradient-primary)] hover:opacity-90 active:scale-95",
          "self-start sm:self-auto",
        )}
      >
        <Sparkles className="size-3.5" />
        <span>{t("upgradePlan")}</span>
      </Link>
    </div>
  );
}

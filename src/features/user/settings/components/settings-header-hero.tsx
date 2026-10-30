"use client";

import React, { useState } from "react";
import { User } from "@/features/auth/types/auth";
import { Sparkles, RefreshCw, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

interface SettingsHeaderHeroProps {
  user: User | null;
  onRefresh: () => Promise<any> | void;
  isRefreshing?: boolean;
}

export function SettingsHeaderHero({
  user,
  onRefresh,
  isRefreshing = false,
}: SettingsHeaderHeroProps) {
  const t = useTranslations("Settings");
  const locale = useLocale();
  const [localSpinning, setLocalSpinning] = useState(false);

  const credits = user?.credits ?? 0;
  const planCredits = user?.plan?.credits ?? 1;
  const planName = user?.plan?.name || "Starter";
  const avatarColor = user?.avatar_color || "#42a5f5";

  const percentage = Math.min(
    100,
    Math.max(0, Math.round((credits / (planCredits || 1)) * 100))
  );

  const getInitials = (name?: string) =>
    name
      ? name
          .trim()
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

  const handleRefresh = async () => {
    try {
      setLocalSpinning(true);
      await Promise.resolve(onRefresh());
      toast.success(
        locale === "ar"
          ? "تم جلب أحدث رصيد مباشرة من الخادم!"
          : "Credits refreshed live from server!"
      );
    } catch {
      toast.error(
        locale === "ar" ? "فشل تحديث البيانات" : "Failed to refresh data"
      );
    } finally {
      setTimeout(() => setLocalSpinning(false), 500);
    }
  };

  const isSpinning = isRefreshing || localSpinning;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card/95 to-muted/20 shadow-xs">
      {/* Decorative ambient background mesh & glowing orb */}
      <div
        className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: avatarColor }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary" />

      <div className="relative p-5 sm:p-6 space-y-6">
        {/* Top Header Row: User Info + Refresh Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* User Identity Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="size-16 sm:size-20 ring-3 ring-border/80 shadow-sm transition-transform hover:scale-102">
                <AvatarFallback
                  className="text-lg sm:text-xl font-bold text-white transition-colors duration-300"
                  style={{ backgroundColor: avatarColor }}
                >
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <span
                className="absolute -bottom-1 -end-1 size-5 rounded-full ring-2 ring-card flex items-center justify-center text-[10px] text-white shadow-xs"
                style={{ backgroundColor: avatarColor }}
                title={user?.role || "user"}
              >
                <CheckCircle2 className="size-3.5 fill-current text-white" />
              </span>
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
                  {user?.name || "User"}
                </h2>
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary border border-primary/20">
                  <Sparkles className="size-3" />
                  {planName}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t("hero.liveBadge")}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {user?.email}
              </p>

              {user?.slogan && (
                <div className="pt-0.5">
                  <span className="inline-block rounded-full bg-muted/80 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80 border border-border/60">
                    {user.slogan}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Action: Refresh Button */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="sm:hidden inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t("hero.liveBadge")}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isSpinning}
              title={t("hero.refreshTooltip")}
              className="h-9 gap-2 text-xs shadow-2xs hover:bg-muted font-medium"
            >
              <RefreshCw
                className={cn("size-3.5 transition-transform duration-500", {
                  "animate-spin": isSpinning,
                })}
              />
              <span>{isSpinning ? t("hero.refreshing") : t("creditsCard.refreshButton")}</span>
            </Button>
          </div>
        </div>

        {/* FULL WIDTH CREDIT BAR SECTION (ياخد مساحة الشاشة بالكامل + اللون الأساسي) */}
        <div className="w-full rounded-xl border border-primary/25 bg-background/80 p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="size-4.5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-foreground block">
                  {t("creditsCard.title")}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {t("creditsCard.description")}
                </span>
              </div>
            </div>

            {/* Credit Numbers & Percentage Badge */}
            <div className="flex items-baseline gap-2 self-start sm:self-auto">
              <span className="font-mono text-xl sm:text-2xl font-black text-primary tracking-tight">
                {credits.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                / {planCredits.toLocaleString()} {t("creditsCard.creditsUnit")}
              </span>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary border border-primary/20">
                {percentage}%
              </span>
            </div>
          </div>

          {/* Full-width Progress Bar using Primary Brand Color */}
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/80 p-0.5 ring-1 ring-primary/20">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700 ease-out shadow-xs"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Bottom details of Credit Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground pt-0.5">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>{t("creditsCard.cacheFreeNotice")}</span>
            </span>

            {user?.ends_at && (
              <span className="dir-ltr font-mono font-medium text-foreground/80">
                {new Date(user.ends_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

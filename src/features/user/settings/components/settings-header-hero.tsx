"use client";

import React, { useState } from "react";
import { User } from "@/features/auth/types/auth";
import { Sparkles, RefreshCw, CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-primary to-brand/40" />

      <div className="relative p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
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
              <span className="inline-flex items-center gap-1 rounded-md bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand border border-brand/20">
                <Sparkles className="size-3" />
                {planName}
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

        {/* Live Credits Meter & Instant Refresh */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-border/60">
          <div className="rounded-xl border border-border/80 bg-background/80 p-3 shadow-2xs min-w-[200px]">
            <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                {t("hero.liveBadge")}
              </span>
              <span className="font-mono font-bold text-foreground dir-ltr">
                {credits.toLocaleString()}{" "}
                <span className="text-[10px] text-muted-foreground font-normal">
                  / {planCredits.toLocaleString()}
                </span>
              </span>
            </div>

            {/* Compact Progress */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  percentage > 25
                    ? "bg-gradient-to-r from-brand to-primary"
                    : "bg-gradient-to-r from-amber-500 to-rose-500"
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{t("creditsCard.percentageLeft")}</span>
              <span className="font-semibold text-foreground">{percentage}%</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isSpinning}
            title={t("hero.refreshTooltip")}
            className="h-10 gap-2 text-xs shadow-2xs hover:bg-muted font-medium"
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
    </div>
  );
}


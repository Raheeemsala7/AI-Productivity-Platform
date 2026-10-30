"use client";

import React, { useState } from "react";
import { Zap, Sparkles, RefreshCw, Calendar, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { User } from "@/features/auth/types/auth";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

interface CreditsOverviewCardProps {
  user: User | null;
  onRefresh: () => Promise<any> | void;
  isRefreshing?: boolean;
}

export function CreditsOverviewCard({
  user,
  onRefresh,
  isRefreshing = false,
}: CreditsOverviewCardProps) {
  const t = useTranslations("Settings");
  const locale = useLocale();
  const [localSpinning, setLocalSpinning] = useState(false);

  const credits = user?.credits ?? 0;
  const planCredits = user?.plan?.credits ?? 1;
  const planName = user?.plan?.name || "Starter";

  const percentage = Math.min(
    100,
    Math.max(0, Math.round((credits / (planCredits || 1)) * 100))
  );

  const formattedDate = user?.ends_at
    ? new Date(user.ends_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const handleManualRefresh = async () => {
    try {
      setLocalSpinning(true);
      await Promise.resolve(onRefresh());
      toast.success(
        locale === "ar"
          ? "تم تحديث الرصيد بنجاح!"
          : "Credits updated successfully!"
      );
    } catch {
      toast.error(
        locale === "ar"
          ? "فشل تحديث الرصيد"
          : "Failed to refresh credits"
      );
    } finally {
      setTimeout(() => setLocalSpinning(false), 600);
    }
  };

  const isSpinning = isRefreshing || localSpinning;

  return (
    <Card className="relative overflow-hidden border-border/80 bg-gradient-to-br from-card via-card/95 to-muted/30 shadow-xs">
      {/* Decorative top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand/80 via-primary to-brand/40" />

      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Sparkles className="size-4" />
            </span>
            <CardTitle className="text-lg font-bold">
              {t("creditsCard.title")}
            </CardTitle>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t("creditsCard.liveStatus")}
            </span>
          </div>
          <CardDescription className="text-xs">
            {t("creditsCard.description")}
          </CardDescription>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleManualRefresh}
          disabled={isSpinning}
          className="h-8 gap-1.5 text-xs shadow-2xs hover:bg-muted"
        >
          <RefreshCw
            className={cn("size-3.5 transition-transform duration-500", {
              "animate-spin": isSpinning,
            })}
          />
          <span>{t("creditsCard.refreshButton")}</span>
        </Button>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Main Stats Display */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Credits Balance */}
          <div className="rounded-xl border border-border/60 bg-background/60 p-3.5 shadow-2xs">
            <span className="text-xs font-medium text-muted-foreground">
              {t("creditsCard.remainingCredits")}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-extrabold tracking-tight text-foreground">
                {credits.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                / {planCredits.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{t("creditsCard.percentageLeft")}</span>
              <span
                className={cn(
                  "font-semibold",
                  percentage > 25 ? "text-brand" : "text-amber-500"
                )}
              >
                {percentage}%
              </span>
            </div>
          </div>

          {/* Current Plan */}
          <div className="rounded-xl border border-border/60 bg-background/60 p-3.5 shadow-2xs">
            <span className="text-xs font-medium text-muted-foreground">
              {t("creditsCard.currentPlan")}
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">
                {planName}
              </span>
              <span className="rounded-md bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand border border-brand/20">
                {t("creditsCard.activeBadge")}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              {t("creditsCard.planIncludes", { count: planCredits })}
            </p>
          </div>

          {/* Renewal Date */}
          <div className="rounded-xl border border-border/60 bg-background/60 p-3.5 shadow-2xs">
            <span className="text-xs font-medium text-muted-foreground">
              {t("creditsCard.renewalDate")}
            </span>
            <div className="mt-1 flex items-center gap-1.5 text-foreground font-semibold">
              <Calendar className="size-4 text-muted-foreground" />
              <span className="text-base dir-ltr">{formattedDate}</span>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              {t("creditsCard.autoRenewNote")}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{t("creditsCard.usageProgress")}</span>
            <span className="font-medium text-foreground">
              {credits} {t("creditsCard.creditsUnit")}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out",
                percentage > 35
                  ? "bg-gradient-to-r from-brand/80 to-brand"
                  : percentage > 15
                  ? "bg-gradient-to-r from-amber-500 to-amber-600"
                  : "bg-gradient-to-r from-red-500 to-rose-600"
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>{t("creditsCard.cacheFreeNotice")}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/subscription"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              {t("creditsCard.manageSubscription")}
            </Link>
            <Link
              href="/dashboard/plans"
              className={cn(buttonVariants({ size: "sm" }), "gap-1 text-xs")}
            >
              <span>{t("creditsCard.upgradePlan")}</span>
              <ArrowUpRight className="size-3.5 rtl:rotate-90" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

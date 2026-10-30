"use client";

import React from "react";
import { User } from "@/features/auth/types/auth";
import {
  Zap,
  Sparkles,
  Calendar,
  CheckCircle2,
  TrendingDown,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { buttonVariants } from "@/shared/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { useLocale, useTranslations } from "next-intl";

interface CreditsBillingTabProps {
  user: User | null;
}

export function CreditsBillingTab({ user }: CreditsBillingTabProps) {
  const t = useTranslations("Settings");
  const locale = useLocale();

  const credits = user?.credits ?? 0;
  const planCredits = user?.plan?.credits ?? 1;
  const planName = user?.plan?.name || "Starter";
  const consumed = Math.max(0, planCredits - credits);

  const percentage = Math.min(
    100,
    Math.max(0, Math.round((credits / (planCredits || 1)) * 100))
  );

  const formattedDate = user?.ends_at
    ? new Date(user.ends_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const features = [
    t("billingTab.feature1"),
    t("billingTab.feature2"),
    t("billingTab.feature3"),
    t("billingTab.feature4"),
  ];

  return (
    <div className="space-y-6">
      {/* 4 Metrics Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Remaining Credits */}
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {t("billingTab.remaining")}
            </span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Zap className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-foreground">
            {credits.toLocaleString()}
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1">
            <span className="font-semibold text-brand">{percentage}%</span>{" "}
            {t("creditsCard.percentageLeft")}
          </p>
        </div>

        {/* Total Plan Allowance */}
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {t("billingTab.totalPlan")}
            </span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Layers className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-foreground">
            {planCredits.toLocaleString()}
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {t("creditsCard.planIncludes", { count: planCredits })}
          </p>
        </div>

        {/* Consumed Credits */}
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {t("billingTab.consumed")}
            </span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <TrendingDown className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-foreground">
            {consumed.toLocaleString()}
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {Math.round(((consumed / (planCredits || 1)) * 100))}% من إجمالي الباقة
          </p>
        </div>

        {/* Next Renewal Date */}
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {t("billingTab.renewalDate")}
            </span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Calendar className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-sm font-semibold text-foreground truncate dir-ltr">
            {formattedDate}
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {t("creditsCard.autoRenewNote")}
          </p>
        </div>
      </div>

      {/* Visual Usage Progress Card */}
      <Card className="border-border/80 shadow-xs">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">
                {t("billingTab.title")}
              </CardTitle>
              <CardDescription className="text-xs">
                {t("billingTab.description")}
              </CardDescription>
            </div>
            <span className="rounded-md bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand border border-brand/20">
              {planName}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Bar with markers */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>0</span>
              <span className="font-semibold text-foreground">
                {credits.toLocaleString()} {t("creditsCard.creditsUnit")}
              </span>
              <span>{planCredits.toLocaleString()}</span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-muted/80 p-0.5">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700 ease-out",
                  percentage > 25
                    ? "bg-gradient-to-r from-brand to-primary"
                    : "bg-gradient-to-r from-amber-500 to-rose-600"
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Features Included List */}
          <div className="pt-3 border-t border-border/60">
            <h4 className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">
              {t("billingTab.featuresTitle")}
            </h4>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-xs text-foreground/90"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade Banner CTA */}
          <div className="rounded-xl border border-brand/30 bg-gradient-to-r from-brand/10 via-primary/5 to-transparent p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-start">
              <span className="text-xs font-bold text-foreground flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="size-3.5 text-brand" />
                <span>{t("creditsCard.upgradePlan")}</span>
              </span>
              <p className="text-xs text-muted-foreground max-w-xl">
                {t("billingTab.upgradeCta")}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/dashboard/subscription"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <CreditCard className="size-3.5" />
                <span>{t("billingTab.manageButton")}</span>
              </Link>
              <Link
                href="/dashboard/plans"
                className={cn(buttonVariants({ size: "sm" }), "gap-1 text-xs")}
              >
                <span>{t("billingTab.upgradeButton")}</span>
                <ArrowUpRight className="size-3.5 rtl:rotate-90" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


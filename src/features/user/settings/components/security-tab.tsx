"use client";

import React from "react";
import { User } from "@/features/auth/types/auth";
import { ShieldCheck, Mail, KeyRound, Lock, UserCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { buttonVariants } from "@/shared/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface SecurityTabProps {
  user: User | null;
}

export function SecurityTab({ user }: SecurityTabProps) {
  const t = useTranslations("Settings");

  return (
    <div className="space-y-6">
      <Card className="border-border/80 shadow-xs">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <ShieldCheck className="size-4" />
            </span>
            <CardTitle className="text-base font-bold">
              {t("securityTab.title")}
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            {t("securityTab.description")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Email verification status */}
          <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-background border border-border/80 text-foreground">
                <Mail className="size-4.5 text-muted-foreground" />
              </div>
              <div>
                <span className="text-xs font-semibold text-foreground block">
                  {user?.email}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {t("securityTab.emailVerified")}
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {t("securityTab.emailStatus")}
            </span>
          </div>

          {/* Session details */}
          <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-background border border-border/80 text-foreground">
                <UserCheck className="size-4.5 text-muted-foreground" />
              </div>
              <div>
                <span className="text-xs font-semibold text-foreground block">
                  {t("securityTab.sessionTitle")}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {t("securityTab.sessionDesc")}
                </span>
              </div>
            </div>

            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-mono text-muted-foreground border border-border/60">
              {user?.role || "user"}
            </span>
          </div>

          {/* Password Reset Notice */}
          <div className="rounded-xl border border-border/70 bg-muted/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 shrink-0 mt-0.5 sm:mt-0">
                <KeyRound className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-foreground block">
                  {t("securityTab.passwordNotice")}
                </span>
                <p className="text-[11px] text-muted-foreground">
                  {t("securityTab.resetInfo")}
                </p>
              </div>
            </div>

            <Link
              href="/forgot-password"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Lock className="size-3.5" />
              <span>{t("securityTab.resetPasswordBtn")}</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


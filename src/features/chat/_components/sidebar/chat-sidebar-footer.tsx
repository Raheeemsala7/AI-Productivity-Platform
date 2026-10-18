"use client";

import React from "react";
import { ArrowLeft, Sparkles, User as UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { useUserProfile } from "@/features/auth/hooks/use-user-profile";
import { User } from "@/features/auth/types/auth";

interface ChatSidebarFooterProps {
  initialUser?: User | null;
}

export default function ChatSidebarFooter({ initialUser }: ChatSidebarFooterProps) {
  const t = useTranslations("Chat");

  // React Query hook for dynamic live user profile and credits updates
  const { data: user } = useUserProfile(initialUser || undefined);

  const getInitials = (name?: string | null) =>
    name
      ? name
          .trim()
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

  const getAvatarUrl = (u?: User | null) => u?.avatar ?? "";
  const getAvatarColor = (u?: User | null) => u?.avatar_color || "var(--color-brand)";

  const credits = user?.credits ?? 0;
  const planCredits = user?.plan?.credits;
  const planName = user?.plan?.name;

  // Calculate percentage of remaining credits if plan total is available
  const percentage =
    planCredits && planCredits > 0
      ? Math.min(100, Math.max(0, Math.round((credits / planCredits) * 100)))
      : null;

  const formattedDate = user?.ends_at
    ? new Date(user.ends_at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <>
      {/* Collapsed Mode: User Avatar with rich Tooltip */}
      <div className="hidden group-data-[collapsible=icon]:block">
        <SidebarMenu className="py-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              aria-label={user?.name || t("account")}
              tooltip={`${user?.name || t("account")} · ${credits} ${t("creditsRemaining") || "رصيد"}`}
              className="rounded-xl flex items-center justify-center p-0"
            >
              {user ? (
                <Avatar className="size-7 shrink-0 ring-1 ring-border">
                  <AvatarImage src={getAvatarUrl(user)} alt={user.name || "User"} />
                  <AvatarFallback
                    style={{
                      backgroundColor: getAvatarColor(user),
                      color: "var(--color-brand-foreground)",
                    }}
                    className="text-[10px] font-bold"
                  >
                    {user.name ? getInitials(user.name) : <UserIcon className="size-3.5" />}
                  </AvatarFallback>
                </Avatar>
              ) : null}
              <span className="sr-only">{user?.name || t("account")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      {/* Expanded Mode: Full profile & credits card */}
      <div className="group-data-[collapsible=icon]:hidden border-t border-border bg-card/40 p-3.5 shrink-0 flex flex-col gap-3">
        {user && (
          <>
            {/* Credits Card */}
            <div className="relative overflow-hidden rounded-xl border border-border/80 bg-gradient-to-br from-background/90 to-muted/40 p-3 shadow-2xs transition-all hover:border-brand/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand shadow-2xs">
                    <Sparkles className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-foreground">
                      {t("creditsRemaining") || "الرصيد المتبقي"}
                    </span>
                    {planName && (
                      <span className="block text-[10px] text-muted-foreground uppercase font-medium">
                        {planName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-end">
                  <div className="flex items-baseline gap-1 justify-end dir-ltr">
                    <span className="font-mono text-sm font-bold text-foreground">
                      {credits}
                    </span>
                    {planCredits ? (
                      <span className="font-mono text-[10px] text-muted-foreground">
                        / {planCredits}
                      </span>
                    ) : null}
                  </div>
                  {percentage !== null && (
                    <span className="text-[10px] font-semibold text-brand">
                      {percentage}%
                    </span>
                  )}
                </div>
              </div>

              {/* Animated Progress Bar */}
              {percentage !== null ? (
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/90">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500 ease-out",
                      percentage > 25
                        ? "bg-gradient-to-r from-brand/80 to-brand"
                        : "bg-gradient-to-r from-amber-500 to-red-500",
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              ) : null}

              {/* Renewal Date */}
              {formattedDate && (
                <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground pt-1.5 border-t border-border/40">
                  <span>تاريخ التجديد</span>
                  <span className="font-medium text-foreground dir-ltr">{formattedDate}</span>
                </div>
              )}
            </div>

            {/* User Profile Info Card */}
            <div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/70 p-2.5 shadow-2xs transition-colors hover:bg-muted/40">
              <Avatar className="size-9 shrink-0 ring-1 ring-border/60">
                <AvatarImage src={getAvatarUrl(user)} alt={user.name || "User"} />
                <AvatarFallback
                  style={{
                    backgroundColor: getAvatarColor(user),
                    color: "var(--color-brand-foreground)",
                  }}
                  className="text-xs font-bold"
                >
                  {user.name ? getInitials(user.name) : <UserIcon className="size-4" />}
                </AvatarFallback>
              </Avatar>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate text-xs font-semibold text-foreground">
                    {user.name || "User"}
                  </span>
                  {planName && (
                    <span className="shrink-0 rounded-md bg-brand/10 px-1.5 py-0.2 text-[9px] font-semibold text-brand border border-brand/20">
                      {planName}
                    </span>
                  )}
                </div>
                <span className="truncate text-[10px] text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Back to Dashboard Link */}
        <Link
          href="/dashboard"
          className="flex w-full items-center gap-2 rounded-lg py-1 px-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 rtl:rotate-180" />
          {t("backToDashboard") || "العودة للوحة التحكم"}
        </Link>
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { User } from "@/features/auth/types/auth";
import { useUserProfile } from "@/features/auth/hooks/use-user-profile";
import { SettingsHeaderHero } from "./settings-header-hero";
import { ProfileInfoForm } from "./profile-info-form";
import { CreditsBillingTab } from "./credits-billing-tab";
import { SecurityTab } from "./security-tab";
import { User as UserIcon, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

interface SettingsViewProps {
  initialUser: User | null;
}

type TabKey = "profile" | "billing" | "security";

export function SettingsView({ initialUser }: SettingsViewProps) {
  const t = useTranslations("Settings");
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  // React Query hook with staleTime: 0 & refetchOnMount: "always" for real-time fresh data
  const {
    data: liveUser,
    refetch,
    isFetching,
  } = useUserProfile(initialUser || undefined);

  const currentUser = liveUser || initialUser;

  const tabs = [
    {
      key: "profile" as TabKey,
      label: t("tabs.profile"),
      icon: UserIcon,
    },
    {
      key: "billing" as TabKey,
      label: t("tabs.billing"),
      icon: Zap,
      badge: `${currentUser?.credits ?? 0}`,
    },
    {
      key: "security" as TabKey,
      label: t("tabs.security"),
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header Hero with Real-Time Credits & Avatar */}
      <SettingsHeaderHero
        user={currentUser}
        onRefresh={() => refetch()}
        isRefreshing={isFetching}
      />

      {/* Modern Segmented Navigation Tabs */}
      <div className="flex border-b border-border/80 gap-2 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "group relative flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-px cursor-pointer focus:outline-hidden",
                isActive
                  ? "border-brand text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Icon
                className={cn(
                  "size-4 transition-colors",
                  isActive ? "text-brand" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span>{tab.label}</span>

              {tab.badge && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-mono font-bold tracking-tight transition-colors",
                    isActive
                      ? "bg-brand/15 text-brand"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="pt-2 animate-fade-up">
        {activeTab === "profile" && <ProfileInfoForm user={currentUser} />}
        {activeTab === "billing" && <CreditsBillingTab user={currentUser} />}
        {activeTab === "security" && <SecurityTab user={currentUser} />}
      </div>
    </div>
  );
}

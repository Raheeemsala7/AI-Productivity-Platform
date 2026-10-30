"use client";

import React from "react";
import { User } from "@/features/auth/types/auth";
import { useUserProfile } from "@/features/auth/hooks/use-user-profile";
import { CreditsOverviewCard } from "./credits-overview-card";
import { ProfileInfoForm } from "./profile-info-form";
import { useTranslations } from "next-intl";

interface SettingsViewProps {
  initialUser: User | null;
}

export function SettingsView({ initialUser }: SettingsViewProps) {
  const t = useTranslations("Settings");

  // React Query hook with staleTime: 0 & refetchOnMount: "always" for real-time fresh data
  const {
    data: liveUser,
    refetch,
    isFetching,
  } = useUserProfile(initialUser || undefined);

  const currentUser = liveUser || initialUser;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("header.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("header.description")}
        </p>
      </div>

      {/* Real-time Credits and Subscription Card */}
      <CreditsOverviewCard
        user={currentUser}
        onRefresh={() => refetch()}
        isRefreshing={isFetching}
      />

      {/* Profile Details Edit Form */}
      <ProfileInfoForm user={currentUser} />
    </div>
  );
}


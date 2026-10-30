import React, { Suspense } from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getUserProfileServer } from "@/features/user/settings/apis/settings.api";
import { SettingsView } from "@/features/user/settings/components/settings-view";
import { SettingsSkeleton } from "@/features/user/settings/components/settings-skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Settings" });

  return {
    title: t("header.title") || "Settings",
    description: t("header.description"),
  };
}

export default async function SettingsPage() {
  const { user } = await getUserProfileServer();

  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsView initialUser={user} />
    </Suspense>
  );
}


"use client";

import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { AnimatedThemeToggler } from "@/shared/components/ui/animated-theme-toggler";
import { LanguageToggle } from "@/shared/components/language-toggle";
import { useTranslations } from "next-intl";

interface HeaderSidebarProps {
  name: string;
  title?: string;
}

export default function HeaderSidebar({
  name,
  title,
}: HeaderSidebarProps) {
  const t = useTranslations("Sidebar");
  const displayTitle = title ?? t("items.dashboard");

  return (
    <header className="flex h-17 shrink-0 items-center justify-between gap-2 border-b bg-card">
      <div className="flex h-full items-center">
        <SidebarTrigger className="h-full w-15" />

        <div className="flex h-full flex-col justify-center">
          <p className="hidden font-bold md:block">{displayTitle}</p>
          <p className="text-lg font-bold md:hidden">{displayTitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 px-3 md:gap-4">
        <LanguageToggle />
        <AnimatedThemeToggler />
      </div>
    </header>
  );
}

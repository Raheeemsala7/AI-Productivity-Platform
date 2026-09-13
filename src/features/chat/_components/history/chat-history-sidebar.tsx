"use client";

import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import HistorySidebarContent from "./history-sidebar-content";

type ChatHistorySidebarProps = {
  className?: string;
};

export default function ChatHistorySidebar({
  className,
}: ChatHistorySidebarProps) {
  const t = useTranslations("Chat");

  return (
    <aside
      className={cn(
        "hidden w-72 shrink-0 flex-col overflow-hidden border-e border-border bg-card/60 backdrop-blur-sm md:flex",
        className,
      )}
    >
      <HistorySidebarContent
        title={t("chatHistory")}
        className="w-full"
      />
    </aside>
  );
}
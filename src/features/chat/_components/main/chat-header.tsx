"use client";

import { cn } from "@/shared/lib/utils";
import { ArrowLeft, Menu, RotateCcw, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { useChatStore } from "../../store/chat.store";
import HistorySidebarContent from "../history/history-sidebar-content";

const iconButtonClass =
  "flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export default function ChatHeader() {
  const t = useTranslations("Chat");
  const locale = useLocale();
  const drawerSide = locale === "ar" ? "right" : "left";

  const hasMessages = useChatStore((state) => state.messages.length > 0);
  const resetChat = useChatStore((state) => state.resetChat);

  const [historyOpen, setHistoryOpen] = useState(false);

  const handleNewConversation = () => {
    resetChat();
    setHistoryOpen(false);
  };

  return (
    <>
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-card/80 px-3 py-3 backdrop-blur-sm sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            aria-label={t("openHistory")}
            onClick={() => setHistoryOpen(true)}
            className={cn(iconButtonClass, "md:hidden")}
          >
            <Menu size={18} />
          </button>

          <SidebarTrigger className="size-9 md:hidden" />

          <Link
            href="/dashboard"
            aria-label={t("goBack")}
            className={cn(iconButtonClass, "hidden sm:flex")}
          >
            <ArrowLeft size={16} />
          </Link>

          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-white shadow-sm">
              <Sparkles size={14} />
            </div>

            <div className="min-w-0 leading-tight">
              <p className="truncate font-display text-[15px] font-medium text-foreground">
                ORICO AI
              </p>
              <p className="hidden truncate text-[10.5px] uppercase tracking-widest text-muted-foreground sm:block">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={handleNewConversation}
            disabled={!hasMessages}
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
            )}
          >
            <RotateCcw size={14} />
            <span className="hidden md:inline">{t("newConversation")}</span>
          </button>

          <ThemeToggle />
        </div>
      </header>

      <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
        <SheetContent
          side={drawerSide}
          showCloseButton={false}
          className="w-72 max-w-[85vw] p-0"
        >
          <SheetHeader className="flex flex-row items-center justify-between gap-0 border-b border-border px-4 py-3">
            <SheetTitle className="text-sm font-medium">{t("chatHistory")}</SheetTitle>
            <button
              type="button"
              aria-label={t("closeHistory")}
              onClick={() => setHistoryOpen(false)}
              className={cn(iconButtonClass, "size-8")}
            >
              <X size={16} />
            </button>
          </SheetHeader>

          <HistorySidebarContent
            className="min-h-0 flex-1"
            onAction={() => setHistoryOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
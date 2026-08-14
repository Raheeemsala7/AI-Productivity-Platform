"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import {
  KeyRound,
  MessageSquarePlus,
  MessagesSquare,
  Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { ChatConversation } from "../types/chat";

type ChatHistorySidebarProps = {
  conversations: ChatConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  className?: string;
};

function formatRelativeTime(timestamp: number, locale: string) {
  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 1) return locale === "ar" ? "الآن" : "Just now";
  if (diffMinutes < 60) {
    return locale === "ar"
      ? `منذ ${diffMinutes} د`
      : `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return locale === "ar"
      ? `منذ ${diffHours} س`
      : `${diffHours}h ago`;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}

export default function ChatHistorySidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  className,
}: ChatHistorySidebarProps) {
  const t = useTranslations("Chat");
  const locale =
    typeof document !== "undefined"
      ? document.documentElement.lang
      : "en";

  return (
    <aside
      className={cn(
        "flex w-72 shrink-0 flex-col border-e border-border bg-card/60 backdrop-blur-sm",
        className,
      )}
    >
      <div className="border-b border-border p-4">
        <button
          type="button"
          onClick={onNew}
          className="btn-primary inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium"
        >
          <MessageSquarePlus size={16} />
          {t("newChat")}
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="px-4 pt-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {t("history")}
          </p>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto p-3">
          {conversations.length === 0 ? (
            <p className="px-2 py-4 text-center text-sm text-muted-foreground">
              {t("noHistory")}
            </p>
          ) : (
            conversations.map((conversation) => {
              const isActive = conversation.id === activeId;

              return (
                <div
                  key={conversation.id}
                  className={cn(
                    "group flex items-center gap-1 rounded-xl border transition-colors",
                    isActive
                      ? "border-brand/30 bg-muted/70"
                      : "border-transparent hover:border-border hover:bg-muted/40",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(conversation.id)}
                    className="flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5 text-start"
                  >
                    <MessagesSquare
                      size={15}
                      className={cn(
                        "mt-0.5 shrink-0",
                        isActive ? "text-brand" : "text-muted-foreground",
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-foreground">
                        {conversation.title}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-muted-foreground">
                        {formatRelativeTime(conversation.updatedAt, locale)}
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    aria-label={t("deleteConversation")}
                    onClick={() => onDelete(conversation.id)}
                    className="me-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {t("account")}
        </p>

        <nav className="space-y-1">
          <Link
            href="/auth/forgot-password"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <KeyRound size={15} />
            {t("forgotPassword")}
          </Link>

          <Link
            href="/auth/reset-password"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <KeyRound size={15} />
            {t("resetPassword")}
          </Link>
        </nav>
      </div>
    </aside>
  );
}

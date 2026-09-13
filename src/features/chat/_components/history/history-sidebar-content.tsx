"use client";

import { cn } from "@/shared/lib/utils";
import { MessageSquarePlus, MessagesSquare, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { MOCK_CONVERSATIONS } from "../../constant/chat.history.mock";
import { useChatStore } from "../../store/chat.store";
import type { ChatConversation } from "../../types/chat";

type HistorySidebarContentProps = {
  onAction?: () => void;
  title?: string;
  className?: string;
};

type GroupKey = "today" | "yesterday" | "week";

type Group = {
  key: GroupKey;
  items: ChatConversation[];
};

function startOfDay(ts: number) {
  const date = new Date(ts);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function groupConversations(conversations: ChatConversation[], now: number): Group[] {
  const todayStart = startOfDay(now);
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;
  const weekStart = todayStart - 6 * 24 * 60 * 60 * 1000;

  const groups: Group[] = [
    { key: "today", items: [] },
    { key: "yesterday", items: [] },
    { key: "week", items: [] },
  ];

  for (const conversation of conversations) {
    const ts = startOfDay(conversation.updatedAt);
    if (ts >= todayStart) {
      groups[0].items.push(conversation);
    } else if (ts >= yesterdayStart) {
      groups[1].items.push(conversation);
    } else if (ts >= weekStart) {
      groups[2].items.push(conversation);
    }
  }

  return groups.filter((group) => group.items.length > 0);
}

function formatRelativeTime(timestamp: number, now: number, locale: string) {
  const diffMs = now - timestamp;
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

export default function HistorySidebarContent({
  onAction,
  title,
  className,
}: HistorySidebarContentProps) {
  const t = useTranslations("Chat");
  const locale = useLocale();

  const [conversations, setConversations] = useState<ChatConversation[]>(MOCK_CONVERSATIONS);
  const [now] = useState(() => Date.now());

  const activeId = useChatStore((state) => state.conversationId);
  const openConversation = useChatStore((state) => state.openConversation);
  const resetChat = useChatStore((state) => state.resetChat);

  const groups = useMemo(
    () => groupConversations(conversations, now),
    [conversations, now],
  );

  const handleNew = () => {
    resetChat();
    onAction?.();
  };

  const handleSelect = (conversation: ChatConversation) => {
    openConversation(conversation);
    onAction?.();
  };

  const handleDelete = (id: string) => {
    setConversations((prev) => prev.filter((conversation) => conversation.id !== id));
  };

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-medium text-foreground">{title}</p>
        </div>
      )}

      <div className="border-b border-border p-4">
        <button
          type="button"
          onClick={handleNew}
          className="btn-primary inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium active:scale-[0.98]"
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

        <div className="flex-1 space-y-4 overflow-y-auto p-3">
          {conversations.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm leading-relaxed text-muted-foreground">
              {t("noHistory")}
            </p>
          ) : (
            groups.map((group) => (
              <div key={group.key}>
                <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                  {t(group.key)}
                </p>

                <div className="space-y-0.5">
                  {group.items.map((conversation) => {
                    const isActive = conversation.id === activeId;

                    return (
                      <div
                        key={conversation.id}
                        className={cn(
                          "group flex items-center gap-1 rounded-xl transition-colors",
                          isActive
                            ? "border border-brand/30 bg-muted/70"
                            : "border border-transparent hover:border-border hover:bg-muted/40",
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelect(conversation)}
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
                            <span
                              className="mt-0.5 block text-[11px] text-muted-foreground"
                              suppressHydrationWarning
                            >
                              {formatRelativeTime(conversation.updatedAt, now, locale)}
                            </span>
                          </span>
                        </button>

                        <button
                          type="button"
                          aria-label={t("deleteConversation")}
                          onClick={() => handleDelete(conversation.id)}
                          className="me-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive md:h-7 md:w-7 md:opacity-0 md:group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
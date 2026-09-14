"use client";

import { cn } from "@/shared/lib/utils";
import { MessageSquarePlus, MessagesSquare, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MOCK_CONVERSATIONS } from "../../constant/chat.history.mock";
import { useChatStore } from "../../store/chat.store";
import type { ChatConversation, Conversation } from "../../types/chat";
import { useLocale, useTranslations } from "next-intl";
import { ConversationItem } from "./conversation-item";

type HistorySidebarContentProps = {
  title?: string;
  className?: string;
  initialConversations: Conversation[]
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



export default function HistorySidebarContent({
  title,
  className,
  initialConversations
}: HistorySidebarContentProps) {
  const t = useTranslations("Chat");
  const locale = useLocale();

const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  const activeId = useChatStore((state) => state.conversationId);
  const openConversation = useChatStore((state) => state.openConversation);
  const resetChat = useChatStore((state) => state.resetChat);
  const setConversationId = useChatStore((state) => state.setConversationId);
  const setPendingNewChat = useChatStore(
    (state) => state.setPendingNewChat,
  );





  const handleNew = () => {
    resetChat();
    setConversationId(null)
  };

  const handleSelect = (conversation: ChatConversation) => {
    openConversation(conversation);
  };

  const handleDelete = (id: string) => {
    setConversations((prev) => prev.filter((conversation) => conversation.id !== id));
  };


  // تحديث المحادثات لما السيرفر يعمل revalidateTag
  useEffect(() => {
    // setConversations(initialConversations);
    // أول ما الداتا الجديدة تيجي، نقفل الـ Skeleton فوراً
    setPendingNewChat(false);
  }, [initialConversations, setPendingNewChat]);

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

        <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-3">
          {conversations.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm leading-relaxed text-muted-foreground">
              {t("noHistory")}
            </p>
          ) : (
            conversations.map((conversation) => (
              <div key={conversation.id}>
                <ConversationItem
                key={conversation.id}
                conversation={conversation}
                activeId={activeId}
                // handleSelect={handleSelect}
                // handleDelete={handleDelete}
              />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
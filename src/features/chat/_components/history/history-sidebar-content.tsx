"use client";

import { cn } from "@/shared/lib/utils";
import { MessageSquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useChatStore } from "../../store/chat.store";
import type { Conversation } from "../../types/chat";
import { useTranslations } from "next-intl";
import { ConversationItem } from "./conversation-item";
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/components/ui/sidebar";

type HistorySidebarContentProps = {
  title?: string;
  className?: string;
  initialConversations?: Conversation[];
};


export default function HistorySidebarContent({
  title,
  className,
  initialConversations = []
}: HistorySidebarContentProps) {
  const t = useTranslations("Chat");
  const { isMobile, setOpenMobile } = useSidebar();

  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  const activeId = useChatStore((state) => state.conversationId);
  const resetChat = useChatStore((state) => state.resetChat);
  const setConversationId = useChatStore((state) => state.setConversationId);
  
  const setPendingNewChat = useChatStore((state) => state.setPendingNewChat);
  const isPendingNewChat = useChatStore((state) => state.isPendingNewChat);

  const handleNew = () => {
    resetChat();
    setConversationId(null);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleSelect = async (conversation: Conversation) => {
    setConversationId(conversation.id);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: keep the local list in sync with the server-fetched conversations.
    setConversations(initialConversations);
    setPendingNewChat(false);
  }, [initialConversations, setPendingNewChat]);

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
{/* Collapsed sidebar: icon-only New Conversation. Reuses the same
          action/state as the expanded button below. */}
      <div className="hidden group-data-[collapsible=icon]:block">
        <SidebarMenu className="py-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              aria-label={t("newConversation")}
              tooltip={t("newConversation")}
              onClick={handleNew}
            >
              <MessageSquarePlus />
              <span>{t("newChat")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      {/* Expanded sidebar: full content. Hidden when collapsed. */}
      <div className="flex min-h-0 flex-1 flex-col group-data-[collapsible=icon]:hidden">
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
            {isPendingNewChat && (
              <div className="group flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5">
                <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-muted-foreground/20" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted-foreground/20" />
              </div>
            )}
            {conversations.length === 0 ? (
              <p className="px-2 py-6 text-center text-sm leading-relaxed text-muted-foreground">
                {t("noHistory")}
              </p>
            ) : (
              conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  activeId={activeId}
                  handleSelect={handleSelect}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
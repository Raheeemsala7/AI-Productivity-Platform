"use client";

import { cn } from "@/shared/lib/utils";
import { MessageSquarePlus, ArrowLeft, User, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { useChatStore } from "../../store/chat.store";
import type { ChatConversation, Conversation } from "../../types/chat";
import { useTranslations } from "next-intl";
import { ConversationItem } from "./conversation-item";
import { useSidebar } from "@/shared/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Link } from "@/i18n/navigation";

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
  const { data: session } = useSession();
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

  const handleDelete = (id: string) => {
    setConversations((prev) => prev.filter((conversation) => conversation.id !== id));
  };

  useEffect(() => {
    setConversations(initialConversations);
    setPendingNewChat(false);
  }, [initialConversations, setPendingNewChat]);

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const getAvatarUrl = (user: any) => user?.image ?? user?.avatar ?? "";
  const getAvatarColor = (user: any) => user?.avatar_color || "hsl(var(--primary))";

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

          {/* 👇 هنا بنعرض الـ Skeleton لمحادثة واحدة فقط لو بتتكريت دلوقتي 👇 */}
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

      <div className="mt-auto border-t border-border bg-card/50 p-4 shrink-0 flex flex-col gap-4">
        {session?.user && (
          <>
            <div className="flex items-center gap-3">
              <CreditCard className="size-4 text-brand" />
              <span className="text-xs font-medium text-muted-foreground">
                120 {t("creditsRemaining")}
              </span>
            </div>
            
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 shadow-sm">
              {/* <Avatar className="size-10 shrink-0">
                <AvatarImage src={getAvatarUrl(session.user)} alt={session.user.name || "User"} />
                <AvatarFallback
                  style={{
                    backgroundColor: getAvatarColor(session.user),
                    color: "hsl(var(--primary-foreground))",
                  }}
                >
                  {session.user.name ? getInitials(session.user.name) : <User className="size-4" />}
                </AvatarFallback>
              </Avatar> */}
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                  {session.user.name || "User"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
            </div>
          </>
        )}

        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {t("backToDashboard")}
        </Link>
      </div>
    </div>
  );
}
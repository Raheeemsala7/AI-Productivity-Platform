import { MessagesSquare } from "lucide-react";
import type { Conversation } from "../../types/chat";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

interface ConversationItemProps {
    conversation: Conversation;
    activeId: string | null;
    // handleSelect: (conversation: Conversation) => void;
    // handleDelete: (id: string) => void;
}

export function ConversationItem({ conversation, activeId }: ConversationItemProps) {
    const t = useTranslations("Chat");
    const isActive = activeId === conversation.id;
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
                // onClick={() => handleSelect(conversation)}
                className="flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5 text-start"
            >
                <MessagesSquare
                    size={15}
                    className={cn(
                        "mt-0.5 shrink-0",
                        isActive ? "text-brand" : "text-muted-foreground",
                    )}
                />
                <span className="block truncate text-sm text-foreground">
                    {conversation.title}
                </span>
            </button>

            <button
                type="button"
                aria-label={t("deleteConversation")}
                // onClick={() => handleDelete(conversation.id)}
                className="me-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive md:h-7 md:w-7 md:opacity-0 md:group-hover:opacity-100"
            >
                {/* <Trash2 size={14} /> */}
            </button>
        </div>
    );
}

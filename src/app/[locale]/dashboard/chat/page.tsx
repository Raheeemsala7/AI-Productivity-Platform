"use client";

import ChatHeader from "@/features/chat/_components/chat-header";
import ChatHistorySidebar from "@/features/chat/_components/chat-history-sidebar";
import ChatInput from "@/features/chat/_components/chat-input";
import EmptyState from "@/features/chat/_components/emptyState";
import MessageBubble from "@/features/chat/_components/message-bubble";
import { CANNED_REPLIES } from "@/features/chat/constant/chat.constant";
import { useChatHistory } from "@/features/chat/hooks/use-chat-history";
import type { ChatStatus, Message } from "@/features/chat/types/chat";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const THINKING_DELAY_MS = 500;
const REPLY_DELAY_MS = 1300;

const iconButtonClass =
  "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";


export default function ChatPage() {
    const t = useTranslations("Chat");
  
  const {
    hydrated,
    conversations,
    activeConversation,
    activeId,
    syncConversation,
    startNewConversation,
    selectConversation,
    deleteConversation,
    clearActiveConversation,
  } = useChatHistory();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!hydrated || !activeConversation) return;

    setMessages(activeConversation.messages);
    setInput("");
    setStatus("idle");
  }, [activeConversation?.id, hydrated]);

  useEffect(() => {
    if (!hydrated || !activeId || busy) return;

    syncConversation(activeId, messages);
  }, [messages, activeId, hydrated, busy, syncConversation]);

  const submit = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || busy || !activeId) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        text: value,
      };

      setMessages((current) => [...current, userMessage]);
      setInput("");
      setStatus("submitted");

      const thinkingId = crypto.randomUUID();

      window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          {
            id: thinkingId,
            role: "assistant",
            text: "",
            thinking: true,
          },
        ]);
        setStatus("streaming");

        const reply =
          CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)];

        window.setTimeout(() => {
          setMessages((current) =>
            current.map((message) =>
              message.id === thinkingId
                ? { ...message, text: reply, thinking: false }
                : message,
            ),
          );
          setStatus("idle");
        }, REPLY_DELAY_MS);
      }, THINKING_DELAY_MS);
    },
    [activeId, busy],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  useEffect(() => {
    if (!busy) {
      textareaRef.current?.focus();
    }
  }, [busy, activeId]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit(input);
    }
  };

  const handleNewConversation = () => {
    if (busy) return;

    startNewConversation();
    setSidebarOpen(false);
  };

  const handleClearConversation = () => {
    if (busy) return;

    clearActiveConversation();
    setMessages([]);
    setInput("");
    setStatus("idle");
  };

  const handleSelectConversation = (conversationId: string) => {
    if (busy) return;

    selectConversation(conversationId);
    setSidebarOpen(false);
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center p-6">
        <div className="glass h-[calc(100dvh-3rem)] w-full max-w-6xl animate-pulse rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col p-4 md:p-6">
      <div className="mx-auto flex w-full max-w-6xl flex-1 overflow-hidden rounded-2xl">
        {/* <ChatHistorySidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelectConversation}
          onNew={handleNewConversation}
          onDelete={deleteConversation}
          className={cn(
            "absolute inset-y-0 start-0 z-20 md:static md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          )}
        /> */}



        <div className="relative flex h-full min-w-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="group-data-[state=collapsed] block md:hidden" />


              <Link href="/dashboard" aria-label="Go back" className={iconButtonClass}>
                <ArrowLeft size={16} />
              </Link>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-white shadow-sm">
                  <Sparkles size={14} />
                </div>

                <div className="leading-tight">
                  <p className="font-display text-[15px] font-medium text-foreground">
                    ORICO AI
                  </p>
                  <p className="text-[10.5px] uppercase tracking-widest text-muted-foreground">
                    {t("subtitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                // onClick={onClear}
                // disabled={!hasMessages}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
                )}
              >
                <RotateCcw size={13} />
                {t("newConversation")}
              </button>

              <ThemeToggle />
            </div>
          </header>

          <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex-1 px-4 py-6">
              {messages.length === 0 ? (
                <EmptyState onPick={submit} />
              ) : (
                <div className="mx-auto flex max-w-2xl flex-col gap-6">
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      role={message.role}
                      text={message.text}
                      isThinking={!!message.thinking}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="sticky bottom-0">
              <ChatInput
                input={input}
                busy={busy}
                textareaRef={textareaRef}
                onChange={setInput}
                onSubmit={() => submit(input)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import ChatHeader from "@/features/chat/_components/chat-header";
import ChatInput from "@/features/chat/_components/chat-input";
import EmptyState from "@/features/chat/_components/emptyState";
import MessageBubble from "@/features/chat/_components/message-bubble";
import { CANNED_REPLIES } from "@/features/chat/constant/chat.constant";
import type { ChatStatus, Message } from "@/features/chat/types/chat";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const THINKING_DELAY_MS = 500;
const REPLY_DELAY_MS = 1300;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<ChatStatus>("idle");

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const busy = status === "submitted" || status === "streaming";

  const submit = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || busy) return;

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
    [busy],
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
  }, [busy]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit(input);
    }
  };

  const clearConversation = () => {
    if (busy) return;

    setMessages([]);
    setInput("");
    setStatus("idle");
  };

  return (
    <div className="flex min-h-dvh items-stretch p-4 md:p-6">
      <div className="glass mx-auto flex h-[calc(100dvh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl md:h-[calc(100dvh-3rem)]">
        <ChatHeader
          hasMessages={messages.length > 0}
          onClear={clearConversation}
        />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6"
        >
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
  );
}

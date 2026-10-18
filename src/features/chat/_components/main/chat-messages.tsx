"use client";

import React from 'react'
import EmptyState from '../emptyState';
import { useChatStore } from '../../store/chat.store';
import MessageBubble from '../message-bubble';
import { Loader2, AlertCircle, ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Message } from '../../types/chat';
import { cn } from '@/shared/lib/utils';

export default function ChatMessages() {
    const t = useTranslations("Chat");
    const queryClient = useQueryClient();

    // States
    const conversationId = useChatStore((state) => state.conversationId);
    const setPendingSuggestion = useChatStore((state) => state.setPendingSuggestion);
    const [showScrollButton, setShowScrollButton] = React.useState(false);

    // Data Fetching
    const { data: messages = [], isLoading, error } = useQuery<Message[]>({
        queryKey: ['conversation', conversationId],
        queryFn: async () => {
            if (!conversationId || conversationId.startsWith("temp-")) return [];
            const res = await fetch(`/api/conversations/${conversationId}/messages`);
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to fetch messages");
            }
            return res.json();
        },
        enabled: !!conversationId && !conversationId.startsWith("temp-"),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });

    const containerRef = React.useRef<HTMLDivElement>(null);
    const bottomRef = React.useRef<HTMLDivElement>(null);
    const prevMessagesLengthRef = React.useRef(messages.length);

    const scrollToBottom = React.useCallback((behavior: ScrollBehavior = "smooth") => {
        if (!containerRef.current) return;
        setShowScrollButton(false);
        containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior,
        });
    }, []);

    const handleScroll = React.useCallback(() => {
        if (!containerRef.current) return;
        const el = containerRef.current;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        setShowScrollButton(distanceFromBottom > 150);
    }, []);

    // Reset tracking when switching conversations
    React.useEffect(() => {
        prevMessagesLengthRef.current = 0;
        setShowScrollButton(false);
    }, [conversationId]);

    // Handle auto-scrolling
    React.useEffect(() => {
        if (!containerRef.current) return;
        const el = containerRef.current;
        const prevLength = prevMessagesLengthRef.current;
        const currentLength = messages.length;
        prevMessagesLengthRef.current = currentLength;

        // On initial load of conversation messages:
        if (prevLength === 0 && currentLength > 0) {
            scrollToBottom("instant");
            return;
        }

        // If a new message was added (e.g. user sent a message):
        // ALWAYS scroll to bottom immediately so user sees their new message!
        if (currentLength > prevLength) {
            scrollToBottom("smooth");
            return;
        }

        // While message text updates (e.g. streaming assistant reply):
        // Auto-scroll only if user is already near the bottom
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 350;
        if (isNearBottom) {
            bottomRef.current?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
        }
    }, [messages.length, messages[messages.length - 1]?.text, messages[messages.length - 1]?.thinking, scrollToBottom]);

    return (
        <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                data-slot="chat-messages-container"
                className="flex-1 px-3 py-4 sm:px-4 sm:py-6 h-full flex flex-col overflow-y-auto custom-scrollbar"
            >
                {isLoading ? (
                    <div className="flex h-full flex-1 items-center justify-center flex-col gap-3 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin text-brand" />
                        <p className="text-sm font-medium">{t("loadingMessages")}</p>
                    </div>
                ) : error ? (
                    <div className="flex h-full flex-1 items-center justify-center flex-col gap-3 text-destructive">
                        <AlertCircle className="h-8 w-8" />
                        <p className="text-sm font-medium">{error instanceof Error ? error.message : "An error occurred"}</p>
                    </div>
                ) : messages.length === 0 ? (
                    <EmptyState onPick={(suggestion) => setPendingSuggestion({ text: suggestion, autoSend: true })} />
                ) : (
                    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 pb-4">
                        {messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                role={message.role}
                                text={message.text}
                                isThinking={message.thinking}
                                isStreaming={message.streaming}
                                onStreamingDone={() => {
                                    useChatStore.getState().setStatus("idle");
                                    const currentId = useChatStore.getState().conversationId;
                                    if (currentId) {
                                        queryClient.setQueryData<Message[]>(
                                            ['conversation', currentId],
                                            (old = []) => old.map(m => m.id === message.id ? { ...m, streaming: false } : m)
                                        );
                                    }
                                }}
                                attachments={message.attachments}
                                audio={message.audio}
                            />
                        ))}
                        <div ref={bottomRef} />
                    </div>
                )}
            </div>

            {/* Scroll to bottom button — floating centered directly above the input box like ChatGPT / Claude */}
            {messages.length > 0 && (
                <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center">
                    <button
                        type="button"
                        onClick={() => scrollToBottom("smooth")}
                        aria-label={t("scrollToBottom")}
                        title={t("scrollToBottom")}
                        className={cn(
                            "pointer-events-auto flex size-9 items-center justify-center rounded-full",
                            "border border-border bg-background/95 text-foreground shadow-lg backdrop-blur-md",
                            "transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95",
                            showScrollButton
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2 pointer-events-none"
                        )}
                    >
                        <ArrowDown className="size-4 text-foreground" />
                    </button>
                </div>
            )}
        </div>
    )
}

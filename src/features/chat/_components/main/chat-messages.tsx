"use client";

import React from 'react'
import EmptyState from '../emptyState';
import { useChatStore } from '../../store/chat.store';
import MessageBubble from '../message-bubble';
import { Loader2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { Message } from '../../types/chat';

export default function ChatMessages() {
    const t = useTranslations("Chat");

    // States
    const conversationId = useChatStore((state) => state.conversationId);
    const setPendingSuggestion = useChatStore((state) => state.setPendingSuggestion);

    // Data Fetching
    const { data: messages = [], isLoading, error } = useQuery<Message[]>({
        queryKey: ['conversation', conversationId],
        queryFn: async () => {
            if (!conversationId) return [];
            const res = await fetch(`/api/conversations/${conversationId}/messages`);
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to fetch messages");
            }
            return res.json();
        },
        enabled: !!conversationId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const bottomRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (messages.length > 0) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length, messages[messages.length - 1]?.text]);

    return (
        <div className="flex-1 px-3 py-4 sm:px-4 sm:py-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
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
                <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pb-4">
                    {messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            role={message.role}
                            text={message.text}
                            isThinking={message.thinking}
                            attachments={message.attachments}
                            audio={message.audio}
                        />
                    ))}
                    <div ref={bottomRef} />
                </div>
            )}
        </div>
    )
}

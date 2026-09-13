"use client";

import React from 'react'
import EmptyState from '../emptyState';
import { useTranslations } from 'next-intl';
import { useChatStore } from '../../store/chat.store';
import MessageBubble from '../message-bubble';

export default function ChatMessages() {

    // Translations
    const t = useTranslations("Chat");

    // States
    const messages = useChatStore((state) => state.messages);


    return (
        <div className="flex-1 px-4 py-6">
            {messages.length === 0 ? (
                <EmptyState onPick={() => { }} />
            ) : (
                <div className="mx-auto flex max-w-2xl flex-col gap-6">
                    {messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                role={message.role}
                                text={message.text}
                                isThinking={message.thinking}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}

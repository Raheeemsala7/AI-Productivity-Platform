"use client";

import React from 'react'
import EmptyState from '../emptyState';
import { useChatStore } from '../../store/chat.store';
import MessageBubble from '../message-bubble';

export default function ChatMessages() {

    // States
    const messages = useChatStore((state) => state.messages);
    const setPendingSuggestion = useChatStore((state) => state.setPendingSuggestion);

    return (
        <div className="flex-1 px-3 py-4 sm:px-4 sm:py-6">
            {messages.length === 0 ? (
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
                </div>
            )}
        </div>
    )
}

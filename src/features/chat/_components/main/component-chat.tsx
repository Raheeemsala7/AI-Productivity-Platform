"use client";

import React, { useRef } from "react";

import ChatInput from "../chat-input";

import { useChatStore } from "../../store/chat.store";
import ChatMessages from "./chat-messages";




//   const handleNewConversation = () => {
//     if (busy) return;

//     startNewConversation();
//     setSidebarOpen(false);
//   };

//   const handleClearConversation = () => {
//     if (busy) return;

//     clearActiveConversation();
//     setMessages([]);
//     setInput("");
//     setStatus("idle");
//   };

//   const handleSelectConversation = (conversationId: string) => {
//     if (busy) return;

//     selectConversation(conversationId);
//     setSidebarOpen(false);
//   };


const THINKING_DELAY_MS = 500;
const REPLY_DELAY_MS = 1300;

export default function ComponentChat() {

    const status = useChatStore((state) => state.status);

    // Refs
    const scrollRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);


    // Variables
    const busy = status === "submitted" || status === "streaming";

    // Mutations





    return (
        <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto">
            
            <ChatMessages />

            <div className="sticky bottom-0">
                <ChatInput
                    textareaRef={textareaRef}
                />
            </div>
        </div>
    );
}

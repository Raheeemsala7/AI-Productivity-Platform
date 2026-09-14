"use client";

import { useRef } from "react";

import ChatInput from "../chat-input";

import ChatMessages from "./chat-messages";

export default function ComponentChat() {

    // Refs
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={scrollRef} className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
            
            <ChatMessages />

            <div className="sticky bottom-0">
                <ChatInput />
            </div>
        </div>
    );
}
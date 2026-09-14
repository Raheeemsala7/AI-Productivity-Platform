"use client";

import ChatInput from "../chat-input";

import ChatMessages from "./chat-messages";

export default function ComponentChat() {

    return (
        <div className="flex flex-col flex-1 min-h-0 h-full overflow-hidden">
            
            <ChatMessages />

            <div className="shrink-0">
                <ChatInput />
            </div>
        </div>
    );
}
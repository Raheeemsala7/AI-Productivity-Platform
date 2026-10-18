"use client";

import ChatInput from "../chat-input";
import ChatMessages from "./chat-messages";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";

export default function ComponentChat() {
    return (
        <div className="relative flex flex-col flex-1 min-h-0 h-full overflow-hidden">
            <div className="absolute top-2.5 start-3 z-10 md:hidden">
                <SidebarTrigger className="size-8 rounded-lg bg-background/80 backdrop-blur border border-border shadow-sm" />
            </div>

            <ChatMessages />

            <div className="shrink-0">
                <ChatInput />
            </div>
        </div>
    );
}
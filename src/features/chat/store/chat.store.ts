import { create } from "zustand";
import { ChatStatus } from "../types/chat";

type ChatState = {
    conversationId: string | null;
    isPendingNewChat: boolean;
    status: ChatStatus;
    pendingSuggestion: { text: string; autoSend?: boolean } | null;

    setConversationId: (id: string | null) => void;
    setPendingNewChat: (status: boolean) => void;
    setPendingSuggestion: (suggestion: { text: string; autoSend?: boolean } | null) => void;
    setStatus: (status: ChatStatus) => void;
    resetChat: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
    conversationId: null,
    status: "idle",
    pendingSuggestion: null,
    isPendingNewChat: false,

    setPendingNewChat: (status: boolean) => set({ isPendingNewChat: status }),
    setPendingSuggestion: (suggestion) => set({ pendingSuggestion: suggestion }),

    setConversationId: (id) => {
        set({ conversationId: id })
    },

    setStatus: (status) => {
        set({ status });
    },

    resetChat: () => {
        set({
            conversationId: null,
            status: "idle",
            pendingSuggestion: null,
        });
    },
}));
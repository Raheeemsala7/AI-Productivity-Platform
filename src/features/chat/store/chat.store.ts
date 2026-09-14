import { create } from "zustand";
import { ChatConversation, ChatStatus, Message } from "../types/chat";

type ChatState = {
    conversationId: string | null;
    isPendingNewChat: boolean;
    messages: Message[];
    status: ChatStatus;
    pendingSuggestion: { text: string; autoSend?: boolean } | null;

    setConversationId: (id: string | null) => void;
    setPendingNewChat: (status: boolean) => void;
    setPendingSuggestion: (suggestion: { text: string; autoSend?: boolean } | null) => void;
    addMessage: (message: Message) => void;
    updateMessage: (messageId: string, updates: { text: string; thinking?: boolean; }) => void;
    setMessages: (messages: Message[]) => void;
    setStatus: (status: ChatStatus) => void;
    resetChat: () => void;
    openConversation: (conversation: ChatConversation) => void;
};

export const useChatStore = create<ChatState>((set) => ({
    conversationId: null,
    messages: [],
    status: "idle",
    pendingSuggestion: null,
    isPendingNewChat: false,

    setPendingNewChat: (status: boolean) => set({ isPendingNewChat: status }),
    setPendingSuggestion: (suggestion) => set({ pendingSuggestion: suggestion }),

    setConversationId: (id) => {
        set({ conversationId: id })
    },
    addMessage: (message) => {
        set((state) => ({
            messages: [...state.messages, message],
        }));
    },
    updateMessage: (messageId, updates) => {
        set((state) => ({
            messages: state.messages.map((message) =>
                message.id === messageId
                    ? { ...message, ...updates }
                    : message,
            ),
        }));
    },

    setMessages: (messages) => {
        set({ messages });
    },

    setStatus: (status) => {
        set({ status });
    },

    resetChat: () => {
        set({
            conversationId: null,
            messages: [],
            status: "idle",
            pendingSuggestion: null,
        });
    },

    openConversation: (conversation) => {
        set({
            conversationId: conversation.id,
            messages: conversation.messages,
            status: "idle",
            pendingSuggestion: null,
        });
    },
}));
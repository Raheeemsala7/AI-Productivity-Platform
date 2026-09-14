import { create } from "zustand";
import { ChatConversation, ChatStatus, Message } from "../types/chat";

type ChatState = {
    conversationId: string | null;
    messages: Message[];
    status: ChatStatus;

    setConversationId: (id: string | null) => void;

    addMessage: (message: Message) => void;
    updateMessage: (messageId: string, updates: { text: string; thinking?: boolean; }) => void;
    setMessages: (messages: Message[]) => void;
    setStatus: (status: ChatStatus) => void;
    resetChat: () => void;
    openConversation: (conversation: ChatConversation) => void;
};

const createConversationId = () => crypto.randomUUID();

export const useChatStore = create<ChatState>((set) => ({
    conversationId: createConversationId(),
    messages: [],
    status: "idle",

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
            conversationId: createConversationId(),
            messages: [],
            status: "idle",
        });
    },

    openConversation: (conversation) => {
        set({
            conversationId: conversation.id,
            messages: conversation.messages,
            status: "idle",
        });
    },
}));
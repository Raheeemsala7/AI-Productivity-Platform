import { create } from "zustand";
import { ChatStatus, Message } from "../types/chat";

type ChatState = {
    conversationId: string;
    messages: Message[];
    status: ChatStatus;

    addMessage: (message: Message) => void;
    updateMessage: (messageId:string, updates: {text:string; thinking?: boolean;}) => void;
    setMessages: (messages: Message[]) => void;
    setStatus: (status: ChatStatus) => void;
    resetChat: () => void;
};

const createConversationId = () => crypto.randomUUID();

export const useChatStore = create<ChatState>((set) => ({
    conversationId: createConversationId(),
    messages: [],
    status: "idle",



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
}));
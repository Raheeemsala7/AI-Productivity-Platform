"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChatConversation, Message } from "../types/chat";

const STORAGE_KEY = "orico-chat-history";

function createConversation(title = "New conversation"): ChatConversation {
  return {
    id: crypto.randomUUID(),
    title,
    messages: [],
    updatedAt: Date.now(),
  };
}

function loadConversations(): ChatConversation[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as ChatConversation[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistConversations(conversations: ChatConversation[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

function deriveTitle(messages: Message[], fallback: string) {
  const firstUserMessage = messages.find(
    (message) => message.role === "user" && message.text.trim(),
  );

  if (!firstUserMessage) return fallback;

  const text = firstUserMessage.text.trim();
  return text.length > 42 ? `${text.slice(0, 42)}…` : text;
}

export function useChatHistory() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadConversations();
    const initial =
      stored.length > 0 ? stored : [createConversation()];

    setConversations(initial);
    setActiveId(initial[0].id);
    setHydrated(true);
  }, []);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeId) ??
    conversations[0] ??
    null;

  const syncConversation = useCallback(
    (conversationId: string, messages: Message[]) => {
      setConversations((current) => {
        const next = current.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages,
                title: deriveTitle(messages, conversation.title),
                updatedAt: Date.now(),
              }
            : conversation,
        );

        persistConversations(next);
        return next;
      });
    },
    [],
  );

  const startNewConversation = useCallback(() => {
    const conversation = createConversation();

    setConversations((current) => {
      const next = [conversation, ...current];
      persistConversations(next);
      return next;
    });
    setActiveId(conversation.id);

    return conversation.id;
  }, []);

  const selectConversation = useCallback((conversationId: string) => {
    setActiveId(conversationId);
  }, []);

  const deleteConversation = useCallback(
    (conversationId: string) => {
      setConversations((current) => {
        const next = current.filter(
          (conversation) => conversation.id !== conversationId,
        );

        if (next.length === 0) {
          const fresh = createConversation();
          persistConversations([fresh]);
          setActiveId(fresh.id);
          return [fresh];
        }

        persistConversations(next);

        if (conversationId === activeId) {
          setActiveId(next[0].id);
        }

        return next;
      });
    },
    [activeId],
  );

  const clearActiveConversation = useCallback(() => {
    if (!activeId) return;

    syncConversation(activeId, []);
  }, [activeId, syncConversation]);

  return {
    hydrated,
    conversations,
    activeConversation,
    activeId,
    syncConversation,
    startNewConversation,
    selectConversation,
    deleteConversation,
    clearActiveConversation,
  };
}

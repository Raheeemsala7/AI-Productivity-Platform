export type MessageRole = "user" | "assistant";

export type Message = {
  id: string;
  role: MessageRole;
  text: string;
  thinking?: boolean;
};

export type ChatStatus =
  | "idle"
  | "submitted"
  | "streaming";

export type ChatConversation = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
};
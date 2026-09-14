export type MessageRole = "user" | "assistant";

export type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  thinking?: boolean;
};


export type SendMessageRequest = {
  message: string;
  conversation_id?: string;
};

export type responseSendMessage = {
  conversation_id: string;
  title: string | null;
  response: string;
}
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


export type ChatInputForm = {
  message: string;
};

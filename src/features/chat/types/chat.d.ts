export type MessageRole = "user" | "assistant";

export type MessageAttachment = {
  id: string;
  kind: "image" | "document";
  name: string;
  type: string;
  size: number;
  /** Display url (blob/object url) — images and previews */
  url?: string;
};

export type MessageAudio = {
  url: string;
  /** Duration in seconds */
  duration?: number;
  /** Audio mime type (falls back to audio/webm for playback) */
  type?: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  thinking?: boolean;
  attachments?: MessageAttachment[];
  audio?: MessageAudio | null;
};

/** A file the user picked but that hasn't been sent yet. */
export type StagedAttachment = {
  id: string;
  kind: "image" | "document";
  file: File;
  /** Object URL used for image thumbnails */
  previewUrl?: string;
};

export type SendMessageRequest = {
  message: string;
  conversation_id?: string;
  /** Raw files sent to the Server Action for validation + encoding */
  files?: File[];
  /** Raw voice message file sent to the Server Action */
  audio?: File | null;
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

export type Conversation = {
  id: string;
  title: string;
}

export type responseGetConversations = {
  conversations: Conversation[];
}
"use server"

import { HEADERS } from "@/shared/constant/api.constant"
import { getNextAuthToken } from "@/shared/lib/utils/auth.util"
import { ApiResponse } from "@/shared/types/api"
import { responseSendMessage, SendMessageRequest } from "../types/chat"
import { revalidateTag } from "next/cache"
import {
  getFileExtension,
  isSupportedAudio,
  isSupportedFile,
  MAX_ATTACHMENTS,
  MAX_ATTACHMENT_SIZE,
  MAX_TOTAL_ATTACHMENT_SIZE,
  SUPPORTED_ATTACHMENT_TYPES,
} from "../constant/chat.attachment"

type EncodedAttachment = {
  name: string;
  type: string;
  extension: string;
  size: number;
  base64: string;
};

const cleanFileName = (name: string) =>
  name.trim().replace(/^.*[\\/]/, "").replace(/[^\x20-\x7E]/g, "") || "file";

const encodeFile = async (file: File): Promise<EncodedAttachment> => {
  const name = cleanFileName(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    name,
    type: file.type || "application/octet-stream",
    extension: getFileExtension(name),
    size: buffer.length,
    base64: buffer.toString("base64"),
  };
};

const validateAttachments = (files: File[]) => {
  if (files.length > MAX_ATTACHMENTS) {
    throw new Error(`You can attach up to ${MAX_ATTACHMENTS} files.`);
  }

  let total = 0;

  for (const file of files) {
    const name = cleanFileName(file.name);
    const extension = getFileExtension(name);

    if (!Object.prototype.hasOwnProperty.call(SUPPORTED_ATTACHMENT_TYPES, extension)) {
      throw new Error(`Unsupported file type: ${file.name}`);
    }

    if (!isSupportedFile(name, file.type || "")) {
      throw new Error(`Unsupported file type: ${file.name}`);
    }

    if (file.size > MAX_ATTACHMENT_SIZE) {
      throw new Error(`File is too large: ${file.name}`);
    }

    total += file.size;
  }

  if (total > MAX_TOTAL_ATTACHMENT_SIZE) {
    throw new Error("Total attachment size exceeds the limit.");
  }
};

export async function sendMessageAction({
  message,
  conversation_id,
  files = [],
  audio,
}: SendMessageRequest): Promise<responseSendMessage> {
  const token = await getNextAuthToken()

  if (!token?.token) {
    throw new Error("Unauthorized")
  }

  validateAttachments(files)

  const attachments = await Promise.all(files.map(encodeFile))

  let audioPayload: EncodedAttachment | null = null
  if (audio) {
    if (!isSupportedAudio(audio)) {
      throw new Error("Unsupported audio type.")
    }
    if (audio.size > MAX_ATTACHMENT_SIZE) {
      throw new Error("Audio file is too large.")
    }
    audioPayload = await encodeFile(audio)
  }

  const res = await fetch(`${process.env.API_URL}/user/chat`, {
    method: "POST",
    headers: {
      ...HEADERS.JsonBody,
      ...HEADERS.authorize(token.token)
    },
    body: JSON.stringify({
      message,
      conversation_id,
      attachments,
      audio: audioPayload,
    })
  })

  const data: ApiResponse<responseSendMessage> = await res.json()

  if (!data.success) {
    throw Error(data.message || "Failed Send message")
  }

  if (!conversation_id) {
    revalidateTag("conversations", "default")
  }

  return data.payload
}
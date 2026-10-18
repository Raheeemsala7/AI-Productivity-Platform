"use server"

import { HEADERS } from "@/shared/constant/api.constant"
import { getNextAuthToken } from "@/shared/lib/utils/auth.util"
import { ApiResponse, ApiResponsePayload, IApiResponse } from "@/shared/types/api"
import { responseSendMessage, SendMessageRequest, Message, SendFileMessageRequest } from "../types/chat"
import { revalidateTag } from "next/cache"
import {
  getFileExtension,
  isSupportedFile,
  MAX_ATTACHMENTS,
  MAX_ATTACHMENT_SIZE,
  MAX_TOTAL_ATTACHMENT_SIZE,
  SUPPORTED_ATTACHMENT_TYPES,
} from "../constant/chat.attachment"


const cleanFileName = (name: string) =>
  name.trim().replace(/^.*[\\/]/, "").replace(/[^\x20-\x7E]/g, "") || "file";



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
}: SendMessageRequest): Promise<responseSendMessage> {
  const token = await getNextAuthToken()

  if (!token?.token) {
    throw new Error("Unauthorized")
  }


const res = await fetch(`${process.env.API_URL}/user/chat`, {
    method: "POST",
    headers: {
      ...HEADERS.authorize(token.token),
      ...HEADERS.JsonBody
    },
    body: JSON.stringify({
      message,
      conversation_id
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
export async function sendFileMessageAction({
  message,
  conversation_id,
  files = []
}: SendFileMessageRequest): Promise<responseSendMessage> {
  const token = await getNextAuthToken()
  const formData = new FormData()

  if (!token?.token) {
    throw new Error("Unauthorized")
  }

  validateAttachments(files)

  if (message) formData.append("message", message)
  if (conversation_id) formData.append("conversation_id", conversation_id)
  files.forEach((file) => {
    formData.append("file", file)
  })
  const res = await fetch(`${process.env.API_URL}/user/file-analyze`, {
    method: "POST",
    headers: {
      ...HEADERS.authorize(token.token),
    },
    body: formData
  })

  const data: ApiResponsePayload<responseSendMessage> = await res.json()
  

  if (!data.success) {
    throw Error(data.message || "Failed Send message")
  }

  if (!conversation_id) {
    revalidateTag("conversations", "default")
  }

  return data.data
}
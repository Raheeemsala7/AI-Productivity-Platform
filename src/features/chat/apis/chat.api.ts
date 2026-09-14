import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/utils/auth.util"
import { ApiResponse } from "@/shared/types/api"
import { Message, responseGetConversations } from "../types/chat"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"


export const getAllConversations = async () => {
    const token = await getNextAuthToken()

    if (!token?.token) return RESPONSES.unauthorizedS

    const res = await fetch(`${process.env.API_URL}/user/conversations`, {
        next: {
            tags: ["conversations"],
        },
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
    })

    const data: ApiResponse<responseGetConversations> = await res.json()
    console.log(data);

    if (!data.success) {
        throw Error(data.message || "Failed Send message")
    }


    return data as ApiResponse<responseGetConversations>
}


export async function getConversationMessagesApi(conversationId: string ,req : NextRequest): Promise<Message[]> {
  const token = await getToken({req})

  if (!token?.token) {
    throw new Error("Unauthorized")
  }

  const res = await fetch(`${process.env.API_URL}/user/conversations/${conversationId}/messages`, {
    headers: {
      ...HEADERS.JsonBody,
      ...HEADERS.authorize(token.token)
    },
    cache: 'no-store'
  })

  const data: ApiResponse<{ messages: Message[] }> = await res.json()

  if (!data.success) {
    throw new Error(data.message || "Failed to get conversation messages")
  }

  // Map backend 'content' field to frontend 'text' field
  return data.payload.messages.map((msg: any) => ({
    ...msg,
    text: msg.content || msg.text || "",
  })) as Message[]
}
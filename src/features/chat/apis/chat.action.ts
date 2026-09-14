"use server"

import { HEADERS } from "@/shared/constant/api.constant"
import { getNextAuthToken } from "@/shared/lib/utils/auth.util"
import { ApiResponse } from "@/shared/types/api"
import { responseSendMessage, SendMessageRequest } from "../types/chat"


export async function sendMessageAction({ conversation_id, message }: SendMessageRequest) : Promise<responseSendMessage> {
    const token = await getNextAuthToken()

    if (!token?.token) {
        throw new Error("Unauthorized")
    }

    const res = await fetch(`${process.env.API_URL}/user/chat`, {
        method: "POST",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
        body: JSON.stringify({ message, conversation_id })
    })

    const data: ApiResponse<responseSendMessage> = await res.json()

    if (!data.success) {
        throw Error(data.message || "Failed Send message")
    }


    return data.payload
}
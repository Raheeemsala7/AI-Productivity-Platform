import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/utils/auth.util"
import { ApiResponse } from "@/shared/types/api"
import { responseGetConversations } from "../types/chat"


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
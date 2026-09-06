"use server"

import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/utils/auth.util"
import { IApiResponse } from "@/shared/types/api"


export async function sendMessageAction(message: string) {
    const token = await getNextAuthToken()

    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/user/chat`, {
        method:"POST",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
        body :JSON.stringify({message, conversation_id:"dd"})
    })

    const data: IApiResponse<{}> = await res.json()

    if (!data.status) {
        throw Error( data.message || "Failed Send message" )
    }
    console.log(data);
    

    return data
}
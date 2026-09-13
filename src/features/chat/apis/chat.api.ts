import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/utils/auth.util"
import { IApiResponse } from "@/shared/types/api"


export const getAllConversations = async () => {
    const token = await getNextAuthToken()

    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/user/conversations`, {
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
    })

    const data: IApiResponse<{}> = await res.json()

    if (!data.status) {
        throw Error( data.message || "Failed Send message" )
    }
    console.log(data);
    

    return data
}
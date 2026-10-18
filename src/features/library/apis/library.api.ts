import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { ApiResponse, ApiResponsePayload } from "@/shared/types/api";


export async function getAllFilesLibrary() {
    const token = await getNextAuthToken()

    if (!token?.token) {
        return RESPONSES.unauthorized
    }

    try {
        const res = await fetch(`${process.env.API_URL}/user/library`, {
            method: "GET",
            headers: {
                ...HEADERS.JsonBody,
                ...HEADERS.authorize(token.token)
            },
        })

        const data: ApiResponse<{ files: { name: string, url: string }[] }> = await res.json()

        if (!data.success) {
            return {success : false , message : data.message || "Failed to get files" , payload : {files : []} } 
        } 

        return data as ApiResponse<{ files: { name: string, url: string }[] }>

    } catch (error) {
        console.error(error)
        return {success : false , message : "Failed to get files" , payload : {files : []} }
    }
}

export async function getOneFileLibrary(path : string) {
    const token = await getNextAuthToken()

    if (!token?.token) {
        return RESPONSES.unauthorized
    }

    try {
        const res = await fetch(`${process.env.API_URL}/user/files/view?path=${path}`, {
            method: "GET",
            headers: {
                ...HEADERS.authorize(token.token)
            },
        })

        const data: Blob = await res.blob()

        return data

    } catch (error) {
        console.error(error)
        return  null
    }
}



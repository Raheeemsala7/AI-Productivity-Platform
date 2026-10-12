import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import { ApiResponse } from "@/shared/types/api";

export async function deleteUserAction(id: string) {
    const token = await getNextAuthToken()

    if (!token?.token) {
        return RESPONSES.unauthorizedS
    }

    const res = await fetch(`${process.env.API_URL}/admin/users`, {
        method: "DELETE",
        headers: {
            ...HEADERS.JsonBody,
            Authorization: `Bearer ${token.token}`,
        },
    })

    const data: ApiResponse<{}> = await res.json()
    console.log(data);

    if (!data.success) {
        return {
            success: false as const,
            message: getErrorMessage(data.message, "Something went wrong")
        }
    }
    return data

}
import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import {  IApiResponse, IPagination } from "@/shared/types/api";
import { UserAdmin } from "../types/user";


export async function getAllUsersApi({ search, page, per_page }: { search?: string, page?: number, per_page?: number }) {

    const token = await getNextAuthToken()

    if (!token?.token) {
        return RESPONSES.unauthorized
    }


    const query = new URLSearchParams();
    if (page) query.append("page", page.toString());
    if (per_page) query.append("per_page", per_page.toString());
    if (search) query.append("search", search);
    const queryString = query.toString();
    const url = `${process.env.API_URL}/admin/users${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            ...HEADERS.JsonBody,
            Authorization: `Bearer ${token.token}`,
        },
    })

    const data: IApiResponse<IPagination<UserAdmin>> = await res.json()
    console.log(data);

    if (!data.status) {
        return {
            status: false as const,
            message: getErrorMessage(data.message, "Something went wrong")
        }
    }
    return data

}


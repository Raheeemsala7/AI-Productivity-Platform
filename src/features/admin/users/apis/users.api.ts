import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import { ApiResponsePayload, IApiResponse, IPagination } from "@/shared/types/api";
import { ShowUserData, SubscriptionPlan, UserAdmin } from "../types/user";

export async function getAllUsersApi({ search, page, per_page }: { search?: string; page?: number; per_page?: number }) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorized;
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
  });

  const data: IApiResponse<IPagination<UserAdmin>> = await res.json();

  if (!data.status) {
    return {
      status: false as const,
      message: getErrorMessage(data.message, "Something went wrong"),
    };
  }
  return data;
}

export async function getUserByIdApi(id: string | number) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const res = await fetch(`${process.env.API_URL}/admin/users/show/${id}`, {
    method: "GET",
    headers: {
      ...HEADERS.JsonBody,
      Authorization: `Bearer ${token.token}`,
    },
  });

  const data: ApiResponsePayload<ShowUserData> = await res.json();
  console.log(data);
  

  if (!data.success) {
    return {
      success: false as const,
      message: getErrorMessage(data.message, "Something went wrong"),
    };
  }
  return data;
}

export async function getCreateUserDataApi() {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  try {
    const res = await fetch(`${process.env.API_URL}/admin/users/create`, {
      method: "GET",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to load create user data"),
    };
  }
}

export function extractPlans(response: any): SubscriptionPlan[] {
  if (!response) return [];
  const source = response.data ?? response.payload ?? response;
  if (Array.isArray(source)) return source;
  if (Array.isArray(source.plans)) return source.plans;
  if (Array.isArray(source.subscriptions)) return source.subscriptions;
  return [];
}

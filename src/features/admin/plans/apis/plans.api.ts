import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import { Plan, PlansApiResponse } from "../types/plan";
import { ApiResponse } from "@/shared/types/api";

export async function getAllPlansApi({
  locale,
}: {
  locale?: string;
} = {}) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const query = new URLSearchParams();
  if (locale) {
    query.append("locale", locale);
    query.append("lang", locale);
  }

  try {
    const res = await fetch(`${process.env.API_URL}/plans?lang=${locale ?? "ar"}`, {
      method: "GET",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      }
    });

    const data: ApiResponse<{ data: Plan[] }>= await res.json();

    if (!data.success) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Something went wrong"),
      };
    }

    return data

  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to fetch plans"),
    };
  }
}

export async function getPlanByIdApi(id: string | number, locale?: string) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const headers: Record<string, string> = {
    ...HEADERS.JsonBody,
    Authorization: `Bearer ${token.token}`,
  };

  if (locale) {
    headers["Accept-Language"] = locale;
  }

  try {
    let res = await fetch(`${process.env.API_URL}/admin/plans/${id}`, {
      method: "GET",
      headers,
    });

    if (!res.ok && res.status === 404) {
      res = await fetch(`${process.env.API_URL}/admin/plans/show/${id}`, {
        method: "GET",
        headers,
      });
    }

    const data = await res.json();
    const isSuccess = data.status ?? data.success ?? res.ok;

    if (!isSuccess) {
      return {
        success: false as const,
        status: false as const,
        message: getErrorMessage(data.message, "Something went wrong"),
      };
    }

    const plan: Plan =
      data.data?.plan ??
      data.data ??
      data.payload?.plan ??
      data.payload?.data ??
      data.payload;

    return {
      success: true as const,
      status: true as const,
      data: plan,
    };
  } catch (error) {
    return {
      success: false as const,
      status: false as const,
      message: getErrorMessage(error, "Failed to load plan"),
    };
  }
}

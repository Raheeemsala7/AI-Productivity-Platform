import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import { User } from "@/features/auth/types/auth";

export interface ProfileApiResponse {
  status?: boolean;
  success?: boolean;
  message?: string;
  payload?: {
    user?: User;
  };
  data?: {
    user?: User;
  };
}

/**
 * Fetches the user profile directly on the server with cache disabled.
 * Uses getNextAuthToken to retrieve JWT from session cookies.
 */
export async function getUserProfileServer(): Promise<{
  success: boolean;
  user: User | null;
  message?: string;
}> {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {
      success: false,
      user: null,
      message: "Unauthorized",
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/auth/profile`, {
      method: "GET",
      headers: {
        ...HEADERS.JsonBody,
        ...HEADERS.authorize(token.token),
      },
      cache: "no-store",
    });

    const data: ProfileApiResponse = await res.json();
    const isOk =
      res.ok &&
      (data.status === true ||
        data.success === true ||
        (data.status !== false && data.success !== false));

    if (!isOk) {
      return {
        success: false,
        user: null,
        message: data.message || "Failed to fetch profile",
      };
    }

    const user: User = (data.payload?.user ??
      data.payload ??
      data.data?.user ??
      data.data) as User;

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      user: null,
      message: getErrorMessage(error, "Failed to connect to profile service"),
    };
  }
}

/**
 * Sends profile update request to backend with Bearer token.
 */
export async function updateProfileBackendApi(
  payload: FormData | Record<string, any>
): Promise<{
  success: boolean;
  message: string;
  user?: User;
}> {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  try {
    const isFormData = payload instanceof FormData;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token.token}`,
      Accept: "application/json",
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${process.env.API_URL}/auth/profile`, {
      method: "POST",
      headers,
      body: isFormData ? payload : JSON.stringify(payload),
      cache: "no-store",
    });

    const data: ProfileApiResponse = await res.json();
    const isSuccess = data.success ?? data.status ?? res.ok;

    if (!isSuccess) {
      return {
        success: false,
        message: getErrorMessage(data.message, "Failed to update profile"),
      };
    }

    const user: User = (data.payload?.user ??
      data.payload ??
      data.data?.user ??
      data.data) as User;

    return {
      success: true,
      message: data.message || "Profile updated successfully",
      user,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to update profile"),
    };
  }
}


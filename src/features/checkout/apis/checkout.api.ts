import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import { CheckoutApiResponse, CouponCheckApiResponse } from "../types/checkout";

export async function checkCouponApi(code: string) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const formData = new FormData();
  formData.append("code", code.trim());

  try {
    const res = await fetch(`${process.env.API_URL}/user/coupon/check`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    const data: CouponCheckApiResponse = await res.json();
    const isSuccess = data.success ?? data.status ?? res.ok;

    if (!isSuccess) {
      return {
        success: false as const,
        status: false as const,
        message: getErrorMessage(data.message, "Invalid or expired coupon"),
      };
    }

    const couponData = data.data ?? data.payload ?? data.coupon ?? data;

    return {
      success: true as const,
      status: true as const,
      message: data.message || "Coupon applied successfully",
      data: couponData,
    };
  } catch (error) {
    return {
      success: false as const,
      status: false as const,
      message: getErrorMessage(error, "Failed to check coupon"),
    };
  }
}

export async function createCheckoutSessionApi(
  planId: string | number,
  couponCode?: string
) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const query = new URLSearchParams();
  if (couponCode) {
    query.append("coupon", couponCode.trim());
    query.append("code", couponCode.trim());
  }

  const queryString = query.toString();
  const url = `${process.env.API_URL}/user/checkout/${planId}${
    queryString ? `?${queryString}` : ""
  }`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
    });

    const data: CheckoutApiResponse = await res.json();
    const isSuccess = data.success ?? data.status ?? res.ok;

    if (!isSuccess) {
      return {
        success: false as const,
        status: false as const,
        message: getErrorMessage(data.message, "Failed to initiate checkout"),
      };
    }

    const sessionData = data.data ?? data.payload;

    if (!sessionData?.redirect_url) {
      return {
        success: false as const,
        status: false as const,
        message: "No redirect URL returned from payment gateway",
      };
    }

    return {
      success: true as const,
      status: true as const,
      message: data.message || "Checkout session created",
      data: sessionData,
    };
  } catch (error) {
    return {
      success: false as const,
      status: false as const,
      message: getErrorMessage(error, "Failed to initiate checkout"),
    };
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import { couponSchema, CouponFormType } from "../schema/coupon.schema";

export async function createCouponAction(values: CouponFormType) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const validation = couponSchema.safeParse(values);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Validation failed",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/admin/coupons`, {
      method: "POST",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(validation.data),
    });

    const data = await res.json();
    const isSuccess = data.status ?? data.success;

    if (!isSuccess) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Failed to create coupon"),
      };
    }

    revalidatePath("/[locale]/admin/coupons", "page");
    return {
      success: true as const,
      message: data.message || "Coupon created successfully",
      data: data.payload || data.data,
    };
  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to create coupon"),
    };
  }
}

export async function updateCouponAction(id: string | number, values: CouponFormType) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const validation = couponSchema.safeParse(values);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Validation failed",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/admin/coupons/${id}`, {
      method: "PUT",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(validation.data),
    });

    const data = await res.json();
    const isSuccess = data.status ?? data.success;

    if (!isSuccess) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Failed to update coupon"),
      };
    }

    revalidatePath("/[locale]/admin/coupons", "page");
    return {
      success: true as const,
      message: data.message || "Coupon updated successfully",
      data: data.payload || data.data,
    };
  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to update coupon"),
    };
  }
}

export async function deleteCouponAction(id: string | number) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  try {
    const res = await fetch(`${process.env.API_URL}/admin/coupons/${id}`, {
      method: "DELETE",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
    });

    const data = await res.json();
    const isSuccess = data.status ?? data.success;

    if (!isSuccess) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Failed to delete coupon"),
      };
    }

    revalidatePath("/[locale]/admin/coupons", "page");
    return {
      success: true as const,
      message: data.message || "Coupon deleted successfully",
    };
  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to delete coupon"),
    };
  }
}

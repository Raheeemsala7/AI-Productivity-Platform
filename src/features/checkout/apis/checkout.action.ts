"use server";

import { checkCouponApi, createCheckoutSessionApi } from "./checkout.api";

export async function checkCouponAction(code: string) {
  if (!code || !code.trim()) {
    return {
      success: false as const,
      message: "Please enter a valid coupon code",
    };
  }

  return await checkCouponApi(code.trim());
}

export async function createCheckoutAction(
  planId: string | number,
  couponCode?: string
) {
  if (!planId) {
    return {
      success: false as const,
      message: "Please select a plan",
    };
  }

  return await createCheckoutSessionApi(planId, couponCode);
}

import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import { Coupon, CouponPaginationData } from "../types/coupon";

export interface CouponsApiResponse {
  status: boolean;
  message?: string;
  payload: CouponPaginationData;
}

export async function getAllCouponsApi({
  search,
  page,
  per_page,
}: {
  search?: string;
  page?: number;
  per_page?: number;
} = {}) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorized;
  }

  const query = new URLSearchParams();
  if (page) query.append("page", page.toString());
  if (per_page) query.append("per_page", per_page.toString());
  if (search) query.append("search", search);

  const queryString = query.toString();
  const url = `${process.env.API_URL}/admin/coupons${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ...HEADERS.JsonBody,
      Authorization: `Bearer ${token.token}`,
    },
  });

  const data: CouponsApiResponse = await res.json();

  if (!data.status) {
    return {
      status: false as const,
      message: getErrorMessage(data.message, "Something went wrong"),
    };
  }

  return data;
}

export async function getCouponByIdApi(id: string | number) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const res = await fetch(`${process.env.API_URL}/admin/coupons/${id}`, {
    method: "GET",
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
      status: false as const,
      message: getErrorMessage(data.message, "Something went wrong"),
    };
  }

  const coupon: Coupon = data.payload?.coupon || data.payload?.data || data.payload || data.data?.coupon || data.data;
  return {
    success: true as const,
    status: true as const,
    data: coupon,
  };
}

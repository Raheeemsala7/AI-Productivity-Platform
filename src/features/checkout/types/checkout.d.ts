export interface CheckoutSessionData {
  redirect_url: string;
  gateway?: string;
  plan?: {
    id: number;
    name: string;
    price: string;
    frequency: string;
  };
}

export interface CheckoutApiResponse {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: CheckoutSessionData;
  payload?: CheckoutSessionData;
}

export interface CouponCheckData {
  id?: number;
  code?: string;
  name?: string;
  discount?: number | string;
  discount_percentage?: number | string;
  type?: string;
  [key: string]: any;
}

export interface CouponCheckApiResponse {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: CouponCheckData;
  payload?: CouponCheckData;
  coupon?: CouponCheckData;
}

export interface CouponCreator {
  id: number;
  name: string;
}

export interface Coupon {
  id: number;
  name: string;
  code: string;
  discount: string | number;
  number_of_uses: number;
  limit: number;
  creator_id: number;
  stripe_coupon_id: string | null;
  created_at: string;
  creator?: CouponCreator;
}

export interface CouponPaginationData {
  data: Coupon[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page: number | null;
    prev_page: number | null;
  };
}

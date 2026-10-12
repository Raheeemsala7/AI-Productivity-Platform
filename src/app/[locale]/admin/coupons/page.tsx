import { getAllCouponsApi } from "@/features/admin/coupons/apis/coupons.api";
import { CouponsList } from "@/features/admin/coupons/components/coupons-list";
import { IMetadata } from "@/shared/types/api";

export const metadata = { title: "Admin - Coupons" };

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    per_page?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const query = await searchParams;
  const search = query.search;
  const page = query.page ? Number(query.page) : undefined;
  const per_page = query.per_page ? Number(query.per_page) : undefined;

  const res = await getAllCouponsApi({ search, page, per_page });

  if (!res.status) {
    return <div>Something went wrong</div>;
  }

  const couponsData = res.payload.data;
  const payload = res.payload as any;

  const pagination: IMetadata =
    payload.pagination ||
    payload.metadata ||
    payload.meta || {
      current_page: payload.current_page ?? page ?? 1,
      last_page: payload.last_page ?? 1,
      per_page: payload.per_page ?? per_page ?? 10,
      total: payload.total ?? (Array.isArray(couponsData) ? couponsData.length : 0),
      next_page: payload.next_page ?? null,
      prev_page: payload.prev_page ?? null,
    };

  return <CouponsList coupons={couponsData} pagination={pagination} />;
}

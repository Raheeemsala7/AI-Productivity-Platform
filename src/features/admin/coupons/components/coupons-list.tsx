import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { Ticket, Percent, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Coupon } from "../types/coupon";
import { IMetadata } from "@/shared/types/api";
import { CouponsSearch } from "./coupons-search";
import { CouponsPagination } from "./coupons-pagination";
import { CreateCouponDialog } from "./create-coupon-dialog";
import { EditCouponDialog } from "./edit-coupon-dialog";
import { DeleteCouponButton } from "./delete-coupon-button";

interface CouponsListProps {
  coupons: Coupon[];
  pagination: IMetadata;
}

export async function CouponsList({ coupons, pagination }: CouponsListProps) {
  const t = await getTranslations("AdminCoupons");

  return (
    <div className="space-y-6 p-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title") || "Coupons"}</h2>
          <p className="text-muted-foreground">
            {t("description") || "Manage discount coupons, track usage, and create promo codes."}
          </p>
        </div>
        <div className="flex gap-2">
          <CreateCouponDialog />
        </div>
      </div>

      <Card>
        <CardHeader className="py-2">
          <CouponsSearch />
        </CardHeader>
        <CardContent className="px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.code") || "Coupon"}</TableHead>
                <TableHead>{t("table.discount") || "Discount"}</TableHead>
                <TableHead>{t("table.usage") || "Usage"}</TableHead>
                <TableHead>{t("table.creator") || "Creator"}</TableHead>
                <TableHead>{t("table.created") || "Created At"}</TableHead>
                <TableHead className="text-right">{t("table.actions") || "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons && coupons.length > 0 ? (
                coupons.map((coupon) => {
                  const usagePercent = coupon.limit > 0 ? Math.min(100, Math.round((coupon.number_of_uses / coupon.limit) * 100)) : 0;
                  const isMaxedOut = coupon.limit > 0 && coupon.number_of_uses >= coupon.limit;

                  return (
                    <TableRow key={coupon.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Ticket className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground flex items-center gap-2">
                              <span>{coupon.code}</span>
                              {coupon.stripe_coupon_id && (
                                <Badge variant="outline" className="text-[10px] py-0 px-1 font-mono">
                                  Stripe
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{coupon.name}</div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary" className="gap-1 font-semibold">
                          <Percent className="h-3 w-3" />
                          <span>{coupon.discount}%</span>
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1 max-w-[130px]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium">
                              {coupon.number_of_uses} / {coupon.limit}
                            </span>
                            <span className="text-muted-foreground">{usagePercent}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                isMaxedOut ? "bg-destructive" : "bg-primary"
                              }`}
                              style={{ width: `${usagePercent}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">
                          {coupon.creator?.name || "Admin"}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {coupon.created_at ? new Date(coupon.created_at).toLocaleDateString() : "-"}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <EditCouponDialog coupon={coupon} />
                          <DeleteCouponButton couponId={coupon.id} couponCode={coupon.code} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    {t("noCouponsFound") || "No coupons found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {pagination && <CouponsPagination pagination={pagination} />}
      </Card>
    </div>
  );
}

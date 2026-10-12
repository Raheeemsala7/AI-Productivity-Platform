"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Pencil, Ticket, Percent, Users, Tag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { couponSchema, CouponFormType } from "../schema/coupon.schema";
import { updateCouponAction } from "../apis/coupons.action";
import { Coupon } from "../types/coupon";

interface EditCouponDialogProps {
  coupon: Coupon;
}

export function EditCouponDialog({ coupon }: EditCouponDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("AdminCoupons");

  const form = useForm<CouponFormType>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      name: coupon.name || "",
      code: coupon.code || "",
      discount: Number(coupon.discount) || 0,
      limit: coupon.limit || 100,
    },
  });

  const onSubmit = (values: CouponFormType) => {
    startTransition(async () => {
      try {
        const res = await updateCouponAction(coupon.id, values);
        if (res.success) {
          toast.success(t("updateSuccess") || "Coupon updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(res.message || "Failed to update coupon");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title={t("edit") || "Edit"}
          />
        }
      >
        <Pencil className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("editCouponTitle") || "Edit Coupon"}</DialogTitle>
          <DialogDescription>
            {t("editCouponSubtitle") || "Update coupon details, discount, and limits."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Coupon Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="flex items-center gap-1.5 font-medium">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>{t("name") || "Coupon Name"}</span>
                </FieldLabel>
                <Input
                  placeholder="e.g. Summer Promo"
                  disabled={isPending}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Coupon Code */}
          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="flex items-center gap-1.5 font-medium">
                  <Ticket className="h-4 w-4 text-primary" />
                  <span>{t("code") || "Coupon Code"}</span>
                </FieldLabel>
                <Input
                  placeholder="e.g. SUMMER100"
                  disabled={isPending}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
                {fieldState.invalid && (
                  <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Discount */}
            <Controller
              name="discount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Percent className="h-4 w-4 text-primary" />
                    <span>{t("discount") || "Discount"}</span>
                  </FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    disabled={isPending}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Limit */}
            <Controller
              name="limit"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{t("limit") || "Usage Limit"}</span>
                  </FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    disabled={isPending}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              {t("cancel") || "Cancel"}
            </Button>
            <Button type="submit" disabled={isPending} className="min-w-28 gap-2">
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isPending ? t("saving") || "Saving..." : t("saveChanges") || "Save Changes"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

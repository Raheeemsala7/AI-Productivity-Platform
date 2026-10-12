"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import {
  Sparkles,
  Coins,
  Tag,
  Check,
  X,
  Loader2,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { checkCouponAction, createCheckoutAction } from "../apis/checkout.action";

export interface CheckoutPlanItem {
  id: number | string;
  name: string;
  price: string | number;
  frequency?: string;
  credits?: number;
  copy?: string;
  features?: string[];
}

interface CheckoutDialogProps {
  plan: CheckoutPlanItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AppliedCouponInfo {
  code: string;
  discount: number;
  name?: string;
}

export function CheckoutDialog({
  plan,
  open,
  onOpenChange,
}: CheckoutDialogProps) {
  const t = useTranslations("Checkout");

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCouponInfo | null>(null);
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!plan) return null;

  const rawPrice =
    typeof plan.price === "number"
      ? plan.price
      : parseFloat(String(plan.price).replace(/[^0-9.]/g, "")) || 0;

  const discountPercent = appliedCoupon ? appliedCoupon.discount : 0;
  const discountAmount = (rawPrice * discountPercent) / 100;
  const finalPrice = Math.max(0, rawPrice - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error(t("enterCoupon") || "Please enter a coupon code");
      return;
    }

    setIsCheckingCoupon(true);
    try {
      const res = await checkCouponAction(couponCode.trim());

      if (!res.success || !res.data) {
        toast.error(res.message || t("invalidCoupon") || "Invalid coupon code");
        return;
      }

      const cData = res.data as any;
      const discountVal =
        cData.discount ??
        cData.discount_percentage ??
        cData.coupon?.discount ??
        cData.percentage ??
        0;

      const discountNum = parseFloat(String(discountVal)) || 0;

      if (discountNum <= 0) {
        toast.error(t("invalidCoupon") || "Invalid or zero discount coupon");
        return;
      }

      setAppliedCoupon({
        code: couponCode.trim(),
        discount: discountNum,
        name: cData.name || cData.coupon?.name,
      });

      toast.success(
        t("couponApplied", { code: couponCode.trim(), discount: discountNum }) ||
          `Coupon ${couponCode.trim()} applied (-${discountNum}%)`
      );
    } catch {
      toast.error("Failed to validate coupon");
    } finally {
      setIsCheckingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const handleCompleteCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await createCheckoutAction(plan.id, appliedCoupon?.code);

      if (!res.success || !res.data?.redirect_url) {
        toast.error(res.message || "Failed to create checkout session");
        setIsCheckingOut(false);
        return;
      }

      toast.success(t("redirecting") || "Redirecting to payment gateway...");
      window.location.href = res.data.redirect_url;
    } catch {
      toast.error("Something went wrong");
      setIsCheckingOut(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-6 sm:p-8">
        <DialogHeader className="text-start">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="size-5 text-brand" />
            <span>{t("title") || "Confirm Subscription"}</span>
          </DialogTitle>
          <DialogDescription>
            {t("subtitle") ||
              "Review your plan details and apply a promo code before proceeding."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Plan Summary Box */}
          <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold">{plan.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {plan.copy || "All creative AI generation tools"}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs font-semibold uppercase">
                {plan.frequency || "Monthly"}
              </Badge>
            </div>

            {plan.credits != null && plan.credits > 0 && (
              <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-brand">
                <Coins className="size-4" />
                <span>{Number(plan.credits).toLocaleString()} Credits / month</span>
              </div>
            )}
          </div>

          {/* Coupon Input Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Tag className="size-3.5 text-brand" />
              <span>{t("couponLabel") || "Coupon Code"}</span>
            </label>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Check className="size-4" />
                  <span>{appliedCoupon.code}</span>
                  <Badge className="bg-emerald-600 text-white text-[10px] px-2 py-0.5">
                    -{appliedCoupon.discount}%
                  </Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveCoupon}
                  disabled={isCheckingOut}
                  className="size-7 text-muted-foreground hover:text-destructive"
                  title={t("removeCoupon") || "Remove"}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder={t("couponPlaceholder") || "e.g. SAVED20"}
                  disabled={isCheckingCoupon || isCheckingOut}
                  className="font-mono uppercase text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyCoupon();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleApplyCoupon}
                  disabled={isCheckingCoupon || !couponCode.trim() || isCheckingOut}
                  className="shrink-0 gap-1.5"
                >
                  {isCheckingCoupon ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <span>{t("apply") || "Apply"}</span>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Pricing Calculation Summary */}
          <div className="rounded-2xl border border-border/70 p-4 space-y-2.5 bg-background">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{t("subtotal") || "Plan Price"}</span>
              <span className="font-semibold text-foreground">${rawPrice.toFixed(2)}</span>
            </div>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                <span>
                  {t("discount") || "Discount"} ({appliedCoupon.discount}%)
                </span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="pt-2 border-t border-border/60 flex items-baseline justify-between">
              <div>
                <span className="text-base font-bold">{t("total") || "Total Due"}</span>
                <span className="text-xs text-muted-foreground block">
                  /{plan.frequency || "month"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-foreground">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5 text-emerald-500" />
            <span>{t("securePayment") || "Encrypted & secure checkout via Stripe"}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isCheckingOut}
              className="flex-1 rounded-xl"
            >
              {t("cancel") || "Cancel"}
            </Button>
            <Button
              type="button"
              onClick={handleCompleteCheckout}
              disabled={isCheckingOut}
              className="flex-2 rounded-xl gap-2 bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>{t("processing") || "Processing..."}</span>
                </>
              ) : (
                <>
                  <span>{t("proceed") || "Proceed to Checkout"}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

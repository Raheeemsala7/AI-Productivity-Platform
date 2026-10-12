"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  CheckoutDialog,
  CheckoutPlanItem,
} from "@/features/checkout/components/checkout-dialog";

interface PlanCtaButtonProps {
  plan: CheckoutPlanItem;
  label: string;
  featured?: boolean;
}

export function PlanCtaButton({ plan, label, featured }: PlanCtaButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handlePlanSelect = () => {
    if (status !== "authenticated" || !session) {
      router.push("/auth/register");
      return;
    }

    setIsCheckoutOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handlePlanSelect}
        className={cn(
          "w-full py-3.5 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 group transition-all duration-200 shadow-sm cursor-pointer",
          featured
            ? "bg-brand text-brand-foreground hover:bg-brand/90 hover:shadow-brand/25 hover:shadow-lg"
            : "bg-card border-2 border-border-strong hover:border-brand hover:bg-brand/5 hover:text-brand"
        )}
      >
        <span>{label}</span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      </button>

      <CheckoutDialog
        plan={plan}
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
      />
    </>
  );
}

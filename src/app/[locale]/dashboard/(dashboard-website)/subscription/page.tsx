import { getAllPlansApi } from "@/features/admin/plans/apis/plans.api";
import { PricingSection } from "@/shared/components/landing/pricing-section";

export const metadata = {
  title: "Subscription & Plans - Dashboard",
  description: "View and upgrade your subscription plan",
};

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function SubscriptionPage({ params }: PageProps) {
  const { locale } = await params;
  const res = await getAllPlansApi({ locale });

  const rawPlans =
    (res as any)?.payload?.data ??
    (res as any)?.payload ??
    (res as any)?.data;
  const plans = Array.isArray(rawPlans) ? rawPlans : [];

  return (
    <div className="w-full flex-1">
      <PricingSection plans={plans} variant="dashboard" />
    </div>
  );
}

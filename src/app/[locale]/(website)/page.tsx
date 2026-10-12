import { getAllPlansApi } from "@/features/admin/plans/apis/plans.api";
import { LandingPage } from "@/shared/components/landing/landing-page";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const res = await getAllPlansApi({ locale });

  const rawPlans = (res as any)?.payload?.data ?? (res as any)?.payload ?? (res as any)?.data;
  const plans = Array.isArray(rawPlans) ? rawPlans : [];

  return <LandingPage plans={plans} />;
}

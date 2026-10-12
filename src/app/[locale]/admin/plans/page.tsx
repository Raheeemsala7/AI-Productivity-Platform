import { getAllPlansApi } from "@/features/admin/plans/apis/plans.api";
import { PlansList } from "@/features/admin/plans/components/plans-list";

export const metadata = { title: "Admin - Plans" };

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
    per_page?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params;

  const res = await getAllPlansApi({ locale });

  console.log(res);
  

  if (!res.success) {
    return (
      <div className="p-6">
        <p className="text-destructive font-medium">{res.message || "Failed to load plans"}</p>
      </div>
    );
  }

  return <PlansList plans={res.payload.data} />;
}

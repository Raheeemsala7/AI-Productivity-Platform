import { getPlanByIdApi } from "@/features/admin/plans/apis/plans.api";
import { EditPlanForm } from "@/features/admin/plans/components/edit-plan-form";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export const metadata = { title: "Admin - Edit Plan" };

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params;
  const res = await getPlanByIdApi(id, locale);

  if (!res.success || !res.data) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive font-medium mb-4">{res.message || "Failed to load plan"}</p>
        <Link href="/admin/plans" className={cn(buttonVariants({ variant: "outline" }))}>
          Back to Plans
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <EditPlanForm plan={res.data} />
    </div>
  );
}

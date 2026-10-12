import { CreatePlanForm } from "@/features/admin/plans/components/create-plan-form";

export const metadata = { title: "Admin - Create Plan" };

export default function Page() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <CreatePlanForm />
    </div>
  );
}

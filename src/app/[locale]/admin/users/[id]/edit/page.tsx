import { getUserByIdApi, getCreateUserDataApi, extractPlans } from "@/features/admin/users/apis/users.api";
import { EditUserForm } from "@/features/admin/users/components/edit-user-form";
import { notFound } from "next/navigation";

export const metadata = { title: "Admin - Edit User" };

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const [res, createDataRes] = await Promise.all([
    getUserByIdApi(id),
    getCreateUserDataApi(),
  ]);



  if (!res.success || !res.data) {
    return <p>rrr</p>
  }

  // Handle the backend shape { user: UserAdmin, current_plan: any, has_subscription: boolean }
  const user = res.data.user;
  const currentPlan = res.data.current_plan;
  const plans = extractPlans(createDataRes);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <EditUserForm user={user} currentPlan={currentPlan} plans={plans} />
    </div>
  );
}

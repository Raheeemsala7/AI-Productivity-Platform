import { getUserByIdApi } from "@/features/admin/users/apis/users.api";
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
  const res = await getUserByIdApi(id);

  if (!res.status || !res.payload) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <EditUserForm user={res.payload} />
    </div>
  );
}

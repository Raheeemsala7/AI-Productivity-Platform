import { getAllUsersApi } from "@/features/admin/users/apis/users.api"
import { UsersList } from "@/features/admin/users/components/users-list"

export const metadata = { title: "Admin - Users" }


interface PageProps {
    searchParams: Promise<{
        search?: string;
        page?: string;
        per_page?: string;
    }>;
}
export default async function Page({ searchParams }: PageProps) {
    // SearchParams
    const query = await searchParams;
    // Varibales
    const search = query.search;
    const page = query.page ? Number(query.page) : undefined;
    const per_page = query.per_page ? Number(query.per_page) : undefined;


    const res = await getAllUsersApi({ search, page, per_page });
    if (!res.status) {
        return <div>Something went wrong</div>
    }
    const usersData = res.payload.data

    console.log(res.payload.metadata);
    

    return <UsersList users={usersData} pagination={res.payload.metadata} />

}

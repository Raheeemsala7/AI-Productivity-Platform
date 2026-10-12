import { getAllUsersApi, getCreateUserDataApi, extractPlans } from "@/features/admin/users/apis/users.api"
import { UsersList } from "@/features/admin/users/components/users-list"
import { IMetadata } from "@/shared/types/api";

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
    // Variables
    const search = query.search;
    const page = query.page ? Number(query.page) : undefined;
    const per_page = query.per_page ? Number(query.per_page) : undefined;

    const [res, createDataRes] = await Promise.all([
        getAllUsersApi({ search, page, per_page }),
        getCreateUserDataApi(),
    ]);

    if (!res.status) {
        return <div>Something went wrong</div>
    }
    const usersData = res.payload.data;
    const payload = res.payload as any;

    const pagination: IMetadata = payload.metadata ||
        payload.meta ||
        payload.pagination || {
            current_page: payload.current_page ?? page ?? 1,
            last_page: payload.last_page ?? 1,
            per_page: payload.per_page ?? per_page ?? 10,
            total: payload.total ?? (Array.isArray(usersData) ? usersData.length : 0),
            next_page: payload.next_page ?? null,
            prev_page: payload.prev_page ?? null,
        };

    const plans = extractPlans(createDataRes);

    return <UsersList users={usersData} pagination={pagination} plans={plans} />
}

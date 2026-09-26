import { authOptions } from '@/auth';
import { SuperAdminSidebar } from '@/features/super-admin/components/super-admin-sidebar';
import HeaderSidebar from '@/shared/components/dashboard/header-sidebar';
import { DashboardLayout } from '@/shared/components/dashboard-layout/dashboard-layout';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SuperAdminMainLayout({ children }: { children: React.ReactNode }) {
    // Session
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return redirect("/auth/login")
    }

    return (
        <DashboardLayout 
            sidebar={<SuperAdminSidebar />} 
            header={<HeaderSidebar name={session.user.name} />}
        >
            {children}
        </DashboardLayout>
    )
}

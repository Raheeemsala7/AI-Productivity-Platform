import { authOptions } from '@/auth';
import { UserSidebar } from '@/features/user/components/user-sidebar';
import HeaderSidebar from '@/shared/components/dashboard/header-sidebar';
import { DashboardLayout } from '@/shared/components/dashboard-layout/dashboard-layout';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function DashboardMainLayout({ children }: { children: React.ReactNode }) {
    // Transation
    const t = await getTranslations("Dashboard");
    // Session
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return redirect("/auth/login")
    }

    return (
        <DashboardLayout 
            sidebar={<UserSidebar />} 
            header={<HeaderSidebar name={session.user.name} />}
        >
            {children}
        </DashboardLayout>
    )
}

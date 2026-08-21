import { authOptions } from '@/auth';
import { AppSidebar } from '@/shared/components/dashboard/app-sidebar';
import HeaderSidebar from '@/shared/components/dashboard/header-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    // Transation
    const t = await getTranslations("Dashboard");
    // Session
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return redirect("/auth/login")
    }


    return (
        <SidebarProvider className='mx-auto px-4 py-6 '>
            <AppSidebar />
            <SidebarInset className='rounded-2xl'>
                <HeaderSidebar name={session.user.name} />
                <main className=" p-4 md:p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

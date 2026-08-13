import { AppSidebar } from '@/shared/components/dashboard/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { getTranslations } from 'next-intl/server';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const t = await getTranslations("Dashboard");

    return (
        <SidebarProvider className='mx-auto px-4 py-6 '>
            <AppSidebar />
            <SidebarInset className='rounded-2xl'>
                <header className="flex h-16 items-center gap-4 border-b px-6 py-2">
                    <SidebarTrigger />
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl font-semibold tracking-tight">{t("welcome")}</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {t("subtitle")}
                        </p>
                    </div>
                </header>
                <main className="p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

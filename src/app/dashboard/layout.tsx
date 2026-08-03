import { AppSidebar } from '@/shared/components/dashboard/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { FileText, Folder, LayoutDashboard, LineChart, LogOut, Presentation, Settings, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NAV = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Business Plans", icon: FileText },
    { label: "Market Analysis", icon: LineChart },
    { label: "Pitch Decks", icon: Presentation },
    { label: "Projects", icon: Folder },
    { label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className='mx-auto px-4 py-6 '>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-4 border-b px-6">
                    <SidebarTrigger />
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl font-semibold tracking-tight">Welcome back, Omar</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Here's what your AI workspace produced recently.
                        </p>
                    </div>
                </header>
                <main className="p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

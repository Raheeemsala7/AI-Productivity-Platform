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
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-4 border-b px-6">
                    <SidebarTrigger />
                    <h1 className="text-lg font-semibold">
                        Dashboard
                    </h1>
                </header>
                <main className="p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

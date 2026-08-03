// "use client";

import * as React from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    BarChart3,
    Settings,
    Sparkles,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import SignOutButton from "./sign-out-button";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Projects",
        url: "/dashboard/projects",
        icon: FolderKanban,
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating" className="py-6 border-none shadow-non" >
            {/* Logo */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <Link href="/dashboard" className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)]">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-semibold">ORICO</span>
                                    <span className="text-xs text-muted-foreground">
                                        Dashboard
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Menu */}
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title}>
                                        <Link className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors" href={item.url}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
                <div className="rounded-xl border border-[color:var(--border-strong)] p-3 mb-2">
                    <p className="text-xs font-medium">Professional plan</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">840 / 1,000 credits</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--muted)]">
                        <div className="h-full rounded-full bg-[image:var(--gradient-primary)]" style={{ width: "84%" }} />
                    </div>
                </div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SignOutButton />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

        </Sidebar>
    );
}

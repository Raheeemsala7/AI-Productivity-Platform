"use client";

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
        <Sidebar collapsible="icon" variant="inset">
            {/* Logo */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <Link href="/dashboard">
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
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title}>
                                        <Link href={item.url}>
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
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                K
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Kareem Mustafa</span>

                                <span className="text-xs text-muted-foreground">Admin</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

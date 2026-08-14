"use client";

import * as React from "react";
import { Link } from "@/i18n/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    BarChart3,
    Settings,
    Sparkles,
    BotMessageSquare,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import SignOutButton from "./sign-out-button";
import { useTranslations } from "next-intl";

const NAV_ITEMS = [
    { key: "dashboard" as const, url: "/dashboard", icon: LayoutDashboard },
    { key: "projects" as const, url: "/dashboard/projects", icon: FolderKanban },
    { key: "users" as const, url: "/dashboard/users", icon: Users },
    { key: "chat" as const, url: "/dashboard/chat", icon: BotMessageSquare  },
    { key: "analytics" as const, url: "/dashboard/analytics", icon: BarChart3 },
    { key: "settings" as const, url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
    const t = useTranslations("Dashboard");

    return (
        <Sidebar collapsible="icon" variant="floating" className="py-6 border-none shadow-none">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
                            <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)]">
                                <Sparkles className="size-4 text-white" />
                            </div>
                            <div className="grid flex-1 text-start text-sm leading-tight">
                                <span className="truncate font-semibold">ORICO</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {t("nav.dashboard")}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {NAV_ITEMS.map((item) => (
                                <SidebarMenuItem key={item.key}>
                                    <SidebarMenuButton
                                        tooltip={t(`nav.${item.key}`)}
                                        render={<Link href={item.url} />}
                                    >
                                        <item.icon />
                                        <span>{t(`nav.${item.key}`)}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="mb-2 rounded-xl border border-[color:var(--border-strong)] p-3 group-data-[collapsible=icon]:hidden">
                    <p className="text-xs font-medium">{t("professionalPlan")}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{t("credits")}</p>
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

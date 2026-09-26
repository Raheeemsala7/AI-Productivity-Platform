"use client"
import { useMemo } from "react"
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
  SidebarRail,
} from "@/shared/components/ui/sidebar"
import Image from "next/image"
import { useTranslations } from "next-intl"
import {
  Users,
  Flag,
  UserX,
  KeyRound,
  MonitorSmartphone,
  Bug,
  ShieldUser,
  LogOut,
  FolderKanban,
  Files,
  Receipt,
  ArrowLeftRight,
  CreditCard,
  BadgeCheck,
  ChartNoAxesCombined,
  MessageSquare,
  LayoutDashboard,
  Settings,
  Database,
  Building
} from "lucide-react"
import { Link, usePathname } from "@/i18n/navigation"
import SignOutButton from "@/shared/components/dashboard/sign-out-button"

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("Dashboard")
  const pathname = usePathname()
  
  const data = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "Statistics",
          url: "/admin/statistics",
          icon: ChartNoAxesCombined,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Users",
          url: "/admin/users",
          icon: Users,
        },
        {
          title: "Subscriptions",
          url: "/admin/subscriptions",
          icon: BadgeCheck,
        },
        {
          title: "Plans",
          url: "/admin/plans",
          icon: CreditCard,
        },
        {
          title: "Coupons",
          url: "/admin/coupons",
          icon: Receipt,
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          title: "Templates",
          url: "/admin/templates",
          icon: FolderKanban,
        },
        {
          title: "Tools",
          url: "/admin/tools",
          icon: Bug,
        },
        {
          title: "Providers",
          url: "/admin/providers",
          icon: Building,
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          title: "Chat",
          url: "/admin/chat",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Settings",
          url: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ]

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-17 bg-background p-2">
        <Link href={"/admin"}>
          <div className="flex h-full items-center gap-2">
            <span
                className="grid aspect-square size-8 shrink-0 grid-cols-2 gap-0.5 border border-foreground p-1"
                aria-hidden="true"
            >
                <span className="bg-foreground" />
                <span className="border border-foreground" />
                <span className="border border-foreground" />
                <span className="bg-brand" />
            </span>
            <div className="flex flex-col">
              <p className="font-bold">ORICO Admin</p>
              <span className="text-sm text-muted-foreground">
                Management
              </span>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        {data.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-sm">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.url ||
                    pathname?.startsWith(`${item.url}/`)

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="h-10 gap-3 p-3 text-base"
                      >
                        <Link href={item.url}>
                          {item.icon && <item.icon className="size-4.5" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-background">
          <SidebarMenu>
              <SidebarMenuItem>
                  <SignOutButton />
              </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

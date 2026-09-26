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
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  FolderKanban,
  MessageSquare,
  Settings,
  User,
} from "lucide-react"
import { Link, usePathname } from "@/i18n/navigation"
import SignOutButton from "@/shared/components/dashboard/sign-out-button"
import { useTranslations } from "next-intl"

export function UserSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const t = useTranslations("Dashboard")
  
  const data = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Usage & Billing",
      items: [
        {
          title: "My Subscription",
          url: "/dashboard/subscription",
          icon: CreditCard,
        },
        {
          title: "My Usage",
          url: "/dashboard/usage",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          title: "Templates",
          url: "/dashboard/templates",
          icon: FolderKanban,
        },
        {
          title: "Chat",
          url: "/dashboard/chat",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
          icon: User,
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ]

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-17 bg-background p-2">
        <Link href={"/dashboard"}>
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
              <p className="font-bold">ORICO</p>
              <span className="text-sm text-muted-foreground">
                Workspace
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
          <div className="mb-2 rounded-xl border border-border-strong p-3 group-data-[collapsible=icon]:hidden">
              <p className="text-xs font-medium">{t("professionalPlan") || "Professional Plan"}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{t("credits") || "Credits Used"}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-brand" style={{ width: "84%" }} />
              </div>
          </div>
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

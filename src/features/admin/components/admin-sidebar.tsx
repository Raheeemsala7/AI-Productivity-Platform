"use client"
import { useMemo, useState } from "react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
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
  Building
} from "lucide-react"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { Button } from "@/shared/components/ui/button"
import { SpaceAvatar } from "@/shared/components/ui/space-avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"
import { signOut, useSession } from "next-auth/react"

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("Dashboard")
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [logoutOpen, setLogoutOpen] = useState(false)
  
  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"
  
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
        {
          title: "Logout",
          url: "#",
          icon: LogOut,
        }
      ],
    },
  ]

  return (
    <Sidebar side={dir === "rtl" ? "right" : "left"} {...props}>
      <SidebarHeader className="h-17 bg-background p-2">
        <Link href={"/admin"}>
          <div className="flex h-full items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
               OA
            </div>
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
                    (item.url !== "/admin" && pathname?.startsWith(`${item.url}/`))

                  if (item.title === "Logout") {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          className="h-10 gap-3 p-3 text-base"
                          onClick={() => setLogoutOpen(true)}
                        >
                          {item.icon && <item.icon className="size-4.5" />}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  }

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        
                        isActive={isActive}
                        className="h-10 gap-3 p-3 text-base"
                      >
                        <Link href={item.url} className="flex items-center gap-3">
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
        <Sheet>
          <SheetTrigger >
            <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-card p-2">
              <SpaceAvatar
                name={session?.user?.name || "Admin"}
                size="xs"
              />
              <div>
                <p className="truncate font-medium">{session?.user?.name || "Admin"}</p>
                <p className="truncate text-xs">
                  {session?.user?.email || "admin@example.com"}
                </p>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent>
             <div className="p-4">
                 <h2 className="text-lg font-bold">Profile</h2>
                 <p className="text-muted-foreground">This is a mocked profile panel.</p>
             </div>
          </SheetContent>
        </Sheet>
      </SidebarFooter>

      <SidebarRail />

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              You will be signed out of your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setLogoutOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              variant="destructive"
              onClick={async () => {
                await signOut({ redirect: false })
                router.push("/auth/login")
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  )
}

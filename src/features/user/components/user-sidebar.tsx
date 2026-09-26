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
import { useTranslations, useLocale } from "next-intl"
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  FolderKanban,
  MessageSquare,
  Settings,
  User,
  LogOut,
} from "lucide-react"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { Button } from "@/shared/components/ui/button"
import { SpaceAvatar } from "@/shared/components/ui/space-avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"
import { signOut, useSession } from "next-auth/react"

export function UserSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const t = useTranslations("Dashboard")
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
        <Link href={"/dashboard"}>
          <div className="flex h-full items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
               OU
            </div>
            <div className="flex flex-col">
              <p className="font-bold">ORICO User</p>
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
                    (item.url !== "/dashboard" && pathname?.startsWith(`${item.url}/`))

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
                name={session?.user?.name || "User"}
                size="xs"
              />
              <div>
                <p className="truncate font-medium">{session?.user?.name || "User"}</p>
                <p className="truncate text-xs">
                  {session?.user?.email || "user@example.com"}
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

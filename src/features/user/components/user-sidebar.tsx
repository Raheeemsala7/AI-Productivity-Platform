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
  const t = useTranslations("Sidebar")
  const router = useRouter()
  const { data: session } = useSession()
  const [logoutOpen, setLogoutOpen] = useState(false)

  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"
  
  const data = [
    {
      title: t("groups.overview"),
      items: [
        {
          title: t("items.dashboard"),
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: t("groups.usageAndBilling"),
      items: [
        {
          title: t("items.mySubscription"),
          url: "/dashboard/subscription",
          icon: CreditCard,
        },
        {
          title: t("items.myUsage"),
          url: "/dashboard/usage",
          icon: BarChart3,
        },
      ],
    },
    {
      title: t("groups.resources"),
      items: [
        {
          title: t("items.templates"),
          url: "/dashboard/templates",
          icon: FolderKanban,
        },
        {
          title: t("items.chat"),
          url: "/dashboard/chat",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: t("groups.account"),
      items: [
        {
          title: t("items.profile"),
          url: "/dashboard/profile",
          icon: User,
        },
        {
          title: t("items.settings"),
          url: "/dashboard/settings",
          icon: Settings,
        },
        {
          title: t("items.logout"),
          url: "#",
          icon: LogOut,
          isLogout: true,
        }
      ],
    },
  ]

  return (
    <Sidebar side={dir === "rtl" ? "right" : "left"} {...props}>
      <SidebarHeader className="h-17 bg-background p-2">
        <Link href={"/dashboard"} className="block w-full">
          <div className="flex h-full items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
               OU
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{t("user.brand")}</p>
              <span className="text-sm text-muted-foreground">
                {t("user.tagline")}
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

                  if ("isLogout" in item && item.isLogout) {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          className="h-10 gap-3 p-3 text-base cursor-pointer"
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
                        className="h-10 gap-3 p-3 text-base cursor-pointer"
                        render={<Link href={item.url} />}
                      >
                        {item.icon && <item.icon className="size-4.5" />}
                        <span>{item.title}</span>
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
          <SheetTrigger>
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
                 <h2 className="text-lg font-bold">{t("profileSheet.title")}</h2>
                 <p className="text-muted-foreground">{t("profileSheet.description")}</p>
             </div>
          </SheetContent>
        </Sheet>
      </SidebarFooter>

      <SidebarRail />

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("logoutDialog.title")}</DialogTitle>
            <DialogDescription>
              {t("logoutDialog.description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setLogoutOpen(false)}
              variant="outline"
              className="flex-1"
            >
              {t("logoutDialog.cancel")}
            </Button>
            <Button
              className="flex-1"
              variant="destructive"
              onClick={async () => {
                await signOut({ redirect: false })
                router.push("/auth/login")
              }}
            >
              {t("logoutDialog.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  )
}

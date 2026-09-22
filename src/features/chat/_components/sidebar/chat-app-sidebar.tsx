import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/shared/components/ui/sidebar'
import { ArrowLeft, CreditCard, Sparkles, User } from 'lucide-react'
import { ConversationsHistory } from '../history/conversations-history'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { Link } from '@/i18n/navigation'

type SessionUserLike = {
  image?: string | null;
  avatar?: string | null;
  avatar_color?: string | null;
  name?: string | null;
};

export default async function ChatAppSidebar() {
    const t = await getTranslations("Chat")
    const session = await getServerSession(authOptions)


    const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
      const getAvatarUrl = (user?: SessionUserLike | null) => user?.image ?? user?.avatar ?? "";
      const getAvatarColor = (user?: SessionUserLike | null) => user?.avatar_color || "var(--color-brand)";
    return (
        <Sidebar collapsible="icon" variant="sidebar" className="group border-none shadow-none">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="group/logo relative flex aspect-square size-8 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)]">
                                <Sparkles className="size-4 text-white" />

                                {/* Trigger when collapsed */}
                                <div className="absolute inset-0 hidden group-data-[state=collapsed]:block">
                                    <SidebarTrigger
                                        className="
                                    size-8
                                    opacity-0
                                    transition-opacity
                                    group-hover/logo:opacity-100
                                "
                                    />
                                </div>
                            </div>
                            {/* Normal Trigger when expanded */}
                            <SidebarTrigger className="group-data-[state=collapsed]:hidden" />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <ConversationsHistory />
            </SidebarContent>

            <SidebarFooter>
                {/* Collapsed: user avatar only, with tooltip */}
                <div className="hidden group-data-[collapsible=icon]:block">
                    <SidebarMenu className="py-1">
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                aria-label={t("account")}
                                tooltip={t("account")}
                                className="rounded-xl"
                            >
                                {session?.user ? (
                                    <Avatar className="size-7 shrink-0">
                                        <AvatarImage src={getAvatarUrl(session.user)} alt={session.user.name || "User"} />
                                        <AvatarFallback
                                            style={{
                                                backgroundColor: getAvatarColor(session.user),
                                                color: "var(--color-brand-foreground)",
                                            }}
                                        >
                                            {session.user.name ? getInitials(session.user.name) : <User className="size-3.5" />}
                                        </AvatarFallback>
                                    </Avatar>
                                ) : null}
                                <span className="sr-only">{t("account")}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>

                {/* Expanded: full footer */}
                <div className="group-data-[collapsible=icon]:hidden border-t border-border bg-card/50 p-4 shrink-0 flex flex-col gap-4">
                    {session?.user && (
                        <>
                            <div className="flex items-center gap-3">
                                <CreditCard className="size-4 text-brand" />
                                <span className="text-xs font-medium text-muted-foreground">
                                    120 {t("creditsRemaining")}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 shadow-sm">
                                <Avatar className="size-10 shrink-0">
                                    <AvatarImage src={getAvatarUrl(session.user)} alt={session.user.name || "User"} />
                                    <AvatarFallback
                                        style={{
                                            backgroundColor: getAvatarColor(session.user),
                                            color: "var(--color-brand-foreground)",
                                        }}
                                    >
                                        {session.user.name ? getInitials(session.user.name) : <User className="size-4" />}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex min-w-0 flex-col">
                                    <span className="truncate text-sm font-medium text-foreground">
                                        {session.user.name || "User"}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {session.user.email}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}

                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="size-4 rtl:rotate-180" />
                        {t("backToDashboard")}
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
import { Link } from '@/i18n/navigation'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/components/ui/sidebar'
import { Sparkles } from 'lucide-react'

export default function ChatAppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar" className="border-none shadow-none">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {/* <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}> */}
                            <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)]">
                                <Sparkles className="size-4 text-white" />
                            </div>
                            <div className="grid flex-1 text-start text-sm leading-tight">
                                <span className="truncate font-semibold">ORICO</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {/* {t("nav.dashboard")} */}
                                </span>
                            </div>
                        {/* </SidebarMenuButton> */}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                           
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>

               <p>ff</p>
            </SidebarFooter>
        </Sidebar>
    )
}

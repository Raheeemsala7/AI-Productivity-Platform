import { Link } from '@/i18n/navigation'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/shared/components/ui/sidebar'
import { Sparkles } from 'lucide-react'

export default function ChatAppSidebar() {
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

"use client"
import { SidebarInset, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AnimatedThemeToggler } from "@/shared/components/ui/animated-theme-toggler"
import { ChangeLanguage } from "./change-language"

export default function HeaderSidebar({ name, title = "Dashboard" }: { name: string, title?: string }) {
  return (
      <header className="flex h-17 shrink-0 items-center justify-between gap-2 border-b bg-card">
        <div className="flex h-full">
          <SidebarTrigger className="h-full w-15" />

          <div className="flex h-full flex-col justify-center">
            <p className="hidden font-bold md:block">
              {title}
            </p>
            <p className="text-lg font-bold md:hidden">{title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-3 md:gap-5">
          <ChangeLanguage />
          <AnimatedThemeToggler />
        </div>
      </header>
  )
}

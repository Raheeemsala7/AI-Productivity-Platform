"use client"
import React from "react"
import { SidebarProvider } from "@/shared/components/ui/sidebar"

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
}

export const DashboardLayout = ({ children, sidebar, header }: Props) => {
  return (
    <SidebarProvider className="flex h-dvh w-full overflow-hidden">
      {sidebar}
      <div className="flex flex-1 flex-col overflow-hidden p-4">
        <div className="flex flex-1 flex-col overflow-hidden rounded-md bg-background ring ring-foreground/10">
          {header}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

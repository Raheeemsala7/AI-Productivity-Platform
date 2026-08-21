import { authOptions } from "@/auth";
import ChatAppSidebar from "@/features/chat/_components/sidebar/chat-app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ORICO AI Assistant — Business Planning Chat",
  description:
    "Chat with ORICO AI to shape your business idea, market strategy, financials and investor materials.",
  openGraph: {
    title: "ORICO AI Assistant",
    description: "A business-focused AI assistant for founders and teams.",
  },
};

export default async function ChatLayout({ children }: { children: ReactNode }) {
  // Transation
  const t = await getTranslations("Dashboard");
  // Session
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect("/auth/login")
  }


  return (
    <SidebarProvider className=''>
      <ChatAppSidebar />
      <SidebarInset className='rounded-2xl'>
        <header className="flex h-16 items-center justify-between border-b px-3 md:px-6 py-2">
          <div className="flex items-center gap-2 md:gap-4">
            <SidebarTrigger />
            
          </div>
          
        </header>
        {/* <main className="">{children}</main> */}
      </SidebarInset>
    </SidebarProvider>
  )
}

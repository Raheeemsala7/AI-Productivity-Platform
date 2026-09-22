import { SiteFooter } from "@/shared/components/site-footer";
import { SiteHeader } from "@/shared/components/site-header";
import React from "react";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-clip">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { TEMPLATES_DATA, TemplateToolItem } from "../data/templates.data";
import {
  ContentWritingGraphic,
  BusinessToolsGraphic,
} from "./template-card-graphics";

function renderGraphic(type: TemplateToolItem["graphicType"]) {
  switch (type) {
    case "writing":
      return <ContentWritingGraphic />;
    case "business":
      return <BusinessToolsGraphic />;
    default:
      return null;
  }
}

export function TemplatesCatalog() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:py-6 sm:px-6">
      {/* Hero Section */}
      <div className="my-8 sm:my-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
          أدوات الكتابة{" "}
          <span className="text-[#ea5b39] drop-shadow-sm">الذكية</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          استخدم الذكاء الاصطناعي لإنشاء محتوى بكفاءة.
        </p>
      </div>

      {/* Grid of Cards: Side-by-side matching screenshot */}
      <div className="flex items-stretch justify-center flex-col sm:flex-row gap-6 max-w-4xl mx-auto w-full">
        {/* Card 1: كتابة المحتوى */}
        <TemplateCard item={TEMPLATES_DATA[0]} />

        {/* Card 2: أدوات الشركات */}
        <TemplateCard item={TEMPLATES_DATA[1]} />
      </div>
    </div>
  );
}

function TemplateCard({ item }: { item: TemplateToolItem }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex-1 max-w-[420px] w-full flex flex-col justify-between overflow-hidden rounded-[24px]",
        "bg-[#131418] border border-white/5 transition-all duration-300",
        "hover:bg-[#161820] hover:border-[#ea5b39]/40 hover:-translate-y-1.5",
        "hover:shadow-2xl hover:shadow-[#ea5b39]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea5b39]",
      )}
    >
      {/* Top Graphic Illustration - flush with top and side edges */}
      <div className="w-full overflow-hidden rounded-t-[23px]">
        {renderGraphic(item.graphicType)}
      </div>

      {/* Bottom Content Area */}
      <div className="flex flex-col text-start px-6 pt-5 pb-7">
        <h3 className="text-lg sm:text-xl font-bold text-white transition-colors duration-200 group-hover:text-[#ea5b39]">
          {item.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#8e919a] leading-relaxed font-normal">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

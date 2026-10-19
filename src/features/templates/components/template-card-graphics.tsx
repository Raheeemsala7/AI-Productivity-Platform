
import { MessageSquare } from "lucide-react";
import { cn } from "@/shared/lib/utils";

/**
 * 1. Graphic for Content Writing Card (كتابة المحتوى)
 * Coral/orange background with playful floating white badge tags
 */
export function ContentWritingGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-56 sm:h-60 w-full overflow-hidden bg-[#e8563a] select-none flex items-center justify-center",
        className,
      )}
    >
      {/* Tilted Grid Container matching the exact angle and spacing */}
      <div className="flex flex-col gap-3 transform rotate-[-10deg] scale-105 pointer-events-none w-full max-w-75 sm:max-w-94 ">
        {/* Row 1: Google Ads, (in) badge, Email */}
        <div className="flex items-center gap-3  flex-1 w-full">
          {/* Google Ads */}
          <div className="rounded-xl bg-white px-5 py-6 text-[13px] flex-1 font-black text-[#1c1d22] shadow-sm whitespace-nowrap">
            Google Ads
          </div>

          {/* LinkedIn 'in' Badge */}
          <div className="flex size-14 w-20 h-16 shrink-0 py-6 items-center justify-center rounded-xl bg-white shadow-sm">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#e8563a] font-black text-xs text-white">
              in
            </div>
          </div>

          {/* Email */}
          <div className="rounded-xl bg-white px-5 py-6 text-[13px] flex-1 font-black text-[#1c1d22] shadow-sm whitespace-nowrap">
            Email
          </div>
        </div>

        {/* Row 2: Posts, Article Ideas */}
        <div className="flex items-center gap-3 ">
          {/* Posts */}
          <div className="rounded-2xl bg-white px-6 py-6 text-[13px] font-black text-[#1c1d22] shadow-sm whitespace-nowrap">
            Posts
          </div>

          {/* Article Ideas */}
          <div className="rounded-2xl bg-white px-5 py-6 text-[13px] font-black text-[#1c1d22] shadow-sm whitespace-nowrap">
            Article Ideas
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Graphic for Business Tools Card (أدوات الشركات)
 * Dark background with centered document mockup, tags, and speech bubble
 */
export function BusinessToolsGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-56 sm:h-60 w-full overflow-hidden bg-[#131418] select-none flex items-center justify-center p-4",
        className,
      )}
    >
      {/* Central Document Card */}
      <div className="relative w-59 sm:w-61.5 h-41 bg-[#f6f3eb] rounded-[18px] shadow-lg border border-[#e8e2d5]/60 flex flex-col justify-between p-4">
        {/* Top-left Coral Pill: Reports */}
        <div className="absolute top-3.5 -left-3 bg-[#e8563a] text-white text-[11px] font-black px-3 py-1 rounded-lg shadow-sm">
          Reports
        </div>

        {/* Top-Right Coral Headline Bars */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
          <div className="h-2.5 w-24 bg-[#e8563a] rounded-full" />
          <div className="h-2.5 w-16 bg-[#e8563a] rounded-full" />
        </div>

        {/* Middle Grey Text Lines */}
        <div className="absolute top-[68px] left-5 right-12 flex flex-col gap-2">
          <div className="h-2 w-40 bg-[#ded9cf] rounded-full" />
          <div className="h-2 w-28 bg-[#ded9cf] rounded-full" />
        </div>

        {/* Bottom-left White Pill: Analysis */}
        <div className="absolute top-[96px] -left-3.5 bg-white text-[#1c1d22] text-[11px] font-black px-3 py-1 rounded-lg shadow-sm border border-gray-100">
          Analysis
        </div>

        {/* Right Circular Taupe Badge with Chat Bubble Icon */}
        <div className="absolute top-[80px] -right-3.5 size-12 bg-[#dcd6cb] text-[#1c1d22] rounded-full flex items-center justify-center shadow-md">
          <MessageSquare className="size-5 text-[#1c1d22] stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
}



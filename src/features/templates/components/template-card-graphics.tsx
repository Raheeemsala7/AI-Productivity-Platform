"use client";

import React from "react";
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
      <div className="flex flex-col gap-3 transform -rotate-[10deg] scale-105 pointer-events-none w-full max-w-[340px]">
        {/* Row 1: Google Ads, (in) badge, Email */}
        <div className="flex items-center gap-3 -translate-x-3">
          {/* Google Ads */}
          <div className="rounded-2xl bg-white px-5 py-3 text-[13px] font-black text-[#1c1d22] shadow-sm whitespace-nowrap">
            Google Ads
          </div>

          {/* LinkedIn 'in' Badge */}
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#e8563a] font-black text-xs text-white">
              in
            </div>
          </div>

          {/* Email */}
          <div className="rounded-2xl bg-white px-5 py-3 text-[13px] font-black text-[#1c1d22] shadow-sm whitespace-nowrap">
            Email
          </div>
        </div>

        {/* Row 2: Posts, Article Ideas */}
        <div className="flex items-center gap-3 -translate-x-8">
          {/* Posts */}
          <div className="rounded-2xl bg-white px-6 py-3 text-[13px] font-black text-[#1c1d22] shadow-sm whitespace-nowrap">
            Posts
          </div>

          {/* Article Ideas */}
          <div className="rounded-2xl bg-white px-5 py-3 text-[13px] font-black text-[#1c1d22] shadow-sm whitespace-nowrap">
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
      <div className="relative w-[236px] sm:w-[246px] h-[162px] bg-[#f6f3eb] rounded-[18px] shadow-lg border border-[#e8e2d5]/60 flex flex-col justify-between p-4">
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

/**
 * 3. Graphic for Professional Article Editor Card (محرر المقالات المحترف)
 * Dark background with large serif letter T and editorial lines
 */
export function ArticleEditorGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-48 sm:h-52 w-full flex-col justify-center overflow-hidden rounded-2xl",
        "bg-[#0e0f13] border border-white/5",
        "px-7 select-none transition-transform duration-300 group-hover:scale-[1.02]",
        className,
      )}
    >
      <div className="w-full max-w-[210px] mx-auto">
        {/* Top Section: Serif 'T' + 3 Horizontal Lines */}
        <div className="flex items-center gap-4">
          {/* Serif 'T' */}
          <span className="font-serif text-6xl font-black text-white leading-none tracking-tight select-none">
            T
          </span>

          {/* 3 horizontal white lines next to the top of T */}
          <div className="flex flex-col gap-2 flex-1 pt-1">
            <div className="h-1.5 w-full bg-white/90 rounded-full" />
            <div className="h-1.5 w-full bg-white/90 rounded-full" />
            <div className="h-1.5 w-full bg-white/90 rounded-full" />
          </div>
        </div>

        {/* Bottom Section: 2 Full-width horizontal white lines */}
        <div className="mt-3.5 flex flex-col gap-2 w-full">
          <div className="h-1.5 w-full bg-white/90 rounded-full" />
          <div className="h-1.5 w-4/5 bg-white/90 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Graphic for Text Editor Card (محرر النصوص)
 * Dark background with editor mockup (B I U T toolbar and B I U badge)
 */
export function TextEditorGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-48 sm:h-52 w-full items-center justify-center overflow-hidden rounded-2xl",
        "bg-[#0e0f13] border border-white/5",
        "p-4 select-none transition-transform duration-300 group-hover:scale-[1.02]",
        className,
      )}
    >
      {/* Editor Mockup Window */}
      <div className="w-48 sm:w-52 rounded-xl overflow-hidden shadow-xl border border-white/10">
        {/* Top White Toolbar: B I U T */}
        <div className="bg-white px-3.5 py-1.5 flex items-center justify-start gap-3 text-gray-800 text-xs border-b border-gray-200">
          <span className="font-black text-xs">B</span>
          <span className="italic font-serif font-bold text-xs">I</span>
          <span className="underline font-bold text-xs">U</span>
          <span className="font-sans font-bold text-xs">T</span>
        </div>

        {/* Editor Body Canvas */}
        <div className="bg-[#eee7dc] p-3.5 relative min-h-[76px] flex flex-col justify-between">
          {/* Formatted Dark Text Lines */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-1.5 w-full bg-[#1e2025] rounded-full" />
            <div className="h-1.5 w-full bg-[#1e2025] rounded-full" />
            <div className="h-1.5 w-2/3 bg-[#1e2025] rounded-full" />
          </div>

          {/* Bottom-right Coral Badge: B I U */}
          <div className="self-end mt-2 bg-[#ea5b39] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm tracking-widest">
            B I U
          </div>
        </div>
      </div>
    </div>
  );
}

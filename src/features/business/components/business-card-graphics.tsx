"use client";

import React from "react";
import {
  FileText,
  Presentation,
  Layout,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Target,
  BarChart3,
  Layers,
  Lock,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { BusinessToolId } from "../types/business-tool";

/**
 * 1. Graphic for Business Plan Generator
 */
export function BusinessPlanGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-48 sm:h-52 w-full overflow-hidden select-none flex items-center justify-center p-4",
        "bg-gradient-to-br from-[#ea5b39]/15 via-background to-card",
        className
      )}
    >
      <div className="absolute -top-10 -right-10 size-36 rounded-full bg-[#ea5b39]/20 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ea5b39_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Main Document Mockup */}
      <div className="relative w-full max-w-72 sm:max-w-80 rounded-xl bg-card/90 backdrop-blur-md border border-[#ea5b39]/30 p-3.5 shadow-lg shadow-[#ea5b39]/5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Document Header */}
        <div className="flex items-center justify-between pb-2 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-[#ea5b39]/15 text-[#ea5b39] flex items-center justify-center font-bold">
              <Target className="size-3.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-foreground">Executive Business Plan</p>
              <p className="text-[9px] text-muted-foreground font-mono">Strategy & Feasibility 2026</p>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[9px] font-bold flex items-center gap-1">
            <ShieldCheck className="size-2.5" />
            Investor Ready
          </span>
        </div>

        {/* Market Sizing Metrics TAM / SAM */}
        <div className="my-2.5 grid grid-cols-3 gap-1.5 text-center">
          <div className="rounded-lg bg-muted/40 p-1.5 border border-border/40">
            <span className="text-[8px] text-muted-foreground block">TAM</span>
            <span className="text-[11px] font-bold text-foreground font-mono">$4.2B</span>
          </div>
          <div className="rounded-lg bg-[#ea5b39]/10 p-1.5 border border-[#ea5b39]/20">
            <span className="text-[8px] text-[#ea5b39] block font-semibold">SAM</span>
            <span className="text-[11px] font-bold text-[#ea5b39] font-mono">$1.1B</span>
          </div>
          <div className="rounded-lg bg-muted/40 p-1.5 border border-border/40">
            <span className="text-[8px] text-muted-foreground block">SOM</span>
            <span className="text-[11px] font-bold text-foreground font-mono">$120M</span>
          </div>
        </div>

        {/* Strategic Roadmap tags */}
        <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-1">
          <span className="flex items-center gap-1 text-foreground font-medium">
            <CheckCircle2 className="size-3 text-[#ea5b39]" />
            5-Year Financial Model
          </span>
          <span className="font-mono text-[#ea5b39] font-bold">48 Pages</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Graphic for Presentation Generator (Pitch Deck)
 */
export function GeneratePresentationGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-48 sm:h-52 w-full overflow-hidden select-none flex items-center justify-center p-4",
        "bg-gradient-to-br from-purple-500/15 via-background to-card",
        className
      )}
    >
      <div className="absolute -top-10 -left-10 size-36 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Main 16:9 Presentation Slide Mockup */}
      <div className="relative w-full max-w-72 sm:max-w-80 rounded-xl bg-stone-950/90 border border-purple-500/30 p-3.5 shadow-lg shadow-purple-500/5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Slide Frame Top */}
        <div className="flex items-center justify-between text-[10px] text-white/80 pb-2 border-b border-white/10 font-mono">
          <div className="flex items-center gap-1.5">
            <Presentation className="size-3.5 text-purple-400" />
            <span className="font-bold text-white">Investor Pitch Deck</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-purple-500/25 text-purple-300 font-semibold text-[9px]">
            Slide 03 / 12
          </span>
        </div>

        {/* Slide Body Preview */}
        <div className="my-2.5 flex flex-col gap-1.5">
          <p className="text-[11px] font-bold text-white flex items-center justify-between">
            <span>Market Problem & Opportunity</span>
            <span className="text-[9px] text-emerald-400 font-mono">+140% YoY</span>
          </p>

          <div className="h-12 w-full bg-purple-950/40 rounded-lg border border-purple-500/20 p-2 flex items-end gap-1.5">
            <div className="w-1/4 h-2/5 bg-purple-500/40 rounded-t" />
            <div className="w-1/4 h-3/5 bg-purple-500/60 rounded-t" />
            <div className="w-1/4 h-4/5 bg-purple-500/80 rounded-t" />
            <div className="w-1/4 h-full bg-gradient-to-t from-purple-500 to-indigo-400 rounded-t flex items-center justify-center">
              <ArrowUpRight className="size-3 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between text-[9px] text-white/60 pt-1">
          <span>16:9 HD Widescreen</span>
          <span className="text-purple-300 font-medium">Export PPTX & PDF</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Graphic for Landing Page Generator
 */
export function GenerateLandingGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-48 sm:h-52 w-full overflow-hidden select-none flex items-center justify-center p-4",
        "bg-gradient-to-br from-sky-500/15 via-background to-card",
        className
      )}
    >
      <div className="absolute -bottom-10 -right-10 size-36 rounded-full bg-sky-500/20 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Main Browser Mockup */}
      <div className="relative w-full max-w-72 sm:max-w-80 rounded-xl bg-card border border-sky-500/30 overflow-hidden shadow-lg shadow-sky-500/5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Browser Top Navigation */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 border-b border-border/60">
          <div className="flex gap-1">
            <span className="size-2 rounded-full bg-red-400" />
            <span className="size-2 rounded-full bg-amber-400" />
            <span className="size-2 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 mx-2 bg-background/80 rounded px-2 py-0.5 text-[8px] font-mono text-muted-foreground flex items-center gap-1 truncate">
            <Lock className="size-2 text-emerald-500 shrink-0" />
            <span>orico.ai/get-started</span>
          </div>
        </div>

        {/* Landing Page Hero Viewport */}
        <div className="p-3 bg-gradient-to-b from-card to-background flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-500 text-[8px] font-bold">
              CRO Optimized
            </span>
            <div className="flex text-amber-400 text-[8px]">★★★★★</div>
          </div>

          <h5 className="text-[11px] font-extrabold text-foreground leading-tight">
            Supercharge Your Product Growth with Smart AI
          </h5>

          {/* Simulated CTA button */}
          <div className="flex items-center gap-2 pt-1">
            <div className="px-2.5 py-1 rounded bg-sky-500 text-white font-bold text-[9px] shadow-sm shadow-sky-500/30">
              Start Free Trial
            </div>
            <span className="text-[8px] text-muted-foreground">No credit card needed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Graphic for Business Proposal (Deal Maker)
 */
export function BusinessProposalGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-48 sm:h-52 w-full overflow-hidden select-none flex items-center justify-center p-4",
        "bg-gradient-to-br from-emerald-500/15 via-background to-card",
        className
      )}
    >
      <div className="absolute -top-10 -right-10 size-36 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Contract / Proposal Mockup */}
      <div className="relative w-full max-w-72 sm:max-w-80 rounded-xl bg-card/90 backdrop-blur-md border border-emerald-500/30 p-3.5 shadow-lg shadow-emerald-500/5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-emerald-500" />
            <span className="text-[11px] font-bold text-foreground">
              Master Services Agreement
            </span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-[9px] font-bold">
            B2B Contract
          </span>
        </div>

        {/* Proposal Details */}
        <div className="my-2 flex flex-col gap-1 text-[10px]">
          <div className="flex justify-between text-muted-foreground">
            <span>Scope: Full Platform Integration</span>
            <span className="font-mono text-foreground font-bold">$18,500</span>
          </div>
          <div className="h-1.5 w-full bg-emerald-500/15 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-emerald-500 rounded-full" />
          </div>
        </div>

        {/* Signature stamp line */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[9px]">
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="size-3" />
            <span>Legally Verified & Approved</span>
          </div>
          <span className="font-mono text-muted-foreground">Signed & Encrypted</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 5. Graphic for Business Reports & SWOT Analysis
 */
export function BusinessReportsGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-48 sm:h-52 w-full overflow-hidden select-none flex items-center justify-center p-4",
        "bg-gradient-to-br from-amber-500/15 via-background to-card",
        className
      )}
    >
      <div className="absolute -bottom-10 -left-10 size-36 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Main Executive Analytics Mockup */}
      <div className="relative w-full max-w-72 sm:max-w-80 rounded-xl bg-card/90 backdrop-blur-md border border-amber-500/30 p-3.5 shadow-lg shadow-amber-500/5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-border/50">
          <div className="flex items-center gap-1.5">
            <BarChart3 className="size-3.5 text-amber-500" />
            <span className="text-[11px] font-bold text-foreground">
              Executive SWOT & KPIs
            </span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[9px] font-bold">
            Quarterly Report
          </span>
        </div>

        {/* 4 Quadrants SWOT */}
        <div className="my-2 grid grid-cols-2 gap-1 text-[9px]">
          <div className="p-1 rounded bg-emerald-500/10 border border-emerald-500/20">
            <span className="font-bold text-emerald-500 block">S (Strengths)</span>
            <span className="text-[8px] text-muted-foreground truncate block">High Tech Moat</span>
          </div>
          <div className="p-1 rounded bg-amber-500/10 border border-amber-500/20">
            <span className="font-bold text-amber-500 block">W (Weakness)</span>
            <span className="text-[8px] text-muted-foreground truncate block">Brand Awareness</span>
          </div>
          <div className="p-1 rounded bg-blue-500/10 border border-blue-500/20">
            <span className="font-bold text-blue-500 block">O (Opportunity)</span>
            <span className="text-[8px] text-muted-foreground truncate block">MENA Expansion</span>
          </div>
          <div className="p-1 rounded bg-rose-500/10 border border-rose-500/20">
            <span className="font-bold text-rose-500 block">T (Threats)</span>
            <span className="text-[8px] text-muted-foreground truncate block">Global Entrants</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[9px] text-muted-foreground">
          <span>Generated with Executive AI</span>
          <span className="text-amber-500 font-bold font-mono">Q2 Brief</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper to render the appropriate graphic
 */
export function BusinessCardGraphic({ type }: { type: BusinessToolId }) {
  switch (type) {
    case "business-plan":
      return <BusinessPlanGraphic />;
    case "generate-presentation":
      return <GeneratePresentationGraphic />;
    case "generate-landing":
      return <GenerateLandingGraphic />;
    case "business-proposal":
      return <BusinessProposalGraphic />;
    case "business-reports":
      return <BusinessReportsGraphic />;
    default:
      return null;
  }
}


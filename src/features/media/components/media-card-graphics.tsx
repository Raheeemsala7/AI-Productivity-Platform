"use client";

import React from "react";
import {
  Sparkles,
  Video,
  Play,
  Volume2,
  Wand2,
  FileAudio,
  Crop,
  Layers,
  Radio,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { MediaToolId } from "../types/media-tool";

/**
 * 1. Graphic for Generate Image
 */
export function GenerateImageGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-48 sm:h-52 w-full overflow-hidden select-none flex items-center justify-center p-4",
        "bg-gradient-to-br from-[#ea5b39]/15 via-background to-card",
        className
      )}
    >
      {/* Background ambient light */}
      <div className="absolute -top-10 -right-10 size-36 rounded-full bg-[#ea5b39]/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 size-28 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ea5b39_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"
      />

      {/* Main Composition: Interactive Preview Card */}
      <div className="relative w-full max-w-72 sm:max-w-80 flex flex-col gap-2.5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Mock Prompt Bar */}
        <div className="flex items-center gap-2 rounded-xl bg-background/80 backdrop-blur-md px-3 py-2 border border-[#ea5b39]/25 shadow-lg shadow-[#ea5b39]/5">
          <Sparkles className="size-3.5 text-[#ea5b39] shrink-0 animate-pulse" />
          <span className="text-[11px] font-medium text-foreground/90 truncate">
            &quot;Futuristic oasis city at sunset, 8k cinematic&quot;
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#ea5b39]/15 text-[#ea5b39] font-semibold shrink-0">
            Prompt
          </span>
        </div>

        {/* Visual Canvas Artwork Mockup */}
        <div className="relative h-24 sm:h-26 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-tr from-stone-900 via-[#261715] to-[#451f18] p-3 flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between text-[10px]">
            <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 font-mono text-[9px] border border-white/10">
              1024 × 1024 · 16:9
            </span>
            <span className="flex items-center gap-1 text-[#ea5b39] font-medium text-[10px] bg-black/40 px-2 py-0.5 rounded-full">
              <span className="size-1.5 rounded-full bg-[#ea5b39] animate-ping" />
              FLUX.1 Ultra
            </span>
          </div>

          {/* Abstract Generative Layer Elements */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1.5">
              <span className="size-4 rounded-md bg-[#ea5b39]/80 flex items-center justify-center text-[8px] text-white font-bold">
                AI
              </span>
              <span className="text-[10px] text-white/90 font-medium">Ultra-HD Render</span>
            </div>
            <div className="flex -space-x-1 rtl:space-x-reverse">
              <div className="size-4 rounded-full border border-white/20 bg-amber-400" />
              <div className="size-4 rounded-full border border-white/20 bg-[#ea5b39]" />
              <div className="size-4 rounded-full border border-white/20 bg-rose-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Graphic for Generate Video
 */
export function GenerateVideoGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-48 sm:h-52 w-full overflow-hidden select-none flex items-center justify-center p-4",
        "bg-gradient-to-br from-rose-500/15 via-background to-card",
        className
      )}
    >
      {/* Background glow */}
      <div className="absolute -top-10 -left-10 size-36 rounded-full bg-rose-500/20 blur-2xl pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Main Viewfinder Frame */}
      <div className="relative w-full max-w-72 sm:max-w-80 rounded-xl bg-stone-950/90 border border-rose-500/30 p-3 shadow-lg shadow-rose-500/5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Corner viewfinder brackets */}
        <div className="absolute top-2 left-2 size-2 border-t-2 border-l-2 border-rose-400/80 pointer-events-none" />
        <div className="absolute top-2 right-2 size-2 border-t-2 border-r-2 border-rose-400/80 pointer-events-none" />
        <div className="absolute bottom-2 left-2 size-2 border-b-2 border-l-2 border-rose-400/80 pointer-events-none" />
        <div className="absolute bottom-2 right-2 size-2 border-b-2 border-r-2 border-rose-400/80 pointer-events-none" />

        {/* Top Header: REC + Timecode */}
        <div className="flex items-center justify-between text-[10px] text-white/80 pb-2 border-b border-white/10 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-bold text-rose-400">REC</span>
            <span className="text-white/60">00:04.18</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold text-[9px]">
            4K · 60 FPS
          </span>
        </div>

        {/* Center Play Area */}
        <div className="my-2.5 flex items-center justify-center gap-3">
          <div className="size-11 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-500/30 group-hover:scale-110 transition-transform">
            <Play className="size-4.5 fill-current translate-x-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-white/95">Cinematic AI Render</span>
            <span className="text-[9px] text-white/50">Fluid motion & physics simulation</span>
          </div>
        </div>

        {/* Bottom Filmstrip Timeline */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-white/10">
          <div className="h-1.5 flex-1 bg-white/15 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-rose-500 to-amber-400 rounded-full" />
          </div>
          <span className="text-[9px] font-mono text-white/60">00:24</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Graphic for Text to Speech
 */
export function TextToSpeechGraphic({ className }: { className?: string }) {
  const bars = [16, 28, 44, 20, 36, 48, 30, 42, 22, 38, 48, 26, 34, 18];

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

      {/* Main Studio Audio Card */}
      <div className="relative w-full max-w-72 sm:max-w-80 rounded-xl bg-card/90 backdrop-blur-md border border-emerald-500/30 p-3 shadow-lg shadow-emerald-500/5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Speaker Info Pill */}
        <div className="flex items-center justify-between pb-2 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 font-bold text-[10px]">
              <Volume2 className="size-3" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-foreground">Sarah — Natural Voice</p>
              <p className="text-[9px] text-muted-foreground">Neural Multilingual Studio</p>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[9px] font-bold">
            100% Lifelike
          </span>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="my-3 flex items-center justify-center gap-1 h-12 px-2 bg-emerald-500/5 rounded-lg border border-emerald-500/15">
          {bars.map((height, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-emerald-600 to-teal-300 transition-all duration-300 group-hover:opacity-100 opacity-80"
              style={{
                height: `${height}px`,
                animation: "pulse 1.8s ease-in-out infinite",
                animationDelay: `${i * 90}ms`,
              }}
            />
          ))}
        </div>

        {/* Audio Scrubber */}
        <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground">
          <span>01:14</span>
          <div className="h-1 flex-1 mx-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-emerald-500 rounded-full" />
          </div>
          <span>02:30</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Graphic for Image Editor
 */
export function ImageEditorGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-48 sm:h-52 w-full overflow-hidden select-none flex items-center justify-center p-4",
        "bg-gradient-to-br from-blue-500/15 via-background to-card",
        className
      )}
    >
      <div className="absolute -bottom-10 -right-10 size-36 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Split Screen Before / After Canvas */}
      <div className="relative w-full max-w-72 sm:max-w-80 rounded-xl overflow-hidden border border-blue-500/30 bg-card shadow-lg shadow-blue-500/5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-background/90 border-b border-border text-[10px]">
          <div className="flex items-center gap-1.5 text-blue-500 font-semibold">
            <Wand2 className="size-3" />
            <span>Smart Inpaint & Erase</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-500 text-[9px] font-bold">
            1-Click Magic
          </span>
        </div>

        {/* Split comparison viewport */}
        <div className="relative h-26 sm:h-28 flex">
          {/* Left side: Transparent background pattern */}
          <div className="w-1/2 h-full bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] dark:bg-[linear-gradient(45deg,#222_25%,transparent_25%),linear-gradient(-45deg,#222_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#222_75%),linear-gradient(-45deg,transparent_75%,#222_75%)] [background-size:8px_8px] flex items-center justify-center p-2 border-r border-blue-500/40 relative">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white/90">
              Clean Cutout
            </span>
          </div>

          {/* Right side: Original scene with bounding box */}
          <div className="w-1/2 h-full bg-gradient-to-tr from-blue-950 via-slate-900 to-indigo-900 flex items-center justify-center p-2 relative">
            <div className="border border-dashed border-blue-400 bg-blue-400/10 rounded p-1.5 text-center">
              <span className="text-[8px] text-blue-300 font-mono block">AI Select</span>
              <span className="text-[9px] text-white font-medium">Remove Object</span>
            </div>
          </div>

          {/* Central Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/50">
            <Sliders className="size-3" />
          </div>
        </div>

        {/* Action tags bottom */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-muted/40 text-[9px] text-muted-foreground">
          <span>Remove BG</span>
          <span>•</span>
          <span>Generative Fill</span>
          <span>•</span>
          <span>Super Resolution</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 5. Graphic for Audio Transcription
 */
export function AudioTranscriptionGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-48 sm:h-52 w-full overflow-hidden select-none flex items-center justify-center p-4",
        "bg-gradient-to-br from-amber-500/15 via-background to-card",
        className
      )}
    >
      <div className="absolute -top-10 -left-10 size-36 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Main Transcription Preview Card */}
      <div className="relative w-full max-w-72 sm:max-w-80 rounded-xl bg-card/90 backdrop-blur-md border border-amber-500/30 p-3 shadow-lg shadow-amber-500/5 transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Header: File info & accuracy */}
        <div className="flex items-center justify-between pb-2 border-b border-border/50">
          <div className="flex items-center gap-1.5">
            <FileAudio className="size-3.5 text-amber-500" />
            <span className="text-[11px] font-bold text-foreground truncate max-w-36">
              Interview_Arabic.mp3
            </span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[9px] font-bold flex items-center gap-1">
            <CheckCircle2 className="size-2.5" />
            99.8% Accuracy
          </span>
        </div>

        {/* Speech-to-text transcript dialogue bubble */}
        <div className="my-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[9px] text-muted-foreground font-mono">
            <span className="text-amber-500 font-bold">Speaker 01</span>
            <span>00:03 - 00:09</span>
          </div>
          <div className="rounded-lg bg-amber-500/5 border border-amber-500/15 p-2 text-[10px] leading-relaxed text-foreground/90">
            &quot;...يسرنا اليوم إطلاق حزمة ميزات الذكاء الاصطناعي الأسرع لإنتاج المحتوى...&quot;
          </div>
        </div>

        {/* Export badges */}
        <div className="flex items-center justify-between pt-1 text-[9px] text-muted-foreground">
          <span className="text-xs font-semibold text-foreground">Whisper Pro Engine</span>
          <div className="flex items-center gap-1 font-mono text-[9px]">
            <span className="px-1 py-0.5 rounded bg-muted">SRT</span>
            <span className="px-1 py-0.5 rounded bg-muted">VTT</span>
            <span className="px-1 py-0.5 rounded bg-muted">TXT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper to render the appropriate graphic component
 */
export function MediaCardGraphic({ type }: { type: MediaToolId }) {
  switch (type) {
    case "generate-image":
      return <GenerateImageGraphic />;
    case "generate-video":
      return <GenerateVideoGraphic />;
    case "text-to-speech":
      return <TextToSpeechGraphic />;
    case "image-editor":
      return <ImageEditorGraphic />;
    case "audio-transcription":
      return <AudioTranscriptionGraphic />;
    default:
      return null;
  }
}


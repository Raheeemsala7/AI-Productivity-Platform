"use client";

import React from "react";
import { Check, Loader2, Mic, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatDuration } from "../../constant/chat.attachment";

interface VoiceTranscribeBarProps {
  isRecording: boolean;
  isTranscribing: boolean;
  seconds: number;
  onStop: () => void;
  onCancel: () => void;
}

export default function VoiceTranscribeBar({
  isRecording,
  isTranscribing,
  seconds,
  onStop,
  onCancel,
}: VoiceTranscribeBarProps) {
  return (
    <div className="flex w-full min-h-[44px] items-center justify-between gap-2.5 rounded-2xl bg-muted/70 px-3 py-2 text-foreground animate-in fade-in-50 zoom-in-95 duration-200">
      {/* Left / Start: Indicator and Timer */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div
          className={cn(
            "flex size-7 sm:size-8 items-center justify-center rounded-full transition-colors",
            isTranscribing
              ? "bg-brand/10 text-brand"
              : "bg-red-500/15 text-red-500 animate-pulse",
          )}
        >
          {isTranscribing ? (
            <Loader2 className="size-4 animate-spin text-brand" />
          ) : (
            <Mic className="size-4" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-foreground">
            {isTranscribing ? "تحويل الصوت إلى نص..." : "جارٍ الاستماع..."}
          </span>
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {isTranscribing ? "يرجى الانتظار" : formatDuration(seconds)}
          </span>
        </div>
      </div>

      {/* Middle: Sound Waveform Equalizer (GPT-style) */}
      <div className="flex flex-1 items-center justify-center gap-1 px-2 overflow-hidden max-w-[140px] xs:max-w-[200px] sm:max-w-xs">
        {isTranscribing ? (
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-brand animate-bounce [animation-delay:-0.3s]" />
            <span className="size-1.5 rounded-full bg-brand animate-bounce [animation-delay:-0.15s]" />
            <span className="size-1.5 rounded-full bg-brand animate-bounce" />
          </div>
        ) : (
          <div className="flex items-center gap-1 h-5">
            {[40, 75, 55, 90, 65, 100, 80, 50, 85, 60, 95, 45].map((height, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-brand/80 dark:bg-brand transition-all"
                style={{
                  height: `${height}%`,
                  animation: `equalizer 1.2s ease-in-out infinite alternate`,
                  animationDelay: `${(i % 5) * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right / End: Actions (Cancel, Done) */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Cancel button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={isTranscribing}
          aria-label="إلغاء التسجيل"
          title="إلغاء"
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-2xs transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 disabled:opacity-40"
        >
          <X className="size-4" />
        </button>

        {/* Done / Stop button */}
        <button
          type="button"
          onClick={onStop}
          disabled={isTranscribing || !isRecording}
          aria-label="إنهاء وتحويل إلى نص"
          title="إنهاء وتحويل لنص"
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full text-white shadow-xs transition-transform active:scale-95 disabled:opacity-40",
            "bg-[image:var(--gradient-primary)]",
          )}
        >
          {isTranscribing ? (
            <Loader2 className="size-4 animate-spin text-white" />
          ) : (
            <Check className="size-4 stroke-[2.5]" />
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes equalizer {
          0% {
            transform: scaleY(0.3);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}

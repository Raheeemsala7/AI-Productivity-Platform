"use client";

import { Loader2, Pause, Play, TriangleAlert } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { formatDuration } from "../constant/chat.attachment";

const BAR_COUNT = 28;
const PLACEHOLDER_PEAKS = Array.from(
  { length: BAR_COUNT },
  (_, index) => 0.35 + ((index * 7) % 10) / 20,
);

type VoiceMessagePlayerProps = {
  url: string;
  /** Duration in seconds known at send time (used until metadata loads) */
  duration?: number;
  type?: string;
};

export default function VoiceMessagePlayer({
  url,
  duration: fallbackDuration,
  type = "audio/webm",
}: VoiceMessagePlayerProps) {
  const t = useTranslations("Chat");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration ?? 0);
  const [peaks, setPeaks] = useState<number[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const AudioCtor =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    (async () => {
      try {
        if (!AudioCtor) throw new Error("AudioContext unsupported");
        const ctx = new AudioCtor();

        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to load audio");
          const arrayBuffer = await res.arrayBuffer();
          const decoded = await ctx.decodeAudioData(arrayBuffer);
          if (!cancelled) {
            setPeaks(computePeaks(decoded, BAR_COUNT));
          }
        } finally {
          if (!cancelled) {
            void ctx.close().catch(() => {});
          }
        }
      } catch {
        if (!cancelled) setHasError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url]);

  const isLoading = peaks === null && !hasError;

  const progress =
    duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  const displaySeconds =
    playing || currentTime > 0
      ? Math.min(currentTime, duration || currentTime)
      : duration;

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;

    if (el.paused) {
      void el.play().catch(() => setHasError(true));
    } else {
      el.pause();
    }
  }, []);

  return (
    <div
      dir="ltr"
      className={cn(
        "flex w-60 items-center gap-2.5 rounded-2xl rounded-tr-sm bg-brand px-3 py-2 text-brand-foreground sm:w-72",
        hasError && "opacity-80",
      )}
    >
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        className="hidden"
        onLoadedMetadata={(e) => {
          const value = e.currentTarget.duration;
          if (Number.isFinite(value)) setDuration(value);
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => {
          setPlaying(false);
          setCurrentTime(0);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setHasError(true)}
      >
        <source src={url} type={type} />
      </audio>

      <button
        type="button"
        aria-label={playing ? t("pause") : t("play")}
        aria-pressed={playing}
        disabled={!isLoading && hasError}
        onClick={togglePlay}
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-foreground text-brand shadow-sm transition-all duration-200",
          "hover:scale-105 active:scale-95",
          "disabled:cursor-default",
          hasError && !isLoading && "bg-brand-foreground/50",
        )}
      >
        {isLoading ? (
          <Loader2 size={15} className="animate-spin" />
        ) : hasError ? (
          <TriangleAlert size={15} />
        ) : playing ? (
          <Pause size={15} fill="currentColor" />
        ) : (
          <Play size={15} className="translate-x-[1px]" fill="currentColor" />
        )}
      </button>

      <div className="relative h-8 min-w-0 flex-1">
        {isLoading ? (
          <WaveformBars
            peaks={PLACEHOLDER_PEAKS}
            className="animate-pulse text-brand-foreground/30"
          />
        ) : (
          <>
            <WaveformBars
              peaks={peaks ?? []}
              className="text-brand-foreground/30"
            />

            <div
              className="absolute inset-y-0 left-0 overflow-hidden transition-[width] duration-150 ease-linear"
              style={{ width: `${progress * 100}%` }}
            >
              <WaveformBars peaks={peaks ?? []} className="text-brand-foreground" />
            </div>
          </>
        )}
      </div>

      <span className="shrink-0 text-[11px] font-medium tabular-nums tracking-tight opacity-90">
        {formatDuration(isLoading ? (fallbackDuration ?? 0) : displaySeconds)}
      </span>
    </div>
  );
}

function WaveformBars({
  peaks,
  className,
}: {
  peaks: number[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-x-0 flex h-8 items-center gap-[2.5px]",
        className,
      )}
    >
      {peaks.map((peak, index) => (
        <span
          key={index}
          className="w-[3px] shrink-0 rounded-full bg-current"
          style={{ height: `${Math.max(16, Math.round(peak * 100))}%` }}
        />
      ))}
    </div>
  );
}

function computePeaks(buffer: AudioBuffer, bars: number): number[] {
  const data = buffer.getChannelData(0);
  const samplesPerBar = Math.max(1, Math.floor(data.length / bars));
  const peaks: number[] = [];

  for (let i = 0; i < bars; i++) {
    let max = 0;
    const start = i * samplesPerBar;
    const end = Math.min(start + samplesPerBar, data.length);
    for (let j = start; j < end; j++) {
      const value = Math.abs(data[j]);
      if (value > max) max = value;
    }
    // Slight boost for quieter recordings, with a minimum for visibility.
    peaks.push(Math.min(1, Math.max(0.16, max * 1.5)));
  }

  return peaks;
}
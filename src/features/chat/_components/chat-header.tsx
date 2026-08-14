"use client";

import { ThemeToggle } from "@/shared/components/theme-toggle";
import { cn } from "@/shared/lib/utils";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";

type ChatHeaderProps = {
  hasMessages: boolean;
  onClear: () => void;
};

const iconButtonClass =
  "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export default function ChatHeader({
  hasMessages,
  onClear,
}: ChatHeaderProps) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Go back" className={iconButtonClass}>
          <ArrowLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-white shadow-sm">
            <Sparkles size={14} />
          </div>

          <div className="leading-tight">
            <p className="font-display text-[15px] font-medium text-foreground">
              ORICO AI
            </p>
            <p className="text-[10.5px] uppercase tracking-widest text-muted-foreground">
              Business Planning Assistant
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onClear}
          disabled={!hasMessages}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          <RotateCcw size={13} />
          New conversation
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
}

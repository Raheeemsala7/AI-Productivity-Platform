import { cn } from "@/shared/lib/utils";
import { Sparkles } from "lucide-react";
import { SUGGESTIONS } from "../constant/chat.constant";

type EmptyStateProps = {
  onPick: (text: string) => void;
};

export default function EmptyState({ onPick }: EmptyStateProps) {
  return (
    <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-white shadow-sm">
          <Sparkles size={18} strokeWidth={2} />
        </div>

        <h2 className="font-display text-2xl font-medium text-foreground">
          What are we building today?
        </h2>

        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Bring an idea, a napkin sketch, or a half-finished deck — ORICO helps
          you shape it into something investors can read.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onPick(suggestion)}
            className={cn(
              "rounded-xl border border-border bg-card px-4 py-3 text-left text-sm leading-snug text-muted-foreground transition-colors",
              "hover:border-brand/40 hover:bg-muted/60 hover:text-foreground",
            )}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

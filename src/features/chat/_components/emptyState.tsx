import { cn } from "@/shared/lib/utils";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

type EmptyStateProps = {
  onPick?: (suggestion: string) => void;
};

export default function EmptyState({ onPick }: EmptyStateProps) {
  const t = useTranslations("Chat.emptyState");

  // Define keys for suggestions
  const suggestionKeys = ["s1", "s2", "s3", "s4"] as const;

  return (
    <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-white shadow-sm">
          <Sparkles size={18} strokeWidth={2} />
        </div>

        <h2 className="font-display text-2xl font-medium text-foreground">
          {t("title")}
        </h2>

        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {suggestionKeys.map((key) => {
          const suggestion = t(`suggestions.${key}`);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onPick?.(suggestion)}
              className={cn(
                "cursor-pointer rounded-xl border border-border bg-card px-4 py-3 text-left text-sm leading-snug text-muted-foreground transition-all",
                "hover:border-brand/40 hover:bg-muted/60 hover:text-foreground active:scale-[0.99]",
              )}
            >
              {suggestion}
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/shared/lib/utils";
import { ArrowUp, Paperclip, Square } from "lucide-react";
import { type KeyboardEvent, type RefObject } from "react";

type ChatInputProps = {
  input: string;
  busy: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export default function ChatInput({
  input,
  busy,
  textareaRef,
  onChange,
  onSubmit,
  onKeyDown,
}: ChatInputProps) {
  const canSend = input.trim().length > 0 || busy;

  return (
    <div className="shrink-0 border-t border-border px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-2xl">
        <div
          className={cn(
            "flex items-end gap-2 rounded-2xl border border-border bg-muted/50 px-3 py-2 transition-colors",
            "focus-within:border-brand/50 focus-within:ring-1 focus-within:ring-brand/20",
          )}
        >
          <button
            type="button"
            aria-label="Attach file"
            className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Paperclip size={15} />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Describe your business idea or ask anything…"
            className="field-sizing-content max-h-32 min-h-7 flex-1 resize-none bg-transparent py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />

          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSend}
            aria-label={busy ? "Stop" : "Send"}
            className={cn(
              "mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
              "bg-[image:var(--gradient-primary)] text-white shadow-sm",
              "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",
            )}
          >
            {busy ? (
              <Square size={13} fill="currentColor" />
            ) : (
              <ArrowUp size={16} />
            )}
          </button>
        </div>

        <p className="mt-2 text-center text-[10.5px] text-muted-foreground">
          ORICO AI focuses on business planning. Verify financial figures before
          sharing with investors.
        </p>
      </div>
    </div>
  );
}

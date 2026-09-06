"use client";

import { cn } from "@/shared/lib/utils";
import { ArrowUp, Paperclip, Square } from "lucide-react";
import { useTranslations } from "next-intl";
import { type KeyboardEvent, type RefObject } from "react";
import { sendMessageMutation } from "../hooks/use-chat-history";

type ChatInputProps = {
  input: string;
  busy: boolean;
  placeholder?: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export default function ChatInput({
  input,
  busy,
  placeholder,
  textareaRef,
  onChange,
  onSubmit,
  onKeyDown,
}: ChatInputProps) {
  const t = useTranslations("Chat");
  const canSend = input.trim().length > 0 || busy;
  const { mutateAsync } = sendMessageMutation();

const handleSubmit = async () => {
  console.log("HANDLE SUBMIT");
  console.log("HANDLE SUBMIT");
  console.log("HANDLE SUBMIT");
  console.log("HANDLE SUBMIT");
  console.log("HANDLE SUBMIT");
  
    try {
        const result = await mutateAsync("djdj")

        console.log("CLIENT RESULT:", result)
    } catch (error) {
        console.error("SEND MESSAGE ERROR:", error)
    }
}

  return (
    <div className="shrink-0 border-t border-border bg-background px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-2xl">
        <div
          className={cn(
            "flex items-end gap-2 rounded-2xl border border-border bg-muted/50 px-3 py-2 transition-colors",
            "focus-within:border-brand/50 focus-within:ring-1 focus-within:ring-brand/20",
          )}
        >
          <button
            type="button"
            aria-label={t("attachFile")}
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
            placeholder={placeholder ?? t("inputPlaceholder")}
            className="field-sizing-content max-h-32 min-h-7 flex-1 resize-none bg-transparent py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />

          <button
            type="button"
            onClick={handleSubmit}
            // disabled={!canSend}
            aria-label={busy ? t("stop") : t("send")}
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
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { ArrowUp, Square } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

interface ChatSubmitButtonProps {
  isBusy: boolean;
  isStreaming: boolean;
  canSend: boolean;
  onStop: () => void;
}

export default function ChatSubmitButton({
  isBusy,
  isStreaming,
  canSend,
  onStop,
}: ChatSubmitButtonProps) {
  const t = useTranslations("Chat");

  return (
    <button
      type={isStreaming ? "button" : "submit"}
      onClick={isStreaming ? onStop : undefined}
      disabled={!canSend && !isStreaming}
      aria-label={isBusy ? t("stop") : t("send")}
      className={cn(
        "mb-0.5 flex size-9 shrink-0 items-center justify-center rounded-full transition-all",
        "bg-[image:var(--gradient-primary)] text-white shadow-sm",
        "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",
        "md:size-8",
      )}
    >
      {isBusy ? (
        <Square size={13} fill="currentColor" />
      ) : (
        <ArrowUp size={16} />
      )}
    </button>
  );
}

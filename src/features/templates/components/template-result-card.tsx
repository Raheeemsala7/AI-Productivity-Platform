"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Copy,
  Check,
  Edit3,
  ChevronDown,
  ChevronUp,
  FastForward,
  Sparkles,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import Markdown from "@/shared/components/ui/markdown";
import { cn } from "@/shared/lib/utils";
import { GeneratedResultItem } from "../types/template";
import { getTextDirection } from "@/shared/lib/text-direction";

interface TemplateResultCardProps {
  result: GeneratedResultItem;
  onToggleCollapse: (id: string) => void;
  onEdit: (id: string) => void;
  onAnimationComplete: (id: string) => void;
}

export function TemplateResultCard({
  result,
  onToggleCollapse,
  onEdit,
  onAnimationComplete,
}: TemplateResultCardProps) {
  const t = useTranslations("TemplateDetails");

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const shouldAnimate = Boolean(result.isNewlyGenerated && !prefersReducedMotion);
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState(() =>
    shouldAnimate ? "" : result.content
  );
  const [isAnimating, setIsAnimating] = useState(shouldAnimate);

  const animFrameRef = useRef<number | null>(null);

  // Detect text direction
  const direction = useMemo(
    () => getTextDirection(result.content),
    [result.content]
  );

  // Progressive text-reveal effect for newly generated results
  useEffect(() => {
    if (!shouldAnimate) return;

    const fullText = result.content;
    let currentIndex = 0;
    const totalLength = fullText.length;

    // Determine chunk size for smooth completion
    // Short outputs (< 300 chars): 2 chars per tick
    // Medium outputs (300-1200 chars): 5-10 chars per tick
    // Long outputs (> 1200 chars): ~20-30 chars per tick (~1.5s total)
    const chunkSize = Math.max(2, Math.ceil(totalLength / 80));

    let lastTick = performance.now();
    const interval = 16; // ~60fps

    const step = (now: number) => {
      if (now - lastTick >= interval) {
        lastTick = now;
        currentIndex = Math.min(currentIndex + chunkSize, totalLength);
        setDisplayedText(fullText.slice(0, currentIndex));
      }

      if (currentIndex < totalLength) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
        onAnimationComplete(result.id);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [result.id, result.content, shouldAnimate, onAnimationComplete]);

  // Fast-forward / Skip animation
  const handleSkipAnimation = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setDisplayedText(result.content);
    setIsAnimating(false);
    onAnimationComplete(result.id);
  }, [result.content, result.id, onAnimationComplete]);

  // Copy complete text (always complete, never partial)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      toast.success(t("copyResultSuccess"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("copyResultError"));
    }
  };

  // Format creation timestamp
  const formattedTime = useMemo(() => {
    try {
      const date = new Date(result.createdAt);
      return new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(date);
    } catch {
      return "";
    }
  }, [result.createdAt]);

  return (
    <article
      aria-labelledby={`result-heading-${result.id}`}
      className={cn(
        "group relative flex flex-col rounded-3xl border border-border/80 bg-card/80 shadow-xs backdrop-blur-md transition-all duration-200",
        result.isNewlyGenerated &&
          "ring-2 ring-brand/30 animate-in fade-in-50 slide-in-from-top-3 duration-300"
      )}
    >
      {/* Header Toolbar */}
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border/40">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Sparkles className="size-4" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4
                id={`result-heading-${result.id}`}
                className="text-sm font-bold text-foreground"
              >
                {t("resultNumber", { number: result.generationNumber })}
              </h4>

              {isAnimating && (
                <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand animate-pulse">
                  {t("generating")}
                </span>
              )}
            </div>

            {formattedTime && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="size-3" />
                <time dateTime={result.createdAt}>{formattedTime}</time>
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 ms-auto">
          {/* Skip animation button if currently running */}
          {isAnimating && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleSkipAnimation}
              title={t("skipAnimation")}
              className="h-8 gap-1 rounded-full px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <FastForward className="size-3.5" />
              <span className="hidden sm:inline">{t("skipAnimation")}</span>
            </Button>
          )}

          {/* Copy Button (Copies complete content) */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            title={t("copyResult")}
            aria-label={t("copyResult")}
            className="h-8 gap-1.5 rounded-full px-3 text-xs cursor-pointer hover:bg-muted/80 transition-colors"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-medium">{t("copied")}</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-muted-foreground" />
                <span className="hidden sm:inline">{t("copyResult")}</span>
              </>
            )}
          </Button>

          {/* Edit Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit(result.id)}
            title={t("editResult")}
            aria-label={t("editResult")}
            className="h-8 gap-1.5 rounded-full px-3 text-xs cursor-pointer hover:bg-muted/80 transition-colors"
          >
            <Edit3 className="size-3.5 text-muted-foreground" />
            <span className="hidden sm:inline">{t("editResult")}</span>
          </Button>

          {/* Expand/Collapse Toggle Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onToggleCollapse(result.id)}
            aria-expanded={!result.isCollapsed}
            aria-controls={`result-body-${result.id}`}
            title={result.isCollapsed ? t("expand") : t("collapse")}
            aria-label={result.isCollapsed ? t("expand") : t("collapse")}
            className="size-8 p-0 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {result.isCollapsed ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronUp className="size-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Content Area */}
      {!result.isCollapsed ? (
        <div
          id={`result-body-${result.id}`}
          dir={direction}
          className="p-5 sm:p-7 text-foreground leading-relaxed transition-all"
        >
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Markdown
              content={isAnimating ? displayedText : result.content}
              className="text-sm sm:text-base leading-relaxed tracking-normal"
            />
          </div>
        </div>
      ) : (
        <div
          id={`result-body-${result.id}`}
          onClick={() => onToggleCollapse(result.id)}
          className="cursor-pointer px-5 py-3 text-xs text-muted-foreground line-clamp-1 hover:text-foreground transition-colors"
        >
          {result.content.replace(/[#*`_~>-]/g, "").slice(0, 140)}...
        </div>
      )}
    </article>
  );
}

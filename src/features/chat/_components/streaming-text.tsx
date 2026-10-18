"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "@/shared/components/ui/markdown";

type StreamingTextProps = {
  content: string;
  isStreaming?: boolean;
  onDone?: () => void;
};

function getTypingDelay(token: string, totalTokens: number): number {
  // Base delay per word: ~68ms creates a natural, human-like typing cadence
  const base = totalTokens > 200 ? 45 : totalTokens > 100 ? 55 : 68;

  // Natural rhythmic pauses at punctuation and paragraphs
  if (token.includes("\n")) {
    return base + 200; // paragraph / line break pause
  }
  if (/[.!؟?][\s]*$/.test(token)) {
    return base + 240; // end of sentence pause
  }
  if (/[,،:;][\s]*$/.test(token)) {
    return base + 140; // comma / pause
  }
  return base;
}

export default function StreamingText({
  content,
  isStreaming = false,
  onDone,
}: StreamingTextProps) {
  // If not streaming (e.g. historical messages), display full text immediately
  const [displayedText, setDisplayedText] = useState(isStreaming ? "" : content);
  const [isTyping, setIsTyping] = useState(isStreaming);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // If not streaming or content is empty, show full content directly
    if (!isStreaming || !content) {
      setDisplayedText(content);
      setIsTyping(false);
      return;
    }

    // Split text into words/tokens (words with trailing spaces, punctuation, or whitespace/newlines)
    const tokens = content.match(/\S+\s*|\s+/g) || [content];
    const totalTokens = tokens.length;

    let currentIndex = 0;
    let accumulatedText = "";
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isCancelled = false;

    setIsTyping(true);

    const typeNext = () => {
      if (isCancelled) return;

      if (currentIndex >= tokens.length) {
        setDisplayedText(content);
        setIsTyping(false);
        onDoneRef.current?.();
        return;
      }

      accumulatedText += tokens[currentIndex];
      const token = tokens[currentIndex];
      currentIndex++;

      setDisplayedText(accumulatedText);

      // Smoothly keep chat scrolled to the bottom as each word appears
      const container = document.querySelector('[data-slot="chat-messages-container"]');
      if (container) {
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 400;
        if (isNearBottom) {
          container.scrollTop = container.scrollHeight;
        }
      }

      if (currentIndex >= tokens.length) {
        setIsTyping(false);
        onDoneRef.current?.();
        return;
      }

      const delay = getTypingDelay(token, totalTokens);
      timeoutId = setTimeout(typeNext, delay);
    };

    typeNext();

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [content, isStreaming]);

  return (
    <div className="relative">
      <Markdown content={displayedText} />
      {isTyping && (
        <span
          aria-hidden="true"
          className="inline-block h-3.5 w-1.5 ms-1 bg-brand animate-pulse align-middle rounded-xs"
        />
      )}
    </div>
  );
}

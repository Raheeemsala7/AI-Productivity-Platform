"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  autoResize?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      autoResize = true,
      minHeight = 110,
      maxHeight = 420,
      onChange,
      value,
      defaultValue,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Merge forwardedRef and internal ref
    const setRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    // Adjust height based on content
    const adjustHeight = React.useCallback(() => {
      const textarea = innerRef.current;
      if (!textarea || !autoResize) return;

      // Temporarily set height to 'auto' to get accurate scrollHeight when shrinking
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;

      if (scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto";
      } else {
        const targetHeight = Math.max(scrollHeight, minHeight);
        textarea.style.height = `${targetHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    }, [autoResize, minHeight, maxHeight]);

    // Recalculate on value or defaultValue changes
    React.useLayoutEffect(() => {
      adjustHeight();
    }, [value, defaultValue, adjustHeight]);

    // Handle input / paste / delete changes
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        adjustHeight();
      }
      onChange?.(e);
    };

    return (
      <textarea
        ref={setRef}
        data-slot="textarea"
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        style={{
          minHeight: `${minHeight}px`,
          maxHeight: `${maxHeight}px`,
        }}
        className={cn(
          "w-full rounded-2xl border border-transparent bg-input/50 px-3.5 py-3 text-base leading-relaxed text-foreground transition-[color,box-shadow,background-color] outline-none placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          autoResize ? "resize-none overflow-y-hidden" : "resize-y",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

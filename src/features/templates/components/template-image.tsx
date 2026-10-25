"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface TemplateImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function TemplateImage({
  src,
  alt,
  className,
  containerClassName,
}: TemplateImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const cleanSrc = src?.trim();
  const shouldRenderImage = cleanSrc && !hasError;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl bg-muted/40 border border-border/40 shrink-0",
        containerClassName
      )}
    >
      {shouldRenderImage ? (
        <>
          {/* Subtle pulse placeholder until loaded */}
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted/70 rounded-xl" />
          )}
          <Image
            src={cleanSrc}
            alt={alt || "Template logo"}
            fill
            sizes="(max-width: 768px) 48px, 56px"
            unoptimized
            className={cn(
              "object-contain p-2 transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        </>
      ) : (
        /* Fallback icon when no image or loading failed */
        <div className="flex h-full w-full items-center justify-center bg-brand/10 text-brand transition-colors">
          <Sparkles className="size-6 text-brand" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

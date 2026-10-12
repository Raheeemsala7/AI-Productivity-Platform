"use client";

import { LanguageToggle } from "./language-toggle";

type LocaleSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export function LocaleSwitcher({
  className,
  compact = false,
}: LocaleSwitcherProps) {
  return <LanguageToggle className={className} showLabel={!compact} />;
}
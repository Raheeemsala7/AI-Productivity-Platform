"use client";

import { LanguageToggle } from "@/shared/components/language-toggle";

export const ChangeLanguage = ({ className }: { className?: string }) => {
  return <LanguageToggle className={className} />;
};

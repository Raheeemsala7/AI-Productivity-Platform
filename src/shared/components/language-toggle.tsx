"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Languages } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface LanguageToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function LanguageToggle({
  className,
  showLabel = true,
}: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "ar" : "en";
  const nextLocaleLabel = locale === "en" ? "العربية" : "English";

  const toggleLanguage = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        "group relative inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card/60 px-3 text-xs font-semibold text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95 cursor-pointer shadow-sm select-none",
        className
      )}
      aria-label={
        locale === "en"
          ? "Switch to Arabic language"
          : "التبديل إلى اللغة الإنجليزية"
      }
      title={
        locale === "en"
          ? "Switch to Arabic"
          : "التبديل إلى اللغة الإنجليزية"
      }
    >
      <Languages className="size-4 shrink-0 transition-transform duration-200 group-hover:rotate-12 text-brand" />
      {showLabel && (
        <span className="font-medium tracking-tight">
          {nextLocaleLabel}
        </span>
      )}
    </button>
  );
}

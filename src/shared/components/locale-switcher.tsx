"use client";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export function LocaleSwitcher({
  className,
  compact = false,
}: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");
  const valueText = locale === "en" ? "ar" : "en";

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";

    router.replace(pathname, {
      locale: nextLocale,
    });
  };

  // Compact version: EN / AR toggle
  if (compact) {
    return (
      <button
        type="button"
        onClick={switchLocale}
        className={cn(
          "inline-flex h-9 min-w-9 items-center justify-center rounded-lg",
          "border border-border bg-card/40 px-2.5 text-xs font-medium",
          "text-muted-foreground transition-all duration-200",
          "hover:bg-muted hover:text-foreground",
          "active:scale-95",
          className,
        )}
        aria-label={
          locale === "en"
            ? "Switch to Arabic"
            : "Switch to English"
        }
      >
        {valueText.toUpperCase()}
      </button>
    );
  }

  // Full version
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-border bg-card/40 p-1 text-xs",
        className,
      )}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() =>
            router.replace(pathname, {
              locale: loc,
            })
          }
          className={cn(
            "rounded-md px-2.5 py-1 transition",
            locale === loc
              ? "bg-surface text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
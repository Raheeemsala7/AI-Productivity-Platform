"use client";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");

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
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "px-2.5 py-1 rounded-md transition",
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

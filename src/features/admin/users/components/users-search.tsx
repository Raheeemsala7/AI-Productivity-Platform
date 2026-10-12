"use client";

import { useTransition, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Search, Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";

export function UsersSearch() {
  const t = useTranslations("AdminUsers");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";
  const [value, setValue] = useState(currentSearch);

  // Sync internal state if URL search param changes externally (e.g. back/forward navigation)
  useEffect(() => {
    setValue(currentSearch);
  }, [currentSearch]);

  // Debounced URL update
  useEffect(() => {
    // If the value is the same as currentSearch in the URL, do nothing
    if (value === currentSearch) return;

    const timer = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
          params.set("search", value.trim());
        } else {
          params.delete("search");
        }
        // Always reset to page 1 on new search
        params.delete("page");

        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname);
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [value, currentSearch, pathname, router, searchParams]);

  const handleClear = () => {
    setValue("");
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      params.delete("page");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    });
  };

  return (
    <div className="relative flex items-center max-w-sm w-full border rounded-md px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 transition-all">
      {isPending ? (
        <Loader2 className="h-4 w-4 text-muted-foreground animate-spin shrink-0" />
      ) : (
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="flex-1 bg-transparent border-none outline-none text-sm px-2 placeholder:text-muted-foreground"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-sm"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

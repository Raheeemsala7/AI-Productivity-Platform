"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/shared/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function PlansSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("AdminPlans");

  const currentSearch = searchParams.get("search") || "";

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term.trim()) {
      params.set("search", term.trim());
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, 400);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3 pointer-events-none" />
      <Input
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={t("searchPlaceholder") || "Search plans..."}
        className="pl-9 rtl:pl-3 rtl:pr-9 h-9"
      />
      {isPending && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground rtl:right-auto rtl:left-3" />
      )}
    </div>
  );
}

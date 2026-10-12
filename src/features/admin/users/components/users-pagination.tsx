"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { IMetadata } from "@/shared/types/api";

interface UsersPaginationProps {
  pagination: IMetadata;
}

export function UsersPagination({ pagination }: UsersPaginationProps) {
  const t = useTranslations("AdminUsers");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { current_page, last_page, per_page, total } = pagination;

  // Don't render pagination if there are no items or only 1 page with 0 items
  if (total <= 0) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > last_page || newPage === current_page) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newPage === 1) {
        params.delete("page");
      } else {
        params.set("page", newPage.toString());
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    });
  };

  const from = total > 0 ? (current_page - 1) * per_page + 1 : 0;
  const to = Math.min(current_page * per_page, total);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (last_page <= maxVisible) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      const start = Math.max(2, current_page - 1);
      const end = Math.min(last_page - 1, current_page + 1);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < last_page - 1) pages.push("...");
      pages.push(last_page);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t">
      <div className="text-sm text-muted-foreground">
        {t("pagination.showing", { from, to, total })}
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(current_page - 1)}
          disabled={current_page <= 1 || isPending}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          <span className="hidden sm:inline">{t("pagination.previous")}</span>
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) =>
            typeof page === "number" ? (
              <Button
                key={idx}
                variant={page === current_page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                disabled={isPending}
                className="h-8 w-8 p-0 text-xs"
              >
                {page}
              </Button>
            ) : (
              <span key={idx} className="px-2 text-sm text-muted-foreground select-none">
                {page}
              </span>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(current_page + 1)}
          disabled={current_page >= last_page || isPending}
          className="gap-1"
        >
          <span className="hidden sm:inline">{t("pagination.next")}</span>
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
        </Button>

        {isPending && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground ml-2" />
        )}
      </div>
    </div>
  );
}

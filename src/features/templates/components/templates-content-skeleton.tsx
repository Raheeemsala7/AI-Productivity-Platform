import React from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function TemplatesContentSkeleton() {
  return (
    <div className="mt-6 space-y-6">
      {/* Category Pills Skeleton */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="h-9 w-28 rounded-full shrink-0"
          />
        ))}
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-card/40 border border-border/40"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <Skeleton className="size-13 rounded-2xl" />
                <Skeleton className="size-8 rounded-full" />
              </div>
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-full rounded-md" />
                <Skeleton className="h-3.5 w-4/5 rounded-md" />
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-border/40 flex justify-between">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

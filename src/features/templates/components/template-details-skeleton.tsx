import React from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function TemplateDetailsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6 sm:px-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 pb-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48 rounded" />
          <Skeleton className="h-4 w-28 rounded" />
        </div>
        <div className="flex items-start gap-4 pt-2">
          <Skeleton className="size-16 rounded-2xl shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-7 w-64 rounded-md" />
            <Skeleton className="h-4 w-full max-w-xl rounded-md" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form Skeleton */}
        <div className="lg:col-span-7 flex flex-col gap-5 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-6">
          <Skeleton className="h-5 w-36 rounded" />
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-28 w-full rounded-2xl" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-10 w-full rounded-2xl" />
            </div>
          </div>
          <Skeleton className="h-10 w-36 rounded-full mt-2" />
        </div>

        {/* Right Output Skeleton */}
        <div className="lg:col-span-5 flex flex-col gap-4 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-6 min-h-72">
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="h-4 w-48 rounded" />
          <Skeleton className="h-40 w-full rounded-xl mt-4" />
        </div>
      </div>
    </div>
  );
}

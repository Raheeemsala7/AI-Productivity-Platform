import { Skeleton } from "@/shared/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export function SettingsSkeleton() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Hero Banner Skeleton */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <Skeleton className="size-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-16 w-52 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2 border-b border-border/80 pb-2">
        <Skeleton className="h-9 w-32 rounded-md" />
        <Skeleton className="h-9 w-36 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-32 rounded-xl" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 sm:col-span-2 rounded-md" />
              </div>
              <div className="flex justify-between pt-3">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-9 w-28 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

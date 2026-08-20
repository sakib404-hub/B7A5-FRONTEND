import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-4 w-96 max-w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 rounded-2xl border bg-card p-5 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="size-9 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-3 w-40 rounded-md" />
          </div>
        ))}
      </div>

      {/* Main Content Grid (Chart + Table / Activity) */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Left / Main Section Skeleton */}
        <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-2xs lg:col-span-4">
          <div className="flex items-center justify-between border-b pb-4">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>

        {/* Right Section Skeleton */}
        <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-2xs lg:col-span-3">
          <div className="border-b pb-4">
            <Skeleton className="h-6 w-36 rounded-md" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 border-b pb-3 last:border-0"
              >
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

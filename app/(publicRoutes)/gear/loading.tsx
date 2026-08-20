import { Skeleton } from "@/components/ui/skeleton";
import { GearCardSkeleton } from "./_components/gearCardSkeleton";

export default function GearBrowseLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <Skeleton className="h-4 w-32 mx-auto rounded-full" />
        <Skeleton className="h-10 w-3/4 mx-auto rounded-xl sm:h-12" />
        <Skeleton className="h-4 w-2/3 mx-auto rounded-md" />
      </div>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <Skeleton className="h-11 w-full max-w-md rounded-xl" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-28 rounded-xl" />
          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>
      </div>

      {/* Grid of Gear Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border bg-card p-4 space-y-4 shadow-2xs"
          >
            <GearCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
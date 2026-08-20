import { Skeleton } from "@/components/ui/skeleton";

export default function GearDetailsLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb & Title Skeleton */}
        <div className="mb-8 space-y-3">
          <Skeleton className="h-4 w-48 rounded-md" />
          <Skeleton className="h-9 w-3/4 max-w-lg rounded-lg md:h-11" />
        </div>

        {/* Two-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column - Gallery, Info, Reviews */}
          <div className="space-y-10">
            {/* Gallery Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-16/10 w-full rounded-2xl md:aspect-16/9" />
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
              </div>
            </div>

            {/* Info / Specifications Skeleton */}
            <div className="space-y-6 rounded-2xl border p-6">
              <Skeleton className="h-7 w-40 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 pt-4 border-t">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3.5 w-16" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Skeleton */}
            <div className="space-y-4 rounded-2xl border p-6">
              <Skeleton className="h-7 w-32 rounded-md" />
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2 border-b pb-3 last:border-0">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-8 rounded-full" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                    <Skeleton className="h-3.5 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card Skeleton */}
          <div>
            <div className="sticky top-24 space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>

              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-3 w-48 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

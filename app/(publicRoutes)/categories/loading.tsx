import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesLoading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20 space-y-4">
          <Skeleton className="h-4 w-32 mx-auto rounded-full" />
          <Skeleton className="h-10 w-3/4 max-w-xl mx-auto rounded-xl sm:h-12" />
          <Skeleton className="h-5 w-2/3 max-w-lg mx-auto rounded-md" />
        </div>
      </section>

      {/* Categories Grid Skeleton */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-56 rounded-md" />
          <Skeleton className="h-4 w-36 rounded-md" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="space-y-4 rounded-2xl border p-6 bg-card"
            >
              <Skeleton className="size-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-5/6" />
              </div>
              <div className="pt-2 border-t flex justify-between items-center">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

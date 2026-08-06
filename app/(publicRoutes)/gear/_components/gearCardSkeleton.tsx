import { Skeleton } from "@/components/ui/skeleton";

export function GearCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-4/3 w-full rounded-xl" />

      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
      </div>

      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}
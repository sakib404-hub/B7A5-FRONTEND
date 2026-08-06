import { GearCardSkeleton } from "./_components/gearCardSkeleton";


export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <GearCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
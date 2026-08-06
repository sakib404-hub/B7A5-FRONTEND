import { Search, SlidersHorizontal } from "lucide-react";
import { getAllGears } from "./_actions/getAllGear";
import GearCard from "./_components/gearCard";
import { Gear } from "@/types/types";

const BrowseGearPage = async () => {
  const allGears = await getAllGears();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Explore Our Collection
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Find the Gear for Your Next Adventure
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Discover quality equipment from trusted providers. Rent the gear
              you need without the hassle of buying and storing it.
            </p>
          </div>
        </div>
      </section>

      {/* Gear Section */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">
                Available Equipment
              </p>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Browse Gear
              </h2>
            </div>

            <div className="rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
              {allGears.length}{" "}
              {allGears.length === 1 ? "item" : "items"} available
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search gear by name, brand..."
              disabled
              className="h-12 w-full rounded-xl border bg-background pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>

          {/* Filter Button */}
          <button
            type="button"
            disabled
            className="flex h-12 items-center justify-center gap-2 rounded-xl border bg-background px-5 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-70"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Gear Grid */}
        {allGears.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allGears.map((gear : Gear) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed p-16 text-center">
            <h3 className="text-lg font-semibold">
              No gear available
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              There is currently no equipment available for rent.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default BrowseGearPage;

import { getAllGears } from "./_actions/getAllGear";
import { GearBrowseList } from "./_components/gearBrowseList";

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

      {/* Interactive Gear Search, Filters & Grid */}
      <GearBrowseList initialGears={allGears || []} />
    </main>
  );
};

export default BrowseGearPage;

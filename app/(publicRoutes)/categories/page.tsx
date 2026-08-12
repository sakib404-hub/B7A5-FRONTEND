import { ICategory } from "@/types/types";
import { getAllCategory } from "./_actions/getAllCategory";
import CategoryCard from "./_components/categoryCard";

const CategoriesPage = async () => {
  const categoriesWithResponse = await getAllCategory();
  const categories = categoriesWithResponse.data;
  
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Explore Categories
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Find the Right Gear for Your Adventure
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Explore our wide range of outdoor, sports, and adventure gear.
            Choose a category and discover equipment available for rent.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Browse Categories
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {categories.length} categories available
            </p>
          </div>
        </div>

        {categories.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category : ICategory) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <h3 className="text-lg font-semibold">
              No categories available
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Categories will appear here once they are added.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default CategoriesPage;
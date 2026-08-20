"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ArrowUpDown,
  DollarSign,
  PackageSearch,
} from "lucide-react";
import { Gear } from "@/types/types";
import GearCard from "./gearCard";
import { Badge } from "@/components/ui/badge";

interface GearBrowseListProps {
  initialGears: Gear[];
}

type SortOption =
  | "DEFAULT"
  | "PRICE_ASC"
  | "PRICE_DESC"
  | "RATING_DESC"
  | "NAME_ASC";

export const GearBrowseList = ({ initialGears = [] }: GearBrowseListProps) => {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("DEFAULT");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract all unique brands dynamically
  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    initialGears.forEach((gear) => {
      if (gear.brand && gear.brand.trim()) {
        brands.add(gear.brand.trim());
      }
    });
    return Array.from(brands).sort();
  }, [initialGears]);

  // Compute average rating helper
  const getGearRating = (gear: Gear) => {
    if (!gear.reviews || gear.reviews.length === 0) return 0;
    return (
      gear.reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
      gear.reviews.length
    );
  };

  // Filter & sort gears
  const filteredGears = useMemo(() => {
    const query = search.trim().toLowerCase();
    const min = minPrice !== "" ? parseFloat(minPrice) : null;
    const max = maxPrice !== "" ? parseFloat(maxPrice) : null;

    const filtered = initialGears.filter((gear) => {
      // Search matching across title, brand, description, provider name
      const matchesSearch =
        !query ||
        gear.title?.toLowerCase().includes(query) ||
        gear.brand?.toLowerCase().includes(query) ||
        gear.description?.toLowerCase().includes(query) ||
        gear.provider?.name?.toLowerCase().includes(query);

      // Brand filter
      const matchesBrand =
        selectedBrand === "ALL" ||
        gear.brand?.toLowerCase() === selectedBrand.toLowerCase();

      // Status filter
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "AVAILABLE" &&
          gear.status === "AVAILABLE" &&
          gear.stockQuantity > 0) ||
        (statusFilter === "UNAVAILABLE" &&
          (gear.status === "UNAVAILABLE" || gear.stockQuantity <= 0));

      // Price range filter
      const matchesMinPrice = min === null || gear.pricePerDay >= min;
      const matchesMaxPrice = max === null || gear.pricePerDay <= max;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesStatus &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    // Sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "PRICE_ASC":
          return a.pricePerDay - b.pricePerDay;
        case "PRICE_DESC":
          return b.pricePerDay - a.pricePerDay;
        case "RATING_DESC":
          return getGearRating(b) - getGearRating(a);
        case "NAME_ASC":
          return (a.title || "").localeCompare(b.title || "");
        case "DEFAULT":
        default:
          return 0;
      }
    });
  }, [
    initialGears,
    search,
    selectedBrand,
    statusFilter,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  // Count active non-default filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBrand !== "ALL") count++;
    if (statusFilter !== "ALL") count++;
    if (minPrice !== "") count++;
    if (maxPrice !== "") count++;
    if (sortBy !== "DEFAULT") count++;
    return count;
  }, [selectedBrand, statusFilter, minPrice, maxPrice, sortBy]);

  const resetAllFilters = () => {
    setSearch("");
    setSelectedBrand("ALL");
    setStatusFilter("ALL");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("DEFAULT");
  };

  const hasAnyFilterActive =
    search.trim() !== "" || activeFiltersCount > 0;

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Available Equipment</p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Browse Gear</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
              {hasAnyFilterActive ? (
                <>
                  Showing <span className="font-semibold text-foreground">{filteredGears.length}</span> of{" "}
                  <span className="font-semibold text-foreground">{initialGears.length}</span> items
                </>
              ) : (
                <>
                  <span className="font-semibold text-foreground">{initialGears.length}</span>{" "}
                  {initialGears.length === 1 ? "item" : "items"} available
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Search & Quick Controls Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gear by name, brand, description, or provider..."
            className="h-12 w-full rounded-xl border bg-background pl-12 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/70"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search input"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sort options"
            className="h-12 w-full sm:w-auto appearance-none rounded-xl border bg-background pl-4 pr-10 text-sm font-medium outline-none transition hover:bg-muted/40 focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="DEFAULT">Sort: Featured</option>
            <option value="PRICE_ASC">Price: Low to High</option>
            <option value="PRICE_DESC">Price: High to Low</option>
            <option value="RATING_DESC">Highest Rated</option>
            <option value="NAME_ASC">Name: A to Z</option>
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Filter Toggle Button */}
        <button
          type="button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className={`flex h-12 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-medium transition cursor-pointer ${
            isFilterOpen || activeFiltersCount > 0
              ? "border-primary bg-primary/10 text-primary hover:bg-primary/15"
              : "bg-background hover:bg-muted text-foreground"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Expandable Filter Drawer / Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden mb-6"
          >
            <div className="rounded-2xl border bg-card p-5 shadow-xs">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">Refine Results</h3>
                </div>

                {hasAnyFilterActive && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition font-medium cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset all
                  </button>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Brand Filter */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="ALL">All Brands ({initialGears.length})</option>
                    {uniqueBrands.map((brand) => {
                      const count = initialGears.filter((g) => g.brand === brand).length;
                      return (
                        <option key={brand} value={brand}>
                          {brand} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Availability Status
                  </label>
                  <div className="flex gap-2">
                    {[
                      { label: "All", value: "ALL" },
                      { label: "In Stock", value: "AVAILABLE" },
                      { label: "Unavailable", value: "UNAVAILABLE" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setStatusFilter(item.value)}
                        className={`flex-1 rounded-lg border py-2 text-xs font-medium transition cursor-pointer ${
                          statusFilter === item.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Daily Rate ($)
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="number"
                        min="0"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="h-10 w-full rounded-lg border bg-background pl-8 pr-2 text-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <span className="text-muted-foreground text-xs font-medium">to</span>
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="number"
                        min="0"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="h-10 w-full rounded-lg border bg-background pl-8 pr-2 text-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filter Tags */}
      {hasAnyFilterActive && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Active filters:</span>

          {search.trim() && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 rounded-lg py-1 px-2.5 text-xs font-normal"
            >
              <span>Search: "{search}"</span>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="hover:text-foreground text-muted-foreground cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {selectedBrand !== "ALL" && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 rounded-lg py-1 px-2.5 text-xs font-normal"
            >
              <span>Brand: {selectedBrand}</span>
              <button
                type="button"
                onClick={() => setSelectedBrand("ALL")}
                className="hover:text-foreground text-muted-foreground cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {statusFilter !== "ALL" && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 rounded-lg py-1 px-2.5 text-xs font-normal"
            >
              <span>Status: {statusFilter === "AVAILABLE" ? "In Stock" : "Unavailable"}</span>
              <button
                type="button"
                onClick={() => setStatusFilter("ALL")}
                className="hover:text-foreground text-muted-foreground cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {minPrice !== "" && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 rounded-lg py-1 px-2.5 text-xs font-normal"
            >
              <span>Min: ${minPrice}</span>
              <button
                type="button"
                onClick={() => setMinPrice("")}
                className="hover:text-foreground text-muted-foreground cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {maxPrice !== "" && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 rounded-lg py-1 px-2.5 text-xs font-normal"
            >
              <span>Max: ${maxPrice}</span>
              <button
                type="button"
                onClick={() => setMaxPrice("")}
                className="hover:text-foreground text-muted-foreground cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {sortBy !== "DEFAULT" && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 rounded-lg py-1 px-2.5 text-xs font-normal"
            >
              <span>
                Sorted by:{" "}
                {sortBy === "PRICE_ASC"
                  ? "Price: Low to High"
                  : sortBy === "PRICE_DESC"
                  ? "Price: High to Low"
                  : sortBy === "RATING_DESC"
                  ? "Highest Rated"
                  : "Name: A to Z"}
              </span>
              <button
                type="button"
                onClick={() => setSortBy("DEFAULT")}
                className="hover:text-foreground text-muted-foreground cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          <button
            type="button"
            onClick={resetAllFilters}
            className="text-xs text-primary hover:underline font-semibold ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Gear Grid or Empty State */}
      {filteredGears.length > 0 ? (
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence>
            {filteredGears.map((gear: Gear) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-dashed border-border bg-card/60 p-16 text-center shadow-xs"
        >
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <PackageSearch className="size-8" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-foreground">
            No matching gear found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
            {hasAnyFilterActive
              ? "We couldn't find any equipment matching your current search query or filter selections. Try adjusting or clearing your filters."
              : "There is currently no equipment available in the catalog."}
          </p>

          {hasAnyFilterActive && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset all filters
            </button>
          )}
        </motion.div>
      )}
    </section>
  );
};

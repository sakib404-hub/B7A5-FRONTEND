"use client";

import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import { GearCard } from "./GearCard";

interface GearGridProps {
  gears: any[];
}

export const GearGrid = ({ gears }: GearGridProps) => {
  if (!gears.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-xs"
      >
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <PackageOpen className="size-7" />
        </div>

        <h3 className="mt-4 text-base font-bold text-foreground">
          No equipment listed yet
        </h3>

        <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
          Add your first outdoor gear listing above to make it available for customer rentals and start earning revenue.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {gears.map((gear, index) => (
        <GearCard key={gear.id} gear={gear} index={index} />
      ))}
    </div>
  );
};
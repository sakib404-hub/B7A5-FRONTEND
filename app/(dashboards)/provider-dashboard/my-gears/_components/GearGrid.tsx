"use client";

import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import { GearCard } from "./GearCard";

interface GearGridProps {
  gears: any[];
}

export const GearGrid = ({
  gears,
}: GearGridProps) => {
  if (!gears.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center"
      >
        <PackageOpen className="mb-3 h-10 w-10 text-muted-foreground" />

        <h3 className="font-semibold">
          No gears yet
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Add your first gear to start renting it out.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {gears.map((gear, index) => (
        <GearCard
          key={gear.id}
          gear={gear}
          index={index}
        />
      ))}
    </div>
  );
};
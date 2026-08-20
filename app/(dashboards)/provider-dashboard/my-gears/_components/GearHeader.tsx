"use client";

import { motion } from "framer-motion";
import { Package, Plus } from "lucide-react";
import { CreateGearDialog } from "./CreateGearDialogue";

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface CategoryDiaLogueProps {
  categories: Category[];
}

export const GearHeader = ({ categories }: CategoryDiaLogueProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
      <div className="flex items-center gap-3.5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Package className="size-6" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Equipment Inventory
          </h1>
          <p className="text-sm text-muted-foreground">
            List, update, and manage your outdoor equipment and rental availability.
          </p>
        </div>
      </div>

      <CreateGearDialog categories={categories} />
    </div>
  );
};
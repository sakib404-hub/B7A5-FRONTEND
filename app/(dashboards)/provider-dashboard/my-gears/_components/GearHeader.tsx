"use client";

import { motion } from "framer-motion";
import { CreateGearDialog } from "./CreateGearDialogue";

export const GearHeader = () => {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            My Gears
          </h1>

          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Manage your rental gears, update their
            information, and keep your listings organized.
          </p>
        </motion.div>
      </div>

      <CreateGearDialog />
    </div>
  );
};
"use client";

import { CheckCircle2, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const CompletedOrdersHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <PackageCheck className="size-5" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Completed Rentals
          </h1>
          <p className="text-sm text-muted-foreground">
            Archive of successfully returned and completed equipment rentals.
          </p>
        </div>
      </div>

      <Badge
        variant="outline"
        className="w-fit rounded-xl border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
      >
        <CheckCircle2 className="mr-1.5 size-3.5" />
        Verified Completed
      </Badge>
    </motion.div>
  );
};
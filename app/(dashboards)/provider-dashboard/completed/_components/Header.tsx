"use client";

import { CheckCircle2, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";

export const CompletedOrdersHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        flex flex-col gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <PackageCheck
              size={21}
              className="text-primary"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Completed Orders
            </h1>

            <p className="text-sm text-muted-foreground">
              View all successfully completed rental orders.
            </p>
          </div>
        </div>
      </div>

      <div
        className="
          flex w-fit items-center gap-2
          rounded-full border
          bg-card px-3 py-1.5
          text-sm
        "
      >
        <CheckCircle2
          size={16}
          className="text-green-600"
        />

        <span className="text-muted-foreground">
          Completed Rentals
        </span>
      </div>
    </motion.div>
  );
};
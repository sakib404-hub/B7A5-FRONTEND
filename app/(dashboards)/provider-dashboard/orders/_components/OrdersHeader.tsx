"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

export const OrdersHeader = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
          <ClipboardList className="h-5 w-5 text-emerald-700" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Rental Orders
        </h1>
      </div>

      <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
        Manage your rental orders, review customer requests,
        and update the status of each order throughout the
        rental process.
      </p>
    </motion.div>
  );
};
"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

export const OrdersHeader = () => {
  return (
    <div className="flex items-center gap-3.5 border-b border-border/60 pb-6">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <ClipboardList className="size-6" />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Incoming Rental Orders
        </h1>
        <p className="text-sm text-muted-foreground">
          Review customer equipment bookings, confirm orders, and advance lifecycle transitions.
        </p>
      </div>
    </div>
  );
};
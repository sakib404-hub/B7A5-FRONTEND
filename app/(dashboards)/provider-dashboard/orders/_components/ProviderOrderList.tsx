"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { ProviderOrderCard } from "./ProviderOrderCard";

interface ProviderOrdersListProps {
  orders: any[];
}

export const ProviderOrdersList = ({
  orders,
}: ProviderOrdersListProps) => {
  if (!orders.length) {
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
        className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/30 p-8 text-center"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <ClipboardList className="h-6 w-6 text-emerald-700" />
        </div>

        <h3 className="font-semibold text-slate-800">
          No rental orders
        </h3>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          You don't have any rental orders for your gears yet.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-5">
      {orders.map((order, index) => (
        <ProviderOrderCard
          key={order.id}
          order={order}
          index={index}
        />
      ))}
    </div>
  );
};
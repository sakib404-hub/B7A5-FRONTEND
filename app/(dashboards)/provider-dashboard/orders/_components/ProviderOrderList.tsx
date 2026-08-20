"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Package } from "lucide-react";
import { ProviderOrderCard } from "./ProviderOrderCard";

interface ProviderOrdersListProps {
  orders: any[];
}

export const ProviderOrdersList = ({ orders }: ProviderOrdersListProps) => {
  const [filter, setFilter] = useState<string>("ALL");

  const filterTabs = [
    { label: "All Requests", value: "ALL", count: orders.length },
    {
      label: "Pending Review",
      value: "PENDING",
      count: orders.filter((o) => o.status === "PENDING").length,
    },
    {
      label: "Confirmed",
      value: "CONFIRMED",
      count: orders.filter((o) => o.status === "CONFIRMED").length,
    },
    {
      label: "In Use / Picked Up",
      value: "PICKED_UP",
      count: orders.filter((o) => o.status === "PICKED_UP").length,
    },
    {
      label: "Returned",
      value: "RETURNED",
      count: orders.filter((o) => o.status === "RETURNED").length,
    },
    {
      label: "Cancelled",
      value: "CANCELLED",
      count: orders.filter((o) => o.status === "CANCELLED").length,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    if (filter === "ALL") return true;
    return order.status === filter;
  });

  if (!orders.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-xs"
      >
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ClipboardList className="size-7" />
        </div>

        <h3 className="mt-4 text-base font-bold text-foreground">
          No rental orders received
        </h3>

        <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
          When customers rent your gear listings from the marketplace, their booking requests will appear here for review and status updates.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-3">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setFilter(tab.value)}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
              filter === tab.value
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "bg-muted/40 text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                filter === tab.value
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
          No orders found under &quot;{filter}&quot;.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map((order, index) => (
            <ProviderOrderCard key={order.id} order={order} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};
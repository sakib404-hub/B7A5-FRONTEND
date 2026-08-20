"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Package, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderCard } from "./OrderCard";

export interface Order {
  id: string;
  userId: string;
  gearId: string;
  totalAmount: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "ONGOING"
    | "COMPLETED"
    | "CANCELLED";
  rentalDays: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;

  gear: {
    provider: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface MyOrdersProps {
  orders: Order[];
}

const EmptyOrders = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-xs"
    >
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Package className="size-7" />
      </div>

      <h3 className="mt-4 text-lg font-bold text-foreground">
        No rental orders found
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
        You haven&apos;t booked any gear matching this filter. Explore our catalog of adventure equipment.
      </p>

      <div className="mt-6">
        <Button asChild className="rounded-xl font-medium shadow-xs">
          <Link href="/gear">
            <Compass className="mr-2 size-4" />
            Explore Gear Catalog
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export const MyOrders = ({ orders }: MyOrdersProps) => {
  const [filter, setFilter] = useState<string>("ALL");

  const filterTabs = [
    { label: "All Orders", value: "ALL", count: orders.length },
    {
      label: "Pending",
      value: "PENDING",
      count: orders.filter((o) => o.status === "PENDING").length,
    },
    {
      label: "Confirmed",
      value: "CONFIRMED",
      count: orders.filter((o) => o.status === "CONFIRMED").length,
    },
    {
      label: "Ongoing",
      value: "ONGOING",
      count: orders.filter((o) => o.status === "ONGOING").length,
    },
    {
      label: "Completed",
      value: "COMPLETED",
      count: orders.filter((o) => o.status === "COMPLETED").length,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShoppingBag className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                My Rental Orders
              </h1>
              <Badge variant="secondary" className="rounded-lg px-2.5 py-0.5 text-xs font-semibold">
                {orders.length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Monitor order confirmations, checkout pending payments, and track equipment handoffs.
            </p>
          </div>
        </div>

        <Button asChild variant="outline" className="rounded-xl border-border/80 shadow-2xs">
          <Link href="/gear">
            <Compass className="mr-2 size-4 text-primary" />
            Rent More Gear
          </Link>
        </Button>
      </div>

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

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map((order, index) => (
            <OrderCard key={order.id} order={order} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};
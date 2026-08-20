"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export interface CompletedOrderCardProps {
  order: {
    id: string;
    userId: string;
    gearId: string;
    totalAmount: number;
    status: string;
    rentalDays: number;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;

    gear?: {
      id: string;
      title?: string;
      brand?: string;
      pricePerDay?: number;
      image?: string;
    };
  };
}

export const CompletedOrderCard = ({ order }: CompletedOrderCardProps) => {
  const createdDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const completedDate = new Date(order.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs transition-all hover:border-emerald-500/30 hover:shadow-md"
    >
      <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center">
        {/* Gear Image */}
        <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted md:h-24 md:w-28">
          {order.gear?.image ? (
            <img
              src={order.gear.image}
              alt={order.gear.title || "Gear"}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <Package size={28} className="text-muted-foreground/60" />
          )}
        </div>

        {/* Main Details */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-foreground">
              {order.gear?.title || "Gear Equipment"}
            </h3>

            <Badge
              variant="outline"
              className="rounded-lg border-emerald-500/30 bg-emerald-500/10 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="mr-1 size-3" />
              Completed
            </Badge>
          </div>

          {order.gear?.brand && (
            <p className="text-xs font-medium text-muted-foreground">
              Brand: {order.gear.brand}
            </p>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              <span>Booked: {createdDate}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              <span>Completed: {completedDate}</span>
            </div>

            <span className="font-semibold text-foreground">
              {order.rentalDays} {order.rentalDays === 1 ? "day" : "days"} duration
            </span>
          </div>
        </div>

        {/* Price & Payment */}
        <div className="shrink-0 rounded-xl border border-border/50 bg-muted/20 p-3 md:text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Settled
          </p>
          <p className="mt-0.5 text-xl font-extrabold text-foreground">
            ${Number(order.totalAmount).toFixed(2)}
          </p>
          <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 md:justify-end">
            <CheckCircle2 className="size-3.5" />
            {order.isPaid ? "Payment Settled" : "Unpaid"}
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="border-t border-border/50 bg-muted/20 px-5 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="font-mono text-[11px]">
            Order ID: #{order.id.slice(0, 12)}
          </span>
          <span className="text-xs font-medium text-primary">
            Rental Completed & Verified
          </span>
        </div>
      </div>
    </motion.div>
  );
};
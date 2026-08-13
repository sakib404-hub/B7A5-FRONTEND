"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";

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

export const CompletedOrderCard = ({
  order,
}: CompletedOrderCardProps) => {
  const createdDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const completedDate = new Date(
    order.updatedAt
  ).toLocaleDateString("en-US", {
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
      className="
        overflow-hidden
        rounded-xl border
        bg-card
        shadow-sm
      "
    >
      <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center">
        {/* Gear Image / Placeholder */}
        <div
          className="
            flex h-24 w-full shrink-0
            items-center justify-center
            overflow-hidden
            rounded-lg
            bg-muted
            md:h-24 md:w-28
          "
        >
          {order.gear?.image ? (
            <img
              src={order.gear.image}
              alt={order.gear.title || "Gear"}
              className="h-full w-full object-cover"
            />
          ) : (
            <Package
              size={32}
              className="text-muted-foreground"
            />
          )}
        </div>

        {/* Main Information */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">
              {order.gear?.title || "Gear Item"}
            </h3>

            <span
              className="
                inline-flex items-center gap-1
                rounded-full
                bg-green-500/10
                px-2.5 py-1
                text-xs font-medium
                text-green-600
              "
            >
              <CheckCircle2 size={13} />
              Completed
            </span>
          </div>

          {order.gear?.brand && (
            <p className="mt-1 text-sm text-muted-foreground">
              {order.gear.brand}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={15} />
              <span>
                Ordered {createdDate}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock3 size={15} />
              <span>
                Completed {completedDate}
              </span>
            </div>

            <span>
              {order.rentalDays}{" "}
              {order.rentalDays === 1 ? "day" : "days"}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="shrink-0 md:text-right">
          <p className="text-xs text-muted-foreground">
            Total Amount
          </p>

          <p className="mt-1 text-xl font-bold">
            ${Number(order.totalAmount).toFixed(2)}
          </p>

          <div className="mt-1 flex items-center gap-1 text-xs text-green-600 md:justify-end">
            <CheckCircle2 size={13} />

            {order.isPaid ? "Paid" : "Unpaid"}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/30 px-5 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            Order ID:{" "}
            <span className="font-medium text-foreground">
              {order.id.slice(0, 8)}...
            </span>
          </span>

          <span>
            Status:{" "}
            <span className="font-medium text-foreground">
              {order.status}
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
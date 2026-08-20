"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  OrderStatus,
  OrderStatusSelect,
} from "./OrderStatus";

export interface ProviderOrder {
  id: string;
  userId: string;
  gearId: string;
  totalAmount: number;
  status: OrderStatus;
  rentalDays: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;

  gear: {
    id: string;
    title: string;
    description: string;
    pricePerDay: number;
    brand: string;
    stockQuantity: number;
    status: "AVAILABLE" | "UNAVAILABLE";
    providerId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ProviderOrderCardProps {
  order: ProviderOrder;
  index: number;
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const statusStyles: Record<string, string> = {
  PENDING: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  CONFIRMED: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  PICKED_UP: "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400",
  RETURNED: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  CANCELLED: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export const ProviderOrderCard = ({
  order,
  index,
}: ProviderOrderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
    >
      {/* Header */}
      <div className="border-b border-border/50 bg-muted/20 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Package className="size-5" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-foreground">
                  Rental Request
                </h3>
                <Badge
                  variant="outline"
                  className={`rounded-lg px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                    statusStyles[order.status] ??
                    "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {formatStatus(order.status)}
                </Badge>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                Order #{order.id.slice(0, 8)}
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
              order.isPaid
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            }`}
          >
            {order.isPaid ? (
              <>
                <CheckCircle2 className="mr-1 size-3.5" />
                Customer Paid
              </>
            ) : (
              <>
                <XCircle className="mr-1 size-3.5" />
                Unpaid
              </>
            )}
          </Badge>
        </div>
      </div>

      {/* Main Body */}
      <div className="space-y-4 p-5">
        {/* Gear Box */}
        <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-foreground">
                {order.gear?.title || "Gear Item"}
              </h4>
              <p className="text-xs text-muted-foreground">
                Brand: <span className="font-medium text-foreground">{order.gear?.brand || "Generic"}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-lg font-extrabold text-primary">
                ${order.gear?.pricePerDay}
              </span>
              <span className="text-xs text-muted-foreground ml-1">/ day</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/40 bg-muted/10 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5 text-primary" />
              <span>Rental Duration</span>
            </div>
            <p className="mt-1 font-bold text-foreground text-sm">
              {order.rentalDays} {order.rentalDays === 1 ? "day" : "days"}
            </p>
          </div>

          <div className="rounded-xl border border-border/40 bg-muted/10 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CreditCard className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Total Price</span>
            </div>
            <p className="mt-1 font-bold text-foreground text-sm">
              ${order.totalAmount}
            </p>
          </div>

          <div className="rounded-xl border border-border/40 bg-muted/10 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock3 className="size-3.5 text-primary" />
              <span>Requested On</span>
            </div>
            <p className="mt-1 font-bold text-foreground text-sm">
              {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="rounded-xl border border-border/40 bg-muted/10 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Package className="size-3.5 text-primary" />
              <span>Stock Remaining</span>
            </div>
            <p className="mt-1 font-bold text-foreground text-sm">
              {order.gear?.stockQuantity} units
            </p>
          </div>
        </div>
      </div>

      {/* Footer / Status Select */}
      <div className="border-t border-border/50 bg-muted/20 p-4">
        <OrderStatusSelect
          orderId={order.id}
          currentStatus={order.status}
          isPaid={order.isPaid}
        />
      </div>
    </motion.div>
  );
};
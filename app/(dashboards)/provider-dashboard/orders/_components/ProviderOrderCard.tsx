"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CreditCard,
  Package,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { OrderStatusSelect } from "./OrderStatus";

interface ProviderOrderCardProps {
  order: any;
  index: number;
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const statusStyles: Record<string, string> = {
  PENDING:
    "border-yellow-200 bg-yellow-50 text-yellow-700",

  CONFIRMED:
    "border-blue-200 bg-blue-50 text-blue-700",

  PICKED_UP:
    "border-purple-200 bg-purple-50 text-purple-700",

  RETURNED:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  CANCELLED:
    "border-red-200 bg-red-50 text-red-700",
};

export const ProviderOrderCard = ({
  order,
  index,
}: ProviderOrderCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -2,
      }}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-emerald-100
        bg-linear-to-br
        from-emerald-50/70
        via-white
        to-teal-50/40
        shadow-sm
        transition-shadow
        hover:shadow-md
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-emerald-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-emerald-700" />

            <h3 className="font-semibold text-slate-800">
              Rental Order
            </h3>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            Order #{order.id.slice(0, 8)}
          </p>
        </div>

        <Badge
          variant="outline"
          className={
            statusStyles[order.status] ??
            "border-slate-200 bg-slate-50 text-slate-700"
          }
        >
          {order.status.replace("_", " ")}
        </Badge>
      </div>

      {/* Details */}
      <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <OrderDetail
          icon={User}
          label="Customer"
          value={order.user?.name ?? "Unknown"}
          subValue={order.user?.email}
        />

        <OrderDetail
          icon={Package}
          label="Gear"
          value={order.gear?.title ?? "Unknown gear"}
        />

        <OrderDetail
          icon={CalendarDays}
          label="Rental Duration"
          value={`${order.rentalDays} days`}
          subValue={
            order.createdAt
              ? formatDate(order.createdAt)
              : undefined
          }
        />

        <OrderDetail
          icon={CreditCard}
          label="Total Amount"
          value={`৳${order.totalAmount}`}
        />
      </div>

      {/* Status Update */}
      <div className="border-t border-emerald-100 bg-white/50 p-5">
        <OrderStatusSelect
          orderId={order.id}
          currentStatus={order.status}
        />
      </div>
    </motion.div>
  );
};

interface OrderDetailProps {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
}

const OrderDetail = ({
  icon: Icon,
  label,
  value,
  subValue,
}: OrderDetailProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
        <Icon className="h-4 w-4 text-emerald-700" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="truncate text-sm font-medium text-slate-800">
          {value}
        </p>

        {subValue && (
          <p className="truncate text-xs text-muted-foreground">
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
};
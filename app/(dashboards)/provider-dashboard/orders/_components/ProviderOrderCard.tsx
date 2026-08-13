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
        ease: "easeOut",
      }}
      whileHover={{
        y: -3,
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
      <div className="border-b border-emerald-100 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Order info */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
              <Package className="h-5 w-5 text-emerald-700" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-800">
                  Rental Order
                </h3>

                <Badge
                  variant="outline"
                  className={
                    statusStyles[order.status] ??
                    "border-slate-200 bg-slate-50 text-slate-700"
                  }
                >
                  {formatStatus(order.status)}
                </Badge>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                Order #{order.id.slice(0, 8)}
              </p>
            </div>
          </div>

          {/* Payment */}
          <PaymentStatus isPaid={order.isPaid} />
        </div>
      </div>

      {/* Gear Section */}
      <div className="p-5">
        <div className="rounded-xl border border-emerald-100 bg-white/70 p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Gear icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
              <Package className="h-7 w-7 text-emerald-700" />
            </div>

            {/* Gear information */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {order.gear.title}
                  </h4>

                  <p className="text-xs text-muted-foreground">
                    {order.gear.brand}
                  </p>
                </div>

                <p className="font-semibold text-emerald-700">
                  ৳{order.gear.pricePerDay}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    / day
                  </span>
                </p>
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                {order.gear.description}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <OrderDetail
            icon={CalendarDays}
            label="Rental Duration"
            value={`${order.rentalDays} ${
              order.rentalDays === 1 ? "day" : "days"
            }`}
          />

          <OrderDetail
            icon={CreditCard}
            label="Total Amount"
            value={`৳${order.totalAmount}`}
          />

          <OrderDetail
            icon={Clock3}
            label="Ordered On"
            value={formatDate(order.createdAt)}
          />

          <OrderDetail
            icon={Package}
            label="Gear Stock"
            value={`${order.gear.stockQuantity} available`}
          />
        </div>
      </div>

      {/* Status Update */}
      <div className="border-t border-emerald-100 bg-white/50 p-5">
        <OrderStatusSelect
          orderId={order.id}
          currentStatus={order.status}
          isPaid={order.isPaid}
        />
      </div>
    </motion.div>
  );
};

/* -------------------------------- */
/* Payment Status                    */
/* -------------------------------- */

interface PaymentStatusProps {
  isPaid: boolean;
}

const PaymentStatus = ({
  isPaid,
}: PaymentStatusProps) => {
  return (
    <Badge
      variant="outline"
      className={
        isPaid
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-orange-200 bg-orange-50 text-orange-700"
      }
    >
      {isPaid ? (
        <>
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Paid
        </>
      ) : (
        <>
          <XCircle className="mr-1 h-3 w-3" />
          Unpaid
        </>
      )}
    </Badge>
  );
};

/* -------------------------------- */
/* Order Detail                     */
/* -------------------------------- */

interface OrderDetailProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const OrderDetail = ({
  icon: Icon,
  label,
  value,
}: OrderDetailProps) => {
  return (
    <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
};
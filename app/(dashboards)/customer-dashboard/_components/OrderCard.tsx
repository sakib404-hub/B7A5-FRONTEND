"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderInfo } from "./OrderInfo";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Clock3,
  CreditCard,
  Package,
  Store,
} from "lucide-react";
import { Order } from "./MyOrders";
import { PaymentStatus } from "./PaymentStatus";

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const OrderStatusBadge = ({ status }: { status: Order["status"] }) => {
  const styles: Record<string, string> = {
    PENDING: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    CONFIRMED: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    ONGOING: "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    COMPLETED: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    CANCELLED: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  };

  return (
    <Badge
      variant="outline"
      className={`rounded-lg px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
        styles[status] ?? "border-border bg-muted text-muted-foreground"
      }`}
    >
      {status.toLowerCase()}
    </Badge>
  );
};

export const OrderCard = ({
  order,
  index,
}: {
  order: Order;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -2 }}
    >
      <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs transition-all duration-200 hover:border-primary/30 hover:shadow-md">
        <CardHeader className="border-b border-border/50 bg-muted/20 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Package className="size-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-foreground">
                  Rental Order
                </CardTitle>
                <p className="font-mono text-xs text-muted-foreground">
                  ID: #{order.id.slice(0, 8)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <OrderStatusBadge status={order.status} />
              <PaymentStatus
                isPaid={order.isPaid}
                orderId={order.id}
                orderStatus={order.status}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <OrderInfo
              icon={CreditCard}
              label="Total Price"
              value={`$${order.totalAmount}`}
            />

            <OrderInfo
              icon={CalendarDays}
              label="Rental Period"
              value={`${order.rentalDays} ${order.rentalDays === 1 ? "day" : "days"}`}
            />

            <OrderInfo
              icon={Store}
              label="Equipment Provider"
              value={order.gear?.provider?.name || "Verified Provider"}
              subValue={order.gear?.provider?.email}
            />

            <OrderInfo
              icon={Clock3}
              label="Booking Date"
              value={formatDate(order.createdAt)}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

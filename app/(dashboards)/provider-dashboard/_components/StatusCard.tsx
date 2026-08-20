"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  RotateCcw,
  XCircle,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OrderStatusCardProps {
  orders: {
    total: number;
    pending: number;
    confirmed: number;
    pickedUp: number;
    returned: number;
    cancelled: number;
  };
}

const OrderStatusCard = ({ orders }: OrderStatusCardProps) => {
  const statuses = [
    {
      title: "Pending Approval",
      value: orders.pending,
      icon: Clock3,
      barColor: "bg-amber-500",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      title: "Confirmed",
      value: orders.confirmed,
      icon: CheckCircle2,
      barColor: "bg-blue-500",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Picked Up / In Use",
      value: orders.pickedUp,
      icon: PackageCheck,
      barColor: "bg-purple-500",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Returned & Completed",
      value: orders.returned,
      icon: RotateCcw,
      barColor: "bg-emerald-500",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Cancelled",
      value: orders.cancelled,
      icon: XCircle,
      barColor: "bg-rose-500",
      badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Rental Orders Pipeline
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Customer bookings progress across lifecycle
            </p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Activity className="size-4.5" />
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="space-y-4">
            {statuses.map((status, index) => {
              const Icon = status.icon;
              const percentage =
                orders.total > 0
                  ? Math.round((status.value / orders.total) * 100)
                  : 0;

              return (
                <motion.div
                  key={status.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="space-y-2 rounded-xl border border-border/40 bg-muted/20 p-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`flex size-7 items-center justify-center rounded-lg ${status.badgeColor}`}>
                        <Icon className="size-3.5" />
                      </div>
                      <span className="font-semibold text-foreground">
                        {status.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-foreground">
                        {status.value}
                      </span>
                      <span className="text-muted-foreground text-[11px]">
                        ({percentage}%)
                      </span>
                    </div>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                      className={`h-full rounded-full ${status.barColor}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderStatusCard;
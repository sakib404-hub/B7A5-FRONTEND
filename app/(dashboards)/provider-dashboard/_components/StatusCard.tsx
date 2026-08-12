"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  RotateCcw,
  XCircle,
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
      title: "Pending",
      value: orders.pending,
      icon: Clock3,
    },
    {
      title: "Confirmed",
      value: orders.confirmed,
      icon: CheckCircle2,
    },
    {
      title: "Picked Up",
      value: orders.pickedUp,
      icon: PackageCheck,
    },
    {
      title: "Returned",
      value: orders.returned,
      icon: RotateCcw,
    },
    {
      title: "Cancelled",
      value: orders.cancelled,
      icon: XCircle,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-2xl border-[#d8e9e5] bg-white shadow-[0_4px_20px_rgba(63,113,103,0.07)]">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">
            Order Overview
          </CardTitle>

          <p className="text-sm text-slate-500">
            Current status of your rental orders
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {statuses.map((status, index) => {
              const Icon = status.icon;

              const percentage =
                orders.total > 0
                  ? (status.value / orders.total) * 100
                  : 0;

              return (
                <motion.div
                  key={status.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.08,
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf6f4]">
                        <Icon className="h-4 w-4 text-[#3f7167]" />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {status.title}
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-slate-800">
                      {status.value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#edf6f4]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1,
                      }}
                      className="h-full rounded-full bg-[#3f7167]"
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
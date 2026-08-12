"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, PackageCheck, XCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecentActivityProps {
  orders: {
    total: number;
    pending: number;
    confirmed: number;
    pickedUp: number;
    returned: number;
    cancelled: number;
  };
}

const RecentActivity = ({ orders }: RecentActivityProps) => {
  const activities = [
    {
      title: "Pending Orders",
      value: orders.pending,
      icon: Clock,
    },
    {
      title: "Confirmed Orders",
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
      icon: CheckCircle2,
    },
    {
      title: "Cancelled",
      value: orders.cancelled,
      icon: XCircle,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-2xl border-[#d8e9e5] bg-white shadow-[0_4px_20px_rgba(63,113,103,0.07)]">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">
            Rental Activity
          </CardTitle>

          <p className="text-sm text-slate-500">
            Your current rental activity
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="rounded-xl border border-[#d8e9e5] bg-[#edf6f4] p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f3f0]">
                    <Icon className="h-4 w-4 text-[#3f7167]" />
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-800">
                    {activity.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {activity.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentActivity;
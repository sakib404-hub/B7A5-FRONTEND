"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, PackageCheck, RotateCcw, XCircle, Activity } from "lucide-react";
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
      title: "Pending Approval",
      value: orders.pending,
      icon: Clock,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    {
      title: "Confirmed",
      value: orders.confirmed,
      icon: CheckCircle2,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      title: "Picked Up",
      value: orders.pickedUp,
      icon: PackageCheck,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    {
      title: "Returned",
      value: orders.returned,
      icon: RotateCcw,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Cancelled",
      value: orders.cancelled,
      icon: XCircle,
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <Card className="rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Rental Pipeline & Statuses
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Current inventory flow and lifecycle stages
            </p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Activity className="size-4.5" />
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                >
                  <div className={`flex size-9 items-center justify-center rounded-xl border ${activity.color}`}>
                    <Icon className="size-4" />
                  </div>

                  <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                    {activity.value}
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">
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
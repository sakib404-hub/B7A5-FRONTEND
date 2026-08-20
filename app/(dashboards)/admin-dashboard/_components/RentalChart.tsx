"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CalendarDays, TrendingUp } from "lucide-react";

interface Props {
  rentals: {
    pending: number;
    confirmed: number;
    ongoing: number;
    completed: number;
    cancelled: number;
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border/80 bg-background/95 p-3 shadow-lg backdrop-blur-md">
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-sm font-bold text-primary">
          {payload[0].value} {payload[0].value === 1 ? "rental" : "rentals"}
        </p>
      </div>
    );
  }
  return null;
};

export const RentalStatusChart = ({ rentals }: Props) => {
  const data = [
    {
      status: "Pending",
      value: rentals.pending,
      color: "oklch(0.7 0.18 45)",
      bgBadge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    {
      status: "Confirmed",
      value: rentals.confirmed,
      color: "oklch(0.6 0.15 220)",
      bgBadge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      status: "Ongoing",
      value: rentals.ongoing,
      color: "oklch(0.65 0.18 280)",
      bgBadge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    {
      status: "Completed",
      value: rentals.completed,
      color: "oklch(0.53 0.17 155)",
      bgBadge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      status: "Cancelled",
      value: rentals.cancelled,
      color: "oklch(0.6 0.22 15)",
      bgBadge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    },
  ];

  const totalRentals =
    rentals.pending +
    rentals.confirmed +
    rentals.ongoing +
    rentals.completed +
    rentals.cancelled;

  const completionRate =
    totalRentals > 0
      ? Math.round((rentals.completed / totalRentals) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <Card className="rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays className="size-5" />
            </div>

            <div>
              <CardTitle className="text-base font-bold text-foreground sm:text-lg">
                Platform Rental Orders Flow
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Distribution across all active and concluded states
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Orders
              </p>
              <p className="text-xl font-extrabold text-foreground">
                {totalRentals}
              </p>
            </div>

            <div className="hidden h-8 w-px bg-border/60 sm:block" />

            <div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="size-3.5" />
                <span>Completion</span>
              </div>
              <p className="text-xl font-extrabold text-foreground">
                {completionRate}%
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="oklch(0.5 0.01 240 / 0.15)"
                />

                <XAxis
                  dataKey="status"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(0.5 0.015 240)", fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(0.5 0.015 240)", fontSize: 12 }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  animationDuration={800}
                >
                  {data.map((entry) => (
                    <Cell key={entry.status} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-5 border-t border-border/40 pt-4">
            {data.map((item) => (
              <div
                key={item.status}
                className="rounded-xl border border-border/50 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
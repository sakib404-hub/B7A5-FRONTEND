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
import { BarChart3 } from "lucide-react";

interface OrderOverviewProps {
  orders: {
    total: number;
    pending: number;
    confirmed: number;
    pickedUp: number;
    returned: number;
    cancelled: number;
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border/80 bg-background/95 p-3 shadow-lg backdrop-blur-md">
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-sm font-bold text-primary">
          {payload[0].value} {payload[0].value === 1 ? "order" : "orders"}
        </p>
      </div>
    );
  }
  return null;
};

const OrderOverview = ({ orders }: OrderOverviewProps) => {
  const data = [
    { status: "Pending", orders: orders.pending, color: "var(--color-chart-4)" },
    { status: "Confirmed", orders: orders.confirmed, color: "var(--color-chart-2)" },
    { status: "Picked Up", orders: orders.pickedUp, color: "var(--color-chart-3)" },
    { status: "Returned", orders: orders.returned, color: "var(--color-chart-1)" },
    { status: "Cancelled", orders: orders.cancelled, color: "var(--color-chart-5)" },
  ];

  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Rental Orders Distribution
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Current breakdown across all lifecycle stages
            </p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3 className="size-4.5" />
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="oklch(0.5 0.01 240 / 0.15)"
                />
                <XAxis
                  dataKey="status"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "oklch(0.5 0.015 240)" }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "oklch(0.5 0.015 240)" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="orders"
                  radius={[8, 8, 0, 0]}
                  fill="oklch(0.53 0.17 155)"
                  animationDuration={800}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderOverview;
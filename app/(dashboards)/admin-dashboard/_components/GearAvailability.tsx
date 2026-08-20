"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PackageCheck } from "lucide-react";

interface Props {
  gears: {
    total: number;
    available: number;
    unavailable: number;
  };
}

export const GearAvailabilityChart = ({ gears }: Props) => {
  const data = [
    { name: "Available", value: gears.available },
    { name: "Unavailable", value: gears.unavailable },
  ];

  const availabilityPercentage =
    gears.total > 0
      ? Math.round((gears.available / gears.total) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="h-full"
    >
      <Card className="h-full rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-bold text-foreground">
              Equipment Inventory Health
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Fleet readiness across marketplace
            </p>
          </div>

          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <PackageCheck className="size-4.5" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {/* Donut Chart */}
          <div className="relative h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  cornerRadius={6}
                  stroke="none"
                >
                  <Cell fill="oklch(0.53 0.17 155)" />
                  <Cell fill="oklch(0.6 0.22 15)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-foreground">
                {availabilityPercentage}%
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Available
              </span>
            </div>
          </div>

          {/* Stats Breakdown */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span>Available</span>
              </div>
              <p className="mt-1 text-lg font-bold text-foreground">
                {gears.available}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono">
                {availabilityPercentage}% ready
              </p>
            </div>

            <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-rose-500" />
                <span>Rented Out</span>
              </div>
              <p className="mt-1 text-lg font-bold text-foreground">
                {gears.unavailable}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono">
                {gears.total > 0 ? 100 - availabilityPercentage : 0}% in use
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <Card className="h-full border-border bg-card">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Gear Availability
            </CardTitle>

            <p className="mt-1 text-xs text-muted-foreground">
              Current inventory status
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <PackageCheck className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>

        <CardContent>
          {/* Chart */}
          <div className="relative h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={82}
                  paddingAngle={4}
                  cornerRadius={6}
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === 0
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted))"
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-3xl font-bold text-foreground"
              >
                {availabilityPercentage}%
              </motion.p>

              <p className="text-xs text-muted-foreground">
                Available
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-primary/5 p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">
                  Available
                </span>
              </div>

              <p className="text-xl font-semibold text-foreground">
                {gears.available}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Unavailable
                </span>
              </div>

              <p className="text-xl font-semibold text-foreground">
                {gears.unavailable}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 border-t border-border pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Total gear
              </span>

              <span className="font-semibold text-foreground">
                {gears.total}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
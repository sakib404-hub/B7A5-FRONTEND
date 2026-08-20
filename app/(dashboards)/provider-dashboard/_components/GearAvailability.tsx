"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Package,
  XCircle,
  PieChart as PieIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GearAvailabilityProps {
  gears: {
    total: number;
    available: number;
    unavailable: number;
  };
}

const GearAvailability = ({ gears }: GearAvailabilityProps) => {
  const availablePercentage =
    gears.total > 0 ? Math.round((gears.available / gears.total) * 100) : 0;

  const unavailablePercentage =
    gears.total > 0 ? Math.round((gears.unavailable / gears.total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="h-full rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Inventory Readiness
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Equipment availability & deployment status
            </p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <PieIcon className="size-4.5" />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-between gap-6 pt-2">
          {/* Circular Badge Gauge */}
          <div className="flex items-center justify-center py-2">
            <div className="relative flex size-32 flex-col items-center justify-center rounded-full border-4 border-primary/20 bg-linear-to-b from-primary/10 to-transparent shadow-xs">
              <Package className="size-6 text-primary" />
              <span className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">
                {gears.total}
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Listed Gears
              </span>
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3.5">
            {/* Available */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold text-foreground">
                    Available for Rent
                  </span>
                </div>
                <div className="font-mono">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {gears.available}
                  </span>
                  <span className="text-muted-foreground text-[11px] ml-1">
                    ({availablePercentage}%)
                  </span>
                </div>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${availablePercentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-emerald-500"
                />
              </div>
            </div>

            {/* Unavailable */}
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <XCircle className="size-4 text-rose-600 dark:text-rose-400" />
                  <span className="font-semibold text-foreground">
                    Currently In Use / Unavailable
                  </span>
                </div>
                <div className="font-mono">
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    {gears.unavailable}
                  </span>
                  <span className="text-muted-foreground text-[11px] ml-1">
                    ({unavailablePercentage}%)
                  </span>
                </div>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${unavailablePercentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-rose-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GearAvailability;
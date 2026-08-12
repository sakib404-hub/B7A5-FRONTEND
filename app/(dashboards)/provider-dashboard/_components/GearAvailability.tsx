"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Package,
  XCircle,
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

const GearAvailability = ({
  gears,
}: GearAvailabilityProps) => {
  const availablePercentage =
    gears.total > 0
      ? (gears.available / gears.total) * 100
      : 0;

  const unavailablePercentage =
    gears.total > 0
      ? (gears.unavailable / gears.total) * 100
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full rounded-2xl border-[#d8e9e5] bg-white shadow-[0_4px_20px_rgba(63,113,103,0.07)]">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">
            Gear Availability
          </CardTitle>

          <p className="text-sm text-slate-500">
            Overview of your listed gears
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-center py-4">
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-8 border-[#d8e9e5]">
              <Package className="h-6 w-6 text-[#3f7167]" />

              <span className="mt-1 text-2xl font-bold text-slate-800">
                {gears.total}
              </span>

              <span className="text-xs text-slate-400">
                Total Gears
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <div className="mb-2 flex justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3f7167]" />

                  <span className="text-sm text-slate-600">
                    Available
                  </span>
                </div>

                <span className="text-sm font-semibold">
                  {gears.available}
                </span>
              </div>

              <div className="h-2 rounded-full bg-[#edf6f4]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${availablePercentage}%`,
                  }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-[#3f7167]"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-slate-400" />

                  <span className="text-sm text-slate-600">
                    Unavailable
                  </span>
                </div>

                <span className="text-sm font-semibold">
                  {gears.unavailable}
                </span>
              </div>

              <div className="h-2 rounded-full bg-[#edf6f4]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${unavailablePercentage}%`,
                  }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-slate-400"
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
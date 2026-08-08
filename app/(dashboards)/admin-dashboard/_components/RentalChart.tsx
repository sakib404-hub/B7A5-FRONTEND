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

import {
  CalendarDays,
  TrendingUp,
} from "lucide-react";

interface Props {
  rentals: {
    pending: number;
    confirmed: number;
    ongoing: number;
    completed: number;
    cancelled: number;
  };
}

export const RentalStatusChart = ({
  rentals,
}: Props) => {
  // Chart data
  const data = [
    {
      status: "Pending",
      value: rentals.pending,
      color: "hsl(38 92% 50%)",
    },
    {
      status: "Confirmed",
      value: rentals.confirmed,
      color: "hsl(217 91% 60%)",
    },
    {
      status: "Ongoing",
      value: rentals.ongoing,
      color: "hsl(262 83% 58%)",
    },
    {
      status: "Completed",
      value: rentals.completed,
      color: "hsl(142 71% 45%)",
    },
    {
      status: "Cancelled",
      value: rentals.cancelled,
      color: "hsl(0 84% 60%)",
    },
  ];

  // Total rentals
  const totalRentals =
    rentals.pending +
    rentals.confirmed +
    rentals.ongoing +
    rentals.completed +
    rentals.cancelled;

  // Completion percentage
  const completionRate =
    totalRentals > 0
      ? Math.round(
          (rentals.completed / totalRentals) * 100
        )
      : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.3,
      }}
      className="w-full"
    >
      <Card className="overflow-hidden">
        {/* =========================
            Header
        ========================== */}
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>

            <div>
              <CardTitle className="text-base font-semibold sm:text-lg">
                Rental Overview
              </CardTitle>

              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Current rental order status
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="flex items-center gap-5">
            {/* Total */}
            <div>
              <p className="text-xs text-muted-foreground">
                Total Rentals
              </p>

              <motion.p
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                }}
                className="text-xl font-bold"
              >
                {totalRentals}
              </motion.p>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            {/* Completion */}
            <div>
              <div className="flex items-center gap-1 text-xs text-primary">
                <TrendingUp className="h-3.5 w-3.5" />

                <span>Completion</span>
              </div>

              <p className="text-xl font-bold">
                {completionRate}%
              </p>
            </div>
          </div>
        </CardHeader>

        {/* =========================
            Chart
        ========================== */}
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 10,
                }}
              >
                {/* Grid */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                  opacity={0.6}
                />

                {/* X Axis */}
                <XAxis
                  dataKey="status"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                  }}
                />

                {/* Y Axis */}
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                  }}
                />

                {/* Bars */}
                <Bar
                  dataKey="value"
                  radius={[7, 7, 0, 0]}
                  animationBegin={200}
                  animationDuration={900}
                  animationEasing="ease-out"
                  minPointSize={3}
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* =========================
              Status Cards
          ========================== */}
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-4 sm:grid-cols-5">
            <StatusItem
              label="Pending"
              value={rentals.pending}
              color="hsl(38 92% 50%)"
            />

            <StatusItem
              label="Confirmed"
              value={rentals.confirmed}
              color="hsl(217 91% 60%)"
            />

            <StatusItem
              label="Ongoing"
              value={rentals.ongoing}
              color="hsl(262 83% 58%)"
            />

            <StatusItem
              label="Completed"
              value={rentals.completed}
              color="hsl(142 71% 45%)"
            />

            <StatusItem
              label="Cancelled"
              value={rentals.cancelled}
              color="hsl(0 84% 60%)"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* =========================================
   Status Item
========================================= */

interface StatusItemProps {
  label: string;
  value: number;
  color: string;
}

const StatusItem = ({
  label,
  value,
  color,
}: StatusItemProps) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-lg border border-border bg-muted/30 px-3 py-2 transition-colors hover:bg-muted/60"
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />

        <span className="text-xs text-muted-foreground">
          {label}
        </span>
      </div>

      <motion.p
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="mt-1 text-sm font-semibold"
      >
        {value}
      </motion.p>
    </motion.div>
  );
};
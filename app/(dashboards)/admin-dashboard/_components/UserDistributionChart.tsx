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
import { Users } from "lucide-react";

interface Props {
  users: {
    providers: number;
    customers: number;
  };
}

export const UserDistributionChart = ({ users }: Props) => {
  const data = [
    { name: "Customers", value: users.customers },
    { name: "Providers", value: users.providers },
  ];

  const totalUsers = users.customers + users.providers;
  const customerPercentage =
    totalUsers > 0 ? Math.round((users.customers / totalUsers) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <Card className="h-full rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-bold text-foreground">
              User Composition
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Customer vs Provider account base
            </p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Users className="size-4.5" />
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
                  <Cell fill="oklch(0.6 0.15 220)" />
                  <Cell fill="oklch(0.65 0.18 280)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-foreground">
                {totalUsers}
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Total Users
              </span>
            </div>
          </div>

          {/* Stats Breakdown */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-blue-500" />
                <span>Customers</span>
              </div>
              <p className="mt-1 text-lg font-bold text-foreground">
                {users.customers}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono">
                {customerPercentage}% of base
              </p>
            </div>

            <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-purple-500" />
                <span>Providers</span>
              </div>
              <p className="mt-1 text-lg font-bold text-foreground">
                {users.providers}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono">
                {totalUsers > 0 ? 100 - customerPercentage : 0}% of base
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
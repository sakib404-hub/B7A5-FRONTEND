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
    totalUsers > 0
      ? Math.round((users.customers / totalUsers) * 100)
      : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <Card className="border-border bg-card">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              User Distribution
            </CardTitle>

            <p className="mt-1 text-xs text-muted-foreground">
              Customers vs providers
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>

        <CardContent>
          {/* Chart */}
          <div className="relative h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={92}
                  paddingAngle={4}
                  cornerRadius={6}
                  stroke="none"
                  animationBegin={200}
                  animationDuration={900}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === 0
                          ? "hsl(var(--chart-1))"
                          : "hsl(var(--chart-3))"
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius-md)",
                    color: "hsl(var(--foreground))",
                  }}
                  labelStyle={{
                    color: "hsl(var(--muted-foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.4,
                }}
                className="text-3xl font-bold text-foreground"
              >
                {totalUsers}
              </motion.p>

              <p className="text-xs text-muted-foreground">
                Total Users
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {/* Customers */}
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]" />

                <span className="text-xs text-muted-foreground">
                  Customers
                </span>
              </div>

              <p className="text-xl font-semibold text-foreground">
                {users.customers}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {customerPercentage}% of users
              </p>
            </div>

            {/* Providers */}
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-3))]" />

                <span className="text-xs text-muted-foreground">
                  Providers
                </span>
              </div>

              <p className="text-xl font-semibold text-foreground">
                {users.providers}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {totalUsers > 0
                  ? 100 - customerPercentage
                  : 0}
                % of users
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
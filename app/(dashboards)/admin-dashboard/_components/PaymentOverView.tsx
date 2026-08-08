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

import {
  CreditCard,
  TrendingUp,
} from "lucide-react";

interface Props {
  payments: {
    total: number;
    paidOrders: number;
    unpaidOrders: number;
    totalRevenue: number;
  };
}

export const PaymentOverview = ({ payments }: Props) => {
  const data = [
    { name: "Paid", value: payments.paidOrders },
    { name: "Unpaid", value: payments.unpaidOrders },
  ];

  const paymentRate =
    payments.paidOrders + payments.unpaidOrders > 0
      ? Math.round(
          (payments.paidOrders /
            (payments.paidOrders + payments.unpaidOrders)) *
            100
        )
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
              Payment Overview
            </CardTitle>

            <p className="mt-1 text-xs text-muted-foreground">
              Payment and revenue summary
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>

        <CardContent>
          {/* Revenue */}
          <div className="mb-3">
            <p className="text-xs text-muted-foreground">
              Total Revenue
            </p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-1 text-3xl font-bold tracking-tight text-foreground"
            >
              ৳{payments.totalRevenue.toLocaleString()}
            </motion.p>

            <div className="mt-1 flex items-center gap-1 text-xs text-primary">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{payments.total} total payments</span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-47.5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={78}
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
                    color: "hsl(var(--primary))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-foreground"
              >
                {paymentRate}%
              </motion.p>

              <p className="text-xs text-muted-foreground">
                Payment Rate
              </p>
            </div>
          </div>

          {/* Payment Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-primary/5 p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">
                  Paid
                </span>
              </div>

              <p className="text-xl font-semibold text-foreground">
                {payments.paidOrders}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Unpaid
                </span>
              </div>

              <p className="text-xl font-semibold text-foreground">
                {payments.unpaidOrders}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm text-muted-foreground">
              Payment records
            </span>

            <span className="font-semibold text-foreground">
              {payments.total}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
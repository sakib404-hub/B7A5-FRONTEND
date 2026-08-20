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
import { CreditCard, TrendingUp } from "lucide-react";

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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="h-full"
    >
      <Card className="h-full rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-bold text-foreground">
              Revenue & Settlements
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Platform transaction performance
            </p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CreditCard className="size-4.5" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {/* Revenue Headline */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Gross Platform Revenue
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">
              ${payments.totalRevenue.toLocaleString()}
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="size-3.5" />
              <span>{payments.total} successful transactions</span>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="relative h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={72}
                  paddingAngle={4}
                  cornerRadius={6}
                  stroke="none"
                >
                  <Cell fill="oklch(0.53 0.17 155)" />
                  <Cell fill="oklch(0.7 0.18 45)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-foreground">
                {paymentRate}%
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Settled
              </span>
            </div>
          </div>

          {/* Stats Breakdown */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span>Paid Orders</span>
              </div>
              <p className="mt-1 text-lg font-bold text-foreground">
                {payments.paidOrders}
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-amber-500" />
                <span>Unpaid</span>
              </div>
              <p className="mt-1 text-lg font-bold text-foreground">
                {payments.unpaidOrders}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
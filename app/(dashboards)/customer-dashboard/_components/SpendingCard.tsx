"use client";

import { motion } from "framer-motion";
import { CreditCard, Sparkles, TrendingUp, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SpendingCardProps {
  totalSpent: number;
}

const SpendingCard = ({ totalSpent }: SpendingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Rental Budget
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Total expenditure to date
            </p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CreditCard className="size-4.5" />
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-4">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-card to-background p-6">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Wallet className="size-5" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="size-3" />
                Verified
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Amount Paid
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                ${totalSpent.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-muted/40 p-3.5 text-xs text-muted-foreground flex items-center gap-2">
            <TrendingUp className="size-4 shrink-0 text-primary" />
            <span>Rental spending updates in real-time as orders are paid and settled.</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SpendingCard;
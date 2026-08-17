"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet } from "lucide-react";

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full overflow-hidden rounded-2xl border-[#d8e9e5] bg-white shadow-[0_4px_20px_rgba(63,113,103,0.07)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-slate-800">
                Spending
              </CardTitle>

              <p className="mt-1 text-sm text-slate-500">
                Your total rental spending
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f3f0]">
              <CreditCard className="h-5 w-5 text-[#3f7167]" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-[#edf6f4] p-6"
          >
            <Wallet className="mb-3 h-6 w-6 text-[#3f7167]" />

            <p className="text-sm text-slate-500">
              Total Spent
            </p>

            <h2 className="mt-1 text-3xl font-bold text-[#3f7167]">
              ${totalSpent}
            </h2>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SpendingCard;
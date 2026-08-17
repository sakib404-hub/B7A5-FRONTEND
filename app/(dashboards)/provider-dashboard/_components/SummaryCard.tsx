"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  CheckCircle2,
  ShoppingBag,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface ProviderSummaryCardsProps {
  summary: {
    gears: {
      total: number;
      available: number;
      unavailable: number;
    };
    orders: {
      total: number;
      pending: number;
      confirmed: number;
      pickedUp: number;
      returned: number;
      cancelled: number;
    };
    earnings: {
      total: number;
    };
  };
}

const ProviderSummaryCards = ({
  summary,
}: ProviderSummaryCardsProps) => {
  const cards = [
    {
      title: "Total Gears",
      value: summary.gears.total,
      description: "Gears listed by you",
      icon: Boxes,
    },
    {
      title: "Available Gears",
      value: summary.gears.available,
      description: "Currently available",
      icon: CheckCircle2,
    },
    {
      title: "Total Orders",
      value: summary.orders.total,
      description: "Rental orders received",
      icon: ShoppingBag,
    },
    {
      title: "Total Earnings",
      value: `$${summary.earnings.total}`,
      description: "From rental orders",
      icon: Wallet,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -4,
            }}
          >
            <Card className="rounded-2xl border-[#d8e9e5] bg-white shadow-[0_4px_20px_rgba(63,113,103,0.07)]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {card.title}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-800">
                      {card.value}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      {card.description}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f3f0]">
                    <Icon className="h-5 w-5 text-[#3f7167]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProviderSummaryCards;
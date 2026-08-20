"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  CheckCircle2,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
      title: "Total Listings",
      value: summary.gears.total,
      description: "Equipment listed by you",
      icon: Boxes,
      colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      title: "Ready to Rent",
      value: summary.gears.available,
      description: "Currently available stock",
      icon: CheckCircle2,
      colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Total Bookings",
      value: summary.orders.total,
      description: "Orders received from users",
      icon: ShoppingBag,
      colorClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    {
      title: "Total Revenue",
      value: `$${summary.earnings.total.toLocaleString()}`,
      description: "Net earnings from rentals",
      icon: Wallet,
      colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.06,
            }}
            whileHover={{
              y: -3,
            }}
          >
            <Card className="rounded-2xl border border-border/60 bg-card p-5 shadow-xs transition-all duration-200 hover:border-primary/30 hover:shadow-md">
              <CardContent className="p-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {card.title}
                    </p>

                    <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {card.value}
                    </h3>

                    <p className="text-xs text-muted-foreground/80">
                      {card.description}
                    </p>
                  </div>

                  <div className={`flex size-11 items-center justify-center rounded-xl border ${card.colorClass}`}>
                    <Icon className="size-5" />
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
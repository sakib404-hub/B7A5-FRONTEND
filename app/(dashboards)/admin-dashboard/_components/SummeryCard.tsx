"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  colorClass?: string;
}

export const SummaryCard = ({
  title,
  value,
  description,
  icon: Icon,
  colorClass = "bg-primary/10 text-primary border-primary/20",
}: SummaryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
      className="h-full"
    >
      <Card className="h-full rounded-2xl border border-border/60 bg-card p-5 shadow-xs transition-all duration-200 hover:border-primary/30 hover:shadow-md">
        <CardContent className="flex h-full items-center justify-between p-0">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </p>

            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {value}
            </h3>

            {description && (
              <p className="text-xs text-muted-foreground/80">
                {description}
              </p>
            )}
          </div>

          <div className={`flex size-11 items-center justify-center rounded-xl border ${colorClass}`}>
            <Icon className="size-5" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
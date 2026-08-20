"use client";

import { motion } from "framer-motion";
import {
  Package,
  Layers,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EditGearDialog } from "./EditGear";
import { DeleteGearDialog } from "./DeleteGear";

interface GearCardProps {
  gear: {
    id: string;
    title: string;
    description: string;
    pricePerDay: number;
    stockQuantity: number;
    status: string;
    image?: string;
  };
  index: number;
}

export const GearCard = ({ gear, index }: GearCardProps) => {
  const isAvailable = gear.status === "AVAILABLE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs transition-all duration-200 hover:border-primary/30 hover:shadow-md"
    >
      <div>
        {/* Gear Image Container */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-muted/40">
          {gear.image ? (
            <img
              src={gear.image}
              alt={gear.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted/30 text-muted-foreground/50">
              <Package className="size-12" />
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute right-3 top-3">
            <Badge
              variant="outline"
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${
                isAvailable
                  ? "border-emerald-500/40 bg-emerald-500/90 text-white shadow-xs"
                  : "border-rose-500/40 bg-rose-500/90 text-white shadow-xs"
              }`}
            >
              <span
                className={`mr-1.5 size-1.5 rounded-full ${
                  isAvailable ? "bg-white animate-pulse" : "bg-white"
                }`}
              />
              {gear.status}
            </Badge>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-3 p-5">
          <div>
            <h3 className="line-clamp-1 text-base font-bold text-foreground group-hover:text-primary transition-colors">
              {gear.title}
            </h3>
            <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-relaxed text-muted-foreground">
              {gear.description}
            </p>
          </div>

          {/* Price & Stock Stats */}
          <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Daily Rate
              </p>
              <p className="mt-0.5 text-lg font-extrabold text-primary">
                ${gear.pricePerDay}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  / day
                </span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Units in Stock
              </p>
              <p className="mt-0.5 font-mono text-sm font-bold text-foreground">
                {gear.stockQuantity} available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="border-t border-border/50 bg-muted/10 p-4">
        <div className="flex items-center gap-2">
          <EditGearDialog gear={gear} />
          <DeleteGearDialog gear={gear} />
        </div>
      </div>
    </motion.div>
  );
};
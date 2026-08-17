"use client";

import { motion } from "framer-motion";
import {
  Edit,
  Package,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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

export const GearCard = ({
  gear,
  index,
}: GearCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
      }}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-emerald-100
        bg-linear-to-br
        from-emerald-50/80
        via-white
        to-teal-50/50
        shadow-sm
        transition-all
        duration-300
        hover:border-emerald-200
        hover:shadow-lg
      "
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-emerald-100/40">
        {gear.image ? (
          <img
            src={gear.image}
            alt={gear.title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-12 w-12 text-emerald-300" />
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

        {/* Status */}
        <div className="absolute right-3 top-3">
          <Badge
            variant="outline"
            className={
              gear.status === "AVAILABLE"
                ? "border-emerald-200 bg-emerald-50/95 text-emerald-700 backdrop-blur-sm"
                : "border-red-200 bg-red-50/95 text-red-700 backdrop-blur-sm"
            }
          >
            <span
              className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                gear.status === "AVAILABLE"
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            />

            {gear.status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Title & Description */}
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-slate-800">
            {gear.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
            {gear.description}
          </p>
        </div>

        {/* Price & Stock */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-emerald-700">
              ${gear.pricePerDay}
              <span className="ml-1 text-xs font-normal text-slate-500">
                / day
              </span>
            </p>
          </div>

          <div className="rounded-lg bg-white/70 px-3 py-1.5 text-right ring-1 ring-emerald-100">
            <p className="text-xs text-slate-400">
              Stock
            </p>

            <p className="text-sm font-semibold text-slate-700">
              {gear.stockQuantity}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 border-t border-emerald-100 pt-4">
          {/* Edit */}
          <EditGearDialog gear={gear} />

          {/* Delete */}
          <DeleteGearDialog gear={gear} />
        </div>
      </div>
    </motion.div>
  );
};
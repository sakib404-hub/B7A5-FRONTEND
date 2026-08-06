"use client";

import { GearCardProps } from "@/types/types";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Package,
  Star,
  User,
} from "lucide-react";


const GearCard = ({ gear }: GearCardProps) => {
  const averageRating =
    gear.reviews.length > 0
      ? gear.reviews.reduce(
          (total, review) => total + (review.rating || 0),
          0
        ) / gear.reviews.length
      : 0;

  const isAvailable =
    gear.status === "AVAILABLE" && gear.stockQuantity > 0;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
      }}
      className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Image Placeholder */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-muted">
        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex h-20 w-20 items-center justify-center rounded-2xl bg-background shadow-sm"
        >
          <Package className="h-10 w-10 text-primary" />
        </motion.div>

        {/* Availability Badge */}
        <div className="absolute right-4 top-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isAvailable
                ? "bg-background text-primary"
                : "bg-background text-muted-foreground"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand */}
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {gear.brand}
        </p>

        {/* Title */}
        <h3 className="mt-1 line-clamp-1 text-lg font-bold">
          {gear.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {gear.description}
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-amber-500" />

            <span className="text-sm font-semibold">
              {averageRating > 0
                ? averageRating.toFixed(1)
                : "New"}
            </span>
          </div>

          <span className="text-xs text-muted-foreground">
            ({gear.reviews.length}{" "}
            {gear.reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>

        {/* Provider */}
        <div className="mt-4 flex items-center gap-2 border-t pt-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-3.5 w-3.5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              Provided by
            </p>

            <p className="truncate text-sm font-medium">
              {gear.provider.name}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">
              ${gear.pricePerDay}
            </span>

            <span className="ml-1 text-xs text-muted-foreground">
              / day
            </span>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            disabled={!isAvailable}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            View Gear
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Stock */}
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />

          {gear.stockQuantity > 0
            ? `${gear.stockQuantity} available`
            : "Currently unavailable"}
        </div>
      </div>

      {/* Animated bottom border */}
      <motion.div
        initial={{
          width: 0,
        }}
        whileHover={{
          width: "100%",
        }}
        transition={{
          duration: 0.3,
        }}
        className="h-1 bg-primary"
      />
    </motion.article>
  );
};

export default GearCard;

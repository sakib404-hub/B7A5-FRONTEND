"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gear } from "./gearDetails";

interface GearBookingCardProps {
  gear: Gear;
}

export const GearBookingCard = ({
  gear,
}: GearBookingCardProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference =
      end.getTime() - start.getTime();

    const days = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return days > 0 ? days : 0;
  }, [startDate, endDate]);

  const total = rentalDays * gear.pricePerDay * quantity;

  const increaseQuantity = () => {
    if (quantity < gear.stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRent = () => {
    if (!startDate || !endDate || rentalDays <= 0) {
      return;
    }

    console.log({
      gearId: gear.id,
      startDate,
      endDate,
      rentalDays,
      quantity,
      total,
    });

    // Later:
    // router.push(`/checkout?gearId=${gear.id}...`)
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm"
    >
      <div className="flex items-end justify-between border-b pb-5">
        <div>
          <span className="text-3xl font-bold">
            ${gear.pricePerDay}
          </span>

          <span className="text-muted-foreground">
            {" "}
            / day
          </span>
        </div>

        <span className="text-sm text-muted-foreground">
          {gear.stockQuantity} available
        </span>
      </div>

      <div className="space-y-5 pt-5">
        <div className="space-y-2">
          <label
            htmlFor="startDate"
            className="text-sm font-medium"
          >
            Start date
          </label>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="startDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="endDate"
            className="text-sm font-medium"
          >
            End date
          </label>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="endDate"
              type="date"
              min={
                startDate ||
                new Date().toISOString().split("T")[0]
              }
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">
            Quantity
          </p>

          <div className="flex w-fit items-center rounded-lg border">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-10 text-center font-medium">
              {quantity}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={increaseQuantity}
              disabled={quantity >= gear.stockQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {rentalDays > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3 rounded-xl bg-muted/50 p-4"
          >
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {gear.pricePerDay} × {rentalDays} days
              </span>

              <span>
                ${(gear.pricePerDay * rentalDays).toFixed(2)}
              </span>
            </div>

            {quantity > 1 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Quantity
                </span>

                <span>× {quantity}</span>
              </div>
            )}

            <div className="flex justify-between border-t pt-3 font-semibold">
              <span>Total</span>

              <span className="text-lg text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
          </motion.div>
        )}

        <Button
          className="h-12 w-full gap-2"
          size="lg"
          disabled={
            gear.status !== "AVAILABLE" ||
            !startDate ||
            !endDate ||
            rentalDays <= 0
          }
          onClick={handleRent}
        >
          <ShoppingCart className="h-5 w-5" />

          {gear.status !== "AVAILABLE"
            ? "Currently unavailable"
            : rentalDays > 0
              ? "Rent This Gear"
              : "Select Rental Dates"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          You won't be charged until your rental is confirmed.
        </p>
      </div>
    </motion.div>
  );
};
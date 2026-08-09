"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gear } from "./gearDetails";

interface GearBookingCardProps {
  gear: Gear;
}

interface RentalFormData {
  startDate: string;
  endDate: string;
  quantity: number;
}

export const GearBookingCard = ({
  gear,
}: GearBookingCardProps) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RentalFormData>({
    defaultValues: {
      startDate: "",
      endDate: "",
      quantity: 1,
    },
    mode: "onChange",
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const quantity = watch("quantity");

  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference =
      end.getTime() - start.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  }, [startDate, endDate]);

  const total =
    rentalDays * gear.pricePerDay * quantity;

  const increaseQuantity = () => {
    if (quantity < gear.stockQuantity) {
      setValue("quantity", quantity + 1, {
        shouldValidate: true,
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setValue("quantity", quantity - 1, {
        shouldValidate: true,
      });
    }
  };

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const onSubmit: SubmitHandler<RentalFormData> = async (
    data
  ) => {
    console.log({
      gearId: gear.id,
      startDate: data.startDate,
      endDate: data.endDate,
      rentalDays,
      quantity: data.quantity,
      total,
    });

    // Server action will be called here
    //
    // await createRentalOrder({
    //   gearId: gear.id,
    //   startDate: data.startDate,
    //   endDate: data.endDate,
    //   rentalDays,
    //   quantity: data.quantity,
    // });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.15,
      }}
      className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold">
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

        {/* Start Date */}
        <div className="space-y-2">
          <label
            htmlFor="startDate"
            className="text-sm font-medium"
          >
            Start date
          </label>

          <Controller
            name="startDate"
            control={control}
            rules={{
              required: "Start date is required",
              validate: (value) => {
                if (value < today) {
                  return "Start date cannot be in the past";
                }

                return true;
              },
            }}
            render={({ field }) => (
              <div>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    {...field}
                    id="startDate"
                    type="date"
                    min={today}
                    className="pl-10"
                  />
                </div>

                {errors.startDate && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label
            htmlFor="endDate"
            className="text-sm font-medium"
          >
            End date
          </label>

          <Controller
            name="endDate"
            control={control}
            rules={{
              required: "End date is required",
              validate: (value) => {
                if (!startDate) {
                  return "Select start date first";
                }

                const start = new Date(startDate);
                const end = new Date(value);

                const days = Math.ceil(
                  (end.getTime() - start.getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                if (days <= 0) {
                  return "Rental duration must be greater than 0 days";
                }

                if (days > 14) {
                  return "Rental duration must be less than 15 days";
                }

                return true;
              },
            }}
            render={({ field }) => (
              <div>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    {...field}
                    id="endDate"
                    type="date"
                    min={startDate || today}
                    className="pl-10"
                  />
                </div>

                {errors.endDate && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Rental Days Information */}
        {rentalDays > 0 && (
          <div className="rounded-lg bg-muted/50 px-4 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Rental duration
              </span>

              <span className="font-medium">
                {rentalDays} days
              </span>
            </div>

            {rentalDays >= 14 && (
              <p className="mt-1 text-xs text-destructive">
                Maximum rental duration is 13 days.
              </p>
            )}
          </div>
        )}

        {/* Quantity */}
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
              disabled={
                quantity >= gear.stockQuantity
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {quantity >= gear.stockQuantity && (
            <p className="text-xs text-muted-foreground">
              Maximum available quantity reached.
            </p>
          )}
        </div>

        {/* Price Summary */}
        {rentalDays > 0 && rentalDays < 14 && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="space-y-3 rounded-xl bg-muted/50 p-4"
          >
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                ${gear.pricePerDay} × {rentalDays} days
              </span>

              <span>
                ${(
                  gear.pricePerDay * rentalDays
                ).toFixed(2)}
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

        {/* Submit */}
        <Button
          type="submit"
          className="h-12 w-full gap-2"
          size="lg"
          disabled={
            gear.status !== "AVAILABLE" ||
            isSubmitting
          }
        >
          <ShoppingCart className="h-5 w-5" />

          {gear.status !== "AVAILABLE"
            ? "Currently unavailable"
            : isSubmitting
              ? "Processing..."
              : rentalDays > 0 && rentalDays < 14
                ? "Rent This Gear"
                : "Select Rental Dates"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          You won't be charged until your rental is
          confirmed.
        </p>
      </form>
    </motion.div>
  );
};

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Lock,
  LogIn,
  ShoppingCart,
} from "lucide-react";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gear } from "./gearDetails";
import { createOrders } from "../_action/createOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/types";

interface GearBookingCardProps {
  gear: Gear;
  user?: IUser | null;
}

interface RentalFormData {
  startDate: string;
  endDate: string;
  quantity: number;
}

export const GearBookingCard = ({
  gear,
  user,
}: GearBookingCardProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RentalFormData>({
    defaultValues: {
      startDate: "",
      endDate: "",
      quantity: 1,
    },
    mode: "onChange",
  });

  const router = useRouter();

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const quantity = watch("quantity");

  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference = end.getTime() - start.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  const total = rentalDays * gear.pricePerDay * quantity;

  const today = new Date().toISOString().split("T")[0];

  const onSubmit: SubmitHandler<RentalFormData> = async () => {
    if (!user) {
      toast.error("You must be logged in to rent equipment.");
      router.push(`/login?redirect=/gear/${gear.id}`);
      return;
    }

    const payLoad = {
      gearId: gear.id,
      rentalDays: rentalDays,
    };

    const response = await createOrders(payLoad);

    if (!response.success) {
      toast.error(response.message || "Failed to create rental order.");
      return;
    }

    toast.success(response.message || "Rental order placed successfully!");
    router.push("/customer-dashboard/orders");
    router.refresh();
  };

  const isAvailable = gear.status === "AVAILABLE" && gear.stockQuantity > 0;

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Price & Stock */}
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <span className="text-2xl font-bold text-foreground">
              ${gear.pricePerDay}
            </span>
            <span className="text-muted-foreground text-sm"> / day</span>
          </div>

          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              isAvailable
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isAvailable ? `${gear.stockQuantity} available` : "Unavailable"}
          </span>
        </div>

        {/* Not Logged In Warning Banner */}
        {!user && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Lock className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Login Required to Rent</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
              You must be signed in to your GearUp account to select rental dates
              and reserve this equipment.
            </p>
          </div>
        )}

        {/* Start Date */}
        <div className="space-y-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            Start date
          </label>

          <Controller
            name="startDate"
            control={control}
            rules={{
              required: user ? "Start date is required" : false,
              validate: (value) => {
                if (!user) return true;
                if (value && value < today) {
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
                    disabled={!user || !isAvailable}
                    className="pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
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
          <label htmlFor="endDate" className="text-sm font-medium">
            End date
          </label>

          <Controller
            name="endDate"
            control={control}
            rules={{
              required: user ? "End date is required" : false,
              validate: (value) => {
                if (!user) return true;
                if (!startDate) {
                  return "Select start date first";
                }

                const start = new Date(startDate);
                const end = new Date(value);

                const days = Math.ceil(
                  (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
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
                    disabled={!user || !isAvailable}
                    className="pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
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
        {user && rentalDays > 0 && (
          <div className="rounded-lg bg-muted/50 px-4 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rental duration</span>
              <span className="font-medium">{rentalDays} days</span>
            </div>

            {rentalDays >= 14 && (
              <p className="mt-1 text-xs text-destructive">
                Maximum rental duration is 13 days.
              </p>
            )}
          </div>
        )}

        {/* Price Summary */}
        {user && rentalDays > 0 && rentalDays < 14 && (
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
              <span>${(gear.pricePerDay * rentalDays).toFixed(2)}</span>
            </div>

            {quantity > 1 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quantity</span>
                <span>× {quantity}</span>
              </div>
            )}

            <div className="flex justify-between border-t pt-3 font-semibold">
              <span>Total</span>
              <span className="text-lg text-primary">${total.toFixed(2)}</span>
            </div>
          </motion.div>
        )}

        {/* Action Button: Sign In Required VS Rent This Gear */}
        {!user ? (
          <div className="space-y-2 pt-2">
            <Button
              type="button"
              asChild
              className="h-12 w-full gap-2 shadow-sm font-semibold cursor-pointer"
              size="lg"
            >
              <Link href={`/login`}>
                <LogIn className="size-4" />
                Sign In to Rent Equipment
              </Link>
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        ) : (
          <Button
            type="submit"
            className="h-12 w-full gap-2 font-semibold cursor-pointer"
            size="lg"
            disabled={
              !isAvailable ||
              isSubmitting ||
              rentalDays <= 0 ||
              rentalDays >= 14
            }
          >
            <ShoppingCart className="h-5 w-5" />
            {!isAvailable
              ? "Currently Unavailable"
              : isSubmitting
              ? "Processing..."
              : rentalDays > 0 && rentalDays < 14
              ? "Rent This Gear"
              : "Select Rental Dates"}
          </Button>
        )}

        <p className="text-center text-xs text-muted-foreground">
          You won&apos;t be charged until your rental is confirmed.
        </p>
      </form>
    </motion.div>
  );
};

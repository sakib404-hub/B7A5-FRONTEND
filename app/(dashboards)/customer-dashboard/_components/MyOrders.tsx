"use client";

import { motion } from "framer-motion";
import {
  Package
} from "lucide-react";


import { Badge } from "@/components/ui/badge";
import { OrderCard } from "./OrderCard";

export interface Order {
  id: string;
  userId: string;
  gearId: string;
  totalAmount: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "ONGOING"
    | "COMPLETED"
    | "CANCELLED";
  rentalDays: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;

  gear: {
    provider: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface MyOrdersProps {
  orders: Order[];
}


//? empty orders 
const EmptyOrders = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="rounded-xl border border-dashed border-[#cfe2dd] bg-white p-12 text-center"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f3f0]">
        <Package className="h-6 w-6 text-[#3f7167]" />
      </div>

      <h3 className="mt-4 font-semibold text-slate-800">
        No rental orders yet
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Your gear rental orders will appear here once
        you make a booking.
      </p>
    </motion.div>
  );
};

export const MyOrders = ({
  orders,
}: MyOrdersProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.15,
              duration: 0.35,
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f3f0]"
          >
            <Package className="h-5 w-5 text-[#3f7167]" />
          </motion.div>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
              My Rental Orders
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500 md:text-base">
              Track your gear rentals, payment status, and
              order progress in one place.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Order count */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
          duration: 0.35,
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">
            Total Orders
          </span>

          <Badge
            variant="outline"
            className="border-[#cfe2dd] bg-[#e8f3f0] text-[#3f7167]"
          >
            {orders.length}
          </Badge>
        </div>
      </motion.div>

      {/* Orders */}
      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="grid gap-4">
          {orders.map((order, index) => (
            <OrderCard
              key={order.id}
              order={order}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};
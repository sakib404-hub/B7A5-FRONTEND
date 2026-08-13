"use client";

import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateStatus } from "../_action/updateOrderStatus";
import { Spinner } from "@/components/ui/spinner";

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PICKED_UP = "PICKED_UP",
  RETURNED = "RETURNED",
  CANCELLED = "CANCELLED",
}

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: OrderStatus;
  isPaid: boolean;
}

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PICKED_UP: "Picked Up",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

/**
 * Defines valid status transitions.
 */
const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [
    OrderStatus.CONFIRMED,
    OrderStatus.CANCELLED,
  ],

  [OrderStatus.CONFIRMED]: [
    OrderStatus.PICKED_UP,
    OrderStatus.CANCELLED,
  ],

  [OrderStatus.PICKED_UP]: [
    OrderStatus.RETURNED,
  ],

  [OrderStatus.RETURNED]: [],

  [OrderStatus.CANCELLED]: [],
};

export const OrderStatusSelect = ({
  orderId,
  currentStatus,
  isPaid,
}: OrderStatusSelectProps) => {
  const router = useRouter();

  const [status, setStatus] =
    useState<OrderStatus>(currentStatus);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  /**
   * Returned and Cancelled are final statuses.
   */
  const isTerminal =
    currentStatus === OrderStatus.RETURNED ||
    currentStatus === OrderStatus.CANCELLED;

  /**
   * Payment is required for operational
   * statuses such as PICKED_UP.
   *
   * But payment is NOT required for:
   * PENDING → CONFIRMED
   * PENDING → CANCELLED
   */
  const requiresPayment = (
    nextStatus: OrderStatus
  ) => {
    return (
      nextStatus === OrderStatus.PICKED_UP ||
      nextStatus === OrderStatus.RETURNED
    );
  };

  const availableStatuses =
    allowedTransitions[currentStatus].filter(
      (nextStatus) => {
        // Provider can confirm/cancel without payment
        if (
          nextStatus === OrderStatus.CONFIRMED ||
          nextStatus === OrderStatus.CANCELLED
        ) {
          return true;
        }

        // Pickup/return require payment
        if (requiresPayment(nextStatus)) {
          return isPaid;
        }

        return true;
      }
    );

  const handleUpdate = async () => {
    if (isTerminal) {
      return;
    }

    if (status === currentStatus) {
      return;
    }

    /**
     * Prevent provider from moving forward
     * without payment.
     */
    if (requiresPayment(status) && !isPaid) {
      toast.error(
        "Payment is required before updating this order."
      );

      return;
    }

    try {
      setLoading(true);

      const result = await updateStatus(orderId as string, status);

      if(!result.success){
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );

      toast.error(
        "Failed to update order status"
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Terminal order
   */
  if (isTerminal) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-800">
            Order Status
          </p>

          <p className="text-xs text-muted-foreground">
            This order has reached its final status and
            cannot be updated.
          </p>
        </div>

        <div
          className={
            currentStatus === OrderStatus.RETURNED
              ? "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
              : "rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
          }
        >
          {currentStatus === OrderStatus.RETURNED
            ? "Returned"
            : "Cancelled"}
        </div>
      </div>
    );
  }

  /**
   * PENDING order
   *
   * Provider can confirm or cancel even though
   * payment hasn't happened yet.
   */
  if (currentStatus === OrderStatus.PENDING) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-800">
            Confirm Order
          </p>

          <p className="text-xs text-muted-foreground">
            Confirm the order to allow the customer to make
            the payment.
          </p>
        </div>

        <div className="flex gap-2">
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as OrderStatus)
            }
            disabled={loading}
          >
            <SelectTrigger className="w-40 bg-white">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {availableStatuses.map(
                (statusValue) => (
                  <SelectItem
                    key={statusValue}
                    value={statusValue}
                  >
                    {statusLabels[statusValue]}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Button
            onClick={handleUpdate}
            disabled={
              loading ||
              status === currentStatus
            }
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? 
              <span className="flex items-center justify-center">
                <Spinner></Spinner>
                Updating...
              </span> : "Update"
            }
          </Button>
        </div>
      </div>
    );
  }

  /**
   * CONFIRMED but unpaid
   */
  if (
    currentStatus === OrderStatus.CONFIRMED &&
    !isPaid
  ) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-800">
            Waiting for Payment
          </p>

          <p className="text-xs text-muted-foreground">
            The order is confirmed. Waiting for the customer
            to complete payment.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
          <Lock className="h-4 w-4" />
          Payment Required
        </div>
      </div>
    );
  }

  /**
   * CONFIRMED + PAID
   *
   * Provider can now mark it as PICKED_UP
   * or CANCELLED.
   */
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-800">
          Update Order Status
        </p>

        <p className="text-xs text-muted-foreground">
          Change the status as the rental progresses.
        </p>
      </div>

      <div className="flex gap-2">
        <Select
          value={status}
          onValueChange={(value) =>
            setStatus(value as OrderStatus)
          }
          disabled={loading}
        >
          <SelectTrigger className="w-40 bg-white">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {availableStatuses.map(
              (statusValue) => (
                <SelectItem
                  key={statusValue}
                  value={statusValue}
                >
                  {statusLabels[statusValue]}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <Button
          onClick={handleUpdate}
          disabled={
            loading ||
            status === currentStatus
          }
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {loading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}

          Update
        </Button>
      </div>
    </div>
  );
};
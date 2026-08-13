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
 * Defines which status can follow which status.
 */
const allowedTransitions: Record<
  OrderStatus,
  OrderStatus[]
> = {
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

  /**
   * Keep local status synchronized
   * when router.refresh() gets new server data.
   */
  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  /**
   * Terminal statuses cannot be changed.
   */
  const isTerminal =
    currentStatus === OrderStatus.RETURNED ||
    currentStatus === OrderStatus.CANCELLED;

  /**
   * Provider can only update a paid,
   * non-terminal order.
   */
  const canUpdate = isPaid && !isTerminal;

  /**
   * Valid next statuses.
   */
  const availableStatuses =
    allowedTransitions[currentStatus];

  const handleUpdate = async () => {
    if (!canUpdate) {
      return;
    }

    if (status === currentStatus) {
      return;
    }

    try {
      setLoading(true);

      /*
       * Later connect your server action:
       *
       * const result = await updateOrderStatus({
       *   orderId,
       *   status,
       * });
       */

      console.log({
        orderId,
        status,
      });

      /*
       * Temporary success.
       * Remove this when connecting API.
       */
      toast.success(
        `Order status changed to ${statusLabels[status]}`
      );

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

  /* -------------------------------- */
  /* UNPAID                           */
  /* -------------------------------- */

  if (!isPaid) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-800">
            Order Status
          </p>

          <p className="text-xs text-muted-foreground">
            Status can be updated after payment is completed.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
          <Lock className="h-4 w-4" />

          Payment Required
        </div>
      </div>
    );
  }

  /* -------------------------------- */
  /* TERMINAL                         */
  /* -------------------------------- */

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

  /* -------------------------------- */
  /* EDITABLE                         */
  /* -------------------------------- */

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
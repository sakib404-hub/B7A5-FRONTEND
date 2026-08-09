"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

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
}

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PICKED_UP: "Picked Up",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

export const OrderStatusSelect = ({
  orderId,
  currentStatus,
}: OrderStatusSelectProps) => {
  const [status, setStatus] =
    useState<OrderStatus>(currentStatus);

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (status === currentStatus) {
      return;
    }

    try {
      setLoading(true);

      console.log({
        orderId,
        status,
      });

      // Later:
      // const result = await updateOrderStatus({
      //   orderId,
      //   status,
      // });

    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

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
            {Object.values(OrderStatus).map(
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
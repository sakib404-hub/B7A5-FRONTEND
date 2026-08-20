"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Lock, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateStatus } from "../_action/updateOrderStatus";

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

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PICKED_UP, OrderStatus.CANCELLED],
  [OrderStatus.PICKED_UP]: [OrderStatus.RETURNED],
  [OrderStatus.RETURNED]: [],
  [OrderStatus.CANCELLED]: [],
};

export const OrderStatusSelect = ({
  orderId,
  currentStatus,
  isPaid,
}: OrderStatusSelectProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const isTerminal =
    currentStatus === OrderStatus.RETURNED ||
    currentStatus === OrderStatus.CANCELLED;

  const requiresPayment = (nextStatus: OrderStatus) => {
    return (
      nextStatus === OrderStatus.PICKED_UP ||
      nextStatus === OrderStatus.RETURNED
    );
  };

  const availableStatuses = allowedTransitions[currentStatus]?.filter(
    (nextStatus) => {
      if (
        nextStatus === OrderStatus.CONFIRMED ||
        nextStatus === OrderStatus.CANCELLED
      ) {
        return true;
      }
      if (requiresPayment(nextStatus)) {
        return isPaid;
      }
      return true;
    }
  ) || [];

  const handleUpdate = async () => {
    if (isTerminal || status === currentStatus) return;

    if (requiresPayment(status) && !isPaid) {
      toast.error("Customer payment is required before advancing this order.");
      return;
    }

    try {
      setLoading(true);
      const result = await updateStatus(orderId as string, status);

      if (!result.success) {
        toast.error(result.message || "Failed to update status");
        return;
      }

      toast.success(result.message || "Order status updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  if (isTerminal) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs">
        <div>
          <p className="font-semibold text-foreground">Order Lifecycle Concluded</p>
          <p className="text-muted-foreground">
            This order has reached its final state and cannot be modified.
          </p>
        </div>

        <Badge
          variant="outline"
          className={`rounded-lg px-3 py-1 text-xs font-semibold ${
            currentStatus === OrderStatus.RETURNED
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
          }`}
        >
          {currentStatus === OrderStatus.RETURNED ? (
            <>
              <CheckCircle2 className="mr-1.5 size-3.5" />
              Returned & Completed
            </>
          ) : (
            <>
              <XCircle className="mr-1.5 size-3.5" />
              Cancelled
            </>
          )}
        </Badge>
      </div>
    );
  }

  if (currentStatus === OrderStatus.CONFIRMED && !isPaid) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold text-foreground">Awaiting Customer Payment</p>
          <p className="text-xs text-muted-foreground">
            You confirmed this order. Equipment handoff is unlocked once the customer completes payment.
          </p>
        </div>

        <Badge
          variant="outline"
          className="w-fit rounded-lg border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400"
        >
          <Lock className="mr-1.5 size-3.5" />
          Awaiting Payment
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold text-foreground">
          {currentStatus === OrderStatus.PENDING
            ? "Confirm or Decline Rental"
            : "Update Handoff Status"}
        </p>
        <p className="text-xs text-muted-foreground">
          {currentStatus === OrderStatus.PENDING
            ? "Confirm to enable customer payment and reserve this equipment."
            : "Update status as the customer picks up and returns the equipment."}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={status}
          onValueChange={(val) => setStatus(val as OrderStatus)}
          disabled={loading}
        >
          <SelectTrigger className="w-38 rounded-xl bg-background text-xs font-medium">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="rounded-xl">
            {availableStatuses.map((statusValue) => (
              <SelectItem
                key={statusValue}
                value={statusValue}
                className="text-xs font-medium"
              >
                {statusLabels[statusValue]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          size="sm"
          onClick={handleUpdate}
          disabled={loading || status === currentStatus}
          className="rounded-xl font-semibold shadow-xs text-xs h-9 px-4"
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <Loader2 className="size-3.5 animate-spin" />
              Updating...
            </span>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
};
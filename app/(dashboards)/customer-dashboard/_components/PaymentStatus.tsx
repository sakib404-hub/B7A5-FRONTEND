"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, Loader2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { handlePayment } from "../_actions/handlePayment";
import { Order } from "./MyOrders";

interface PaymentStatusProps {
  isPaid: boolean;
  orderId: string;
  orderStatus: Order["status"];
}

export const PaymentStatus = ({
  isPaid,
  orderId,
  orderStatus,
}: PaymentStatusProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const isPending = orderStatus === "PENDING";

  const handlePay = async () => {
    if (isPending || isLoading) return;

    try {
      setIsLoading(true);
      await handlePayment(orderId);
    } catch (error) {
      console.error("Payment error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Payment Badge */}
      <Badge
        variant="outline"
        className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
          isPaid
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
        }`}
      >
        {isPaid ? (
          <>
            <CheckCircle2 className="mr-1 size-3.5" />
            Paid
          </>
        ) : (
          <>
            <XCircle className="mr-1 size-3.5" />
            Unpaid
          </>
        )}
      </Badge>

      {/* Action Button */}
      {!isPaid && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  size="sm"
                  disabled={isPending || isLoading}
                  onClick={handlePay}
                  className="rounded-xl shadow-xs font-medium text-xs h-8 px-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-1.5 size-3.5" />
                      Pay Now
                    </>
                  )}
                </Button>
              </span>
            </TooltipTrigger>

            {isPending && (
              <TooltipContent className="rounded-lg text-xs">
                <p>Payment available once the provider confirms this rental.</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
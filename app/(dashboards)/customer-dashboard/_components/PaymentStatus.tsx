"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

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
    <div className="flex items-center gap-2">
      {/* Payment Status */}
      <Badge
        variant="outline"
        className={
          isPaid
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-orange-200 bg-orange-50 text-orange-700"
        }
      >
        {isPaid ? (
          <>
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Paid
          </>
        ) : (
          "Unpaid"
        )}
      </Badge>

      {/* Payment Button */}
      {!isPaid && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  size="sm"
                  disabled={isPending || isLoading}
                  onClick={handlePay}
                  className="bg-[#3f7167] hover:bg-[#315c54] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </span>
            </TooltipTrigger>

            {isPending && (
              <TooltipContent>
                <p>You can pay after the provider confirms the order.</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
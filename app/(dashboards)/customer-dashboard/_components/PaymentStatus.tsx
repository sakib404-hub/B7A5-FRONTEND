"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { handlePayment } from "../_actions/handlePayment";
import { Spinner } from "@/components/ui/spinner";

interface PaymentStatusProps {
  isPaid: boolean;
  orderId: string;
}

export const PaymentStatus = ({
  isPaid,
  orderId,
}: PaymentStatusProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    try {
      setIsLoading(true);

      const result = await handlePayment(orderId);
    } catch (error) {
      console.error("Payment error:", error);
      setIsLoading(false);
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
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

      {!isPaid && (
        <Button
          size="sm"
          disabled={isLoading}
          onClick={handlePay}
          className="bg-[#3f7167] hover:bg-[#315c54]"
        >
          {isLoading ? (
            <>
             <Spinner></Spinner>
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </Button>
      )}
    </div>
  );
};
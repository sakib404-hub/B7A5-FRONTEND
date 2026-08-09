import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderInfo } from "./OrderInfo";
import { Badge } from "@/components/ui/badge";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  Store,
} from "lucide-react";
import { Order } from "./MyOrders";
import { Button } from "@/components/ui/button";
import { handlePayment } from "../_actions/handlePayment";

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

//? order status
const OrderStatus = ({ status }: { status: Order["status"] }) => {
  const styles = {
    PENDING: "border-yellow-200 bg-yellow-50 text-yellow-700",

    CONFIRMED: "border-blue-200 bg-blue-50 text-blue-700",

    ONGOING: "border-purple-200 bg-purple-50 text-purple-700",

    COMPLETED: "border-green-200 bg-green-50 text-green-700",

    CANCELLED: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status.toLowerCase()}
    </Badge>
  );
};

//? payment status
const PaymentStatus = ({
  isPaid,
  onPay,
}: {
  isPaid: boolean;
  onPay?: () => void;
}) => {
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
          onClick={onPay}
          className="bg-[#3f7167] hover:bg-[#315c54]"
        >
          Pay Now
        </Button>
      )}
    </div>
  );
};



export const OrderCard = ({
  order,
  index,
}: {
  order: Order;
  index: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: "easeOut",
      }}
      whileHover={{
        y: -3,
      }}
    >
      <Card className="overflow-hidden border-[#d8e9e5] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        <CardHeader className="border-b border-[#e8f0ee]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base text-slate-800">
                <Package className="h-4 w-4 text-[#3f7167]" />
                Rental Order
              </CardTitle>

              <p className="mt-1 text-xs text-slate-400">
                Order #{order.id.slice(0, 8)}
              </p>
            </div>

            <div className="flex items-center gap-2">

              <div className="flex items-center gap-2">
                <OrderStatus status={order.status} />

                <PaymentStatus
                  isPaid={order.isPaid}
                  onPay={() => handlePayment(order.id)}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Amount */}
            <OrderInfo
              icon={CreditCard}
              label="Total Amount"
              value={`৳${order.totalAmount}`}
            />

            {/* Rental Days */}
            <OrderInfo
              icon={CalendarDays}
              label="Rental Duration"
              value={`${order.rentalDays} days`}
            />

            {/* Provider */}
            <OrderInfo
              icon={Store}
              label="Provider"
              value={order.gear.provider.name}
              subValue={order.gear.provider.email}
            />

            {/* Created */}
            <OrderInfo
              icon={Clock3}
              label="Ordered On"
              value={formatDate(order.createdAt)}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

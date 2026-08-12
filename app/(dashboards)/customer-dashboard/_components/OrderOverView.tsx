"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OrderOverviewProps {
  orders: {
    total: number;
    pending: number;
    confirmed: number;
    pickedUp: number;
    returned: number;
    cancelled: number;
  };
}

const OrderOverview = ({ orders }: OrderOverviewProps) => {
  const data = [
    { status: "Pending", orders: orders.pending },
    { status: "Confirmed", orders: orders.confirmed },
    { status: "Picked Up", orders: orders.pickedUp },
    { status: "Returned", orders: orders.returned },
    { status: "Cancelled", orders: orders.cancelled },
  ];

  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-2xl border-[#d8e9e5] bg-white shadow-[0_4px_20px_rgba(63,113,103,0.07)]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Rental Order Overview
          </CardTitle>

          <p className="text-sm text-slate-500">
            Overview of your rental order statuses
          </p>
        </CardHeader>

        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="status"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                />

                <Tooltip />

                <Bar
                  dataKey="orders"
                  fill="#3f7167"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderOverview;
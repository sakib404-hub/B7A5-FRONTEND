import React from "react";
import { getRentalOrders } from "../_actions/getRentalOrders";
import { MyOrders } from "../_components/MyOrders";

const MyOrdersPage = async () => {
  const result = await getRentalOrders();

  if (!result?.success || !result.data) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Failed to load your rental orders.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MyOrders orders={result.data} />
    </div>
  );
};

export default MyOrdersPage;
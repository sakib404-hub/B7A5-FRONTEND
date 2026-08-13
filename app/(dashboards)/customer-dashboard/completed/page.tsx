import React from "react";

import { getCompletedOrders } from "../_actions/completed";
import { CompletedOrdersHeader } from "../../provider-dashboard/completed/_components/Header";
import { CompletedOrderCard } from "../../provider-dashboard/completed/_components/Card";
const CompletedOrdersPage = async () => {
  const result = await getCompletedOrders();


  const completedOrders = result.data;


  return (
    <div className="space-y-6">
      <CompletedOrdersHeader />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Completed Rentals
          </h2>

          <p className="text-sm text-muted-foreground">
            Your successfully completed and returned rental orders.
          </p>
        </div>

        {completedOrders.length === 0 ? (
          <div className="rounded-xl border bg-card p-10 text-center">
            <p className="font-medium">
              No completed orders
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Your completed rentals will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {completedOrders.map((order : any) => (
              <CompletedOrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CompletedOrdersPage;
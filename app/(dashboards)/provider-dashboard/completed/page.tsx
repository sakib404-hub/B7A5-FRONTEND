import React from "react";

import { getCompletedOrders } from "../_actions/getCompletedOrders";
import { CompletedOrdersHeader } from "./_components/Header";
import { CompletedOrderCard, CompletedOrderCardProps } from "./_components/Card";

const CompletedOrdersPage = async () => {
  const result = await getCompletedOrders();

  const orders = result.data;

  const totalOrders = orders.length;

  

  return (
    <div className="space-y-6">
      {/* Header */}
      <CompletedOrdersHeader />

      {/* Orders */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Completed Orders
          </h2>

          <p className="text-sm text-muted-foreground">
            Orders that have been successfully returned by customers.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-xl border bg-card p-10 text-center">
            <p className="font-medium">
              No completed orders yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Completed rental orders will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order : any) => (
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
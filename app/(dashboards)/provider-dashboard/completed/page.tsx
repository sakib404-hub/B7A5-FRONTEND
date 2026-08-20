import React from "react";
import { getCompletedOrders } from "../_actions/getCompletedOrders";
import { CompletedOrdersHeader } from "./_components/Header";
import { CompletedOrderCard } from "./_components/Card";
import { PackageCheck } from "lucide-react";

const CompletedOrdersPage = async () => {
  const result = await getCompletedOrders();
  const orders = result?.data || [];

  return (
    <div className="space-y-6">
      <CompletedOrdersHeader />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Returned & Settled Archive
          </h2>
          <p className="text-xs text-muted-foreground">
            All rental orders that have been successfully returned, inspected, and finalized.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-xs">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <PackageCheck className="size-7" />
            </div>

            <h3 className="mt-4 text-base font-bold text-foreground">
              No completed orders yet
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
              When active equipment rentals are returned and marked as completed, their receipts and records will be archived here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order: any) => (
              <CompletedOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CompletedOrdersPage;
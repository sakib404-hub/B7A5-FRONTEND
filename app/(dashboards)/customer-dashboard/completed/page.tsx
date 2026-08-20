import React from "react";
import Link from "next/link";
import { Compass, Package } from "lucide-react";
import { getCompletedOrders } from "../_actions/completed";
import { CompletedOrdersHeader } from "../../provider-dashboard/completed/_components/Header";
import { CompletedOrderCard } from "../../provider-dashboard/completed/_components/Card";
import { Button } from "@/components/ui/button";

const CompletedOrdersPage = async () => {
  const result = await getCompletedOrders();
  const completedOrders = result?.data || [];

  return (
    <div className="space-y-6">
      <CompletedOrdersHeader />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Rental History Archive
          </h2>
          <p className="text-xs text-muted-foreground">
            All your successfully concluded gear rentals, receipts, and returns.
          </p>
        </div>

        {completedOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-xs">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Package className="size-7" />
            </div>

            <h3 className="mt-4 text-base font-bold text-foreground">
              No completed orders yet
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
              When your ongoing equipment rentals are returned and finalized by the provider, they will be archived here.
            </p>

            <div className="mt-6">
              <Button asChild className="rounded-xl font-medium shadow-xs">
                <Link href="/gear">
                  <Compass className="mr-2 size-4" />
                  Browse Rental Gear
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {completedOrders.map((order: any) => (
              <CompletedOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CompletedOrdersPage;
import Link from "next/link";
import { PackagePlus, ShoppingBag, Layers, ArrowRight } from "lucide-react";
import { IUser } from "@/types/types";
import { providerSummary } from "../provider-dashboard/_actions/getProviderSummary";
import ProviderSummaryCards from "../provider-dashboard/_components/SummaryCard";
import OrderStatusCard from "../provider-dashboard/_components/StatusCard";
import GearAvailability from "../provider-dashboard/_components/GearAvailability";
import { Button } from "@/components/ui/button";

const ProviderDashboard = async ({ user }: { user: IUser }) => {
  const summary = await providerSummary();
  const data = summary?.data || {
    gears: { total: 0, available: 0, unavailable: 0 },
    orders: { total: 0, pending: 0, confirmed: 0, pickedUp: 0, returned: 0, cancelled: 0 },
    earnings: { total: 0 },
  };

  return (
    <div className="space-y-8">
      {/* Provider Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-purple-500/10 via-card to-background p-6 md:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>Equipment Provider Portal</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Manage your gear listings, review incoming customer requests, and track your platform rental revenues.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="rounded-xl font-medium shadow-xs"
            >
              <Link href="/provider-dashboard/my-gears">
                <PackagePlus className="mr-2 size-4" />
                Manage Inventory
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-xl border-border/80 bg-background/80 hover:bg-accent font-medium shadow-2xs"
            >
              <Link href="/provider-dashboard/orders">
                <ShoppingBag className="mr-2 size-4 text-primary" />
                Rental Requests
                <ArrowRight className="ml-1 size-3.5 text-muted-foreground" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <ProviderSummaryCards summary={data} />

      {/* Analytics & Inventory Flow */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OrderStatusCard orders={data.orders} />
        <GearAvailability gears={data.gears} />
      </div>
    </div>
  );
};

export default ProviderDashboard;
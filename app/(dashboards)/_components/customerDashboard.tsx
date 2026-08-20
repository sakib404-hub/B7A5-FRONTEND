import Link from "next/link";
import { Compass, ShoppingBag, ArrowRight } from "lucide-react";
import { IUser } from "@/types/types";
import { getSummary } from "../customer-dashboard/_actions/getSummary";
import CustomerSummaryCards from "../customer-dashboard/_components/SummaryCard";
import OrderOverview from "../customer-dashboard/_components/OrderOverView";
import SpendingCard from "../customer-dashboard/_components/SpendingCard";
import RecentActivity from "../customer-dashboard/_components/ActivityCard";
import { Button } from "@/components/ui/button";

const CustomerDashboard = async ({ user }: { user: IUser }) => {
  const userSummary = await getSummary();
  const summary = userSummary?.data || {
    orders: { total: 0, pending: 0, confirmed: 0, pickedUp: 0, returned: 0, cancelled: 0 },
    payments: { totalSpent: 0 },
  };

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-primary/10 via-card to-background p-6 md:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span>Customer Workspace</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Track your ongoing gear rentals, manage booking confirmations, and explore high-performance equipment for your next adventure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="rounded-xl shadow-xs shadow-primary/20 font-medium"
            >
              <Link href="/gear">
                <Compass className="mr-2 size-4" />
                Browse Gear
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-xl border-border/80 bg-background/80 hover:bg-accent font-medium shadow-2xs"
            >
              <Link href="/customer-dashboard/orders">
                <ShoppingBag className="mr-2 size-4 text-primary" />
                My Orders
                <ArrowRight className="ml-1 size-3.5 text-muted-foreground" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <CustomerSummaryCards summary={summary} />

      {/* Analytics & Financial Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <OrderOverview orders={summary.orders} />
        <SpendingCard totalSpent={summary.payments.totalSpent} />
      </div>

      {/* Activity Breakdown */}
      <RecentActivity orders={summary.orders} />
    </div>
  );
};

export default CustomerDashboard;
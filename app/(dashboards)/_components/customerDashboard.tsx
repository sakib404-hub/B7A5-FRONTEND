import { IUser } from "@/types/types";
import { getSummary } from "../customer-dashboard/_actions/getSummary";
import CustomerSummaryCards from "../customer-dashboard/_components/SummaryCard";
import OrderOverview from "../customer-dashboard/_components/OrderOverView";
import SpendingCard from "../customer-dashboard/_components/SpendingCard";
import RecentActivity from "../customer-dashboard/_components/ActivityCard";

const CustomerDashboard = async ({ user }: { user: IUser }) => {
  const userSummary = await getSummary();

  const summary = userSummary.data;

  return (
    <div className="min-h-screen bg-[#edf6f4] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 md:text-3xl">
            Welcome, {user.name} 👋
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here’s an overview of your gear rental activity.
          </p>
        </div>

        {/* Summary Cards */}
        <CustomerSummaryCards summary={summary} />

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <OrderOverview orders={summary.orders} />

          <SpendingCard totalSpent={summary.payments.totalSpent} />
        </div>

        {/* Recent Activity */}
        <RecentActivity orders={summary.orders} />
      </div>
    </div>
  );
};

export default CustomerDashboard;
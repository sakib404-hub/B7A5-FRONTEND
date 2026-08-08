import {
  Users,
  UserRound,
  FolderTree,
  Package,
  CreditCard,
} from "lucide-react";

import { SummaryCard } from "./SummaryCard";
import { RentalStatusChart } from "./RentalStatusChart";
import { UserDistributionChart } from "./UserDistributionChart";
import { GearAvailabilityChart } from "./GearAvailabilityChart";
import { PaymentOverview } from "./PaymentOverview";
import { AdminSummary as AdminSummaryType } from "@/types/adminSummery";

// import { AdminSummary as AdminSummaryType } from "@/types/types";

interface Props {
  summary: AdminSummaryType;
}

export const AdminSummary = ({ summary }: Props) => {
  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          title="Total Users"
          value={summary.users.total}
          description={`${summary.users.customers} customers`}
          icon={Users}
        />

        <SummaryCard
          title="Providers"
          value={summary.users.providers}
          description="Gear providers"
          icon={UserRound}
        />

        <SummaryCard
          title="Categories"
          value={summary.categories.total}
          description="Gear categories"
          icon={FolderTree}
        />

        <SummaryCard
          title="Total Gear"
          value={summary.gears.total}
          description={`${summary.gears.available} available`}
          icon={Package}
        />

      </div>

      {/* Revenue */}
      <div className="grid gap-4 sm:grid-cols-2">

        <SummaryCard
          title="Total Revenue"
          value={`৳${summary.payments.totalRevenue}`}
          description={`${summary.payments.total} payments`}
          icon={CreditCard}
        />

        <SummaryCard
          title="Total Rentals"
          value={summary.rentals.total}
          description={`${summary.rentals.completed} completed`}
          icon={Package}
        />

      </div>

      {/* Main Chart */}
      <div>
        <RentalStatusChart
          rentals={summary.rentals}
        />
      </div>

      {/* Smaller charts */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <UserDistributionChart
          users={summary.users}
        />

        <GearAvailabilityChart
          gears={summary.gears}
        />

        <PaymentOverview
          payments={summary.payments}
        />

      </div>

    </div>
  );
};
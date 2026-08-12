import { IUser } from "@/types/types";
import { providerSummary } from "../provider-dashboard/_actions/getProviderSummary";
import ProviderHeader from "../provider-dashboard/_components/ProviderHeader";
import ProviderSummaryCards from "../provider-dashboard/_components/SummaryCard";
import OrderStatusCard from "../provider-dashboard/_components/StatusCard";
import GearAvailability from "../provider-dashboard/_components/GearAvailability";


const ProviderDashboard = async ({
  user,
}: {
  user: IUser;
}) => {
  const summary = await providerSummary();

  const data = summary.data;

  return (
    <div className="min-h-screen bg-[#edf6f4] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <ProviderHeader name={user.name} />

        <div className="space-y-6">
          {/* Summary */}
          <ProviderSummaryCards summary={data} />

          {/* Analytics */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <OrderStatusCard orders={data.orders} />

            <GearAvailability gears={data.gears} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
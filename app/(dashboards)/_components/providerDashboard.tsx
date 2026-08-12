
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/types/types";
import { providerSummary } from "../provider-dashboard/_actions/getProviderSummary";

const ProviderDashboard = async({ user }: IUser) => {
  const summary = await providerSummary();
  console.log(summary.data);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Provider Panel
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Gear</CardTitle>
          </CardHeader>
          <CardContent>Create new rental gear</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Gear</CardTitle>
          </CardHeader>
          <CardContent>Edit or delete gear</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>Track bookings</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboard;
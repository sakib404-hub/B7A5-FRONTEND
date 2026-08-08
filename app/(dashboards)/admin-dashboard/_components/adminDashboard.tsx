import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/types/types";
import { getAdminSummary } from "../_actions/getAdminSummery";
import { AdminSummary } from "./AdminSummery";

const AdminDashboard = async({user} : {user : IUser}) => {
 const result = await getAdminSummary();

  if (!result?.success || !result.data) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-muted-foreground">
          Failed to load admin dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-muted-foreground">
          Overview of your GEAR-UP platform
        </p>
      </div>

      <AdminSummary summary={result.data} />
    </div>
  );
};

export default AdminDashboard;

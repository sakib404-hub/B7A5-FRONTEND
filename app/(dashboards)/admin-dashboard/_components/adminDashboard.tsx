import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/types/types";
import { getAdminSummary } from "../_actions/getAdminSummery";

const AdminDashboard = async({user} : {user : IUser}) => {
  const adminSummery = await getAdminSummary();
  console.log(adminSummery);

  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Manage users, review gear listings, and monitor platform activity from
          one place.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>Manage all users</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listings</CardTitle>
          </CardHeader>
          <CardContent>Approve gear</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>System insights</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

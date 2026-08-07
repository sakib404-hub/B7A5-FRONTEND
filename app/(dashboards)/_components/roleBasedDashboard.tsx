import { IUser, UserRole } from "@/types/types";
import AdminDashboard from "./adminDashboard";
import CustomerDashboard from "./customerDashboard";
import ProviderDashboard from "./providerDashboard";




const RoleBasedDashboard = ({ user }: { user: IUser }) => {
  switch (user.role) {
    case UserRole.CUSTOMER:
      return <CustomerDashboard user={user} />;
    case UserRole.PROVIDER:
      return <ProviderDashboard user={user} />;
    case UserRole.ADMIN:
      return <AdminDashboard user={user} />;
    default:
      return <div>Unauthorized</div>;
  }
};

export default RoleBasedDashboard;
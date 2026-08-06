import { IUser } from "@/types/types";
import AdminDashboard from "./adminDashboard";
import CustomerDashboard from "./customerDashboard";
import ProviderDashboard from "./providerDashboard";




const RoleBasedDashboard = ({ user }: { user: IUser }) => {
  switch ((user.role).toLowerCase()) {
    case "customer":
      return <CustomerDashboard user={user} />;
    case "provider":
      return <ProviderDashboard user={user} />;
    case "admin":
      return <AdminDashboard user={user} />;
    default:
      return <div>Unauthorized</div>;
  }
};

export default RoleBasedDashboard;
import { AuthNavbar } from "@/components/shared/authHeader";
import Sidebar from "./_components/sideBar";
import { getMyProfile } from "@/services/getMyProfile";

const DashboardLayout = async({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMyProfile();
  return (
    <div className="h-screen bg-background text-foreground">
     <Sidebar
        role={user?.role}
      />
      {/* Content */}
      <div className="pl-0 md:pl-24 flex flex-col h-full">
        <main className="p-4 md:p-6 overflow-y-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
import Sidebar from "./_components/sideBar";
import { getMyProfile } from "@/services/getMyProfile";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMyProfile();

  return (
    <div className="min-h-screen bg-[#eef6f4] text-foreground">
      <Sidebar role={user?.role} />

      {/* Content */}
      <div className="flex h-screen flex-col pl-0 md:pl-24">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
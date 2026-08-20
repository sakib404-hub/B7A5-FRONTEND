import { getMyProfile } from "@/services/getMyProfile";
import { DashboardShell } from "./_components/dashboardShell";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMyProfile();

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
};

export default DashboardLayout;
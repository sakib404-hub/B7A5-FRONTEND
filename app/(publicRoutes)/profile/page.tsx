import { getMyProfile } from "@/services/getMyProfile";
import { ProfileComponent } from "../_components/profileComponent";

const ProfilePage = async () => {
  const user = await getMyProfile();

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:py-12">
      <ProfileComponent user={user} />
    </main>
  );
};

export default ProfilePage;
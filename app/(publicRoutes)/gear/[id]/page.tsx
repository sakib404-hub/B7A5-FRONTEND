import React from "react";
import { getGearDetails } from "../_actions/getGearDetails";
import { GearDetails } from "./_components/gearDetails";
import { getMyProfile } from "@/services/getMyProfile";

interface PageProps {
  params: Promise<{ id: string }>;
}

const GearDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const [gearDetails, user] = await Promise.all([
    getGearDetails(id),
    getMyProfile(),
  ]);

  if (!gearDetails) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <GearDetails gear={gearDetails} user={user} />
    </main>
  );
};

export default GearDetailsPage;
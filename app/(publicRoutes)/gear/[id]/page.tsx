import React from "react";
import { getGearDetails } from "../_actions/getGearDetails";
import { GearDetails } from "./_components/gearDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

const GearDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const gearDetails = await getGearDetails(id);

  if (!gearDetails) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <GearDetails gear={gearDetails} />
    </main>
  );
};

export default GearDetailsPage;
import React from "react";
import { getProviderGear } from "./_actions/getProvidersGear";
import { GearHeader } from "./_components/GearHeader";
import { GearGrid } from "./_components/GearGrid";

const MyGearsPage = async () => {
  const providerGears = await getProviderGear();

  return (
    <div className="space-y-8 p-6">
      <GearHeader />

      <GearGrid
        gears={providerGears?.data ?? []}
      />
    </div>
  );
};

export default MyGearsPage;
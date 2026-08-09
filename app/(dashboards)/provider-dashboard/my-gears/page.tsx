import React from "react";
import { getProviderGear } from "./_actions/getProvidersGear";
import { GearHeader } from "./_components/GearHeader";
import { GearGrid } from "./_components/GearGrid";
import { getAllCategory } from "@/app/(publicRoutes)/categories/_actions/getAllCategory";

const MyGearsPage = async () => {
  const [providerGears, categoryInformation] = await Promise.all([
    getProviderGear(),
    getAllCategory()
  ])

  return (
    <div className="space-y-8 p-6">
      <GearHeader 
      categories={categoryInformation.data}
      />

      <GearGrid
        gears={providerGears?.data ?? []}
      />
    </div>
  );
};

export default MyGearsPage;
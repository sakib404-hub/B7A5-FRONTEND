import React from "react";
import { getAllGears } from "@/app/(publicRoutes)/gear/_actions/getAllGear";
import { AdminGearTable } from "./_components/AdminGearTable";

const ManageGearsPage = async () => {
  const gears = await getAllGears();

  return (
    <div className="space-y-6">
      <AdminGearTable gears={gears || []} />
    </div>
  );
};

export default ManageGearsPage;

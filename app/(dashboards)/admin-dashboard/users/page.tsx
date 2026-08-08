import React from "react";
import { getAllUsers } from "../_actions/getAllUsers";
import { ManageUsersHeader } from "./_components/ManageUsersHeader";
import { UserTable } from "./_components/UsersTable";

const ManageUsersPage = async () => {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <ManageUsersHeader />

      {/* Users table will go here */}
      <div className="rounded-xl p-6">
        <UserTable users={users}></UserTable>
      </div>
    </div>
  );
};

export default ManageUsersPage;
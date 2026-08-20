"use client";

import { Users } from "lucide-react";

export const ManageUsersHeader = () => {
  return (
    <div className="flex items-center gap-3.5 border-b border-border/60 pb-6">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Users className="size-6" />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          User Account Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor user roles, inspect contact details, and moderate active and blocked platform accounts.
        </p>
      </div>
    </div>
  );
};
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserRound,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED" | "PENDING";
  phone: string | null;
  address: string | null;
}

interface UserTableProps {
  users: User[];
}

const RoleBadge = ({ role }: { role: "CUSTOMER" | "PROVIDER" | "ADMIN" }) => {
  const styles = {
    CUSTOMER: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    PROVIDER: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    ADMIN: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  };

  return (
    <Badge
      variant="outline"
      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${styles[role]}`}
    >
      {role.toLowerCase()}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: "ACTIVE" | "BLOCKED" | "PENDING" }) => {
  const styles = {
    ACTIVE: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    BLOCKED: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  };

  return (
    <Badge
      variant="outline"
      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${styles[status]}`}
    >
      <span
        className={`mr-1.5 size-1.5 rounded-full ${
          status === "ACTIVE"
            ? "bg-emerald-500"
            : status === "BLOCKED"
            ? "bg-rose-500"
            : "bg-amber-500"
        }`}
      />
      {status.toLowerCase()}
    </Badge>
  );
};

export const UserTable = ({ users }: UserTableProps) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users by name, email, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl pl-9 text-xs"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "CUSTOMER", "PROVIDER", "ADMIN"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setRoleFilter(role)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                roleFilter === role
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-muted/40 text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {role === "ALL" ? "All Roles" : role}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="size-4.5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">
                Registered Community
              </CardTitle>
            </div>

            <Badge variant="secondary" className="rounded-lg px-2.5 py-0.5 text-xs font-semibold">
              {filteredUsers.length} of {users.length} Users
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="pl-6 font-bold text-xs uppercase tracking-wider">
                    User Details
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">
                    Role
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">
                    Account Status
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">
                    Phone
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">
                    Address
                  </TableHead>
                  <TableHead className="w-12 pr-6">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-40 text-center text-xs text-muted-foreground"
                    >
                      No user accounts found matching your query.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      {/* User Avatar + Details */}
                      <TableCell className="pl-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs">
                            {user.name.charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-foreground text-sm">
                              {user.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Role */}
                      <TableCell>
                        <RoleBadge role={user.role} />
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <StatusBadge status={user.status} />
                      </TableCell>

                      {/* Phone */}
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {user.phone ?? "Not provided"}
                        </span>
                      </TableCell>

                      {/* Address */}
                      <TableCell>
                        <span className="block max-w-44 truncate text-xs text-muted-foreground">
                          {user.address ?? "Not provided"}
                        </span>
                      </TableCell>

                      {/* Actions Dropdown */}
                      <TableCell className="pr-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                            >
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Actions</span>
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-48 rounded-xl">
                            <DropdownMenuLabel className="text-xs font-semibold">
                              User Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => copyToClipboard(user.id, "User ID")}
                              className="text-xs cursor-pointer"
                            >
                              <Copy className="mr-2 size-3.5" />
                              Copy User ID
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => copyToClipboard(user.email, "Email")}
                              className="text-xs cursor-pointer"
                            >
                              <Mail className="mr-2 size-3.5" />
                              Copy Email
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {user.status === "ACTIVE" ? (
                              <DropdownMenuItem className="text-xs text-destructive focus:text-destructive cursor-pointer">
                                <ShieldAlert className="mr-2 size-3.5" />
                                Block Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-xs text-emerald-600 focus:text-emerald-600 cursor-pointer">
                                <UserCheck className="mr-2 size-3.5" />
                                Activate Account
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
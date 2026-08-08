"use client";

import { motion } from "framer-motion";
import {
  MoreHorizontal,
  ShieldCheck,
  UserRound,
} from "lucide-react";

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

const RoleBadge = ({
  role,
}: {
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
}) => {
  const styles = {
    CUSTOMER:
      "bg-blue-50 text-blue-700 border-blue-200",
    PROVIDER:
      "bg-purple-50 text-purple-700 border-purple-200",
    ADMIN:
      "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <Badge
      variant="outline"
      className={styles[role]}
    >
      {role.toLowerCase()}
    </Badge>
  );
};

const StatusBadge = ({
  status,
}: {
  status: "ACTIVE" | "BLOCKED" | "PENDING";
}) => {
  const styles = {
    ACTIVE:
      "bg-green-50 text-green-700 border-green-200",
    BLOCKED:
      "bg-red-50 text-red-700 border-red-200",
    PENDING:
      "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <Badge
      variant="outline"
      className={styles[status]}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          status === "ACTIVE"
            ? "bg-green-500"
            : status === "BLOCKED"
              ? "bg-red-500"
              : "bg-yellow-500"
        }`}
      />

      {status.toLowerCase()}
    </Badge>
  );
};

export const UserTable = ({ users }: UserTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
    >
      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="border-b ">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-slate-800">
                All Users
              </CardTitle>

              <p className="mt-1 text-sm text-slate-500">
                Manage registered users on the GEAR-UP platform.
              </p>
            </div>

            <div className="rounded-lg bg-[#e8f3f0] px-3 py-1.5">
              <span className="text-sm font-semibold text-[#3f7167]">
                {users.length} Users
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f7faf9]">
                  <TableHead className="pl-6">
                    User
                  </TableHead>

                  <TableHead>Email</TableHead>

                  <TableHead>Role</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead>Phone</TableHead>

                  <TableHead>Address</TableHead>

                  <TableHead className="w-15 pr-6">
                    <span className="sr-only">
                      Actions
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-slate-500"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                      }}
                      className="border-b transition-colors hover:bg-[#99e299]"
                    >
                      {/* User */}
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f3f0]">
                            {user.role === "ADMIN" ? (
                              <ShieldCheck className="h-4 w-4 text-[#3f7167]" />
                            ) : (
                              <UserRound className="h-4 w-4 text-[#3f7167]" />
                            )}
                          </div>

                          <div>
                            <p className="font-medium text-slate-800">
                              {user.name}
                            </p>

                            <p className="max-w-45 truncate text-xs text-slate-400">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Email */}
                      <TableCell>
                        <span className="text-sm text-slate-600">
                          {user.email}
                        </span>
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
                        <span className="text-sm text-slate-600">
                          {user.phone ?? "Not provided"}
                        </span>
                      </TableCell>

                      {/* Address */}
                      <TableCell>
                        <span className="block max-w-[180px] truncate text-sm text-slate-600">
                          {user.address ?? "Not provided"}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-slate-100"
                            >
                              <MoreHorizontal className="h-4 w-4 text-slate-500" />

                              <span className="sr-only">
                                Open actions
                              </span>
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              View User
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              Edit User
                            </DropdownMenuItem>

                            {user.status === "ACTIVE" ? (
                              <DropdownMenuItem className="text-red-600">
                                Block User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                Activate User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
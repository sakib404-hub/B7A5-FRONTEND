"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Edit,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditProfileDialog } from "./EditDialogue";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED" | "PENDING";
  phone: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  reviews: unknown[];
}

interface ProfileComponentProps {
  user: UserProfile;
}

export const ProfileComponent = ({
  user,
}: ProfileComponentProps) => {
  const joinedDate = new Date(user.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const roleLabel =
    user.role.charAt(0) +
    user.role.slice(1).toLowerCase();

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-sm font-medium text-primary">
          Account
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
          My Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your personal information and account details.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="overflow-hidden rounded-2xl border bg-card shadow-sm"
      >
        {/* Profile Banner */}
        <div className="h-32 bg-linear-to-r from-primary/20 via-primary/10 to-background md:h-40" />

        {/* User Header */}
        <div className="relative px-6 pb-6 md:px-8">
          <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-card bg-primary text-3xl font-bold text-primary-foreground shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="pb-1">
                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <EditProfileDialog user={user}>
              <Button className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </EditProfileDialog>
          </div>

          {/* Account badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {roleLabel}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                user.status === "ACTIVE"
                  ? "bg-green-500/10 text-green-600"
                  : "bg-red-500/10 text-red-600"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>

        {/* Information */}
        <div className="border-t px-6 py-6 md:px-8">
          <h3 className="mb-5 text-lg font-semibold">
            Personal Information
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <ProfileItem
              icon={<User className="h-5 w-5" />}
              label="Full Name"
              value={user.name}
            />

            <ProfileItem
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value={user.email}
            />

            <ProfileItem
              icon={<Phone className="h-5 w-5" />}
              label="Phone"
              value={user.phone ?? "Not provided"}
            />

            <ProfileItem
              icon={<MapPin className="h-5 w-5" />}
              label="Address"
              value={user.address ?? "Not provided"}
            />
          </div>
        </div>

        {/* Account Information */}
        <div className="border-t px-6 py-6 md:px-8">
          <h3 className="mb-5 text-lg font-semibold">
            Account Information
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <ProfileItem
              icon={<ShieldCheck className="h-5 w-5" />}
              label="Account Status"
              value={user.status}
            />

            <ProfileItem
              icon={<CalendarDays className="h-5 w-5" />}
              label="Member Since"
              value={joinedDate}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProfileItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-4 rounded-xl border bg-muted/20 p-4"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <p className="truncate font-medium">
          {value}
        </p>
      </div>
    </motion.div>
  );
};
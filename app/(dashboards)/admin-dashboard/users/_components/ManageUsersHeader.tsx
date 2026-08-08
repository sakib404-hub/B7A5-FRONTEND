"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

export const ManageUsersHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Title section */}
      <div className="flex items-start gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.15,
            duration: 0.35,
          }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f3f0]"
        >
          <Users className="h-5 w-5 text-[#3f7167]" />
        </motion.div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
            Manage Users
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500 md:text-base">
            View, monitor, and manage all registered users
            across the GEAR-UP platform.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
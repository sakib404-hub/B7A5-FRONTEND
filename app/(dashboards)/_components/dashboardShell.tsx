"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { IUser } from "@/types/types";
import { logOut } from "@/services/logOut";
import { toast } from "sonner";
import { SidebarContent } from "./sideBarContent";
import { DashboardHeader } from "./dashboardHeader";

interface DashboardShellProps {
  user: IUser | null;
  children: React.ReactNode;
}

export const DashboardShell = ({ user, children }: DashboardShellProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      await logOut();
      toast.success("Signed out successfully");
      router.push("/login");
    });
  };

  if (!user) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-zinc-950 text-foreground antialiased flex">
      {/* Desktop Sidebar (fixed) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:w-72 border-r border-border/60 bg-card md:flex flex-col shadow-2xs">
        <SidebarContent
          role={user.role}
          user={user}
          handleLogout={handleLogout}
          isPending={isPending}
        />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Sheet Content */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-card shadow-2xl border-r border-border"
            >
              <div className="flex justify-end p-3 pb-0">
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <SidebarContent
                role={user.role}
                user={user}
                handleLogout={handleLogout}
                isPending={isPending}
                closeMobile={() => setIsMobileOpen(false)}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:pl-64 lg:pl-72 min-w-0">
        <DashboardHeader
          user={user}
          onOpenMobileSidebar={() => setIsMobileOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

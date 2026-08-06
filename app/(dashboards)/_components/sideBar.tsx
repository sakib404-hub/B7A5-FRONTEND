"use client";

import {
  BarChart3,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  PackagePlus,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { logOut } from "@/services/logOut";

type UserRole = "ADMIN" | "PROVIDER" | "CUSTOMER";

interface SidebarProps {
  role: UserRole;
}

interface SidebarItemConfig {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/* ============================= */
/* Role आधारित Sidebar Items */
/* ============================= */

const sidebarItems: Record<UserRole, SidebarItemConfig[]> = {
  PROVIDER: [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    {
      label: "Dashboard",
      href: "/provider-dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Add Gear",
      href: "/provider-dashboard/add-gear",
      icon: <PackagePlus size={18} />,
    },
    {
      label: "My Gears",
      href: "/provider-dashboard/my-gears",
      icon: <Package size={18} />,
    },
    {
      label: "My Orders",
      href: "/provider-dashboard/orders",
      icon: <ShoppingBag size={18} />,
    },
  ],

  CUSTOMER: [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    {
      label: "Dashboard",
      href: "/customer-dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "My Orders",
      href: "/customer-dashboard/orders",
      icon: <ShoppingBag size={18} />,
    },
  ],

  ADMIN: [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    {
      label: "Dashboard",
      href: "/admin-dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Manage Users",
      href: "/admin-dashboard/users",
      icon: <Users size={18} />,
    },
    {
      label: "Manage Gear",
      href: "/admin-dashboard/gear",
      icon: <Package size={18} />,
    },
    {
      label: "Reports",
      href: "/admin-dashboard/reports",
      icon: <BarChart3 size={18} />,
    },
  ],
};

/* ============================= */
/* Sidebar Content */
/* ============================= */

const SidebarContent = ({
  role,
  handleLogout,
  isPending,
  closeMobile,
}: {
  role: UserRole;
  handleLogout: () => void;
  isPending: boolean;
  closeMobile?: () => void;
}) => {
  const pathname = usePathname();
  const items = sidebarItems[role];

  return (
    <div className="flex h-full flex-col justify-between py-4">
      {/* Top */}
      <div className="flex flex-col items-center gap-4">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <button
              key={item.href}
              onClick={() => {
                window.location.href = item.href;
                closeMobile?.();
              }}
              title={item.label}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.icon}

              {/* Tooltip */}
              <span className="pointer-events-none absolute left-14 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 md:block">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => {
            window.location.href = "/settings";
            closeMobile?.();
          }}
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Settings size={18} />

          <span className="pointer-events-none absolute left-14 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 md:block">
            Settings
          </span>
        </button>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10 disabled:opacity-50"
        >
          <LogOut
            size={18}
            className={isPending ? "animate-pulse" : ""}
          />

          <span className="pointer-events-none absolute left-14 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 md:block">
            {isPending ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </div>
  );
};

/* ============================= */
/* Main Sidebar */
/* ============================= */

const Sidebar = ({ role }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logOut();
      window.location.href = "/login";
    });
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-card p-2 shadow-md md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || typeof window !== "undefined") && (
          <motion.aside
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`
              fixed left-4 top-1/2 z-40
              -translate-y-1/2
              w-14 h-[65vh]
              rounded-2xl border bg-card shadow-xl
              ${isOpen ? "flex" : "hidden"} 
              md:flex flex-col
            `}
          >
            <SidebarContent
              role={role}
              handleLogout={handleLogout}
              isPending={isPending}
              closeMobile={() => setIsOpen(false)}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
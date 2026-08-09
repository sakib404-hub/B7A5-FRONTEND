"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
} from "lucide-react";

import { SidebarItemConfig, UserRole } from "@/types/types";

const sidebarItems: Record<UserRole, SidebarItemConfig[]> = {
  PROVIDER: [
    {
      label: "Home",
      href: "/",
      icon: <Home size={18} />,
    },
    {
      label: "Dashboard",
      href: "/provider-dashboard",
      icon: <LayoutDashboard size={18} />,
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
    {
      label: "Home",
      href: "/",
      icon: <Home size={18} />,
    },
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
    {
      label: "Home",
      href: "/",
      icon: <Home size={18} />,
    },
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

export const SidebarContent = ({
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
  const router = useRouter();

  const items = sidebarItems[role];

  const handleNavigation = (href: string) => {
    router.push(href);
    closeMobile?.();
  };

  return (
    <div className="flex h-full flex-col items-center justify-between py-4">
      {/* Top */}
      <div className="flex flex-col items-center gap-4">
        {items.map((item) => {
          /*
           * Exact match for dashboard/home.
           * Nested routes can use startsWith().
           */
          const isActive = pathname === item.href; 

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavigation(item.href)}
              title={item.label}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.icon}

              {/* Tooltip */}
              <span
                className="
                  pointer-events-none absolute left-14 hidden
                  whitespace-nowrap rounded-md bg-foreground
                  px-2 py-1 text-xs text-background
                  opacity-0 transition-opacity
                  group-hover:opacity-100 md:block
                "
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center gap-4">
        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          title={isPending ? "Logging out..." : "Logout"}
          className="
            group relative flex h-10 w-10
            items-center justify-center rounded-xl
            text-destructive
            hover:bg-destructive/10
            disabled:opacity-50
          "
        >
          <LogOut
            size={18}
            className={isPending ? "animate-pulse" : ""}
          />

          <span
            className="
              pointer-events-none absolute left-14 hidden
              whitespace-nowrap rounded-md bg-foreground
              px-2 py-1 text-xs text-background
              opacity-0 transition-opacity
              group-hover:opacity-100 md:block
            "
          >
            {isPending ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </div>
  );
};

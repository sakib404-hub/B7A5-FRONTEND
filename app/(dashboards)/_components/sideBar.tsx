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
} from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { useTransition } from "react";
import { motion } from "framer-motion";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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

interface SidebarContentProps {
  role: UserRole;
  handleLogout: () => void;
  isPending: boolean;
}

const SidebarContent = ({
  role,
  handleLogout,
  isPending,
}: SidebarContentProps) => {
  const pathname = usePathname();

  const items = sidebarItems[role];

  return (
    <div className="flex h-full flex-col justify-between py-4">
      {/* Main Navigation */}
      <div className="flex flex-col items-center gap-3">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <a
              key={item.href}
              href={item.href}
              title={item.label}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.icon}

              {/* Desktop tooltip */}
              <span
                className="
                  pointer-events-none absolute left-14
                  hidden whitespace-nowrap rounded-md
                  bg-foreground px-2 py-1 text-xs
                  text-background opacity-0
                  transition-opacity
                  group-hover:opacity-100
                  md:block
                "
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3">
        <a
          href="/settings"
          title="Settings"
          className="
            group relative flex h-10 w-10
            items-center justify-center
            rounded-xl text-muted-foreground
            transition-all hover:bg-muted
            hover:text-foreground
          "
        >
          <Settings size={18} />

          <span
            className="
              pointer-events-none absolute left-14
              hidden whitespace-nowrap rounded-md
              bg-foreground px-2 py-1 text-xs
              text-background opacity-0
              transition-opacity
              group-hover:opacity-100
              md:block
            "
          >
            Settings
          </span>
        </a>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          title="Logout"
          className="
            group relative flex h-10 w-10
            items-center justify-center
            rounded-xl text-destructive
            transition-all
            hover:bg-destructive/10
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <LogOut
            size={18}
            className={isPending ? "animate-pulse" : ""}
          />

          <span
            className="
              pointer-events-none absolute left-14
              hidden whitespace-nowrap rounded-md
              bg-foreground px-2 py-1 text-xs
              text-background opacity-0
              transition-opacity
              group-hover:opacity-100
              md:block
            "
          >
            {isPending ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </div>
  );
};

const Sidebar = ({ role }: SidebarProps) => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logOut();
      redirect('/login');
    });
  };

  return (
    <>
      {/* ============================= */}
      {/* Desktop Sidebar */}
      {/* ============================= */}

      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="
          fixed left-4 top-1/2 z-40
          hidden h-[65vh] w-14
          -translate-y-1/2
          flex-col
          rounded-2xl
          border
          bg-card
          shadow-xl
          md:flex
        "
      >
        <SidebarContent
          role={role}
          handleLogout={handleLogout}
          isPending={isPending}
        />
      </motion.aside>

      {/* ============================= */}
      {/* Mobile Sidebar */}
      {/* ============================= */}

      <div className="fixed left-4 top-4 z-50 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="
                rounded-lg border
                bg-card p-2 shadow-md
                transition-colors
                hover:bg-muted
              "
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-64 p-4"
          >
            <SidebarContent
              role={role}
              handleLogout={handleLogout}
              isPending={isPending}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
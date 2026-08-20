"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  Users,
  CheckCircle2,
  User,
  Shield,
  Layers,
} from "lucide-react";
import { SidebarContentProps, SidebarItemConfig, UserRole } from "@/types/types";
import { Badge } from "@/components/ui/badge";

const roleNavigation: Record<UserRole, { main: SidebarItemConfig[]; secondary: SidebarItemConfig[] }> = {
  PROVIDER: {
    main: [
      {
        label: "Overview",
        href: "/provider-dashboard",
        icon: <LayoutDashboard className="size-4.5" />,
      },
      {
        label: "My Equipment",
        href: "/provider-dashboard/my-gears",
        icon: <Package className="size-4.5" />,
      },
      {
        label: "Rental Orders",
        href: "/provider-dashboard/orders",
        icon: <ShoppingBag className="size-4.5" />,
      },
      {
        label: "Completed Rentals",
        href: "/provider-dashboard/completed",
        icon: <CheckCircle2 className="size-4.5" />,
      },
    ],
    secondary: [
      {
        label: "Browse Marketplace",
        href: "/gear",
        icon: <Compass className="size-4.5" />,
      },
      {
        label: "My Profile",
        href: "/profile",
        icon: <User className="size-4.5" />,
      },
    ],
  },

  CUSTOMER: {
    main: [
      {
        label: "Overview",
        href: "/customer-dashboard",
        icon: <LayoutDashboard className="size-4.5" />,
      },
      {
        label: "Active Rentals",
        href: "/customer-dashboard/orders",
        icon: <ShoppingBag className="size-4.5" />,
      },
      {
        label: "Rental History",
        href: "/customer-dashboard/completed",
        icon: <CheckCircle2 className="size-4.5" />,
      },
    ],
    secondary: [
      {
        label: "Explore Gear",
        href: "/gear",
        icon: <Compass className="size-4.5" />,
      },
      {
        label: "My Profile",
        href: "/profile",
        icon: <User className="size-4.5" />,
      },
    ],
  },

  ADMIN: {
    main: [
      {
        label: "Overview",
        href: "/admin-dashboard",
        icon: <LayoutDashboard className="size-4.5" />,
      },
      {
        label: "Manage Users",
        href: "/admin-dashboard/users",
        icon: <Users className="size-4.5" />,
      },
      {
        label: "Platform Equipment",
        href: "/admin-dashboard/gear",
        icon: <Layers className="size-4.5" />,
      },
    ],
    secondary: [
      {
        label: "Public Marketplace",
        href: "/gear",
        icon: <Compass className="size-4.5" />,
      },
      {
        label: "My Profile",
        href: "/profile",
        icon: <User className="size-4.5" />,
      },
    ],
  },
};

export const SidebarContent = ({
  role,
  user,
  handleLogout,
  isPending,
  closeMobile,
}: SidebarContentProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const navGroups = roleNavigation[role] || { main: [], secondary: [] };

  const handleNavigation = (href: string) => {
    router.push(href);
    closeMobile?.();
  };

  const getRoleBadgeStyle = () => {
    switch (role) {
      case UserRole.ADMIN:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case UserRole.PROVIDER:
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="flex h-full flex-col justify-between bg-card text-card-foreground">
      {/* Top section */}
      <div className="flex flex-col gap-6 p-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <Link
            href="/"
            onClick={closeMobile}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
              <span className="text-base font-black">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground">
                Gear<span className="text-primary">Up</span>
              </span>
              <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                Rental Workspace
              </span>
            </div>
          </Link>

          <Badge
            variant="outline"
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider ${getRoleBadgeStyle()}`}
          >
            {role}
          </Badge>
        </div>

        {/* Main Navigation Group */}
        <div className="flex flex-col gap-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">
            Menu
          </p>
          {navGroups.main.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${role.toLowerCase()}-dashboard` &&
                pathname.startsWith(item.href));

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavigation(item.href)}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs shadow-primary/20 font-semibold"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                }`}
              >
                <div
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto size-1.5 rounded-full bg-primary-foreground" />
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary / General Navigation */}
        <div className="flex flex-col gap-1 pt-2 border-t border-border/50">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">
            General
          </p>
          {navGroups.secondary.map((item) => {
            const isActive = pathname === item.href;

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavigation(item.href)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                }`}
              >
                <div className="transition-transform duration-200 group-hover:scale-110 text-muted-foreground group-hover:text-primary">
                  {item.icon}
                </div>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom User Card & Logout */}
      <div className="border-t border-border/60 p-4">
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-border/60 bg-muted/30 p-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User className="size-4" />}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-xs font-semibold text-foreground">
                {user?.name || "Member"}
              </span>
              <span className="truncate text-[11px] text-muted-foreground">
                {user?.email || "Signed In"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            title={isPending ? "Logging out..." : "Sign Out"}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
          >
            <LogOut className={`size-4 ${isPending ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

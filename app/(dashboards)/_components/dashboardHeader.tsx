"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  Menu, 
  ShieldCheck, 
  Store, 
  User as UserIcon,
  ChevronRight
} from "lucide-react";
import { IUser, UserRole } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  user?: IUser | null;
  onOpenMobileSidebar?: () => void;
}

export const DashboardHeader = ({
  user,
  onOpenMobileSidebar,
}: DashboardHeaderProps) => {
  const pathname = usePathname();

  // Generate dynamic breadcrumbs based on pathname
  const getRouteTitle = () => {
    if (pathname.includes("/admin-dashboard/users")) return "User Management";
    if (pathname.includes("/admin-dashboard/gear")) return "Platform Equipment";
    if (pathname.includes("/admin-dashboard")) return "Executive Overview";

    if (pathname.includes("/provider-dashboard/my-gears")) return "My Equipment Inventory";
    if (pathname.includes("/provider-dashboard/orders")) return "Incoming Rental Orders";
    if (pathname.includes("/provider-dashboard/completed")) return "Completed Rentals Archive";
    if (pathname.includes("/provider-dashboard")) return "Provider Dashboard";

    if (pathname.includes("/customer-dashboard/orders")) return "My Active Rentals";
    if (pathname.includes("/customer-dashboard/completed")) return "Rental History";
    if (pathname.includes("/customer-dashboard")) return "Customer Dashboard";

    return "Dashboard";
  };

  const getRoleBadgeStyle = (role?: UserRole) => {
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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenMobileSidebar}
          className="md:hidden text-muted-foreground hover:text-foreground"
          aria-label="Open sidebar"
        >
          <Menu className="size-5" />
        </Button>

        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="flex items-center gap-1 text-muted-foreground transition hover:text-foreground"
          >
            <Compass className="size-4" />
            <span className="hidden sm:inline">GearUp</span>
          </Link>
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
          <span className="font-semibold text-foreground">{getRouteTitle()}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Marketplace Link */}
        <Button
          variant="outline"
          size="sm"
          asChild
          className="hidden sm:inline-flex rounded-xl border-border/70 text-xs font-medium shadow-2xs hover:bg-accent"
        >
          <Link href="/gear">
            <Store className="mr-1.5 size-3.5 text-primary" />
            Browse Gear
          </Link>
        </Button>

        {/* Role Pill */}
        {user?.role && (
          <Badge
            variant="outline"
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${getRoleBadgeStyle(
              user.role
            )}`}
          >
            {user.role === UserRole.ADMIN && (
              <ShieldCheck className="mr-1 size-3" />
            )}
            {user.role}
          </Badge>
        )}

        {/* User Avatar Chip */}
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-xl border border-border/50 bg-card p-1.5 pr-3 shadow-2xs transition hover:border-primary/40 hover:bg-accent/40"
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="size-3.5" />}
          </div>
          <div className="hidden flex-col text-left md:flex">
            <span className="line-clamp-1 max-w-28 text-xs font-semibold text-foreground">
              {user?.name || "User"}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

"use client";

import Link from "next/link";
import { Menu, User, LogOut, LayoutDashboard } from "lucide-react";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { NavbarProps } from "@/types/types";
import { logOut } from "@/services/logOut";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "Categories", href: "/categories" },
  { label: "How It Works", href: "/how-it-works" },
];

export const Navbar = ({ user }: NavbarProps) => {
  const handleLogout = async () => {
    await logOut();
    toast.success("User Logged Out Successfully.");
    redirect('/login');
  };

  const dashboardPath = {
  CUSTOMER: "/customer-dashboard",
  PROVIDER: "/provider-dashboard",
  ADMIN: "/admin-dashboard",
}[user?.role ?? "CUSTOMER"];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">G</span>
          </div>

          <span className="text-xl font-bold tracking-tight">
            Gear<span className="text-primary">Up</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2"
                >
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
                    <User className="size-5 text-primary" />
                  </div>

                  <div className="hidden flex-col items-start lg:flex">
                    <span className="text-sm font-medium">{user?.name || "User"}</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.role?.toLowerCase() || " "}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user?.name || "Guest"}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {user?.email || "guest@gmail.com"}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href={dashboardPath!} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-75 sm:w-87.5">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <span className="font-bold">G</span>
                  </div>

                  <span className="text-lg font-bold">
                    Gear<span className="text-primary">Up</span>
                  </span>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="mt-8 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}

              <div className="my-4 border-t" />

              {user ? (
                <>
                  {/* Mobile User Info */}
                  <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
                      <User className="size-5 text-primary" />
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium">
                        {user?.name || "Guest"}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user?.email || "guest@gmail.com"}
                      </span>
                    </div>
                  </div>

                {/* user menu  */}
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 size-4" />
                      Dashboard
                    </Link>
                  </Button>

                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/profile">
                      <User className="mr-2 size-4" />
                      Profile
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="justify-start text-destructive hover:text-destructive"
                  >
                    <LogOut className="mr-2 size-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/login">Login</Link>
                  </Button>

                  <Button asChild className="justify-start">
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

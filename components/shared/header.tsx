"use client";

import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";



const navItems = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "Categories", href: "/categories" },
  { label: "How It Works", href: "/how-it-works" },
];

export const Navbar = () => {
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
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>

          <Button variant="outline" size="icon" asChild>
            <Link href="/profile" aria-label="Profile">
              <User className="size-4" />
            </Link>
          </Button>
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

              <Button variant="outline" asChild className="justify-start">
                <Link href="/login">Login</Link>
              </Button>

              <Button asChild className="justify-start">
                <Link href="/register">Get Started</Link>
              </Button>

              <Button
                variant="ghost"
                asChild
                className="justify-start"
              >
                <Link href="/profile">
                  <User className="mr-2 size-4" />
                  My Profile
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
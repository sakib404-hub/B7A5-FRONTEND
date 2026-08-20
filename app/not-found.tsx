"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Home,
  PackageSearch,
  HelpCircle,
  ArrowLeft,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 text-foreground">
      {/* Background Glow Accents */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-xl text-center space-y-8"
      >
        {/* Animated Compass Icon */}
        <motion.div
          initial={{ scale: 0.8, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex size-24 items-center justify-center rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent shadow-xl backdrop-blur-xs"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          >
            <Compass className="size-12 text-primary" />
          </motion.div>
        </motion.div>

        {/* Badge & Headings */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            <span>404 • Trail Not Found</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            You&apos;ve Wandered Off the Trail!
          </h1>

          <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            The page or gear you are looking for has been moved, removed, or has
            ventured deep into the uncharted wilderness.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="lg" className="gap-2 font-semibold shadow-md">
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 font-semibold"
          >
            <Link href="/gear">
              <PackageSearch className="size-4" />
              Browse Gear Catalog
            </Link>
          </Button>
        </div>

        {/* Helpful Shortcut Cards */}
        <div className="pt-6 border-t border-border/60">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Popular Destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <Link
              href="/gear"
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-3 hover:border-primary/50 hover:shadow-xs transition group"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <Search className="size-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Search Gear</h4>
                <p className="text-[11px] text-muted-foreground">All equipment</p>
              </div>
            </Link>

            <Link
              href="/categories"
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-3 hover:border-primary/50 hover:shadow-xs transition group"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <PackageSearch className="size-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Categories</h4>
                <p className="text-[11px] text-muted-foreground">Browse by type</p>
              </div>
            </Link>

            <Link
              href="/faq"
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-3 hover:border-primary/50 hover:shadow-xs transition group"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <HelpCircle className="size-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Help & FAQ</h4>
                <p className="text-[11px] text-muted-foreground">Support & guide</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

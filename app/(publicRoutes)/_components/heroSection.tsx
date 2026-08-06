"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex w-fit items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            Trusted Gear Rental Marketplace
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Gear Up for Your{" "}
            <span className="text-primary">Next Adventure</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Rent quality outdoor and sports equipment from trusted providers.
            Get the gear you need without the cost of buying it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/gear"
              className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:shadow-xl"
            >
              Browse Gear
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/how-it-works"
              className="flex items-center gap-2 rounded-xl border bg-background px-6 py-3 font-semibold transition hover:bg-muted"
            >
              How It Works
            </Link>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
          >
            {["Verified Providers", "Secure Payments", "Easy Returns"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              )
            )}
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: "spring",
          }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mx-auto flex aspect-square max-w-lg items-center justify-center rounded-[2.5rem] border bg-muted/50 shadow-2xl"
          >
            <div className="text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-primary/10">
                <Search className="h-14 w-14 text-primary" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Find Your Gear
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Explore equipment for every adventure.
              </p>
            </div>
          </motion.div>

          {/* Floating card */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-5 -left-4 rounded-2xl border bg-background p-4 shadow-xl sm:-left-8"
          >
            <p className="text-xs text-muted-foreground">
              Rental made simple
            </p>

            <p className="mt-1 font-bold">
              Rent • Use • Return
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

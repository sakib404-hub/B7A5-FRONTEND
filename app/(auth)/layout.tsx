"use client";

import { AuthNavbar } from "@/components/shared/authHeader";
import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Tag,
  Star,
  Compass,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified & Inspected Equipment",
    description:
      "All tents, packs, and stoves undergo quality checks for maximum reliability in the wild.",
  },
  {
    icon: Zap,
    title: "Fast & Seamless Reservation",
    description:
      "Book within minutes with transparent pricing and flexible daily rental periods.",
  },
  {
    icon: Tag,
    title: "Affordable Exploration",
    description:
      "Access expedition-grade equipment at a fraction of retail prices.",
  },
];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AuthNavbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-border/70 bg-card shadow-2xl lg:grid-cols-12 min-h-[640px]"
        >
          {/* Left Side - Animated Information & Social Proof */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-muted/40 p-10 lg:col-span-6 lg:flex xl:p-12 border-r border-border/50">
            {/* Animated Ambient Glow Accents */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl pointer-events-none"
            />

            {/* Top Brand Statement */}
            <div className="relative z-10 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-2xs"
              >
                <Compass className="size-3.5 animate-pulse" />
                <span>Outdoor Gear Sharing Ecosystem</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl leading-tight"
              >
                Unlock Epic Adventures with{" "}
                <span className="text-primary">Premium Gear</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                Join thousands of explorers and gear providers. Rent top-tier
                camping, hiking, and expedition gear without the high cost of ownership.
              </motion.p>
            </div>

            {/* Middle Feature Highlights (Staggered Animation) */}
            <div className="relative z-10 my-8 space-y-3.5">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.35 + idx * 0.12,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      x: 4,
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-start gap-3.5 rounded-2xl border border-border/50 bg-background/70 p-4 backdrop-blur-xs shadow-2xs transition-shadow hover:shadow-md"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-4.5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-foreground">
                        {feat.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Testimonial / Community Proof Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ y: -2 }}
              className="relative z-10 rounded-2xl border border-border/60 bg-background/85 p-4.5 backdrop-blur-md shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs italic text-muted-foreground leading-relaxed">
                &ldquo;Rented a 4-season tent and winter sleeping bags for our summit trek. Seamless experience and immaculate gear quality!&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[11px]">
                <span className="font-semibold text-foreground">
                  Elena Rostova • Alpine Trekker
                </span>
                <span className="flex items-center gap-1 font-medium text-primary">
                  <CheckCircle2 className="size-3" />
                  Verified Renter
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form Container with Animated Entrance */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:col-span-6 lg:p-12 bg-card">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="w-full max-w-sm"
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AuthLayout;
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Compass,
  ShieldCheck,
  Users,
  Leaf,
  Sparkles,
  ArrowRight,
  Target,
  Eye,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { label: "Successful Rentals", value: "10K+" },
  { label: "Active Equipment", value: "500+" },
  { label: "Community Rating", value: "4.9/5" },
  { label: "Trusted Brands", value: "50+" },
];

const values = [
  {
    icon: Leaf,
    title: "Eco-Friendly & Sustainable",
    description:
      "By encouraging equipment sharing, we reduce manufacturing waste and promote sustainable outdoor exploration.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Inspected Quality",
    description:
      "Every piece of equipment is thoroughly inspected and verified to ensure safety and peak reliability on your trips.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We connect passionate outdoor enthusiasts with trusted local providers, empowering adventurers everywhere.",
  },
  {
    icon: Sparkles,
    title: "Affordable Adventure",
    description:
      "Experience premium, top-tier expedition gear at a fraction of the retail cost with flexible daily rental rates.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-muted/30 py-20 lg:py-24">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Story & Mission
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              Making Outdoor Adventures <br className="hidden sm:block" />
              <span className="text-primary">Accessible to Everyone</span>
            </h1>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              GearUp is a peer-to-peer outdoor equipment rental marketplace. We
              make it effortless to discover, rent, and share premium camping,
              hiking, and expedition gear without the heavy burden of ownership.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl border bg-card p-6 shadow-xs text-center"
              >
                <p className="text-3xl font-extrabold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between rounded-3xl border bg-card p-8 sm:p-10 shadow-xs"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <Target className="size-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Our Mission
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                To break down financial and logistical barriers for outdoor
                enthusiasts. We believe quality exploration should not require
                thousands of dollars in gear or closets packed with rarely used
                equipment.
              </p>
            </div>
            <div className="mt-8 space-y-3 border-t pt-6">
              {[
                "Democratize high-end camping gear",
                "Promote eco-conscious rental models",
                "Ensure reliable gear inspection standards",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <CheckCircle2 className="size-4.5 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between rounded-3xl border bg-card p-8 sm:p-10 shadow-xs"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <Eye className="size-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Our Vision
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                To become the most trusted global outdoor rental ecosystem,
                connecting millions of travelers with local providers, preserving
                our natural wonders through sustainable equipment circularity.
              </p>
            </div>
            <div className="mt-8 space-y-3 border-t pt-6">
              {[
                "Global network of certified gear providers",
                "Zero-waste outdoor adventure culture",
                "Instant seamless reservation & pickup",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <CheckCircle2 className="size-4.5 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="border-t bg-muted/20 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Why We Do What We Do
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
              Our Core Values
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Principles guiding every feature, partnership, and rental experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, index) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border bg-card p-6 shadow-xs transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground shadow-xl sm:px-16"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready for your next expedition?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-primary-foreground/90 leading-relaxed">
              Explore hundreds of premium tents, sleeping bags, backpacks, and
              camp cooking gear ready for your next weekend escape.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/gear"
                className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-bold text-foreground shadow-md transition hover:bg-background/90"
              >
                Browse Equipment
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur-xs transition hover:bg-primary-foreground/20"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

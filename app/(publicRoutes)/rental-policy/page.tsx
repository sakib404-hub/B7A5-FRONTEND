"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Truck,
} from "lucide-react";
import Link from "next/link";

const policies = [
  {
    icon: CalendarCheck,
    title: "1. Reservation & ID Verification",
    content:
      "All rentals must be booked through the GearUp platform with verified user profiles. Renters are required to upload a valid government-issued ID prior to initial equipment handover.",
  },
  {
    icon: Truck,
    title: "2. Handover & Condition Inspection",
    content:
      "Both renter and provider must perform a visual check at handover to inspect zippers, seams, tent poles, and electronic gear. Any existing wear should be documented in the hand-off checklist.",
  },
  {
    icon: Clock,
    title: "3. On-Time Returns & Late Penalties",
    content:
      "Equipment must be returned by the agreed return hour on the final rental day. Late returns exceeding a 2-hour grace period without provider consent will incur the standard daily rate plus a 25% late fee per day.",
  },
  {
    icon: Sparkles,
    title: "4. Cleaning & Gear Care Standards",
    content:
      "Renters must shake out debris, empty all pockets, and thoroughly dry damp rainflys/sleeping gear prior to returning. Excessive mud, grease, or stains requiring professional restoration may incur a cleaning fee.",
  },
  {
    icon: ShieldCheck,
    title: "5. Damage, Repairs & Loss",
    content:
      "Normal superficial wear is expected. In cases of structural damage (torn canvas, broken poles, burnt fabric) or lost items, the renter is responsible for repair costs or full replacement value up to the security deposit amount.",
  },
  {
    icon: RotateCcw,
    title: "6. Cancellation & Refunds",
    content:
      "Cancellations made 48+ hours prior to pickup receive a 100% refund. Cancellations made between 24-48 hours receive an 80% refund. Cancellations within 24 hours of pickup are non-refundable.",
  },
];

export default function RentalPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-muted/30 py-16 lg:py-20">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
              <ShieldCheck className="size-6" />
            </div>

            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Equipment Rules & Protection
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Rental Policy
            </h1>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Essential guidelines ensuring safe, transparent, and hassle-free
              outdoor equipment rentals for both explorers and providers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Policies List */}
      <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
        <div className="space-y-8">
          {policies.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-2xl border bg-card p-6 sm:p-8 shadow-2xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4.5" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-foreground">
                    {p.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground pl-12">
                  {p.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl border bg-card p-8 text-center shadow-xs"
        >
          <h3 className="text-lg font-bold text-foreground">
            Ready to rent equipment for your next adventure?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Browse our inspected tents, sleeping systems, cooking kits, and backpacks.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/gear"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
            >
              Browse Gear Catalog
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-xl border bg-background px-6 py-2.5 text-xs sm:text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Read FAQs
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

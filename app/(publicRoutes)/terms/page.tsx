"use client";

import { motion } from "framer-motion";
import {
  FileCheck,
  UserCheck,
  PackageCheck,
  CreditCard,
  AlertTriangle,
  Scale,
  Ban,
} from "lucide-react";
import Link from "next/link";

const terms = [
  {
    icon: FileCheck,
    title: "1. Acceptance of Terms",
    content:
      "By creating an account or using GearUp's rental platform, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these terms, you may not access or use our services.",
  },
  {
    icon: UserCheck,
    title: "2. User Accounts & Verification",
    content:
      "Users must be at least 18 years old to reserve or list outdoor equipment. You agree to provide accurate, up-to-date identification details and maintain the security of your account credentials.",
  },
  {
    icon: PackageCheck,
    title: "3. Rental Agreements & Equipment Condition",
    content:
      "Renters agree to inspect all equipment upon pickup/delivery and confirm its functional condition. Equipment must be operated in accordance with the manufacturer instructions and safety recommendations.",
  },
  {
    icon: CreditCard,
    title: "4. Pricing, Payments & Security Deposits",
    content:
      "Daily rental fees, platform service charges, and any required security deposits are authorized and collected at checkout. Deposits are returned following the provider's check upon equipment return.",
  },
  {
    icon: AlertTriangle,
    title: "5. Damage, Loss & Late Return Fees",
    content:
      "Renters are responsible for returning all items by the agreed return time in clean condition. Late returns without prior provider authorization incur standard daily rates plus a late penalty.",
  },
  {
    icon: Ban,
    title: "6. Prohibited Activities",
    content:
      "Users may not sub-lease rented gear to unauthorized third parties, use equipment in violation of local laws, list counterfeit equipment, or circumvent platform payment channels.",
  },
  {
    icon: Scale,
    title: "7. Limitation of Liability & Dispute Resolution",
    content:
      "GearUp serves as a marketplace facilitating peer-to-peer equipment sharing. Outdoor activities carry inherent physical risks. Users participate at their own risk and agree to resolve disputes via platform mediation.",
  },
];

export default function TermsPage() {
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
              <Scale className="size-6" />
            </div>

            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Terms of Service
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Terms & Conditions
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
              Effective Date: August 2026 • GearUp Marketplace
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
        <div className="space-y-8">
          {terms.map((term, idx) => {
            const Icon = term.icon;
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
                    {term.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground pl-12">
                  {term.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Callout */}
        <div className="mt-12 rounded-2xl border border-dashed p-6 text-center bg-muted/20">
          <h3 className="font-bold text-foreground text-sm">
            Have questions about our Terms?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Please read our{" "}
            <Link href="/rental-policy" className="text-primary font-semibold hover:underline">
              Rental Policy
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              contact our legal team
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

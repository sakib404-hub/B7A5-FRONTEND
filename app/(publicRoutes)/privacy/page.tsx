"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Server,
  Bell,
  Mail,
} from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    content:
      "When you create an account, list gear, or make a rental reservation, we collect personal information such as your name, email address, contact phone number, delivery address, and identification for security verification. For providers, we may also collect bank payout information.",
  },
  {
    icon: Server,
    title: "2. How We Use Your Information",
    content:
      "We use collected information to facilitate rental bookings, verify identities, process payments securely, prevent fraudulent listings, notify you of reservation updates, and improve marketplace reliability.",
  },
  {
    icon: Lock,
    title: "3. Data Security & Payment Protection",
    content:
      "All payment transactions and sensitive credentials are encrypted using industry-standard SSL/TLS protocols. We never store raw credit card numbers on our servers; payments are processed directly through certified payment gateways.",
  },
  {
    icon: UserCheck,
    title: "4. Information Sharing & Third Parties",
    content:
      "We only share necessary contact and booking details between renters and gear providers to facilitate pickup and return. We never sell or lease your personal data to third-party advertisers or external marketing platforms.",
  },
  {
    icon: Bell,
    title: "5. Cookies & Local Storage",
    content:
      "We use functional cookies and secure session tokens to keep you logged in, store temporary cart selections, and remember your dashboard preferences across visits.",
  },
  {
    icon: FileText,
    title: "6. Your Rights & Data Retention",
    content:
      "You have the right to access, update, or request the deletion of your personal data at any time through your profile settings or by contacting our data protection officer.",
  },
];

export default function PrivacyPolicyPage() {
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
              <Shield className="size-6" />
            </div>

            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Legal & Trust
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Privacy Policy
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
              Last Updated: August 2026 • Version 2.1
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
        <div className="space-y-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
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
                    {section.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground pl-12">
                  {section.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 rounded-2xl border border-dashed p-6 text-center bg-muted/20">
          <h3 className="font-bold text-foreground text-sm">
            Questions regarding our privacy practices?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Contact our Data Protection Officer at privacy@gearup.com or through
            our{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              support portal
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

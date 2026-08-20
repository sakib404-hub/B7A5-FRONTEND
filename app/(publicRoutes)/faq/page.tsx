"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  HelpCircle,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: string;
  category: "all" | "rentals" | "payments" | "damage" | "providers";
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    category: "rentals",
    question: "How does renting equipment on GearUp work?",
    answer:
      "Simply browse our catalog, select your desired adventure gear, pick your rental start and return dates, and proceed to booking. Once confirmed by the provider, you can arrange local pickup or express delivery before your expedition begins.",
  },
  {
    id: "2",
    category: "rentals",
    question: "How early in advance should I reserve my gear?",
    answer:
      "We recommend reserving at least 3-7 days in advance for weekend trips, and 2-3 weeks ahead during peak holiday trekking seasons to ensure availability of popular 4-season tents and backpacks.",
  },
  {
    id: "3",
    category: "payments",
    question: "What payment methods are accepted?",
    answer:
      "We support secure online debit/credit cards, mobile banking gateways (bKash, Nagad), and online bank transfers through SSLCommerz / Stripe.",
  },
  {
    id: "4",
    category: "payments",
    question: "How do security deposits work?",
    answer:
      "Certain high-value expedition items require a refundable security deposit during booking. Once the gear is returned in good condition, the deposit is automatically released back to your original payment method within 24-48 hours.",
  },
  {
    id: "5",
    category: "damage",
    question: "What happens if gear gets damaged or wet during my trip?",
    answer:
      "Minor normal wear and tear is expected. If significant damage or tear occurs, please notify the provider immediately through your dashboard. If you selected GearUp Trip Protection at checkout, accidental repairs are covered up to $300.",
  },
  {
    id: "6",
    category: "damage",
    question: "Do I need to clean the equipment before returning?",
    answer:
      "We ask all renters to shake out sand/dirt and dry out wet tents/sleeping bags before packing them up. Deep sanitization is handled by the gear provider upon return.",
  },
  {
    id: "7",
    category: "providers",
    question: "How can I become a Gear Provider and list my equipment?",
    answer:
      "Sign up for a Provider account or switch your role in your profile. You can list your unused outdoor gear, set daily rates, upload photos, and start earning passive income while your equipment is not in use.",
  },
  {
    id: "8",
    category: "rentals",
    question: "What is the cancellation policy?",
    answer:
      "Full refunds are provided for cancellations made at least 48 hours before the scheduled rental pickup date. Cancellations within 48 hours may be subject to a 20% reservation fee.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [openIds, setOpenIds] = useState<string[]>(["1"]);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesQuery =
      !search ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
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
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Help Center & FAQs
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Frequently Asked Questions
            </h1>

            <p className="mt-4 text-base text-muted-foreground">
              Find answers to common questions about reservations, deposits,
              protection plans, and listing your gear.
            </p>

            {/* Search Bar */}
            <div className="mt-8 relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions (e.g. deposit, damage, cancel)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-2xl border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { label: "All Questions", value: "all" },
            { label: "Rentals & Booking", value: "rentals" },
            { label: "Payments & Deposits", value: "payments" },
            { label: "Damage & Care", value: "damage" },
            { label: "Providers", value: "providers" },
          ].map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIds.includes(faq.id);

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-2xl border bg-card shadow-2xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleOpen(faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left font-semibold text-foreground transition hover:bg-muted/30 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`size-4.5 text-muted-foreground transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/50 p-5 pt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground bg-muted/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed p-12 text-center">
              <HelpCircle className="mx-auto size-10 text-muted-foreground/60" />
              <h3 className="mt-3 font-semibold text-foreground">
                No matching questions found
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Try searching with different keywords or reset your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl border bg-card p-8 text-center shadow-xs"
        >
          <h3 className="text-lg font-bold text-foreground">
            Still have questions or need assistance?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Our outdoor gear support specialists are available 7 days a week to
            help you with custom bookings or provider onboarding.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
          >
            Contact Support Team
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

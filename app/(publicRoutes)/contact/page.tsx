"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@gearup.com",
    subtext: "Support responds in under 2 hours",
  },
  {
    icon: Phone,
    title: "Call or WhatsApp",
    detail: "+880 1XXX-XXXXXX",
    subtext: "Mon-Sat: 9:00 AM - 9:00 PM",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    detail: "Dhaka, Bangladesh",
    subtext: "Gear Hub & Regional Support",
  },
  {
    icon: Clock,
    title: "Rental Support",
    detail: "24/7 Active Rental Assistance",
    subtext: "Emergency support for active rentals",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", topic: "general", message: "" });
    }, 1000);
  };

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
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Contact & Support
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              We&apos;re Here to Help
            </h1>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Have questions about booking equipment, listing your gear, or
              need help with an active rental? Reach out to our team anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold text-foreground">
              Direct Contact Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose the communication channel that works best for you.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-xs"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-bold text-foreground">
                        {item.detail}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.subtext}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* FAQ Helper Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="size-5 text-primary shrink-0" />
                <h3 className="font-bold text-foreground text-sm">
                  Looking for quick answers?
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Find immediate answers about deposits, delivery, cancellation,
                and insurance on our FAQ page.
              </p>
              <Link
                href="/faq"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                Visit FAQ Center
                <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border bg-card p-8 sm:p-10 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b pb-6 mb-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Send Us a Message
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Fill out the form below and we will respond promptly.
                  </p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    Message Delivered!
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-xs text-muted-foreground">
                    Our support team has received your message and will get back
                    to you at your provided email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Your Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="rental-help">Help with an Active Rental</option>
                      <option value="provider-support">Provider & Listing Support</option>
                      <option value="partnerships">Partnership or Business</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please describe how we can assist you..."
                      className="w-full rounded-xl border bg-background p-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="size-4" />
                    {isSubmitting ? "Sending Message..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

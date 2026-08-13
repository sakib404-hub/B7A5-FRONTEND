"use client";

import { motion , type Variants } from "framer-motion";
import {
  CheckCircle2,
  ClipboardList,
  CreditCard,
  PackageCheck,
  RotateCcw,
  Search,
  ShieldCheck,
  Star,
  UserCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find Your Gear",
    description:
      "Browse available gear and choose the equipment that fits your needs. Check the price, availability, provider, and gear details.",
    icon: Search,
  },
  {
    number: "02",
    title: "Place Your Order",
    description:
      "Select your rental dates and submit your order. Your request will be sent to the provider for confirmation.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Provider Confirms",
    description:
      "The provider reviews your request and confirms the rental if the gear is available for your selected dates.",
    icon: UserCheck,
  },
  {
    number: "04",
    title: "Make Payment",
    description:
      "After your order is confirmed, complete the payment securely to finalize your rental.",
    icon: CreditCard,
  },
  {
    number: "05",
    title: "Receive Your Gear",
    description:
      "The provider prepares and hands over the gear. You can now use the equipment during your rental period.",
    icon: PackageCheck,
  },
  {
    number: "06",
    title: "Return & Review",
    description:
      "When your rental period ends, return the gear to the provider and share your experience by leaving a review.",
    icon: RotateCcw,
  },
];

const customerSteps = [
  "Choose your gear",
  "Place an order",
  "Wait for provider confirmation",
  "Complete payment",
  "Receive and use the gear",
  "Return and leave a review",
];

const providerSteps = [
  "List your gear",
  "Receive rental requests",
  "Review the order",
  "Confirm the rental",
  "Provide the gear",
  "Receive the gear back",
];

const containerVariants  : Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants : Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const HowItWorks = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b bg-muted/30">
        {/* Animated background shapes */}
        <motion.div
          className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-8 lg:py-28"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              type: "spring",
            }}
            className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium text-primary shadow-sm"
          >
            <ShieldCheck className="h-4 w-4" />
            Simple. Secure. Reliable.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            How <span className="text-primary">Gear Rental</span> Works
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            From finding the perfect gear to returning it and sharing your
            experience, our rental process keeps everything simple.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= STEPS ================= */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            The Rental Journey
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            How the Process Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Six simple steps from ordering your gear to completing your rental.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 48px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-6 top-6 hidden w-px bg-border md:block"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-8"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="relative flex gap-5 md:gap-8"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      rotate: 5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary/10 text-primary shadow-sm"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      y: -6,
                      transition: { duration: 0.2 },
                    }}
                    className="group flex-1 rounded-2xl border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">
                          Step {step.number}
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                          {step.title}
                        </h3>
                      </div>

                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="hidden rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:block"
                      >
                        {step.number}
                      </motion.span>
                    </div>

                    <p className="mt-3 leading-7 text-muted-foreground">
                      {step.description}
                    </p>

                    {/* Animated bottom line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                      className="mt-5 h-0.5 bg-primary"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= CUSTOMER / PROVIDER ================= */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Two Sides of the Marketplace
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Simple for Customers & Providers
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Customer */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: -5,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <UserCheck className="h-6 w-6" />
                </motion.div>

                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>

                  <h3 className="text-xl font-bold">
                    Rent what you need
                  </h3>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 space-y-4"
              >
                {customerSteps.map((item) => (
                  <motion.div
                    key={item}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />

                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Provider */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <PackageCheck className="h-6 w-6" />
                </motion.div>

                <div>
                  <p className="text-sm text-muted-foreground">Provider</p>

                  <h3 className="text-xl font-bold">
                    Share your equipment
                  </h3>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 space-y-4"
              >
                {providerSteps.map((item) => (
                  <motion.div
                    key={item}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />

                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            type: "spring",
          }}
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Star className="h-7 w-7" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-3xl font-bold sm:text-4xl"
        >
          Rent. Use. Return. Review.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground"
        >
          A simple rental experience built around trust between customers and
          providers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto flex w-fit items-center gap-2 rounded-full border bg-background px-5 py-2.5 text-sm font-medium shadow-sm"
          >
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Simple & Trusted Rental Experience
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default HowItWorks;

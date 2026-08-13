"use client";

import { motion , type Variants} from "framer-motion";
import {
  ClipboardList,
  CreditCard,
  PackageCheck,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Choose Gear",
    description: "Find the equipment you need.",
    icon: ClipboardList,
  },
  {
    title: "Get Confirmed",
    description: "The provider confirms your order.",
    icon: PackageCheck,
  },
  {
    title: "Pay Securely",
    description: "Complete your payment safely.",
    icon: CreditCard,
  },
  {
    title: "Use & Return",
    description: "Enjoy your gear and return it.",
    icon: RotateCcw,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="border-y bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Simple Process
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            How It Works
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Renting your favorite gear is only a few simple steps away.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="mt-12 grid gap-8 md:grid-cols-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                <div className="mt-5 text-xs font-bold text-primary">
                  STEP {index + 1}
                </div>

                <h3 className="mt-1 text-lg font-bold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/how-it-works"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Learn more about how it works →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

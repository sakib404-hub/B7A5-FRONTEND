"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  ShieldCheck,
  Users,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    title: "Trusted Providers",
    description:
      "Connect with providers offering quality equipment for your adventures.",
    icon: Users,
  },
  {
    title: "Secure Payments",
    description:
      "Your rental payments are handled through a secure payment process.",
    icon: CreditCard,
  },
  {
    title: "Quality Gear",
    description:
      "Discover equipment for camping, hiking, cycling, sports, and more.",
    icon: ShieldCheck,
  },
  {
    title: "Simple Returns",
    description:
      "Return your equipment after your rental period and complete your journey.",
    icon: RotateCcw,
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Built for Better Adventures
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Everything you need for a simple and reliable gear rental
            experience.
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
                staggerChildren: 0.1,
              },
            },
          }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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
                whileHover={{
                  y: -6,
                }}
                className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-5 font-bold">{feature.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
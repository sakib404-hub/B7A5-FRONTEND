"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="px-6 pb-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-xl sm:px-12"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-primary-foreground/10"
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-primary-foreground/10"
        />

        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
            }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10"
          >
            <Compass className="h-7 w-7" />
          </motion.div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Ready for Your Next Adventure?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Find the gear you need, rent it from a trusted provider, and start
            your next adventure today.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link
              href="/gear"
              className="group inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 font-semibold text-foreground shadow-lg"
            >
              Explore Gear
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;

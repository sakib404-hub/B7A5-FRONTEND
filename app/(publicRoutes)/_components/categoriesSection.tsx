"use client";

import { motion } from "framer-motion";
import {
  Bike,
  Dumbbell,
  Fish,
  Mountain,
  Tent,
  Trophy,
  Waves,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Camping",
    description: "Tents and outdoor essentials",
    icon: Tent,
  },
  {
    name: "Hiking",
    description: "Gear for trails and trekking",
    icon: Mountain,
  },
  {
    name: "Cycling",
    description: "Bikes and cycling equipment",
    icon: Bike,
  },
  {
    name: "Water Sports",
    description: "Gear for water adventures",
    icon: Waves,
  },
  {
    name: "Fitness",
    description: "Workout and exercise gear",
    icon: Dumbbell,
  },
  {
    name: "Fishing",
    description: "Rods and fishing equipment",
    icon: Fish,
  },
  {
    name: "Team Sports",
    description: "Sports equipment for teams",
    icon: Trophy,
  },
];

const CategoriesSection = () => {
  return (
    <section className="border-y bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Browse by Category
            </h2>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Find the right equipment for whatever adventure you're planning.
            </p>
          </div>

          <Link
            href="/categories"
            className="group flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View All Categories
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 25,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                whileHover={{
                  y: -6,
                }}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-bold">{category.name}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;

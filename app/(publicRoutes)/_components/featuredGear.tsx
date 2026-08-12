"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package, Star } from "lucide-react";
import Link from "next/link";

const featuredGear = [
  {
    id: "1",
    title: "Cycling Helmet",
    brand: "Giro",
    price: 10,
  },
  {
    id: "2",
    title: "Camping Tent",
    brand: "Naturehike",
    price: 25,
  },
  {
    id: "3",
    title: "Hiking Backpack",
    brand: "Osprey",
    price: 15,
  },
  {
    id: "4",
    title: "Fishing Rod",
    brand: "Shimano",
    price: 12,
  },
];

const FeaturedGearSection = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Popular Gear
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Featured Equipment
            </h2>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Check out some of the gear available from our providers.
            </p>
          </div>

          <Link
            href="/browse-gear"
            className="group flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Browse All Gear
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
                staggerChildren: 0.1,
              },
            },
          }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredGear.map((gear) => (
            <motion.div
              key={gear.id}
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
                y: -8,
              }}
              className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="flex h-48 items-center justify-center bg-muted">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-background shadow-sm"
                >
                  <Package className="h-10 w-10 text-primary" />
                </motion.div>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {gear.brand}
                </p>

                <h3 className="mt-1 text-lg font-bold">{gear.title}</h3>

                <div className="mt-3 flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-current text-amber-500" />
                  <span className="font-medium">5.0</span>
                  <span className="text-muted-foreground">
                    Excellent
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold">
                      ${gear.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      / day
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedGearSection;

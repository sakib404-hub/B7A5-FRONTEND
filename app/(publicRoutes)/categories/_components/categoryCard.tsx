"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bike,
  Dumbbell,
  Fish,
  Mountain,
  Tent,
  Trophy,
  Waves,
  Snowflake,
  Trees,
  Backpack,
  Shield,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface CategoryCardProps {
  category: Category;
}

const iconMap = {
  Camping: Tent,
  Hiking: Mountain,
  Cycling: Bike,
  "Water Sports": Waves,
  "Winter Sports": Snowflake,
  Fitness: Dumbbell,
  Climbing: Mountain,
  Fishing: Fish,
  "Team Sports": Trophy,
  Adventure: Backpack,
  "Jungle Adventure": Trees,
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon =
    iconMap[category.name as keyof typeof iconMap] || Shield;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
      }}
      className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5"
        whileHover={{
          scale: 1.4,
        }}
        transition={{
          duration: 0.4,
        }}
      />

      {/* Icon */}
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: -5,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
        }}
        className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary"
      >
        <Icon className="h-7 w-7" />
      </motion.div>

      {/* Content */}
      <div className="relative mt-6">
        <h3 className="text-xl font-bold tracking-tight">
          {category.name}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {category.description}
        </p>
      </div>

      {/* Explore */}
      <motion.div
        initial={{
          x: 0,
        }}
        whileHover={{
          x: 5,
        }}
        className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-primary"
      >
        Explore Gear
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.div>

      {/* Bottom animated line */}
      <motion.div
        initial={{
          width: 0,
        }}
        whileHover={{
          width: "100%",
        }}
        transition={{
          duration: 0.3,
        }}
        className="absolute bottom-0 left-0 h-1 bg-primary"
      />
    </motion.div>
  );
};

export default CategoryCard;
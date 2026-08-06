"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
  Package,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { Gear } from "./gearDetails";

interface GearInfoProps {
  gear: Gear;
}

export const GearInfo = ({ gear }: GearInfoProps) => {
  const isAvailable = gear.status === "AVAILABLE";

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {gear.brand}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              isAvailable
                ? "bg-green-500/10 text-green-600"
                : "bg-red-500/10 text-red-600"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>

        <h2 className="text-2xl font-bold">
          About this gear
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          {gear.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoItem
          icon={<Tag className="h-5 w-5" />}
          label="Brand"
          value={gear.brand}
        />

        <InfoItem
          icon={<Package className="h-5 w-5" />}
          label="Available Stock"
          value={`${gear.stockQuantity} items`}
        />

        <InfoItem
          icon={<BadgeCheck className="h-5 w-5" />}
          label="Condition"
          value="Ready to rent"
        />

        <InfoItem
          icon={<CalendarDays className="h-5 w-5" />}
          label="Rental Type"
          value="Daily rental"
        />
      </div>

      <div className="rounded-xl border bg-muted/30 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />

          <div>
            <h3 className="font-semibold">
              Safe & reliable rental
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Check the gear condition before pickup and return
              it within the agreed rental period.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <p className="font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
};
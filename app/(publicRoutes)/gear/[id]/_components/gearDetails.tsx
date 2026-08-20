"use client";

import { motion } from "framer-motion";
import { GearGallery } from "./gearGallery";
import { GearInfo } from "./gearInformation";
import { GearBookingCard } from "./gearBooking";
import { GearReviews } from "./gearReviews";


export interface Gear {
  id: string;
  title: string;
  description: string;
  pricePerDay: number;
  brand: string;
  stockQuantity: number;
  status: "AVAILABLE" | "UNAVAILABLE";
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
}

export interface Review {
  id?: string;
  rating?: number;
  comment?: string;
  user?: {
    name?: string;
  };
}

import { IUser } from "@/types/types";

interface GearDetailsProps {
  gear: Gear;
  user?: IUser | null;
}

export const GearDetails = ({ gear, user }: GearDetailsProps) => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="mb-2 text-sm text-muted-foreground">
          Home / Gear / {gear.title}
        </div>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {gear.title}
        </h1>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-10">
          <GearGallery gear={gear} />

          <GearInfo gear={gear} />

          <GearReviews reviews={gear.reviews} />
        </div>

        <div>
          <GearBookingCard gear={gear} user={user} />
        </div>
      </div>
    </div>
  );
};
"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Gear } from "./gearDetails";

interface GearGalleryProps {
  gear: Gear;
}

export const GearGallery = ({ gear }: GearGalleryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border bg-muted/30"
    >
      <div className="flex aspect-16/10 items-center justify-center bg-linear-to-br from-primary/10 via-background to-primary/5">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-background shadow-sm">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>

          <p className="text-sm text-muted-foreground">
            {gear.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
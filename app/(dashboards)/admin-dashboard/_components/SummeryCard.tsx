"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
}

export const SummaryCard = ({
  title,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      whileHover={{
        y: -5,
      }}
      className="h-full"
    >
      <Card
        className="
          h-full
          border-[#d8e9e5]
          bg-white
          shadow-[0_4px_20px_rgba(52,90,80,0.06)]
          transition-shadow
          duration-300
          hover:shadow-[0_8px_25px_rgba(52,90,80,0.10)]
        "
      >
        <CardContent className="flex h-full items-center justify-between p-5">
          {/* Left Content */}
          <div>
            <p className="text-sm font-medium text-slate-600">
              {title}
            </p>

            <motion.h3
              key={value}
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="mt-2 text-2xl font-bold text-slate-800"
            >
              {value}
            </motion.h3>

            {description && (
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.1,
                }}
                className="mt-1 text-xs text-slate-500"
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Icon */}
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
            className="
              rounded-xl
              bg-[#e8f3f0]
              p-3
            "
          >
            <Icon className="h-5 w-5 text-[#3f7167]" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";
import { Review } from "./gearDetails";

interface GearReviewsProps {
  reviews: Review[];
}

export const GearReviews = ({
  reviews,
}: GearReviewsProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t pt-10"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Customer Reviews
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          See what other renters think about this gear.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
          </div>

          <h3 className="font-semibold">
            No reviews yet
          </h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Be the first person to rent this gear and share
            your experience.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id ?? index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              className="rounded-xl border p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {review.user?.name ?? "Anonymous"}
                  </p>

                  <div className="mt-1 flex gap-1">
                    {Array.from({
                      length: review.rating ?? 0,
                    }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};
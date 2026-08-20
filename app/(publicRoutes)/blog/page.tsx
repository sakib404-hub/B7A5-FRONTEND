"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  category: "Gear Guides" | "Camping Tips" | "Adventure Trails" | "Maintenance";
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
}

const posts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate 2026 Checklist for High-Altitude Camping & Trekking",
    category: "Camping Tips",
    excerpt:
      "Everything you need to know before packing your backpack for cold-weather alpine treks, from four-season sleep systems to ultralight camp stoves.",
    readTime: "6 min read",
    date: "Aug 15, 2026",
    author: "Shakib Hossain",
    featured: true,
  },
  {
    id: "2",
    title: "How to Choose the Right Backpacking Tent: 3-Season vs 4-Season",
    category: "Gear Guides",
    excerpt:
      "A complete breakdown of vestibules, hydrostatic head ratings, pole architectures, and ventilation systems for stormy nights in the wild.",
    readTime: "5 min read",
    date: "Aug 10, 2026",
    author: "Elena Rostova",
  },
  {
    id: "3",
    title: "5 Essential Maintenance Habits to Make Rental Gear Last a Lifetime",
    category: "Maintenance",
    excerpt:
      "Simple habits for drying canvas, cleaning zippers, and reproofing DWR water-repellent coatings to keep outdoor gear in mint condition.",
    readTime: "4 min read",
    date: "Jul 28, 2026",
    author: "Marcus Vance",
  },
  {
    id: "4",
    title: "Top 7 Underrated Hiking Trails in South Asia for Weekend Escapes",
    category: "Adventure Trails",
    excerpt:
      "Discover breathtaking ridge trails, lush mountain forests, and secluded campsites without the crowds.",
    readTime: "7 min read",
    date: "Jul 19, 2026",
    author: "Sarah Lin",
  },
  {
    id: "5",
    title: "The Circular Economy of Adventure: Why Renting Equipment Beats Buying",
    category: "Gear Guides",
    excerpt:
      "How peer-to-peer equipment sharing lowers the carbon footprint of outdoor adventures while saving explorers thousands of dollars.",
    readTime: "5 min read",
    date: "Jul 05, 2026",
    author: "Shakib Hossain",
  },
  {
    id: "6",
    title: "Camp Cooking 101: Ultralight Meals That Taste Gourmet on the Summit",
    category: "Camping Tips",
    excerpt:
      "Nutritious high-calorie backcountry recipes requiring minimal fuel, one pot, and zero cleanup headaches.",
    readTime: "4 min read",
    date: "Jun 24, 2026",
    author: "David Miller",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Gear Guides",
    "Camping Tips",
    "Adventure Trails",
    "Maintenance",
  ];

  const filteredPosts = posts.filter(
    (post) =>
      selectedCategory === "All" || post.category === selectedCategory
  );

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-muted/30 py-16 lg:py-20">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl"
          >
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              The GearUp Journal
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Stories, Guides & Adventure Insights
            </h1>

            <p className="mt-4 text-base text-muted-foreground">
              Expert advice, gear packing checklists, trail reviews, and stories
              from our community of outdoor adventurers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post (shown if All or matching category) */}
        {selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-14 overflow-hidden rounded-3xl border bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid lg:grid-cols-12">
              <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-12">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="text-xs uppercase">
                      Featured Guide
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl text-foreground max-w-3xl">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-3xl">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                  <div className="flex items-center gap-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <User className="size-3.5 text-primary" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link
                    href="/gear"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline"
                  >
                    Read Full Article
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Posts Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-xs transition-shadow duration-300 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-foreground line-clamp-2">
                  {post.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                <span className="font-medium">{post.date}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:underline">
                  Read Article
                  <ArrowRight className="size-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}

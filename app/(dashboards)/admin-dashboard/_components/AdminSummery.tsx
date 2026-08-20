"use client";

import { motion, type Variants } from "framer-motion";
import {
  Users,
  UserRound,
  FolderTree,
  Package,
  CreditCard,
  TrendingUp,
  CalendarDays,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

import { UserDistributionChart } from "./UserDistributionChart";
import { AdminSummary as AdminSummaryType } from "@/types/adminSummery";
import { SummaryCard } from "./SummeryCard";
import { RentalStatusChart } from "./RentalChart";
import { GearAvailabilityChart } from "./GearAvailability";
import { PaymentOverview } from "./PaymentOverView";

interface Props {
  summary: AdminSummaryType;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

interface InsightCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: LucideIcon;
  colorClass?: string;
}

const InsightCard = ({
  title,
  value,
  description,
  icon: Icon,
  colorClass = "text-primary",
}: InsightCardProps) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    className="rounded-2xl border border-border/60 bg-card p-4 shadow-xs transition-all hover:shadow-md"
  >
    <div className="mb-2 flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </span>
      {Icon && <Icon className={`size-4 ${colorClass}`} />}
    </div>

    <p className="text-2xl font-bold tracking-tight text-foreground">
      {value}
    </p>

    <p className="mt-1 text-xs text-muted-foreground/80">
      {description}
    </p>
  </motion.div>
);

export const AdminSummary = ({ summary }: Props) => {
  const completionRate =
    summary.rentals.total > 0
      ? Math.round((summary.rentals.completed / summary.rentals.total) * 100)
      : 0;

  const gearAvailability =
    summary.gears.total > 0
      ? Math.round((summary.gears.available / summary.gears.total) * 100)
      : 0;

  const providerRatio =
    summary.users.total > 0
      ? Math.round((summary.users.providers / summary.users.total) * 100)
      : 0;

  const paymentRate =
    summary.rentals.total > 0
      ? Math.round((summary.payments.paidOrders / summary.rentals.total) * 100)
      : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* 4-Column Primary Metrics */}
      <motion.section
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <SummaryCard
          title="Total Users"
          value={summary.users.total}
          description={`${summary.users.customers} registered customers`}
          icon={Users}
          colorClass="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
        />

        <SummaryCard
          title="Equipment Providers"
          value={summary.users.providers}
          description={`${providerRatio}% of total community`}
          icon={UserRound}
          colorClass="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
        />

        <SummaryCard
          title="Gear Catalog"
          value={summary.gears.total}
          description={`${summary.gears.available} ready for bookings`}
          icon={Package}
          colorClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
        />

        <SummaryCard
          title="Categories"
          value={summary.categories.total}
          description="Active equipment categories"
          icon={FolderTree}
          colorClass="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
        />
      </motion.section>

      {/* 2-Column Big Financial Highlights */}
      <motion.section
        variants={itemVariants}
        className="grid gap-4 md:grid-cols-2"
      >
        <SummaryCard
          title="Gross Platform Revenue"
          value={`$${summary.payments.totalRevenue.toLocaleString()}`}
          description={`${summary.payments.total} processed payments`}
          icon={CreditCard}
          colorClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
        />

        <SummaryCard
          title="Lifetime Rental Volume"
          value={summary.rentals.total}
          description={`${summary.rentals.completed} successfully fulfilled`}
          icon={CalendarDays}
          colorClass="bg-primary/10 text-primary border-primary/20"
        />
      </motion.section>

      {/* Rental Bar Distribution */}
      <motion.section variants={itemVariants}>
        <RentalStatusChart rentals={summary.rentals} />
      </motion.section>

      {/* 3-Column Analytics Grid */}
      <motion.section
        variants={itemVariants}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <UserDistributionChart users={summary.users} />
        <GearAvailabilityChart gears={summary.gears} />
        <PaymentOverview payments={summary.payments} />
      </motion.section>

      {/* Quick Insights Matrix */}
      <motion.section
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <InsightCard
          title="Order Completion"
          value={`${completionRate}%`}
          description="Rentals completed vs total"
          icon={TrendingUp}
          colorClass="text-emerald-500"
        />

        <InsightCard
          title="Readiness Ratio"
          value={`${gearAvailability}%`}
          description="Available inventory vs total"
          icon={Package}
          colorClass="text-primary"
        />

        <InsightCard
          title="Provider Base"
          value={`${providerRatio}%`}
          description="Provider percentage of users"
          icon={UserRound}
          colorClass="text-purple-500"
        />

        <InsightCard
          title="Settlement Rate"
          value={`${paymentRate}%`}
          description="Orders with confirmed payments"
          icon={CreditCard}
          colorClass="text-blue-500"
        />
      </motion.section>
    </motion.div>
  );
};
"use client";

import { motion,  type Variants } from "framer-motion";
import {
  Users,
  UserRound,
  FolderTree,
  Package,
  CreditCard,
  TrendingUp,
  CalendarDays,
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

/* =========================
   Animation Variants
========================= */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants : Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/* =========================
   Reusable Insight Card
========================= */
interface InsightCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: LucideIcon;
}

const InsightCard = ({
  title,
  value,
  description,
  icon: Icon,
}: InsightCardProps) => (
  <motion.div
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
    className="rounded-xl border border-border bg-card p-4"
  >
    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
      {Icon && <Icon className="h-4 w-4 text-primary" />}
      {title}
    </div>

    <p className="text-2xl font-bold text-foreground">
      {value}
    </p>

    <p className="mt-1 text-xs text-muted-foreground">
      {description}
    </p>
  </motion.div>
);

/* =========================
   Main Component
========================= */
export const AdminSummary = ({ summary }: Props) => {
  const completionRate =
    summary.rentals.total > 0
      ? Math.round(
          (summary.rentals.completed /
            summary.rentals.total) *
            100
        )
      : 0;

  const gearAvailability =
    summary.gears.total > 0
      ? Math.round(
          (summary.gears.available /
            summary.gears.total) *
            100
        )
      : 0;

  const providerRatio =
    summary.users.total > 0
      ? Math.round(
          (summary.users.providers /
            summary.users.total) *
            100
        )
      : 0;

  const paymentRate =
    summary.rentals.total > 0
      ? Math.round(
          (summary.payments.paidOrders /
            summary.rentals.total) *
            100
        )
      : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* =========================
          Primary Statistics
      ========================== */}
      <motion.section
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <SummaryCard
          title="Total Users"
          value={summary.users.total}
          description={`${summary.users.customers} customers`}
          icon={Users}
        />

        <SummaryCard
          title="Providers"
          value={summary.users.providers}
          description="Gear providers"
          icon={UserRound}
        />

        <SummaryCard
          title="Categories"
          value={summary.categories.total}
          description="Gear categories"
          icon={FolderTree}
        />

        <SummaryCard
          title="Total Gear"
          value={summary.gears.total}
          description={`${summary.gears.available} currently available`}
          icon={Package}
        />
      </motion.section>

      {/* =========================
          Highlight Statistics
      ========================== */}
      <motion.section
        variants={itemVariants}
        className="grid gap-4 md:grid-cols-2"
      >
        <SummaryCard
          title="Total Revenue"
          value={`৳${summary.payments.totalRevenue}`}
          description={`${summary.payments.total} successful payments`}
          icon={CreditCard}
        />

        <SummaryCard
          title="Total Rentals"
          value={summary.rentals.total}
          description={`${summary.rentals.completed} rentals completed`}
          icon={CalendarDays}
        />
      </motion.section>

      {/* =========================
          Rental Analytics
      ========================== */}
      <motion.section variants={itemVariants}>
        <RentalStatusChart rentals={summary.rentals} />
      </motion.section>

      {/* =========================
          Analytics Grid
      ========================== */}
      <motion.section
        variants={itemVariants}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <UserDistributionChart users={summary.users} />
        <GearAvailabilityChart gears={summary.gears} />
        <PaymentOverview payments={summary.payments} />
      </motion.section>

      {/* =========================
          Quick Insights
      ========================== */}
      <motion.section
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <InsightCard
          title="Completion Rate"
          value={`${completionRate}%`}
          description="Completed rentals"
          icon={TrendingUp}
        />

        <InsightCard
          title="Gear Availability"
          value={`${gearAvailability}%`}
          description="Gear currently available"
        />

        <InsightCard
          title="Provider Ratio"
          value={`${providerRatio}%`}
          description="Of total registered users"
        />

        <InsightCard
          title="Payment Rate"
          value={`${paymentRate}%`}
          description="Orders with payment"
        />
      </motion.section>
    </motion.div>
  );
};
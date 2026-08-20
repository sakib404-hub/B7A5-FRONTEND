import Link from "next/link";
import { Users, Layers, ShieldCheck } from "lucide-react";
import { IUser } from "@/types/types";
import { getAdminSummary } from "../_actions/getAdminSummery";
import { AdminSummary } from "./AdminSummery";
import { Button } from "@/components/ui/button";

const AdminDashboard = async ({ user }: { user: IUser }) => {
  const result = await getAdminSummary();

  if (!result?.success || !result.data) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-xs">
        <p className="text-sm font-medium text-muted-foreground">
          Failed to load administrative analytics data.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Admin Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-amber-500/10 via-card to-background p-6 md:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <ShieldCheck className="size-3.5" />
              <span>Platform Administration</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Executive Platform Console
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              System-wide metrics, inventory health, user moderation, and rental revenue performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="rounded-xl font-medium shadow-xs"
            >
              <Link href="/admin-dashboard/users">
                <Users className="mr-2 size-4" />
                Manage Users
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-xl border-border/80 bg-background/80 hover:bg-accent font-medium shadow-2xs"
            >
              <Link href="/admin-dashboard/gear">
                <Layers className="mr-2 size-4 text-primary" />
                Platform Equipment
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Administrative Summary */}
      <AdminSummary summary={result.data} />
    </div>
  );
};

export default AdminDashboard;

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Layers,
  Package,
  Search,
  Store,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gear } from "@/types/types";

interface AdminGearTableProps {
  gears: Gear[];
}

export const AdminGearTable = ({ gears = [] }: AdminGearTableProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredGears = (gears || []).filter((gear) => {
    const matchesSearch =
      gear.title.toLowerCase().includes(search.toLowerCase()) ||
      gear.brand.toLowerCase().includes(search.toLowerCase()) ||
      gear.provider?.name?.toLowerCase().includes(search.toLowerCase()) ||
      gear.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || gear.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center gap-3.5 border-b border-border/60 pb-6">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Layers className="size-6" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Platform Equipment Catalog
          </h1>
          <p className="text-sm text-muted-foreground">
            Audit inventory listings, monitor provider equipment, and inspect daily rental rates.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search equipment by title, brand, provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "AVAILABLE", "UNAVAILABLE"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-muted/40 text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {status === "ALL" ? "All Equipment" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs">
        <CardHeader className="border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="size-4.5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">
                All Listed Equipment
              </CardTitle>
            </div>

            <Badge variant="secondary" className="rounded-lg px-2.5 py-0.5 text-xs font-semibold">
              {filteredGears.length} of {gears.length} Items
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="pl-6 font-bold text-xs uppercase tracking-wider">
                    Equipment
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">
                    Brand
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">
                    Daily Rate
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">
                    Stock
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">
                    Provider
                  </TableHead>
                  <TableHead className="w-12 pr-6">
                    <span className="sr-only">View</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredGears.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-40 text-center text-xs text-muted-foreground"
                    >
                      No equipment records found matching your query.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGears.map((gear) => (
                    <TableRow
                      key={gear.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      {/* Equipment Info */}
                      <TableCell className="pl-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Package className="size-4.5" />
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-foreground text-sm line-clamp-1">
                              {gear.title}
                            </p>
                            <p className="font-mono text-[11px] text-muted-foreground">
                              ID: #{gear.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Brand */}
                      <TableCell>
                        <span className="font-medium text-xs text-foreground">
                          {gear.brand}
                        </span>
                      </TableCell>

                      {/* Daily Rate */}
                      <TableCell>
                        <span className="font-bold text-sm text-primary">
                          ${gear.pricePerDay}
                          <span className="text-[11px] font-normal text-muted-foreground">/day</span>
                        </span>
                      </TableCell>

                      {/* Stock */}
                      <TableCell>
                        <span className="font-mono text-xs font-semibold text-foreground">
                          {gear.stockQuantity} units
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                            gear.status === "AVAILABLE"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          <span
                            className={`mr-1.5 size-1.5 rounded-full ${
                              gear.status === "AVAILABLE" ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                          />
                          {gear.status.toLowerCase()}
                        </Badge>
                      </TableCell>

                      {/* Provider */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Store className="size-3.5 text-primary" />
                          <span className="font-medium text-foreground">
                            {gear.provider?.name || "Provider"}
                          </span>
                        </div>
                      </TableCell>

                      {/* External Link */}
                      <TableCell className="pr-6 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                        >
                          <Link href={`/gear/${gear.id}`} target="_blank">
                            <ExternalLink className="size-3.5" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

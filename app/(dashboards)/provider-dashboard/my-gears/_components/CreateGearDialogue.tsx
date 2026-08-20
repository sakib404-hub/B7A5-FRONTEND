"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CategoryDiaLogueProps } from "./GearHeader";
import { CreateGearForm } from "./GearForm";

export const CreateGearDialog = ({ categories }: CategoryDiaLogueProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-xl font-semibold shadow-xs">
          <Plus className="size-4" />
          Add New Equipment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-border/80 bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create Equipment Listing
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Provide details, pricing, and stock quantity to list your outdoor gear for rent.
          </DialogDescription>
        </DialogHeader>

        <CreateGearForm
          categories={categories}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
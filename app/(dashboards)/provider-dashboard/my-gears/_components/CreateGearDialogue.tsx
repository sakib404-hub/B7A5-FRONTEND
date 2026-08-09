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

export const CreateGearDialog = ({
  categories,
}: CategoryDiaLogueProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4" />
          Add Gear
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Add New Gear
          </DialogTitle>

          <DialogDescription>
            Add your gear information and make it
            available for customers to rent.
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
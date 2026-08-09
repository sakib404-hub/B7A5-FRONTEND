"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CreateGearDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Gear
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Gear</DialogTitle>

          <DialogDescription>
            Add your gear information and make it available
            for customers to rent.
          </DialogDescription>
        </DialogHeader>

        {/* Add Gear form later */}
        <div className="py-8 text-center text-sm text-muted-foreground">
          Gear creation form will be added here.
        </div>
      </DialogContent>
    </Dialog>
  );
};
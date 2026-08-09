"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditGearDialogProps {
  gear: any;
}

export const EditGearDialog = ({
  gear,
}: EditGearDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex-1 gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Edit {gear.title}
          </DialogTitle>

          <DialogDescription>
            Update your gear information.
          </DialogDescription>
        </DialogHeader>

        {/* 
          Later:

          useForm({
            defaultValues: {
              title: gear.title,
              description: gear.description,
              pricePerDay: gear.pricePerDay,
              stockQuantity: gear.stockQuantity,
              ...
            }
          })
        */}

        <div className="py-8 text-center text-sm text-muted-foreground">
          Edit gear form will be added here.
        </div>
      </DialogContent>
    </Dialog>
  );
};
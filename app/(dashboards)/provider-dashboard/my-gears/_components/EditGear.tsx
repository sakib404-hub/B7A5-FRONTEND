"use client";

import { Edit, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateGearInformation } from "../_actions/updateGearInformation";

interface EditGearDialogProps {
  gear: {
    id: string;
    title: string;
    description: string;
    pricePerDay: number;
  };
}

export interface EditGearFormData {
  title: string;
  description: string;
  pricePerDay: number;
}

export const EditGearDialog = ({ gear }: EditGearDialogProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<EditGearFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditGearFormData>({
    defaultValues: {
      title: gear.title,
      description: gear.description,
      pricePerDay: gear.pricePerDay,
    },
  });

  const onSubmit = (data: EditGearFormData) => {
    setFormData(data);
    setConfirmOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!formData) return;

    try {
      setIsUpdating(true);
      const result = await updateGearInformation(gear.id, formData);

      if (!result.success) {
        toast.error(result.message || "Failed to update gear");
        return;
      }

      toast.success(result.message || "Gear listing updated successfully");
      setConfirmOpen(false);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Update gear error:", error);
      toast.error("Something went wrong while updating the gear.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 rounded-xl border-border/80 text-xs font-semibold text-foreground hover:bg-accent"
          >
            <Edit className="size-3.5 text-primary" />
            Edit Info
          </Button>
        </DialogTrigger>

        <DialogContent className="rounded-2xl border-border/80 bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Edit Equipment Details
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update pricing, specifications, and overview for &quot;{gear.title}&quot;.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold">
                Gear Title
              </Label>
              <Input
                id="title"
                placeholder="Equipment title"
                className="rounded-xl"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your equipment..."
                rows={4}
                className="rounded-xl resize-none"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <Label htmlFor="pricePerDay" className="text-xs font-semibold">
                Price Per Day ($)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  id="pricePerDay"
                  type="number"
                  min={1}
                  step="0.01"
                  className="rounded-xl pl-7"
                  {...register("pricePerDay", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Price must be greater than 0",
                    },
                  })}
                />
              </div>
              {errors.pricePerDay && (
                <p className="text-xs text-destructive">{errors.pricePerDay.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 border-t border-border/50 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl font-semibold shadow-xs"
              >
                Review Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="rounded-2xl border-border/80 bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">
              Confirm Updates
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to save changes to &quot;{gear.title}&quot;? The listing will immediately reflect your new details across the marketplace.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel
              disabled={isUpdating}
              className="rounded-xl font-medium"
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmUpdate}
              disabled={isUpdating}
              className="rounded-xl font-semibold shadow-xs"
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Updates"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

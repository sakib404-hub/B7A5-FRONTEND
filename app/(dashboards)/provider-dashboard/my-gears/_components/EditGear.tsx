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

import { Spinner } from "@/components/ui/spinner";
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

  /*
   * User confirmed the update
   */
  const handleConfirmUpdate = async () => {
    if (!formData) return;

    try {
      setIsUpdating(true);
      const result = await updateGearInformation(gear.id, formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message || "Gear updated successfully");

      // Close dialogs
      setConfirmOpen(false);
      setOpen(false);

      // Refresh Server Components
      router.refresh();
    } catch (error) {
      console.error("Update gear error:", error);

      toast.error("Something went wrong while updating the gear.");
    }finally{
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
            className="flex-1 gap-2 border-emerald-200 hover:bg-emerald-50"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {gear.title}</DialogTitle>

            <DialogDescription>
              Update the information of your gear.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Gear Title</Label>

              <Input
                id="title"
                placeholder="Enter gear title"
                {...register("title", {
                  required: "Title is required",

                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },

                  maxLength: {
                    value: 100,
                    message: "Title cannot exceed 100 characters",
                  },
                })}
              />

              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                placeholder="Describe your gear..."
                rows={5}
                className="resize-none"
                {...register("description", {
                  required: "Description is required",

                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },

                  maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters",
                  },
                })}
              />

              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="pricePerDay">Price Per Day</Label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  ৳
                </span>

                <Input
                  id="pricePerDay"
                  type="number"
                  min={1}
                  step="0.01"
                  className="pl-8"
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
                <p className="text-sm text-destructive">
                  {errors.pricePerDay.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 border-t pt-5">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                {isUpdating ? <span className="flex items-center justify-center">
                  <Spinner></Spinner>
                  Updating..
                </span> : "Update Gear"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update this gear?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to update{" "}
              <span className="font-semibold text-foreground">
                {gear.title}
              </span>
              ? The current gear information will be replaced with your new
              information.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmUpdate}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isUpdating ? (
                <span className="flex items-center justify-center">
                  <Spinner></Spinner>
                  Updating...
                </span>
              ) : (
                "Yes, Update Gear"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

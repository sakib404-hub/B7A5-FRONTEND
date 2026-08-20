"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteGear } from "../_actions/deleteGear";

interface DeleteGearDialogProps {
  gear: {
    id: string;
    title: string;
  };
}

export const DeleteGearDialog = ({ gear }: DeleteGearDialogProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteGear(gear.id);

      if (!result.success) {
        toast.error(result.message || "Failed to delete gear");
        return;
      }

      toast.success(result.message || "Gear deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Delete gear error:", error);
      toast.error("Something went wrong while deleting the gear.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5 rounded-xl border-rose-500/30 text-xs font-semibold text-rose-600 hover:bg-rose-500/10 hover:text-rose-700 dark:text-rose-400"
        >
          <Trash2 className="size-3.5" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl border-border/80 bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">
            Delete Equipment Listing?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to remove{" "}
            <span className="font-semibold text-foreground">
              {gear.title}
            </span>{" "}
            from your active listings? This gear will no longer be available for customer rentals.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel
            disabled={isDeleting}
            className="rounded-xl border-border font-medium"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-xl bg-destructive hover:bg-destructive/90 font-medium text-destructive-foreground"
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Trash2 className="size-4" />
                Delete Listing
              </span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
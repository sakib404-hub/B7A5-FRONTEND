"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

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

import { deleteGear } from "../_actions/deleteGeat";

interface DeleteGearDialogProps {
  gear: {
    id: string;
    title: string;
  };
}

export const DeleteGearDialog = ({
  gear,
}: DeleteGearDialogProps) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] =
    useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const result = await deleteGear(gear.id);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        result.message || "Gear deleted successfully"
      );

      // Refresh Server Components
      router.refresh();
    } catch (error) {
      console.error(
        "Delete gear error:",
        error
      );

      toast.error(
        "Something went wrong while deleting the gear."
      );
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
          className="flex-1 gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete this gear?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {gear.title}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="gap-2 bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Spinner />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
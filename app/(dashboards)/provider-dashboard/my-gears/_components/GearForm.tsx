"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2, Package, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createGear } from "../_actions/createGear";

export interface CreateGearFormData {
  title: string;
  description: string;
  pricePerDay: number;
  brand: string;
  stockQuantity: number;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface CreateGearFormProps {
  categories: Category[];
  onSuccess: () => void;
}

export const CreateGearForm = ({
  categories,
  onSuccess,
}: CreateGearFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGearFormData>({
    defaultValues: {
      title: "",
      description: "",
      pricePerDay: 0,
      brand: "",
      stockQuantity: 1,
      categoryId: "",
    },
  });

  const onSubmit = async (data: CreateGearFormData) => {
    try {
      setIsCreating(true);

      const payload = {
        ...data,
        status: data.stockQuantity > 0 ? "AVAILABLE" : "UNAVAILABLE",
      };

      const result = await createGear(payload);

      if (!result.success) {
        toast.error(result.message || "Failed to create gear listing.");
        return;
      }

      toast.success(result.message || "Equipment listed successfully!");
      reset();
      router.refresh();
      onSuccess();
    } catch (error) {
      console.error("Create gear error:", error);
      toast.error("Something went wrong while creating the gear listing.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title" className="text-xs font-semibold">
          Gear Title
        </Label>
        <Input
          id="title"
          placeholder="e.g. Ultralight 2-Person Backpacking Tent"
          disabled={isCreating}
          className="rounded-xl"
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
          placeholder="Describe your equipment, condition, specifications, and included accessories..."
          rows={3}
          disabled={isCreating}
          className="resize-none rounded-xl"
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
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Price + Brand */}
      <div className="grid gap-3.5 sm:grid-cols-2">
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
              placeholder="15"
              disabled={isCreating}
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
            <p className="text-xs text-destructive">
              {errors.pricePerDay.message}
            </p>
          )}
        </div>

        {/* Brand */}
        <div className="space-y-1.5">
          <Label htmlFor="brand" className="text-xs font-semibold">
            Brand / Manufacturer
          </Label>
          <Input
            id="brand"
            placeholder="e.g. Osprey, Big Agnes, MSR"
            disabled={isCreating}
            className="rounded-xl"
            {...register("brand", {
              required: "Brand is required",
              minLength: {
                value: 2,
                message: "Brand must be at least 2 characters",
              },
            })}
          />
          {errors.brand && (
            <p className="text-xs text-destructive">{errors.brand.message}</p>
          )}
        </div>
      </div>

      {/* Stock + Category */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        {/* Stock */}
        <div className="space-y-1.5">
          <Label htmlFor="stockQuantity" className="text-xs font-semibold">
            Stock Quantity
          </Label>
          <Input
            id="stockQuantity"
            type="number"
            min={0}
            placeholder="5"
            disabled={isCreating}
            className="rounded-xl"
            {...register("stockQuantity", {
              required: "Stock quantity is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Stock cannot be negative",
              },
            })}
          />
          {errors.stockQuantity && (
            <p className="text-xs text-destructive">
              {errors.stockQuantity.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Category</Label>
          <Controller
            name="categoryId"
            control={control}
            rules={{
              required: "Please select a category",
            }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isCreating}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select gear category" />
                </SelectTrigger>

                <SelectContent className="rounded-xl">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.categoryId && (
            <p className="text-xs text-destructive">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      {/* Stock Status Note */}
      <div className="flex items-center gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
        <Sparkles className="size-4 shrink-0 text-primary" />
        <span>Listings with stock &gt; 0 are immediately published as Available to customers.</span>
      </div>

      {/* Submit */}
      <div className="flex justify-end border-t border-border/50 pt-4">
        <Button
          type="submit"
          disabled={isCreating}
          className="min-w-36 rounded-xl font-semibold shadow-xs"
        >
          {isCreating ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Listing Gear...
            </>
          ) : (
            "Publish Listing"
          )}
        </Button>
      </div>
    </form>
  );
};
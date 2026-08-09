"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
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

  const onSubmit = async (
    data: CreateGearFormData
  ) => {
    try {
      setIsCreating(true);

      const payload = {
        ...data,

        // Status is automatically determined
        // from stock quantity
        status:
          data.stockQuantity > 0
            ? "AVAILABLE"
            : "UNAVAILABLE",
      };

      const result = await createGear(payload);

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to create gear."
        );

        return;
      }

      toast.success(
        result.message ||
          "Gear created successfully!"
      );

      // Reset form
      reset();

      // Refresh Server Components
      router.refresh();

      // Close parent dialog
      onSuccess();
    } catch (error) {
      console.error(
        "Create gear error:",
        error
      );

      toast.error(
        "Something went wrong while creating the gear."
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Gear Title
        </Label>

        <Input
          id="title"
          placeholder="e.g. Insect Protection Kit"
          disabled={isCreating}
          {...register("title", {
            required: "Title is required",

            minLength: {
              value: 3,
              message:
                "Title must be at least 3 characters",
            },

            maxLength: {
              value: 100,
              message:
                "Title cannot exceed 100 characters",
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
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          placeholder="Describe your gear..."
          rows={4}
          disabled={isCreating}
          className="resize-none"
          {...register("description", {
            required:
              "Description is required",

            minLength: {
              value: 10,
              message:
                "Description must be at least 10 characters",
            },

            maxLength: {
              value: 500,
              message:
                "Description cannot exceed 500 characters",
            },
          })}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Price + Brand */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="pricePerDay">
            Price Per Day
          </Label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ৳
            </span>

            <Input
              id="pricePerDay"
              type="number"
              min={1}
              step="0.01"
              placeholder="7"
              disabled={isCreating}
              className="pl-8"
              {...register("pricePerDay", {
                required:
                  "Price is required",

                valueAsNumber: true,

                min: {
                  value: 1,
                  message:
                    "Price must be greater than 0",
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

        {/* Brand */}
        <div className="space-y-2">
          <Label htmlFor="brand">
            Brand
          </Label>

          <Input
            id="brand"
            placeholder="e.g. Sawyer"
            disabled={isCreating}
            {...register("brand", {
              required:
                "Brand is required",

              minLength: {
                value: 2,
                message:
                  "Brand must be at least 2 characters",
              },

              maxLength: {
                value: 50,
                message:
                  "Brand cannot exceed 50 characters",
              },
            })}
          />

          {errors.brand && (
            <p className="text-sm text-destructive">
              {errors.brand.message}
            </p>
          )}
        </div>
      </div>

      {/* Stock + Category */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Stock */}
        <div className="space-y-2">
          <Label htmlFor="stockQuantity">
            Stock Quantity
          </Label>

          <Input
            id="stockQuantity"
            type="number"
            min={0}
            placeholder="30"
            disabled={isCreating}
            {...register(
              "stockQuantity",
              {
                required:
                  "Stock quantity is required",

                valueAsNumber: true,

                min: {
                  value: 0,
                  message:
                    "Stock cannot be negative",
                },

                validate: (value) =>
                  Number.isInteger(value) ||
                  "Stock quantity must be a whole number",
              }
            )}
          />

          {errors.stockQuantity && (
            <p className="text-sm text-destructive">
              {
                errors.stockQuantity
                  .message
              }
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Stock above 0 makes the gear
            available.
          </p>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>
            Category
          </Label>

          <Controller
            name="categoryId"
            control={control}
            rules={{
              required:
                "Please select a category",
            }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={
                  field.onChange
                }
                disabled={isCreating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map(
                    (category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />

          {errors.categoryId && (
            <p className="text-sm text-destructive">
              {
                errors.categoryId
                  .message
              }
            </p>
          )}
        </div>
      </div>

      {/* Status Information */}
      <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-3">
        <p className="text-xs text-muted-foreground">
          Gear status is automatically
          determined by stock quantity.
        </p>

        <p className="mt-1 text-sm font-medium text-emerald-700">
          Stock &gt; 0 → Available
        </p>

        <p className="text-sm font-medium text-red-600">
          Stock = 0 → Unavailable
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-end border-t pt-5">
        <Button
          type="submit"
          disabled={isCreating}
          className="min-w-32 gap-2 bg-emerald-600 hover:bg-emerald-700"
        >
          {isCreating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Gear"
          )}
        </Button>
      </div>
    </form>
  );
};
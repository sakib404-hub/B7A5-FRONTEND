import React from "react";

export const OrderInfo = ({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
}) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/40 bg-muted/20 p-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm font-bold text-foreground">
          {value}
        </p>
        {subValue && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground/80">
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
};
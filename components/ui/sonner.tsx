"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      richColors
      closeButton
      duration={3500}
      icons={{
        success: <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />,
        info: <Info className="size-5 text-sky-500 shrink-0" />,
        warning: <AlertTriangle className="size-5 text-amber-500 shrink-0" />,
        error: <AlertCircle className="size-5 text-rose-500 shrink-0" />,
        loading: <Loader2 className="size-5 text-primary animate-spin shrink-0" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "16px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-border/80 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:text-sm group-[.toaster]:font-medium transition-all",
          title: "text-sm font-bold text-foreground",
          description: "text-xs text-muted-foreground mt-0.5",
          actionButton:
            "bg-primary text-primary-foreground font-semibold rounded-xl px-3 py-1 text-xs shadow-xs",
          cancelButton:
            "bg-muted text-muted-foreground font-medium rounded-xl px-3 py-1 text-xs",
          closeButton:
            "border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition rounded-lg",
        },
      }}
      {...props}
    />
  );
};
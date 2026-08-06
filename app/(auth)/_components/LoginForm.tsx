"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { loginAction } from "../_actions/loginAction";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) {
      return;
    }
    if (!state.success) {
      toast.error(state.message || "Login Failed.");
      return;
    }

    toast.success(state.message || "Successfully Logged In.");
    redirect("/");
  }, [state]);

  return (
    <div>
      {/* Login Form */}
      <form action={action} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {" "}
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full">
          {pending ? (
            <span className="flex items-center gap-2">
              Processing
              <Spinner />
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
};

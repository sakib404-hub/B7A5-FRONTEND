import React from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome Back!
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Login Form */}
      <form className="space-y-5">
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
              type="password"
              placeholder="Enter your password"
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      {/* Register */}
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

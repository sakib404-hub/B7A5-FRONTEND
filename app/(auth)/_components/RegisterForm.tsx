"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {/* Register Form */}
      <form className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

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

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">Account Type</Label>

          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Select name="role" defaultValue="CUSTOMER">
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="CUSTOMER">Customer</SelectItem>

                <SelectItem value="PROVIDER">Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
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

        {/* Register Button */}
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;

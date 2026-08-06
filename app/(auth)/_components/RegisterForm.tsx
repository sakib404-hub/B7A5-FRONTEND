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
import { useActionState, useEffect, useState } from "react";
import { registerAction } from "../_actions/registerAction";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const RegisterForm = () => {
  const [registerState, action, pending] = useActionState(registerAction, null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
    if(!registerState){
      return;
    }
    if(!registerState.success){
      // console.log(registerState)
      toast.error(registerState.message || "Account Creation Failed.");
      return;
    }
    toast.success(registerState.message || "Account Creation Successfull");
    redirect('/login');

  },[registerState])
  return (
    <div>
      {/* Register Form */}
      <form action={action} className="space-y-5">
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
          {pending ? (
            <span className="flex items-center gap-2">
              Processing
              <Spinner />
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;

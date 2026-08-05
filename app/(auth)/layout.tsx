import { AuthNavbar } from "@/components/shared/authHeader";
import Image from "next/image";
import React from "react";
import LoginImage from "@/assets/Login.png"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <AuthNavbar />

      <main className="min-h-[calc(100vh-72px)]">
        <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side - Illustration */}
          <div className="hidden items-center justify-center px-8 lg:flex">
            <div className="w-full max-w-xl">
              <Image
                src={LoginImage}
                alt="Authentication illustration"
                width={600}
                height={500}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Side - Login / Register */}
          <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-md">
              {children}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
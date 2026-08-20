"use client";

import { Menu, X } from "lucide-react";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { logOut } from "@/services/logOut";
import { SidebarContent } from "./sideBarContent";
import { SidebarProps } from "@/types/types";
import { toast } from "sonner";

const Sidebar = ({ role }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      await logOut();
      toast.success("Successfully logged out");
      router.push("/login");
    });
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-card p-2 shadow-md md:hidden cursor-pointer"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`
            fixed left-4 top-1/2 z-40
            -translate-y-1/2
            w-14 h-[65vh]
            rounded-2xl border bg-card shadow-xl
            ${isOpen ? "flex" : "hidden"}
            md:flex flex-col
          `}
        >
          <SidebarContent
            role={role}
            handleLogout={handleLogout}
            isPending={isPending}
            closeMobile={() => setIsOpen(false)}
          />
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
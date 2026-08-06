"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SidebarItem = ({
  icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();

  const active =
    pathname === href ||
    pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {icon}
    </Link>
  );
};

export default SidebarItem;
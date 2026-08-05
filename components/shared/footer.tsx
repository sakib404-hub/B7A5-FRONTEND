"use client"


import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const footerLinks = {
  platform: [
    { label: "Browse Gear", href: "/gear" },
    { label: "Categories", href: "/categories" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Become a Provider", href: "/provider" },
  ],

  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Rental Policy", href: "/rental-policy" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebook,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "#",
    icon: FaGithub,
  },
];
export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5 lg:py-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex w-fit items-center gap-2"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="text-xl font-bold">G</span>
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Gear<span className="text-primary">Up</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Rent the gear you need, when you need it. GearUp makes it
              simple to discover, rent, and share quality equipment.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0 text-primary" />
                <span>hello@gearup.com</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="size-4 shrink-0 text-primary" />
                <span>+880 1XXX-XXXXXX</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>

            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold">
              Platform
            </h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">
              Company
            </h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold">
              Legal
            </h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 border-t py-6 md:flex-row md:items-center md:justify-between">

          <p className="text-sm text-muted-foreground">
            © 2026 GearUp. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Link href={social.href}>
                    <Icon className="size-4" />
                  </Link>
                </Button>
              );
            })}
          </div>

        </div>
      </div>
    </footer>
  );
};

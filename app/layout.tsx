import type { Metadata } from "next";
import { Geist, Geist_Mono, Oxanium, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const robotoHeading = Roboto({subsets:['latin'],variable:'--font-heading'});

const oxanium = Oxanium({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GearUp | Outdoor Equipment Rental & Adventure Marketplace",
    template: "%s | GearUp",
  },
  description:
    "Discover, rent, and share premium outdoor camping, hiking, and expedition equipment. High-quality gear from trusted providers at affordable daily rates.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", oxanium.variable, robotoHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster></Toaster>
      </body>
    </html>
  );
}

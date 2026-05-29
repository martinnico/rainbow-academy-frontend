import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Geist, Cinzel } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavBar, Footer } from "@/components";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-nav",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rainbow Academy",
  description: "Aprendé inglés a tu ritmo, a tu nivel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={cn(
        playfair.variable,
        dmSans.variable,
        "font-sans",
        geist.variable,
        cinzel.variable,
      )}
    >
      <body className="font-sans bg-stone-50 text-stone-800 antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { fraunces, archivoBlack, archivo, spaceMono } from "./fonts";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AgeGate from "@/components/shared/AgeGate";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firefly",
  description: "Premium cannabis — craft flower and concentrates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${archivoBlack.variable} ${archivo.variable} ${spaceMono.variable}`}
      >
        <AgeGate />
        <Navbar />
        <main className="relative z-[1] min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

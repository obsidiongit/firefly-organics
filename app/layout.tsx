import type { Metadata } from "next";
import { fraunces, archivoBlack, archivo, spaceMono } from "./fonts";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AgeGate from "@/components/shared/AgeGate";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firefly Organics",
  description:
    "Flower-first Maine cannabis — soil-grown, hand-trimmed, and built on quality you can count on.",
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
        <main className="relative z-[1] min-h-screen pt-[4.25rem] lg:mr-52 lg:pt-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

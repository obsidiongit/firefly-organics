"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Send } from "lucide-react";
import { GlowPressable, PointerGlowPanel } from "@/components/ui/pointer-glow";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

const quickLinks = [
  { label: "Story", href: "#story" },
  { label: "Craft", href: "#craft" },
  { label: "Contact", href: "#contact" },
];

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: XIcon,
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="relative z-[1] bg-midnight">
      <div
        className="greek-key-divider opacity-[0.45]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-8 lg:px-12">
        <motion.div
          {...fadeInUp}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-4">
            <PointerGlowPanel
              surface="dark"
              sheenRadius="lg"
              className="rounded-sm border border-slate/20 p-6 lg:p-8"
            >
              <h3 className="font-display text-xl font-bold text-parchment">
                Stay in the loop
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-slate">
                Product drops and announcements — placeholder signup for the
                Firefly launch.
              </p>

              <form onSubmit={handleSubmit} className="mt-5">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className={cn(
                      "flex-1 bg-transparent",
                      "border border-parchment/30 rounded-sm",
                      "px-4 py-2.5",
                      "font-body text-sm text-parchment",
                      "placeholder:text-slate/50",
                      "focus:border-parchment focus:outline-none",
                      "transition-colors duration-300"
                    )}
                  />
                  <GlowPressable
                    type="submit"
                    surface="dark"
                    className={cn(
                      "whitespace-nowrap rounded-full bg-steel px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-white",
                      "transition-all duration-300 hover:bg-navy",
                      "active:scale-[0.97]"
                    )}
                  >
                    <Send size={14} />
                    <span className="hidden sm:inline">Sign up</span>
                  </GlowPressable>
                </div>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500",
                    submitted ? "max-h-8 mt-3 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="font-mono text-xs text-success">
                    Thanks — we&apos;ll be in touch.
                  </p>
                </div>
              </form>
            </PointerGlowPanel>
          </div>

          <div className="hidden lg:block lg:col-span-2" />

          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-parchment mb-5">
              On this page
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-slate transition-colors duration-300 hover:text-parchment"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-parchment mb-5">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center",
                    "border border-slate/20 rounded-sm",
                    "text-slate transition-all duration-300",
                    "hover:text-parchment hover:border-parchment/40 hover:bg-parchment/5"
                  )}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="mt-6 font-body text-sm text-slate leading-relaxed">
              Wholesale and press:{" "}
              <a
                href="mailto:hello@firefly.example"
                className="text-parchment underline-offset-4 hover:underline"
              >
                hello@firefly.example
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative h-24 md:h-32 lg:h-40 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
          <span
            className="font-display text-[clamp(4rem,18vw,12rem)] font-bold text-parchment/[0.06] translate-y-[20%] select-none"
            aria-hidden="true"
          >
            Firefly
          </span>
        </div>
      </div>

      <div className="border-t border-slate/20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row lg:px-12">
          <p className="font-mono text-xs text-slate/60 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Firefly. For use by adults 21+
            only. Comply with local law.
          </p>
          <p className="font-mono text-[10px] text-slate/40 uppercase tracking-widest">
            Template site
          </p>
        </div>
      </div>
    </footer>
  );
}

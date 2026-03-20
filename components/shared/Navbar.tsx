"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GlowPressable } from "@/components/ui/pointer-glow";
import { cn } from "@/lib/utils";

const leftLinks = [
  { label: "Story", hash: "story" },
  { label: "Craft", hash: "craft" },
];

const rightLinks = [{ label: "Contact", hash: "contact" }];

function useSectionHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace(/^#/, "");
      setHash(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return hash;
}

function OrganicEdge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 24"
      preserveAspectRatio="none"
      className={cn("w-full h-[14px] md:h-[18px] block", className)}
      aria-hidden="true"
    >
      <path
        d="M0,0 L1440,0 L1440,5 C1416,6 1392,3 1368,4 C1344,5 1320,2 1296,3 C1272,4 1248,2 1224,1 C1200,0 1176,3 1152,2 C1128,1 1104,3 1080,4 C1056,5 1032,3 1008,2 C984,1 960,4 936,3 C912,2 888,5 864,4 C840,3 816,5 792,6 C768,7 744,4 720,5 C696,6 672,3 648,4 C624,5 600,8 576,7 C552,6 528,9 504,8 C480,7 456,9 432,10 C408,11 384,8 360,9 C336,10 312,13 288,12 C264,11 240,13 216,15 C192,17 168,14 144,16 C120,18 96,21 72,20 C48,19 24,22 0,24 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NavAnchor({
  hash,
  label,
  isActive,
  onClick,
}: {
  hash: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <GlowPressable
      as="a"
      href={`#${hash}`}
      onClick={onClick}
      surface="dark"
      sheenRadius="md"
      innerClassName="relative gap-0"
      className={cn(
        "inline-flex rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.15em]",
        "transition-colors duration-300 hover:text-white",
        isActive ? "text-white" : "text-parchment"
      )}
    >
      <span className="relative inline-block">
        {label}
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-px bg-accent-gold"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </span>
    </GlowPressable>
  );
}

const mobileOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" as const },
};

const mobileNavContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const mobileNavItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

export default function Navbar() {
  const sectionHash = useSectionHash();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-midnight transition-shadow duration-500",
          scrolled && "shadow-nav"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-[72px] lg:px-12">
          <GlowPressable
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            surface="dark"
            sheenRadius="md"
            innerClassName="gap-0"
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg text-parchment transition-colors hover:text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </GlowPressable>

          <div className="hidden items-center gap-8 lg:flex">
            {leftLinks.map((link) => (
              <NavAnchor
                key={link.hash}
                hash={link.hash}
                label={link.label}
                isActive={sectionHash === link.hash}
              />
            ))}
          </div>

          <Link
            href="/#hero"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hover:opacity-80"
            aria-label="Firefly — Home"
          >
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-parchment">
              Firefly
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {rightLinks.map((link) => (
              <NavAnchor
                key={link.hash}
                hash={link.hash}
                label={link.label}
                isActive={sectionHash === link.hash}
              />
            ))}
          </div>

          <div className="w-11 lg:hidden" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 translate-y-full text-midnight pointer-events-none">
          <OrganicEdge />
        </div>
      </nav>

      <div className="h-16 md:h-[72px]" />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-midnight/90 backdrop-blur-md lg:hidden"
            {...mobileOverlay}
          >
            <motion.div
              className="flex h-full flex-col items-center justify-center gap-2"
              variants={mobileNavContainer}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {allLinks.map((link) => (
                <motion.div key={link.hash} variants={mobileNavItem}>
                  <GlowPressable
                    as="a"
                    href={`#${link.hash}`}
                    onClick={() => setMobileOpen(false)}
                    surface="dark"
                    sheenRadius="md"
                    innerClassName="relative flex flex-col items-center gap-1"
                    className={cn(
                      "inline-flex min-h-[44px] min-w-[44px] rounded-lg px-8 py-4 text-center font-mono text-lg uppercase tracking-[0.2em]",
                      "transition-colors duration-300",
                      sectionHash === link.hash
                        ? "text-white"
                        : "text-parchment/80 hover:text-white"
                    )}
                  >
                    {link.label}
                    {sectionHash === link.hash && (
                      <span className="mx-auto mt-1 block h-px w-8 bg-accent-gold" />
                    )}
                  </GlowPressable>
                </motion.div>
              ))}

              <motion.div
                variants={mobileNavItem}
                className="absolute bottom-12 opacity-20"
              >
                <span className="font-display text-4xl text-parchment">
                  Firefly
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

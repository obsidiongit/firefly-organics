"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GlowPressable } from "@/components/ui/pointer-glow";
import { cn } from "@/lib/utils";

/** Section anchors (Shop / Education are placeholders for future pages). */
const primaryNav = [
  { label: "Story", hash: "story" },
  { label: "Craft", hash: "craft" },
  { label: "Shop", hash: "shop" },
  { label: "Education", hash: "education" },
];

const ctaNav = [{ label: "Contact", hash: "contact" }];

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

/**
 * Inset + optional left rail. Cool slate inset (not parchment) avoids a warm “yellow”
 * cast. Contact = steel fill + transparent left rail until active (no cream border).
 * Nav uses showSheen={false} so pointer gradient can’t pool on the left edge.
 */
function navControlClasses({
  isActive,
  emphasis,
  mobile = false,
  rail = false,
}: {
  isActive: boolean;
  emphasis: boolean;
  mobile?: boolean;
  rail?: boolean;
}) {
  const size = mobile
    ? "min-h-[52px] min-w-[min(18rem,85vw)] justify-center px-10 py-3.5 text-sm tracking-[0.2em] sm:text-base"
    : rail
      ? "w-full justify-start px-4 py-3 text-xs"
      : "px-4 py-2.5 md:px-5 tracking-[0.15em]";

  const insetTop = "shadow-[inset_0_1px_0_0_rgba(107,143,130,0.16)]";

  return cn(
    "inline-flex rounded-sm font-mono uppercase",
    "border-l-2",
    "transition-[border-color,background-color,box-shadow,color] duration-300 ease-out motion-reduce:transition-none",
    insetTop,
    size,
    emphasis
      ? isActive
        ? "border-l-accent-gold bg-steel/30 text-white shadow-[inset_0_0_28px_-12px_rgba(212,165,116,0.14),inset_0_1px_0_0_rgba(107,143,130,0.2)]"
        : "border-l-transparent bg-steel/[0.14] text-parchment hover:border-l-slate/45 hover:bg-steel/22 hover:text-white hover:shadow-[inset_0_1px_0_0_rgba(107,143,130,0.18)]"
      : isActive
        ? "border-l-accent-gold bg-parchment/[0.09] text-white shadow-[inset_0_0_22px_-14px_rgba(212,165,116,0.11),inset_0_1px_0_0_rgba(107,143,130,0.2)]"
        : "border-l-transparent bg-parchment/[0.035] text-parchment hover:border-l-accent-gold/45 hover:bg-parchment/[0.08] hover:text-white hover:shadow-[inset_0_1px_0_0_rgba(107,143,130,0.18),inset_0_-14px_24px_-20px_rgba(212,165,116,0.055)]"
  );
}

function NavAnchor({
  hash,
  label,
  isActive,
  onClick,
  emphasis = false,
  rail = false,
}: {
  hash: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  emphasis?: boolean;
  rail?: boolean;
}) {
  return (
    <GlowPressable
      as="a"
      href={`#${hash}`}
      onClick={onClick}
      surface="dark"
      sheenRadius="md"
      showSheen={false}
      innerClassName="relative z-[2] gap-0"
      className={cn("text-xs", navControlClasses({ isActive, emphasis, rail }))}
    >
      <span className="relative inline-block">{label}</span>
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

function menuButtonClasses() {
  return cn(
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-sm",
    "border-l-2 border-l-slate/35 bg-parchment/[0.04] text-parchment",
    "shadow-[inset_0_1px_0_0_rgba(107,143,130,0.14)]",
    "transition-[border-color,background-color,color] duration-300",
    "hover:border-l-slate/55 hover:bg-parchment/[0.07] hover:text-white",
    "active:opacity-90"
  );
}

export default function Navbar() {
  const sectionHash = useSectionHash();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const allLinks = [...primaryNav, ...ctaNav];
  const isEmphasisLink = (hash: string) =>
    ctaNav.some((r) => r.hash === hash);

  return (
    <>
      {/* Desktop: pinned rail on the right */}
      <nav
        aria-label="Primary"
        className={cn(
          "fixed right-0 top-0 z-50 hidden h-screen w-52 flex-col border-l border-slate/25 bg-midnight lg:flex",
          "transition-[box-shadow] duration-500",
          scrolled && "shadow-[-12px_0_32px_-8px_rgba(0,0,0,0.35)]"
        )}
      >
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-3 pt-6">
          <GlowPressable
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            surface="dark"
            sheenRadius="md"
            showSheen={false}
            innerClassName="gap-0"
            className={cn(menuButtonClasses(), "mb-3 self-end")}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </GlowPressable>

          {primaryNav.map((link) => (
            <NavAnchor
              key={link.hash}
              hash={link.hash}
              label={link.label}
              isActive={sectionHash === link.hash}
              rail
            />
          ))}
          {ctaNav.map((link) => (
            <NavAnchor
              key={link.hash}
              hash={link.hash}
              label={link.label}
              isActive={sectionHash === link.hash}
              emphasis
              rail
            />
          ))}
        </div>

        <div className="border-t border-slate/20 p-4">
          <Link
            href="/#hero"
            className="font-display text-base font-bold leading-tight text-parchment transition-opacity hover:opacity-80"
          >
            Firefly Organics
          </Link>
        </div>
      </nav>

      {/* Mobile: same hamburger, fixed top-right (sits above content; rail hidden) */}
      <GlowPressable
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        surface="dark"
        sheenRadius="md"
        showSheen={false}
        innerClassName="gap-0"
        className={cn(
          menuButtonClasses(),
          "fixed right-4 top-4 z-[60] lg:hidden"
        )}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          {menuOpen ? (
            <motion.div
              key="close-m"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu-m"
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

      {/* Wordmark: centered in content area; clears hamburger on mobile */}
      <div className="pointer-events-none fixed left-0 right-0 top-4 z-40 flex justify-center px-16 lg:top-6 lg:pl-8 lg:pr-60">
        <Link
          href="/#hero"
          className="pointer-events-auto text-center transition-opacity duration-300 hover:opacity-80"
          aria-label="Firefly Organics — Home"
        >
          <span className="font-display text-lg font-bold tracking-tight text-parchment sm:text-xl md:text-2xl">
            Firefly Organics
          </span>
        </Link>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-midnight/92 backdrop-blur-md"
            {...mobileOverlay}
            role="presentation"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="flex h-full flex-col items-center justify-center gap-2 px-6"
              variants={mobileNavContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {allLinks.map((link) => (
                <motion.div key={link.hash} variants={mobileNavItem}>
                  <GlowPressable
                    as="a"
                    href={`#${link.hash}`}
                    onClick={() => setMenuOpen(false)}
                    surface="dark"
                    sheenRadius="md"
                    showSheen={false}
                    innerClassName="relative z-[2] flex flex-col items-center justify-center gap-0 text-center"
                    className={navControlClasses({
                      isActive: sectionHash === link.hash,
                      emphasis: isEmphasisLink(link.hash),
                      mobile: true,
                    })}
                  >
                    {link.label}
                  </GlowPressable>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

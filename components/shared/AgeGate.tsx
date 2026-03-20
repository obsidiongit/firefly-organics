"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GlowPressable } from "@/components/ui/pointer-glow";

const STORAGE_KEY = "firefly-age-verified";
const VERIFIED_EVENT = "firefly-age-verified";

export default function AgeGate() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const verified = localStorage.getItem(STORAGE_KEY);
        setShow(!verified);
      } catch {
        setShow(false);
      }
    });
  }, []);

  const handleVerify = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* localStorage unavailable */
    }
    setShow(false);
    window.dispatchEvent(new CustomEvent(VERIFIED_EVENT));
  };

  const handleDeny = () => {
    window.location.href = "https://google.com";
  };

  if (show === null) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-midnight"
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, var(--color-steel) 0%, transparent 45%), radial-gradient(circle at 80% 70%, var(--color-accent-gold) 0%, transparent 40%)",
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            className="relative z-10 flex flex-col items-center text-center px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Age verification"
          >
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-parchment mb-2">
              Firefly
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate mb-10">
              Cannabis
            </p>

            <div className="flex gap-1.5 mb-8">
              <span className="h-[3px] w-[3px] rounded-full bg-steel/60" />
              <span className="h-[3px] w-[3px] rounded-full bg-steel/60" />
              <span className="h-[3px] w-[3px] rounded-full bg-steel/60" />
            </div>

            <h2 className="font-impact text-xl sm:text-2xl uppercase tracking-wide text-parchment mb-2">
              Are You 21 or Older?
            </h2>

            <div className="flex gap-4 mt-8 mb-10">
              <GlowPressable
                type="button"
                onClick={handleVerify}
                autoFocus
                surface="dark"
                innerClassName="gap-0"
                className="cursor-pointer min-w-[120px] border-2 border-steel bg-steel px-10 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 ease-out hover:border-accent-gold/55 hover:bg-steel active:scale-[0.98]"
              >
                Yes
              </GlowPressable>
              <GlowPressable
                type="button"
                onClick={handleDeny}
                surface="dark"
                innerClassName="gap-0"
                className="cursor-pointer min-w-[120px] border-2 border-slate/30 bg-transparent px-10 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-parchment transition-all duration-300 ease-out hover:border-parchment hover:bg-parchment/10 active:scale-[0.98]"
              >
                No
              </GlowPressable>
            </div>

            <p className="font-mono text-[11px] text-slate/50 max-w-xs leading-relaxed tracking-wide">
              You must verify that you are 21 years of age or older to enter
              this site.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

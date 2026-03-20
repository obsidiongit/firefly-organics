"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { GlowPressable } from "@/components/ui/pointer-glow";
import { fadeInUp } from "@/lib/animations";

export default function FireflyContact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 md:scroll-mt-[88px] bg-navy py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
        <motion.div {...fadeInUp} className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-parchment">
            Tap in
          </h2>
          <p className="mt-4 font-body text-slate leading-relaxed">
            Partnerships, press, and retail — replace with real channels when
            Firefly goes live.
          </p>
          <GlowPressable
            as="a"
            href="mailto:hello@firefly.example"
            surface="dark"
            className="mt-8 inline-flex rounded-full border border-transparent bg-steel px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-accent-gold/45 hover:bg-steel"
          >
            <Mail size={16} />
            hello@firefly.example
          </GlowPressable>
        </motion.div>
      </div>
    </section>
  );
}

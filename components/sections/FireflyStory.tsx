"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function FireflyStory() {
  return (
    <section
      id="story"
      className="scroll-mt-20 md:scroll-mt-[88px] bg-parchment py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <motion.div {...fadeInUp} className="lg:col-span-5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy leading-tight">
              Why we&apos;re here
            </h2>
            <div className="mt-4 h-px w-16 bg-accent-gold" />
          </motion.div>
          <motion.div {...fadeInUp} className="lg:col-span-7 space-y-6">
            <p className="font-body text-lg text-charcoal/90 leading-relaxed">
              High-end cannabis brands live or die on trust: consistent quality,
              transparent sourcing, and a voice that respects the plant and the
              customer. This one-pager is a starting point for Firefly — same
              technical foundation as Helios, ready for your strains, retail
              partners, and compliance copy.
            </p>
            <p className="font-body text-base text-steel leading-relaxed">
              Swap this block for founding story, cultivation philosophy, and
              state-specific disclaimers. Navigation already points to section
              IDs so you can later map these anchors to real routes without
              restructuring the layout.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Leaf, FlaskConical, Sparkles } from "lucide-react";
import { PointerGlowPanel } from "@/components/ui/pointer-glow";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

const pillars = [
  {
    title: "Flower",
    body: "Indoor and sungrown lines — hero imagery and strain cards plug in here when you’re ready.",
    icon: Leaf,
  },
  {
    title: "Concentrates",
    body: "Hash, rosin, and cartridges — use the same card patterns as Helios shop or strains.",
    icon: FlaskConical,
  },
  {
    title: "Experience",
    body: "Retail education, terpene story, and batch testing — link out to pages you’ll add next.",
    icon: Sparkles,
  },
];

export default function FireflyCraft() {
  return (
    <section
      id="craft"
      className="scroll-mt-20 md:scroll-mt-[88px] bg-off-white py-24 lg:py-32 border-y border-steel/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div {...fadeInUp} className="max-w-2xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel mb-3">
            The line
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
            Craft, without the clutter
          </h2>
          <p className="mt-4 font-body text-steel leading-relaxed">
            Three columns stand in for product families. Replace icons, copy, and
            links when Firefly SKUs and menus are live.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((item) => (
            <motion.div key={item.title} {...fadeInUp}>
              <PointerGlowPanel
                surface="light"
                sheenRadius="lg"
                className={cn(
                  "rounded-sm border border-steel/15 bg-parchment/80 p-8",
                  "shadow-card ring-1 ring-inset ring-transparent",
                  "transition-[border-color,box-shadow,ring-color] duration-300 ease-out",
                  "hover:border-steel/40 hover:shadow-card-hover hover:ring-accent-gold/30"
                )}
              >
                <article>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-midnight/5 text-steel mb-6">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-body text-sm text-charcoal/80 leading-relaxed">
                    {item.body}
                  </p>
                </article>
              </PointerGlowPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

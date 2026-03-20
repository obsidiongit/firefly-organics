"use client";

import { motion } from "framer-motion";
import { Cherry, Cookie, Flame, Grape } from "lucide-react";
import { PointerGlowPanel } from "@/components/ui/pointer-glow";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

const strains = [
  {
    title: "Secret Cookies",
    body: "Sour cherry and dough with minty citrus and fuel. Sought-after in the state — giggly, euphoric, and versatile enough for day or night. A crew favorite at Firefly.",
    icon: Cherry,
  },
  {
    title: "Triple Chocolate Chip",
    body: "Gassy and silky-smooth — gooey chocolate and herbal mint, with an intoxicating, laid-back high. Dense, crystal-coated nugs with standout bag appeal and smoke.",
    icon: Cookie,
  },
  {
    title: "Albariño",
    body: "Selected in-house for a loud, pungent nose — heavy citrus and sweet stone fruit. Uplifting high with flavor to match; enough personality for seasoned smokers.",
    icon: Grape,
  },
  {
    title: "Motorbreath 15",
    body: "Chem D × SFV OG — a balance of deep body relief and the cerebral edge Chem D is known for. Legendary parents, dialed for people who want both.",
    icon: Flame,
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
            Staples from our library
          </h2>
          <p className="mt-4 font-body text-steel leading-relaxed">
            Leading with Secret Cookies, with Triple Chocolate Chip, Motorbreath
            15, and Albariño as core strains in the Firefly Organics lineup —
            hand-finished flower you can trace from our room to the jar.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {strains.map((item) => (
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

        <motion.p
          {...fadeInUp}
          className="mt-14 max-w-3xl font-body text-sm text-steel leading-relaxed border-t border-steel/15 pt-10"
        >
          At{" "}
          <span className="text-charcoal/90 font-medium">SeaWeed Co.</span>,
          look for our Secret Cookies full-spectrum live resin cart — a
          functional hybrid from Seed Junky genetics, now on the adult-use side
          in their stores. Promos have included eighths at $30 (save $10), 1g
          prerolls at $11 (save $4), and Secret Cookies carts at $30 (save $10)
          — check the menu for current offers.
        </motion.p>
      </div>
    </section>
  );
}

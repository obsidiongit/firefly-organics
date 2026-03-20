"use client";

import Image from "next/image";
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
          <motion.div
            {...fadeInUp}
            className="lg:col-span-5 space-y-8 lg:space-y-10"
          >
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy leading-tight">
                How we grow
              </h2>
              <div className="mt-4 h-px w-16 bg-accent-gold" />
            </div>
            <figure className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm border border-steel/15 shadow-[0_12px_40px_-12px_rgba(26,46,40,0.25)]">
              <Image
                src="/assets/images/budinhand.jpg"
                alt="Firefly Organics flower, hand-trimmed and cured"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) min(100vw, 28rem), 38vw"
              />
            </figure>
          </motion.div>
          <motion.div {...fadeInUp} className="lg:col-span-7 space-y-6">
            <p className="font-body text-lg text-charcoal/90 leading-relaxed">
              Our focus is the quality and consistency customers have come to
              expect. We cultivate in soil, hand-mix organic nutrients, and stay
              in the room every day so we can respond to what each plant needs —
              that rhythm is the foundation for every strain that meets the
              Firefly Organics standard.
            </p>
            <p className="font-body text-base text-steel leading-relaxed">
              Everything is hand-trimmed, cured, and stored in climate-controlled
              rooms for a consistent, quality-assured product. We continue our
              partnership with{" "}
              <span className="text-charcoal/90">BioBizz</span>, with decades
              of presence in cannabis worldwide — practices that support strong
              terpene expression and top-shelf flower for the end consumer.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

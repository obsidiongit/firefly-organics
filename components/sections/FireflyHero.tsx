"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export default function FireflyHero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-end scroll-mt-20 md:scroll-mt-[88px] bg-midnight"
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/images/hero-featured.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/40"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1440px] w-full px-6 pb-20 pt-32 lg:px-12 lg:pb-28">
        <motion.div {...fadeInUp} className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-gold mb-4">
            Medical &amp; adult use
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-parchment leading-[1.05]">
            Flower first. Quality and consistency, every run.
          </h1>
          <p className="mt-6 font-body text-lg text-slate max-w-xl leading-relaxed">
            We started in the medical program before expanding into adult use.
            Firefly Organics is a flower-first grower — soil, organic nutrients,
            and daily care so the plant tells us what it needs.
          </p>
          <a
            href="#story"
            className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-parchment hover:text-white transition-colors"
          >
            Read the story
            <ArrowDown size={14} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

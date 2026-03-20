"use client";

import { useEffect } from "react";

/**
 * On full reload of `/` without a hash, browsers often restore the previous
 * scroll position (e.g. footer), which feels like "refresh jumps to bottom".
 * Respect `#story`, `#contact`, etc. when present.
 */
export default function HomeScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSectionHash =
      window.location.hash.length > 1 && window.location.hash !== "#";

    if (hasSectionHash) return;

    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }

    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    toTop();
    const raf = requestAnimationFrame(toTop);
    const t0 = window.setTimeout(toTop, 0);
    const t1 = window.setTimeout(toTop, 50);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t0);
      window.clearTimeout(t1);
    };
  }, []);

  return null;
}

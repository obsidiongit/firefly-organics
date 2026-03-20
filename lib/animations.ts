import type { Variants } from "framer-motion";

/**
 * Framer Motion animation presets for Helios Hash.
 * Based on STYLE_GUIDE.md §8 — Animation Guidelines.
 *
 * Easing curve [0.16, 1, 0.3, 1] is a custom ease-out
 * that feels snappy on entry and smooth on settle.
 */

const ease = [0.16, 1, 0.3, 1] as const;

// Fade up on scroll — most common entrance animation
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease },
};

// Stagger children container (for card grids, lists)
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// Individual stagger child item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

// Scale in (for images, modals, featured elements)
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease },
};

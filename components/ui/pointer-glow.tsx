"use client"

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  MouseEvent,
  ReactNode,
} from "react"

import { cn } from "@/lib/utils"
import { usePointerGlow } from "@/lib/use-pointer-glow"

export type PointerGlowSurface = "light" | "dark"

/** Named Tailwind `group/name` — keeps `group-hover` from matching outer panels. */
export type PointerGlowHoverGroup = "glow-press" | "glow-panel" | "button"

type SheenProps = {
  surface?: PointerGlowSurface
  /** md: controls / CTAs, lg: cards / panels */
  radius?: "md" | "lg"
  /**
   * under: sheen sits below label (buttons).
   * over: sheen paints on top of content so cards read a glow (still pointer-events-none).
   */
  stack?: "under" | "over"
  /** Must match parent `group/name`. Defaults from stack (press vs panel). */
  hoverGroup?: PointerGlowHoverGroup
} & ComponentPropsWithoutRef<"span">

function sheenHoverOpacityClasses(
  stack: "under" | "over",
  surface: PointerGlowSurface,
  hoverGroup: PointerGlowHoverGroup
): string {
  if (stack === "over" && surface === "light") {
    return "group-hover/glow-panel:opacity-95 group-focus-visible/glow-panel:opacity-95"
  }
  if (hoverGroup === "glow-press") {
    return "group-hover/glow-press:opacity-100 group-focus-visible/glow-press:opacity-100"
  }
  if (hoverGroup === "glow-panel") {
    return "group-hover/glow-panel:opacity-100 group-focus-visible/glow-panel:opacity-100"
  }
  return "group-hover/button:opacity-100 group-focus-visible/button:opacity-100"
}

function sheenGradient(
  surface: PointerGlowSurface,
  radius: "md" | "lg",
  stack: "under" | "over"
): string {
  const x = "var(--pointer-glow-x, 50%)"
  const y = "var(--pointer-glow-y, 50%)"

  /* Light cards — strong wash; “over” stack tints type/icons where the cursor is */
  if (surface === "light" && radius === "lg") {
    if (stack === "over") {
      return `
        radial-gradient(
          ellipse 145% 125% at ${x} ${y},
          rgba(255, 220, 170, 0.85) 0%,
          rgba(212, 165, 116, 0.55) 26%,
          rgba(61, 107, 92, 0.22) 52%,
          transparent 72%
        )
      `
        .replace(/\s+/g, " ")
        .trim()
    }
    return `
      radial-gradient(
        ellipse 135% 115% at ${x} ${y},
        rgba(212, 165, 116, 0.52) 0%,
        rgba(212, 165, 116, 0.22) 32%,
        rgba(61, 107, 92, 0.14) 55%,
        transparent 68%
      )
    `
      .replace(/\s+/g, " ")
      .trim()
  }

  /* Buttons / compact — under content (outline/ghost on light) */
  if (surface === "light") {
    return `
      radial-gradient(
        circle 10rem at ${x} ${y},
        rgba(212, 165, 116, 0.55) 0%,
        rgba(212, 165, 116, 0.22) 38%,
        rgba(61, 107, 92, 0.14) 58%,
        transparent 75%
      )
    `
      .replace(/\s+/g, " ")
      .trim()
  }

  /*
   * Dark controls (steel / primary / midnight): sheen sits *under* the label.
   * Tight radial + normal blend — additive plus-lighter + opaque white was washing
   * the whole button to flat white. Here the base fill stays green; only the cursor
   * neighborhood gets a warm “firefly” lift.
   */
  if (surface === "dark" && stack === "under") {
    return `
      radial-gradient(
        circle 5rem at ${x} ${y},
        rgba(255, 244, 220, 0.45) 0%,
        rgba(212, 165, 116, 0.28) 38%,
        rgba(100, 180, 140, 0.1) 52%,
        transparent 60%
      )
    `
      .replace(/\s+/g, " ")
      .trim()
  }

  /* Dark panels (footer, etc.) — sheen over content; still avoid full white core */
  const core = radius === "lg" ? "min(105%, 20rem)" : "8.5rem"
  return `
    radial-gradient(
      circle ${core} at ${x} ${y},
      rgba(255, 235, 205, 0.32) 0%,
      rgba(212, 165, 116, 0.2) 38%,
      rgba(61, 107, 92, 0.12) 58%,
      transparent 72%
    )
  `
    .replace(/\s+/g, " ")
    .trim()
}

export function PointerGlowSheen({
  surface = "light",
  radius = "md",
  stack = "under",
  hoverGroup: hoverGroupProp,
  className,
  ...props
}: SheenProps) {
  const hoverGroup: PointerGlowHoverGroup =
    hoverGroupProp ?? (stack === "over" ? "glow-panel" : "glow-press")

  const hoverOpacity = sheenHoverOpacityClasses(stack, surface, hoverGroup)

  const blend =
    surface === "dark" && stack === "under"
      ? "mix-blend-normal"
      : surface === "dark"
        ? "mix-blend-soft-light"
        : stack === "over"
          ? "mix-blend-overlay"
          : "mix-blend-normal"

  return (
    <span
      data-glow-sheen
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        stack === "under" ? "z-[1]" : "z-[3]",
        "opacity-0 transition-opacity duration-300 ease-out",
        hoverOpacity,
        "motion-reduce:transition-none",
        blend,
        className
      )}
      style={{
        background: sheenGradient(surface, radius, stack),
      }}
      {...props}
    />
  )
}

type GlowPressableProps = {
  as?: ElementType
  surface?: PointerGlowSurface
  sheenRadius?: "md" | "lg"
  /** When false, skip cursor sheen (e.g. compact nav chips where warm gradient reads as edge bleed). */
  showSheen?: boolean
  innerClassName?: string
  className?: string
  children: ReactNode
  style?: CSSProperties
  onMouseMove?: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void
} & Record<string, unknown>

export function GlowPressable({
  as,
  surface = "light",
  sheenRadius = "md",
  showSheen = true,
  className,
  innerClassName,
  children,
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}: GlowPressableProps) {
  const Component = (as ?? "button") as ElementType
  const glow = usePointerGlow()

  return (
    <Component
      className={cn(
        "group/glow-press relative isolate overflow-hidden",
        className
      )}
      style={showSheen ? { ...glow.style, ...style } : style}
      onMouseMove={
        showSheen
          ? (e: MouseEvent<HTMLElement>) => {
              glow.onMouseMove(e)
              onMouseMove?.(e)
            }
          : onMouseMove
      }
      onMouseLeave={
        showSheen
          ? (e: MouseEvent<HTMLElement>) => {
              glow.onMouseLeave()
              onMouseLeave?.(e)
            }
          : onMouseLeave
      }
      {...props}
    >
      {showSheen ? (
        <PointerGlowSheen
          surface={surface}
          radius={sheenRadius}
          stack="under"
        />
      ) : null}
      <span
        className={cn(
          "relative z-[2] flex min-h-0 min-w-0 flex-1 items-center justify-center gap-2",
          innerClassName
        )}
      >
        {children}
      </span>
    </Component>
  )
}

type PointerGlowPanelProps = ComponentPropsWithoutRef<"div"> & {
  surface?: PointerGlowSurface
  sheenRadius?: "md" | "lg"
}

/** Cards, bordered panels — glow follows cursor over the surface */
export function PointerGlowPanel({
  className,
  surface = "light",
  sheenRadius = "lg",
  style,
  onMouseMove,
  onMouseLeave,
  children,
  ...props
}: PointerGlowPanelProps) {
  const glow = usePointerGlow()

  return (
    <div
      className={cn(
        "group/glow-panel relative isolate overflow-hidden",
        className
      )}
      style={{ ...glow.style, ...style }}
      onMouseMove={(e) => {
        glow.onMouseMove(e)
        onMouseMove?.(e)
      }}
      onMouseLeave={(e) => {
        glow.onMouseLeave()
        onMouseLeave?.(e)
      }}
      {...props}
    >
      <div className="relative z-[1]">{children}</div>
      <PointerGlowSheen
        surface={surface}
        radius={sheenRadius}
        stack="over"
      />
    </div>
  )
}

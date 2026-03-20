"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { PointerGlowSheen } from "@/components/ui/pointer-glow"
import { cn } from "@/lib/utils"
import { usePointerGlow } from "@/lib/use-pointer-glow"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          /* Opaque hover — primary/90 lets the page show through and reads “washed white” on light UI */
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary [a]:hover:bg-primary",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function pointerGlowInnerGap(size: VariantProps<typeof buttonVariants>["size"]) {
  const s = size ?? "default"
  if (s === "xs" || s === "sm") return "gap-1"
  if (s.startsWith("icon")) return "gap-0"
  return "gap-1.5"
}

function Button({
  className,
  variant = "default",
  size = "default",
  pointerGlow = true,
  children,
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Cursor-follow bioluminescent sheen. Off for minimal chrome. */
    pointerGlow?: boolean
  }) {
  const glow = usePointerGlow()
  const showGlow = pointerGlow !== false && variant !== "link"
  const surface: "light" | "dark" =
    variant === "outline" || variant === "secondary" || variant === "ghost"
      ? "light"
      : "dark"

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        showGlow && "relative isolate overflow-hidden",
        className
      )}
      style={showGlow ? { ...glow.style, ...style } : style}
      onMouseMove={
        showGlow
          ? (e) => {
              glow.onMouseMove(e)
              onMouseMove?.(e)
            }
          : onMouseMove
      }
      onMouseLeave={
        showGlow
          ? (e) => {
              glow.onMouseLeave()
              onMouseLeave?.(e)
            }
          : onMouseLeave
      }
      {...props}
    >
      {showGlow ? (
        <>
          <PointerGlowSheen surface={surface} hoverGroup="button" />
          <span
            className={cn(
              "relative z-[2] inline-flex min-h-0 min-w-0 flex-1 items-center justify-center",
              pointerGlowInnerGap(size)
            )}
          >
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }

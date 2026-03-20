"use client"

import { useCallback, useState } from "react"

const center = { x: 50, y: 50 }

export function usePointerGlow() {
  const [pos, setPos] = useState(center)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) return
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }, [])

  /* Do not reset position on leave — that jumped the gradient to 50%/50% while
     opacity was still fading, which read as a flash in the middle. Fade-out uses
     the last cursor position instead. */
  const onMouseLeave = useCallback(() => {}, [])

  const style = {
    "--pointer-glow-x": `${pos.x}%`,
    "--pointer-glow-y": `${pos.y}%`,
  } as React.CSSProperties

  return { onMouseMove, onMouseLeave, style }
}

"use client"

import { useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AdvancedScrollAnimationProps {
  children: ReactNode
  type: "parallax" | "reveal" | "float" | "textSplit" | "stagger" | "zoom" | "rotate" | "blur"
  direction?: "up" | "down" | "left" | "right"
  amount?: number
  delay?: number
  duration?: number
  staggerAmount?: number
  className?: string
  ease?: string
  threshold?: number
}

export default function AdvancedScrollAnimation({
  children,
  type = "reveal",
  direction = "up",
  amount = 100,
  delay = 0,
  duration = 1,
  staggerAmount = 0.1,
  className = "",
  ease = "power3.out",
  threshold = 0.1,
}: AdvancedScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  // We'll keep the component but disable most animations for performance
  // Only keep minimal animations for the globe scroll

  return (
    <div ref={elementRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollDrivenAnimationProps {
  children: ReactNode
  className?: string
  animation?: "fadeIn" | "fromLeft" | "fromRight" | "fromBottom" | "scaleUp" | "parallax"
  delay?: number
  duration?: number
  scrub?: boolean | number
  start?: string
  end?: string
  markers?: boolean
}

export default function ScrollDrivenAnimation({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  duration = 1,
  scrub = true,
  start = "top 80%",
  end = "bottom 20%",
  markers = false,
}: ScrollDrivenAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    // Set initial state based on animation type, but keep elements visible with reduced opacity
    switch (animation) {
      case "fadeIn":
        gsap.set(element, { opacity: 0.5 }) // Changed from 0.3 to 0.5 for better visibility
        break
      case "fromLeft":
        gsap.set(element, { x: -50, opacity: 0.5 }) // Changed from 0.3 to 0.5
        break
      case "fromRight":
        gsap.set(element, { x: 50, opacity: 0.5 }) // Changed from 0.3 to 0.5
        break
      case "fromBottom":
        gsap.set(element, { y: 50, opacity: 0.5 }) // Changed from 0.3 to 0.5
        break
      case "scaleUp":
        gsap.set(element, { scale: 0.95, opacity: 0.5 }) // Changed from 0.9/0.3 to 0.95/0.5
        break
      case "parallax":
        gsap.set(element, { y: 30 })
        break
    }

    // Create animation based on type
    let tween
    switch (animation) {
      case "fadeIn":
        tween = gsap.to(element, { opacity: 1, duration, delay })
        break
      case "fromLeft":
        tween = gsap.to(element, { x: 0, opacity: 1, duration, delay })
        break
      case "fromRight":
        tween = gsap.to(element, { x: 0, opacity: 1, duration, delay })
        break
      case "fromBottom":
        tween = gsap.to(element, { y: 0, opacity: 1, duration, delay })
        break
      case "scaleUp":
        tween = gsap.to(element, { scale: 1, opacity: 1, duration, delay })
        break
      case "parallax":
        tween = gsap.to(element, { y: -30, duration, delay })
        break
    }

    // Create ScrollTrigger with improved settings
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: start,
      end: end,
      scrub: scrub,
      markers: markers,
      animation: tween,
      toggleActions: "play none none reverse", // Ensure animations play and reverse properly
    })

    return () => {
      // Clean up
      trigger.kill()
    }
  }, [animation, delay, duration, scrub, start, end, markers])

  return (
    <div ref={elementRef} className={`transition-opacity duration-500 ${className}`}>
      {children}
    </div>
  )
}

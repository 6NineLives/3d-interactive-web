"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseGsapAnimationProps {
  animationType?: "fadeUp" | "fadeIn" | "scaleUp" | "staggerChildren"
  delay?: number
  duration?: number
  threshold?: number
  staggerAmount?: number
  childSelector?: string
}

export function useGsapAnimation(
  options: UseGsapAnimationProps = {
    animationType: "fadeUp",
    delay: 0,
    duration: 0.8,
    threshold: 0.2,
  },
) {
  const {
    animationType = "fadeUp",
    delay = 0,
    duration = 0.8,
    threshold = 0.2,
    staggerAmount = 0.1,
    childSelector = ".stagger-item",
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Clean up function to kill animations and triggers
    const cleanup = () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
      if (triggerRef.current) {
        triggerRef.current.kill()
      }
    }

    // Create the animation based on the type
    const element = elementRef.current
    let animation: gsap.core.Tween

    switch (animationType) {
      case "fadeUp":
        animation = gsap.from(element, {
          y: 50,
          opacity: 0,
          duration,
          delay,
          paused: true,
          ease: "power3.out",
        })
        break

      case "fadeIn":
        animation = gsap.from(element, {
          opacity: 0,
          duration,
          delay,
          paused: true,
          ease: "power2.out",
        })
        break

      case "scaleUp":
        animation = gsap.from(element, {
          scale: 0.9,
          opacity: 0,
          duration,
          delay,
          paused: true,
          ease: "back.out(1.7)",
        })
        break

      case "staggerChildren":
        const children = gsap.utils.toArray<HTMLElement>(`${childSelector}`, element)
        animation = gsap.from(children, {
          y: 30,
          opacity: 0,
          duration,
          stagger: staggerAmount,
          paused: true,
          ease: "power2.out",
        })
        break

      default:
        animation = gsap.from(element, {
          y: 50,
          opacity: 0,
          duration,
          delay,
          paused: true,
          ease: "power3.out",
        })
    }

    // Store the animation reference
    animationRef.current = animation

    // Create the scroll trigger
    triggerRef.current = ScrollTrigger.create({
      trigger: element,
      start: `top ${80 * (1 - threshold)}%`,
      onEnter: () => animation.play(),
      onLeaveBack: () => animation.reverse(),
    })

    return cleanup
  }, [animationType, delay, duration, threshold, staggerAmount, childSelector])

  return elementRef
}

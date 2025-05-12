"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimationProviderProps {
  children: React.ReactNode
}

export default function ScrollAnimationProvider({ children }: ScrollAnimationProviderProps) {
  const providerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !providerRef.current) return

    // Create a scroll progress indicator
    const progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    document.body.appendChild(progressBar)

    // Set up the scroll progress animation
    gsap.to(progressBar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    })

    return () => {
      // Clean up
      if (progressBar.parentNode) {
        progressBar.parentNode.removeChild(progressBar)
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <div ref={providerRef}>{children}</div>
}

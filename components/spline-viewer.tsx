"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface SplineViewerProps {
  url: string
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  fallbackImage?: string
  enableScrollAnimation?: boolean
  initialScale?: number
  finalScale?: number
}

export default function SplineViewer({
  url,
  className = "",
  style = {},
  priority = false,
  fallbackImage,
  enableScrollAnimation = false,
  initialScale = 1,
  finalScale = 0.5,
}: SplineViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLElement | null>(null)
  const splineAppRef = useRef<any>(null)

  // Check if the spline-viewer script is loaded
  useEffect(() => {
    // Check if already defined
    if (customElements.get("spline-viewer") !== undefined) {
      return
    }

    // Load the script if not already loaded
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.86/build/spline-viewer.js"
    script.type = "module"
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup if needed
    }
  }, [])

  // Create or update the spline-viewer element when needed
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Function to create or update viewer
    const setupViewer = () => {
      // Clear any existing content if needed
      if (viewerRef.current && container.contains(viewerRef.current)) {
        container.removeChild(viewerRef.current)
        viewerRef.current = null
      }

      try {
        // Create the spline-viewer element
        const splineViewer = document.createElement("spline-viewer")
        viewerRef.current = splineViewer

        // Set attributes
        splineViewer.setAttribute("url", url)
        splineViewer.setAttribute("loading", priority ? "eager" : "lazy")
        splineViewer.setAttribute("auto-rotate", "false")
        splineViewer.setAttribute("auto-play", "true")

        // Add ambient light color to match gold theme
        splineViewer.setAttribute("ambient-light", "#FFD700")

        // Add event listener for when the Spline scene is loaded
        splineViewer.addEventListener("load", () => {
          setIsLoaded(true)

          // Store the Spline app instance for camera control
          if (enableScrollAnimation && splineViewer.shadowRoot) {
            // Access the Spline application through the shadow DOM
            const splineApp = splineViewer.shadowRoot.querySelector("canvas")?.spline
            if (splineApp) {
              splineAppRef.current = splineApp
            }
          }
        })

        // Append to container
        container.appendChild(splineViewer)
      } catch (error) {
        console.error("Error creating Spline viewer:", error)
      }
    }

    // Setup the viewer with a small delay to prevent blocking the main thread
    const timeoutId = setTimeout(setupViewer, priority ? 0 : 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [url, priority, enableScrollAnimation])

  // Set up scroll-driven animation for the container
  useEffect(() => {
    if (!enableScrollAnimation || !containerRef.current) return

    // Initial scale (large)
    gsap.set(containerRef.current, { scale: initialScale, opacity: 1 })

    // Create scroll-driven animation - KEEP THIS PART
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current.parentElement,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
        pin: false, // Don't pin the element
      },
    })

    // Animate scale and position - KEEP THIS PART
    tl.to(containerRef.current, {
      scale: finalScale,
      y: "20%", // Move down slightly as it shrinks
      opacity: 0.5,
      ease: "power2.inOut",
    })

    return () => {
      // Clean up animations
      if (tl) tl.kill()
    }
  }, [enableScrollAnimation, isLoaded, initialScale, finalScale])

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (viewerRef.current && containerRef.current?.contains(viewerRef.current)) {
        containerRef.current.removeChild(viewerRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        transformOrigin: "center center",
        ...style,
      }}
    >
      {/* Placeholder image */}
      {fallbackImage && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ zIndex: 0 }}
        >
          <Image
            src={fallbackImage || "/placeholder.svg"}
            alt="Scene preview"
            fill
            className="object-cover"
            priority={priority}
          />
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#FFD700] rounded-full loader-ring"></div>
        </div>
      )}
    </div>
  )
}

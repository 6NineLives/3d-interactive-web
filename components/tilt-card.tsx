"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"

interface TiltCardProps {
  children: ReactNode
  className?: string
  intensity?: number
  glareOpacity?: number
  perspective?: number
  scale?: number
  disabled?: boolean
}

export default function TiltCard({
  children,
  className = "",
  intensity = 15,
  glareOpacity = 0.1,
  perspective = 1000,
  scale = 1.05,
  disabled = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled || !cardRef.current || !glareRef.current) return

    const card = cardRef.current
    const glare = glareRef.current

    // Variables for tracking
    let bounds: DOMRect
    let centerX: number
    let centerY: number

    const updateBounds = () => {
      bounds = card.getBoundingClientRect()
      centerX = bounds.left + bounds.width / 2
      centerY = bounds.top + bounds.height / 2
    }

    // Initial setup
    updateBounds()

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) updateBounds()

      // Calculate mouse position relative to card center
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      // Calculate rotation based on mouse position
      const rotateX = (mouseY / (bounds.height / 2)) * -intensity
      const rotateY = (mouseX / (bounds.width / 2)) * intensity

      // Apply rotation and scale
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        scale: scale,
        ease: "power2.out",
        duration: 0.5,
        transformPerspective: perspective,
        transformOrigin: "center",
      })

      // Update glare position
      const glareX = (mouseX / bounds.width) * 100 + 50
      const glareY = (mouseY / bounds.height) * 100 + 50

      gsap.to(glare, {
        opacity: glareOpacity,
        x: `${glareX}%`,
        y: `${glareY}%`,
        ease: "power2.out",
        duration: 0.5,
      })
    }

    // Handle mouse leave
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.5,
      })

      gsap.to(glare, {
        opacity: 0,
        ease: "power2.out",
        duration: 0.5,
      })
    }

    // Handle window resize
    const handleResize = () => {
      updateBounds()
    }

    // Add event listeners
    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)

    return () => {
      // Clean up event listeners
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [disabled, intensity, glareOpacity, perspective, scale])

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
      <div
        ref={glareRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 bg-gradient-radial from-white/30 to-transparent"
        style={{
          mixBlendMode: "overlay",
          transform: "translate(-50%, -50%)",
          width: "200%",
          height: "200%",
        }}
      />
    </div>
  )
}

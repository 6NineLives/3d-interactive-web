"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface SectionTransitionProps {
  children: React.ReactNode
  id?: string
  className?: string
  delay?: number
}

export default function SectionTransition({ children, id, className = "", delay = 0 }: SectionTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay before triggering animations
            setTimeout(() => {
              setIsVisible(true)
            }, delay * 1000)

            // Once visible, we can stop observing
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {children}
    </section>
  )
}

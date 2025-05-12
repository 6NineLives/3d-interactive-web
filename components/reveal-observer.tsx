"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface RevealObserverProps {
  children: ReactNode
  threshold?: number
  delay?: number
  className?: string
}

export default function RevealObserver({ children, threshold = 0.1, delay = 0, className = "" }: RevealObserverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("is-visible")
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, delay])

  return (
    <div ref={ref} className={`reveal-observer ${className}`}>
      {children}
    </div>
  )
}

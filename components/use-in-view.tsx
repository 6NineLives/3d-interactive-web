"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView(ref: RefObject<Element>, options: UseInViewOptions = {}) {
  const { threshold = 0, rootMargin = "0px", once = false } = options
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        setInView(isIntersecting)

        if (isIntersecting && once && observer) {
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observerRef.current = observer
    observer.observe(ref.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [ref, threshold, rootMargin, once])

  return { inView }
}

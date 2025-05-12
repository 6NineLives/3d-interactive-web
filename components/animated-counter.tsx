"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedCounterProps {
  end: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export default function AnimatedCounter({
  end,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!counterRef.current) return

    const counter = { value: 0 }

    const updateDisplay = () => {
      setValue(counter.value)
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 80%",
        once: true,
      },
      delay,
    })

    tl.to(counter, {
      value: end,
      duration,
      ease: "power2.out",
      onUpdate: updateDisplay,
      roundProps: decimals === 0 ? "value" : undefined,
    })

    return () => {
      if (tl) tl.kill()
    }
  }, [end, duration, delay, decimals])

  // Format the number with commas and decimals
  const formattedValue = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <div ref={counterRef} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </div>
  )
}

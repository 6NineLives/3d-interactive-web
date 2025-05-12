"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatItemProps {
  value: number
  label: string
  suffix?: string
  delay: number
}

const StatItem = ({ value, label, suffix = "", delay }: StatItemProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const statRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!statRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    tl.fromTo(
      statRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: delay,
        ease: "power2.out",
        onStart: () => {
          // Animate the counter
          let startValue = 0
          const duration = 2000
          const increment = value / (duration / 16) // 60fps

          const counter = setInterval(() => {
            startValue += increment
            if (startValue > value) {
              setDisplayValue(value)
              clearInterval(counter)
            } else {
              setDisplayValue(Math.floor(startValue))
            }
          }, 16)
        },
      },
    )
  }, [value, delay])

  return (
    <div ref={statRef} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">
        {displayValue}
        {suffix}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  )
}

export default function AnimatedStats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return

    gsap.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <div ref={sectionRef} className="py-16 bg-black/30 backdrop-blur-sm border-t border-b border-gray-800">
      <div className="container mx-auto px-4">
        <h2 ref={headingRef} className="text-3xl font-bold text-center mb-12">
          Driving <span className="text-[#FFD700] text-glow">Measurable</span> Results
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={500} label="Happy Clients" suffix="+" delay={0} />
          <StatItem value={95} label="Client Retention" suffix="%" delay={0.2} />
          <StatItem value={24} label="Support Hours" suffix="/7" delay={0.4} />
          <StatItem value={10} label="Years Experience" suffix="+" delay={0.6} />
        </div>
      </div>
    </div>
  )
}

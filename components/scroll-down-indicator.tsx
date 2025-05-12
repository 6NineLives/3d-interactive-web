"use client"

import { useEffect, useState } from "react"

export default function ScrollDownIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Hide the indicator after scrolling down a bit
      if (window.scrollY > window.innerHeight * 0.3) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="scroll-down-indicator">
      <div className="arrow"></div>
      <div className="arrow"></div>
      <div className="arrow"></div>
      <span className="text-xs mt-2">Scroll Down</span>
    </div>
  )
}

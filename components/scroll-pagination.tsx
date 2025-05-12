"use client"

import { useEffect, useState, useRef } from "react"

interface ScrollPaginationProps {
  totalSections: number
  activeSection: number
  onDotClick: (index: number) => void
}

export default function ScrollPagination({ totalSections, activeSection, onDotClick }: ScrollPaginationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Hide pagination after inactivity
  useEffect(() => {
    const handleMouseMove = () => {
      setIsVisible(true)

      // Clear any existing timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }

      // Set new timeout
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    }

    // Set up event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleMouseMove)
    window.addEventListener("click", handleMouseMove)

    // Initial timeout
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleMouseMove)
      window.removeEventListener("click", handleMouseMove)

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, []) // Empty dependency array to run only once

  return (
    <div
      className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index ? "bg-[#FFD700] w-4 h-4" : "bg-gray-400 hover:bg-gray-300"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

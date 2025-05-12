"use client"

import { useEffect, useState } from "react"

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after scrolling down a bit
      if (window.scrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
      <div className="text-white/70 text-sm mb-2">Scroll Down</div>
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
        <div className="w-1 h-2 bg-gold rounded-full scroll-indicator"></div>
      </div>
    </div>
  )
}

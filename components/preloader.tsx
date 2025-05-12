"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (preloaderRef.current) {
      // Simulate loading progress without animations
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          return newProgress > 100 ? 100 : newProgress
        })
      }, 200)

      // Cleanup
      return () => clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100 && preloaderRef.current) {
      // Simple fade out without animations
      setTimeout(() => {
        if (preloaderRef.current) {
          preloaderRef.current.style.opacity = "0"
          preloaderRef.current.style.pointerEvents = "none"
        }
      }, 500)
    }
  }, [progress])

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-500"
    >
      <div className="logo-container flex flex-col items-center">
        <div className="w-48 h-48 mb-6 relative">
          <Image src="/images/rise-logo.png" alt="Rise LLC" fill className="object-contain" priority />
        </div>

        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-4">
          <div
            className="progress-bar h-full bg-gradient-to-r from-[#FFD700] to-[#FFC107] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="progress-text text-white text-sm mt-2 opacity-80">
          {progress < 100 ? "Preparing your experience..." : "Ready!"}
        </div>
      </div>
    </div>
  )
}

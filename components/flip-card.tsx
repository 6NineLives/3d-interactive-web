"use client"

import { useState, type ReactNode } from "react"

interface FlipCardProps {
  frontTitle: string
  frontDescription: string
  frontIcon: ReactNode
  frontIconBg: string
  backTitle: string
  backContent: ReactNode
  backButtonText: string
  backButtonAction: () => void
}

export default function FlipCard({
  frontTitle,
  frontDescription,
  frontIcon,
  frontIconBg,
  backTitle,
  backContent,
  backButtonText,
  backButtonAction,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      className="flip-card-container h-full perspective-container"
      style={{ perspective: "1000px", height: "400px" }}
    >
      <div
        className={`flip-card relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="flip-card-front absolute inset-0 bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
          onClick={handleFlip}
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${frontIconBg}`}>{frontIcon}</div>
          <h3 className="text-xl font-bold mb-2">{frontTitle}</h3>
          <p className="text-gray-400 flex-grow">{frontDescription}</p>
          <div className="mt-4 text-sm text-[#FFD700]">Click to learn more</div>
        </div>

        {/* Back of card */}
        <div
          className="flip-card-back absolute inset-0 bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col rotate-y-180 backface-hidden cursor-pointer"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          onClick={handleFlip}
        >
          <h3 className="text-xl font-bold text-[#FFD700] mb-4">{backTitle}</h3>
          <div className="flex-grow overflow-auto custom-scrollbar">{backContent}</div>
          <div className="mt-6">
            <button
              className="px-4 py-2 bg-[#FFD700] text-black font-medium rounded hover:bg-[#E6C200] transition-colors"
              onClick={(e) => {
                e.stopPropagation() // Prevent card flip when clicking the button
                backButtonAction()
              }}
            >
              {backButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

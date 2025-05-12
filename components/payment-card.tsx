"use client"

import { useState, type ReactNode } from "react"

interface PaymentCardProps {
  frontImage: string
  frontTitle: string
  frontDescription: string
  backTitle: string
  backContent: ReactNode
  backButtonText: string
  backButtonAction: () => void
}

export default function PaymentCard({
  frontImage,
  frontTitle,
  frontDescription,
  backTitle,
  backContent,
  backButtonText,
  backButtonAction,
}: PaymentCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      className="flip-card-container h-full perspective-container"
      style={{ perspective: "1000px", height: "500px" }}
    >
      <div
        className={`flip-card relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="flip-card-front absolute inset-0 rounded-xl overflow-hidden border border-gray-800 shadow-lg backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
          onClick={handleFlip}
        >
          <img
            src={frontImage || "/placeholder.svg"}
            alt={frontTitle}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold mb-2">{frontTitle}</h3>
            <p className="text-gray-300">{frontDescription}</p>
            <div className="mt-4 text-sm text-[#FFD700]">Click to flip card</div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="flip-card-back absolute inset-0 bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col rotate-y-180 backface-hidden cursor-pointer"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          onClick={handleFlip}
        >
          <h3 className="text-2xl font-bold text-[#FFD700] mb-4">{backTitle}</h3>
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

"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface FeatureSectionProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  features: {
    title: string
    description: string
  }[]
  reverse?: boolean
  bgColor?: string
}

export default function FeatureSection({
  title,
  description,
  imageSrc,
  imageAlt,
  features,
  reverse = false,
  bgColor = "bg-black/30",
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Create a parallax effect for the image
    gsap.fromTo(
      ".feature-image",
      {
        y: -20,
      },
      {
        y: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    )

    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div ref={sectionRef} className={`py-24 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
          <div className={reverse ? "lg:order-2" : ""}>
            {/* Make text visible by default */}
            <div className="opacity-100">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
              <p className="text-xl text-gray-300 mb-8">{description}</p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start opacity-100">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative h-[500px] ${reverse ? "lg:order-1" : ""}`}>
            <div className="feature-image relative h-full w-full rounded-xl overflow-hidden border border-gray-800">
              <img
                src={imageSrc || "/placeholder.svg"}
                alt={imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

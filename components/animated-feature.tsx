"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedFeatureProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  reverse?: boolean
}

export default function AnimatedFeature({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}: AnimatedFeatureProps) {
  const featureRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!featureRef.current || !textRef.current || !imageRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    })

    // Animate the text content
    tl.fromTo(
      textRef.current,
      {
        x: reverse ? 50 : -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
    )

    // Animate the image
    tl.fromTo(
      imageRef.current,
      {
        x: reverse ? -50 : 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6", // Start slightly before the text animation finishes
    )
  }, [reverse])

  return (
    <div ref={featureRef} className="py-16">
      <div
        className={`container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}
      >
        <div ref={textRef} className={reverse ? "lg:order-2" : ""}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-300">{description}</p>
        </div>

        <div
          ref={imageRef}
          className={`relative h-[400px] rounded-xl overflow-hidden border border-gray-800 ${reverse ? "lg:order-1" : ""}`}
        >
          <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}

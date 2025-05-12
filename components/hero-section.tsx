"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplineViewer from "./spline-viewer"
import AdvancedScrollAnimation from "./advanced-scroll-animation"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const splineContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !contentRef.current) return

    // Set content visible immediately
    setIsVisible(true)
  }, [])

  return (
    <div
      ref={heroSectionRef}
      className="relative min-h-[150vh] flex flex-col justify-start items-center overflow-hidden"
      style={{
        backgroundPosition: "50% 0%",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(30,20,0,0.9))",
      }}
    >
      {/* Giant RISE text in background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <h1 className="text-[25vw] font-bold text-[#FFD700]/10 whitespace-nowrap select-none">RISE</h1>
      </div>

      {/* Globe container - positioned absolutely to cover the entire hero section */}
      <div
        ref={splineContainerRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center z-0"
        style={{ perspective: "1000px" }}
      >
        <SplineViewer
          url="https://prod.spline.design/59XAYmFdcuvCo16S/scene.splinecode"
          className="w-[150%] h-[150%]" // Make it larger than the container
          priority={true}
          enableScrollAnimation={true}
          initialScale={1.2}
          finalScale={0.3}
        />
      </div>

      {/* Content container - positioned for better readability */}
      <div className="container mx-auto px-4 relative z-10 h-screen flex items-center">
        <div ref={contentRef} className="max-w-3xl">
          <AdvancedScrollAnimation type="textSplit" staggerAmount={0.03} threshold={0.1}>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 stagger-item ${isVisible ? "visible" : ""}`}
            >
              Welcome to <span className="text-[#FFD700] text-glow">Rise</span>, transforming your business with
              innovative solutions
            </h1>
          </AdvancedScrollAnimation>

          <AdvancedScrollAnimation type="reveal" direction="up" amount={30} delay={0.5} threshold={0.1}>
            <p className={`text-xl text-gray-300 mb-8 stagger-item stagger-delay-2 ${isVisible ? "visible" : ""}`}>
              Innovative BPO, AI, Software Development, and Digital Marketing solutions to elevate your business.
            </p>
          </AdvancedScrollAnimation>

          <AdvancedScrollAnimation type="stagger" staggerAmount={0.2} threshold={0.1}>
            <div className={`flex flex-wrap gap-4 stagger-item stagger-delay-3 ${isVisible ? "visible" : ""}`}>
              <button
                onClick={() => document.getElementById("bpo")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 bg-[#FFD700] text-black font-medium rounded hover:bg-[#E6C200] transition-colors"
              >
                Explore Our Services
              </button>
              <button
                onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 border border-[#FFD700] text-[#FFD700] font-medium rounded hover:bg-[#FFD700]/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </AdvancedScrollAnimation>
        </div>
      </div>

      {/* Additional content section below the initial viewport */}
      <div className="container mx-auto px-4 relative z-10 mt-20 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AdvancedScrollAnimation type="reveal" direction="up" amount={30} delay={0.1} threshold={0.1}>
            <div className="bg-black/30 p-6 rounded-xl border border-[#FFD700]/20">
              <h3 className="text-2xl font-bold mb-3 text-[#FFD700]">Global Reach</h3>
              <p className="text-gray-300">
                Connecting businesses worldwide with innovative solutions and strategic partnerships.
              </p>
            </div>
          </AdvancedScrollAnimation>

          <AdvancedScrollAnimation type="reveal" direction="up" amount={30} delay={0.2} threshold={0.1}>
            <div className="bg-black/30 p-6 rounded-xl border border-[#FFD700]/20">
              <h3 className="text-2xl font-bold mb-3 text-[#FFD700]">Cutting-Edge Technology</h3>
              <p className="text-gray-300">
                Leveraging the latest advancements in AI and software development to drive business growth.
              </p>
            </div>
          </AdvancedScrollAnimation>

          <AdvancedScrollAnimation type="reveal" direction="up" amount={30} delay={0.3} threshold={0.1}>
            <div className="bg-black/30 p-6 rounded-xl border border-[#FFD700]/20">
              <h3 className="text-2xl font-bold mb-3 text-[#FFD700]">Expert Teams</h3>
              <p className="text-gray-300">
                Dedicated professionals with industry expertise delivering exceptional results for your business.
              </p>
            </div>
          </AdvancedScrollAnimation>
        </div>
      </div>

      {/* Add a gradient overlay that becomes more visible as user scrolls */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[1] pointer-events-none"
        style={{ opacity: 0.5 }}
      ></div>

      {/* Add a scroll indicator at the bottom of the viewport */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="text-white/70 text-sm mb-2">Scroll Down</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white/70 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}

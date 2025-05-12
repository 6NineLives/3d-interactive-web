"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplineViewer from "./spline-viewer"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SoftwareAiSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const splineRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !contentRef.current) return

    // Set content visible immediately
    setIsVisible(true)
  }, [])

  return (
    <div className="container mx-auto px-4 h-full flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        <div
          ref={splineRef}
          className={`h-[500px] lg:h-full flex items-center justify-center order-2 lg:order-1 stagger-item ${isVisible ? "visible" : ""}`}
        >
          <div className="relative w-full h-full">
            <SplineViewer
              url="https://prod.spline.design/RnuclWBZyRc5yUwL/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        <div ref={contentRef} className="flex flex-col justify-center order-1 lg:order-2">
          <div
            className={`inline-block px-3 py-1 bg-[#9c27b0]/10 text-[#9c27b0] rounded-full text-sm font-medium mb-4 stagger-item ${isVisible ? "visible" : ""}`}
          >
            Software & AI
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 stagger-item stagger-delay-1 ${isVisible ? "visible" : ""}`}
          >
            Unlock the power of <span className="text-[#FFD700] text-glow">AI and custom software</span>
          </h2>

          <p className={`text-xl text-gray-300 mb-8 stagger-item stagger-delay-2 ${isVisible ? "visible" : ""}`}>
            Rise's innovative solutions in CRM, machine learning, robotics, and more. Our cutting-edge technology drives
            business growth and efficiency.
          </p>

          <ul className="space-y-4 mb-8">
            <li className={`flex items-start stagger-item stagger-delay-3 ${isVisible ? "visible" : ""}`}>
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-1 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
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
                <h3 className="text-lg font-medium mb-2">Custom Software Development</h3>
                <p className="text-gray-400 leading-relaxed">Tailored solutions for your unique business needs</p>
              </div>
            </li>

            <li className={`flex items-start stagger-item stagger-delay-4 ${isVisible ? "visible" : ""}`}>
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-1 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
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
                <h3 className="text-lg font-medium mb-2">AI & Machine Learning</h3>
                <p className="text-gray-400 leading-relaxed">Advanced algorithms to automate and optimize processes</p>
              </div>
            </li>

            <li className={`flex items-start stagger-item stagger-delay-5 ${isVisible ? "visible" : ""}`}>
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-1 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
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
                <h3 className="text-lg font-medium mb-2">CRM & Business Intelligence</h3>
                <p className="text-gray-400 leading-relaxed">Data-driven insights to power your decision making</p>
              </div>
            </li>
          </ul>

          <button
            onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
            className={`px-6 py-3 bg-[#FFD700] text-black font-medium rounded hover:bg-[#E6C200] transition-colors inline-block stagger-item stagger-delay-5 ${isVisible ? "visible" : ""}`}
          >
            Explore AI Solutions
          </button>
        </div>
      </div>
    </div>
  )
}

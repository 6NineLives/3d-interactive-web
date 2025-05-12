"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function MarketingSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const splineRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !contentRef.current) return

    // Set content visible immediately
    setIsVisible(true)
  }, [])

  return (
    <div className="container mx-auto px-4 h-full flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        <div ref={contentRef} className="flex flex-col justify-center">
          <div
            className={`inline-block px-3 py-1 bg-[#0088cc]/10 text-[#0088cc] rounded-full text-sm font-medium mb-4 stagger-item ${isVisible ? "visible" : ""}`}
          >
            Marketing Services
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 stagger-item stagger-delay-1 ${isVisible ? "visible" : ""}`}
          >
            Boost your online presence with our <span className="text-[#FFD700] text-glow">marketing services</span>
          </h2>

          <p className={`text-xl text-gray-300 mb-8 stagger-item stagger-delay-2 ${isVisible ? "visible" : ""}`}>
            Our SEO, PPC, social media, and reputation management services drive traffic, engagement, and conversions
            for your business.
          </p>

          <ul className="space-y-4 mb-8">
            <li className={`flex items-start stagger-item stagger-delay-3 ${isVisible ? "visible" : ""}`}>
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
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
                <h3 className="text-lg font-medium mb-2">Search Engine Optimization</h3>
                <p className="text-gray-400 leading-relaxed">Improve your visibility in search results</p>
              </div>
            </li>

            <li className={`flex items-start stagger-item stagger-delay-4 ${isVisible ? "visible" : ""}`}>
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
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
                <h3 className="text-lg font-medium mb-2">Pay-Per-Click Advertising</h3>
                <p className="text-gray-400 leading-relaxed">Drive targeted traffic with strategic ad campaigns</p>
              </div>
            </li>

            <li className={`flex items-start stagger-item stagger-delay-5 ${isVisible ? "visible" : ""}`}>
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
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
                <h3 className="text-lg font-medium mb-2">Social Media Management</h3>
                <p className="text-gray-400 leading-relaxed">Engage your audience across all platforms</p>
              </div>
            </li>
          </ul>

          <button
            onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
            className={`px-6 py-3 bg-[#FFD700] text-black font-medium rounded hover:bg-[#E6C200] transition-colors inline-block stagger-item stagger-delay-5 ${isVisible ? "visible" : ""}`}
          >
            Get Marketing Strategy
          </button>
        </div>

        <div
          ref={splineRef}
          className={`h-[500px] lg:h-full flex items-center justify-center stagger-item ${isVisible ? "visible" : ""}`}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/20 to-black/40 border border-gray-800">
            <img
              src="/images/erf.png"
              alt="Marketing Services Visualization"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />

            {/* Interactive overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <div className="text-center p-6 bg-black/60 backdrop-blur-sm rounded-xl max-w-md">
                <h3 className="text-2xl font-bold mb-2">Digital Marketing Excellence</h3>
                <p className="text-gray-300">Elevate your brand with data-driven marketing strategies</p>
                <div className="mt-4 text-sm text-[#FFD700]">Click to explore our marketing solutions</div>
              </div>
            </div>

            {/* Expandable details panel */}
            <div
              className={`absolute inset-0 bg-black/90 backdrop-blur-md p-6 transition-all duration-500 ease-in-out overflow-y-auto ${
                showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
              }`}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDetails(false)
                }}
              >
                <X className="h-6 w-6" />
              </button>

              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Our Digital Marketing Solutions</h3>

              <div className="space-y-6">
                <div className="border-l-4 border-[#FFD700] pl-4">
                  <h4 className="text-xl font-medium text-white mb-2">Search Engine Optimization</h4>
                  <p className="text-gray-300">
                    Our comprehensive SEO strategies improve your website's visibility in search results, driving
                    organic traffic and increasing conversions. We focus on technical SEO, content optimization, and
                    link building to achieve sustainable results.
                  </p>
                </div>

                <div className="border-l-4 border-[#FFD700] pl-4">
                  <h4 className="text-xl font-medium text-white mb-2">Pay-Per-Click Advertising</h4>
                  <p className="text-gray-300">
                    Our PPC campaigns deliver targeted traffic and measurable ROI. We create and manage campaigns across
                    Google Ads, Bing Ads, and social media platforms, optimizing for maximum performance and cost
                    efficiency.
                  </p>
                </div>

                <div className="border-l-4 border-[#FFD700] pl-4">
                  <h4 className="text-xl font-medium text-white mb-2">Social Media Marketing</h4>
                  <p className="text-gray-300">
                    Engage your audience and build brand loyalty with our social media marketing services. We develop
                    content strategies, manage communities, and run targeted ad campaigns to grow your social presence.
                  </p>
                </div>

                <div className="border-l-4 border-[#FFD700] pl-4">
                  <h4 className="text-xl font-medium text-white mb-2">Content Marketing</h4>
                  <p className="text-gray-300">
                    Our content marketing strategies help you attract, engage, and convert your target audience. From
                    blog posts and articles to videos and infographics, we create compelling content that drives
                    results.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  className="px-6 py-3 bg-[#FFD700] text-black font-medium rounded hover:bg-[#E6C200] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDetails(false)
                    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Get a Custom Marketing Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

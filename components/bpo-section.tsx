"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function BpoSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const splineRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)

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
            className={`inline-block px-3 py-1 bg-[#FFD700]/10 text-[#FFD700] rounded-full text-sm font-medium mb-4 stagger-item ${isVisible ? "visible" : ""}`}
          >
            BPO Services
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 stagger-item stagger-delay-1 ${isVisible ? "visible" : ""}`}
          >
            Optimize your operations with our <span className="text-[#FFD700] text-glow">BPO services</span>
          </h2>

          <p className={`text-xl text-gray-300 mb-8 stagger-item stagger-delay-2 ${isVisible ? "visible" : ""}`}>
            We handle customer service, IT, and HR outsourcing, so you can focus on growth. Our team of experts ensures
            seamless operations and exceptional service delivery.
          </p>

          <ul className="space-y-4 mb-8">
            <li className={`flex items-start stagger-item stagger-delay-3 ${isVisible ? "visible" : ""}`}>
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3">
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
                <h3 className="text-lg font-medium mb-2">Customer Service Excellence</h3>
                <p className="text-gray-400 leading-relaxed">24/7 support with multilingual capabilities</p>
              </div>
            </li>

            <li className={`flex items-start stagger-item stagger-delay-4 ${isVisible ? "visible" : ""}`}>
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3">
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
                <h3 className="text-lg font-medium mb-2">IT Support & Management</h3>
                <p className="text-gray-400 leading-relaxed">Technical expertise for all your IT needs</p>
              </div>
            </li>

            <li className={`flex items-start stagger-item stagger-delay-5 ${isVisible ? "visible" : ""}`}>
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3">
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
                <h3 className="text-lg font-medium mb-2">HR & Administrative Support</h3>
                <p className="text-gray-400 leading-relaxed">Streamline your HR processes and administration</p>
              </div>
            </li>
          </ul>

          <button
            onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
            className={`px-6 py-3 bg-[#FFD700] text-black font-medium rounded hover:bg-[#E6C200] transition-colors inline-block stagger-item stagger-delay-5 ${isVisible ? "visible" : ""}`}
          >
            Learn More About BPO
          </button>
        </div>

        <div
          ref={splineRef}
          className={`h-[500px] lg:h-full flex items-center justify-center stagger-item ${isVisible ? "visible" : ""}`}
        >
          <div
            className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-green-900/20 to-black/40 border border-gray-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            onClick={() => setShowModal(true)}
          >
            <img
              src="/images/globerow.png"
              alt="BPO Services Visualization"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6 bg-black/60 backdrop-blur-sm rounded-xl max-w-md">
                <h3 className="text-2xl font-bold mb-2">Global BPO Solutions</h3>
                <p className="text-gray-300">Connecting your business with worldwide talent and resources</p>
                <div className="mt-4 text-sm text-[#FFD700]">Click for more details</div>
              </div>
            </div>
          </div>

          {/* Modal Popup */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
              <div className="relative bg-black/90 border border-gray-800 rounded-xl p-8 max-w-2xl w-full shadow-xl transform transition-all animate-modal-fade-in">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <X className="h-6 w-6" />
                </button>

                <h2 className="text-3xl font-bold mb-4 text-[#FFD700]">Global BPO Solutions</h2>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-300">
                    Our Global Business Process Outsourcing (BPO) solutions connect your business with top talent and
                    resources worldwide, enabling you to scale operations efficiently while maintaining quality.
                  </p>

                  <h3 className="text-xl font-medium text-white mt-6">Our Global BPO Services Include:</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#FFD700] mb-2">Customer Support</h4>
                      <p className="text-gray-400 text-sm">
                        24/7 multilingual customer service across multiple channels
                      </p>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#FFD700] mb-2">Back Office Operations</h4>
                      <p className="text-gray-400 text-sm">Data entry, processing, and administrative support</p>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#FFD700] mb-2">Technical Support</h4>
                      <p className="text-gray-400 text-sm">IT helpdesk and technical troubleshooting</p>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#FFD700] mb-2">HR Services</h4>
                      <p className="text-gray-400 text-sm">Recruitment, onboarding, and HR administration</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    className="px-6 py-3 bg-[#FFD700] text-black font-medium rounded hover:bg-[#E6C200] transition-colors"
                    onClick={() => {
                      setShowModal(false)
                      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Contact Us About BPO
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

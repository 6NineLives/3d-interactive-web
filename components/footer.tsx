"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    // Create a timeline for the footer animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    })

    // Animate the heading
    tl.from(".footer-heading", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      // Animate the paragraph
      .from(
        ".footer-text",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5",
      )
      // Animate the bottom section
      .from(
        ".footer-bottom",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      )
      // Animate the social icons
      .from(
        ".footer-social a",
        {
          y: 15,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      )

    return () => {
      // Clean up
      if (tl) tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <footer ref={footerRef} className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="footer-heading text-2xl md:text-3xl font-bold mb-4">
            Partner with <span className="text-[#FFD700]">Rise</span> today for business growth through technology
          </h2>
          <p className="footer-text text-gray-400 max-w-2xl mx-auto">
            Let our team of experts help you transform your business with innovative solutions tailored to your needs.
          </p>
        </div>

        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Rise LLC. All rights reserved.</p>
          </div>

          <div className="flex items-center space-x-6">
            <a href="tel:+13323333990" className="text-white hover:text-[#FFD700] transition-colors">
              +1 332-333-3990
            </a>
            <a href="mailto:info@risellc.net" className="text-white hover:text-[#FFD700] transition-colors">
              info@risellc.net
            </a>
          </div>

          <div className="footer-social flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 7.5 2 7.5 2-.7-1.2-1-2.5-1-4 0-4.4 3.6-8 8-8V4z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

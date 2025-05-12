"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, BarChart3, Globe } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  delay: number
}

const ServiceCard = ({ title, description, icon, color, delay }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    // Set initial state to ensure visibility
    gsap.set(cardRef.current, { opacity: 1, y: 0, rotateY: 0, scale: 1 })

    // Create animation
    gsap.fromTo(
      cardRef.current,
      {
        y: 50,
        opacity: 0.5,
        rotateY: 5,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    // Add hover animation
    cardRef.current.addEventListener("mouseenter", () => {
      gsap.to(cardRef.current, {
        y: -10,
        scale: 1.03,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
      })
    })

    cardRef.current.addEventListener("mouseleave", () => {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
      })
    })
  }, [delay])

  return (
    <div
      ref={cardRef}
      className="service-card bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-lg transition-all duration-300 h-full"
      style={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

export default function FloatingCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !subheadingRef.current) return

    // Set initial state to ensure visibility
    gsap.set([headingRef.current, subheadingRef.current], { opacity: 1, y: 0 })

    // Animate the heading
    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      },
    )

    // Animate the subheading
    gsap.fromTo(
      subheadingRef.current,
      { y: 20, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <div ref={sectionRef} className="py-16 px-4">
      <div className="container mx-auto">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center mb-4">
          Our <span className="text-[#FFD700] text-glow">Comprehensive</span> Services
        </h2>
        <p ref={subheadingRef} className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Discover how our innovative solutions can transform your business operations and drive growth
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Business Process Outsourcing"
            description="Streamline your operations with our comprehensive BPO services, from customer support to back-office operations."
            icon={<BarChart3 className="w-6 h-6 text-white" />}
            color="bg-gradient-to-br from-green-500 to-green-700"
            delay={0}
          />
          <ServiceCard
            title="Digital Marketing Solutions"
            description="Boost your online presence with SEO, PPC, social media management, and content marketing strategies."
            icon={<Globe className="w-6 h-6 text-white" />}
            color="bg-gradient-to-br from-blue-500 to-blue-700"
            delay={0.2}
          />
          <ServiceCard
            title="AI & Software Development"
            description="Custom software solutions and AI integrations tailored to your business needs and growth objectives."
            icon={<Code className="w-6 h-6 text-white" />}
            color="bg-gradient-to-br from-purple-500 to-purple-700"
            delay={0.4}
          />
        </div>
      </div>
    </div>
  )
}

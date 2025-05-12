"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, BarChart3, Globe } from "lucide-react"
import ScrollDrivenAnimation from "./scroll-driven-animation"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ServiceCardProps {
  icon: React.ReactNode
  iconBg: string
  title: string
  description: string
  index: number
}

// Fix the issue with card visibility and improve the animation flow

// Update the ServiceCard component to ensure content is always visible:
const ServiceCard = ({ icon, iconBg, title, description, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    // Ensure card is visible by default
    gsap.set(cardRef.current, { opacity: 1, y: 0, scale: 1 })

    // Create hover effect
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
  }, [])

  return (
    <div
      ref={cardRef}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-lg transition-all duration-300 h-full opacity-100"
      style={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconBg}`}>{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

export default function AppleStyleCards() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Create a timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate the heading and subheading
    tl.from(".section-title", {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }).from(
      ".section-subtitle",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.6",
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

  const services = [
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      iconBg: "bg-gradient-to-br from-green-500 to-green-700",
      title: "Business Process Outsourcing",
      description:
        "Streamline your operations with our comprehensive BPO services, from customer support to back-office operations.",
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-700",
      title: "Digital Marketing Solutions",
      description:
        "Boost your online presence with SEO, PPC, social media management, and content marketing strategies.",
    },
    {
      icon: <Code className="w-6 h-6 text-white" />,
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-700",
      title: "AI & Software Development",
      description:
        "Custom software solutions and AI integrations tailored to your business needs and growth objectives.",
    },
  ]

  return (
    <div ref={sectionRef} className="py-24 px-4 border-t border-gray-800 bg-black/50">
      <div className="container mx-auto">
        <ScrollDrivenAnimation animation="fromBottom" scrub={0.5}>
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-4">
            Our <span className="text-[#FFD700] text-glow">Comprehensive</span> Services
          </h2>
        </ScrollDrivenAnimation>

        <ScrollDrivenAnimation animation="fromBottom" delay={0.2} scrub={0.5}>
          <p className="section-subtitle text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
            Discover how our innovative solutions can transform your business operations and drive growth
          </p>
        </ScrollDrivenAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollDrivenAnimation
              key={index}
              animation={index % 2 === 0 ? "fromLeft" : "fromRight"}
              delay={index * 0.2}
              scrub={0.5}
              start="top 80%"
              end="center 50%"
            >
              <ServiceCard
                icon={service.icon}
                iconBg={service.iconBg}
                title={service.title}
                description={service.description}
                index={index}
              />
            </ScrollDrivenAnimation>
          ))}
        </div>
      </div>
    </div>
  )
}

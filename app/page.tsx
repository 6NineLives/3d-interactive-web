"use client"

import { useEffect, useState, useRef } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BpoSection from "@/components/bpo-section"
import SoftwareAiSection from "@/components/software-ai-section"
import MarketingSection from "@/components/marketing-section"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"
import ScrollPagination from "@/components/scroll-pagination"
import AdvancedScrollAnimation from "@/components/advanced-scroll-animation"
import ContactSection from "@/components/contact-section"
import FlipCard from "@/components/flip-card"
import PaymentCard from "@/components/payment-card"

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState(0)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Simulate loading of assets with a minimum time to prevent flashing
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    // Preload critical assets
    const preloadImages = [
      "/images/rise-logo.png",
      "/images/globerow.png",
      "/images/erf.png",
      "/images/cuterrobot.png",
      "/images/cardbrah.png",
      "/images/earth-night.png",
    ]
    preloadImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Handle section visibility and navigation
  useEffect(() => {
    if (!loading && sectionsRef.current) {
      // Set up intersection observer to detect active section
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((section) => section === entry.target)
            if (index !== -1) {
              setActiveSection(index)
              // Update URL hash without scrolling
              const id = entry.target.id
              if (id) {
                window.history.replaceState(null, "", `#${id}`)
              }
            }
          }
        })
      }, options)

      // Observe all sections
      sectionRefs.current.forEach((section) => {
        if (section) observer.observe(section)
      })

      return () => {
        sectionRefs.current.forEach((section) => {
          if (section) observer.unobserve(section)
        })
      }
    }
  }, [loading])

  // Handle navigation to sections
  const navigateToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })

      // Update URL hash
      const id = sectionRefs.current[index]?.id
      if (id) {
        window.history.replaceState(null, "", `#${id}`)
      }

      setActiveSection(index)
    }
  }

  return (
    <>
      {loading && <Preloader />}
      <div
        className={`bg-black text-white min-h-screen ${loading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}`}
      >
        <Header activeSection={activeSection} onNavClick={navigateToSection} />

        {/* Scroll progress indicator */}
        <div className="scroll-progress"></div>

        <div ref={sectionsRef} className="overflow-y-auto" style={{ height: "auto" }}>
          <section ref={(el) => (sectionRefs.current[0] = el)} id="hero-section" className="relative overflow-hidden">
            <HeroSection />
          </section>

          <section
            ref={(el) => (sectionRefs.current[1] = el)}
            id="bpo"
            className="min-h-screen relative border-t border-gray-800 py-16"
          >
            <BpoSection />
          </section>

          {/* Our Comprehensive Services section with flip cards */}
          <section className="py-24 px-4 border-t border-gray-800 bg-black/50 relative">
            <div className="container mx-auto">
              <AdvancedScrollAnimation type="textSplit" staggerAmount={0.05} threshold={0.2}>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Our <span className="text-[#FFD700] text-glow">Comprehensive</span> Services
                </h2>
              </AdvancedScrollAnimation>

              <AdvancedScrollAnimation type="reveal" direction="up" amount={30} delay={0.2} threshold={0.2}>
                <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
                  Discover how our innovative solutions can transform your business operations and drive growth
                </p>
              </AdvancedScrollAnimation>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Service Card 1 - BPO */}
                <AdvancedScrollAnimation type="reveal" direction="left" amount={50} delay={0.1} threshold={0.2}>
                  <FlipCard
                    frontTitle="Business Process Outsourcing"
                    frontDescription="Streamline your operations with our comprehensive BPO services."
                    frontIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6.01" y2="6"></line>
                        <line x1="6" y1="18" x2="6.01" y2="18"></line>
                      </svg>
                    }
                    frontIconBg="bg-gradient-to-br from-green-500 to-green-700"
                    backTitle="BPO Services"
                    backContent={
                      <div className="space-y-4">
                        <p className="text-gray-300">Our BPO services include:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                          <li>24/7 Customer Support</li>
                          <li>Technical Help Desk</li>
                          <li>Back Office Operations</li>
                          <li>Data Entry & Processing</li>
                          <li>HR & Recruitment Support</li>
                        </ul>
                        <p className="text-gray-300 mt-4">
                          We help you reduce operational costs while maintaining quality and efficiency.
                        </p>
                      </div>
                    }
                    backButtonText="Learn More"
                    backButtonAction={() => document.getElementById("bpo")?.scrollIntoView({ behavior: "smooth" })}
                  />
                </AdvancedScrollAnimation>

                {/* Service Card 2 - Digital Marketing */}
                <AdvancedScrollAnimation type="reveal" direction="up" amount={50} delay={0.2} threshold={0.2}>
                  <FlipCard
                    frontTitle="Digital Marketing Solutions"
                    frontDescription="Boost your online presence with strategic marketing campaigns."
                    frontIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    }
                    frontIconBg="bg-gradient-to-br from-blue-500 to-blue-700"
                    backTitle="Marketing Services"
                    backContent={
                      <div className="space-y-4">
                        <p className="text-gray-300">Our marketing expertise includes:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                          <li>Search Engine Optimization (SEO)</li>
                          <li>Pay-Per-Click (PPC) Campaigns</li>
                          <li>Social Media Marketing</li>
                          <li>Content Marketing</li>
                          <li>Email Marketing Automation</li>
                        </ul>
                        <p className="text-gray-300 mt-4">
                          Drive traffic, engagement, and conversions with our data-driven strategies.
                        </p>
                      </div>
                    }
                    backButtonText="Explore Marketing"
                    backButtonAction={() =>
                      document.getElementById("marketing")?.scrollIntoView({ behavior: "smooth" })
                    }
                  />
                </AdvancedScrollAnimation>

                {/* Service Card 3 - AI & Software */}
                <AdvancedScrollAnimation type="reveal" direction="right" amount={50} delay={0.3} threshold={0.2}>
                  <FlipCard
                    frontTitle="AI & Software Development"
                    frontDescription="Custom solutions tailored to your business needs and growth objectives."
                    frontIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    }
                    frontIconBg="bg-gradient-to-br from-purple-500 to-purple-700"
                    backTitle="Technology Solutions"
                    backContent={
                      <div className="space-y-4">
                        <p className="text-gray-300">Our tech solutions include:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                          <li>Custom Software Development</li>
                          <li>AI & Machine Learning Integration</li>
                          <li>Business Intelligence Tools</li>
                          <li>CRM & ERP Solutions</li>
                          <li>Cloud Migration & Management</li>
                        </ul>
                        <p className="text-gray-300 mt-4">
                          Leverage cutting-edge technology to automate processes and gain valuable insights.
                        </p>
                      </div>
                    }
                    backButtonText="Discover AI Solutions"
                    backButtonAction={() => document.getElementById("software")?.scrollIntoView({ behavior: "smooth" })}
                  />
                </AdvancedScrollAnimation>
              </div>
            </div>
          </section>

          <section
            ref={(el) => (sectionRefs.current[2] = el)}
            id="software"
            className="min-h-screen relative border-t border-gray-800 py-16"
          >
            <SoftwareAiSection />
          </section>

          {/* Feature Section with enhanced animations */}
          <section className="py-16 border-t border-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/10 to-black/0 z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <AdvancedScrollAnimation type="reveal" direction="left" amount={80} threshold={0.2}>
                  <div>
                    <AdvancedScrollAnimation type="textSplit" staggerAmount={0.02} threshold={0.2}>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">AI-Powered Business Solutions</h2>
                    </AdvancedScrollAnimation>

                    <p className="text-xl text-gray-300 mb-8">
                      Our cutting-edge AI technology helps businesses automate processes, gain insights from data, and
                      make better decisions. Experience the future of business operations today.
                    </p>

                    <div className="space-y-6">
                      <AdvancedScrollAnimation type="stagger" staggerAmount={0.1} threshold={0.2}>
                        <div className="flex items-start">
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
                            <h3 className="text-lg font-medium mb-2">Intelligent Automation</h3>
                            <p className="text-gray-400">
                              Automate repetitive tasks and workflows with AI-powered solutions
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
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
                            <h3 className="text-lg font-medium mb-2">Predictive Analytics</h3>
                            <p className="text-gray-400">
                              Forecast trends and make data-driven decisions with advanced analytics
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
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
                            <h3 className="text-lg font-medium mb-2">Natural Language Processing</h3>
                            <p className="text-gray-400">
                              Extract insights from text data and improve customer interactions
                            </p>
                          </div>
                        </div>
                      </AdvancedScrollAnimation>
                    </div>
                  </div>
                </AdvancedScrollAnimation>

                <AdvancedScrollAnimation type="reveal" direction="right" amount={80} threshold={0.2}>
                  <div className="relative h-[500px]">
                    <PaymentCard
                      frontImage="/images/cuterrobot.png"
                      frontTitle="AI-Powered Business Solutions"
                      frontDescription="Leverage cutting-edge AI technology to transform your business operations"
                      backTitle="AI Solutions"
                      backContent={
                        <div className="space-y-4">
                          <p className="text-gray-300">Our AI solutions include:</p>
                          <ul className="list-disc pl-5 space-y-2 text-gray-300">
                            <li>Machine Learning Models for Predictive Analytics</li>
                            <li>Natural Language Processing for Text Analysis</li>
                            <li>Computer Vision for Image Recognition</li>
                            <li>Chatbots and Virtual Assistants</li>
                            <li>Recommendation Systems</li>
                            <li>Anomaly Detection for Fraud Prevention</li>
                          </ul>
                          <p className="text-gray-300 mt-4">
                            Our AI solutions are designed to integrate seamlessly with your existing systems and provide
                            immediate value.
                          </p>
                        </div>
                      }
                      backButtonText="Explore AI Solutions"
                      backButtonAction={() =>
                        document.getElementById("software")?.scrollIntoView({ behavior: "smooth" })
                      }
                    />
                  </div>
                </AdvancedScrollAnimation>
              </div>
            </div>
          </section>

          <section
            ref={(el) => (sectionRefs.current[3] = el)}
            id="marketing"
            className="min-h-screen relative border-t border-gray-800 py-16"
          >
            <MarketingSection />
          </section>

          {/* Another Feature Section with enhanced animations */}
          <section className="py-16 border-t border-gray-800 bg-black/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-900/10 to-black/0 z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <AdvancedScrollAnimation type="reveal" direction="left" amount={80} threshold={0.2}>
                  <div className="relative h-[500px] lg:order-1">
                    <PaymentCard
                      frontImage="/images/cardbrah.png"
                      frontTitle="Secure Payment Processing"
                      frontDescription="Protect your transactions with our advanced security solutions"
                      backTitle="Payment Security Features"
                      backContent={
                        <div className="space-y-4">
                          <p className="text-gray-300">Our secure payment solutions include:</p>
                          <ul className="list-disc pl-5 space-y-2 text-gray-300">
                            <li>End-to-end encryption for all transactions</li>
                            <li>Multi-currency support for global businesses</li>
                            <li>Real-time fraud detection and prevention</li>
                            <li>PCI DSS compliant payment processing</li>
                            <li>Tokenization for secure recurring payments</li>
                            <li>Multi-factor authentication options</li>
                          </ul>
                          <p className="text-gray-300 mt-4">
                            Our payment solutions ensure your customers' data is protected while providing a seamless
                            checkout experience.
                          </p>
                        </div>
                      }
                      backButtonText="Learn More"
                      backButtonAction={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
                    />
                  </div>
                </AdvancedScrollAnimation>

                <AdvancedScrollAnimation type="reveal" direction="right" amount={80} threshold={0.2}>
                  <div className="lg:order-2">
                    <AdvancedScrollAnimation type="textSplit" staggerAmount={0.02} threshold={0.2}>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">Secure Payment Processing</h2>
                    </AdvancedScrollAnimation>

                    <p className="text-xl text-gray-300 mb-8">
                      Our secure payment solutions ensure your transactions are protected with the latest encryption
                      technology. Provide your customers with a seamless checkout experience they can trust.
                    </p>

                    <div className="space-y-6">
                      <AdvancedScrollAnimation type="stagger" staggerAmount={0.1} threshold={0.2}>
                        <div className="flex items-start">
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
                            <h3 className="text-lg font-medium mb-2">End-to-End Encryption</h3>
                            <p className="text-gray-400 leading-relaxed">
                              Protect sensitive data with advanced encryption protocols
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
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
                            <h3 className="text-lg font-medium mb-2">Multi-Currency Support</h3>
                            <p className="text-gray-400 leading-relaxed">
                              Process payments in multiple currencies for global business
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
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
                            <h3 className="text-lg font-medium mb-2">Fraud Detection</h3>
                            <p className="text-gray-400 leading-relaxed">
                              Identify and prevent fraudulent transactions in real-time
                            </p>
                          </div>
                        </div>
                      </AdvancedScrollAnimation>
                    </div>
                  </div>
                </AdvancedScrollAnimation>
              </div>
            </div>
          </section>

          <ContactSection />

          <section
            ref={(el) => (sectionRefs.current[4] = el)}
            id="footer"
            className="min-h-screen relative border-t border-gray-800"
          >
            <Footer />
          </section>
        </div>

        <ScrollPagination totalSections={4} activeSection={activeSection} onDotClick={navigateToSection} />
      </div>
    </>
  )
}

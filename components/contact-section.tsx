"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import AdvancedScrollAnimation from "./advanced-scroll-animation"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()

      // Reset submission status after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section className="py-20 bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div>
            <AdvancedScrollAnimation type="reveal" direction="up" amount={30} threshold={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Start Your{" "}
                <span className="text-[#FFD700]">
                  Digital
                  <br />
                  Transformation
                </span>{" "}
                Today
              </h2>
            </AdvancedScrollAnimation>

            <AdvancedScrollAnimation type="reveal" direction="up" amount={30} delay={0.1} threshold={0.2}>
              <p className="text-xl text-gray-300 mb-8">
                Fill out the form and our team will get back to you within 24 hours to discuss how we can help your
                business grow.
              </p>
            </AdvancedScrollAnimation>

            <div className="space-y-6">
              <AdvancedScrollAnimation type="reveal" direction="up" amount={20} delay={0.2} threshold={0.2}>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <CheckCircle className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">No Obligation Consultation</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Get expert advice on your business needs without any commitment
                    </p>
                  </div>
                </div>
              </AdvancedScrollAnimation>

              <AdvancedScrollAnimation type="reveal" direction="up" amount={20} delay={0.3} threshold={0.2}>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <CheckCircle className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Tailored Solutions</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Receive a customized plan designed specifically for your business goals
                    </p>
                  </div>
                </div>
              </AdvancedScrollAnimation>

              <AdvancedScrollAnimation type="reveal" direction="up" amount={20} delay={0.4} threshold={0.2}>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <CheckCircle className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Fast Response</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Our team will contact you within 24 hours of your submission
                    </p>
                  </div>
                </div>
              </AdvancedScrollAnimation>
            </div>
          </div>

          {/* Right column - Contact form */}
          <AdvancedScrollAnimation type="reveal" direction="up" amount={40} delay={0.2} threshold={0.2}>
            <div className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[#FFD700] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-300">
                    Your message has been sent successfully. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        NAME
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                        WEBSITE (OPTIONAL)
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        placeholder="Enter your website"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Write a brief overview of your business"
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-black font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        GET STARTED <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AdvancedScrollAnimation>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  activeSection: number
  onNavClick: (index: number) => void
}

export default function Header({ activeSection, onNavClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", index: 0 },
    { name: "BPO", index: 1 },
    { name: "Software & AI", index: 2 },
    { name: "Marketing", index: 3 },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center"
          onClick={(e) => {
            e.preventDefault()
            onNavClick(0)
          }}
        >
          <div className="relative h-10 w-24">
            <Image
              src="/images/rise-logo.png"
              alt="Rise LLC"
              width={50}
              height={50}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onNavClick(item.index)}
              className={`text-white hover:text-[#FFD700] transition-colors ${
                activeSection === item.index ? "text-[#FFD700]" : ""
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a href="tel:+13323333990" className="text-[#FFD700] font-medium hover:text-white transition-colors">
            Let&apos;s Talk: +1 332-333-3990
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black z-40 pt-20 px-4 transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col space-y-6 text-center">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                onNavClick(item.index)
                setIsMenuOpen(false)
              }}
              className={`text-white text-xl hover:text-[#FFD700] transition-colors ${
                activeSection === item.index ? "text-[#FFD700]" : ""
              }`}
            >
              {item.name}
            </button>
          ))}
          <a
            href="tel:+13323333990"
            className="text-[#FFD700] text-xl font-medium hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Let&apos;s Talk: +1 332-333-3990
          </a>
        </nav>
      </div>
    </header>
  )
}

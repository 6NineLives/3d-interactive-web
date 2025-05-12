import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation presets for content reveal
export const revealAnimations = {
  // Fade in and slide up animation
  fadeUp: (element: string | Element, delay = 0) => {
    return gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    })
  },

  // Fade in animation
  fadeIn: (element: string | Element, delay = 0) => {
    return gsap.from(element, {
      opacity: 0,
      duration: 1,
      delay,
      ease: "power2.out",
    })
  },

  // Scale up animation
  scaleUp: (element: string | Element, delay = 0) => {
    return gsap.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      delay,
      ease: "back.out(1.7)",
    })
  },

  // Staggered children animation
  staggerChildren: (parent: string | Element, childSelector: string, staggerAmount = 0.1) => {
    const children = gsap.utils.toArray(`${parent} ${childSelector}`)
    return gsap.from(children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: staggerAmount,
      ease: "power2.out",
    })
  },
}

// Create scroll-triggered animations
export const createScrollTrigger = (
  trigger: string | Element,
  animation: gsap.core.Tween,
  options: Partial<ScrollTrigger.Vars> = {},
) => {
  return ScrollTrigger.create({
    trigger,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    ...options,
    animation,
  })
}

// Create a scroll-based section transition
export const createSectionTransition = (
  sectionId: string,
  animations: Array<() => gsap.core.Tween>,
  options: Partial<ScrollTrigger.Vars> = {},
) => {
  const section = document.getElementById(sectionId)
  if (!section) return null

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...options,
    },
  })

  animations.forEach((animationFn) => {
    animationFn()
  })

  return timeline
}

// Animate background color change between sections
export const animateBackgroundColor = (
  element: string | Element,
  fromColor: string,
  toColor: string,
  scrollTrigger: Partial<ScrollTrigger.Vars>,
) => {
  return gsap.fromTo(
    element,
    { backgroundColor: fromColor },
    {
      backgroundColor: toColor,
      scrollTrigger: {
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...scrollTrigger,
      },
    },
  )
}

// Initialize all animations for a page
export const initPageAnimations = () => {
  // Reset any existing ScrollTriggers to prevent duplicates
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

  // Set up common animations here
  const sections = gsap.utils.toArray<HTMLElement>("section[id]")

  sections.forEach((section) => {
    // Animate headings
    const headings = section.querySelectorAll("h1, h2, h3")
    if (headings.length) {
      gsap.from(headings, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
    }

    // Animate paragraphs
    const paragraphs = section.querySelectorAll("p")
    if (paragraphs.length) {
      gsap.from(paragraphs, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
    }

    // Animate buttons
    const buttons = section.querySelectorAll("button, .button, a.btn")
    if (buttons.length) {
      gsap.from(buttons, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
    }

    // Animate Spline viewers
    const splineViewers = section.querySelectorAll("[data-spline-container]")
    if (splineViewers.length) {
      gsap.from(splineViewers, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
    }
  })

  // Set up scroll progress indicator
  gsap.to("body", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        document.documentElement.style.setProperty("--scroll-progress", self.progress.toString())
      },
    },
  })
}

"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollGlobeProps {
  className?: string
}

export default function ScrollGlobe({ className = "" }: ScrollGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const globeRef = useRef<THREE.Mesh | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x000000) // Black background

    // Create camera with initial zoomed-in position
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    cameraRef.current = camera
    camera.position.z = 2 // Start zoomed in

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Load Earth texture
    const textureLoader = new THREE.TextureLoader()

    // Load earth map texture with night lights
    const earthTexture = textureLoader.load("/images/earth-night.png", () => {
      setIsLoaded(true)
    })

    // Create globe geometry and material
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64)
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      emissive: 0x112244,
      emissiveMap: earthTexture,
      emissiveIntensity: 1.5,
    })

    // Create globe mesh
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    globeRef.current = globe
    scene.add(globe)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x333333)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Initial rotation to show North America
    globe.rotation.y = -Math.PI / 2
    globe.rotation.x = Math.PI / 6

    // Animation loop
    const animate = () => {
      if (globeRef.current) {
        // Add a very subtle constant rotation
        globeRef.current.rotation.y += 0.0005
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Set up scroll-driven animation
    gsap.to(camera.position, {
      z: 5, // Zoom out to this distance
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing effect
        ease: "power2.out",
      },
    })

    // Add rotation animation on scroll
    gsap.to(globe.rotation, {
      y: globe.rotation.y + Math.PI / 2, // Rotate 90 degrees
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1.5, // Slightly slower for rotation
        ease: "power1.inOut",
      },
    })

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)

      if (rendererRef.current && rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement)
      }

      if (globeRef.current) {
        globeRef.current.geometry.dispose()
        if (Array.isArray(globeRef.current.material)) {
          globeRef.current.material.forEach((material) => material.dispose())
        } else {
          globeRef.current.material.dispose()
        }
      }

      if (sceneRef.current) {
        sceneRef.current.clear()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ zIndex: 0 }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#FFD700] rounded-full loader-ring"></div>
        </div>
      )}
    </div>
  )
}

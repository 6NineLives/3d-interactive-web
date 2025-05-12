/**
 * Utility functions for performance optimization
 */

// Throttle function to limit the rate at which a function can fire
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// Debounce function to delay executing a function until after a certain amount of time has elapsed
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null
      func.apply(this, args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Check if device is low-end based on memory and cores
export function isLowEndDevice(): boolean {
  // Check for memory
  const memory = (navigator as any).deviceMemory
  if (memory && memory <= 4) {
    return true
  }

  // Check for CPU cores
  const cores = navigator.hardwareConcurrency
  if (cores && cores <= 4) {
    return true
  }

  // Check for mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  return isMobile
}

// Detect if the browser supports hardware acceleration
export function supportsHardwareAcceleration(): boolean {
  const canvas = document.createElement("canvas")
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

  return !!gl
}

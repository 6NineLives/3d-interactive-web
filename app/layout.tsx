import type React from "react"
import "@/app/globals.css"
import "@/app/scroll-animations.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export const metadata = {
  title: "Rise LLC - BPO, Software & AI, and Marketing Solutions",
  description: "Rise LLC provides innovative BPO, Software & AI, and Marketing solutions to transform your business.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/rise-logo.png" />
        <link
          rel="preload"
          href="https://unpkg.com/@splinetool/viewer@1.9.86/build/spline-viewer.js"
          as="script"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        {/* Add preconnect for external resources */}
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <>{children}</>
        </ThemeProvider>
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.9.86/build/spline-viewer.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { navigation } from "@/config/navigation"
import MobileBottomNav from "@/components/layout/mobile-bottom-nav"
import MobileHeader from "@/components/layout/mobile-header"
import DesktopSidebar from "@/components/layout/desktop-sidebar"
import SplashScreen from "@/components/splash-screen"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
// Import the AuthCheck component at the top:
import { AuthCheck } from "@/components/auth-check"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mounted, setMounted] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [appLoaded, setAppLoaded] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRoute, setCurrentRoute] = useState("")
  const isMobile = useMediaQuery("(max-width: 767px)")
  const router = useRouter()
  const pathname = usePathname()

  // Handle initial loading
  useEffect(() => {
    setMounted(true)

    // Simulate app loading
    const timer = setTimeout(() => {
      setAppLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Check if splash screen has been shown before
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash")
    if (hasSeenSplash) {
      setShowSplash(false)
    } else {
      // Only set this after the first load
      if (appLoaded) {
        localStorage.setItem("hasSeenSplash", "true")
      }
    }
  }, [appLoaded])

  // Update current route based on pathname
  useEffect(() => {
    if (pathname) {
      setCurrentRoute(pathname.replace("/", ""))
    }
  }, [pathname])

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false)
    }
  }, [currentRoute, isMobile])

  // Don't render anything during SSR
  if (!mounted) return null

  if (showSplash) {
    return <SplashScreen finishedLoading={appLoaded} onComplete={() => setShowSplash(false)} />
  }

  // Wrap the return statement with AuthCheck:
  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-gradient-to-b from-background to-background/90">
        {/* Desktop Sidebar - Only visible on md and up */}
        <DesktopSidebar
          navigation={navigation}
          currentRoute={currentRoute}
          onNavigate={(route) => router.push(`/${route}`)}
        />

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex min-h-screen w-full flex-col">
          {/* Mobile Header */}
          {isMobile && <MobileHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}

          {/* Main Content */}
          <main
            className={cn(
              "flex-1 overflow-auto pb-20 md:pb-6",
              isMobile && "pt-16", // Add padding for mobile header
            )}
          >
            <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">{children}</div>
          </main>

          {/* Mobile Bottom Navigation */}
          {isMobile && <MobileBottomNav currentRoute={currentRoute} onNavigate={(route) => router.push(`/${route}`)} />}
        </div>
      </div>
    </AuthCheck>
  )
}


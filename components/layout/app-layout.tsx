"use client";

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { MobileNavBar } from "@/components/layout/mobile-nav-bar"
import DesktopSidebar from "@/components/layout/desktop-sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const pathname = usePathname()
  
  // Excluded routes that don't use the app layout
  const excludedRoutes = ['/login', '/register', '/reset-password']
  if (excludedRoutes.includes(pathname)) {
    return <>{children}</>
  }

  return (
    <div className="app-layout">
      {/* Desktop sidebar - only visible on large screens */}
      {isDesktop && (
        <DesktopSidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />
      )}
      
      {/* Main content area */}
      <main className={cn(
        "main-content transition-all duration-300 min-h-screen",
        isDesktop && (isSidebarOpen ? "lg:pl-64" : "lg:pl-20")
      )}>
        {children}
      </main>
      
      {/* Mobile navigation - only visible on small screens */}
      {!isDesktop && <MobileNavBar />}
    </div>
  )
}


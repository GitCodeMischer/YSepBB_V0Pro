"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  // Try to get the initial state from localStorage, default to false (expanded)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Effect to set the mounted state and load from localStorage
  useEffect(() => {
    setIsMounted(true)
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState !== null) {
      setIsCollapsed(savedState === "true")
    }
  }, [])

  // Effect to save state to localStorage when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("sidebar-collapsed", String(isCollapsed))
      
      // Add appropriate classes to the main element for layout adjustments
      const mainElement = document.querySelector('main')
      if (mainElement) {
        if (isCollapsed) {
          mainElement.classList.remove('md:pl-64')
          mainElement.classList.add('md:pl-20')
        } else {
          mainElement.classList.remove('md:pl-20')
          mainElement.classList.add('md:pl-64')
        }
        
        // Force reflow to recalculate scrollbars
        mainElement.classList.remove('only-scroll-when-needed')
        void mainElement.offsetHeight // Force reflow
        mainElement.classList.add('only-scroll-when-needed')
      }
    }
  }, [isCollapsed, isMounted])

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev)
  }

  const value = {
    isCollapsed,
    setIsCollapsed,
    toggleSidebar
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
} 
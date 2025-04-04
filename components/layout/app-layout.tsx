"use client";

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname() || ""
  const [isMounted, setIsMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* The layout elements (sidebar, nav) are handled in the root layout */}
      {/* This component just renders the children directly */}
      {children}
    </>
  )
}


"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeInitializer() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Force dark mode on initial load
    setTheme("dark")
  }, [setTheme])

  return null
}


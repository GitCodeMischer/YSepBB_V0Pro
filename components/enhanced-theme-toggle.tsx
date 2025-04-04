"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon, SunMoon } from "lucide-react"

interface EnhancedThemeToggleProps {
  variant?: "default" | "minimal" | "icon"
  className?: string
}

export function EnhancedThemeToggle({ variant = "default", className = "" }: EnhancedThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return variant === "icon" ? (
      <div className={`h-9 w-9 rounded-full bg-secondary/50 ${className}`} />
    ) : (
      <div className={`h-9 w-16 rounded-full bg-secondary/50 ${className}`} />
    )
  }

  const isDark = theme === "dark"

  if (variant === "icon") {
    return (
      <button
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary/30 transition-all duration-300 hover:bg-secondary/50 ${className}`}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 45 : 0, opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="h-4 w-4 text-primary" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : -45, opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="h-4 w-4 text-primary" />
        </motion.div>
      </button>
    )
  }

  if (variant === "minimal") {
    return (
      <button
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={`group relative flex h-9 items-center gap-2 rounded-full bg-secondary/30 px-3 text-sm font-medium transition-all duration-300 hover:bg-secondary/50 ${className}`}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        <SunMoon className="h-4 w-4 text-primary" />
        <span>{isDark ? "Dark" : "Light"}</span>
      </button>
    )
  }

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative h-9 w-16 overflow-hidden rounded-full bg-secondary/30 p-1 transition-colors duration-300 ${className}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? "rgba(20, 184, 116, 0.2)" : "rgba(200, 230, 20, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 flex h-full w-full items-center justify-between px-1.5 text-xs font-medium">
        <span className={`transition-opacity ${isDark ? "opacity-40" : "opacity-100"}`}>
          <Sun className="h-3.5 w-3.5" />
        </span>
        <span className={`transition-opacity ${isDark ? "opacity-100" : "opacity-40"}`}>
          <Moon className="h-3.5 w-3.5" />
        </span>
      </div>

      <motion.div
        className="absolute top-1 z-0 h-7 w-7 rounded-full bg-primary/20 backdrop-blur-sm"
        animate={{
          x: isDark ? 8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      <motion.div
        className="absolute top-1.5 z-0 h-6 w-6 rounded-full bg-white shadow-md dark:bg-gray-800"
        animate={{
          x: isDark ? 8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  )
}


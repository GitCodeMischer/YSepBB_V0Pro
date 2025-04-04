"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-9 w-16 rounded-full bg-secondary p-1">
        <div className="h-7 w-7 rounded-full bg-muted"></div>
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative h-9 w-16 rounded-full bg-secondary p-1 transition-colors duration-300"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? "rgba(20, 184, 116, 0.2)" : "rgba(200, 230, 20, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-800"
        animate={{
          x: isDark ? 28 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-primary" />}
      </motion.div>

      <span className="sr-only">{isDark ? "Dark" : "Light"} Mode</span>
    </button>
  )
}


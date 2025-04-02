"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      className={`h-10 w-10 rounded-full flex items-center justify-center ${
        theme === 'dark' 
          ? 'bg-secondary text-primary hover:bg-secondary/80' 
          : 'bg-primary/10 text-primary hover:bg-primary/20'
      }`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      
      {/* Small shine effect on hover */}
      <motion.div 
        className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(211,174,86,0.15)'} 0%, transparent 70%)` 
        }}
        whileHover={{ opacity: 1 }}
      />
    </motion.button>
  )
}


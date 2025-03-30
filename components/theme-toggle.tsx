"use client"

import { useState, useRef, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [longPressActive, setLongPressActive] = useState(false)
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle long press
  const handleMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      setLongPressActive(true)
      setShowThemeSelector(true)
    }, 500) // 500ms for long press
  }

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }

    if (!longPressActive) {
      // Quick toggle between dark and light
      setTheme(theme === "dark" ? "light" : "dark")
    }

    setLongPressActive(false)
  }

  // Close theme selector when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowThemeSelector(false)
    }

    if (showThemeSelector) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [showThemeSelector])

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
    }
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full bg-muted/50 hover:bg-muted">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-muted/50 hover:bg-muted"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onMouseLeave={() => {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
            longPressTimer.current = null
          }
          setLongPressActive(false)
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>

      <AnimatePresence>
        {showThemeSelector && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 flex w-28 flex-col overflow-hidden rounded-xl border border-border bg-card p-1 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                theme === "light"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
              onClick={() => {
                setTheme("light")
                setShowThemeSelector(false)
              }}
            >
              <Sun className="h-4 w-4" />
              Light
            </button>
            <button
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                theme === "dark"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
              onClick={() => {
                setTheme("dark")
                setShowThemeSelector(false)
              }}
            >
              <Moon className="h-4 w-4" />
              Dark
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


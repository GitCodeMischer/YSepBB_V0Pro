"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowRight, Clock, Wallet, CreditCard, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when popup opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const recentSearches = ["Investment strategies", "Retirement planning", "Budget analysis"]

  const quickLinks = [
    { icon: Wallet, text: "Add new account", color: "bg-blue-500/20 text-blue-400" },
    { icon: CreditCard, text: "Connect bank", color: "bg-purple-500/20 text-purple-400" },
    { icon: TrendingUp, text: "View forecast", color: "bg-[#0f6]/20 text-[#0f6]" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search popup */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-20 z-50 w-full max-w-2xl -translate-x-1/2 rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for anything..."
                className="flex-1 bg-transparent text-base text-white outline-none placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-white/10 p-0 text-white hover:bg-white/20"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="mt-6">
              {/* Recent searches */}
              <div className="mb-6">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4" /> Recent Searches
                </h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <motion.div
                      key={search}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 hover:bg-white/5"
                    >
                      <span className="text-sm text-white">{search}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Quick Links</h3>
                <div className="grid grid-cols-3 gap-3">
                  {quickLinks.map((link, index) => (
                    <motion.div
                      key={link.text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.2 }}
                      className="group flex cursor-pointer flex-col items-center rounded-xl bg-white/5 p-4 text-center transition-colors hover:bg-white/10"
                    >
                      <div className={`mb-2 rounded-full ${link.color} p-3`}>
                        <link.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm text-white">{link.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              Press <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white">ESC</kbd> to
              close
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


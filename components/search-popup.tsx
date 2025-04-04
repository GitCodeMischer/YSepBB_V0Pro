"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock, ArrowRight, Sparkles, BarChart, CreditCard, Wallet, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches] = useState([
    "Monthly budget analysis",
    "Recent transactions",
    "Investment performance",
    "Savings goals progress",
  ])
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when popup opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle escape key to close popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const quickLinks = [
    {
      icon: <PieChart className="h-4 w-4" />,
      title: "Dashboard Overview",
      description: "View your financial summary",
      path: "/finance-tracker-dashboard",
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      title: "Recent Transactions",
      description: "Check your latest spending",
      path: "/finance-tracker-transactions-all",
    },
    {
      icon: <Wallet className="h-4 w-4" />,
      title: "Account Balances",
      description: "See all your accounts in one place",
      path: "/finance-tracker-portfolio-accounts",
    },
    {
      icon: <BarChart className="h-4 w-4" />,
      title: "Budget Analysis",
      description: "Track your budget performance",
      path: "/finance-tracker-statistics-ai-optimization",
    },
    {
      icon: <Sparkles className="h-4 w-4" />,
      title: "AI Insights",
      description: "Get personalized financial advice",
      path: "/finance-tracker-statistics-ai-optimization",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden pt-[15vh] sm:pt-[20vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-border/50 bg-background shadow-lg"
          >
            <div className="flex items-center border-b border-border/50 p-4">
              <Search className="mr-2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search for anything..."
                className="flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="ghost" size="icon" className="ml-2 h-7 w-7 rounded-full" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {searchQuery ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Showing results for <span className="font-medium text-foreground">{searchQuery}</span>
                  </p>

                  <div className="rounded-lg border border-border/50 bg-secondary/10 p-8 text-center">
                    <Sparkles className="mx-auto h-8 w-8 text-primary opacity-80" />
                    <h3 className="mt-3 text-lg font-medium">No exact matches found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting your search or use the quick links below
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Recent Searches */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Recent Searches</h3>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary/50"
                          onClick={() => setSearchQuery(search)}
                        >
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Quick Links</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {quickLinks.map((link, index) => (
                        <button
                          key={index}
                          className={cn(
                            "group flex items-start gap-3 rounded-lg border border-border/50 p-3 text-left transition-all duration-200",
                            "hover:border-primary/30 hover:bg-secondary/20 hover:shadow-md",
                          )}
                          onClick={onClose}
                        >
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-secondary/50 text-primary group-hover:bg-primary/10">
                            {link.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{link.title}</h4>
                            <p className="text-xs text-muted-foreground">{link.description}</p>
                          </div>
                          <ArrowRight className="mt-1 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border/50 bg-secondary/10 p-3 text-center text-xs text-muted-foreground">
              Press{" "}
              <kbd className="rounded border border-border/50 bg-secondary/50 px-1.5 py-0.5 font-mono text-xs">ESC</kbd>{" "}
              to close
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


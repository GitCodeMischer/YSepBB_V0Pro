"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Bell, Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function FixedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Check if we're on the login or signup page
  const isAuthPage = pathname?.includes("/auth/")

  // Handle scroll event to change navigation appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't show on auth pages
  if (isAuthPage) return null

  return (
    <>
      <div
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "bg-black/80 backdrop-blur-lg shadow-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00f56e] to-[#00f56e]/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <div className="absolute -inset-0.5 rounded-lg bg-[#00f56e]/20 blur-sm"></div>
            </div>
            <span className="text-lg font-bold">FinTrack</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <nav className="flex items-center space-x-4">
              <Link
                href="/finance-tracker-dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#00f56e]",
                  pathname === "/finance-tracker-dashboard" ? "text-[#00f56e]" : "text-white",
                )}
              >
                Dashboard
              </Link>
              <Link
                href="/finance-tracker-transactions-all"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#00f56e]",
                  pathname === "/finance-tracker-transactions-all" ? "text-[#00f56e]" : "text-white",
                )}
              >
                Transactions
              </Link>
              <Link
                href="/finance-tracker-portfolio-accounts"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#00f56e]",
                  pathname === "/finance-tracker-portfolio-accounts" ? "text-[#00f56e]" : "text-white",
                )}
              >
                Portfolio
              </Link>
              <Link
                href="/finance-tracker-statistics-ai-optimization"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#00f56e]",
                  pathname === "/finance-tracker-statistics-ai-optimization" ? "text-[#00f56e]" : "text-white",
                )}
              >
                AI Insights
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ThemeToggle />
            <Avatar className="h-8 w-8 border border-white/10">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback className="bg-black/40 text-white">JD</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/10 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00f56e] to-[#00f56e]/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
              </div>
              <span className="text-lg font-bold">FinTrack</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="mt-8 px-4">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/finance-tracker-dashboard"
                  className="flex items-center py-2 text-lg font-medium text-white hover:text-[#00f56e]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/finance-tracker-transactions-all"
                  className="flex items-center py-2 text-lg font-medium text-white hover:text-[#00f56e]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Transactions
                </Link>
              </li>
              <li>
                <Link
                  href="/finance-tracker-portfolio-accounts"
                  className="flex items-center py-2 text-lg font-medium text-white hover:text-[#00f56e]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/finance-tracker-statistics-ai-optimization"
                  className="flex items-center py-2 text-lg font-medium text-white hover:text-[#00f56e]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AI Insights
                </Link>
              </li>
              <li className="pt-4">
                <div className="flex items-center gap-2 py-2">
                  <span className="text-lg font-medium text-white">Theme</span>
                  <ThemeToggle />
                </div>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </>
  )
}


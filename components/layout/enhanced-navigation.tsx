"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Bell,
  Menu,
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Wallet,
  CreditCard,
  BarChart2,
  PieChart,
  CircleDollarSign,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import SearchPopup from "@/components/search-popup"
import { EnhancedThemeToggle } from "@/components/enhanced-theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ThemeToggle } from "@/components/theme-toggle"

interface EnhancedNavigationProps {
  className?: string
}

export function EnhancedNavigation({ className }: EnhancedNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [currentYear] = useState(() => new Date().getFullYear())
  const [mounted, setMounted] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { theme } = useTheme()
  const isMobile = useMediaQuery("(max-width: 767px)")
  
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

  // Set mounted state after component mounts for SSR safety
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Don't show on auth pages
  if (isAuthPage) return null

  const navItems = [
    { name: "Dashboard", href: "/finance-tracker-dashboard", icon: <PieChart className="h-4 w-4" /> },
    { name: "Transactions", href: "/finance-tracker-transactions-all", icon: <CreditCard className="h-4 w-4" /> },
    { name: "Portfolio", href: "/finance-tracker-portfolio-accounts", icon: <Wallet className="h-4 w-4" /> },
    { name: "Statistics", href: "/finance-tracker-statistics-budget-plan-stats", icon: <BarChart2 className="h-4 w-4" /> },
  ]

  const notifications = [
    {
      id: 1,
      title: "New transaction",
      message: "You received $250 from John Doe",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Budget alert",
      message: "You're close to your dining budget limit",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Account update",
      message: "Your account details have been updated",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      title: "New feature",
      message: "Check out our new AI-powered insights",
      time: "3 days ago",
      unread: false,
    },
  ]

  // User profile data (normally would come from authentication context)
  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Premium User",
    avatar: "/assets/avatar.png" // Would be a real avatar path
  }

  return (
    <>
      <div
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-300",
          isScrolled ? "nav-header-connection" : "bg-transparent border-transparent",
          className
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 md:w-16">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 md:hidden">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={theme === "dark" ? "black" : "white"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <div className="absolute -inset-0.5 rounded-lg bg-primary/20 blur-sm"></div>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">YSepBB</span>
            </div>

            {/* Desktop logo - position absolute to center it with the sidebar */}
            <div className="hidden md:flex items-center desktop-logo-position">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={theme === "dark" ? "black" : "white"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <div className="absolute -inset-0.5 rounded-lg bg-primary/20 blur-sm"></div>
              </div>
              <span className="text-lg font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">YSepBB</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            <nav className="no-scrollbar flex items-center overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative mx-1 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300",
                    pathname === item.href ? "neon-green" : "text-foreground hover:bg-foreground/5 hover:text-primary",
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 -z-10 rounded-full border border-primary/30 bg-primary/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="glass-button glass-hover-glow"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen)
                  setIsProfileOpen(false)
                }}
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    ref={notificationsRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    className="glass-dropdown absolute right-0 mt-2 w-80 overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4">
                      <h3 className="font-semibold">Notifications</h3>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Mark all as read
                      </Button>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto p-0">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "border-t border-border/20 p-3 last:border-b hover:bg-foreground/5 transition-colors cursor-pointer",
                            notification.unread ? "border-l-2 border-l-primary pl-2" : ""
                          )}
                        >
                          <div className="mb-0.5 flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border/20 p-3 text-center">
                      <Button variant="ghost" size="sm" className="text-sm text-primary">
                        View all notifications
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="glass-button glass-hover-glow"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Desktop Theme Toggle */}
            <div className="hidden md:block">
              <EnhancedThemeToggle variant="icon" className="glass-button glass-hover-glow" />
            </div>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full gap-2 glass-button glass-hover pl-2 pr-3">
                  <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium truncate max-w-[100px]">
                    {userProfile.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-dropdown" align="end" sideOffset={8}>
                <div className="flex flex-col p-3 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">{userProfile.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{userProfile.role}</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Wallet className="h-4 w-4" />
                    <span>My Accounts</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help Center</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-500 dark:text-red-400">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden glass-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="glass-dropdown-mobile overflow-hidden md:hidden"
          >
            <div className="flex flex-col px-4 pb-4 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-foreground/5",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 border-t border-border/50 pt-4">
                <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">Account</p>
                <Link
                  href="/profile"
                  className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-foreground/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link
                  href="/settings"
                  className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-foreground/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
                <Link
                  href="/help"
                  className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-foreground/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HelpCircle className="h-4 w-4" /> Help
                </Link>
                <Button
                  variant="ghost"
                  className="mt-1 flex w-full items-center justify-start gap-2 px-3 py-2 text-base font-medium text-red-500 hover:bg-red-500/10 hover:text-red-600"
                  onClick={() => {
                    console.log("Logout clicked")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Popup */}
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Copyright Notice - Added at the end */}
      {mounted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 py-2 text-center pointer-events-none">
          <span className="text-xs text-muted-foreground/50 bg-background/30 backdrop-blur-sm px-2 py-1 rounded-full">
            © {currentYear} Comtreak Labs
          </span>
        </div>
      )}
    </>
  )
}


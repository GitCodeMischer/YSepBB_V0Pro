"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, LogOut, Wallet, Users, Building, ChevronUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { NavItem, NavSection } from "@/config/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  BarChart3,
  CreditCard,
  Settings,
  PieChart,
  Receipt,
  Calendar,
  Repeat,
  DollarSign,
  BarChart,
  Clock,
  FileText,
  Bitcoin,
} from "lucide-react"
import { EnhancedThemeToggle } from "@/components/enhanced-theme-toggle"

interface DesktopSidebarProps {
  navigation: (NavSection | NavItem)[]
  currentRoute: string
  onNavigate: (route: string) => void
}

export default function DesktopSidebar({ navigation, currentRoute, onNavigate }: DesktopSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [processedNavigation, setProcessedNavigation] = useState<(NavSection | NavItem)[]>([])
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false)

  // Process navigation to remove duplicates
  useEffect(() => {
    const uniqueTitles = new Set<string>()
    const uniqueHeadings = new Set<string>()

    const uniqueNavigation = navigation.filter((item) => {
      if ("heading" in item) {
        if (uniqueHeadings.has(item.heading)) {
          return false
        }
        uniqueHeadings.add(item.heading)
        return true
      }

      if (uniqueTitles.has(item.title)) {
        return false
      }
      uniqueTitles.add(item.title)
      return true
    })

    setProcessedNavigation(uniqueNavigation)

    // Auto-expand the section containing the current route
    const newExpandedSections: Record<string, boolean> = {}
    uniqueNavigation.forEach((item) => {
      if (!("heading" in item) && item.children) {
        const hasActiveChild = item.children.some((child) => child.to === currentRoute)
        if (hasActiveChild) {
          newExpandedSections[item.title] = true
        }
      }
    })

    setExpandedSections((prev) => ({ ...prev, ...newExpandedSections }))
  }, [navigation, currentRoute])

  // Map icon names to components
  const getIcon = (iconName?: string) => {
    if (!iconName) return <Home className="h-5 w-5" />

    switch (iconName) {
      case "tabler-home":
        return <Home className="h-5 w-5" />
      case "tabler-view-360":
        return <PieChart className="h-5 w-5" />
      case "tabler-transaction-dollar":
        return <Receipt className="h-5 w-5" />
      case "tabler-wallet":
        return <Wallet className="h-5 w-5" />
      case "tabler-cash":
        return <DollarSign className="h-5 w-5" />
      case "tabler-businessplan":
        return <Calendar className="h-5 w-5" />
      case "tabler-chart-arcs":
        return <BarChart3 className="h-5 w-5" />
      case "tabler-building-bank":
        return <Building className="h-5 w-5" />
      case "tabler-receipt":
        return <Receipt className="h-5 w-5" />
      case "tabler-align-box-top-center-filled":
        return <BarChart className="h-5 w-5" />
      case "tabler-category-2":
        return <PieChart className="h-5 w-5" />
      case "tabler-database-dollar":
        return <DollarSign className="h-5 w-5" />
      case "tabler-repeat":
        return <Repeat className="h-5 w-5" />
      case "tabler-color-swatch":
        return <CreditCard className="h-5 w-5" />
      case "tabler-stack-back":
        return <BarChart className="h-5 w-5" />
      case "tabler-currency-bitcoin":
        return <Bitcoin className="h-5 w-5" />
      case "tabler-chevrons-down-right":
      case "tabler-chevrons-up-right":
        return <DollarSign className="h-5 w-5" />
      case "tabler-calendar-clock":
        return <Clock className="h-5 w-5" />
      case "tabler-time-duration-30":
        return <Clock className="h-5 w-5" />
      case "tabler-device-watch-stats-2":
      case "tabler-file-report":
        return <FileText className="h-5 w-5" />
      case "tabler-brand-openai":
        return <Settings className="h-5 w-5" />
      default:
        return <Home className="h-5 w-5" />
    }
  }

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isItemActive = (item: NavItem): boolean => {
    if (item.to === currentRoute) return true
    if (item.children) {
      return item.children.some((child) => isItemActive(child))
    }
    return false
  }

  return (
    <div className="hidden w-64 flex-shrink-0 md:flex md:flex-col">
      <div className="flex h-full flex-col bg-gradient-to-b from-background via-background to-background/95 backdrop-blur-md border-r border-border/30">
        {/* Sidebar Header */}
        <div className="flex h-16 items-center border-b border-border/30 px-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
              <Wallet className="h-5 w-5 text-primary-foreground" />
              <div className="absolute -inset-0.5 rounded-xl bg-primary/20 blur-sm"></div>
            </div>
            <h1 className="text-xl font-bold">YSepBB</h1>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="no-scrollbar flex-1 overflow-auto py-4">
          {processedNavigation.map((item, index) => {
            // Handle section headings
            if ("heading" in item) {
              return (
                <div key={`heading-${index}`} className="px-4 py-2">
                  <h2 className="text-xs font-semibold uppercase text-muted-foreground">{item.heading}</h2>
                </div>
              )
            }

            const navItem = item as NavItem
            const isActive = isItemActive(navItem)
            const hasChildren = navItem.children && navItem.children.length > 0
            const isExpanded = expandedSections[navItem.title] || isActive

            return (
              <div key={navItem.title} className="mb-1">
                <button
                  className={cn(
                    "relative flex w-full items-center justify-between px-4 py-2 text-sm glass-hover",
                    isActive ? "text-primary" : "text-foreground hover:bg-foreground/5 hover:text-foreground",
                  )}
                  onClick={() => {
                    if (hasChildren) {
                      toggleSection(navItem.title)
                    } else if (navItem.to) {
                      onNavigate(navItem.to)
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    {navItem.icon ? getIcon(navItem.icon.icon) : <div className="h-5 w-5" />}
                    <span>{navItem.title}</span>
                  </div>

                  {hasChildren && (
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                  )}

                  {isActive && !hasChildren && (
                    <motion.div
                      layoutId="sidebar-highlight"
                      className="absolute inset-0 -z-10 rounded-md bg-foreground/5 backdrop-blur-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                    />
                  )}
                </button>

                {/* Render children if expanded */}
                {hasChildren && isExpanded && (
                  <div className="ml-4 mt-1 border-l border-border/30 pl-4">
                    {navItem.children?.map((child) => {
                      const isChildActive = child.to === currentRoute

                      return (
                        <button
                          key={child.title}
                          className={cn(
                            "relative flex w-full items-center gap-3 px-4 py-2 text-sm glass-hover",
                            isChildActive
                              ? "text-primary"
                              : "text-foreground hover:bg-foreground/5 hover:text-foreground",
                          )}
                          onClick={() => child.to && onNavigate(child.to)}
                        >
                          {child.icon ? getIcon(child.icon.icon) : <div className="h-4 w-4" />}
                          <span>{child.title}</span>

                          {isChildActive && (
                            <motion.div
                              layoutId="sidebar-highlight-child"
                              className="absolute inset-0 -z-10 rounded-md bg-foreground/5 backdrop-blur-sm"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Sidebar Bottom Bar */}
        <div className="border-t border-border/30 p-3 space-y-3">
          {/* Stats Section */}
          <div className="relative">
            <button
              className="flex w-full items-center justify-between rounded-lg border border-border/30 bg-secondary/10 p-2 text-sm transition-colors hover:bg-secondary/20"
              onClick={() => setIsStatsOpen(!isStatsOpen)}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span>App Statistics</span>
              </div>
              <ChevronUp className={`h-4 w-4 transition-transform ${isStatsOpen ? "" : "rotate-180"}`} />
            </button>

            <AnimatePresence>
              {isStatsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-2 rounded-lg border border-border/30 bg-secondary/10 p-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        Active Users
                      </span>
                      <span>1,245</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Building className="h-3 w-3" />
                        Server
                      </span>
                      <span>US-East</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Version
                      </span>
                      <span>2.5.0</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <EnhancedThemeToggle />

            {/* Account Switcher */}
            <div className="relative">
              <button
                className="flex items-center gap-1 rounded-full bg-secondary/20 p-1 transition-colors hover:bg-secondary/30"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
              >
                <Avatar className="h-7 w-7 border border-border/30">
                  <AvatarImage src="/placeholder.svg?height=28&width=28" alt="User" />
                  <AvatarFallback className="bg-foreground/5 text-foreground text-xs">JD</AvatarFallback>
                </Avatar>
                <ChevronDown className={`h-3 w-3 transition-transform ${isAccountOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isAccountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    className="absolute bottom-full right-0 mb-2 w-48 rounded-lg border border-border/30 bg-background p-1 shadow-lg"
                  >
                    <div className="p-2 border-b border-border/30">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-border/30">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                          <AvatarFallback className="bg-foreground/5 text-foreground text-xs">JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-xs text-muted-foreground">john@example.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 p-1">
                      <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary/20">
                        <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                        <span>Work Account</span>
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary/20">
                        <span className="h-3 w-3 rounded-full bg-purple-500"></span>
                        <span>Team Account</span>
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary/20">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        <span>Add Account</span>
                      </button>
                    </div>

                    <div className="border-t border-border/30 p-1">
                      <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-destructive transition-colors hover:bg-secondary/20">
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/10 p-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Personal Account</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-secondary/30"
              onClick={() => {
                // In a real app, you would call your auth service logout method here
                window.location.href = "/auth/login"
              }}
            >
              <LogOut className="h-3 w-3" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


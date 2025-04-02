"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, LogOut, Wallet } from "lucide-react"
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
  Building,
  DollarSign,
  BarChart,
  Clock,
  FileText,
  Bitcoin,
} from "lucide-react"

interface DesktopSidebarProps {
  navigation: (NavSection | NavItem)[]
  currentRoute: string
  onNavigate: (route: string) => void
}

export default function DesktopSidebar({ navigation, currentRoute, onNavigate }: DesktopSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

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
    <div className="hidden w-64 flex-shrink-0 border-r border-border bg-sidebar md:flex md:flex-col">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-green to-accent-green/80">
            <Wallet className="h-5 w-5 text-accent-green-foreground" />
            <div className="absolute -inset-0.5 rounded-xl bg-accent-green/20 blur-sm"></div>
          </div>
          <h1 className="text-xl font-bold">YSepBB</h1>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-auto py-4">
        {navigation.map((item, index) => {
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
                  "relative flex w-full items-center justify-between px-4 py-2 text-sm",
                  isActive
                    ? "text-accent-green"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
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
                    className="absolute inset-0 -z-10 rounded-md bg-sidebar-accent/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                  />
                )}
              </button>

              {/* Render children if expanded */}
              {hasChildren && isExpanded && (
                <div className="ml-4 mt-1 border-l border-sidebar-border pl-4">
                  {navItem.children?.map((child) => {
                    const isChildActive = child.to === currentRoute

                    return (
                      <button
                        key={child.title}
                        className={cn(
                          "relative flex w-full items-center gap-3 px-4 py-2 text-sm",
                          isChildActive
                            ? "text-accent-green"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                        onClick={() => child.to && onNavigate(child.to)}
                      >
                        {child.icon ? getIcon(child.icon.icon) : <div className="h-4 w-4" />}
                        <span>{child.title}</span>

                        {isChildActive && (
                          <motion.div
                            layoutId="sidebar-highlight-child"
                            className="absolute inset-0 -z-10 rounded-md bg-sidebar-accent/50"
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

      {/* Sidebar Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback className="bg-muted">JD</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-muted/50 hover:bg-muted"
            onClick={() => {
              // In a real app, you would call your auth service logout method here
              // For now, we'll just redirect to the login page
              window.location.href = "/auth/login"
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getMainNavItems, type NavItem } from "@/config/navigation"
import { cn } from "@/lib/utils"
import { Home, BarChart3, Wallet, CreditCard, PieChart, Receipt, Calendar, LogOut } from "lucide-react"

interface MobileBottomNavProps {
  currentRoute: string
  onNavigate: (route: string) => void
}

export default function MobileBottomNav({ currentRoute, onNavigate }: MobileBottomNavProps) {
  const [navItems, setNavItems] = useState<NavItem[]>([])

  const handleLogout = () => {
    // In a real app, you would call your auth service logout method here
    // For now, we'll just redirect to the login page
    window.location.href = "/auth/login"
  }

  useEffect(() => {
    setNavItems(getMainNavItems())
  }, [])

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
        return <CreditCard className="h-5 w-5" />
      case "tabler-businessplan":
        return <Calendar className="h-5 w-5" />
      case "tabler-chart-arcs":
        return <BarChart3 className="h-5 w-5" />
      default:
        return <Home className="h-5 w-5" />
    }
  }

  // Get display name for nav item
  const getDisplayName = (item: NavItem) => {
    // Shorten names for mobile
    switch (item.title) {
      case "Dashboard":
        return "Home"
      case "Schnellübersicht":
        return "Übersicht"
      case "Transaktionen":
        return "Trans."
      case "Planung & Abos":
        return "Planung"
      case "Statistiken":
        return "Stats"
      default:
        return item.title
    }
  }

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full border-t border-border bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = currentRoute === item.to

          return (
            <button
              key={item.to}
              className={cn(
                "flex flex-col items-center justify-center",
                isActive ? "text-accent-green" : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => item.to && onNavigate(item.to)}
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-bubble"
                    className="absolute -inset-1 -top-2 z-0 rounded-full bg-accent-green/20"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                  />
                )}
                <div className="relative z-10">
                  {item.icon ? getIcon(item.icon.icon) : <Home className="h-5 w-5" />}
                </div>
              </div>
              <span className="mt-1 text-xs">{getDisplayName(item)}</span>
            </button>
          )
        })}
        <button
          className={cn("flex flex-col items-center justify-center", "text-muted-foreground hover:text-destructive")}
          onClick={handleLogout}
        >
          <div className="relative">
            <LogOut className="relative z-10 h-5 w-5" />
          </div>
          <span className="mt-1 text-xs">Logout</span>
        </button>
      </nav>
    </div>
  )
}


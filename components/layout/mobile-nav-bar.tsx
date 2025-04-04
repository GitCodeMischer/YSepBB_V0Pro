"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  PieChart, 
  CreditCard, 
  Wallet, 
  BarChart2,
  LayoutGrid,
  Plus,
  CircleDollarSign,
  Settings,
  Target,
  Calendar,
  TrendingUp,
  X,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedThemeToggle } from "@/components/enhanced-theme-toggle"

interface MobileNavBarProps {
  className?: string
}

export function MobileNavBar({ className }: MobileNavBarProps) {
  const pathname = usePathname()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  // User profile data (normally would come from authentication context)
  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Premium User",
    avatar: "/assets/avatar.png" // This would be a real avatar path
  }
  
  // Mobile navigation items (limited to 5 most important)
  const navItems = [
    { 
      name: "Dashboard", 
      href: "/finance-tracker-dashboard", 
      icon: <PieChart className="h-5 w-5" />,
      activePattern: "/finance-tracker-dashboard"
    },
    { 
      name: "Transactions", 
      href: "/finance-tracker-transactions-all", 
      icon: <CreditCard className="h-5 w-5" />,
      activePattern: "/finance-tracker-transactions"
    },
    { 
      name: "Add", 
      href: "/add-transaction", 
      icon: (
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Plus className="h-6 w-6" />
        </div>
      ),
      activePattern: "/add-transaction"
    },
    { 
      name: "Accounts", 
      href: "/finance-tracker-portfolio-accounts", 
      icon: <Wallet className="h-5 w-5" />,
      activePattern: "/finance-tracker-portfolio"
    },
    { 
      name: "More", 
      href: "#", 
      icon: <LayoutGrid className="h-5 w-5" />,
      action: () => setIsDrawerOpen(true)
    },
  ]

  // Additional items for the drawer
  const drawerItems = [
    { 
      name: "Cash Flow", 
      href: "/finance-tracker-cashflow-income", 
      icon: <CircleDollarSign className="h-6 w-6" />,
      activePattern: "/finance-tracker-cashflow"
    },
    { 
      name: "Planning", 
      href: "/finance-tracker-planning-and-subscriptions-budget-plan", 
      icon: <Target className="h-6 w-6" />,
      activePattern: "/finance-tracker-planning-and-subscriptions"
    },
    { 
      name: "Quick Overview", 
      href: "/finance-tracker-quick-overview-account-balances", 
      icon: <LayoutGrid className="h-6 w-6" />,
      activePattern: "/finance-tracker-quick-overview"
    },
    { 
      name: "Statistics", 
      href: "/finance-tracker-statistics-budget-plan-stats", 
      icon: <BarChart2 className="h-6 w-6" />,
      activePattern: "/finance-tracker-statistics"
    },
    { 
      name: "Settings", 
      href: "/settings", 
      icon: <Settings className="h-6 w-6" />,
      activePattern: "/settings"
    },
  ]

  return (
    <>
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border/20 bg-background/95 backdrop-blur-md",
        "mobile-nav-bar",
        className
      )}>
        <nav className="mx-auto flex h-full max-w-md items-center justify-around px-4">
          {navItems.map((item) => {
            const isActive = item.href !== "#" && (pathname === item.href || pathname?.startsWith(item.activePattern || ""))
            return (
              <div key={item.href || item.name} className="relative flex-1">
                {item.action ? (
                  <button
                    onClick={item.action}
                    className={cn(
                      "w-full flex flex-col items-center justify-center py-2",
                      "text-foreground/40 transition-colors",
                      isDrawerOpen ? "text-primary" : "hover:text-foreground"
                    )}
                  >
                    <span className="mb-1">{item.icon}</span>
                    <span className="text-xs font-medium">{item.name}</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "w-full flex flex-col items-center justify-center py-2",
                      "text-foreground/40 transition-colors",
                      isActive ? "text-primary" : "hover:text-foreground"
                    )}
                  >
                    {item.name === "Add" ? (
                      <div className="-mt-8">{item.icon}</div>
                    ) : (
                      <>
                        <span className="mb-1">{item.icon}</span>
                        <span className="text-xs font-medium">{item.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-navbar-indicator"
                            className="ios-nav-indicator"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </>
                    )}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* Mobile drawer for "More" menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 mt-16 bg-background/95 backdrop-blur-md"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border/20 p-4">
                <h2 className="text-lg font-semibold">More Options</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDrawerOpen(false)}
                  className="rounded-full hover:bg-foreground/5"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              
              {/* User Profile Section */}
              <div className="p-4 border-b border-border/20">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{userProfile.name}</p>
                    <p className="text-sm text-muted-foreground">{userProfile.role}</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                  {drawerItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.activePattern || "")
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-lg p-4 transition-colors",
                          "border border-border/20 hover:border-border/40",
                          isActive ? "bg-primary/10 text-primary" : "hover:bg-foreground/5"
                        )}
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        <span className="mb-2">{item.icon}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
                
                {/* Theme Toggle Section */}
                <div className="mt-6 p-4 rounded-lg border border-border/20">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Toggle Theme</span>
                    <EnhancedThemeToggle variant="icon" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Switch between light and dark mode
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 
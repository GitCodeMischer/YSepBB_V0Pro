"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  ChevronLeft, 
  ChevronRight,
  PieChart, 
  CreditCard, 
  Wallet, 
  BarChart2,
  Banknote,
  TrendingUp,
  Calendar,
  Receipt,
  Info,
  Server,
  ChevronDown,
  Globe,
  LineChart,
  DollarSign,
  CircleDollarSign,
  PiggyBank,
  Target,
  Settings
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSidebar } from "@/components/providers/sidebar-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavItemProps {
  name: string
  href: string
  icon: React.ReactNode
  children?: NavItemProps[]
}

interface CollapsibleSidebarProps {
  className?: string
}

export function CollapsibleSidebar({ className }: CollapsibleSidebarProps) {
  const { isCollapsed, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({})

  // Framer Motion variants
  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 80 }
  }

  const textVariants = {
    expanded: { opacity: 1, display: "block" },
    collapsed: { opacity: 0, display: "none" }
  }

  const submenuVariants = {
    open: { 
      height: "auto", 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    closed: { 
      height: 0, 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" } 
    },
  }

  const toggleSubMenu = (href: string) => {
    if (isCollapsed) return
    setOpenSubMenus(prev => ({
      ...prev,
      [href]: !prev[href]
    }))
  }

  // Main navigation items with submenus
  const mainNavItems: NavItemProps[] = [
    { name: "Dashboard", href: "/finance-tracker-dashboard", icon: <PieChart className="h-5 w-5" /> },
    { 
      name: "Transactions", 
      href: "/finance-tracker-transactions", 
      icon: <CreditCard className="h-5 w-5" />,
      children: [
        { name: "All Transactions", href: "/finance-tracker-transactions-all", icon: <CreditCard className="h-4 w-4" /> },
        { name: "Loop Transactions", href: "/finance-tracker-transactions-loop-transactions", icon: <Calendar className="h-4 w-4" /> },
      ]
    },
    { 
      name: "Portfolio", 
      href: "/finance-tracker-portfolio", 
      icon: <Wallet className="h-5 w-5" />,
      children: [
        { name: "Accounts", href: "/finance-tracker-portfolio-accounts", icon: <CircleDollarSign className="h-4 w-4" /> },
        { name: "Crypto", href: "/finance-tracker-portfolio-crypto", icon: <PiggyBank className="h-4 w-4" /> },
        { name: "Stocks & Funds", href: "/finance-tracker-portfolio-stocks-and-funds", icon: <LineChart className="h-4 w-4" /> },
      ]
    },
    { 
      name: "Quick Overview", 
      href: "/finance-tracker-quick-overview", 
      icon: <BarChart2 className="h-5 w-5" />,
      children: [
        { name: "Account Balances", href: "/finance-tracker-quick-overview-account-balances", icon: <CircleDollarSign className="h-4 w-4" /> },
        { name: "Recent Transactions", href: "/finance-tracker-quick-overview-recent-transactions", icon: <CreditCard className="h-4 w-4" /> },
        { name: "Total Spending", href: "/finance-tracker-quick-overview-total-spending", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Spending by Category", href: "/finance-tracker-quick-overview-spending-by-category", icon: <PieChart className="h-4 w-4" /> },
        { name: "Budget Overview", href: "/finance-tracker-quick-overview-budget-overview", icon: <Target className="h-4 w-4" /> },
      ]
    },
  ]
  
  // Additional navigation items with submenus
  const additionalNavItems: NavItemProps[] = [
    { 
      name: "Cash Flow", 
      href: "/finance-tracker-cashflow", 
      icon: <Banknote className="h-5 w-5" />,
      children: [
        { name: "Income", href: "/finance-tracker-cashflow-income", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Expenses", href: "/finance-tracker-cashflow-expenses", icon: <TrendingUp className="h-4 w-4 rotate-180" /> },
      ]
    },
    { 
      name: "Planning & Subscriptions", 
      href: "/finance-tracker-planning-and-subscriptions", 
      icon: <Target className="h-5 w-5" />,
      children: [
        { name: "Budget Plan", href: "/finance-tracker-planning-and-subscriptions-budget-plan", icon: <Receipt className="h-4 w-4" /> },
        { name: "Subscriptions", href: "/finance-tracker-planning-and-subscriptions-subscriptions", icon: <Calendar className="h-4 w-4" /> },
        { name: "Planned Payments", href: "/finance-tracker-planning-and-subscriptions-planned-payments", icon: <Target className="h-4 w-4" /> },
      ]
    },
    { 
      name: "Statistics", 
      href: "/finance-tracker-statistics", 
      icon: <BarChart2 className="h-5 w-5" />,
      children: [
        { name: "Budget Plan Stats", href: "/finance-tracker-statistics-budget-plan-stats", icon: <BarChart2 className="h-4 w-4" /> },
        { name: "Subscriptions Stats", href: "/finance-tracker-statistics-subscriptions-stats", icon: <LineChart className="h-4 w-4" /> },
        { name: "Planned Payments Stats", href: "/finance-tracker-statistics-planned-payments-stats", icon: <PieChart className="h-4 w-4" /> },
        { name: "AI Optimization", href: "/finance-tracker-statistics-ai-optimization", icon: <Settings className="h-4 w-4" /> },
      ]
    },
    { name: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  // Available environments
  const environments = [
    { name: "Production", description: "Live environment", version: "2.1.0", date: "2023-06-12" },
    { name: "Staging", description: "Pre-production testing", version: "2.1.1-beta", date: "2023-06-15" },
    { name: "Development", description: "Internal testing", version: "2.2.0-dev", date: "2023-06-18" },
  ]

  // Current environment (would be fetched from an API/context in a real app)
  const currentEnv = environments[0]

  // Rendering functions
  const renderNavItem = (item: NavItemProps, index: number, sectionIndex: number = 0) => {
    const isActive = pathname === item.href || pathname?.startsWith(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isSubMenuOpen = openSubMenus[item.href] || false;
    const isItemOrChildActive = isActive || (hasChildren && item.children!.some(child => 
      pathname === child.href || pathname?.startsWith(child.href)
    ));
    
    return (
      <React.Fragment key={item.href}>
        <TooltipProvider disableHoverableContent delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => hasChildren ? toggleSubMenu(item.href) : undefined}
                className={cn(
                  "sidebar-nav-item",
                  isCollapsed ? "justify-center" : "justify-between",
                  isItemOrChildActive && "sidebar-nav-item-active"
                )}
                style={{ 
                  animationDelay: `${(index + sectionIndex * 5 + 1) * 40}ms`,
                  animationFillMode: 'backwards'
                }}
              >
                <div className={cn("flex items-center", isCollapsed ? "" : "gap-3")}>
                  <div className="relative" suppressHydrationWarning>
                    {isItemOrChildActive ? (
                      <span className="relative flex h-6 w-6 items-center justify-center rounded-md">
                        {item.icon}
                        <motion.div 
                          className="absolute inset-0 rounded-md bg-primary/20 -z-10 ring-1 ring-white/10"
                          layoutId={`sidebar-highlight-${sectionIndex}`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      </span>
                    ) : (
                      item.icon
                    )}
                  </div>
                  <motion.span 
                    variants={textVariants}
                    className="font-medium"
                  >
                    {item.name}
                  </motion.span>
                </div>
                
                {hasChildren && !isCollapsed && (
                  <motion.div
                    animate={{ rotate: isSubMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-1"
                  >
                    <ChevronDown className="h-4 w-4 text-white/50" />
                  </motion.div>
                )}
                
                {isItemOrChildActive && !isCollapsed && !hasChildren && (
                  <motion.div 
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                    layoutId={`sidebar-dot-${sectionIndex}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {hasChildren && isCollapsed && (
                  <Link href={item.href}>
                    <span className="sr-only">Go to {item.name}</span>
                  </Link>
                )}
              </button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="bg-primary/90 text-white border-primary/40 rounded-lg shadow-xl shadow-black/20">
                {item.name}
                {hasChildren && (
                  <div className="mt-1 text-xs text-white/70">Has submenu</div>
                )}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        {/* Submenu */}
        {hasChildren && !isCollapsed && (
          <AnimatePresence initial={false}>
            {isSubMenuOpen && (
              <motion.div
                key={`submenu-${item.href}`}
                initial="closed"
                animate="open"
                exit="closed"
                variants={submenuVariants}
                className="sidebar-submenu-container"
              >
                <div className="sidebar-submenu">
                  {item.children!.map((child, childIndex) => {
                    const isChildActive = pathname === child.href || pathname?.startsWith(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "sidebar-submenu-item",
                          isChildActive && "sidebar-submenu-item-active"
                        )}
                      >
                        <div className="relative">
                          {child.icon}
                          {isChildActive && (
                            <motion.div 
                              className="absolute inset-0 rounded-md bg-primary/10 -z-10"
                              layoutId={`sidebar-highlight-child-${sectionIndex}-${childIndex}`}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </div>
                        <span>
                          {child.name}
                        </span>
                        {isChildActive && (
                          <motion.div 
                            className="ml-auto h-1 w-1 rounded-full bg-primary"
                            layoutId={`sidebar-dot-child-${sectionIndex}-${childIndex}`}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </React.Fragment>
    );
  };

  return (
    <motion.aside
      className={cn(
        "sidebar-nav-connection",
        className
      )}
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-end p-3.5" suppressHydrationWarning>
        <button
          onClick={toggleSidebar}
          className="sidebar-toggle-btn"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto scrollbar-thin" suppressHydrationWarning>
        <nav className="px-2 space-y-6">
          <div className="space-y-1" suppressHydrationWarning>
            <div className={cn(
              "sidebar-section-heading",
              isCollapsed ? "text-center" : ""
            )} suppressHydrationWarning>
              <motion.p 
                variants={textVariants}
              >
                Main
              </motion.p>
            </div>
            {mainNavItems.map((item, index) => renderNavItem(item, index, 0))}
          </div>
          
          <div className="space-y-1" suppressHydrationWarning>
            <div className={cn(
              "sidebar-section-heading",
              isCollapsed ? "text-center" : ""
            )} suppressHydrationWarning>
              <motion.p 
                variants={textVariants}
              >
                Financial Planning
              </motion.p>
            </div>
            {additionalNavItems.map((item, index) => renderNavItem(item, index, 1))}
          </div>
        </nav>
      </div>
      
      {/* Version Display and Server Info */}
      <div className="p-3 border-t border-white/5 bg-white/3 backdrop-blur-lg" suppressHydrationWarning>
        {isCollapsed ? (
          <TooltipProvider disableHoverableContent>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-full flex justify-center py-2 text-xs text-white/60 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/5"
                >
                  <Globe className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" align="center" className="bg-primary/90 text-white border-primary/40 flex flex-col gap-1 rounded-lg shadow-xl shadow-black/20">
                <div className="font-semibold text-xs">{currentEnv.name}</div>
                <div className="text-xs">v{currentEnv.version}</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 backdrop-blur">
                <div className="flex items-center gap-2" suppressHydrationWarning>
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="font-medium text-white">v{currentEnv.version}</span>
                </div>
                <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4 bg-primary/20 text-white border-white/10">
                  {currentEnv.name}
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-56 bg-black/90 backdrop-blur-xl border border-white/10 text-white rounded-lg shadow-2xl">
              <div className="px-2 py-1.5 text-xs text-white/50 border-b border-white/10 mb-1">
                Environment
              </div>
              {environments.map((env) => (
                <DropdownMenuItem key={env.name} className="focus:bg-white/10 rounded-md px-2 py-1.5 cursor-pointer">
                  <div className="flex flex-col w-full" suppressHydrationWarning>
                    <div className="flex w-full items-center justify-between">
                      <span className="font-semibold text-sm">{env.name}</span>
                      <Badge variant="secondary" className="text-[10px] py-0 h-4 bg-primary/20 text-white border-white/10">
                        v{env.version}
                      </Badge>
                    </div>
                    <span className="text-xs text-white/50 mt-0.5">{env.description}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </motion.aside>
  )
} 
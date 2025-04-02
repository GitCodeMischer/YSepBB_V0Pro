"use client"

import { useState, useEffect } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import MobileNav from "@/components/mobile-nav"
import SearchPopup from "@/components/search-popup"
import FinancialSummary from "@/components/financial-summary"
import NetWorthChart from "@/components/net-worth-chart"
import AssetAllocation from "@/components/asset-allocation"
import AccountsTable from "@/components/accounts-table"
import ScenarioBuilder from "@/components/scenario-builder"
import SplashScreen from "@/components/splash-screen"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Bell,
  Search,
  User,
  Plus,
  LayoutDashboard,
  CreditCard,
  Target,
  TrendingUp,
  Settings,
  LogOut,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [showSplash, setShowSplash] = useState(true)
  const [appLoaded, setAppLoaded] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "accounts", label: "Accounts", icon: CreditCard },
    { id: "goals", label: "Goals", icon: Target },
    { id: "forecast", label: "Forecast", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Handle initial loading
  useEffect(() => {
    setMounted(true)

    // Simulate app loading
    const timer = setTimeout(() => {
      setAppLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Check if splash screen has been shown before
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash")
    if (hasSeenSplash) {
      setShowSplash(false)
    } else {
      // Only set this after the first load
      if (appLoaded) {
        localStorage.setItem("hasSeenSplash", "true")
      }
    }
  }, [appLoaded])

  // Don't render anything during SSR
  if (!mounted) return null

  if (showSplash) {
    return <SplashScreen finishedLoading={appLoaded} onComplete={() => setShowSplash(false)} />
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-background to-background/90">
        {/* Desktop Sidebar - Only visible on md and up */}
        <Sidebar collapsible="none" className="hidden md:flex">
          <SidebarHeader>
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-green to-accent-green/80">
                <Wallet className="h-5 w-5 text-accent-green-foreground" />
                <div className="absolute -inset-0.5 rounded-xl bg-accent-green/20 blur-sm"></div>
              </div>
              <h1 className="text-xl font-bold">YSepBB</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton isActive={activeTab === item.id} onClick={() => setActiveTab(item.id)}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
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
                <Button variant="ghost" size="icon" className="rounded-full bg-muted/50 hover:bg-muted">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex min-h-screen w-full flex-col">
          {/* Modern Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
            <div className="flex items-center gap-2 md:hidden">
              <div className="relative">
                <div className="absolute -left-1 -top-1 h-8 w-8 rounded-full bg-accent-green/30 blur-lg dark:bg-accent-green/20"></div>
                <h1 className="relative text-xl font-bold">YSepBB</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-muted/50 hover:bg-muted"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-muted/50 hover:bg-muted">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-muted">JD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto pb-20 md:pb-6">
            <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2 rounded-full">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Account</span>
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2 rounded-full bg-gradient-to-r from-accent-green to-accent-green/80 text-accent-green-foreground hover:from-accent-green/90 hover:to-accent-green/70"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Funds</span>
                  </Button>
                </div>
              </div>

              <div className="w-full">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-6 grid w-full grid-cols-4 rounded-full bg-muted/50 p-1 backdrop-blur">
                    <TabsTrigger value="overview" className="rounded-full">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="accounts" className="rounded-full">
                      Accounts
                    </TabsTrigger>
                    <TabsTrigger value="transactions" className="rounded-full">
                      Transactions
                    </TabsTrigger>
                    <TabsTrigger value="planning" className="rounded-full">
                      Planning
                    </TabsTrigger>
                  </TabsList>

                  <div className="responsive-tabs-container">
                    <TabsContent value="overview" className="w-full space-y-6">
                      <FinancialSummary />

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <NetWorthChart />
                        <AssetAllocation />
                      </div>

                      <AccountsTable />
                    </TabsContent>

                    <TabsContent value="accounts" className="w-full">
                      <AccountsTable />
                    </TabsContent>

                    <TabsContent value="transactions" className="w-full">
                      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-bold">Recent Transactions</h2>
                        <p className="text-muted-foreground">Transaction history will appear here.</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="planning" className="w-full">
                      <ScenarioBuilder />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </main>

          {/* Mobile Navigation - Only visible on mobile */}
          {isMobile && <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />}
        </div>

        {/* Search Popup */}
        <SearchPopup isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </SidebarProvider>
  )
}


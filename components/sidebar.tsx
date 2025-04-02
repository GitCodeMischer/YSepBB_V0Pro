"use client"

import {
  LayoutDashboard,
  CreditCard,
  Target,
  TrendingUp,
  Settings,
  PlusCircle,
  Wallet,
  BarChart3,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "accounts", label: "Accounts", icon: CreditCard },
    { id: "goals", label: "Goals", icon: Target },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "forecast", label: "Forecast", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f6] to-[#0f6]/80">
            <Wallet className="h-5 w-5 text-black" />
            <div className="absolute -inset-0.5 rounded-xl bg-[#0f6]/20 blur-sm"></div>
          </div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-white"
          >
            YSepBB
          </motion.h1>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {menuItems.map((item) => (
          <motion.div key={item.id} className="relative" layout>
            {activeTab === item.id && (
              <motion.div
                layoutId="sidebar-highlight"
                className="absolute inset-0 rounded-xl bg-white/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
              />
            )}
            <Button
              variant="ghost"
              className={cn(
                "relative z-10 w-full justify-start gap-3 rounded-xl px-3 py-2",
                activeTab === item.id ? "text-[#0f6] hover:bg-transparent" : "text-muted-foreground hover:text-white",
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className={cn("h-5 w-5", activeTab === item.id && "text-[#0f6]")} />
              <span>{item.label}</span>
            </Button>
          </motion.div>
        ))}
      </nav>

      <div className="mt-auto p-3">
        <Button className="w-full justify-start gap-2 rounded-xl bg-gradient-to-r from-[#0f6] to-[#0f6]/80 text-black hover:from-[#0f6]/90 hover:to-[#0f6]/70">
          <PlusCircle className="h-5 w-5" />
          <span>Add Account</span>
        </Button>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 border border-white/10">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback className="bg-white/5 text-white">JD</AvatarFallback>
            </Avatar>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="ml-3">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </motion.div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/5 text-white hover:bg-white/10"
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


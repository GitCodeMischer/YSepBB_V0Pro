"use client"

import { LayoutDashboard, CreditCard, Target, TrendingUp, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface MobileNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const menuItems = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "accounts", label: "Accounts", icon: CreditCard },
    { id: "goals", label: "Goals", icon: Target },
    { id: "forecast", label: "Forecast", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-border bg-background/80 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-center justify-center",
              activeTab === item.id ? "text-accent-green" : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="relative">
              {activeTab === item.id && (
                <motion.div
                  layoutId="bubble"
                  className="absolute -inset-1 -top-2 z-0 rounded-full bg-accent-green/20"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              )}
              <item.icon className="relative z-10 h-5 w-5" />
            </div>
            <span className="mt-1 text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}


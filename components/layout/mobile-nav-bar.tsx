"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Wallet, 
  Send, 
  BarChart2, 
  Video
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavBarProps {
  className?: string
}

export function MobileNavBar({ className }: MobileNavBarProps) {
  const pathname = usePathname()
  
  const navigation = [
    {
      name: "Home",
      href: "/finance-tracker-dashboard",
      icon: Home,
      active: pathname === "/finance-tracker-dashboard",
    },
    {
      name: "Wallet",
      href: "/finance-tracker-portfolio-accounts",
      icon: Wallet,
      active: pathname.includes("/finance-tracker-portfolio"),
    },
    {
      name: "Send Money",
      href: "/finance-tracker-transfer",
      icon: Send,
      active: pathname.includes("/finance-tracker-transfer"),
      primary: true,
    },
    {
      name: "Convert",
      href: "/finance-tracker-statistics-budget-plan-stats",
      icon: BarChart2,
      active: pathname.includes("/finance-tracker-statistics"),
    },
    {
      name: "Videos",
      href: "/finance-tracker-settings",
      icon: Video,
      active: pathname.includes("/finance-tracker-settings"),
    },
  ]

  return (
    <div className={cn("bottom-nav-bar", className)}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn("bottom-nav-item", item.primary && "relative")}
        >
          {item.primary ? (
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground absolute -top-6">
              <item.icon className="h-5 w-5" />
            </div>
          ) : (
            <item.icon className={cn("bottom-nav-icon", item.active && "active")} />
          )}
          <span className={cn("bottom-nav-label", item.active && "active")}>
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  )
} 
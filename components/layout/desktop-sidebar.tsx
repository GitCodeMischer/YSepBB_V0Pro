"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Wallet, 
  Send, 
  BarChart2, 
  Video,
  Users,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DesktopSidebarProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DesktopSidebar({ isOpen, setIsOpen }: DesktopSidebarProps) {
  const pathname = usePathname()
  
  const navigation = [
    {
      name: "Dashboard",
      href: "/finance-tracker-dashboard",
      icon: Home,
      active: pathname === "/finance-tracker-dashboard",
    },
    {
      name: "My Wallet",
      href: "/finance-tracker-portfolio-accounts",
      icon: Wallet,
      active: pathname.includes("/finance-tracker-portfolio"),
    },
    {
      name: "Transfer Money",
      href: "/finance-tracker-transfer",
      icon: Send,
      active: pathname.includes("/finance-tracker-transfer"),
      primary: true,
    },
    {
      name: "Analytics",
      href: "/finance-tracker-statistics-budget-plan-stats",
      icon: BarChart2,
      active: pathname.includes("/finance-tracker-statistics"),
    },
    {
      name: "Transactions",
      href: "/finance-tracker-transactions-all",
      icon: CreditCard,
      active: pathname.includes("/finance-tracker-transactions"),
    },
    {
      name: "Recipients",
      href: "/finance-tracker-recipients",
      icon: Users,
      active: pathname.includes("/finance-tracker-recipients"),
    },
    {
      name: "Learning",
      href: "/finance-tracker-settings",
      icon: Video,
      active: pathname.includes("/finance-tracker-learning"),
    },
    {
      name: "Settings",
      href: "/finance-tracker-settings",
      icon: Settings,
      active: pathname.includes("/finance-tracker-settings"),
    },
  ]

  return (
    <div className={cn(
      "desktop-sidebar",
      !isOpen && "collapsed"
    )}>
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mr-3">
            <span className="text-xs font-bold text-black">YB</span>
          </div>
          {isOpen && <span className="font-semibold text-lg">YSepBB</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Navigation */}
      <div className="py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 my-1 mx-2 rounded-md transition-colors group",
              item.active 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 mr-3",
              item.primary && "text-primary"
            )} />
            {isOpen && <span className={cn(
              item.active && "font-medium"
            )}>{item.name}</span>}
          </Link>
        ))}
      </div>
      
      {/* User Profile */}
      <div className="mt-auto p-4 border-t border-white/10">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-sm font-medium text-primary">AL</span>
          </div>
          {isOpen && (
            <div className="ml-3">
              <div className="text-sm font-medium">Alek</div>
              <div className="text-xs text-muted-foreground">Premium Account</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


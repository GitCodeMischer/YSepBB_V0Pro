"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  PlusCircle, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  Home, 
  Wallet, 
  Send,
  BarChart2,  
  Eye, 
  EyeOff,
  Bell,
  User,
  CreditCard,
  BarChart4,
  TrendingUp,
  TrendingDown,
  LineChart
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  
  // Mock user data
  const user = {
    name: "Alek",
    avatar: "/assets/avatar.png", // Default fallback path
  }
  
  // Mock card data
  const card = {
    type: "Mastercard",
    number: "5432 7512 3412 3456",
    expiryDate: "09/25",
    background: "bg-primary", // Neon green background
  }
  
  // Mock transaction data
  const transactions = [
    {
      id: 1,
      name: "Esther Howard",
      date: "Today at 8:30 AM",
      amount: 320,
      type: "incoming"
    },
    {
      id: 2,
      name: "Jane Cooper",
      date: "Yesterday at 4:45 PM",
      amount: 200,
      type: "outgoing"
    },
    {
      id: 3,
      name: "Leslie Alexander",
      date: "Yesterday at 2:15 PM",
      amount: 450,
      type: "incoming"
    }
  ]

  // Financial summary data
  const summaryData = [
    {
      title: "Total Balance",
      value: "$24,156.00",
      change: "+2.5%",
      trend: "up",
      icon: <Wallet className="h-4 w-4" />
    },
    {
      title: "Monthly Income",
      value: "$8,350.00",
      change: "+12.3%",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Monthly Expenses",
      value: "$4,752.00",
      change: "+8.4%",
      trend: "down",
      icon: <TrendingDown className="h-4 w-4" />
    },
    {
      title: "Savings",
      value: "$6,245.00",
      change: "+3.2%",
      trend: "up",
      icon: <CreditCard className="h-4 w-4" />
    }
  ]

  // Renders mobile-specific dashboard design
  const renderMobileView = () => (
    <div className="max-w-md mx-auto pb-24">
      {/* Header with greeting and user info */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-black">YB</span>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Hi, {user.name}</div>
            <div className="text-sm font-bold">Welcome Back!</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Card section */}
      <div className="px-5 mb-6">
        <div className={cn("neon-card rounded-xl p-4 text-black relative overflow-hidden")}>
          <div className="flex flex-col h-full justify-between">
            <div className="mb-6">
              <span className="text-xs font-medium opacity-80">Mastercard</span>
            </div>
            <div className="space-y-4">
              <div className="card-number">{card.number}</div>
              <div className="flex justify-end">
                <div className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Balance */}
      <div className="px-5 mb-6">
        <div className="neon-card-dark rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Current Balance</h2>
          <div className="flex items-center gap-2 mb-1">
            {showBalance ? (
              <div className="text-2xl font-bold">$24,156.00</div>
            ) : (
              <div className="balance-hidden">
                <div className="text-xl font-bold">●●●●●●</div>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowBalance(!showBalance)}
              className="p-0 h-8 w-8"
            >
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">Tap to show balance.....</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-5 grid grid-cols-4 gap-3 mb-6">
        <div className="action-button">
          <div className="action-button-icon">
            <ArrowDownLeft className="h-5 w-5" />
          </div>
          <span className="action-button-label">Transaction</span>
        </div>
        <div className="action-button">
          <div className="action-button-icon">
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <span className="action-button-label">Conversion</span>
        </div>
        <div className="action-button">
          <div className="action-button-icon">
            <PlusCircle className="h-5 w-5" />
          </div>
          <span className="action-button-label">Top Up</span>
        </div>
        <div className="action-button">
          <div className="action-button-icon">
            <Send className="h-5 w-5" />
          </div>
          <span className="action-button-label">Payments</span>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <Button variant="ghost" size="sm" className="text-xs text-primary h-8">
            Weekly
          </Button>
        </div>

        <div className="space-y-1">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 border border-white/10">
                  <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="transaction-content">
                  <div className="text-sm font-medium">{transaction.name}</div>
                  <div className="text-xs text-muted-foreground">{transaction.date}</div>
                </div>
              </div>
              <div className={cn(
                "transaction-amount",
                transaction.type === "incoming" 
                  ? "transaction-amount-positive" 
                  : "transaction-amount-negative"
              )}>
                {transaction.type === "incoming" ? "+" : "-"}${transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  
  // Renders desktop-specific dashboard design
  const renderDesktopView = () => (
    <div className="px-8 py-6">
      {/* Desktop Header Bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Financial Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}! Here's your financial overview.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <Card key={index} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
              <div className="rounded-full p-2 bg-primary/10">
                {item.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className={cn(
                "flex items-center mt-1 text-xs",
                item.trend === "up" ? "text-primary" : "text-destructive"
              )}>
                {item.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                <span>{item.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Balance History</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Week</Button>
                <Button variant="outline" size="sm">Month</Button>
                <Button variant="default" size="sm">Year</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-secondary/20 rounded-lg">
                <LineChart className="h-10 w-10 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Chart visualization would go here</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="transaction-content">
                        <div className="text-sm font-medium">{transaction.name}</div>
                        <div className="text-xs text-muted-foreground">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={cn(
                      "transaction-amount",
                      transaction.type === "incoming" 
                        ? "transaction-amount-positive" 
                        : "transaction-amount-negative"
                    )}>
                      {transaction.type === "incoming" ? "+" : "-"}${transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("neon-card rounded-xl p-4 text-black relative overflow-hidden mb-4")}>
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-6">
                    <span className="text-xs font-medium opacity-80">Mastercard</span>
                  </div>
                  <div className="space-y-4">
                    <div className="card-number">{card.number}</div>
                    <div className="flex justify-end">
                      <div className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-2" variant="outline">Add New Card</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Spending Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-secondary/20 rounded-lg">
                <BarChart2 className="h-10 w-10 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Analytics chart would go here</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Shopping</span>
                  <span className="text-sm font-medium">$845.32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Food & Dining</span>
                  <span className="text-sm font-medium">$548.20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Transportation</span>
                  <span className="text-sm font-medium">$312.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return isDesktop ? renderDesktopView() : renderMobileView()
}


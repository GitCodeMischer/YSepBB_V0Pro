"use client"

import { useState } from "react"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Wallet, 
  CreditCard, 
  Calendar,
  ArrowUpRight,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FinancialSummary() {
  const [timeRange, setTimeRange] = useState("month")
  
  const handleRangeChange = (range: string) => {
    setTimeRange(range)
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="finance-card-dark mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Financial Summary</h2>
        
        <div className="flex items-center gap-2">
          <Tabs defaultValue="month" className="w-auto">
            <TabsList className="h-8 p-1 bg-card/50 backdrop-blur-sm">
              <TabsTrigger
                value="week"
                onClick={() => handleRangeChange("week")}
                className="text-xs h-6 px-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Week
              </TabsTrigger>
              <TabsTrigger
                value="month"
                onClick={() => handleRangeChange("month")}
                className="text-xs h-6 px-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                value="year"
                onClick={() => handleRangeChange("year")}
                className="text-xs h-6 px-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Year
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-background/50"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total Balance"
          value="$24,156.00"
          change={+2.5}
          icon={Wallet}
          timeRange={timeRange}
          gradient="gradient-card-primary"
        />
        
        <SummaryCard 
          title="Income"
          value="$4,350.00"
          change={+12.3}
          icon={TrendingUp}
          timeRange={timeRange}
          gradient="gradient-card-success"
        />
        
        <SummaryCard 
          title="Expenses"
          value="$2,856.00"
          change={+8.4}
          isNegative={true}
          icon={TrendingDown}
          timeRange={timeRange}
          gradient="gradient-card-error"
        />
        
        <SummaryCard 
          title="Savings"
          value="$8,245.00"
          change={+5.2}
          icon={DollarSign}
          timeRange={timeRange}
          gradient="gradient-card-neutral"
        />
      </div>
      
      <div className="mt-6 pt-6 border-t border-border/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Upcoming Payments</h3>
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-primary">
            <span>View All</span>
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm border border-border/10">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-primary/10">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Netflix</p>
                <p className="text-xs text-muted-foreground">Subscription</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold">$12.99</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>15 May</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm border border-border/10">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-primary/10">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Spotify</p>
                <p className="text-xs text-muted-foreground">Subscription</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold">$9.99</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>22 May</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm border border-border/10">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-primary/10">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Adobe CC</p>
                <p className="text-xs text-muted-foreground">Subscription</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold">$52.99</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>28 May</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface SummaryCardProps {
  title: string
  value: string
  change: number
  icon: React.ElementType
  timeRange: string
  isNegative?: boolean
  gradient?: string
}

function SummaryCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  timeRange,
  isNegative = false,
  gradient = "gradient-card-primary"
}: SummaryCardProps) {
  const timeRangeMap = {
    week: "this week",
    month: "this month",
    year: "this year"
  }
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 500 }}
      className={`rounded-xl p-4 relative overflow-hidden ${gradient}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="rounded-full p-2 bg-card/10 backdrop-blur-sm">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <div className={`flex items-center mt-1 text-xs ${isNegative ? 'balance-change-negative' : 'balance-change-positive'}`}>
            {change > 0 ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            <span>{change > 0 ? '+' : ''}{change}% {timeRangeMap[timeRange as keyof typeof timeRangeMap]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// For backward compatibility
export default FinancialSummary


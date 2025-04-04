"use client"

import { useState, useEffect } from "react"
import { Plus, User, ArrowUpRight, Wallet, LineChart, DollarSign, BarChart2, TrendingUp, TrendingDown, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppLayout from "@/components/layout/app-layout"
import { FinancialSummary } from "@/components/financial-summary"
import NetWorthChart from "@/components/net-worth-chart"
import AssetAllocation from "@/components/asset-allocation"
import AccountsTable from "@/components/accounts-table"
import ScenarioBuilder from "@/components/scenario-builder"
import { PageLoading } from "@/components/ui/page-loading"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery("(max-width: 767px)")

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <AppLayout>
        <PageLoading />
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back! Here's your financial overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 rounded-full glass-button">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </Button>
          <Button
            size="sm"
            className="btn-finance-primary gap-2 rounded-full"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Funds</span>
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="finance-card-gradient p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Balance</h3>
            <div className="rounded-full p-2 bg-primary/10">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">$24,156.00</p>
              <div className="flex items-center mt-1 text-xs balance-change-positive">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+2.5% from last month</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="finance-card-gradient p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Income</h3>
            <div className="rounded-full p-2 bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">$4,350.00</p>
              <div className="flex items-center mt-1 text-xs balance-change-positive">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12.3% from last month</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="finance-card-gradient p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Expenses</h3>
            <div className="rounded-full p-2 bg-primary/10">
              <TrendingDown className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">$2,856.00</p>
              <div className="flex items-center mt-1 text-xs balance-change-negative">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8.4% from last month</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="finance-card-gradient p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Savings</h3>
            <div className="rounded-full p-2 bg-primary/10">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">$8,245.00</p>
              <div className="flex items-center mt-1 text-xs balance-change-positive">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+5.2% from last month</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 grid w-full max-w-md mx-auto grid-cols-4 rounded-full backdrop-blur-md border border-border/50 p-1">
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="finance-card-dark"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Net Worth</h2>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full btn-finance-icon text-primary">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <NetWorthChart />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="finance-card-dark"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Asset Allocation</h2>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full btn-finance-icon text-primary">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <AssetAllocation />
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="finance-card-dark"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Recent Transactions</h2>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full btn-finance-icon text-primary">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {/* Sample transactions - replace with actual component */}
                  <div className="transaction-item">
                    <div className="transaction-info">
                      <div className="transaction-avatar">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div className="transaction-content">
                        <div className="transaction-title">Amazon</div>
                        <div className="transaction-subtitle">Shopping</div>
                      </div>
                    </div>
                    <div className="transaction-amount transaction-amount-negative">-$85.32</div>
                  </div>
                  
                  <div className="transaction-item">
                    <div className="transaction-info">
                      <div className="transaction-avatar">
                        <Wallet className="h-4 w-4" />
                      </div>
                      <div className="transaction-content">
                        <div className="transaction-title">Salary</div>
                        <div className="transaction-subtitle">Direct Deposit</div>
                      </div>
                    </div>
                    <div className="transaction-amount transaction-amount-positive">+$3,450.00</div>
                  </div>
                  
                  <div className="transaction-item">
                    <div className="transaction-info">
                      <div className="transaction-avatar">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div className="transaction-content">
                        <div className="transaction-title">Starbucks</div>
                        <div className="transaction-subtitle">Food & Beverage</div>
                      </div>
                    </div>
                    <div className="transaction-amount transaction-amount-negative">-$5.40</div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm" className="rounded-full w-full btn-finance-outline gap-2">
                    <span>View All Transactions</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="accounts" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="finance-card-dark"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Accounts</h2>
                  <Button variant="outline" size="sm" className="gap-1 rounded-full btn-finance-outline btn-finance-icon">
                    <Plus className="h-3.5 w-3.5" />
                    <span className="text-xs">Add Account</span>
                  </Button>
                </div>
                <AccountsTable />
              </motion.div>
            </TabsContent>

            <TabsContent value="transactions" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="finance-card-dark"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Transaction History</h2>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full btn-finance-icon text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                  </Button>
                </div>
                <p className="text-muted-foreground">Transaction history will appear here.</p>
              </motion.div>
            </TabsContent>

            <TabsContent value="planning" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="finance-card-dark"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Financial Planning</h2>
                  <Button variant="outline" size="sm" className="gap-1 rounded-full btn-finance-outline btn-finance-icon">
                    <Plus className="h-3.5 w-3.5" />
                    <span className="text-xs">New Plan</span>
                  </Button>
                </div>
                <ScenarioBuilder />
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  )
}


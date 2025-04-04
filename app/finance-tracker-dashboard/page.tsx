"use client"

import { useState, useEffect } from "react"
import { Plus, User, ArrowUpRight } from "lucide-react"
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
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 rounded-full glass-button">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </Button>
          <Button
            size="sm"
            className="gap-2 rounded-full bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-green))/80] text-black hover:from-[hsl(var(--neon-green))/90] hover:to-[hsl(var(--neon-green))/70] backdrop-blur-md"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Funds</span>
          </Button>
        </div>
      </div>

      <div className="w-full">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4 rounded-full glass-dropdown p-1">
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-xl p-6 shadow-lg bg-gradient-to-br from-[#1a1a3a] to-[#0d0d2b] border border-indigo-500/20"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Net Worth</h2>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full glass-button">
                      <span className="text-xs">Details</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <NetWorthChart />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-xl p-6 shadow-lg bg-gradient-to-br from-[#2d1a3a] to-[#1a0d2b] border border-purple-500/20"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Asset Allocation</h2>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full glass-button">
                      <span className="text-xs">Details</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <AssetAllocation />
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl p-6 shadow-lg bg-gradient-to-br from-[#1a2d3a] to-[#0d1a2b] border border-blue-500/20"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Accounts</h2>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full glass-button">
                    <span className="text-xs">View All</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
                <AccountsTable />
              </motion.div>
            </TabsContent>

            <TabsContent value="accounts" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl p-6 shadow-lg bg-gradient-to-br from-[#1a2d3a] to-[#0d1a2b] border border-blue-500/20"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Accounts</h2>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full glass-button">
                    <span className="text-xs">Add Account</span>
                    <Plus className="h-3 w-3" />
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
                className="rounded-xl p-6 shadow-lg bg-gradient-to-br from-[#2d1a1a] to-[#1a0d0d] border border-red-500/20"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Recent Transactions</h2>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full glass-button">
                    <span className="text-xs">Filter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
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
                className="rounded-xl p-6 shadow-lg bg-gradient-to-br from-[#1a2d1a] to-[#0d1a0d] border border-green-500/20"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Financial Planning</h2>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full glass-button">
                    <span className="text-xs">New Plan</span>
                    <Plus className="h-3 w-3" />
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


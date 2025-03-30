"use client"

import { useState, useEffect } from "react"
import { Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppLayout from "@/components/layout/app-layout"
import FinancialSummary from "@/components/financial-summary"
import NetWorthChart from "@/components/net-worth-chart"
import AssetAllocation from "@/components/asset-allocation"
import AccountsTable from "@/components/accounts-table"
import ScenarioBuilder from "@/components/scenario-builder"
import { PageLoading } from "@/components/ui/page-loading"
import { useMediaQuery } from "@/hooks/use-media-query"

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
    </AppLayout>
  )
}


"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { budgets, getCategoryName, formatCurrency } from "@/lib/fake-data"

export default function BudgetPlan() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [period, setPeriod] = useState("month")

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

  // Filter budgets based on search query
  const filteredBudgets = budgets.filter((budget) =>
    getCategoryName(budget.category).toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate total budget
  const totalPlanned = budgets.reduce((sum, budget) => sum + budget.planned, 0)
  const totalActual = budgets.reduce((sum, budget) => sum + budget.actual, 0)
  const totalProgress = (totalActual / totalPlanned) * 100

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">BudgetPlan</h1>
          <p className="mt-1 text-muted-foreground">Planen und verfolgen Sie Ihre Ausgaben</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Zeitraum wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Dieser Monat</SelectItem>
                <SelectItem value="quarter">Dieses Quartal</SelectItem>
                <SelectItem value="year">Dieses Jahr</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            size="sm"
            className="gap-2 rounded-full bg-gradient-to-r from-accent-green to-accent-green/80 text-accent-green-foreground hover:from-accent-green/90 hover:to-accent-green/70"
          >
            <Plus className="h-4 w-4" />
            <span>Neues Budget</span>
          </Button>
        </div>
      </div>

      {/* Budget Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gesamtbudget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ausgegeben</p>
              <p className="text-3xl font-bold">{formatCurrency(totalActual)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">von {formatCurrency(totalPlanned)}</p>
              <p className={`text-sm ${totalPlanned - totalActual > 0 ? "text-accent-green" : "text-destructive"}`}>
                {totalPlanned - totalActual > 0
                  ? `${formatCurrency(totalPlanned - totalActual)} übrig`
                  : `${formatCurrency(Math.abs(totalPlanned - totalActual))} überzogen`}
              </p>
            </div>
          </div>

          <Progress
            value={totalProgress}
            className={`h-2 ${totalProgress > 90 ? "bg-destructive/20" : "bg-muted"}`}
            indicatorClassName={totalProgress > 90 ? "bg-destructive" : "bg-accent-green"}
          />

          <p className="mt-2 text-xs text-muted-foreground">
            {totalProgress.toFixed(1)}% des Gesamtbudgets für{" "}
            {period === "month" ? "Mai 2023" : period === "quarter" ? "Q2 2023" : "2023"} verwendet
          </p>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Suche nach Budgetkategorien..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Budget Categories */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBudgets.map((budget, index) => (
          <motion.div
            key={budget.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{getCategoryName(budget.category)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ausgegeben</p>
                    <p className="text-2xl font-bold">{formatCurrency(budget.actual)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">von {formatCurrency(budget.planned)}</p>
                    <p className={`text-sm ${budget.remaining > 0 ? "text-accent-green" : "text-destructive"}`}>
                      {budget.remaining > 0
                        ? `${formatCurrency(budget.remaining)} übrig`
                        : `${formatCurrency(Math.abs(budget.remaining))} überzogen`}
                    </p>
                  </div>
                </div>

                <Progress
                  value={budget.progress}
                  className={`h-2 ${budget.progress > 90 ? "bg-destructive/20" : "bg-muted"}`}
                  indicatorClassName={budget.progress > 90 ? "bg-destructive" : "bg-accent-green"}
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  {budget.progress}% des Budgets für {budget.period} verwendet
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  )
}


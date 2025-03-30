"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { budgets, getCategoryName, formatCurrency } from "@/lib/fake-data"

export default function BudgetOverview() {
  const [isLoading, setIsLoading] = useState(true)
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

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Budgetübersicht</h1>
          <p className="mt-2 text-muted-foreground">Verfolgen Sie Ihre Ausgaben im Vergleich zu Ihren Budgets</p>
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

          <Button size="sm" className="gap-2 rounded-full">
            <Plus className="h-4 w-4" />
            <span>Neues Budget</span>
          </Button>
        </div>
      </div>

      {/* Budget Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget, index) => (
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


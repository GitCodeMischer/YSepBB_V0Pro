"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { budgets, getCategoryName, formatCurrency } from "@/lib/fake-data"

export default function BudgetPlanStats() {
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

  // Prepare data for budget vs actual chart
  const budgetVsActualData = budgets.map((budget) => ({
    name: getCategoryName(budget.category),
    planned: budget.planned,
    actual: budget.actual,
  }))

  // Prepare data for budget trend chart
  const budgetTrendData = [
    { month: "Jan", planned: 1500, actual: 1450 },
    { month: "Feb", planned: 1500, actual: 1550 },
    { month: "Mar", planned: 1600, actual: 1500 },
    { month: "Apr", planned: 1600, actual: 1650 },
    { month: "Mai", planned: 1700, actual: 1650 },
    {
      month: "Jun",
      planned: budgets.reduce((sum, budget) => sum + budget.planned, 0),
      actual: budgets.reduce((sum, budget) => sum + budget.actual, 0),
    },
  ]

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Budget Statistik</h1>
          <p className="mt-2 text-muted-foreground">Analyse Ihrer Budgetplanung und -nutzung</p>
        </div>

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
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Budget vs Actual */}
        <Card>
          <CardHeader>
            <CardTitle>Budget vs. Tatsächliche Ausgaben</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetVsActualData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `€${value.toLocaleString("de-DE")}`}
                  />
                  <Tooltip
                    formatter={(value) => [`€${value.toLocaleString("de-DE")}`, ""]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="planned" name="Geplant" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Tatsächlich" fill="hsl(var(--accent-green))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={budgetTrendData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `€${value.toLocaleString("de-DE")}`}
                  />
                  <Tooltip
                    formatter={(value) => [`€${value.toLocaleString("de-DE")}`, ""]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Line type="monotone" dataKey="planned" name="Geplant" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="Tatsächlich"
                    stroke="hsl(var(--accent-green))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Summary */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Zusammenfassung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Gesamtbudget</p>
              <p className="text-2xl font-bold">
                {formatCurrency(budgets.reduce((sum, budget) => sum + budget.planned, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tatsächliche Ausgaben</p>
              <p className="text-2xl font-bold">
                {formatCurrency(budgets.reduce((sum, budget) => sum + budget.actual, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Differenz</p>
              <p
                className={`text-2xl font-bold ${budgets.reduce((sum, budget) => sum + budget.planned, 0) - budgets.reduce((sum, budget) => sum + budget.actual, 0) >= 0 ? "text-accent-green" : "text-destructive"}`}
              >
                {formatCurrency(
                  budgets.reduce((sum, budget) => sum + budget.planned, 0) -
                    budgets.reduce((sum, budget) => sum + budget.actual, 0),
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  )
}


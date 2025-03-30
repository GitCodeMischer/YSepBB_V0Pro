"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { plannedPayments, getCategoryName, formatCurrency } from "@/lib/fake-data"

export default function PlannedPaymentsStats() {
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

  // Prepare data for category distribution chart
  const categoryData = plannedPayments.reduce(
    (acc, payment) => {
      const categoryName = getCategoryName(payment.category)
      const existingCategory = acc.find((item) => item.name === categoryName)

      if (existingCategory) {
        existingCategory.value += Math.abs(payment.amount)
      } else {
        acc.push({
          name: categoryName,
          value: Math.abs(payment.amount),
          color:
            payment.category === "housing"
              ? "#f97316"
              : payment.category === "utilities"
                ? "#06b6d4"
                : payment.category === "subscription"
                  ? "#a855f7"
                  : "#6366f1",
        })
      }

      return acc
    },
    [] as { name: string; value: number; color: string }[],
  )

  // Prepare data for monthly distribution chart
  const monthlyData = [
    { month: "Jan", amount: 1450 },
    { month: "Feb", amount: 1450 },
    { month: "Mar", amount: 1500 },
    { month: "Apr", amount: 1475 },
    { month: "Mai", amount: 1475 },
    { month: "Jun", amount: plannedPayments.reduce((sum, payment) => sum + Math.abs(payment.amount), 0) },
  ]

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Geplante Zahlungen Statistik</h1>
          <p className="mt-2 text-muted-foreground">Analyse Ihrer geplanten Zahlungen</p>
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
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Verteilung nach Kategorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatCurrency(value as number), "Betrag"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Monatliche Verteilung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
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
                    formatter={(value) => [`€${value.toLocaleString("de-DE")}`, "Betrag"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Betrag" />
                </BarChart>
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
              <p className="text-sm text-muted-foreground">Anzahl geplanter Zahlungen</p>
              <p className="text-2xl font-bold">{plannedPayments.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Durchschnittlicher Betrag</p>
              <p
                className="text-
2xl font-bold"
              >
                {formatCurrency(
                  plannedPayments.reduce((sum, payment) => sum + Math.abs(payment.amount), 0) / plannedPayments.length,
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Höchster Betrag</p>
              <p className="text-2xl font-bold">
                {formatCurrency(Math.max(...plannedPayments.map((payment) => Math.abs(payment.amount))))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  )
}


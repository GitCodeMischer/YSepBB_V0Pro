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
import { subscriptions, formatCurrency } from "@/lib/fake-data"

export default function SubscriptionsStats() {
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

  // Prepare data for subscription distribution chart
  const subscriptionData = subscriptions.map((subscription) => ({
    name: subscription.name,
    value: subscription.amount,
    color: subscription.color.replace("bg-", ""),
  }))

  // Prepare data for monthly cost chart
  const monthlyCostData = [
    { month: "Jan", amount: 55 },
    { month: "Feb", amount: 55 },
    { month: "Mar", amount: 60 },
    { month: "Apr", amount: 60 },
    { month: "Mai", amount: 60 },
    { month: "Jun", amount: subscriptions.reduce((sum, subscription) => sum + subscription.amount, 0) },
  ]

  // Calculate total monthly and yearly costs
  const totalMonthlyCost = subscriptions.reduce((sum, subscription) => sum + subscription.amount, 0)
  const totalYearlyCost = totalMonthlyCost * 12

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Abonnement Statistik</h1>
          <p className="mt-2 text-muted-foreground">Analyse Ihrer Abonnementkosten</p>
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
        {/* Subscription Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Verteilung der Abonnements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(var(--${entry.color}))`} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatCurrency(value as number), "Monatliche Kosten"]}
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

        {/* Monthly Cost Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monatliche Kosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyCostData}
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
                    formatter={(value) => [`€${value.toLocaleString("de-DE")}`, "Monatliche Kosten"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Monatliche Kosten" />
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
              <p className="text-sm text-muted-foreground">Anzahl Abonnements</p>
              <p className="text-2xl font-bold">{subscriptions.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monatliche Kosten</p>
              <p className="text-2xl font-bold">{formatCurrency(totalMonthlyCost)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jährliche Kosten</p>
              <p className="text-2xl font-bold">{formatCurrency(totalYearlyCost)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  )
}


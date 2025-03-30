"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDownRight, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { monthlySpending, calculateTotalExpenses, formatCurrency } from "@/lib/fake-data"

export default function TotalSpending() {
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

  const totalExpenses = calculateTotalExpenses()

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Gesamtausgaben</h1>
          <p className="mt-2 text-muted-foreground">Übersicht über Ihre Ausgaben</p>
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

      {/* Total Spending Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Card className="overflow-hidden border bg-gradient-to-br from-red-500/10 to-orange-500/10 shadow-sm backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-baseline text-3xl font-bold">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {formatCurrency(totalExpenses)}
              </motion.span>
            </CardTitle>
            <p className="text-muted-foreground">
              Gesamtausgaben im {period === "month" ? "Monat" : period === "quarter" ? "Quartal" : "Jahr"}
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">+5.2%</span>
              <span className="ml-1 text-xs text-muted-foreground">im Vergleich zum vorherigen Zeitraum</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Spending Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Ausgaben im Zeitverlauf</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlySpending}
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
                  formatter={(value) => [`€${value.toLocaleString("de-DE")}`, "Ausgaben"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="amount" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Ausgaben" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  )
}


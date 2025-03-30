"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import {
  transactions,
  monthlyIncome,
  getCategoryColor,
  getCategoryName,
  formatCurrency,
  formatDate,
  calculateTotalIncome,
} from "@/lib/fake-data"

export default function CashflowIncome() {
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

  // Get income transactions
  const incomeTransactions = transactions
    .filter((t) => t.amount > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Filter transactions based on search query
  const filteredTransactions = incomeTransactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCategoryName(transaction.category).toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.accountName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalIncome = calculateTotalIncome()

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Einnahmen</h1>
          <p className="mt-1 text-muted-foreground">Übersicht über Ihre Einnahmen</p>
        </div>

        <Button
          size="sm"
          className="gap-2 rounded-full bg-gradient-to-r from-accent-green to-accent-green/80 text-accent-green-foreground hover:from-accent-green/90 hover:to-accent-green/70"
        >
          <Plus className="h-4 w-4" />
          <span>Neue Einnahme</span>
        </Button>
      </div>

      {/* Income Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card className="overflow-hidden border bg-gradient-to-br from-accent-green/10 to-emerald-500/10 shadow-sm backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-baseline text-3xl font-bold">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {formatCurrency(totalIncome)}
              </motion.span>
            </CardTitle>
            <p className="text-muted-foreground">
              Gesamteinnahmen im {period === "month" ? "Monat" : period === "quarter" ? "Quartal" : "Jahr"}
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-accent-green" />
              <span className="text-sm font-medium text-accent-green">+3.2%</span>
              <span className="ml-1 text-xs text-muted-foreground">im Vergleich zum vorherigen Zeitraum</span>
            </div>
          </CardContent>
        </Card>

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

      {/* Monthly Income Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Einnahmen im Zeitverlauf</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyIncome}
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
                  formatter={(value) => [`€${value.toLocaleString("de-DE")}`, "Einnahmen"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="amount" fill="hsl(var(--accent-green))" radius={[4, 4, 0, 0]} name="Einnahmen" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Suche nach Einnahmen..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      {/* Income Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Einnahmen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">Keine Einnahmen gefunden</p>
              </div>
            ) : (
              filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="mb-2 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{transaction.description}</h3>
                      <Badge className={`${getCategoryColor(transaction.category)}`}>
                        {getCategoryName(transaction.category)}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatDate(transaction.date)}</span>
                      <span>•</span>
                      <span>{transaction.accountName}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-accent-green">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span className="font-medium">{formatCurrency(transaction.amount)}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  )
}


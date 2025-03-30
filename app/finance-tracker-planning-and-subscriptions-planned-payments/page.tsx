"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Plus, Search, Filter, ArrowDownRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { plannedPayments, getCategoryColor, getCategoryName, formatCurrency, formatDate } from "@/lib/fake-data"

export default function PlannedPayments() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

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

  // Filter planned payments based on search query
  const filteredPayments = plannedPayments.filter(
    (payment) =>
      payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCategoryName(payment.category).toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.accountName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate total planned payments
  const totalPlannedAmount = plannedPayments.reduce((sum, payment) => sum + Math.abs(payment.amount), 0)

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Geplante Zahlungen</h1>
          <p className="mt-1 text-muted-foreground">Übersicht über Ihre anstehenden Zahlungen</p>
        </div>

        <Button
          size="sm"
          className="gap-2 rounded-full bg-gradient-to-r from-accent-green to-accent-green/80 text-accent-green-foreground hover:from-accent-green/90 hover:to-accent-green/70"
        >
          <Plus className="h-4 w-4" />
          <span>Neue Zahlung</span>
        </Button>
      </div>

      {/* Planned Payments Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Zusammenfassung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Geplante Zahlungen</p>
              <p className="text-2xl font-bold">{plannedPayments.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gesamtbetrag</p>
              <p className="text-2xl font-bold">{formatCurrency(totalPlannedAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nächste Zahlung</p>
              <p className="text-2xl font-bold">{formatDate(plannedPayments[0].date)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Suche nach geplanten Zahlungen..."
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

      {/* Planned Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Geplante Zahlungen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">Keine geplanten Zahlungen gefunden</p>
              </div>
            ) : (
              filteredPayments.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="mb-2 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{payment.description}</h3>
                      <Badge className={`${getCategoryColor(payment.category)}`}>
                        {getCategoryName(payment.category)}
                      </Badge>
                      {payment.recurring && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {payment.frequency === "monthly"
                              ? "Monatlich"
                              : payment.frequency === "quarterly"
                                ? "Vierteljährlich"
                                : "Jährlich"}
                          </span>
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Fällig am: {formatDate(payment.date)}</span>
                      <span>•</span>
                      <span>{payment.accountName}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-destructive">
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                    <span className="font-medium">{formatCurrency(payment.amount)}</span>
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


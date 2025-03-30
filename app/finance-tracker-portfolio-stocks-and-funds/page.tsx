"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Plus, MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { stocksAndFunds, formatCurrency, formatDate } from "@/lib/fake-data"

export default function StocksAndFunds() {
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

  // Filter stocks and funds based on search query
  const filteredItems = stocksAndFunds.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sector.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate total portfolio value
  const totalValue = stocksAndFunds.reduce((sum, item) => sum + item.value, 0)

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Aktien und Fonds</h1>
          <p className="mt-1 text-muted-foreground">Ihr Wertpapierportfolio</p>
        </div>

        <Button
          size="sm"
          className="gap-2 rounded-full bg-gradient-to-r from-accent-green to-accent-green/80 text-accent-green-foreground hover:from-accent-green/90 hover:to-accent-green/70"
        >
          <Plus className="h-4 w-4" />
          <span>Wertpapier hinzufügen</span>
        </Button>
      </div>

      {/* Portfolio Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Portfolio Übersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Gesamtwert</p>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aktien</p>
              <p className="text-2xl font-bold">
                {formatCurrency(stocksAndFunds.filter((i) => i.type === "stock").reduce((sum, i) => sum + i.value, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ETFs & Fonds</p>
              <p className="text-2xl font-bold">
                {formatCurrency(stocksAndFunds.filter((i) => i.type === "etf").reduce((sum, i) => sum + i.value, 0))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Suche nach Wertpapieren..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Stocks and Funds List */}
      <Card>
        <CardHeader>
          <CardTitle>Wertpapiere</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">Keine Wertpapiere gefunden</p>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="mb-2 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <Badge variant="outline">{item.ticker}</Badge>
                      <Badge variant={item.type === "stock" ? "default" : "secondary"}>
                        {item.type === "stock" ? "Aktie" : "ETF"}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{item.shares} Anteile</span>
                      <span>•</span>
                      <span>{item.sector}</span>
                      <span>•</span>
                      <span>Gekauft am {formatDate(item.purchaseDate)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full ml-2">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Optionen</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Details anzeigen</DropdownMenuItem>
                          <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
                          <DropdownMenuItem>Verkaufen</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Entfernen</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center text-sm">
                      {item.change > 0 ? (
                        <span className="flex items-center text-accent-green">
                          <ArrowUpRight className="mr-1 h-3 w-3" />+{item.change}% ({formatCurrency(item.changeAmount)})
                        </span>
                      ) : (
                        <span className="flex items-center text-destructive">
                          <ArrowDownRight className="mr-1 h-3 w-3" />
                          {item.change}% ({formatCurrency(item.changeAmount)})
                        </span>
                      )}
                    </div>
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


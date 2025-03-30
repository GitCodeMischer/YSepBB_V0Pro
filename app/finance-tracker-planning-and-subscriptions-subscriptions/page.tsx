"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Search, ArrowDownRight, Clock, Music, Tv, ShoppingCart, Cloud, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { subscriptions, formatCurrency, formatDate } from "@/lib/fake-data"

export default function Subscriptions() {
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

  // Filter subscriptions based on search query
  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.accountName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate total monthly subscription cost
  const totalMonthlyCost = subscriptions.reduce((sum, subscription) => sum + subscription.amount, 0)

  // Get icon for subscription
  const getSubscriptionIcon = (iconName: string) => {
    switch (iconName) {
      case "tabler-device-tv":
        return <Tv className="h-5 w-5 text-white" />
      case "tabler-music":
        return <Music className="h-5 w-5 text-white" />
      case "tabler-shopping-cart":
        return <ShoppingCart className="h-5 w-5 text-white" />
      case "tabler-barbell":
        return <Dumbbell className="h-5 w-5 text-white" />
      case "tabler-cloud":
        return <Cloud className="h-5 w-5 text-white" />
      default:
        return <Clock className="h-5 w-5 text-white" />
    }
  }

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Abonnements</h1>
          <p className="mt-1 text-muted-foreground">Verwalten Sie Ihre wiederkehrenden Abonnements</p>
        </div>

        <Button
          size="sm"
          className="gap-2 rounded-full bg-gradient-to-r from-accent-green to-accent-green/80 text-accent-green-foreground hover:from-accent-green/90 hover:to-accent-green/70"
        >
          <Plus className="h-4 w-4" />
          <span>Neues Abo</span>
        </Button>
      </div>

      {/* Subscriptions Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Zusammenfassung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Aktive Abonnements</p>
              <p className="text-2xl font-bold">{subscriptions.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monatliche Kosten</p>
              <p className="text-2xl font-bold">{formatCurrency(totalMonthlyCost)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jährliche Kosten</p>
              <p className="text-2xl font-bold">{formatCurrency(totalMonthlyCost * 12)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Suche nach Abonnements..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Subscriptions List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSubscriptions.length === 0 ? (
          <div className="col-span-full flex h-32 items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">Keine Abonnements gefunden</p>
          </div>
        ) : (
          filteredSubscriptions.map((subscription, index) => (
            <motion.div
              key={subscription.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${subscription.color}`}>
                      {getSubscriptionIcon(subscription.icon)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{subscription.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {subscription.frequency === "monthly"
                          ? "Monatlich"
                          : subscription.frequency === "quarterly"
                            ? "Vierteljährlich"
                            : "Jährlich"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Nächste Zahlung</p>
                      <p className="font-medium">{formatDate(subscription.nextPayment)}</p>
                    </div>
                    <div className="flex items-center text-destructive">
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                      <span className="font-medium">{formatCurrency(subscription.amount)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{subscription.accountName}</p>
                    <Button variant="outline" size="sm">
                      Bearbeiten
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </AppLayout>
  )
}


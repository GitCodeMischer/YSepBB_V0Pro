"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Plus, Building, CreditCard, Wallet, Bitcoin, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { accounts, formatCurrency, formatDate } from "@/lib/fake-data"

export default function PortfolioAccounts() {
  const [isLoading, setIsLoading] = useState(true)

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

  // Map icon names to components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "tabler-building-bank":
        return <Building className="h-5 w-5 text-muted-foreground" />
      case "tabler-credit-card":
        return <CreditCard className="h-5 w-5 text-muted-foreground" />
      case "tabler-wallet":
        return <Wallet className="h-5 w-5 text-muted-foreground" />
      case "tabler-currency-bitcoin":
        return <Bitcoin className="h-5 w-5 text-muted-foreground" />
      default:
        return <Wallet className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Konten</h1>
          <p className="mt-1 text-muted-foreground">Übersicht über alle Ihre Finanzkonten</p>
        </div>

        <Button
          size="sm"
          className="gap-2 rounded-full bg-gradient-to-r from-accent-green to-accent-green/80 text-accent-green-foreground hover:from-accent-green/90 hover:to-accent-green/70"
        >
          <Plus className="h-4 w-4" />
          <span>Konto hinzufügen</span>
        </Button>
      </div>

      {/* Accounts Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            <Card className={`overflow-hidden border bg-gradient-to-br ${account.color} shadow-sm backdrop-blur-md`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getIcon(account.icon)}
                    <CardTitle className="text-lg">{account.name}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Optionen</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Details anzeigen</DropdownMenuItem>
                      <DropdownMenuItem>Transaktionen anzeigen</DropdownMenuItem>
                      <DropdownMenuItem>Konto bearbeiten</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Konto entfernen</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <p className="text-2xl font-bold">
                    {formatCurrency(Math.abs(account.balance))}
                    {account.balance < 0 && <span className="ml-1 text-sm text-destructive">(Schulden)</span>}
                  </p>
                  <p className="text-sm text-muted-foreground">{account.type}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {account.change > 0 ? (
                      <>
                        <ArrowUpRight className="mr-1 h-4 w-4 text-accent-green" />
                        <span className="text-accent-green">+{account.change}%</span>
                      </>
                    ) : account.change < 0 ? (
                      <>
                        <ArrowDownRight className="mr-1 h-4 w-4 text-destructive" />
                        <span className="text-destructive">{account.change}%</span>
                      </>
                    ) : (
                      <span>0%</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">Aktualisiert: {formatDate(account.lastUpdated)}</p>
                </div>

                {account.institution && (
                  <div className="mt-4 rounded-lg border border-border/50 bg-background/50 p-2 text-sm backdrop-blur-sm">
                    <p className="font-medium">{account.institution}</p>
                    {account.accountNumber && <p className="text-muted-foreground">{account.accountNumber}</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  )
}


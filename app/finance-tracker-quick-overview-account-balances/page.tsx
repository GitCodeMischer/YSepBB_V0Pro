"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Building, CreditCard, Wallet, Bitcoin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { accounts, calculateTotalBalance, formatCurrency } from "@/lib/fake-data"

export default function AccountBalances() {
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.2 } },
  }

  const totalBalance = calculateTotalBalance()

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Aktuelle Kontostände</h1>
        <p className="mt-2 text-muted-foreground">Überblick über alle Ihre Konten und Guthaben</p>
      </div>

      {/* Total Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Card className="overflow-hidden border bg-gradient-to-br from-primary/10 to-purple-500/10 shadow-sm backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardDescription>Gesamtguthaben</CardDescription>
            <CardTitle className="flex items-baseline text-3xl font-bold">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {formatCurrency(totalBalance)}
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-accent-green" />
              <span className="text-sm font-medium text-accent-green">+3.2%</span>
              <span className="ml-1 text-xs text-muted-foreground">seit letztem Monat</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Individual Account Cards */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {accounts.map((account) => (
          <motion.div key={account.id} variants={item}>
            <Card className={`overflow-hidden border bg-gradient-to-br ${account.color} shadow-sm backdrop-blur-md`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{account.type}</CardDescription>
                  {getIcon(account.icon)}
                </div>
                <CardTitle className="flex items-baseline text-xl font-bold">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    {formatCurrency(Math.abs(account.balance))}
                    {account.balance < 0 && <span className="ml-1 text-sm text-destructive">(Schulden)</span>}
                  </motion.span>
                </CardTitle>
                <p className="mt-1 text-sm">{account.name}</p>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center">
                  {account.change > 0 ? (
                    <>
                      <ArrowUpRight className="mr-1 h-4 w-4 text-accent-green" />
                      <span className="text-sm font-medium text-accent-green">+{account.change}%</span>
                    </>
                  ) : account.change < 0 ? (
                    <>
                      <ArrowDownRight className="mr-1 h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">{account.change}%</span>
                    </>
                  ) : (
                    <span className="text-sm">0%</span>
                  )}
                  <span className="ml-1 text-xs text-muted-foreground">seit letztem Monat</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AppLayout>
  )
}


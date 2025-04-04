"use client"

import React, { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Building, CreditCard, Wallet, Bitcoin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import AppLayout from "@/components/layout/app-layout"
import { accounts, calculateTotalBalance, formatCurrency } from "@/lib/fake-data"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Define the account type based on the data structure
interface Account {
  id: number
  name: string
  type: string
  icon: string
  balance: number
  change: number
  color: string
  currency: string
  lastUpdated: string
  institution?: string
  accountNumber?: string
  limit?: number
  dueDate?: string
  address?: string
}

// Define props type for the AccountCard component
interface AccountCardProps {
  account: Account
  theme: string | undefined
  getIcon: (iconName: string) => React.ReactNode
}

// Account card component for better performance through memoization
const AccountCard = React.memo(({ account, theme, getIcon }: AccountCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden border shadow-sm backdrop-blur-md transition-all duration-200", 
        theme === 'dark' && account.color
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription>{account.type}</CardDescription>
          {getIcon(account.icon)}
        </div>
        <CardTitle className="flex items-baseline text-xl font-bold">
          {formatCurrency(Math.abs(account.balance))}
          {account.balance < 0 && <span className="ml-1 text-sm text-destructive">(Schulden)</span>}
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
  );
});

AccountCard.displayName = "AccountCard";

// The main component
export default function AccountBalances() {
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()
  const totalBalance = useMemo(() => calculateTotalBalance(), []);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Faster loading time for better UX

    return () => clearTimeout(timer)
  }, [])

  // Icon cache - memoized to avoid recreating on every render
  const getIcon = useMemo(() => (iconName: string) => {
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
  }, []);

  // Animation variants - more performant
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Faster stagger for better performance
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 5 }, // Smaller y value for more subtle animation
    show: { opacity: 1, y: 0, transition: { duration: 0.15 } } // Faster transition
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Aktuelle Kontostände</h1>
        <p className="mt-2 text-muted-foreground">Überblick über alle Ihre Konten und Guthaben</p>
      </div>

      {/* Total Balance Card with Skeleton Loader */}
      <div className="mb-8">
        {isLoading ? (
          <Card className="overflow-hidden border shadow-sm">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-8 w-40" />
            </CardHeader>
            <CardContent className="pt-4">
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={cn(
              "overflow-hidden border shadow-sm",
              theme === 'dark' ? "bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-md" : 
              "bg-white border-border/40"
            )}>
              <CardHeader className="pb-2">
                <CardDescription>Gesamtguthaben</CardDescription>
                <CardTitle className="text-3xl font-bold">
                  {formatCurrency(totalBalance)}
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
        )}
      </div>

      {/* Individual Account Cards with Skeleton Loaders */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card key={index} className="overflow-hidden border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <Skeleton className="mt-2 h-6 w-32" />
                <Skeleton className="mt-2 h-4 w-20" />
              </CardHeader>
              <CardContent className="pt-2">
                <Skeleton className="h-4 w-28" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {accounts.map((account) => (
              <motion.div key={account.id} variants={item} layout>
                <AccountCard 
                  account={account as Account} 
                  theme={theme} 
                  getIcon={getIcon} 
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </AppLayout>
  )
}


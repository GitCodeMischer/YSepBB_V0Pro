"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Plus, Building, CreditCard, Wallet, Bitcoin, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AppLayout from "@/components/layout/app-layout"
import { accounts, formatCurrency, formatDate } from "@/lib/fake-data"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Define account interface
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

// Account card component props
interface AccountCardProps {
  account: Account
  theme: string | undefined
  getIcon: (iconName: string) => React.ReactNode
  index: number
}

// Memoized Account Card Component for better performance
const AccountCard = React.memo(({ account, theme, getIcon, index }: AccountCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.15 }}
    >
      <Card 
        className={cn(
          "overflow-hidden border shadow-sm backdrop-blur-md transition-all duration-200", 
          theme === 'dark' && account.color
        )}
      >
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
  );
});

AccountCard.displayName = "AccountCard";

export default function PortfolioAccounts() {
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  // Simulate data loading with improved UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Memoized icon function
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

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Konten</h1>
          <p className="mt-1 text-muted-foreground">Übersicht über alle Ihre Finanzkonten</p>
        </div>

        <Button
          size="sm"
          className="gap-2 rounded-full bg-gradient-to-r from-accent-green to-accent-green/80 text-accent-green-foreground hover:from-accent-green/90 hover:to-accent-green/70 transition-all duration-200 shadow-sm hover:shadow"
        >
          <Plus className="h-4 w-4" />
          <span>Konto hinzufügen</span>
        </Button>
      </div>

      {/* Accounts Grid with Skeleton Loaders */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card key={index} className="overflow-hidden border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <Skeleton className="h-8 w-40 mb-1" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="mt-4 h-16 w-full rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account, index) => (
              <AccountCard 
                key={account.id}
                account={account as Account}
                theme={theme}
                getIcon={getIcon}
                index={index}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </AppLayout>
  )
}


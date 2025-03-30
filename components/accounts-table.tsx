"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

// Mock data for financial accounts
const accountsData = [
  {
    id: 1,
    name: "Chase Checking",
    type: "Bank",
    balance: 12500.42,
    change: 2.3,
    lastUpdated: "Today",
  },
  {
    id: 2,
    name: "Vanguard 401(k)",
    type: "Investment",
    balance: 58942.18,
    change: 4.7,
    lastUpdated: "Today",
  },
  {
    id: 3,
    name: "Robinhood",
    type: "Investment",
    balance: 8245.3,
    change: -1.2,
    lastUpdated: "Yesterday",
  },
  {
    id: 4,
    name: "Bitcoin Wallet",
    type: "Crypto",
    balance: 15204.54,
    change: 12.8,
    lastUpdated: "Today",
  },
  {
    id: 5,
    name: "Amex Credit Card",
    type: "Credit",
    balance: -2500.0,
    change: 0,
    lastUpdated: "Yesterday",
  },
  {
    id: 6,
    name: "Rental Property",
    type: "Real Estate",
    balance: 32500.0,
    change: 0.5,
    lastUpdated: "Last week",
  },
]

export default function AccountsTable() {
  const [accounts, setAccounts] = useState(accountsData)
  const isMobile = useMediaQuery("(max-width: 767px)")

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Accounts</CardTitle>
            <CardDescription>Manage your connected financial accounts</CardDescription>
          </div>
          <Button
            size="sm"
            className="ml-auto gap-1 rounded-full bg-gradient-to-r from-accent-green to-accent-green/80 text-accent-green-foreground hover:from-accent-green/90 hover:to-accent-green/70"
          >
            <Plus className="h-4 w-4" /> Add Account
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead>Account</TableHead>
                  {!isMobile && <TableHead>Type</TableHead>}
                  <TableHead className="text-right">Balance</TableHead>
                  {!isMobile && <TableHead className="text-right">Change</TableHead>}
                  {!isMobile && <TableHead className="text-right">Last Updated</TableHead>}
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account, index) => (
                  <motion.tr
                    key={account.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.03, duration: 0.2 }}
                    className="border-b hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      <div>
                        {account.name}
                        {isMobile && (
                          <div className="mt-1">
                            <span className="rounded-full bg-muted px-2 py-1 text-xs">{account.type}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    {!isMobile && (
                      <TableCell>
                        <span className="rounded-full bg-muted px-2 py-1 text-xs">{account.type}</span>
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <span className={account.balance < 0 ? "text-destructive" : ""}>
                        ${Math.abs(account.balance).toLocaleString()}
                        {account.balance < 0 && " (debt)"}
                      </span>
                      {isMobile && (
                        <div className="mt-1 flex items-center justify-end">
                          {account.change > 0 ? (
                            <>
                              <ArrowUpRight className="mr-1 h-3 w-3 text-accent-green" />
                              <span className="text-xs text-accent-green">{account.change}%</span>
                            </>
                          ) : account.change < 0 ? (
                            <>
                              <ArrowDownRight className="mr-1 h-3 w-3 text-destructive" />
                              <span className="text-xs text-destructive">{Math.abs(account.change)}%</span>
                            </>
                          ) : (
                            <span className="text-xs">0%</span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    {!isMobile && (
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          {account.change > 0 ? (
                            <>
                              <ArrowUpRight className="mr-1 h-4 w-4 text-accent-green" />
                              <span className="text-accent-green">{account.change}%</span>
                            </>
                          ) : account.change < 0 ? (
                            <>
                              <ArrowDownRight className="mr-1 h-4 w-4 text-destructive" />
                              <span className="text-destructive">{Math.abs(account.change)}%</span>
                            </>
                          ) : (
                            <span>0%</span>
                          )}
                        </div>
                      </TableCell>
                    )}
                    {!isMobile && (
                      <TableCell className="text-right text-muted-foreground">{account.lastUpdated}</TableCell>
                    )}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border border-border bg-card">
                          <DropdownMenuItem>View Transactions</DropdownMenuItem>
                          <DropdownMenuItem>Edit Account</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remove Account</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


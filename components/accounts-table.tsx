"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus, ExternalLink } from "lucide-react"
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

// Changed from default export to named export
export function AccountsTable() {
  const [accounts, setAccounts] = useState(accountsData)
  const isMobile = useMediaQuery("(max-width: 767px)")

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <div className="w-full">
        <div className="flex flex-row items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Connected Accounts</h3>
            <p className="text-sm text-muted-foreground">Track your assets across platforms</p>
          </div>
          <Button
            size="sm"
            className="gap-2 rounded-full btn-finance-outline"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Add Account</span>
          </Button>
        </div>
        <div className="rounded-lg overflow-hidden border border-border/10 bg-card/40 backdrop-blur-md">
          <div className="overflow-auto rounded-lg p-1">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/10 hover:bg-transparent">
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
                    className="border-b border-border/10 hover:bg-white/5"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs text-primary font-medium">{account.name.substring(0, 2)}</span>
                        </div>
                        <div>
                          {account.name}
                          {isMobile && (
                            <div className="mt-1">
                              <span className="rounded-full bg-background/60 px-2 py-0.5 text-xs">{account.type}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    {!isMobile && (
                      <TableCell>
                        <span className="rounded-full bg-background/60 px-2 py-1 text-xs">{account.type}</span>
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <span className={account.balance < 0 ? "text-accent-red" : ""}>
                        ${Math.abs(account.balance).toLocaleString()}
                        {account.balance < 0 && " (debt)"}
                      </span>
                      {isMobile && (
                        <div className="mt-1 flex items-center justify-end">
                          {account.change > 0 ? (
                            <>
                              <ArrowUpRight className="mr-1 h-3 w-3" />
                              <span className="text-xs transaction-amount-positive">{account.change}%</span>
                            </>
                          ) : account.change < 0 ? (
                            <>
                              <ArrowDownRight className="mr-1 h-3 w-3" />
                              <span className="text-xs transaction-amount-negative">{Math.abs(account.change)}%</span>
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
                              <ArrowUpRight className="mr-1 h-4 w-4" />
                              <span className="transaction-amount-positive">{account.change}%</span>
                            </>
                          ) : account.change < 0 ? (
                            <>
                              <ArrowDownRight className="mr-1 h-4 w-4" />
                              <span className="transaction-amount-negative">{Math.abs(account.change)}%</span>
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
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full btn-finance-icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-card/90 backdrop-blur-md border border-border/20 rounded-lg shadow-lg"
                        >
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>View Transactions</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="14" 
                              height="14" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="h-3.5 w-3.5"
                            >
                              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                              <path d="m15 5 4 4"/>
                            </svg>
                            <span>Edit Account</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-accent-red">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="14" 
                              height="14" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="h-3.5 w-3.5"
                            >
                              <path d="M3 6h18"/>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                              <line x1="10" x2="10" y1="11" y2="17"/>
                              <line x1="14" x2="14" y1="11" y2="17"/>
                            </svg>
                            <span>Remove Account</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Also add a default export for backward compatibility
export default AccountsTable


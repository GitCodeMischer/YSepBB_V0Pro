"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function FinancialSummary() {
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

  return (
    <motion.div className="grid gap-4 md:grid-cols-3" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <Card className="backdrop-blur-md bg-black/40 border border-white/10 overflow-hidden rounded-xl shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription>Net Worth</CardDescription>
            <CardTitle className="flex items-baseline text-2xl font-bold">
              <span className="mr-1 text-lg text-muted-foreground">$</span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                124,892.44
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-[#00f56e]" />
              <span className="text-sm font-medium text-[#00f56e]">+2.5%</span>
              <span className="ml-1 text-xs text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="backdrop-blur-md bg-black/40 border border-white/10 overflow-hidden rounded-xl shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription>Monthly Income</CardDescription>
            <CardTitle className="flex items-baseline text-2xl font-bold">
              <span className="mr-1 text-lg text-muted-foreground">$</span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                8,942.00
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-[#00f56e]" />
              <span className="text-sm font-medium text-[#00f56e]">+4.3%</span>
              <span className="ml-1 text-xs text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="backdrop-blur-md bg-black/40 border border-white/10 overflow-hidden rounded-xl shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription>Monthly Expenses</CardDescription>
            <CardTitle className="flex items-baseline text-2xl font-bold">
              <span className="mr-1 text-lg text-muted-foreground">$</span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                5,621.30
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">-1.2%</span>
              <span className="ml-1 text-xs text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

// For backward compatibility
export default FinancialSummary


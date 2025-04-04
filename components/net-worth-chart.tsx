"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

// Mock data for net worth over time
const netWorthData = [
  { month: "Jan", netWorth: 105000 },
  { month: "Feb", netWorth: 107500 },
  { month: "Mar", netWorth: 110000 },
  { month: "Apr", netWorth: 109000 },
  { month: "May", netWorth: 112000 },
  { month: "Jun", netWorth: 115000 },
  { month: "Jul", netWorth: 118000 },
  { month: "Aug", netWorth: 121000 },
  { month: "Sep", netWorth: 124892 },
]

export default function NetWorthChart() {
  const [animatedData, setAnimatedData] = useState(netWorthData.map((item) => ({ ...item, netWorth: 0 })))

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(netWorthData)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="glass-card rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>Net Worth Trend</CardTitle>
          <CardDescription>Monthly progression over the past 9 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              netWorth: {
                label: "Net Worth",
                color: "#00f56e",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={animatedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f56e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00f56e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toLocaleString()}k`}
                  axisLine={false}
                  tickLine={false}
                  stroke="hsl(var(--muted-foreground))"
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
                <ChartTooltip content={<ChartTooltipContent />} wrapperStyle={{ outline: "none" }} />
                <Area
                  type="monotone"
                  dataKey="netWorth"
                  stroke="#00f56e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNetWorth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}


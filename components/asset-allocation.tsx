"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

// Mock data for asset allocation
const assetData = [
  { name: "Cash", value: 25000, color: "hsl(var(--chart-1))" },
  { name: "Stocks", value: 65000, color: "hsl(var(--chart-2))" },
  { name: "Crypto", value: 15000, color: "hsl(var(--chart-3))" },
  { name: "Real Estate", value: 19892, color: "hsl(var(--chart-4))" },
]

export function AssetAllocation() {
  const [animatedData, setAnimatedData] = useState(assetData.map((item) => ({ ...item, value: 0 })))

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(assetData)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="backdrop-blur-md bg-black/40 border border-white/10 rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>Distribution across asset classes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              Cash: {
                label: "Cash",
                color: "hsl(var(--chart-1))",
              },
              Stocks: {
                label: "Stocks",
                color: "hsl(var(--chart-2))",
              },
              Crypto: {
                label: "Crypto",
                color: "hsl(var(--chart-3))",
              },
              "Real Estate": {
                label: "Real Estate",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={animatedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  animationDuration={500}
                  animationBegin={100}
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {assetData.map((asset, index) => (
              <motion.div
                key={asset.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: asset.color }} />
                  <span className="text-sm font-medium">{asset.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">${asset.value.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// For backward compatibility
export default AssetAllocation


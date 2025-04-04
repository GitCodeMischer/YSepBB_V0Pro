"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

export default function ScenarioBuilder() {
  const [savingsRate, setSavingsRate] = useState(15)
  const [investmentReturn, setInvestmentReturn] = useState(7)
  const [retirementAge, setRetirementAge] = useState(65)

  // Generate forecast data based on inputs
  const generateForecastData = () => {
    const currentAge = 35
    const currentSavings = 124892
    const annualIncome = 100000

    const data = []
    let savings = currentSavings

    for (let age = currentAge; age <= retirementAge + 5; age++) {
      const annualSavings = (annualIncome * savingsRate) / 100
      savings = savings * (1 + investmentReturn / 100) + annualSavings

      data.push({
        age,
        savings: Math.round(savings),
      })
    }

    return data
  }

  const forecastData = generateForecastData()

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="glass-card rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>What-If Scenario Builder</CardTitle>
          <CardDescription>Adjust parameters to see how they affect your financial future</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="retirement">
            <TabsList className="mb-6 grid w-full grid-cols-3 rounded-full glass backdrop-blur-md p-1">
              <TabsTrigger value="retirement" className="rounded-full">
                Retirement
              </TabsTrigger>
              <TabsTrigger value="homebuying" className="rounded-full">
                Home Buying
              </TabsTrigger>
              <TabsTrigger value="debtpayoff" className="rounded-full">
                Debt Payoff
              </TabsTrigger>
            </TabsList>

            <TabsContent value="retirement" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    <label className="mb-2 block text-sm font-medium">Savings Rate (%)</label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[savingsRate]}
                        min={5}
                        max={50}
                        step={1}
                        onValueChange={(value) => setSavingsRate(value[0])}
                        className="py-1"
                      />
                      <span className="w-12 text-center text-sm font-medium">{savingsRate}%</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.2 }}
                  >
                    <label className="mb-2 block text-sm font-medium">Investment Return (%)</label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[investmentReturn]}
                        min={1}
                        max={12}
                        step={0.5}
                        onValueChange={(value) => setInvestmentReturn(value[0])}
                        className="py-1"
                      />
                      <span className="w-12 text-center text-sm font-medium">{investmentReturn}%</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  >
                    <label className="mb-2 block text-sm font-medium">Retirement Age</label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[retirementAge]}
                        min={50}
                        max={75}
                        step={1}
                        onValueChange={(value) => setRetirementAge(value[0])}
                        className="py-1"
                      />
                      <span className="w-12 text-center text-sm font-medium">{retirementAge}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, duration: 0.2 }}
                  >
                    <label className="mb-2 block text-sm font-medium">Risk Tolerance</label>
                    <Select defaultValue="moderate">
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Select risk tolerance" />
                      </SelectTrigger>
                      <SelectContent className="glass-dropdown">
                        <SelectItem value="conservative" className="hover:bg-white/10">
                          Conservative
                        </SelectItem>
                        <SelectItem value="moderate" className="hover:bg-white/10">
                          Moderate
                        </SelectItem>
                        <SelectItem value="aggressive" className="hover:bg-white/10">
                          Aggressive
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                  >
                    <Button className="w-full rounded-full glass-button-accent">Save Scenario</Button>
                  </motion.div>
                </div>

                <div className="md:col-span-2">
                  <ChartContainer
                    config={{
                      savings: {
                        label: "Projected Savings",
                        color: "#00f56e",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00f56e" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#00f56e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="age" axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" />
                        <YAxis
                          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                          axisLine={false}
                          tickLine={false}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="savings"
                          stroke="#00f56e"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorSavings)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                    className="mt-4 rounded-lg glass p-4"
                  >
                    <h3 className="mb-2 text-sm font-medium text-[#00f56e]">Retirement Projection</h3>
                    <p className="text-sm text-white/80">
                      At a {savingsRate}% savings rate and {investmentReturn}% return, you could have approximately{" "}
                      <strong>${(forecastData[forecastData.length - 1].savings / 1000000).toFixed(2)} million</strong>{" "}
                      by age {retirementAge}.
                    </p>
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="homebuying">
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-white/10">
                <p className="text-muted-foreground">Home buying scenario builder coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="debtpayoff">
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-white/10">
                <p className="text-muted-foreground">Debt payoff scenario builder coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}


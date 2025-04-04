"use client"

import { useState } from "react"
import { Search, Plus, ChevronDown, Filter, ArrowUpRight, BarChart3, Users, Zap } from "lucide-react"
import {
  LightCard,
  LightCardHeader,
  LightCardTitle,
  LightCardContent,
  LightCardFooter,
  LightProgress,
  LightTag,
} from "@/components/ui/light-card"

export function LightModeDashboard() {
  const [activeTab, setActiveTab] = useState("outlines")

  return (
    <div className="w-full bg-background">
      {/* Header */}
      <header className="light-header sticky top-0 z-10 flex h-16 items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search items...</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="light-button-primary flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Keywords</span>
          </button>
          <div className="flex items-center gap-1 text-sm">
            <span>Logged in as:</span>
            <span className="font-medium">Daniel Jameswood</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Outlines</h1>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-border">
          <div className="flex gap-6">
            {["Search Intent", "Webpages", "Keywords", "Articles", "Metrics", "Outlines"].map((tab) => (
              <button
                key={tab}
                className={`pb-3 text-sm font-medium ${
                  activeTab.toLowerCase() === tab.toLowerCase()
                    ? "border-b-2 border-primary text-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <LightCard>
            <LightCardHeader>
              <LightCardTitle>Refugee passport issues</LightCardTitle>
              <LightTag>Active</LightTag>
            </LightCardHeader>
            <LightCardContent>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium">90.2%</span>
                <span className="text-xs text-muted-foreground">Completion</span>
              </div>
              <LightProgress value={90.2} className="mb-4" />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Last updated:</span>
                  <span>2 days ago</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Keywords:</span>
                  <span>24</span>
                </div>
              </div>
            </LightCardContent>
            <LightCardFooter>
              <div className="flex w-full items-center justify-between">
                <span className="light-highlight-green text-xs">All Recommendations</span>
                <span className="flex items-center gap-1 text-xs font-medium text-primary">
                  Explore +1
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </LightCardFooter>
          </LightCard>

          {/* Card 2 */}
          <LightCard>
            <LightCardHeader>
              <LightCardTitle>Working Templates</LightCardTitle>
              <div className="flex items-center gap-2">
                <button className="rounded-full p-1 hover:bg-secondary">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="rounded-full p-1 hover:bg-secondary">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </LightCardHeader>
            <LightCardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-md border border-border/50 p-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Content Brief</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Actions</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border/50 p-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Reports</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Actions</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </LightCardContent>
          </LightCard>

          {/* Card 3 */}
          <LightCard highlight="yellow">
            <LightCardHeader>
              <LightCardTitle>Add Keywords</LightCardTitle>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFFA96]">
                <span className="text-xs font-bold">10</span>
              </div>
            </LightCardHeader>
            <LightCardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFA96]/50">
                  <Zap className="h-4 w-4 text-[#B0A800]" />
                </div>
                <input
                  type="text"
                  placeholder="Enter keywords..."
                  className="w-full rounded-md border border-border bg-white px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Filters</span>
                  <button className="text-xs text-primary">Clear all</button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <LightTag className="bg-secondary/70 text-foreground">
                    <span>Content</span>
                  </LightTag>
                  <LightTag className="bg-secondary/70 text-foreground">
                    <span>Format Options</span>
                  </LightTag>
                  <LightTag className="bg-secondary/70 text-foreground">
                    <span>Comparison</span>
                  </LightTag>
                </div>
              </div>
            </LightCardContent>
            <LightCardFooter>
              <div className="flex w-full items-center justify-between">
                <span className="text-xs text-muted-foreground">Current count: 10 Keywords</span>
                <button className="text-xs font-medium text-primary">Add</button>
              </div>
            </LightCardFooter>
          </LightCard>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <LightCard>
            <LightCardHeader>
              <LightCardTitle>Total Keywords</LightCardTitle>
            </LightCardHeader>
            <LightCardContent>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">2,201,250</span>
                <span className="text-sm text-green-500">+12.5%</span>
              </div>
            </LightCardContent>
          </LightCard>

          <LightCard>
            <LightCardHeader>
              <LightCardTitle>Indexed</LightCardTitle>
            </LightCardHeader>
            <LightCardContent>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">1,070</span>
                <span className="text-sm text-green-500">+5.2%</span>
              </div>
            </LightCardContent>
          </LightCard>

          <LightCard>
            <LightCardHeader>
              <LightCardTitle>Ranking</LightCardTitle>
            </LightCardHeader>
            <LightCardContent>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">Top 10</span>
                <span className="text-sm text-green-500">+2</span>
              </div>
            </LightCardContent>
          </LightCard>

          <LightCard>
            <LightCardHeader>
              <LightCardTitle>Traffic</LightCardTitle>
            </LightCardHeader>
            <LightCardContent>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">+15.4%</span>
                <span className="text-sm text-green-500">+3.2%</span>
              </div>
            </LightCardContent>
          </LightCard>
        </div>
      </main>
    </div>
  )
}


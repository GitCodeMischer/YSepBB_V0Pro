"use client"

import type React from "react"
import { Tabs as ShadcnTabs, TabsContent as ShadcnTabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface FixedHeightTabsProps extends React.ComponentPropsWithoutRef<typeof ShadcnTabs> {
  minHeight?: string
  children: React.ReactNode
}

export function FixedHeightTabs({ minHeight = "800px", className, children, ...props }: FixedHeightTabsProps) {
  return (
    <ShadcnTabs className={cn("w-full", className)} {...props}>
      {children}
    </ShadcnTabs>
  )
}

interface FixedHeightTabsContentProps extends React.ComponentPropsWithoutRef<typeof ShadcnTabsContent> {
  children: React.ReactNode
}

export function FixedHeightTabsContent({ className, children, ...props }: FixedHeightTabsContentProps) {
  return (
    <ShadcnTabsContent className={cn("min-h-[800px] md:min-h-[800px] w-full", className)} {...props}>
      <div className="w-full h-full">{children}</div>
    </ShadcnTabsContent>
  )
}

export { TabsList, TabsTrigger }


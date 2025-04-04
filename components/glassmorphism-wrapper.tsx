import { cn } from "@/lib/utils"
import type React from "react"

interface GlassmorphismWrapperProps {
  children: React.ReactNode
  className?: string
  type?: "default" | "card" | "dark" | "panel"
}

export function GlassmorphismWrapper({ children, className, type = "default" }: GlassmorphismWrapperProps) {
  const baseClass = "pointer-events-auto"

  const typeClasses = {
    default: "glass",
    card: "glass-card",
    dark: "glass-dark",
    panel: "glass-panel",
  }

  return <div className={cn(baseClass, typeClasses[type], className)}>{children}</div>
}


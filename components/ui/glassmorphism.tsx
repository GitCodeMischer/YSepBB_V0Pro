import type React from "react"
import { cn } from "@/lib/utils"

interface GlassmorphismProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "card" | "sidebar" | "dropdown" | "button"
}

export function Glassmorphism({ children, className, variant = "default", ...props }: GlassmorphismProps) {
  const baseClasses = "backdrop-blur-md border border-white/10"

  const variantClasses = {
    default: "bg-black/40",
    card: "bg-black/40 rounded-xl",
    sidebar: "bg-black/60",
    dropdown: "bg-black/60",
    button:
      "bg-[#00f56e]/10 border-[#00f56e]/20 hover:bg-[#00f56e]/20 hover:border-[#00f56e]/30 text-[#00f56e] transition-all duration-200",
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </div>
  )
}


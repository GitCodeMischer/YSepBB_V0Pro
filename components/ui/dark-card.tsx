import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface DarkCardProps {
  children: ReactNode
  className?: string
  gradient?: "none" | "purple" | "green" | "yellow" | "blue"
  hover?: boolean
}

export function DarkCard({ children, className, gradient = "none", hover = true }: DarkCardProps) {
  const { theme } = useTheme()

  return (
    <div
      className={cn(
        "rounded-xl border border-border/40 bg-card p-4 shadow-sm",
        hover && "transition-all duration-200 hover:shadow-md hover:border-border/60",
        theme === 'dark' && gradient === "purple" && "bg-gradient-to-br from-[#2a3a80]/40 to-[#4c2a84]/40",
        theme === 'dark' && gradient === "green" && "bg-gradient-to-br from-[#1a513a]/40 to-[#1a5146]/40",
        theme === 'dark' && gradient === "yellow" && "bg-gradient-to-br from-[#5e4a1a]/40 to-[#5e3a1a]/40",
        theme === 'dark' && gradient === "blue" && "bg-gradient-to-br from-[#1a3a5e]/40 to-[#1a4a5e]/40",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DarkCardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-2 flex items-center justify-between", className)}>{children}</div>
}

export function DarkCardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-sm font-medium", className)}>{children}</h3>
}

export function DarkCardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>
}

export function DarkCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function DarkCardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-4 flex items-center", className)}>{children}</div>
}


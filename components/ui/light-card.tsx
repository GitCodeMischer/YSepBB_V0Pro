import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LightCardProps {
  children: ReactNode
  className?: string
  highlight?: "none" | "yellow" | "green"
  hover?: boolean
}

export function LightCard({ children, className, highlight = "none", hover = true }: LightCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/30 bg-white p-4 shadow-sm",
        hover && "transition-all duration-200 hover:shadow-md hover:border-border/50",
        highlight === "yellow" && "bg-[#FFFA96]/20",
        highlight === "green" && "bg-[#BEFF7D]/20",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function LightCardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-3 flex items-center justify-between", className)}>{children}</div>
}

export function LightCardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-sm font-medium text-foreground", className)}>{children}</h3>
}

export function LightCardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>
}

export function LightCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function LightCardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-3 flex items-center text-xs text-muted-foreground", className)}>{children}</div>
}

export function LightProgress({ value, max = 100, className }: { value: number; max?: number; className?: string }) {
  const percentage = (value / max) * 100

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div
        className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export function LightTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium", className)}>
      {children}
    </span>
  )
}

export function LightHighlight({
  children,
  color = "yellow",
  className,
}: { children: ReactNode; color?: "yellow" | "green"; className?: string }) {
  return (
    <span
      className={cn(
        "rounded px-1 py-0.5 text-foreground",
        color === "yellow" && "bg-[#FFFA96]/40",
        color === "green" && "bg-[#BEFF7D]/40",
        className,
      )}
    >
      {children}
    </span>
  )
}


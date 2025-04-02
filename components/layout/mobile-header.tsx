"use client"

import { useState } from "react"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import SearchPopup from "@/components/search-popup"

interface MobileHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function MobileHeader({ sidebarOpen, onToggleSidebar }: MobileHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="relative">
            <div className="absolute -left-1 -top-1 h-8 w-8 rounded-full bg-accent-green/30 blur-lg dark:bg-accent-green/20"></div>
            <h1 className="relative text-xl font-bold">YSepBB</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-muted/50 hover:bg-muted"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <ThemeToggle />

          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-muted">JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <SearchPopup isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}


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
      <header className="fixed top-0 z-30 flex h-16 w-full items-center justify-between glass-header px-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="relative">
            <div className="absolute -left-1 -top-1 h-8 w-8 rounded-full bg-[#00f56e]/30 blur-lg"></div>
            <h1 className="relative text-xl font-bold">YSepBB</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full glass-button" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <ThemeToggle />

          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-black/40 text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <SearchPopup isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}


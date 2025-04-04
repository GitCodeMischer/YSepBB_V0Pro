import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { EnhancedNavigation } from "@/components/layout/enhanced-navigation"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { MobileNavBar } from "@/components/layout/mobile-nav-bar"
import { SidebarProvider } from "@/components/providers/sidebar-provider"

// Optimize font loading for better performance
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Add secondary font for headings
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171A21" }
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    template: "%s | FinTrack",
    default: "FinTrack - Personal Finance Dashboard",
  },
  description: "Track your finances, investments, and spending habits with FinTrack - the modern personal finance management app",
  keywords: ["finance", "budget", "investment", "personal finance", "money management", "expenses"],
  creator: "FinTrack Team",
  openGraph: {
    type: "website",
    title: "FinTrack - Personal Finance Dashboard",
    description: "Track your finances, investments, and spending habits with FinTrack",
    siteName: "FinTrack",
  },
  generator: 'v0.dev',
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-background text-foreground transition-colors duration-200">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange={false}
          storageKey="fintrack-theme"
        >
          <SidebarProvider>
            {/* Top navigation - visible on all screen sizes */}
            <EnhancedNavigation className="fixed top-0 left-0 right-0 z-50" />
            
            {/* Collapsible sidebar - hidden on mobile, integrated with the navigation header */}
            <CollapsibleSidebar className="hidden md:flex" />
            
            {/* Main content */}
            <main className="pt-16 md:pl-64 transition-all duration-300 min-h-screen w-full pb-16 md:pb-0 only-scroll-when-needed">
              <div className="container-default py-6 animate-fadeIn" suppressHydrationWarning>
                {children}
              </div>
            </main>
            
            {/* Bottom navigation - visible only on mobile */}
            <MobileNavBar className="md:hidden" />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import TresorIcon from "@/components/tresor-icon"

export default function HomePage() {
  // State to control animations on page load
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">YSepBB</div>
        <div className="flex space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-white hover:text-primary">Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline" className="text-white border-white hover:bg-white/10">Sign Up</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center container mx-auto px-4 py-12">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Secure Your <span className="text-primary">Financial</span> Future
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl">
            Experience our advanced financial management platform with secure asset tracking, investment insights, and growth opportunities.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-white hover:bg-white/10 flex items-center"
              >
                <span>Try Demo</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center items-center z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={loaded ? { 
              scale: 1,
              opacity: 1,
              y: [0, -10, 0] 
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <TresorIcon size={320} animated={true} darkMode={true} />
          </motion.div>
        </div>
      </main>
      
      <footer className="container mx-auto py-6 text-center text-white/60 text-sm">
        <p>© 2023 YSepBB Financial Services. All rights reserved.</p>
      </footer>
    </div>
  )
}


"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import Image from "next/image"

interface StackedCardCarouselProps {
  title?: string
  subtitle?: string
}

// Fake news data - could be loaded from an API later
const newsItems = [
  {
    id: 1,
    title: "Bitcoin Reaches New All-Time High of $92,000",
    category: "Crypto",
    date: "June 15, 2025",
    summary: "Bitcoin has surged to a new record as institutional adoption continues to grow globally.",
    image: "/placeholder.svg?height=200&width=400"
  },
  {
    id: 2,
    title: "Federal Reserve Introduces Digital Dollar Pilot",
    category: "Banking",
    date: "June 14, 2025",
    summary: "The Fed has launched a limited pilot program for its central bank digital currency (CBDC).",
    image: "/placeholder.svg?height=200&width=400"
  },
  {
    id: 3,
    title: "AI Trading Algorithms Outperform Traditional Methods",
    category: "Markets",
    date: "June 13, 2025",
    summary: "Machine learning models show unprecedented accuracy in market predictions and trading.",
    image: "/placeholder.svg?height=200&width=400"
  },
  {
    id: 4,
    title: "New Tax Incentives for Green Energy Investments",
    category: "Policy",
    date: "June 12, 2025",
    summary: "Government introduces major tax breaks for individuals investing in sustainable energy projects.",
    image: "/placeholder.svg?height=200&width=400"
  },
  {
    id: 5,
    title: "Quantum Computing Transforms Financial Modeling",
    category: "Technology",
    date: "June 11, 2025",
    summary: "Financial institutions adopt quantum computing to revolutionize risk assessment and forecasting.",
    image: "/placeholder.svg?height=200&width=400"
  }
]

export const StackedCardCarousel: React.FC<StackedCardCarouselProps> = ({ 
  title = "Financial News",
  subtitle = "Latest updates"
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1))
      }, 5000)
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1))
    // Reset autoplay timer
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      if (autoplay) {
        autoplayRef.current = setInterval(() => {
          setActiveIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1))
        }, 5000)
      }
    }
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1))
    // Reset autoplay timer
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      if (autoplay) {
        autoplayRef.current = setInterval(() => {
          setActiveIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1))
        }, 5000)
      }
    }
  }

  return (
    <div className="w-full max-w-[350px] mx-auto">
      {/* Title and navigation */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {title}
          </h3>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={`h-8 w-8 rounded-full ${
              isDarkMode 
                ? 'bg-secondary border-none hover:bg-secondary/80 text-white' 
                : 'border-primary/20 hover:bg-primary/10 text-primary'
            }`}
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`h-8 w-8 rounded-full ${
              isDarkMode 
                ? 'bg-secondary border-none hover:bg-secondary/80 text-white' 
                : 'border-primary/20 hover:bg-primary/10 text-primary'
            }`}
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Stacked card container */}
      <div className="relative h-[220px] w-full perspective-1000">
        {/* Render all cards */}
        {newsItems.map((news, index) => {
          // Calculate the distance from active card (accounting for circular navigation)
          const distance = Math.min(
            Math.abs(index - activeIndex),
            Math.abs(index - activeIndex + newsItems.length),
            Math.abs(index - activeIndex - newsItems.length)
          )
          
          // Only show cards that are within 3 positions of the active card
          if (distance > 3) return null
          
          // Determine if the card is before or after the active card
          let position: 'before' | 'active' | 'after';
          if (distance === 0) {
            position = 'active';
          } else {
            // Need to account for wrap-around when determining before/after
            const normalizedIndex = (index - activeIndex + newsItems.length) % newsItems.length;
            position = normalizedIndex > 0 && normalizedIndex <= newsItems.length / 2 ? 'after' : 'before';
          }
          
          return (
            <motion.div
              key={news.id}
              className={`absolute inset-0 rounded-xl overflow-hidden stacked-card ${
                isDarkMode 
                  ? 'bg-card shadow-lg shadow-black/50' 
                  : 'bg-card shadow-lg shadow-black/10'
              }`}
              initial={false}
              animate={{
                zIndex: 10 - distance,
                x: position === 'active' ? 0 : position === 'before' ? `-${distance * 10}%` : `${distance * 10}%`,
                y: distance * 8,
                rotateY: position === 'active' ? 0 : position === 'before' ? -(distance * 2) : (distance * 2),
                rotateZ: position === 'active' ? 0 : position === 'before' ? -(distance * 0.5) : (distance * 0.5),
                scale: 1 - (distance * 0.05),
                opacity: 1 - (distance * 0.15),
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 1.2
              }}
              onClick={() => {
                if (distance !== 0) {
                  setActiveIndex(index);
                }
              }}
              style={{ 
                cursor: distance === 0 ? "default" : "pointer",
              }}
            >
              <div className={`relative w-full h-full ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-card to-black text-white' 
                  : 'bg-gradient-to-br from-white to-card text-gray-800'
              }`}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>
                
                {/* Card content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                  {/* Header with category and date */}
                  <div className="flex justify-between items-start">
                    <Badge className={`${
                      isDarkMode 
                        ? 'bg-primary text-white' 
                        : 'bg-accent text-black'
                    } font-medium border-none`}>
                      {news.category}
                    </Badge>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {news.date}
                    </span>
                  </div>
                  
                  {/* Card body */}
                  <div className="mt-auto">
                    <h4 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {news.title}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } line-clamp-2`}>
                      {news.summary}
                    </p>
                  </div>
                </div>
                
                {/* Card shine effect */}
                <div className="card-shine"></div>
                
                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                  isDarkMode ? 'bg-primary' : 'bg-accent'
                }`}></div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Progress indicators */}
      <div className="flex justify-center mt-4 gap-1">
        {newsItems.map((_, index) => (
          <button
            key={`indicator-${index}`}
            className={`rounded-full transition-all ${
              index === activeIndex 
                ? (isDarkMode ? 'bg-primary w-4 h-2' : 'bg-accent w-4 h-2') 
                : (isDarkMode ? 'bg-white/30 w-2 h-2' : 'bg-gray-300 w-2 h-2')
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  )
} 
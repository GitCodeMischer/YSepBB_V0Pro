"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet } from "lucide-react"

interface SplashScreenProps {
  finishedLoading: boolean
  onComplete: () => void
}

export default function SplashScreen({ finishedLoading, onComplete }: SplashScreenProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Ensure splash screen shows for at least 2 seconds
    const timer = setTimeout(() => {
      if (finishedLoading) {
        onComplete()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [finishedLoading, onComplete])

  // Don't render anything during SSR
  if (!isMounted) return null

  return (
    <AnimatePresence>
      {!finishedLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-green to-accent-green/80"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Wallet className="h-12 w-12 text-accent-green-foreground" />
              <motion.div
                className="absolute -inset-1 rounded-2xl bg-accent-green/20 blur-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                }}
              />
            </motion.div>

            <motion.h1
              className="mb-4 text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              YSepBB
            </motion.h1>

            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-accent-green"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ArrowRight, Mail, X, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TresorIcon from "@/components/tresor-icon"

type AuthMode = "login" | "signup"

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, speed: number, opacity: number}>>([])
  
  useEffect(() => {
    setMounted(true)
    generateParticles()
    
    window.addEventListener('resize', generateParticles)
    
    return () => {
      window.removeEventListener('resize', generateParticles)
    }
  }, [])
  
  // Generate random particles for background
  const generateParticles = () => {
    const newParticles = []
    const count = Math.floor(window.innerWidth / 30)
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      })
    }
    
    setParticles(newParticles)
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black flex flex-col items-center justify-center p-4">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted && particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity
            }}
            animate={{
              y: ['0%', '100%'],
              opacity: [particle.opacity, 0]
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: particle.speed * 15,
                ease: "linear",
                repeatType: "loop"
              },
              opacity: {
                delay: particle.speed * 10,
                duration: particle.speed * 5,
                repeat: Infinity,
                repeatType: "loop"
              }
            }}
          />
        ))}
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/70 z-0" />
      
      {/* Main content */}
      <div className="w-full max-w-4xl flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 text-2xl font-bold text-white"
        >
          YSepBB Financial Services
        </motion.div>
        
        {/* Secure Icon (Tresor) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <TresorIcon size={200} animated={true} darkMode={true} />
        </motion.div>
        
        {/* Auth forms container */}
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={authMode}
              initial={{ opacity: 0, x: authMode === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: authMode === "login" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-2xl"
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {authMode === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-zinc-400 text-sm">
                  {authMode === "login" 
                    ? "Access your secure financial dashboard" 
                    : "Start managing your financial assets securely"}
                </p>
              </div>
              
              <form className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm text-zinc-400">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                    <Input 
                      type="email" 
                      placeholder="Your email address" 
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm text-zinc-400">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                    <Input 
                      type="password" 
                      placeholder="Your password" 
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                    />
                  </div>
                </div>
                
                {authMode === "signup" && (
                  <div className="space-y-1">
                    <label className="text-sm text-zinc-400">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                      <Input 
                        type="password" 
                        placeholder="Confirm your password" 
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                      />
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-black flex items-center justify-center" 
                >
                  <span>{authMode === "login" ? "Login" : "Create Account"}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-zinc-900/70 px-2 text-zinc-400">or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="icon" className="border-zinc-700 hover:bg-zinc-800">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.162 6.839 9.488.5.092.683-.217.683-.48 0-.237-.01-1.017-.014-1.845-2.782.603-3.369-1.338-3.369-1.338-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.09-.647.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 7.077c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.16 22 16.42 22 12c0-5.523-4.477-10-10-10z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="border-zinc-700 hover:bg-zinc-800">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="border-zinc-700 hover:bg-zinc-800">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M12 1C5.92 1 1 5.92 1 12c0 6.08 4.92 11 11 11s11-4.92 11-11c0-6.08-4.92-11-11-11zm3.33 16.5c-.15.15-.34.22-.53.22s-.38-.07-.53-.22L10.5 13.8c-.15-.15-.22-.34-.22-.53V7.5c0-.41.34-.75.75-.75s.75.34.75.75v5.36l3.5 3.5c.29.3.29.78 0 1.07z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </div>
                
                <div className="text-center mt-6">
                  <button 
                    type="button"
                    onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                    className="text-zinc-400 hover:text-primary text-sm transition-colors"
                  >
                    {authMode === "login" 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Log in"}
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Standard login/signup link */}
        <div className="mt-8">
          <Link 
            href={authMode === "login" ? "/auth/login" : "/auth/signup"}
            className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center"
          >
            <span>Go to Standard {authMode === "login" ? "Login" : "Signup"}</span>
            <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
} 
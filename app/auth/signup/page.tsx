"use client"

import { useState } from "react"
import Link from "next/link"
import { Apple, ArrowRight, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaMicrosoft, FaWallet, FaBitcoin } from "react-icons/fa"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const handleAuth = (provider: string) => {
    setIsLoading(provider)
    // Simulate auth process
    setTimeout(() => {
      setIsLoading(null)
      window.location.href = "/finance-tracker-dashboard"
    }, 1500)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const treasureVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const coinVariants = {
    hidden: { y: -10, opacity: 0, scale: 0 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: (i: number) => ({
      y: [0, -15, 0],
      x: [0, i * 5, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        delay: i * 0.1,
      },
    }),
  }

  const bitcoinVariants = {
    hidden: { y: -20, opacity: 0, rotate: -45 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.6 },
    },
    hover: {
      y: [0, -10, 0],
      rotate: [0, 15, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: (i: number) => ({
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        delay: i * 0.2,
      },
    }),
  }

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  }

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.6, transition: { delay: 1 } },
    hover: {
      opacity: [0.6, 0.8, 0.6],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

  return (
    <div className="flex h-screen flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div
        className="relative hidden h-full flex-col bg-gradient-to-b from-background to-background/90 p-10 text-foreground dark:from-background dark:to-background/90 lg:flex"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative z-20 flex items-center justify-between text-lg font-medium">
          <div className="flex items-center">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6 text-primary-foreground"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <div className="absolute -inset-0.5 rounded-lg bg-primary/20 blur-sm"></div>
            </div>
            <span className="ml-2 text-xl font-bold">FinTrack</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Financial Animation */}
        <div className="relative z-20 flex flex-1 items-center justify-center">
          <motion.div
            className="relative h-[400px] w-[400px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
              variants={glowVariants}
              animate={isHovering ? "hover" : "visible"}
            />

            {/* Treasure chest */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              variants={treasureVariants}
            >
              <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Chest base */}
                <motion.path
                  d="M20 40H140V100C140 110 130 120 120 120H40C30 120 20 110 20 100V40Z"
                  fill="#8B5A2B"
                  stroke="#5D3A1A"
                  strokeWidth="4"
                  variants={lineVariants}
                />
                {/* Chest top */}
                <motion.path
                  d="M15 40C15 30 25 20 35 20H125C135 20 145 30 145 40H15Z"
                  fill="#A67C52"
                  stroke="#5D3A1A"
                  strokeWidth="4"
                  variants={lineVariants}
                />
                {/* Chest details */}
                <motion.path
                  d="M40 40V100M60 40V100M80 40V100M100 40V100M120 40V100"
                  stroke="#5D3A1A"
                  strokeWidth="2"
                  variants={lineVariants}
                />
                <motion.path d="M20 60H140M20 80H140" stroke="#5D3A1A" strokeWidth="2" variants={lineVariants} />
                {/* Lock */}
                <motion.rect
                  x="70"
                  y="30"
                  width="20"
                  height="20"
                  rx="2"
                  fill="#FFD700"
                  stroke="#B8860B"
                  strokeWidth="2"
                  variants={lineVariants}
                />
              </svg>
            </motion.div>

            {/* Gold coins */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`coin-${i}`}
                className="absolute"
                style={{
                  left: `${50 + (i - 4) * 15}%`,
                  top: `${45 + (i % 3) * 10}%`,
                  zIndex: 10 - i,
                }}
                custom={i - 4}
                variants={coinVariants}
              >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="14" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
                  <path d="M15 7V23M9 15H21" stroke="#B8860B" strokeWidth="2" />
                </svg>
              </motion.div>
            ))}

            {/* Bitcoin */}
            <motion.div className="absolute left-[60%] top-[30%]" variants={bitcoinVariants}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#F7931A" />
                <path d="M27 17.5C27 14.5 24.5 13 21.5 13H16V22H21.5C24.5 22 27 20.5 27 17.5Z" fill="#FFFFFF" />
                <path d="M21.5 22H16V31H21.5C25 31 28 29 28 26.5C28 24 25 22 21.5 22Z" fill="#FFFFFF" />
                <path d="M18 13V10M22 13V10M18 31V34M22 31V34" stroke="#F7931A" strokeWidth="2" />
              </svg>
            </motion.div>

            {/* Dollar bills */}
            <motion.div className="absolute left-[30%] top-[35%]" custom={1} variants={coinVariants}>
              <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="30" rx="2" fill="#00A86B" />
                <circle cx="25" cy="15" r="8" fill="#FFFFFF" stroke="#00A86B" strokeWidth="1" />
                <path d="M25 7V23M21 11H29M21 19H29" stroke="#00A86B" strokeWidth="1" />
              </svg>
            </motion.div>

            {/* Stock charts */}
            <motion.div className="absolute left-[10%] top-[15%]" custom={0} variants={chartVariants}>
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="60" rx="4" fill="#111111" />
                <motion.path
                  d="M10 40L20 30L30 35L40 15L50 25L60 10L70 20"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  variants={lineVariants}
                />
                <motion.path
                  d="M10 50H70M10 10V50"
                  stroke="#FFFFFF"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  variants={lineVariants}
                />
              </svg>
            </motion.div>

            <motion.div className="absolute right-[10%] top-[20%]" custom={1} variants={chartVariants}>
              <svg width="70" height="50" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="70" height="50" rx="4" fill="#111111" />
                <motion.path
                  d="M10 20L20 15L30 25L40 10L50 30L60 15"
                  stroke="#FF4560"
                  strokeWidth="2"
                  variants={lineVariants}
                />
                <motion.path
                  d="M10 40H60M10 10V40"
                  stroke="#FFFFFF"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  variants={lineVariants}
                />
              </svg>
            </motion.div>

            <motion.div className="absolute left-[15%] bottom-[15%]" custom={2} variants={chartVariants}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="60" rx="30" fill="#111111" />
                <motion.path d="M30 10V30L45 45" stroke="#FFFFFF" strokeWidth="2" variants={lineVariants} />
                <motion.path
                  d="M30 30L15 45"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  variants={lineVariants}
                />
                <motion.circle
                  cx="30"
                  cy="30"
                  r="19"
                  stroke="#FFFFFF"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                  variants={lineVariants}
                />
              </svg>
            </motion.div>

            <motion.div className="absolute right-[15%] bottom-[20%]" custom={3} variants={chartVariants}>
              <svg width="90" height="50" viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="90" height="50" rx="4" fill="#111111" />
                <motion.rect x="10" y="30" width="10" height="10" fill="hsl(var(--primary))" variants={lineVariants} />
                <motion.rect x="25" y="20" width="10" height="20" fill="hsl(var(--primary))" variants={lineVariants} />
                <motion.rect x="40" y="25" width="10" height="15" fill="hsl(var(--primary))" variants={lineVariants} />
                <motion.rect x="55" y="15" width="10" height="25" fill="hsl(var(--primary))" variants={lineVariants} />
                <motion.rect x="70" y="10" width="10" height="30" fill="hsl(var(--primary))" variants={lineVariants} />
                <motion.path
                  d="M10 40H80"
                  stroke="#FFFFFF"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  variants={lineVariants}
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-20 mt-auto">
          <motion.blockquote
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-lg">
              "Since I started using FinTrack, I've gained complete visibility into my finances and have been able to
              plan for my future with confidence."
            </p>
            <footer className="text-sm text-muted-foreground">Alex Johnson</footer>
          </motion.blockquote>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-muted/5 p-8 backdrop-blur-sm dark:bg-muted/5 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">Sign up using your preferred method</p>
            </div>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>

          <Tabs defaultValue="social" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="social" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Social
              </TabsTrigger>
              <TabsTrigger value="web3" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Web3
              </TabsTrigger>
            </TabsList>
            <TabsContent value="social" className="mt-4 space-y-4">
              <Button
                variant="outline"
                className="btn-modern-outline w-full justify-between"
                onClick={() => handleAuth("google")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <FcGoogle className="mr-2 h-5 w-5" />
                  <span>Continue with Google</span>
                </div>
                {isLoading === "google" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="btn-modern-outline w-full justify-between"
                onClick={() => handleAuth("apple")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <Apple className="mr-2 h-5 w-5" />
                  <span>Continue with Apple</span>
                </div>
                {isLoading === "apple" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="btn-modern-outline w-full justify-between"
                onClick={() => handleAuth("microsoft")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <FaMicrosoft className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Continue with Microsoft</span>
                </div>
                {isLoading === "microsoft" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="btn-modern-outline w-full justify-between"
                onClick={() => handleAuth("passkey")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5"
                  >
                    <rect width="8" height="14" x="8" y="5" rx="1" />
                    <path d="M12 12h.01" />
                  </svg>
                  <span>Create a Passkey</span>
                </div>
                {isLoading === "passkey" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>
            </TabsContent>

            <TabsContent value="web3" className="mt-4 space-y-4">
              <Button
                variant="outline"
                className="btn-modern-outline w-full justify-between"
                onClick={() => handleAuth("metamask")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-orange-500"></div>
                  <span>Connect MetaMask</span>
                </div>
                {isLoading === "metamask" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="btn-modern-outline w-full justify-between"
                onClick={() => handleAuth("ledger")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-blue-500"></div>
                  <span>Connect Ledger</span>
                </div>
                {isLoading === "ledger" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="btn-modern-outline w-full justify-between"
                onClick={() => handleAuth("phantom")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <FaWallet className="mr-2 h-5 w-5 text-purple-500" />
                  <span>Connect Phantom</span>
                </div>
                {isLoading === "phantom" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="btn-modern-outline w-full justify-between"
                onClick={() => handleAuth("solflare")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <FaBitcoin className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Connect Solflare</span>
                </div>
                {isLoading === "solflare" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>
            </TabsContent>
          </Tabs>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="text-primary underline underline-offset-4 hover:text-primary/80">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary underline underline-offset-4 hover:text-primary/80">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}


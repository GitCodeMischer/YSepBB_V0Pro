"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Apple, ChevronRight, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaMicrosoft, FaWallet, FaBitcoin } from "react-icons/fa"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const handleAuth = (provider: string) => {
    setIsLoading(provider)

    // Simulate auth process
    setTimeout(() => {
      setIsLoading(null)

      // Store a simple auth token in localStorage to simulate authentication
      localStorage.setItem(
        "fintrack-auth",
        JSON.stringify({
          authenticated: true,
          user: {
            name: "John Doe",
            email: "john@example.com",
            avatar: "/placeholder-user.jpg",
          },
          token: "sample-jwt-token-would-go-here",
          provider,
        }),
      )

      // Redirect to dashboard
      window.location.href = "/finance-tracker-dashboard"
    }, 1500)
  }

  // SVG animation variants
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const floatVariants = {
    idle: { y: 0 },
    hover: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
      },
    },
  }

  const glowVariants = {
    idle: { opacity: 0.5, scale: 1 },
    hover: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
      },
    },
  }

  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div
        className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            fill
            alt="Authentication background"
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={floatVariants}
            whileHover="hover"
            className="relative mr-4"
          >
            <motion.div
              variants={glowVariants}
              animate={isHovering ? "hover" : "idle"}
              className="absolute -inset-2 rounded-full bg-accent-green/30 blur-lg"
            />
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative"
            >
              <motion.circle
                cx="20"
                cy="20"
                r="18"
                stroke="currentColor"
                strokeWidth="2"
                variants={circleVariants}
                initial="hidden"
                animate="visible"
                fill="rgba(0, 255, 102, 0.1)"
              />
              <motion.path
                d="M13 20C13 16.134 16.134 13 20 13C23.866 13 27 16.134 27 20C27 23.866 23.866 27 20 27C16.134 27 13 23.866 13 20Z"
                stroke="currentColor"
                strokeWidth="2"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                fill="none"
              />
              <motion.path
                d="M20 13V8"
                stroke="currentColor"
                strokeWidth="2"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.path
                d="M27 20H32"
                stroke="currentColor"
                strokeWidth="2"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.path
                d="M20 27V32"
                stroke="currentColor"
                strokeWidth="2"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.path
                d="M13 20H8"
                stroke="currentColor"
                strokeWidth="2"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.path
                d="M20 17V20L22 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
            </svg>
          </motion.div>
          <span>FinTrack</span>
        </div>
        <div className="relative z-20 mt-auto">
          <motion.blockquote
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-lg">
              "FinTrack has completely transformed how I manage my finances. The insights and analytics have helped me
              save more than ever before."
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </motion.blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account using your preferred method</p>
          </div>

          <Tabs defaultValue="social" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="web3">Web3</TabsTrigger>
            </TabsList>
            <TabsContent value="social" className="mt-4 space-y-4">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleAuth("google")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <FcGoogle className="mr-2 h-5 w-5" />
                  <span>Google</span>
                </div>
                {isLoading === "google" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleAuth("apple")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <Apple className="mr-2 h-5 w-5" />
                  <span>Apple</span>
                </div>
                {isLoading === "apple" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleAuth("microsoft")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <FaMicrosoft className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Microsoft</span>
                </div>
                {isLoading === "microsoft" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full justify-between"
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
                  <span>Passkey</span>
                </div>
                {isLoading === "passkey" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </Button>
            </TabsContent>

            <TabsContent value="web3" className="mt-4 space-y-4">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleAuth("metamask")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    width={20}
                    height={20}
                    alt="Metamask"
                    className="mr-2"
                  />
                  <span>MetaMask</span>
                </div>
                {isLoading === "metamask" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleAuth("ledger")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    width={20}
                    height={20}
                    alt="Ledger"
                    className="mr-2"
                  />
                  <span>Ledger</span>
                </div>
                {isLoading === "ledger" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleAuth("phantom")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <FaWallet className="mr-2 h-5 w-5 text-purple-500" />
                  <span>Phantom</span>
                </div>
                {isLoading === "phantom" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleAuth("solflare")}
                disabled={isLoading !== null}
              >
                <div className="flex items-center">
                  <FaBitcoin className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Solflare</span>
                </div>
                {isLoading === "solflare" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </Button>
            </TabsContent>
          </Tabs>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}


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
import { StackedCardCarousel } from "@/components/stacked-card-carousel"
import TresorIcon from "@/components/tresor-icon"

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
        "YSepBB-auth",
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
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Centered Tresor Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <TresorIcon size={350} animated={true} darkMode={true} />
          </div>
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
          <span>YSepBB</span>
        </div>
        <div className="mt-auto z-10 relative">
          <StackedCardCarousel title="Financial News" subtitle="Latest updates" />
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
          
          {/* Link to signup page */}
          <div className="text-center">
            <Link 
              href="/auth/signup" 
              className="inline-flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              <span>Don't have an account? Sign up</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}

{/* Add these CSS styles to the document */}
<style jsx global>{`
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-gpu {
    transform: translateZ(0);
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-5px) translateX(5px); }
    50% { transform: translateY(-10px) translateX(0); }
    75% { transform: translateY(-5px) translateX(-5px); }
  }
  
  @keyframes draw {
    from { stroke-dashoffset: 1000; }
    to { stroke-dashoffset: 0; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes flutter {
    0%, 100% { transform: rotate(0deg) translateY(0); }
    25% { transform: rotate(1deg) translateY(-2px); }
    50% { transform: rotate(0deg) translateY(-1px); }
    75% { transform: rotate(-1deg) translateY(-3px); }
  }
  
  .animate-float {
    animation: float 5s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: floatSlow 8s ease-in-out infinite;
  }
  
  .animate-draw, .animate-draw-delay, .animate-draw-delay-2 {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 4s forwards;
  }
  
  .animate-draw-delay {
    animation-delay: 0.5s;
  }
  
  .animate-draw-delay-2 {
    animation-delay: 1s;
  }
  
  .animate-pulse-subtle {
    animation: pulse 3s infinite;
  }
  
  .animate-rotate {
    transform-origin: 130px 120px;
    animation: rotate 10s linear infinite;
  }
  
  .safe-group, .bitcoin, .ethereum, .gold-bar-1, .gold-bar-2, .gold-bar-3,
  .cash-1, .cash-2, .cash-3, .cash-4, .candle-up, .candle-down, .data-text {
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .safe-body:hover, .hover-pop:hover {
    transform: scale(1.05) translateZ(50px);
  }
  
  .safe-door:hover, .hover-rotate:hover {
    transform: rotateY(15deg);
  }
  
  .safe-handle:hover, .hover-pull:hover {
    transform: translateX(3px);
  }
  
  .hover-rise:hover {
    transform: translateY(-15px);
  }
  
  .hover-rise-1:hover {
    transform: translateY(-5px) rotateX(10deg);
  }
  
  .hover-rise-2:hover {
    transform: translateY(-8px) rotateX(15deg);
  }
  
  .hover-rise-3:hover {
    transform: translateY(-12px) rotateX(20deg);
  }
  
  .hover-flutter:hover {
    animation: flutter 2s ease-in-out infinite;
  }
  
  .hover-rotate-3d:hover {
    transform: rotate3d(1, 1, 0, 30deg);
  }
  
  .hover-rotate-3d-alt:hover {
    transform: rotate3d(-1, 1, 0, 30deg);
  }
  
  .hover-rise-fast:hover {
    transform: translateY(-20px) scale(1.1);
  }
  
  .hover-sink-fast:hover {
    transform: translateY(20px) scale(1.1);
  }
  
  .coin-glow {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .bitcoin:hover .coin-glow, .ethereum:hover .coin-glow {
    opacity: 0.8;
  }
  
  .candle-glow {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .candle-up:hover .candle-glow, .candle-down:hover .candle-glow {
    opacity: 0.7;
  }
  
  .data-text:hover {
    transform: scale(1.2) translateZ(30px);
    text-shadow: 0 0 10px currentColor;
  }
  
  .glow-effect {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .safe-body:hover + .glow-effect {
    opacity: 0.7;
  }
`}</style>


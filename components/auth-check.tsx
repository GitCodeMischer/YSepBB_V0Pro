"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("fintrack-auth")

    if (!auth) {
      // Redirect to login page if not authenticated
      router.push("/auth/login")
    }
  }, [router])

  return <>{children}</>
}


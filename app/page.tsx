"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AppLayout from "@/components/layout/app-layout"

export default function Home() {
  const router = useRouter()

  // Redirect to dashboard on initial load
  useEffect(() => {
    router.push("/finance-tracker-dashboard")
  }, [router])

  return (
    <AppLayout>
      <div className="flex h-[50vh] items-center justify-center">
        <p>Redirecting to dashboard...</p>
      </div>
    </AppLayout>
  )
}


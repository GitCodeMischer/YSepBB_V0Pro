"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  // Redirect to dashboard on initial load
  useEffect(() => {
    router.push("/finance-tracker-dashboard")
  }, [router])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-lg bg-primary">
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">YB</span>
          </div>
        </div>
        <h1 className="mt-4 text-xl font-bold">YSepBB</h1>
        <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}


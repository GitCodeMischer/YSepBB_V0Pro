import Link from "next/link"
import { AlertTriangle, ArrowLeft, ServerCrash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ServiceUnavailablePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <ServerCrash className="mb-4 h-16 w-16 text-destructive" />
        <h1 className="mb-2 text-2xl font-bold">Service Unavailable</h1>
        <p className="mb-8 text-muted-foreground">
          We're experiencing some technical difficulties right now. Our team has been notified and is working to resolve
          the issue.
        </p>

        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Service Disruption</AlertTitle>
          <AlertDescription>
            Estimated recovery time: 30 minutes. Please check our status page for updates.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/status">Check Status</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


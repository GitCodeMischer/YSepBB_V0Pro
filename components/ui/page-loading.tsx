import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function PageLoading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground">Lade Daten...</p>
      </div>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const media = window.matchMedia(query)

    // Update the state initially
    setMatches(media.matches)

    // Set up the listener to update the state
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [query])

  // Return false on the server, the correct value on the client
  return mounted ? matches : false
}


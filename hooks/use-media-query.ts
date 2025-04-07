"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    // Initial check on client side only
    const media = window.matchMedia(query)
    
    // Initial value on mount
    setMatches(media.matches)
    
    // Update matches when media query changes
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }
    
    // Add the listener to watch for changes
    media.addEventListener("change", listener)
    
    // Clean up on unmount
    return () => media.removeEventListener("change", listener)
  }, [query])
  
  return matches
}


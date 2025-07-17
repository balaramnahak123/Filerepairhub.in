"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"

interface ConditionalAdsProps {
  children: React.ReactNode
}

export function ConditionalAds({ children }: ConditionalAdsProps) {
  const { hasActiveSubscription } = useAuth()

  // Don't show ads to premium users
  if (hasActiveSubscription) {
    return null
  }

  return <>{children}</>
}

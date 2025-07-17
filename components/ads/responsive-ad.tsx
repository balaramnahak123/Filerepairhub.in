"use client"

import { GoogleAdSense } from "./google-adsense"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface ResponsiveAdProps {
  adSlot: string
  className?: string
  title?: string
}

export function ResponsiveAd({ adSlot, className = "", title }: ResponsiveAdProps) {
  return (
    <div className={`ad-wrapper w-full ${className}`}>
      <div className="bg-gradient-to-r from-muted/50 to-muted/30 dark:from-muted/30 dark:to-muted/50 rounded-xl p-4 sm:p-6 border border-border/50 max-w-4xl mx-auto backdrop-blur-sm">
        <div className="flex items-center justify-center mb-4">
          <Badge variant="secondary" className="text-xs bg-background/80 border border-border/50">
            <ExternalLink className="h-3 w-3 mr-1" />
            {title || "Sponsored Content"}
          </Badge>
        </div>
        <div className="w-full overflow-hidden rounded-lg">
          <GoogleAdSense adSlot={adSlot} />
        </div>
      </div>
    </div>
  )
}

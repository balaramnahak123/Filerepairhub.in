import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubscriptionManager } from "@/components/subscription/subscription-manager"
import { ProtectedRoute } from "@/components/auth/protected-route"

export const metadata: Metadata = {
  title: "Subscription Plans - FilesHub | Unlock Premium Features",
  description:
    "Choose your subscription plan and unlock premium file downloads, extra storage, and exclusive features.",
  keywords: "subscription, premium, plans, upgrade, premium files, download",
}

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProtectedRoute>
          <SubscriptionManager />
        </ProtectedRoute>
      </main>
      <Footer />
    </div>
  )
}

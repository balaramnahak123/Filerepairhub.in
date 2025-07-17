import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export const metadata: Metadata = {
  title: "Dashboard - FilesHub | Manage Your Files",
  description: "Access your FilesHub dashboard to manage files, view statistics, and control your account settings.",
  keywords: "dashboard, file management, account overview, file statistics",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardContent />
      </main>
      <Footer />
    </div>
  )
}

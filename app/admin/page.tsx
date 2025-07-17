import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminPanel } from "@/components/admin/admin-panel"
import { ProtectedRoute } from "@/components/auth/protected-route"

export const metadata: Metadata = {
  title: "Admin Panel - FilesHub | System Administration",
  description: "FilesHub admin panel for managing users, files, and system settings.",
  keywords: "admin panel, user management, system administration",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      </main>
      <Footer />
    </div>
  )
}

import type { Metadata } from "next"
import { InitialSetup } from "@/components/admin/initial-setup"

export const metadata: Metadata = {
  title: "Initial Setup - FilesHub | Configure Your Admin Account",
  description: "Set up your first administrator account for FilesHub.",
  keywords: "setup, admin, configuration, initial setup",
}

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InitialSetup />
      </main>
    </div>
  )
}

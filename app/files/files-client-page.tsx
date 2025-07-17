"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FolderManager } from "@/components/folders/folder-manager"
import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"

function FilesContent() {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    )
  }

  return <FolderManager />
}

export default function FilesClientPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">File Manager</h1>
            <p className="text-xl text-muted-foreground">Browse and manage your files and folders</p>
          </div>
          <FilesContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}

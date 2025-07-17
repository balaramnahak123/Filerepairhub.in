import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignupForm } from "@/components/auth/signup-form"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Sign Up - FilesHub | Create Your Account",
  description: "Create your free FilesHub account to start uploading, sharing, and managing your files securely.",
  keywords: "sign up, register, create account, free account",
}

function SignupSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Skeleton className="h-8 w-40 mx-auto" />
      <Skeleton className="h-4 w-72 mx-auto" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <Suspense fallback={<SignupSkeleton />}>
            <SignupForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}

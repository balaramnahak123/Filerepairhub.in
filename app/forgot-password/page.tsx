import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Reset Password - FilesHub | Recover Your Account",
  description: "Reset your FilesHub password to regain access to your account and files.",
  keywords: "reset password, forgot password, account recovery",
}

function ForgotPasswordSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Skeleton className="h-8 w-40 mx-auto" />
      <Skeleton className="h-4 w-72 mx-auto" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <Suspense fallback={<ForgotPasswordSkeleton />}>
            <ForgotPasswordForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}

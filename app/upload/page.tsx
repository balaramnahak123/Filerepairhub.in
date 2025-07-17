import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUploadWithFolders } from "@/components/file-upload-with-folders"

export const metadata: Metadata = {
  title: "Upload Files - FilesHub | Free File Sharing Platform",
  description:
    "Upload and share your files instantly with FilesHub. Organize files in folders. Get shareable links in seconds.",
  keywords: "file upload, share files, file hosting, upload documents, share images, file transfer, folders",
}

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Upload Your Files</h1>
            <p className="text-xl text-muted-foreground">
              Organize files in folders and get shareable links instantly.
            </p>
          </div>
          <FileUploadWithFolders />
        </div>
      </main>
      <Footer />
    </div>
  )
}

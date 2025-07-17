import type { Metadata } from "next"
import FilesClientPage from "./files-client-page"

export const metadata: Metadata = {
  title: "My Files - FilesHub | Manage Your Uploaded Files",
  description:
    "Manage, organize, and share your uploaded files. View download statistics, edit sharing settings, and organize your file library.",
  keywords: "file management, my files, organize files, file library, download stats",
}

export default function FilesPage() {
  return <FilesClientPage />
}

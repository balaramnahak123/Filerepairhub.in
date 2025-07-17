"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Upload,
  File,
  ImageIcon,
  Video,
  Music,
  FileText,
  Archive,
  X,
  Copy,
  Share2,
  Download,
  Folder,
  Cloud,
  Zap,
  Shield,
  CheckCircle,
  Sparkles,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  folderId?: string
  url?: string
  shareUrl?: string
}

interface FolderOption {
  id: string
  name: string
  path: string
}

const mockFolders: FolderOption[] = [
  { id: "1", name: "Documents", path: "/Documents" },
  { id: "2", name: "Images", path: "/Images" },
  { id: "3", name: "Videos", path: "/Videos" },
  { id: "4", name: "Work Files", path: "/Documents/Work Files" },
  { id: "5", name: "Personal", path: "/Documents/Personal" },
]

export function FileUploadWithFolders() {
  const { isAdmin, user } = useAuth()
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string>("root")
  const { toast } = useToast()

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      folderId: selectedFolder || undefined,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 30, 100)
            if (newProgress >= 100) {
              clearInterval(interval)
              return {
                ...file,
                progress: 100,
                url: `/download/${fileId}`,
                shareUrl: `https://fileshub.com/share/${fileId}`,
              }
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 500)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 5 * 1024 * 1024 * 1024, // 5GB
  })

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied! ✨",
      description: "Share link copied to clipboard",
    })
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon
    if (type.startsWith("video/")) return Video
    if (type.startsWith("audio/")) return Music
    if (type.includes("text") || type.includes("document")) return FileText
    if (type.includes("zip") || type.includes("rar")) return Archive
    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFolderPath = (folderId?: string) => {
    if (!folderId || folderId === "root") return "Root Directory"
    const folder = mockFolders.find((f) => f.id === folderId)
    return folder ? folder.path : "Unknown Folder"
  }

  if (!isAdmin) {
    return (
      <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-red-50 to-orange-50">
        <CardContent className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white mb-6 shadow-lg">
            <Shield className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Upload Restricted</h3>
          <p className="text-gray-600 mb-6 text-lg">Only administrators can upload files to FilesHub.</p>
          <p className="text-sm text-gray-500">
            {user ? "Contact an administrator for upload privileges." : "Please sign in with an admin account."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Folder Selection */}
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Folder className="h-6 w-6" />
              </div>
              <div>
                <Label htmlFor="folder-select" className="text-lg font-semibold text-gray-900">
                  Upload Destination
                </Label>
                <p className="text-sm text-gray-600">Choose where to save your files</p>
              </div>
            </div>

            <Select value={selectedFolder} onValueChange={setSelectedFolder}>
              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-purple-300 transition-colors duration-200">
                <SelectValue placeholder="Select folder (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="root">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                      <Folder className="h-4 w-4" />
                    </div>
                    <span>Root Directory</span>
                  </div>
                </SelectItem>
                {mockFolders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <Folder className="h-4 w-4" />
                      </div>
                      <span>{folder.path}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedFolder !== "root" && (
              <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-200">
                <p className="text-sm text-gray-600">
                  Files will be uploaded to:{" "}
                  <span className="font-semibold text-purple-600">{getFolderPath(selectedFolder)}</span>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="overflow-hidden border-0 shadow-2xl">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`relative border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 scale-105"
                : "border-gray-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:scale-102"
            }`}
          >
            <input {...getInputProps()} />

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>

            <div className="relative z-10">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg transition-all duration-300 ${
                  isDragActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-110"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110"
                }`}
              >
                <Cloud className="h-10 w-10 text-white" />
              </div>

              {isDragActive ? (
                <div>
                  <p className="text-2xl font-bold text-purple-600 mb-2">Drop the files here! ✨</p>
                  <p className="text-gray-600">Release to upload your files</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-bold mb-4 text-gray-900">Drag & drop files here, or click to browse</p>
                  <p className="text-gray-600 mb-6 text-lg">Support for all file types • Max 5GB per file</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 px-8 py-3 text-lg">
                    <Upload className="mr-3 h-5 w-5" />
                    Choose Files
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Uploaded Files</h3>
            </div>

            <div className="space-y-4">
              {files.map((file) => {
                const FileIcon = getFileIcon(file.type)
                const isComplete = file.progress >= 100

                return (
                  <div
                    key={file.id}
                    className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                          <FileIcon className="h-6 w-6" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-lg font-semibold text-gray-900 truncate">{file.name}</p>
                            <p className="text-sm text-gray-600">{getFolderPath(file.folderId)}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
                              {formatFileSize(file.size)}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(file.id)}
                              className="h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {!isComplete ? (
                          <div className="space-y-3">
                            <Progress value={file.progress} className="h-3 bg-gray-200" />
                            <div className="flex items-center space-x-2">
                              <Zap className="h-4 w-4 text-blue-500" />
                              <p className="text-sm text-gray-600 font-medium">
                                Uploading... {Math.round(file.progress)}%
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Uploaded
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(file.shareUrl!)}
                              className="hover:bg-blue-50 hover:border-blue-300"
                            >
                              <Copy className="h-3 w-3 mr-2" />
                              Copy Link
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-purple-50 hover:border-purple-300 bg-transparent"
                            >
                              <Share2 className="h-3 w-3 mr-2" />
                              Share
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-green-50 hover:border-green-300 bg-transparent"
                            >
                              <Download className="h-3 w-3 mr-2" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Tips */}
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-50">
        <CardContent className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Pro Tips</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-lg flex items-center">
                <Folder className="h-5 w-5 mr-2 text-amber-600" />
                Folder Organization
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Select a folder before uploading
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Create folders to organize files
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Use nested folders for better structure
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Files without folder go to root directory
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-lg flex items-center">
                <Shield className="h-5 w-5 mr-2 text-amber-600" />
                File Limits
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Maximum file size: 5GB
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Files stored for 30 days
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Unlimited downloads
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Password protection available
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

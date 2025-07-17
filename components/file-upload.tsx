"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Upload, File, ImageIcon, Video, Music, FileText, Archive, X, Copy, Share2, Download } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  url?: string
  shareUrl?: string
}

export function FileUpload() {
  const { isAdmin, user } = useAuth()
  const [files, setFiles] = useState<UploadedFile[]>([])
  const { toast } = useToast()

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
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
      title: "Copied!",
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

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Upload Restricted</h3>
          <p className="text-muted-foreground mb-4">Only administrators can upload files to FilesHub.</p>
          <p className="text-sm text-muted-foreground">
            {user ? "Contact an administrator for upload privileges." : "Please sign in with an admin account."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <Card>
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">Support for all file types • Max 5GB per file</p>
                <Button>Choose Files</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
            <div className="space-y-4">
              {files.map((file) => {
                const FileIcon = getFileIcon(file.type)
                const isComplete = file.progress >= 100

                return (
                  <div key={file.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <FileIcon className="h-8 w-8 text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{formatFileSize(file.size)}</Badge>
                          <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)} className="h-6 w-6">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {!isComplete ? (
                        <div className="space-y-2">
                          <Progress value={file.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">Uploading... {Math.round(file.progress)}%</p>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Badge variant="default" className="bg-green-500">
                            ✓ Uploaded
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => copyToClipboard(file.shareUrl!)}>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy Link
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Tips */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upload Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Supported Formats</h4>
              <ul className="space-y-1">
                <li>• Documents: PDF, DOC, DOCX, TXT</li>
                <li>• Images: JPG, PNG, GIF, SVG</li>
                <li>• Videos: MP4, AVI, MOV, WMV</li>
                <li>• Archives: ZIP, RAR, 7Z</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">File Limits</h4>
              <ul className="space-y-1">
                <li>• Maximum file size: 5GB</li>
                <li>• Files stored for 30 days</li>
                <li>• Unlimited downloads</li>
                <li>• Password protection available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

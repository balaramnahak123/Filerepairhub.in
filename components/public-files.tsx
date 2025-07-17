"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Search, Download, Eye, Calendar, FileText, ImageIcon, Video, Music, Archive, File } from "lucide-react"

interface PublicFile {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  downloads: number
  shareUrl: string
  uploadedBy: string
}

const mockPublicFiles: PublicFile[] = [
  {
    id: "1",
    name: "company-presentation.pdf",
    type: "application/pdf",
    size: 2048000,
    uploadDate: "2024-01-15",
    downloads: 45,
    shareUrl: "https://fileshub.com/share/abc123",
    uploadedBy: "Admin",
  },
  {
    id: "2",
    name: "product-catalog.zip",
    type: "application/zip",
    size: 15728640,
    uploadDate: "2024-01-14",
    downloads: 12,
    shareUrl: "https://fileshub.com/share/def456",
    uploadedBy: "Admin",
  },
  {
    id: "3",
    name: "tutorial-video.mp4",
    type: "video/mp4",
    size: 52428800,
    uploadDate: "2024-01-13",
    downloads: 89,
    shareUrl: "https://fileshub.com/share/ghi789",
    uploadedBy: "Admin",
  },
]

export function PublicFiles() {
  const [files] = useState<PublicFile[]>(mockPublicFiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const { user, isAdmin } = useAuth()
  const { toast } = useToast()

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon
    if (type.startsWith("video/")) return Video
    if (type.startsWith("audio/")) return Music
    if (type.includes("text") || type.includes("document") || type.includes("pdf")) return FileText
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleDownload = (file: PublicFile) => {
    toast({
      title: "Download started",
      description: `Downloading ${file.name}`,
    })
    // Simulate download
    console.log("Downloading:", file.name)
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    if (selectedTab === "images") return matchesSearch && file.type.startsWith("image/")
    if (selectedTab === "documents")
      return (
        matchesSearch && (file.type.includes("text") || file.type.includes("document") || file.type.includes("pdf"))
      )
    if (selectedTab === "videos") return matchesSearch && file.type.startsWith("video/")
    if (selectedTab === "archives") return matchesSearch && (file.type.includes("zip") || file.type.includes("rar"))

    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Available Files</h2>
          <p className="text-muted-foreground">Browse and download files uploaded by administrators</p>
        </div>
        {!isAdmin && (
          <Badge variant="secondary">
            <Eye className="h-3 w-3 mr-1" />
            View Only
          </Badge>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Public Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="archives">Archives</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-6">
              <div className="space-y-4">
                {filteredFiles.map((file) => {
                  const FileIcon = getFileIcon(file.type)

                  return (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <FileIcon className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{formatFileSize(file.size)}</span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(file.uploadDate)}
                            </span>
                            <span className="flex items-center">
                              <Download className="h-3 w-3 mr-1" />
                              {file.downloads} downloads
                            </span>
                            <span>By {file.uploadedBy}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleDownload(file)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  )
                })}

                {filteredFiles.length === 0 && (
                  <div className="text-center py-12">
                    <File className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No files found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? "Try adjusting your search terms" : "No files are currently available"}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

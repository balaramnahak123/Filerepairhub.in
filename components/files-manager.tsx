"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Share2,
  Trash2,
  Eye,
  Copy,
  Calendar,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  File,
  Crown,
  Lock,
  Star,
  Upload,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

interface FileItem {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  downloads: number
  shareUrl: string
  isPublic: boolean
  isPremium: boolean
  price: number
  category: string
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "presentation.pdf",
    type: "application/pdf",
    size: 2048000,
    uploadDate: "2024-01-15",
    downloads: 45,
    shareUrl: "https://fileshub.com/share/abc123",
    isPublic: true,
    isPremium: false,
    price: 0,
    category: "document",
  },
  {
    id: "2",
    name: "premium-template.zip",
    type: "application/zip",
    size: 15728640,
    uploadDate: "2024-01-14",
    downloads: 12,
    shareUrl: "https://fileshub.com/share/def456",
    isPublic: true,
    isPremium: true,
    price: 4.99,
    category: "template",
  },
  {
    id: "3",
    name: "exclusive-video.mp4",
    type: "video/mp4",
    size: 52428800,
    uploadDate: "2024-01-13",
    downloads: 89,
    shareUrl: "https://fileshub.com/share/ghi789",
    isPublic: false,
    isPremium: true,
    price: 9.99,
    category: "video",
  },
  {
    id: "4",
    name: "report.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 1024000,
    uploadDate: "2024-01-12",
    downloads: 23,
    shareUrl: "https://fileshub.com/share/jkl012",
    isPublic: true,
    isPremium: false,
    price: 0,
    category: "document",
  },
  {
    id: "5",
    name: "premium-graphics.psd",
    type: "application/photoshop",
    size: 25600000,
    uploadDate: "2024-01-11",
    downloads: 67,
    shareUrl: "https://fileshub.com/share/mno345",
    isPublic: true,
    isPremium: true,
    price: 12.99,
    category: "design",
  },
]

export function FilesManager() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const { isAdmin, user, hasActiveSubscription } = useAuth()

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

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    if (selectedTab === "free") return matchesSearch && !file.isPremium
    if (selectedTab === "premium") return matchesSearch && file.isPremium
    if (selectedTab === "images") return matchesSearch && file.type.startsWith("image/")
    if (selectedTab === "documents")
      return (
        matchesSearch && (file.type.includes("text") || file.type.includes("document") || file.type.includes("pdf"))
      )
    if (selectedTab === "videos") return matchesSearch && file.type.startsWith("video/")

    return matchesSearch
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied! ✨",
      description: "Share link copied to clipboard",
    })
  }

  const handleDownload = (file: FileItem) => {
    if (file.isPremium && !hasActiveSubscription && !isAdmin) {
      toast({
        title: "Premium Content 👑",
        description: "Subscribe to download premium files!",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Download Started ⬇️",
      description: `Downloading ${file.name}`,
    })
  }

  const deleteFile = (fileId: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can delete files.",
        variant: "destructive",
      })
      return
    }
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
    toast({
      title: "File deleted",
      description: "The file has been successfully deleted.",
    })
  }

  const totalFiles = files.length
  const freeFiles = files.filter((f) => !f.isPremium).length
  const premiumFiles = files.filter((f) => f.isPremium).length
  const totalSize = files.reduce((acc, file) => acc + file.size, 0)
  const totalDownloads = files.reduce((acc, file) => acc + file.downloads, 0)

  if (!user) {
    return (
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>Please sign in to view and download files.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Subscription Status Alert */}
      {!hasActiveSubscription && !isAdmin && (
        <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <Crown className="h-4 w-4 text-amber-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-amber-800">
              <strong>Free Account:</strong> You can view all files but can only download free files. Subscribe to
              download premium content!
            </span>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
            >
              <Link href="/subscription">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Now
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Files</p>
                <p className="text-2xl font-bold text-gray-900">{totalFiles}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <File className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Free Files</p>
                <p className="text-2xl font-bold text-gray-900">{freeFiles}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Download className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Premium Files</p>
                <p className="text-2xl font-bold text-gray-900">{premiumFiles}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Crown className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900">{formatFileSize(totalSize)}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <Archive className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                <Download className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-purple-300"
              />
            </div>
            <Button variant="outline" className="border-gray-200 hover:border-purple-300 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card className="overflow-hidden border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <File className="h-5 w-5" />
              <span>Your Files</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {hasActiveSubscription && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium Access
                </Badge>
              )}
              {isAdmin && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Administrator
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="p-6 pb-0">
              <TabsList className="grid w-full grid-cols-6 bg-gray-100">
                <TabsTrigger value="all">All Files</TabsTrigger>
                <TabsTrigger value="free">Free</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={selectedTab} className="mt-0">
              <div className="p-6 space-y-3">
                {filteredFiles.map((file) => {
                  const FileIcon = getFileIcon(file.type)
                  const canDownload = !file.isPremium || hasActiveSubscription || isAdmin

                  return (
                    <div
                      key={file.id}
                      className={`p-6 border rounded-2xl transition-all duration-200 hover:shadow-lg ${
                        file.isPremium
                          ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-xl ${
                              file.isPremium
                                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                : "bg-gradient-to-r from-gray-500 to-gray-600"
                            } text-white`}
                          >
                            <FileIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{file.name}</h3>
                              {file.isPremium && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Premium ${file.price}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span>{formatFileSize(file.size)}</span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(file.uploadDate)}
                              </span>
                              <span className="flex items-center">
                                <Download className="h-3 w-3 mr-1" />
                                {file.downloads} downloads
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge variant={file.isPublic ? "default" : "secondary"}>
                            {file.isPublic ? "Public" : "Private"}
                          </Badge>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(file)}
                            disabled={!canDownload}
                            className={`${
                              canDownload ? "hover:bg-green-50 hover:border-green-300" : "opacity-50 cursor-not-allowed"
                            } bg-transparent`}
                          >
                            {!canDownload ? (
                              <>
                                <Lock className="h-4 w-4 mr-2" />
                                Premium
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </>
                            )}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(file.shareUrl)}
                            className="hover:bg-purple-50 hover:border-purple-300 bg-transparent"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Link
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share Settings
                              </DropdownMenuItem>
                              {isAdmin && (
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600"
                                  onClick={() => deleteFile(file.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {filteredFiles.length === 0 && (
                  <div className="text-center py-12">
                    <File className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-gray-900">No files found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm ? "Try adjusting your search terms" : "Upload your first file to get started"}
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                    </Button>
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

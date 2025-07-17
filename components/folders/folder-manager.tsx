"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import {
  Folder,
  FolderPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  FolderOpen,
  Home,
  ChevronRight,
  File,
  Download,
  Eye,
  Share2,
} from "lucide-react"

interface FolderItem {
  id: string
  name: string
  parent_id: string | null
  created_by: string
  created_at: string
  is_public: boolean
  file_count?: number
}

interface FileItem {
  id: string
  name: string
  original_name: string
  file_type: string
  file_size: number
  folder_id: string | null
  uploaded_by: string
  upload_date: string
  download_count: number
  is_public: boolean
  share_url: string
}

const mockFolders: FolderItem[] = [
  {
    id: "1",
    name: "Documents",
    parent_id: null,
    created_by: "admin",
    created_at: "2024-01-01",
    is_public: true,
    file_count: 5,
  },
  {
    id: "2",
    name: "Images",
    parent_id: null,
    created_by: "admin",
    created_at: "2024-01-01",
    is_public: true,
    file_count: 12,
  },
  {
    id: "3",
    name: "Work Files",
    parent_id: "1",
    created_by: "admin",
    created_at: "2024-01-02",
    is_public: false,
    file_count: 3,
  },
  {
    id: "4",
    name: "Personal",
    parent_id: "1",
    created_by: "admin",
    created_at: "2024-01-02",
    is_public: true,
    file_count: 2,
  },
]

const mockFiles: FileItem[] = [
  {
    id: "f1",
    name: "presentation.pdf",
    original_name: "presentation.pdf",
    file_type: "application/pdf",
    file_size: 2048000,
    folder_id: "1",
    uploaded_by: "admin",
    upload_date: "2024-01-15",
    download_count: 45,
    is_public: true,
    share_url: "https://fileshub.com/share/abc123",
  },
  {
    id: "f2",
    name: "logo.png",
    original_name: "logo.png",
    file_type: "image/png",
    file_size: 512000,
    folder_id: "2",
    uploaded_by: "admin",
    upload_date: "2024-01-14",
    download_count: 23,
    is_public: true,
    share_url: "https://fileshub.com/share/def456",
  },
]

export function FolderManager() {
  const [folders, setFolders] = useState<FolderItem[]>(mockFolders)
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [newFolderName, setNewFolderName] = useState("")
  const [newFolderParent, setNewFolderParent] = useState<string>("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [breadcrumbs, setBreadcrumbs] = useState<FolderItem[]>([])

  const { isAdmin } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    updateBreadcrumbs()
  }, [currentFolderId])

  const updateBreadcrumbs = () => {
    if (!currentFolderId) {
      setBreadcrumbs([])
      return
    }

    const path: FolderItem[] = []
    let folderId = currentFolderId

    while (folderId) {
      const folder = folders.find((f) => f.id === folderId)
      if (folder) {
        path.unshift(folder)
        folderId = folder.parent_id
      } else {
        break
      }
    }

    setBreadcrumbs(path)
  }

  const getCurrentFolderContents = () => {
    const subfolders = folders.filter((f) => f.parent_id === currentFolderId)
    const folderFiles = files.filter((f) => f.folder_id === currentFolderId)
    return { subfolders, folderFiles }
  }

  const createFolder = () => {
    if (!newFolderName.trim()) return

    const newFolder: FolderItem = {
      id: Date.now().toString(),
      name: newFolderName,
      parent_id: newFolderParent || currentFolderId,
      created_by: "admin",
      created_at: new Date().toISOString(),
      is_public: true,
      file_count: 0,
    }

    setFolders([...folders, newFolder])
    setNewFolderName("")
    setNewFolderParent("")
    setIsCreateDialogOpen(false)

    toast({
      title: "Folder created",
      description: `Folder "${newFolderName}" has been created successfully.`,
    })
  }

  const deleteFolder = (folderId: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can delete folders.",
        variant: "destructive",
      })
      return
    }

    setFolders(folders.filter((f) => f.id !== folderId))
    toast({
      title: "Folder deleted",
      description: "Folder has been deleted successfully.",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const { subfolders, folderFiles } = getCurrentFolderContents()

  return (
    <div className="space-y-6">
      {/* Header with Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentFolderId(null)}
            className="flex items-center space-x-1"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Button>

          {breadcrumbs.map((folder, index) => (
            <div key={folder.id} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentFolderId(folder.id)}
                className="flex items-center space-x-1"
              >
                <Folder className="h-4 w-4" />
                <span>{folder.name}</span>
              </Button>
            </div>
          ))}
        </div>

        {isAdmin && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>Create a new folder to organize your files.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="folderName">Folder Name</Label>
                  <Input
                    id="folderName"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Enter folder name"
                  />
                </div>
                <div>
                  <Label htmlFor="parentFolder">Parent Folder</Label>
                  <Select value={newFolderParent} onValueChange={setNewFolderParent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent folder (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="root">Root Directory</SelectItem>
                      {folders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createFolder}>Create Folder</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Folders Grid */}
      {subfolders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Folder className="h-5 w-5" />
              <span>Folders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {subfolders.map((folder) => (
                <Card
                  key={folder.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setCurrentFolderId(folder.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FolderOpen className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium">{folder.name}</p>
                          <p className="text-sm text-muted-foreground">{folder.file_count} files</p>
                        </div>
                      </div>

                      {isAdmin && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteFolder(folder.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>

                    <div className="mt-2">
                      <Badge variant={folder.is_public ? "default" : "secondary"}>
                        {folder.is_public ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Files List */}
      {folderFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <File className="h-5 w-5" />
              <span>Files</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {folderFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-3">
                    <File className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{file.original_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.file_size)} • {file.download_count} downloads
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant={file.is_public ? "default" : "secondary"}>
                      {file.is_public ? "Public" : "Private"}
                    </Badge>

                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>

                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>

                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {subfolders.length === 0 && folderFiles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Folder className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">This folder is empty</h3>
            <p className="text-muted-foreground mb-4">
              {isAdmin ? "Create folders or upload files to get started." : "No files are available in this folder."}
            </p>
            {isAdmin && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Create Folder
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

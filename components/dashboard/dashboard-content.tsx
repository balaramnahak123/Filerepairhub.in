"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Upload, Files, Download, Share2, User, Calendar, HardDrive, Activity } from "lucide-react"

export function DashboardContent() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const stats = [
    {
      title: "Total Files",
      value: "24",
      description: "Files uploaded",
      icon: Files,
      color: "text-blue-600",
    },
    {
      title: "Storage Used",
      value: "2.4 GB",
      description: "of 5 GB available",
      icon: HardDrive,
      color: "text-green-600",
    },
    {
      title: "Total Downloads",
      value: "156",
      description: "This month",
      icon: Download,
      color: "text-purple-600",
    },
    {
      title: "Shared Files",
      value: "12",
      description: "Currently active",
      icon: Share2,
      color: "text-orange-600",
    },
  ]

  const recentFiles = [
    {
      name: "presentation.pdf",
      size: "2.4 MB",
      uploadDate: "2 hours ago",
      downloads: 5,
      type: "PDF",
    },
    {
      name: "vacation-photos.zip",
      size: "15.2 MB",
      uploadDate: "1 day ago",
      downloads: 12,
      type: "Archive",
    },
    {
      name: "demo-video.mp4",
      size: "45.8 MB",
      uploadDate: "3 days ago",
      downloads: 23,
      type: "Video",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {user.user_metadata?.full_name || "User"}!</h1>
        <p className="text-muted-foreground">Here's an overview of your FilesHub account and recent activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-6 flex-col space-y-2">
              <Link href="/upload">
                <Upload className="h-8 w-8" />
                <span>Upload Files</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-2 bg-transparent">
              <Link href="/files">
                <Files className="h-8 w-8" />
                <span>Manage Files</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-2 bg-transparent">
              <Link href="/settings">
                <User className="h-8 w-8" />
                <span>Account Settings</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Files */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Files</CardTitle>
          <CardDescription>Your recently uploaded files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Files className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{file.type}</Badge>
                  <div className="text-sm text-muted-foreground">{file.downloads} downloads</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/files">View All Files</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email</span>
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Member Since</span>
              </div>
              <p className="text-sm text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Account Status</span>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Plan</span>
              </div>
              <Badge variant="secondary">Free Plan</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

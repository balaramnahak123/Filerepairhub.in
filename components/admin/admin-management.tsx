"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  Crown,
  Mail,
  Calendar,
  UserPlus,
  Shield,
  AlertTriangle,
  CheckCircle,
  Copy,
  ExternalLink,
} from "lucide-react"

interface UserWithRole {
  user_id: string
  role: "admin" | "user"
  created_at: string
  auth: {
    users: {
      email: string
      user_metadata: {
        full_name?: string
      }
      created_at: string
    }
  }
}

export function AdminManagement() {
  const [users, setUsers] = useState<UserWithRole[]>([])
  const [loading, setLoading] = useState(true)
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [promoting, setPromoting] = useState(false)
  const { isAdmin } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (isAdmin) {
      fetchUsers()
    }
  }, [isAdmin])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()

      if (response.ok) {
        setUsers(data.users || [])
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch users",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const promoteToAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    setPromoting(true)
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newAdminEmail,
          role: "admin",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
        })
        setNewAdminEmail("")
        fetchUsers() // Refresh the list
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to promote user",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to promote user",
        variant: "destructive",
      })
    } finally {
      setPromoting(false)
    }
  }

  const demoteAdmin = async (email: string) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          role: "user",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
        })
        fetchUsers() // Refresh the list
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to demote admin",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to demote admin",
        variant: "destructive",
      })
    }
  }

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/signup`
    navigator.clipboard.writeText(inviteLink)
    toast({
      title: "Copied!",
      description: "Signup link copied to clipboard",
    })
  }

  if (!isAdmin) {
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>Access denied. Only administrators can manage users.</AlertDescription>
      </Alert>
    )
  }

  const adminCount = users.filter((user) => user.role === "admin").length
  const userCount = users.filter((user) => user.role === "user").length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminCount}</div>
            <p className="text-xs text-muted-foreground">Admin accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">Standard accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Admin */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5" />
            <span>Promote User to Admin</span>
          </CardTitle>
          <CardDescription>
            Grant administrator privileges to existing users. They must already have an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter user email to promote to admin"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && promoteToAdmin()}
                />
              </div>
            </div>
            <Button onClick={promoteToAdmin} disabled={promoting}>
              <Crown className="h-4 w-4 mr-2" />
              {promoting ? "Promoting..." : "Promote to Admin"}
            </Button>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> The user must already have an account on FilesHub. Share the signup link with
              new users first.
            </AlertDescription>
          </Alert>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={copyInviteLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Signup Link
            </Button>
            <Button variant="outline" asChild>
              <a href="/signup" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Signup Page
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading users...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.user_id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        user.role === "admin" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user.role === "admin" ? <Crown className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium">{user.auth.users.user_metadata?.full_name || "Unknown User"}</p>
                      <p className="text-sm text-muted-foreground">{user.auth.users.email}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Joined {new Date(user.auth.users.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role === "admin" ? "Administrator" : "User"}
                    </Badge>

                    {user.role === "user" ? (
                      <Button variant="outline" size="sm" onClick={() => promoteToAdmin()}>
                        <Crown className="h-3 w-3 mr-1" />
                        Make Admin
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => demoteAdmin(user.auth.users.email)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove Admin
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {users.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No users found</h3>
                  <p className="text-muted-foreground">Users will appear here once they sign up.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Database Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Manual Admin Setup</span>
          </CardTitle>
          <CardDescription>If you need to add the first admin or have database access issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>For Database Administrators:</strong> You can directly add admins through Supabase dashboard.
            </AlertDescription>
          </Alert>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">SQL Command to make user admin:</p>
            <code className="text-xs bg-background p-2 rounded block">
              {`INSERT INTO user_roles (user_id, role) 
VALUES (
  (SELECT id FROM auth.users WHERE email = 'user@example.com'), 
  'admin'
) 
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin';`}
            </code>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Steps:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Go to your Supabase dashboard</li>
              <li>Navigate to SQL Editor</li>
              <li>Replace 'user@example.com' with the actual email</li>
              <li>Run the SQL command</li>
              <li>User will become admin immediately</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

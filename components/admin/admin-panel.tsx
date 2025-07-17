"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Users, Shield, Crown, Settings } from "lucide-react"
import { AdminManagement } from "./admin-management"
import { SubscriptionAdmin } from "./subscription-admin"

interface UserData {
  id: string
  email: string
  created_at: string
  user_metadata: {
    full_name?: string
  }
  role: "admin" | "user"
}

export function AdminPanel() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const { updateUserRole, isAdmin } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (isAdmin) {
      fetchUsers()
    }
  }, [isAdmin])

  const fetchUsers = async () => {
    // This would typically fetch from your API
    // For demo purposes, we'll use mock data
    const mockUsers: UserData[] = [
      {
        id: "1",
        email: "admin@fileshub.com",
        created_at: "2024-01-01T00:00:00Z",
        user_metadata: { full_name: "Admin User" },
        role: "admin",
      },
      {
        id: "2",
        email: "user1@example.com",
        created_at: "2024-01-15T00:00:00Z",
        user_metadata: { full_name: "John Doe" },
        role: "user",
      },
      {
        id: "3",
        email: "user2@example.com",
        created_at: "2024-01-20T00:00:00Z",
        user_metadata: { full_name: "Jane Smith" },
        role: "user",
      },
    ]

    setUsers(mockUsers)
    setLoading(false)
  }

  const handleRoleChange = async (userId: string, newRole: "admin" | "user") => {
    const { error } = await updateUserRole(userId, newRole)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
      toast({
        title: "Success",
        description: `User role updated to ${newRole}`,
      })
    }
  }

  const handlePromoteToAdmin = async () => {
    if (!newAdminEmail.trim()) return

    // Find user by email and promote to admin
    const user = users.find((u) => u.email === newAdminEmail)
    if (user) {
      await handleRoleChange(user.id, "admin")
      setNewAdminEmail("")
    } else {
      toast({
        title: "Error",
        description: "User not found with that email",
        variant: "destructive",
      })
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_metadata.full_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const adminCount = users.filter((user) => user.role === "admin").length
  const userCount = users.filter((user) => user.role === "user").length

  if (!isAdmin) {
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>Access denied. Only administrators can view this panel.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage users and system settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          <span className="font-medium">Administrator</span>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>User Management</span>
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center space-x-2">
            <Crown className="h-4 w-4" />
            <span>Subscriptions</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>System Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <AdminManagement />
        </TabsContent>

        <TabsContent value="subscriptions">
          <SubscriptionAdmin />
        </TabsContent>

        <TabsContent value="settings">
          <div className="text-center py-12">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">System Settings</h3>
            <p className="text-muted-foreground">System configuration options will be available here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

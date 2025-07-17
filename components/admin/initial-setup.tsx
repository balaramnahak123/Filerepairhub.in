"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Crown, Mail, AlertTriangle, CheckCircle, Copy, Database, Settings, ExternalLink } from "lucide-react"

export function InitialSetup() {
  const [adminEmail, setAdminEmail] = useState("")
  const [isSetup, setIsSetup] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const setupInitialAdmin = async () => {
    if (!adminEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // This would typically call an API endpoint
      // For now, we'll show instructions
      toast({
        title: "Setup Instructions",
        description: "Please follow the manual setup instructions below",
      })
      setIsSetup(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to setup admin",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copySQL = () => {
    const sql = `-- Make user admin
INSERT INTO user_roles (user_id, role) 
VALUES (
  (SELECT id FROM auth.users WHERE email = '${adminEmail}'), 
  'admin'
) 
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin';`

    navigator.clipboard.writeText(sql)
    toast({
      title: "Copied!",
      description: "SQL command copied to clipboard",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">FilesHub Initial Setup</h1>
        <p className="text-muted-foreground">Set up your first administrator account</p>
      </div>

      {/* Setup Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Setup Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            {isSetup ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-600">Setup Complete</span>
                <Badge variant="default">Ready</Badge>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="text-yellow-600">Setup Required</span>
                <Badge variant="secondary">Pending</Badge>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Admin Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5" />
            <span>Create First Admin</span>
          </CardTitle>
          <CardDescription>Enter the email address that should become the first administrator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="adminEmail">Admin Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="adminEmail"
                type="email"
                placeholder="admin@yourcompany.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> This email must already exist in your authentication system. The user should
              sign up first, then you can promote them to admin.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button onClick={setupInitialAdmin} disabled={loading}>
              <Crown className="h-4 w-4 mr-2" />
              {loading ? "Setting up..." : "Generate Setup Instructions"}
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

      {/* Manual Setup Instructions */}
      {adminEmail && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Database Setup</span>
            </CardTitle>
            <CardDescription>Run this SQL command in your Supabase dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">SQL Command:</p>
                <Button variant="outline" size="sm" onClick={copySQL}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <code className="text-xs bg-background p-3 rounded block whitespace-pre-wrap">
                {`-- Make user admin
INSERT INTO user_roles (user_id, role) 
VALUES (
  (SELECT id FROM auth.users WHERE email = '${adminEmail}'), 
  'admin'
) 
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin';`}
              </code>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Steps to execute:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>
                  Make sure the user has signed up with email: <strong>{adminEmail}</strong>
                </li>
                <li>Go to your Supabase dashboard</li>
                <li>Navigate to SQL Editor</li>
                <li>Paste and run the SQL command above</li>
                <li>The user will immediately become an admin</li>
                <li>
                  They can then access the admin panel at <code>/admin</code>
                </li>
              </ol>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                After running this command, the user can log in and access all admin features including the ability to
                promote other users to admin through the web interface.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Environment Variables */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <CardDescription>Make sure these are configured in your deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <code className="text-xs block space-y-1">
              <div>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key</div>
            </code>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            These should be set in your Vercel dashboard under Project Settings → Environment Variables
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

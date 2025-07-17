import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: userRole, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single()

    if (roleError || userRole?.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Get all user roles first
    const { data: userRoles, error: rolesError } = await supabase
      .from("user_roles")
      .select("*")
      .order("created_at", { ascending: false })

    if (rolesError) {
      console.error("Error fetching user roles:", rolesError)
      return NextResponse.json({ error: "Failed to fetch user roles" }, { status: 500 })
    }

    // Get user details from auth.users for each role
    const usersWithDetails = []

    for (const userRole of userRoles || []) {
      try {
        // Get user details from Supabase auth
        const { data: authUser, error: authUserError } = await supabase.auth.admin.getUserById(userRole.user_id)

        if (!authUserError && authUser.user) {
          usersWithDetails.push({
            user_id: userRole.user_id,
            role: userRole.role,
            created_at: userRole.created_at,
            auth: {
              users: {
                email: authUser.user.email,
                user_metadata: authUser.user.user_metadata,
                created_at: authUser.user.created_at,
              },
            },
          })
        }
      } catch (error) {
        console.error(`Error fetching user ${userRole.user_id}:`, error)
        // Continue with other users even if one fails
      }
    }

    return NextResponse.json({ users: usersWithDetails })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json({ error: "Email and role are required" }, { status: 400 })
    }

    // Check if current user is admin
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: userRole, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single()

    if (roleError || userRole?.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Find user by email using admin API
    const { data: targetUserData, error: userError } = await supabase.auth.admin.listUsers()

    if (userError) {
      return NextResponse.json({ error: "Failed to search users" }, { status: 500 })
    }

    const targetUser = targetUserData.users.find((u) => u.email === email)

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user role
    const { error: roleUpdateError } = await supabase.from("user_roles").upsert({
      user_id: targetUser.id,
      role: role,
      updated_at: new Date().toISOString(),
    })

    if (roleUpdateError) {
      console.error("Role update error:", roleUpdateError)
      return NextResponse.json({ error: roleUpdateError.message }, { status: 500 })
    }

    return NextResponse.json({
      message: `User ${email} has been ${role === "admin" ? "promoted to admin" : "demoted to user"}`,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
